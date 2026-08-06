# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: complete-audit.spec.ts >> Doggy Lobby - Complete QA Audit >> 2. NAVIGATION LINKS >> Back button works
- Location: tests/complete-audit.spec.ts:52:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.waitForNavigation: Test timeout of 30000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
============================================================
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - link "DoggyLobby." [ref=e4]:
        - /url: /
      - button "Toggle menu" [ref=e5]
  - main [ref=e7]:
    - generic [ref=e8]:
      - img "Happy dogs" [ref=e10]
      - generic [ref=e14]:
        - heading "Faridabad's Premium Destination For Happy Pets" [level=1] [ref=e15]:
          - generic [ref=e16]: Faridabad's
          - generic [ref=e17]: Premium
          - generic [ref=e18]: Destination
          - generic [ref=e19]: For
          - generic [ref=e20]: Happy
          - generic [ref=e21]: Pets
        - paragraph [ref=e22]: The finest nutrition, curated accessories, and premium care for Faridabad's most discerning pet parents.
        - generic [ref=e23]:
          - link "Visit Store" [ref=e26]:
            - /url: "#contact"
          - link "WhatsApp" [ref=e32]:
            - /url: https://wa.me/919876543210
        - generic [ref=e36]:
          - generic [ref=e37]: 4.9 Google Rating
          - generic [ref=e40]: Imported Brands
          - generic [ref=e44]: Premium Products
      - generic [ref=e48]: Scroll
    - generic [ref=e54]:
      - generic [ref=e55]: 4.9★ Google Rating
      - generic [ref=e60]: Premium Products
      - generic [ref=e66]: Imported Treats
      - generic [ref=e71]: Best Prices
      - generic [ref=e76]: Trusted by Local Pet Parents
    - generic [ref=e82]:
      - heading "Shop by Collection" [level=2] [ref=e83]
      - generic [ref=e84]:
        - button [ref=e85] [cursor=pointer]:
          - img "Dogs" [ref=e86]
          - heading "Dogs" [level=3] [ref=e89]
        - button [ref=e90] [cursor=pointer]:
          - img "Cats" [ref=e91]
          - heading "Cats" [level=3] [ref=e94]
        - button [ref=e95] [cursor=pointer]:
          - img "Puppies" [ref=e96]
          - heading "Puppies" [level=3] [ref=e99]
        - button [ref=e100] [cursor=pointer]:
          - img "Kittens" [ref=e101]
          - heading "Kittens" [level=3] [ref=e104]
    - generic [ref=e107]:
      - generic [ref=e108]:
        - heading "0.0★" [level=3] [ref=e109]
        - paragraph [ref=e110]: Google Rating
      - generic [ref=e111]:
        - heading "0+" [level=3] [ref=e112]
        - paragraph [ref=e113]: Premium Brands
      - generic [ref=e114]:
        - heading "0+" [level=3] [ref=e115]
        - paragraph [ref=e116]: Curated Products
      - generic [ref=e117]:
        - heading "0k+" [level=3] [ref=e118]
        - paragraph [ref=e119]: Happy Pets
    - generic [ref=e121]:
      - generic [ref=e122]:
        - img "Happy dog owner" [ref=e124]
        - generic [ref=e126]:
          - heading "Origin Story" [level=2] [ref=e127]
          - heading "Born from pure love." [level=3] [ref=e128]: Born frompure love.
      - generic [ref=e130]:
        - generic [ref=e131]:
          - 'heading "2020: The Vision" [level=4] [ref=e132]'
          - paragraph [ref=e133]: "It began with a simple realization: Faridabad's most devoted pet parents were settling for less. Generic kibble, plastic toys, and uninspired accessories dominated the shelves. We believed our companions deserved the same standard of living we demand for ourselves—uncompromising quality and design."
        - generic [ref=e134]:
          - heading "Global Standards, Local Presence" [level=4] [ref=e135]
          - paragraph [ref=e136]: We spent our first year traveling and sourcing. Partnering with organic farms in Europe, bespoke toy makers in the US, and master groomers in Japan. Doggy Lobby was built to be the definitive bridge between global pet luxury and local accessibility in Haryana.
        - generic [ref=e137]:
          - heading "More Than Retail" [level=4] [ref=e138]
          - paragraph [ref=e139]: Today, we are a destination for discerning pet parents. Every product on our shelves is rigorously vetted. If it isn't good enough for our own companions, it doesn't make the cut. We are elevating the standard of pet care, one family at a time.
          - generic [ref=e140]:
            - generic [ref=e141]:
              - heading "500+" [level=4] [ref=e142]
              - paragraph [ref=e143]: Curated Brands
            - generic [ref=e144]:
              - heading "10k+" [level=4] [ref=e145]
              - paragraph [ref=e146]: Happy Pets
    - generic [ref=e147]:
      - generic [ref=e148]:
        - heading "GALLERY" [level=2] [ref=e149]
        - heading "Happy Pets, Happy People" [level=3] [ref=e150]
      - generic [ref=e152]:
        - img "dogs" [ref=e154]
        - img "cat" [ref=e156]
        - img "puppy" [ref=e158]
        - img "kitten" [ref=e160]
    - generic [ref=e162]:
      - generic [ref=e163]:
        - heading "Questions?" [level=2] [ref=e164]
        - heading "Frequently Asked Questions" [level=3] [ref=e167]
      - generic [ref=e168]:
        - generic [ref=e169]:
          - button "Do you offer delivery in Faridabad?" [expanded] [ref=e170]
          - generic: Yes, we offer same-day delivery for all orders placed before 4 PM within Faridabad. Delivery is free on orders above ₹1,500. Every delivery is handled by our trained staff to ensure products arrive in pristine condition.
        - button "Are your treats and food products imported?" [ref=e176]
        - button "Do you have products for pets other than dogs and cats?" [ref=e181]
        - button "Can I return a product if my pet doesn't like it?" [ref=e186]
    - generic [ref=e190]:
      - iframe [ref=e193]
      - generic [ref=e197]:
        - heading "Visit Us" [level=2] [ref=e198]
        - heading "Let's meet." [level=3] [ref=e200]
        - generic [ref=e201]:
          - generic [ref=e207]:
            - heading "Sector 15 Market" [level=4] [ref=e208]
            - paragraph [ref=e209]: Next to Mother DairyFaridabad, HR 121007
          - generic [ref=e215]:
            - heading "Business Hours" [level=4] [ref=e216]
            - paragraph [ref=e217]: "Mon - Fri: 10AM - 9PMSat - Sun: 9AM - 10PM"
          - generic [ref=e223]:
            - heading "Email Us" [level=4] [ref=e224]
            - link "hello@doggylobby.in" [ref=e225]:
              - /url: mailto:hello@doggylobby.in
        - generic [ref=e226]:
          - link "Get Directions" [ref=e227]:
            - /url: https://goo.gl/maps/placeholder
          - link "Call Store" [ref=e230]:
            - /url: tel:+919876543210
  - contentinfo [ref=e233]:
    - generic [ref=e234]:
      - generic [ref=e235]:
        - generic [ref=e236]:
          - heading "Join the Club." [level=3] [ref=e237]
          - paragraph [ref=e238]: Subscribe for exclusive offers, premium pet care tips, and early access to new collections.
          - generic [ref=e239]:
            - textbox "Enter your email" [ref=e240]
            - button [ref=e241]
        - generic [ref=e245]:
          - generic [ref=e246]:
            - heading "@doggylobby.in" [level=4] [ref=e247]
            - link "Follow Us" [ref=e251]:
              - /url: "#"
          - generic [ref=e255]:
            - link [ref=e256]:
              - /url: "#"
              - img "Instagram post 1" [ref=e257]
            - link [ref=e262]:
              - /url: "#"
              - img "Instagram post 2" [ref=e263]
            - link [ref=e268]:
              - /url: "#"
              - img "Instagram post 3" [ref=e269]
            - link [ref=e274]:
              - /url: "#"
              - img "Instagram post 4" [ref=e275]
      - generic [ref=e280]:
        - generic [ref=e281]:
          - link "DoggyLobby." [ref=e282]:
            - /url: /
          - paragraph [ref=e283]: Premium pet essentials, curated with love. Making pets happier in Faridabad since 2020. Elevating the standard of pet care.
          - generic [ref=e284]: 4.9/5Google Reviews
        - generic [ref=e297]:
          - heading "Explore" [level=4] [ref=e298]
          - list [ref=e299]:
            - listitem [ref=e300]:
              - link "Shop All" [ref=e301]:
                - /url: "#categories"
            - listitem [ref=e305]:
              - link "Our Story" [ref=e306]:
                - /url: "#about"
            - listitem [ref=e310]:
              - link "FAQ" [ref=e311]:
                - /url: "#faq"
            - listitem [ref=e315]:
              - link "Journal" [ref=e316]:
                - /url: "#"
        - generic [ref=e320]:
          - heading "Store" [level=4] [ref=e321]
          - list [ref=e322]:
            - listitem [ref=e323] [cursor=pointer]:
              - generic [ref=e327]: Sector 15 Market,Faridabad, HR 121007
            - listitem [ref=e328] [cursor=pointer]:
              - generic [ref=e331]: +91 98765 43210
            - listitem [ref=e332] [cursor=pointer]:
              - generic [ref=e336]: hello@doggylobby.in
        - generic [ref=e337]:
          - heading "Hours" [level=4] [ref=e338]
          - list [ref=e339]:
            - listitem [ref=e340]:
              - generic [ref=e341]: Mon - Fri
              - generic [ref=e342]: 10AM - 9PM
            - listitem [ref=e343]:
              - generic [ref=e344]: Saturday
              - generic [ref=e345]: 9AM - 10PM
            - listitem [ref=e346]:
              - generic [ref=e347]: Sunday
              - generic [ref=e348]: Closed
      - generic [ref=e349]:
        - paragraph [ref=e350]: © 2026 Doggy Lobby. Crafted with precision.
        - generic [ref=e351]:
          - link "Privacy" [ref=e352]:
            - /url: "#"
          - link "Terms" [ref=e353]:
            - /url: "#"
          - link "Cookies" [ref=e354]:
            - /url: "#"
  - generic [ref=e356]:
    - link "Call Store" [ref=e357]:
      - /url: tel:+919876543210
      - generic [ref=e360]: Call
    - link "Chat on WhatsApp" [ref=e361]:
      - /url: https://wa.me/919876543210
      - generic [ref=e364]: Chat
    - link "Store Location" [ref=e367]:
      - /url: "#contact"
    - link "Get Directions" [ref=e371]:
      - /url: https://goo.gl/maps/placeholder
      - generic [ref=e374]: Route
    - link "Shop Categories" [ref=e375]:
      - /url: "#categories"
      - generic [ref=e380]: Shop
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
  49  |       expect(page.url()).toBe('http://localhost:3000/')
  50  |     })
  51  | 
  52  |     test('Back button works', async ({ page }) => {
  53  |       await page.goto('/')
  54  |       await page.click('text=Dogs')
> 55  |       await page.waitForNavigation()
      |                  ^ Error: page.waitForNavigation: Test timeout of 30000ms exceeded.
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
  150 |     })
  151 |   })
  152 | 
  153 |   test.describe('7. CRITICAL PATHS', () => {
  154 |     test('Complete user journey', async ({ page }) => {
  155 |       // Homepage
```