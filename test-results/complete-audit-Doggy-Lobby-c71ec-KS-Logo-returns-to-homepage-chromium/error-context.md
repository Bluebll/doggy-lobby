# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: complete-audit.spec.ts >> Doggy Lobby - Complete QA Audit >> 2. NAVIGATION LINKS >> Logo returns to homepage
- Location: tests/complete-audit.spec.ts:46:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "http://localhost:3000/"
Received: "http://localhost:3000/collections/dogs"
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - link "DoggyLobby." [active] [ref=e4] [cursor=pointer]:
        - /url: /
      - navigation [ref=e5]:
        - link "Shop" [ref=e6] [cursor=pointer]:
          - /url: "#categories"
        - link "Our Story" [ref=e7] [cursor=pointer]:
          - /url: "#about"
        - link "Gallery" [ref=e8] [cursor=pointer]:
          - /url: "#gallery"
        - link "FAQ" [ref=e9] [cursor=pointer]:
          - /url: "#faq"
      - generic [ref=e10]:
        - link "Call Us" [ref=e11] [cursor=pointer]:
          - /url: tel:+919876543210
        - link "Visit Store" [ref=e16] [cursor=pointer]:
          - /url: "#contact"
  - generic [ref=e18]:
    - link "← Back Home" [ref=e19] [cursor=pointer]:
      - /url: /
    - heading "Dogs" [level=1] [ref=e20]
    - paragraph [ref=e21]: No products in this collection yet.
  - contentinfo [ref=e22]:
    - generic [ref=e23]:
      - generic [ref=e24]:
        - generic [ref=e25]:
          - heading "Join the Club." [level=3] [ref=e26]
          - paragraph [ref=e27]: Subscribe for exclusive offers, premium pet care tips, and early access to new collections.
          - generic [ref=e28]:
            - textbox "Enter your email" [ref=e29]
            - button [ref=e30]
        - generic [ref=e34]:
          - generic [ref=e35]:
            - heading "@doggylobby.in" [level=4] [ref=e36]
            - link "Follow Us" [ref=e40] [cursor=pointer]:
              - /url: "#"
          - generic [ref=e44]:
            - link [ref=e45] [cursor=pointer]:
              - /url: "#"
              - img "Instagram post 1" [ref=e46]
            - link [ref=e51] [cursor=pointer]:
              - /url: "#"
              - img "Instagram post 2" [ref=e52]
            - link [ref=e57] [cursor=pointer]:
              - /url: "#"
              - img "Instagram post 3" [ref=e58]
            - link [ref=e63] [cursor=pointer]:
              - /url: "#"
              - img "Instagram post 4" [ref=e64]
      - generic [ref=e69]:
        - generic [ref=e70]:
          - link "DoggyLobby." [ref=e71] [cursor=pointer]:
            - /url: /
          - paragraph [ref=e72]: Premium pet essentials, curated with love. Making pets happier in Faridabad since 2020. Elevating the standard of pet care.
          - generic [ref=e73]: 4.9/5Google Reviews
        - generic [ref=e86]:
          - heading "Explore" [level=4] [ref=e87]
          - list [ref=e88]:
            - listitem [ref=e89]:
              - link "Shop All" [ref=e90] [cursor=pointer]:
                - /url: "#categories"
            - listitem [ref=e94]:
              - link "Our Story" [ref=e95] [cursor=pointer]:
                - /url: "#about"
            - listitem [ref=e99]:
              - link "FAQ" [ref=e100] [cursor=pointer]:
                - /url: "#faq"
            - listitem [ref=e104]:
              - link "Journal" [ref=e105] [cursor=pointer]:
                - /url: "#"
        - generic [ref=e109]:
          - heading "Store" [level=4] [ref=e110]
          - list [ref=e111]:
            - listitem [ref=e112] [cursor=pointer]:
              - generic [ref=e116]: Sector 15 Market,Faridabad, HR 121007
            - listitem [ref=e117] [cursor=pointer]:
              - generic [ref=e120]: +91 98765 43210
            - listitem [ref=e121] [cursor=pointer]:
              - generic [ref=e125]: hello@doggylobby.in
        - generic [ref=e126]:
          - heading "Hours" [level=4] [ref=e127]
          - list [ref=e128]:
            - listitem [ref=e129]:
              - generic [ref=e130]: Mon - Fri
              - generic [ref=e131]: 10AM - 9PM
            - listitem [ref=e132]:
              - generic [ref=e133]: Saturday
              - generic [ref=e134]: 9AM - 10PM
            - listitem [ref=e135]:
              - generic [ref=e136]: Sunday
              - generic [ref=e137]: Closed
      - generic [ref=e138]:
        - paragraph [ref=e139]: © 2026 Doggy Lobby. Crafted with precision.
        - generic [ref=e140]:
          - link "Privacy" [ref=e141] [cursor=pointer]:
            - /url: "#"
          - link "Terms" [ref=e142] [cursor=pointer]:
            - /url: "#"
          - link "Cookies" [ref=e143] [cursor=pointer]:
            - /url: "#"
  - button "Open Next.js Dev Tools" [ref=e149] [cursor=pointer]
  - alert [ref=e153]
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
  8   |       expect(page).toHaveTitle(/Doggy Lobby/)
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
> 49  |       expect(page.url()).toBe('http://localhost:3000/')
      |                          ^ Error: expect(received).toBe(expected) // Object.is equality
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
  109 |           const response = await page.evaluate(async (imgSrc) => {
  110 |             try {
  111 |               const res = await fetch(imgSrc, { method: 'HEAD' })
  112 |               return res.status
  113 |             } catch {
  114 |               return null
  115 |             }
  116 |           }, src)
  117 |           expect([200, 301, 302]).toContain(response)
  118 |         }
  119 |       }
  120 |     })
  121 |   })
  122 | 
  123 |   test.describe('5. CONSOLE ERRORS', () => {
  124 |     test('No unhandled rejections', async ({ page }) => {
  125 |       const rejections: string[] = []
  126 |       page.on('pageerror', error => rejections.push(error.message))
  127 |       await page.goto('/')
  128 |       await page.waitForLoadState('networkidle')
  129 |       expect(rejections).toEqual([])
  130 |     })
  131 |   })
  132 | 
  133 |   test.describe('6. RESPONSIVENESS', () => {
  134 |     test('Desktop layout works', async ({ browser }) => {
  135 |       const context = await browser.newContext({ viewport: { width: 1280, height: 720 } })
  136 |       const page = await context.newPage()
  137 |       await page.goto('/')
  138 |       const content = page.locator('main')
  139 |       await expect(content).toBeVisible()
  140 |       await context.close()
  141 |     })
  142 | 
  143 |     test('Mobile layout works', async ({ browser }) => {
  144 |       const context = await browser.newContext({ viewport: { width: 375, height: 667 } })
  145 |       const page = await context.newPage()
  146 |       await page.goto('/')
  147 |       const content = page.locator('main')
  148 |       await expect(content).toBeVisible()
  149 |       await context.close()
```