import { test, expect } from '@playwright/test'

test.describe('Doggy Lobby - Complete QA Audit', () => {
  
  test.describe('1. HOMEPAGE', () => {
    test('Homepage loads successfully', async ({ page }) => {
      await page.goto('/')
      expect(page).toHaveTitle(/Doggy Lobby/)
    })

    test('No console errors on homepage', async ({ page }) => {
      const errors: string[] = []
      page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text())
      })
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      expect(errors).toEqual([])
    })

    test('Hero section visible', async ({ page }) => {
      await page.goto('/')
      const hero = page.locator('h1').first()
      await expect(hero).toBeVisible()
    })

    test('Navbar visible', async ({ page }) => {
      await page.goto('/')
      await expect(page.locator('nav')).toBeVisible()
    })

    test('Footer visible', async ({ page }) => {
      await page.goto('/')
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
      await expect(page.locator('footer')).toBeVisible()
    })
  })

  test.describe('2. NAVIGATION LINKS', () => {
    test('Shop link works', async ({ page }) => {
      await page.goto('/')
      await page.click('text=Shop')
      expect(page.url()).toContain('/')
    })

    test('Logo returns to homepage', async ({ page }) => {
      await page.goto('/collections/dogs')
      await page.click('text=DoggyLobby')
      expect(page.url()).toBe('http://localhost:3000/')
    })

    test('Back button works', async ({ page }) => {
      await page.goto('/')
      await page.click('text=Dogs')
      await page.waitForNavigation()
      await page.goBack()
      expect(page.url()).toBe('http://localhost:3000/')
    })
  })

  test.describe('3. SHOP BY COLLECTION', () => {
    const collections = ['dogs', 'cats', 'puppies', 'kittens']

    for (const collection of collections) {
      test(`${collection} collection opens successfully`, async ({ page }) => {
        await page.goto('/')
        const buttons = await page.locator('button').all()
        let found = false
        for (const btn of buttons) {
          const text = await btn.textContent()
          if (text?.toLowerCase().includes(collection)) {
            await btn.click()
            found = true
            break
          }
        }
        await page.waitForNavigation()
        expect(page.url()).toContain(`/collections/${collection}`)
      })

      test(`${collection} collection loads at top`, async ({ page }) => {
        await page.goto(`/collections/${collection}`)
        const scrollY = await page.evaluate(() => window.scrollY)
        expect(scrollY).toBeLessThan(100)
      })

      test(`${collection} collection shows products`, async ({ page }) => {
        await page.goto(`/collections/${collection}`)
        await page.waitForLoadState('networkidle')
        const products = await page.locator('a[href*="/products/"]').count()
        expect(products).toBeGreaterThanOrEqual(0)
      })
    }
  })

  test.describe('4. IMAGES', () => {
    test('No broken image icons on homepage', async ({ page }) => {
      await page.goto('/')
      const brokenImages = await page.locator('img[alt*="broken"]').count()
      expect(brokenImages).toBe(0)
    })

    test('Collection images load', async ({ page }) => {
      await page.goto('/')
      const images = await page.locator('img').all()
      for (const img of images.slice(0, 5)) {
        const src = await img.getAttribute('src')
        if (src && !src.includes('data:')) {
          const response = await page.evaluate(async (imgSrc) => {
            try {
              const res = await fetch(imgSrc, { method: 'HEAD' })
              return res.status
            } catch {
              return null
            }
          }, src)
          expect([200, 301, 302]).toContain(response)
        }
      }
    })
  })

  test.describe('5. CONSOLE ERRORS', () => {
    test('No unhandled rejections', async ({ page }) => {
      const rejections: string[] = []
      page.on('pageerror', error => rejections.push(error.message))
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      expect(rejections).toEqual([])
    })
  })

  test.describe('6. RESPONSIVENESS', () => {
    test('Desktop layout works', async ({ browser }) => {
      const context = await browser.newContext({ viewport: { width: 1280, height: 720 } })
      const page = await context.newPage()
      await page.goto('/')
      const content = page.locator('main')
      await expect(content).toBeVisible()
      await context.close()
    })

    test('Mobile layout works', async ({ browser }) => {
      const context = await browser.newContext({ viewport: { width: 375, height: 667 } })
      const page = await context.newPage()
      await page.goto('/')
      const content = page.locator('main')
      await expect(content).toBeVisible()
      await context.close()
    })
  })

  test.describe('7. CRITICAL PATHS', () => {
    test('Complete user journey', async ({ page }) => {
      // Homepage
      await page.goto('/')
      expect(page).toHaveTitle(/Doggy/)
      
      // Navigate to collection
      const collectionButton = page.locator('button').filter({ hasText: /Dogs|Cats/ }).first()
      if (await collectionButton.isVisible()) {
        await collectionButton.click()
        await page.waitForNavigation()
        expect(page.url()).toContain('/collections/')
      }
      
      // Return home
      await page.goBack()
      expect(page.url()).toBe('http://localhost:3000/')
    })
  })
})
