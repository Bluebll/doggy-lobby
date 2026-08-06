# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: complete-audit.spec.ts >> Doggy Lobby - Complete QA Audit >> 4. IMAGES >> Collection images load
- Location: tests/complete-audit.spec.ts:103:9

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected value: 404
Received array: [200, 301, 302]
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
    - generic [ref=e161]:
      - generic [ref=e162]:
        - heading "Google Reviews" [level=3] [ref=e163]
        - paragraph [ref=e164]: 4.9/5 from 70+ customers
      - generic [ref=e166]:
        - paragraph [ref=e167]: My goto spot for all pet needs.
        - heading "Yuganter" [level=4] [ref=e168]
        - paragraph [ref=e169]: 1 month ago
        - generic [ref=e170]:
          - button [ref=e171]
          - button [ref=e172]
          - button [ref=e173]
          - button [ref=e174]
          - button [ref=e175]
          - button [ref=e176]
          - button [ref=e177]
          - button [ref=e178]
          - button [ref=e179]
          - button [ref=e180]
          - button [ref=e181]
          - button [ref=e182]
          - button [ref=e183]
          - button [ref=e184]
          - button [ref=e185]
        - paragraph [ref=e186]: 1 of 15
    - generic [ref=e188]:
      - generic [ref=e189]:
        - heading "Questions?" [level=2] [ref=e190]
        - heading "Frequently Asked Questions" [level=3] [ref=e193]
      - generic [ref=e194]:
        - generic [ref=e195]:
          - button "Do you offer delivery in Faridabad?" [expanded] [ref=e196]
          - generic [ref=e200]: Yes, we offer same-day delivery for all orders placed before 4 PM within Faridabad. Delivery is free on orders above ₹1,500. Every delivery is handled by our trained staff to ensure products arrive in pristine condition.
        - button "Are your treats and food products imported?" [ref=e203]
        - button "Do you have products for pets other than dogs and cats?" [ref=e209]
        - button "Can I return a product if my pet doesn't like it?" [ref=e215]
    - generic [ref=e220]:
      - iframe [ref=e223]
      - generic [ref=e227]:
        - heading "Visit Us" [level=2] [ref=e228]
        - heading "Let's meet." [level=3] [ref=e230]
        - generic [ref=e231]:
          - generic [ref=e237]:
            - heading "Sector 15 Market" [level=4] [ref=e238]
            - paragraph [ref=e239]: Next to Mother DairyFaridabad, HR 121007
          - generic [ref=e245]:
            - heading "Business Hours" [level=4] [ref=e246]
            - paragraph [ref=e247]: "Mon - Fri: 10AM - 9PMSat - Sun: 9AM - 10PM"
          - generic [ref=e253]:
            - heading "Email Us" [level=4] [ref=e254]
            - link "hello@doggylobby.in" [ref=e255]:
              - /url: mailto:hello@doggylobby.in
        - generic [ref=e256]:
          - link "Get Directions" [ref=e257]:
            - /url: https://goo.gl/maps/placeholder
          - link "Call Store" [ref=e260]:
            - /url: tel:+919876543210
  - contentinfo [ref=e263]:
    - generic [ref=e264]:
      - generic [ref=e265]:
        - generic [ref=e266]:
          - heading "Join the Club." [level=3] [ref=e267]
          - paragraph [ref=e268]: Subscribe for exclusive offers, premium pet care tips, and early access to new collections.
          - generic [ref=e269]:
            - textbox "Enter your email" [ref=e270]
            - button [ref=e271]
        - generic [ref=e275]:
          - generic [ref=e276]:
            - heading "@doggylobby.in" [level=4] [ref=e277]
            - link "Follow Us" [ref=e281]:
              - /url: "#"
          - generic [ref=e285]:
            - link [ref=e286]:
              - /url: "#"
              - img "Instagram post 1" [ref=e287]
            - link [ref=e292]:
              - /url: "#"
              - img "Instagram post 2" [ref=e293]
            - link [ref=e298]:
              - /url: "#"
              - img "Instagram post 3" [ref=e299]
            - link [ref=e304]:
              - /url: "#"
              - img "Instagram post 4" [ref=e305]
      - generic [ref=e310]:
        - generic [ref=e311]:
          - link "DoggyLobby." [ref=e312]:
            - /url: /
          - paragraph [ref=e313]: Premium pet essentials, curated with love. Making pets happier in Faridabad since 2020. Elevating the standard of pet care.
          - generic [ref=e314]: 4.9/5Google Reviews
        - generic [ref=e327]:
          - heading "Explore" [level=4] [ref=e328]
          - list [ref=e329]:
            - listitem [ref=e330]:
              - link "Shop All" [ref=e331]:
                - /url: "#categories"
            - listitem [ref=e335]:
              - link "Our Story" [ref=e336]:
                - /url: "#about"
            - listitem [ref=e340]:
              - link "FAQ" [ref=e341]:
                - /url: "#faq"
            - listitem [ref=e345]:
              - link "Journal" [ref=e346]:
                - /url: "#"
        - generic [ref=e350]:
          - heading "Store" [level=4] [ref=e351]
          - list [ref=e352]:
            - listitem [ref=e353] [cursor=pointer]:
              - generic [ref=e357]: Sector 15 Market,Faridabad, HR 121007
            - listitem [ref=e358] [cursor=pointer]:
              - generic [ref=e361]: +91 98765 43210
            - listitem [ref=e362] [cursor=pointer]:
              - generic [ref=e366]: hello@doggylobby.in
        - generic [ref=e367]:
          - heading "Hours" [level=4] [ref=e368]
          - list [ref=e369]:
            - listitem [ref=e370]:
              - generic [ref=e371]: Mon - Fri
              - generic [ref=e372]: 10AM - 9PM
            - listitem [ref=e373]:
              - generic [ref=e374]: Saturday
              - generic [ref=e375]: 9AM - 10PM
            - listitem [ref=e376]:
              - generic [ref=e377]: Sunday
              - generic [ref=e378]: Closed
      - generic [ref=e379]:
        - paragraph [ref=e380]: © 2026 Doggy Lobby. Crafted with precision.
        - generic [ref=e381]:
          - link "Privacy" [ref=e382]:
            - /url: "#"
          - link "Terms" [ref=e383]:
            - /url: "#"
          - link "Cookies" [ref=e384]:
            - /url: "#"
  - generic [ref=e386]:
    - link "Call Store" [ref=e387]:
      - /url: tel:+919876543210
      - generic [ref=e390]: Call
    - link "Chat on WhatsApp" [ref=e391]:
      - /url: https://wa.me/919876543210
      - generic [ref=e394]: Chat
    - link "Store Location" [ref=e397]:
      - /url: "#contact"
    - link "Get Directions" [ref=e401]:
      - /url: https://goo.gl/maps/placeholder
      - generic [ref=e404]: Route
    - link "Shop Categories" [ref=e405]:
      - /url: "#categories"
      - generic [ref=e410]: Shop
  - button "Open Next.js Dev Tools" [ref=e416] [cursor=pointer]
  - alert [ref=e422]
```

# Test source

```ts
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
  109 |           const response = await page.evaluate(async (imgSrc) => {
  110 |             try {
  111 |               const res = await fetch(imgSrc, { method: 'HEAD' })
  112 |               return res.status
  113 |             } catch {
  114 |               return null
  115 |             }
  116 |           }, src)
> 117 |           expect([200, 301, 302]).toContain(response)
      |                                   ^ Error: expect(received).toContain(expected) // indexOf
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