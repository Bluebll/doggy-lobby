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
      - link "DoggyLobby." [ref=e4] [cursor=pointer]:
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
  - main [ref=e17]:
    - generic [ref=e18]:
      - img "Happy dogs" [ref=e20]
      - generic [ref=e36]:
        - generic [ref=e37]: 4.9 Google Rating
        - generic [ref=e38]: Trusted locally
      - generic [ref=e39]:
        - heading "Faridabad's Premium Destination For Happy Pets" [level=1] [ref=e40]:
          - generic [ref=e41]: Faridabad's
          - generic [ref=e42]: Premium
          - generic [ref=e43]: Destination
          - generic [ref=e44]: For
          - generic [ref=e45]: Happy
          - generic [ref=e46]: Pets
        - paragraph [ref=e47]: The finest nutrition, curated accessories, and premium care for Faridabad's most discerning pet parents.
        - generic [ref=e48]:
          - link "Visit Store" [ref=e51] [cursor=pointer]:
            - /url: "#contact"
          - link "WhatsApp" [ref=e57] [cursor=pointer]:
            - /url: https://wa.me/919876543210
        - generic [ref=e61]:
          - generic [ref=e62]: 4.9 Google Rating
          - generic [ref=e65]: Imported Brands
          - generic [ref=e69]: Premium Products
      - generic [ref=e73]: Scroll
    - generic [ref=e79]:
      - generic [ref=e80]: 4.9★ Google Rating
      - generic [ref=e85]: Premium Products
      - generic [ref=e91]: Imported Treats
      - generic [ref=e96]: Best Prices
      - generic [ref=e101]: Trusted by Local Pet Parents
    - generic [ref=e107]:
      - heading "Shop by Collection" [level=2] [ref=e108]
      - generic [ref=e109]:
        - button [ref=e110] [cursor=pointer]:
          - img "Dogs" [ref=e111]
          - heading "Dogs" [level=3] [ref=e114]
        - button [ref=e115] [cursor=pointer]:
          - img "Cats" [ref=e116]
          - heading "Cats" [level=3] [ref=e119]
        - button [ref=e120] [cursor=pointer]:
          - img "Puppies" [ref=e121]
          - heading "Puppies" [level=3] [ref=e124]
        - button [ref=e125] [cursor=pointer]:
          - img "Kittens" [ref=e126]
          - heading "Kittens" [level=3] [ref=e129]
    - generic [ref=e132]:
      - generic [ref=e133]:
        - heading "0.0★" [level=3] [ref=e134]
        - paragraph [ref=e135]: Google Rating
      - generic [ref=e136]:
        - heading "0+" [level=3] [ref=e137]
        - paragraph [ref=e138]: Premium Brands
      - generic [ref=e139]:
        - heading "0+" [level=3] [ref=e140]
        - paragraph [ref=e141]: Curated Products
      - generic [ref=e142]:
        - heading "0k+" [level=3] [ref=e143]
        - paragraph [ref=e144]: Happy Pets
    - generic [ref=e146]:
      - generic [ref=e147]:
        - img "Happy dog owner" [ref=e149]
        - generic [ref=e151]:
          - heading "Origin Story" [level=2] [ref=e152]
          - heading "Born from pure love." [level=3] [ref=e153]: Born frompure love.
      - generic [ref=e156]:
        - generic [ref=e157]:
          - 'heading "2020: The Vision" [level=4] [ref=e159]'
          - paragraph [ref=e160]: "It began with a simple realization: Faridabad's most devoted pet parents were settling for less. Generic kibble, plastic toys, and uninspired accessories dominated the shelves. We believed our companions deserved the same standard of living we demand for ourselves—uncompromising quality and design."
        - generic [ref=e161]:
          - heading "Global Standards, Local Presence" [level=4] [ref=e163]
          - paragraph [ref=e164]: We spent our first year traveling and sourcing. Partnering with organic farms in Europe, bespoke toy makers in the US, and master groomers in Japan. Doggy Lobby was built to be the definitive bridge between global pet luxury and local accessibility in Haryana.
        - generic [ref=e165]:
          - heading "More Than Retail" [level=4] [ref=e167]
          - paragraph [ref=e168]: Today, we are a destination for discerning pet parents. Every product on our shelves is rigorously vetted. If it isn't good enough for our own companions, it doesn't make the cut. We are elevating the standard of pet care, one family at a time.
          - generic [ref=e169]:
            - generic [ref=e170]:
              - heading "500+" [level=4] [ref=e171]
              - paragraph [ref=e172]: Curated Brands
            - generic [ref=e173]:
              - heading "10k+" [level=4] [ref=e174]
              - paragraph [ref=e175]: Happy Pets
    - generic [ref=e176]:
      - generic [ref=e177]:
        - heading "GALLERY" [level=2] [ref=e178]
        - heading "Happy Pets, Happy People" [level=3] [ref=e179]
      - generic [ref=e181]:
        - img "dogs" [ref=e183]
        - img "cat" [ref=e185]
        - img "puppy" [ref=e187]
        - img "kitten" [ref=e189]
    - generic [ref=e190]:
      - generic [ref=e191]:
        - heading "Google Reviews" [level=3] [ref=e192]
        - paragraph [ref=e193]: 4.9/5 from 70+ customers
      - generic [ref=e195]:
        - paragraph [ref=e196]: My goto spot for all pet needs.
        - heading "Yuganter" [level=4] [ref=e197]
        - paragraph [ref=e198]: 1 month ago
        - generic [ref=e199]:
          - button [ref=e200]
          - button [ref=e201]
          - button [ref=e202]
          - button [ref=e203]
          - button [ref=e204]
          - button [ref=e205]
          - button [ref=e206]
          - button [ref=e207]
          - button [ref=e208]
          - button [ref=e209]
          - button [ref=e210]
          - button [ref=e211]
          - button [ref=e212]
          - button [ref=e213]
          - button [ref=e214]
        - paragraph [ref=e215]: 1 of 15
    - generic [ref=e217]:
      - generic [ref=e218]:
        - heading "Questions?" [level=2] [ref=e219]
        - heading "Frequently Asked Questions" [level=3] [ref=e222]
      - generic [ref=e223]:
        - generic [ref=e224]:
          - button "Do you offer delivery in Faridabad?" [expanded] [ref=e225]
          - generic [ref=e229]: Yes, we offer same-day delivery for all orders placed before 4 PM within Faridabad. Delivery is free on orders above ₹1,500. Every delivery is handled by our trained staff to ensure products arrive in pristine condition.
        - button "Are your treats and food products imported?" [ref=e232]
        - button "Do you have products for pets other than dogs and cats?" [ref=e238]
        - button "Can I return a product if my pet doesn't like it?" [ref=e244]
    - generic [ref=e249]:
      - iframe [ref=e252]:
        
      - generic [ref=e256]:
        - heading "Visit Us" [level=2] [ref=e257]
        - heading "Let's meet." [level=3] [ref=e259]
        - generic [ref=e260]:
          - generic [ref=e266]:
            - heading "Sector 15 Market" [level=4] [ref=e267]
            - paragraph [ref=e268]: Next to Mother DairyFaridabad, HR 121007
          - generic [ref=e274]:
            - heading "Business Hours" [level=4] [ref=e275]
            - paragraph [ref=e276]: "Mon - Fri: 10AM - 9PMSat - Sun: 9AM - 10PM"
          - generic [ref=e282]:
            - heading "Email Us" [level=4] [ref=e283]
            - link "hello@doggylobby.in" [ref=e284] [cursor=pointer]:
              - /url: mailto:hello@doggylobby.in
        - generic [ref=e285]:
          - link "Get Directions" [ref=e286] [cursor=pointer]:
            - /url: https://goo.gl/maps/placeholder
          - link "Call Store" [ref=e289] [cursor=pointer]:
            - /url: tel:+919876543210
      - link [ref=e294] [cursor=pointer]:
        - /url: https://wa.me/919876543210
  - contentinfo [ref=e300]:
    - generic [ref=e301]:
      - generic [ref=e302]:
        - generic [ref=e303]:
          - heading "Join the Club." [level=3] [ref=e304]
          - paragraph [ref=e305]: Subscribe for exclusive offers, premium pet care tips, and early access to new collections.
          - generic [ref=e306]:
            - textbox "Enter your email" [ref=e307]
            - button [ref=e308]
        - generic [ref=e312]:
          - generic [ref=e313]:
            - heading "@doggylobby.in" [level=4] [ref=e314]
            - link "Follow Us" [ref=e318] [cursor=pointer]:
              - /url: "#"
          - generic [ref=e322]:
            - link [ref=e323] [cursor=pointer]:
              - /url: "#"
              - img "Instagram post 1" [ref=e324]
            - link [ref=e329] [cursor=pointer]:
              - /url: "#"
              - img "Instagram post 2" [ref=e330]
            - link [ref=e335] [cursor=pointer]:
              - /url: "#"
              - img "Instagram post 3" [ref=e336]
            - link [ref=e341] [cursor=pointer]:
              - /url: "#"
              - img "Instagram post 4" [ref=e342]
      - generic [ref=e347]:
        - generic [ref=e348]:
          - link "DoggyLobby." [ref=e349] [cursor=pointer]:
            - /url: /
          - paragraph [ref=e350]: Premium pet essentials, curated with love. Making pets happier in Faridabad since 2020. Elevating the standard of pet care.
          - generic [ref=e351]: 4.9/5Google Reviews
        - generic [ref=e364]:
          - heading "Explore" [level=4] [ref=e365]
          - list [ref=e366]:
            - listitem [ref=e367]:
              - link "Shop All" [ref=e368] [cursor=pointer]:
                - /url: "#categories"
            - listitem [ref=e372]:
              - link "Our Story" [ref=e373] [cursor=pointer]:
                - /url: "#about"
            - listitem [ref=e377]:
              - link "FAQ" [ref=e378] [cursor=pointer]:
                - /url: "#faq"
            - listitem [ref=e382]:
              - link "Journal" [ref=e383] [cursor=pointer]:
                - /url: "#"
        - generic [ref=e387]:
          - heading "Store" [level=4] [ref=e388]
          - list [ref=e389]:
            - listitem [ref=e390] [cursor=pointer]:
              - generic [ref=e394]: Sector 15 Market,Faridabad, HR 121007
            - listitem [ref=e395] [cursor=pointer]:
              - generic [ref=e398]: +91 98765 43210
            - listitem [ref=e399] [cursor=pointer]:
              - generic [ref=e403]: hello@doggylobby.in
        - generic [ref=e404]:
          - heading "Hours" [level=4] [ref=e405]
          - list [ref=e406]:
            - listitem [ref=e407]:
              - generic [ref=e408]: Mon - Fri
              - generic [ref=e409]: 10AM - 9PM
            - listitem [ref=e410]:
              - generic [ref=e411]: Saturday
              - generic [ref=e412]: 9AM - 10PM
            - listitem [ref=e413]:
              - generic [ref=e414]: Sunday
              - generic [ref=e415]: Closed
      - generic [ref=e416]:
        - paragraph [ref=e417]: © 2026 Doggy Lobby. Crafted with precision.
        - generic [ref=e418]:
          - link "Privacy" [ref=e419] [cursor=pointer]:
            - /url: "#"
          - link "Terms" [ref=e420] [cursor=pointer]:
            - /url: "#"
          - link "Cookies" [ref=e421] [cursor=pointer]:
            - /url: "#"
  - button "Open Next.js Dev Tools" [ref=e427] [cursor=pointer]
  - alert [ref=e431]
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