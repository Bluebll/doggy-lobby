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
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - link "DoggyLobby." [ref=e4]:
        - /url: /
      - button "Toggle menu" [ref=e5]
  - generic [ref=e8]:
    - link "← Back Home" [ref=e9]:
      - /url: /
    - heading "Dogs" [level=1] [ref=e10]
    - paragraph [ref=e11]: No products in this collection yet.
  - contentinfo [ref=e12]:
    - generic [ref=e13]:
      - generic [ref=e14]:
        - generic [ref=e15]:
          - heading "Join the Club." [level=3] [ref=e16]
          - paragraph [ref=e17]: Subscribe for exclusive offers, premium pet care tips, and early access to new collections.
          - generic [ref=e18]:
            - textbox "Enter your email" [ref=e19]
            - button [ref=e20]
        - generic [ref=e24]:
          - generic [ref=e25]:
            - heading "@doggylobby.in" [level=4] [ref=e26]
            - link "Follow Us" [ref=e30]:
              - /url: "#"
          - generic [ref=e34]:
            - link [ref=e35]:
              - /url: "#"
              - img "Instagram post 1" [ref=e36]
            - link [ref=e41]:
              - /url: "#"
              - img "Instagram post 2" [ref=e42]
            - link [ref=e47]:
              - /url: "#"
              - img "Instagram post 3" [ref=e48]
            - link [ref=e53]:
              - /url: "#"
              - img "Instagram post 4" [ref=e54]
      - generic [ref=e59]:
        - generic [ref=e60]:
          - link "DoggyLobby." [ref=e61]:
            - /url: /
          - paragraph [ref=e62]: Premium pet essentials, curated with love. Making pets happier in Faridabad since 2020. Elevating the standard of pet care.
          - generic [ref=e63]: 4.9/5Google Reviews
        - generic [ref=e76]:
          - heading "Explore" [level=4] [ref=e77]
          - list [ref=e78]:
            - listitem [ref=e79]:
              - link "Shop All" [ref=e80]:
                - /url: "#categories"
            - listitem [ref=e84]:
              - link "Our Story" [ref=e85]:
                - /url: "#about"
            - listitem [ref=e89]:
              - link "FAQ" [ref=e90]:
                - /url: "#faq"
            - listitem [ref=e94]:
              - link "Journal" [ref=e95]:
                - /url: "#"
        - generic [ref=e99]:
          - heading "Store" [level=4] [ref=e100]
          - list [ref=e101]:
            - listitem [ref=e102] [cursor=pointer]:
              - generic [ref=e106]: Sector 15 Market,Faridabad, HR 121007
            - listitem [ref=e107] [cursor=pointer]:
              - generic [ref=e110]: +91 98765 43210
            - listitem [ref=e111] [cursor=pointer]:
              - generic [ref=e115]: hello@doggylobby.in
        - generic [ref=e116]:
          - heading "Hours" [level=4] [ref=e117]
          - list [ref=e118]:
            - listitem [ref=e119]:
              - generic [ref=e120]: Mon - Fri
              - generic [ref=e121]: 10AM - 9PM
            - listitem [ref=e122]:
              - generic [ref=e123]: Saturday
              - generic [ref=e124]: 9AM - 10PM
            - listitem [ref=e125]:
              - generic [ref=e126]: Sunday
              - generic [ref=e127]: Closed
      - generic [ref=e128]:
        - paragraph [ref=e129]: © 2026 Doggy Lobby. Crafted with precision.
        - generic [ref=e130]:
          - link "Privacy" [ref=e131]:
            - /url: "#"
          - link "Terms" [ref=e132]:
            - /url: "#"
          - link "Cookies" [ref=e133]:
            - /url: "#"
  - generic [ref=e135]:
    - link "Call Store" [ref=e136]:
      - /url: tel:+919876543210
      - generic [ref=e139]: Call
    - link "Chat on WhatsApp" [ref=e140]:
      - /url: https://wa.me/919876543210
      - generic [ref=e143]: Chat
    - link "Store Location" [ref=e146]:
      - /url: "#contact"
    - link "Get Directions" [ref=e150]:
      - /url: https://goo.gl/maps/placeholder
      - generic [ref=e153]: Route
    - link "Shop Categories" [ref=e154]:
      - /url: "#categories"
      - generic [ref=e159]: Shop
  - button "Open Next.js Dev Tools" [ref=e165] [cursor=pointer]
  - alert [ref=e171]
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