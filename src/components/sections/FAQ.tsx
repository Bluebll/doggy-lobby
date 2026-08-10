"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Plus, Minus } from "lucide-react"

const faqs = [
  {
    question: "Do you offer delivery in Faridabad?",
    answer: "Yes, we offer same-day delivery for all orders placed before 4 PM within Faridabad. Delivery is free on orders above ₹1,500. Every delivery is handled by our trained staff to ensure products arrive in pristine condition."
  },
  {
    question: "Are your treats and food products imported?",
    answer: "We carry a curated mix of top-tier imported brands (from Europe, Japan, and the USA) as well as premium, high-quality domestic brands. Every product is rigorously vetted for nutritional value and safety."
  },
  {
    question: "Do you have products for pets other than dogs and cats?",
    answer: "Currently, our focus is exclusively on providing the highest quality products for dogs and cats. This allows us to maintain our expert curation standards without compromising on depth."
  },
  {
    question: "Can I return a product if my pet doesn't like it?",
    answer: "We have a 7-day return policy for unused accessories and sealed food items. Unfortunately, we cannot accept returns on opened food or treats due to strict hygiene and quality control protocols."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    if (!sectionRef.current || !listRef.current) return
    
    const items = listRef.current.children
    
    gsap.fromTo(items,
      { opacity: 0, y: 30, rotateX: -20 },
      {
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        duration: 0.8,
        stagger: 0.1,
        transformOrigin: "top",
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        clearProps: "all"
      }
    )
  }, [])

  return (
    <section id="faq" ref={sectionRef} className="py-32 bg-white relative z-20">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-[var(--color-brand-orange)] font-bold tracking-widest uppercase text-sm mb-4 flex items-center justify-center gap-2">
            <span className="w-8 h-[2px] bg-[var(--color-brand-orange)]"></span>
            Questions?
            <span className="w-8 h-[2px] bg-[var(--color-brand-orange)]"></span>
          </h2>
          <h3 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-black tracking-tight">
            Frequently Asked Questions
          </h3>
        </div>

        <div ref={listRef} className="space-y-6" style={{ perspective: "1000px" }}>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`rounded-[var(--radius-3xl)] border transition-all duration-300 ${
                openIndex === index 
                  ? 'border-[var(--color-brand-orange)]/30 bg-white shadow-md' 
                  : 'border-gray-100 bg-[var(--color-brand-gray)]/50 hover:bg-[var(--color-brand-gray)]'
              }`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)] group"
              >
                <span className={`font-heading font-bold text-xl transition-colors ${openIndex === index ? 'text-[var(--color-brand-orange)]' : 'text-black group-hover:text-[var(--color-brand-orange)]'}`}>
                  {faq.question}
                </span>
                <span className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${openIndex === index ? 'bg-[var(--color-brand-orange)] text-white rotate-180' : 'bg-white border border-gray-200 text-black group-hover:border-[var(--color-brand-orange)]'}`}>
                  {openIndex === index ? <Minus size={18} aria-hidden="true" /> : <Plus size={18} aria-hidden="true" />}
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.2, 0.65, 0.3, 0.9] }}
                  >
                    <div className="px-8 pb-8 text-gray-500 leading-relaxed text-lg">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
      
      {/* Abstract Background Elements */}
      <div className="absolute left-0 top-[20rem] w-[500px] h-[500px] bg-[var(--color-brand-orange)]/5 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
    </section>
  )
}
