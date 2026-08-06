# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: complete-audit.spec.ts >> Doggy Lobby - Complete QA Audit >> 3. SHOP BY COLLECTION >> dogs collection opens successfully
- Location: tests/complete-audit.spec.ts:65:11

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected substring: "/collections/dogs"
Received string:    "http://localhost:3000/"
```

# Page snapshot

```yaml
- generic [active] [ref=f1e1]:
  - banner [ref=f1e2]:
    - generic [ref=f1e3]:
      - link "DoggyLobby." [ref=f1e4] [cursor=pointer]:
        - /url: /
      - navigation [ref=f1e5]:
        - link "Shop" [ref=f1e6] [cursor=pointer]:
          - /url: "#categories"
        - link "Our Story" [ref=f1e7] [cursor=pointer]:
          - /url: "#about"
        - link "Gallery" [ref=f1e8] [cursor=pointer]:
          - /url: "#gallery"
        - link "FAQ" [ref=f1e9] [cursor=pointer]:
          - /url: "#faq"
      - generic [ref=f1e10]:
        - link "Call Us" [ref=f1e11] [cursor=pointer]:
          - /url: tel:+919876543210
        - link "Visit Store" [ref=f1e16] [cursor=pointer]:
          - /url: "#contact"
  - main [ref=f1e17]:
    - generic [ref=f1e18]:
      - img "Happy dogs" [ref=f1e20]
      - generic [ref=f1e36]:
        - generic [ref=f1e37]: 4.9 Google Rating
        - generic [ref=f1e38]: Trusted locally
      - generic [ref=f1e39]:
        - heading "Faridabad's Premium Destination For Happy Pets" [level=1] [ref=f1e40]:
          - generic [ref=f1e41]: Faridabad's
          - generic [ref=f1e42]: Premium
          - generic [ref=f1e43]: Destination
          - generic [ref=f1e44]: For
          - generic [ref=f1e45]: Happy
          - generic [ref=f1e46]: Pets
        - paragraph [ref=f1e47]: The finest nutrition, curated accessories, and premium care for Faridabad's most discerning pet parents.
        - generic [ref=f1e48]:
          - link "Visit Store" [ref=f1e51] [cursor=pointer]:
            - /url: "#contact"
          - link "WhatsApp" [ref=f1e57] [cursor=pointer]:
            - /url: https://wa.me/919876543210
        - generic [ref=f1e61]:
          - generic [ref=f1e62]: 4.9 Google Rating
          - generic [ref=f1e65]: Imported Brands
          - generic [ref=f1e69]: Premium Products
      - generic [ref=f1e73]: Scroll
    - generic [ref=f1e79]:
      - generic [ref=f1e80]: 4.9★ Google Rating
      - generic [ref=f1e85]: Premium Products
      - generic [ref=f1e91]: Imported Treats
      - generic [ref=f1e96]: Best Prices
      - generic [ref=f1e101]: Trusted by Local Pet Parents
    - generic [ref=f1e107]:
      - heading "Shop by Collection" [level=2] [ref=f1e108]
      - generic [ref=f1e109]:
        - button [ref=f1e110] [cursor=pointer]:
          - img "Dogs" [ref=f1e111]
          - heading "Dogs" [level=3] [ref=f1e114]
        - button [ref=f1e115] [cursor=pointer]:
          - img "Cats" [ref=f1e116]
          - heading "Cats" [level=3] [ref=f1e119]
        - button [ref=f1e120] [cursor=pointer]:
          - img "Puppies" [ref=f1e121]
          - heading "Puppies" [level=3] [ref=f1e124]
        - button [ref=f1e125] [cursor=pointer]:
          - img "Kittens" [ref=f1e126]
          - heading "Kittens" [level=3] [ref=f1e129]
    - generic [ref=f1e132]:
      - generic [ref=f1e133]:
        - heading "0.0★" [level=3] [ref=f1e134]
        - paragraph [ref=f1e135]: Google Rating
      - generic [ref=f1e136]:
        - heading "0+" [level=3] [ref=f1e137]
        - paragraph [ref=f1e138]: Premium Brands
      - generic [ref=f1e139]:
        - heading "0+" [level=3] [ref=f1e140]
        - paragraph [ref=f1e141]: Curated Products
      - generic [ref=f1e142]:
        - heading "0k+" [level=3] [ref=f1e143]
        - paragraph [ref=f1e144]: Happy Pets
    - generic [ref=f1e146]:
      - generic [ref=f1e147]:
        - img "Happy dog owner" [ref=f1e149]
        - generic [ref=f1e151]:
          - heading "Origin Story" [level=2] [ref=f1e152]
          - heading "Born from pure love." [level=3] [ref=f1e153]: Born frompure love.
      - generic [ref=f1e156]:
        - generic [ref=f1e157]:
          - 'heading "2020: The Vision" [level=4] [ref=f1e159]'
          - paragraph [ref=f1e160]: "It began with a simple realization: Faridabad's most devoted pet parents were settling for less. Generic kibble, plastic toys, and uninspired accessories dominated the shelves. We believed our companions deserved the same standard of living we demand for ourselves—uncompromising quality and design."
        - generic [ref=f1e161]:
          - heading "Global Standards, Local Presence" [level=4] [ref=f1e163]
          - paragraph [ref=f1e164]: We spent our first year traveling and sourcing. Partnering with organic farms in Europe, bespoke toy makers in the US, and master groomers in Japan. Doggy Lobby was built to be the definitive bridge between global pet luxury and local accessibility in Haryana.
        - generic [ref=f1e165]:
          - heading "More Than Retail" [level=4] [ref=f1e167]
          - paragraph [ref=f1e168]: Today, we are a destination for discerning pet parents. Every product on our shelves is rigorously vetted. If it isn't good enough for our own companions, it doesn't make the cut. We are elevating the standard of pet care, one family at a time.
          - generic [ref=f1e169]:
            - generic [ref=f1e170]:
              - heading "500+" [level=4] [ref=f1e171]
              - paragraph [ref=f1e172]: Curated Brands
            - generic [ref=f1e173]:
              - heading "10k+" [level=4] [ref=f1e174]
              - paragraph [ref=f1e175]: Happy Pets
    - generic [ref=f1e176]:
      - generic [ref=f1e177]:
        - heading "GALLERY" [level=2] [ref=f1e178]
        - heading "Happy Pets, Happy People" [level=3] [ref=f1e179]
      - generic [ref=f1e181]:
        - img "dogs" [ref=f1e183]
        - img "cat" [ref=f1e185]
        - img "puppy" [ref=f1e187]
        - img "kitten" [ref=f1e189]
    - generic [ref=f1e191]:
      - generic [ref=f1e192]:
        - heading "Questions?" [level=2] [ref=f1e193]
        - heading "Frequently Asked Questions" [level=3] [ref=f1e196]
      - generic [ref=f1e197]:
        - generic [ref=f1e198]:
          - button "Do you offer delivery in Faridabad?" [expanded] [ref=f1e199]
          - generic: Yes, we offer same-day delivery for all orders placed before 4 PM within Faridabad. Delivery is free on orders above ₹1,500. Every delivery is handled by our trained staff to ensure products arrive in pristine condition.
        - button "Are your treats and food products imported?" [ref=f1e205]
        - button "Do you have products for pets other than dogs and cats?" [ref=f1e210]
        - button "Can I return a product if my pet doesn't like it?" [ref=f1e215]
    - generic [ref=f1e219]:
      - iframe [ref=f1e222]
      - generic [ref=f1e226]:
        - heading "Visit Us" [level=2] [ref=f1e227]
        - heading "Let's meet." [level=3] [ref=f1e229]
        - generic [ref=f1e230]:
          - generic [ref=f1e236]:
            - heading "Sector 15 Market" [level=4] [ref=f1e237]
            - paragraph [ref=f1e238]: Next to Mother DairyFaridabad, HR 121007
          - generic [ref=f1e244]:
            - heading "Business Hours" [level=4] [ref=f1e245]
            - paragraph [ref=f1e246]: "Mon - Fri: 10AM - 9PMSat - Sun: 9AM - 10PM"
          - generic [ref=f1e252]:
            - heading "Email Us" [level=4] [ref=f1e253]
            - link "hello@doggylobby.in" [ref=f1e254] [cursor=pointer]:
              - /url: mailto:hello@doggylobby.in
        - generic [ref=f1e255]:
          - link "Get Directions" [ref=f1e256] [cursor=pointer]:
            - /url: https://goo.gl/maps/placeholder
          - link "Call Store" [ref=f1e259] [cursor=pointer]:
            - /url: tel:+919876543210
      - link [ref=f1e264] [cursor=pointer]:
        - /url: https://wa.me/919876543210
  - contentinfo [ref=f1e270]:
    - generic [ref=f1e271]:
      - generic [ref=f1e272]:
        - generic [ref=f1e273]:
          - heading "Join the Club." [level=3] [ref=f1e274]
          - paragraph [ref=f1e275]: Subscribe for exclusive offers, premium pet care tips, and early access to new collections.
          - generic [ref=f1e276]:
            - textbox "Enter your email" [ref=f1e277]
            - button [ref=f1e278]
        - generic [ref=f1e282]:
          - generic [ref=f1e283]:
            - heading "@doggylobby.in" [level=4] [ref=f1e284]
            - link "Follow Us" [ref=f1e288] [cursor=pointer]:
              - /url: "#"
          - generic [ref=f1e292]:
            - link [ref=f1e293] [cursor=pointer]:
              - /url: "#"
              - img "Instagram post 1" [ref=f1e294]
            - link [ref=f1e299] [cursor=pointer]:
              - /url: "#"
              - img "Instagram post 2" [ref=f1e300]
            - link [ref=f1e305] [cursor=pointer]:
              - /url: "#"
              - img "Instagram post 3" [ref=f1e306]
            - link [ref=f1e311] [cursor=pointer]:
              - /url: "#"
              - img "Instagram post 4" [ref=f1e312]
      - generic [ref=f1e317]:
        - generic [ref=f1e318]:
          - link "DoggyLobby." [ref=f1e319] [cursor=pointer]:
            - /url: /
          - paragraph [ref=f1e320]: Premium pet essentials, curated with love. Making pets happier in Faridabad since 2020. Elevating the standard of pet care.
          - generic [ref=f1e321]: 4.9/5Google Reviews
        - generic [ref=f1e334]:
          - heading "Explore" [level=4] [ref=f1e335]
          - list [ref=f1e336]:
            - listitem [ref=f1e337]:
              - link "Shop All" [ref=f1e338] [cursor=pointer]:
                - /url: "#categories"
            - listitem [ref=f1e342]:
              - link "Our Story" [ref=f1e343] [cursor=pointer]:
                - /url: "#about"
            - listitem [ref=f1e347]:
              - link "FAQ" [ref=f1e348] [cursor=pointer]:
                - /url: "#faq"
            - listitem [ref=f1e352]:
              - link "Journal" [ref=f1e353] [cursor=pointer]:
                - /url: "#"
        - generic [ref=f1e357]:
          - heading "Store" [level=4] [ref=f1e358]
          - list [ref=f1e359]:
            - listitem [ref=f1e360] [cursor=pointer]:
              - generic [ref=f1e364]: Sector 15 Market,Faridabad, HR 121007
            - listitem [ref=f1e365] [cursor=pointer]:
              - generic [ref=f1e368]: +91 98765 43210
            - listitem [ref=f1e369] [cursor=pointer]:
              - generic [ref=f1e373]: hello@doggylobby.in
        - generic [ref=f1e374]:
          - heading "Hours" [level=4] [ref=f1e375]
          - list [ref=f1e376]:
            - listitem [ref=f1e377]:
              - generic [ref=f1e378]: Mon - Fri
              - generic [ref=f1e379]: 10AM - 9PM
            - listitem [ref=f1e380]:
              - generic [ref=f1e381]: Saturday
              - generic [ref=f1e382]: 9AM - 10PM
            - listitem [ref=f1e383]:
              - generic [ref=f1e384]: Sunday
              - generic [ref=f1e385]: Closed
      - generic [ref=f1e386]:
        - paragraph [ref=f1e387]: © 2026 Doggy Lobby. Crafted with precision.
        - generic [ref=f1e388]:
          - link "Privacy" [ref=f1e389] [cursor=pointer]:
            - /url: "#"
          - link "Terms" [ref=f1e390] [cursor=pointer]:
            - /url: "#"
          - link "Cookies" [ref=f1e391] [cursor=pointer]:
            - /url: "#"
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
> 78  |         expect(page.url()).toContain(`/collections/${collection}`)
      |                            ^ Error: expect(received).toContain(expected) // indexOf
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
  156 |       await page.goto('/')
  157 |       expect(page).toHaveTitle(/Doggy/)
  158 |       
  159 |       // Navigate to collection
  160 |       const collectionButton = page.locator('button').filter({ hasText: /Dogs|Cats/ }).first()
  161 |       if (await collectionButton.isVisible()) {
  162 |         await collectionButton.click()
  163 |         await page.waitForNavigation()
  164 |         expect(page.url()).toContain('/collections/')
  165 |       }
  166 |       
  167 |       // Return home
  168 |       await page.goBack()
  169 |       expect(page.url()).toBe('http://localhost:3000/')
  170 |     })
  171 |   })
  172 | })
  173 | 
```