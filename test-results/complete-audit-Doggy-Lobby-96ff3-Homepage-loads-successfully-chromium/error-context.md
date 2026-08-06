# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: complete-audit.spec.ts >> Doggy Lobby - Complete QA Audit >> 1. HOMEPAGE >> Homepage loads successfully
- Location: tests/complete-audit.spec.ts:6:9

# Error details

```
Error: expect(page).toHaveTitle(expected) failed

Expected pattern: /Doggy Lobby/
Received string:  ""

Call log:
  - Expect "toHaveTitle" with timeout 5000ms
  - Protocol error (Runtime.evaluate): Internal server error, session closed.

```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test'
  2   | 
  3   | test.describe('Doggy Lobby - Complete QA Audit', () => {
  4   |   
  5   |   test.describe('1. HOMEPAGE', () => {
  6   |     test('Homepage loads successfully', async ({ page }) => {
  7   |       await page.goto('/')
> 8   |       expect(page).toHaveTitle(/Doggy Lobby/)
      |                    ^ Error: expect(page).toHaveTitle(expected) failed
  9   |     })
  10  | 
  11  |     test('No console errors on homepage', async ({ page }) => {
  12  |       const errors: string[] = []
  13  |       page.on('console', msg => {
  14  |         if (msg.type() === 'error') errors.push(msg.text())
  15  |       })
  16  |       await page.goto('/')
  17  |       await page.waitForLoadState('networkidle')
  18  |       expect(errors).toEqual([])
  19  |     })
  20  | 
  21  |     test('Hero section visible', async ({ page }) => {
  22  |       await page.goto('/')
  23  |       const hero = page.locator('h1').first()
  24  |       await expect(hero).toBeVisible()
  25  |     })
  26  | 
  27  |     test('Navbar visible', async ({ page }) => {
  28  |       await page.goto('/')
  29  |       await expect(page.locator('nav')).toBeVisible()
  30  |     })
  31  | 
  32  |     test('Footer visible', async ({ page }) => {
  33  |       await page.goto('/')
  34  |       await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  35  |       await expect(page.locator('footer')).toBeVisible()
  36  |     })
  37  |   })
  38  | 
  39  |   test.describe('2. NAVIGATION LINKS', () => {
  40  |     test('Shop link works', async ({ page }) => {
  41  |       await page.goto('/')
  42  |       await page.click('text=Shop')
  43  |       expect(page.url()).toContain('/')
  44  |     })
  45  | 
  46  |     test('Logo returns to homepage', async ({ page }) => {
  47  |       await page.goto('/collections/dogs')
  48  |       await page.click('text=DoggyLobby')
  49  |       expect(page.url()).toBe('http://localhost:3000/')
  50  |     })
  51  | 
  52  |     test('Back button works', async ({ page }) => {
  53  |       await page.goto('/')
  54  |       await page.click('text=Dogs')
  55  |       await page.waitForNavigation()
  56  |       await page.goBack()
  57  |       expect(page.url()).toBe('http://localhost:3000/')
  58  |     })
  59  |   })
  60  | 
  61  |   test.describe('3. SHOP BY COLLECTION', () => {
  62  |     const collections = ['dogs', 'cats', 'puppies', 'kittens']
  63  | 
  64  |     for (const collection of collections) {
  65  |       test(`${collection} collection opens successfully`, async ({ page }) => {
  66  |         await page.goto('/')
  67  |         const buttons = await page.locator('button').all()
  68  |         let found = false
  69  |         for (const btn of buttons) {
  70  |           const text = await btn.textContent()
  71  |           if (text?.toLowerCase().includes(collection)) {
  72  |             await btn.click()
  73  |             found = true
  74  |             break
  75  |           }
  76  |         }
  77  |         await page.waitForNavigation()
  78  |         expect(page.url()).toContain(`/collections/${collection}`)
  79  |       })
  80  | 
  81  |       test(`${collection} collection loads at top`, async ({ page }) => {
  82  |         await page.goto(`/collections/${collection}`)
  83  |         const scrollY = await page.evaluate(() => window.scrollY)
  84  |         expect(scrollY).toBeLessThan(100)
  85  |       })
  86  | 
  87  |       test(`${collection} collection shows products`, async ({ page }) => {
  88  |         await page.goto(`/collections/${collection}`)
  89  |         await page.waitForLoadState('networkidle')
  90  |         const products = await page.locator('a[href*="/products/"]').count()
  91  |         expect(products).toBeGreaterThanOrEqual(0)
  92  |       })
  93  |     }
  94  |   })
  95  | 
  96  |   test.describe('4. IMAGES', () => {
  97  |     test('No broken image icons on homepage', async ({ page }) => {
  98  |       await page.goto('/')
  99  |       const brokenImages = await page.locator('img[alt*="broken"]').count()
  100 |       expect(brokenImages).toBe(0)
  101 |     })
  102 | 
  103 |     test('Collection images load', async ({ page }) => {
  104 |       await page.goto('/')
  105 |       const images = await page.locator('img').all()
  106 |       for (const img of images.slice(0, 5)) {
  107 |         const src = await img.getAttribute('src')
  108 |         if (src && !src.includes('data:')) {
```