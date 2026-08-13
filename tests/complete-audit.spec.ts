import { test, expect } from '@playwright/test'

test.describe('Doggy Lobby - Complete QA Audit', () => {

  test.describe('1. HOMEPAGE', () => {

    test('Homepage loads successfully', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' })
      await expect(page).toHaveTitle(/Doggy Lobby/i)
    })

    test('No console errors on homepage', async ({ page }) => {
      const errors: string[] = []

      page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text())
      })

      await page.goto('/', { waitUntil: 'domcontentloaded' })

      expect(errors).toEqual([])
    })

    test('Hero section visible', async ({ page }) => {
      await page.goto('/')
      await expect(page.locator('h1').first()).toBeVisible()
    })

    test('Desktop navbar visible', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 })
      await page.goto('/')

      await expect(
        page.getByRole('link', { name: /Doggy Lobby/i }).first()
      ).toBeVisible()
    })

    test('Mobile navigation controls visible', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/')

      await expect(
        page.getByRole('button', { name: /toggle menu/i })
      ).toBeVisible()
    })

    test('Footer visible', async ({ page }) => {
      await page.goto('/')

      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight)
      })

      await expect(page.locator('footer')).toBeVisible()
    })
  })

  test.describe('2. NAVIGATION LINKS', () => {

    test('Shop link exists', async ({ page }) => {
  await page.goto('/')

  const menuButton = page.getByRole('button', { name: /toggle menu/i })
  await expect(menuButton).toBeVisible()
  await menuButton.click()

  const shop = page.getByRole('link', { name: 'Shop', exact: true })
  await expect(shop).toBeVisible()
})

    test('Logo returns to homepage', async ({ page }) => {
      await page.goto('/collections/dogs')

      await page.getByRole('link', { name: /Doggy Lobby/i }).first().click()

      await expect(page).toHaveURL(/\/$/)
    })

    test('Back button works', async ({ page }) => {
      await page.goto('/')

      await page.goto('/collections/dogs')
      await page.goBack()

      await expect(page).toHaveURL(/\/$/)
    })
  })

  test.describe('3. SHOP BY COLLECTION', () => {

    const collections = ['dogs', 'cats', 'puppies', 'kittens']

    for (const collection of collections) {

      test(`${collection} collection opens successfully`, async ({ page }) => {
        await page.goto('/')

        const link = page.getByRole('link', {
          name: new RegExp(`^${collection}$`, 'i')
        })

        await expect(link).toBeVisible()

        await link.click()

        await expect(page).toHaveURL(
          new RegExp(`/collections/${collection}$`)
        )
      })

      test(`${collection} collection loads at top`, async ({ page }) => {
        await page.goto(`/collections/${collection}`)

        await expect(page).toHaveURL(
          new RegExp(`/collections/${collection}$`)
        )

        const scrollY = await page.evaluate(() => window.scrollY)

        expect(scrollY).toBeLessThan(100)
      })

      test(`${collection} collection page loads`, async ({ page }) => {
        const response = await page.goto(
          `/collections/${collection}`,
          { waitUntil: 'domcontentloaded' }
        )

        expect(response?.status()).toBeLessThan(400)
      })
    }
  })

  test.describe('4. IMAGES', () => {

    test('No broken image markers on homepage', async ({ page }) => {
      await page.goto('/')

      const brokenImages = await page.locator(
        'img[alt*="broken" i]'
      ).count()

      expect(brokenImages).toBe(0)
    })
  })

  test.describe('5. CONSOLE ERRORS', () => {

    test('No unhandled page errors', async ({ page }) => {
      const errors: string[] = []

      page.on('pageerror', error => {
        errors.push(error.message)
      })

      await page.goto('/')

      expect(errors).toEqual([])
    })
  })

  test.describe('6. RESPONSIVENESS', () => {

    test('Desktop layout works', async ({ page }) => {
      await page.setViewportSize({
        width: 1280,
        height: 720
      })

      await page.goto('/')

      await expect(page.locator('main')).toBeVisible()
    })

    test('Mobile layout works', async ({ page }) => {
      await page.setViewportSize({
        width: 375,
        height: 667
      })

      await page.goto('/')

      await expect(page.locator('main')).toBeVisible()
      await expect(
        page.getByRole('button', { name: /toggle menu/i })
      ).toBeVisible()
    })
  })

  test.describe('7. CRITICAL PATHS', () => {

    test('Complete user journey', async ({ page }) => {

      await page.goto('/')

      await expect(page).toHaveTitle(/Doggy Lobby/i)

      const dogs = page.getByRole('link', {
        name: /^Dogs$/i
      })

      await expect(dogs).toBeVisible()

      await dogs.click()

      await expect(page).toHaveURL(/\/collections\/dogs$/)

      await page.goBack()

      await expect(page).toHaveURL(/\/$/)
    })
  })
})