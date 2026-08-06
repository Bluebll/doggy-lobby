# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: complete-audit.spec.ts >> Doggy Lobby - Complete QA Audit >> 1. HOMEPAGE >> Navbar visible
- Location: tests/complete-audit.spec.ts:27:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  locator('nav')
Expected: visible
Received: hidden
Timeout:  5000ms

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('nav')
    13 × locator resolved to <nav class="hidden md:flex items-center gap-2 p-1.5 rounded-full bg-white/40 backdrop-blur-md border border-white/40 shadow-sm">…</nav>
       - unexpected value "hidden"

```

```yaml
- banner:
  - link "DoggyLobby.":
    - /url: /
  - button "Toggle menu"
- main:
  - img "Happy dogs"
  - heading "Faridabad's Premium Destination For Happy Pets" [level=1]
  - paragraph: The finest nutrition, curated accessories, and premium care for Faridabad's most discerning pet parents.
  - link "Visit Store":
    - /url: "#contact"
  - link "WhatsApp":
    - /url: https://wa.me/919876543210
  - text: 4.9 Google Rating Imported Brands Premium Products Scroll 4.9★ Google Rating Premium Products Imported Treats Best Prices Trusted by Local Pet Parents
  - heading "Shop by Collection" [level=2]
  - button "Dogs Dogs":
    - img "Dogs"
    - heading "Dogs" [level=3]
  - button "Cats Cats":
    - img "Cats"
    - heading "Cats" [level=3]
  - button "Puppies Puppies":
    - img "Puppies"
    - heading "Puppies" [level=3]
  - button "Kittens Kittens":
    - img "Kittens"
    - heading "Kittens" [level=3]
  - heading "0.0★" [level=3]
  - paragraph: Google Rating
  - heading "0+" [level=3]
  - paragraph: Premium Brands
  - heading "0+" [level=3]
  - paragraph: Curated Products
  - heading "0k+" [level=3]
  - paragraph: Happy Pets
  - img "Happy dog owner"
  - heading "Origin Story" [level=2]
  - heading "Born from pure love." [level=3]
  - 'heading "2020: The Vision" [level=4]'
  - paragraph: "It began with a simple realization: Faridabad's most devoted pet parents were settling for less. Generic kibble, plastic toys, and uninspired accessories dominated the shelves. We believed our companions deserved the same standard of living we demand for ourselves—uncompromising quality and design."
  - heading "Global Standards, Local Presence" [level=4]
  - paragraph: We spent our first year traveling and sourcing. Partnering with organic farms in Europe, bespoke toy makers in the US, and master groomers in Japan. Doggy Lobby was built to be the definitive bridge between global pet luxury and local accessibility in Haryana.
  - heading "More Than Retail" [level=4]
  - paragraph: Today, we are a destination for discerning pet parents. Every product on our shelves is rigorously vetted. If it isn't good enough for our own companions, it doesn't make the cut. We are elevating the standard of pet care, one family at a time.
  - heading "500+" [level=4]
  - paragraph: Curated Brands
  - heading "10k+" [level=4]
  - paragraph: Happy Pets
  - heading "GALLERY" [level=2]
  - heading "Happy Pets, Happy People" [level=3]
  - img "dogs"
  - img "cat"
  - img "puppy"
  - img "kitten"
  - heading "Questions?" [level=2]
  - heading "Frequently Asked Questions" [level=3]
  - button "Do you offer delivery in Faridabad?" [expanded]
  - text: Yes, we offer same-day delivery for all orders placed before 4 PM within Faridabad. Delivery is free on orders above ₹1,500. Every delivery is handled by our trained staff to ensure products arrive in pristine condition.
  - button "Are your treats and food products imported?"
  - button "Do you have products for pets other than dogs and cats?"
  - button "Can I return a product if my pet doesn't like it?"
  - iframe
  - heading "Visit Us" [level=2]
  - heading "Let's meet." [level=3]
  - heading "Sector 15 Market" [level=4]
  - paragraph: Next to Mother Dairy Faridabad, HR 121007
  - heading "Business Hours" [level=4]
  - paragraph: "Mon - Fri: 10AM - 9PM Sat - Sun: 9AM - 10PM"
  - heading "Email Us" [level=4]
  - link "hello@doggylobby.in":
    - /url: mailto:hello@doggylobby.in
  - link "Get Directions":
    - /url: https://goo.gl/maps/placeholder
  - link "Call Store":
    - /url: tel:+919876543210
- contentinfo:
  - heading "Join the Club." [level=3]
  - paragraph: Subscribe for exclusive offers, premium pet care tips, and early access to new collections.
  - textbox "Enter your email"
  - button
  - heading "@doggylobby.in" [level=4]:
    - img
    - text: "@doggylobby.in"
  - link "Follow Us":
    - /url: "#"
  - link "Instagram post 1":
    - /url: "#"
    - img "Instagram post 1"
    - img
  - link "Instagram post 2":
    - /url: "#"
    - img "Instagram post 2"
    - img
  - link "Instagram post 3":
    - /url: "#"
    - img "Instagram post 3"
    - img
  - link "Instagram post 4":
    - /url: "#"
    - img "Instagram post 4"
    - img
  - link "DoggyLobby.":
    - /url: /
  - paragraph: Premium pet essentials, curated with love. Making pets happier in Faridabad since 2020. Elevating the standard of pet care.
  - text: 4.9/5Google Reviews
  - heading "Explore" [level=4]
  - list:
    - listitem:
      - link "Shop All":
        - /url: "#categories"
    - listitem:
      - link "Our Story":
        - /url: "#about"
    - listitem:
      - link "FAQ":
        - /url: "#faq"
    - listitem:
      - link "Journal":
        - /url: "#"
  - heading "Store" [level=4]
  - list:
    - listitem: Sector 15 Market, Faridabad, HR 121007
    - listitem: +91 98765 43210
    - listitem: hello@doggylobby.in
  - heading "Hours" [level=4]
  - list:
    - listitem: Mon - Fri 10AM - 9PM
    - listitem: Saturday 9AM - 10PM
    - listitem: Sunday Closed
  - paragraph: © 2026 Doggy Lobby. Crafted with precision.
  - link "Privacy":
    - /url: "#"
  - link "Terms":
    - /url: "#"
  - link "Cookies":
    - /url: "#"
- link "Call Store":
  - /url: tel:+919876543210
  - text: Call
- link "Chat on WhatsApp":
  - /url: https://wa.me/919876543210
  - text: Chat
- link "Store Location":
  - /url: "#contact"
- link "Get Directions":
  - /url: https://goo.gl/maps/placeholder
  - text: Route
- link "Shop Categories":
  - /url: "#categories"
  - text: Shop
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
> 29  |       await expect(page.locator('nav')).toBeVisible()
      |                                         ^ Error: expect(locator).toBeVisible() failed
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
```