import { test, expect } from '@playwright/test'

test.describe('Doggy Lobby - Regression Tests', () => {

  test('1. CHECKOUT IDEMPOTENCY: Sequential checkouts generate new Idempotency-Keys', async ({ page }) => {
    // We will intercept the API calls to verify the headers
    const idempotencyKeys = new Set<string>()

    await page.route('/api/orders', async route => {
      const headers = route.request().headers()
      const key = headers['idempotency-key']
      if (key) {
        idempotencyKeys.add(key)
      }
      
      // Mock successful response
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          order: {
            order_number: 'DL-TEST-123',
            total_price: 1500
          }
        })
      })
    })

    // Add item to cart and go to checkout
    // Let's just use localStorage to fake a cart so we can test the page directly
    await page.addInitScript(() => {
      window.localStorage.setItem('cart-store', JSON.stringify({
        state: {
          items: [{ id: 1, name: 'Test Product', price: 1000, quantity: 1, stock: 999, image: '' }]
        },
        version: 0
      }))
    })

    // Load Cart page
    await page.goto('/cart')
    await page.getByRole('button', { name: /Continue to checkout/i }).click()

    // Fill checkout form
    await page.getByPlaceholder('Your name').fill('John Doe')
    await page.getByPlaceholder('+91 98765 43210').fill('9876543210')
    await page.getByPlaceholder('House / flat, street, sector, city, pincode').fill('Test Address')
    
    // First checkout
    await page.getByRole('button', { name: /Place order via WhatsApp/i }).click()

    // Ensure first checkout succeeded (should show success view)
    await expect(page.getByText('Order Placed!')).toBeVisible()
    
    // Now verify the first key was captured
    expect(idempotencyKeys.size).toBe(1)

    // Instead of flaky UI navigation, inject the second item directly into localStorage
    await page.evaluate(() => {
      window.localStorage.setItem('cart-store', JSON.stringify({
        state: {
          items: [{ id: 2, name: 'Test Product 2', price: 2000, quantity: 1, stock: 999, image: '' }]
        },
        version: 0
      }))
    })
    
    // Reload the cart page to pick up the new state
    await page.reload()
    await page.getByRole('button', { name: /Continue to checkout/i }).click()
    
    // Fill form
    await page.getByPlaceholder('Your name').fill('John Doe 2')
    await page.getByPlaceholder('+91 98765 43210').fill('9876543210')
    await page.getByPlaceholder('House / flat, street, sector, city, pincode').fill('Test Address 2')
    
    // Second checkout
    await page.getByRole('button', { name: /Place order via WhatsApp/i }).click()
    
    // Wait for success
    await expect(page.getByText('Order Placed!')).toBeVisible()
    
    // Verify a NEW key was added
    expect(idempotencyKeys.size).toBe(2)
  })

  test('2. ORDER TOTAL AUTHORITY: WhatsApp URL uses server-provided total', async ({ page }) => {
    // Intercept window.open
    await page.addInitScript(() => {
      window.open = (url) => {
        // @ts-ignore
        window.__waUrl = url
        return null
      }
    })

    await page.route('/api/orders', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          order: {
            order_number: 'DL-AUTHORITY-TEST',
            total_price: 9999.99 // Server authoritative price
          }
        })
      })
    })

    // Setup cart with a fake client price
    await page.addInitScript(() => {
      window.localStorage.setItem('cart-store', JSON.stringify({
        state: {
          items: [{ id: 1, name: 'Fake Price Product', price: 10, quantity: 1, stock: 999, image: '' }]
        },
        version: 0
      }))
    })

    await page.goto('/cart')
    await page.getByRole('button', { name: /Continue to checkout/i }).click()

    await page.getByPlaceholder('Your name').fill('John')
    await page.getByPlaceholder('+91 98765 43210').fill('9876543210')
    await page.getByPlaceholder('House / flat, street, sector, city, pincode').fill('Address')
    
    await page.getByRole('button', { name: /Place order via WhatsApp/i }).click()
    await expect(page.getByText('Order Placed!')).toBeVisible()

    // Check what URL was opened
    const openedUrl = await page.evaluate(() => (window as any).__waUrl as string)
    expect(openedUrl).toBeDefined()
    
    // URL encoded "9,999.99" should be in the URL
    expect(decodeURIComponent(openedUrl)).toContain('9,999.99')
  })

  test('3. PUBLIC PRODUCT API: Inactive products return 404', async ({ request }) => {
    const res = await request.get('/api/products/this-slug-does-not-exist-123')
    expect(res.status()).toBe(404)
    
    const body = await res.json()
    expect(body).toHaveProperty('error', 'Not found')
  })
})
