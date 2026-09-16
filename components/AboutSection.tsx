"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const CREAM = "#f3f1e9"
const NAVY = "#131a2b"
const VILLA_SRC = "/villa.mp4"

const REASONS = [
  { image: "/Swimming-pool.webp", caption: "A community built around walking paths, not corridors." },
  { image: "/Swimming-pool.webp", caption: "Stone and greenery chosen to age well, not just to photograph well." },
  { image: "/Swimming-pool.webp", caption: "Twenty five homes, never more, so it stays quiet." },
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const paragraphRef = useRef<HTMLDivElement>(null)
  const nextFlowerRef = useRef<HTMLVideoElement>(null)
  const nextTextRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.set(headlineRef.current, { opacity: 0, y: 24 })
      gsap.set(cardRef.current, { opacity: 0, y: 20 })
      gsap.set(paragraphRef.current, { opacity: 0, y: 16 })
      gsap.set(nextFlowerRef.current, { opacity: 0, scale: 0.9 })
      gsap.set(nextTextRef.current, { opacity: 0, y: 16 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      // Phase 1, 0 to 0.4: headline, then carousel card, then paragraph fade in in sequence
      tl.to(headlineRef.current, { opacity: 1, y: 0, ease: "power2.out" }, 0)
        .to(cardRef.current, { opacity: 1, y: 0, ease: "power2.out" }, 0.15)
        .to(paragraphRef.current, { opacity: 1, y: 0, ease: "power2.out" }, 0.3)

        // Phase 3, 0.75 to 1: whole overlay fades to reveal the next section (unchanged)
        .to(overlayRef.current, { opacity: 0, ease: "power1.inOut" }, 0.78)
        .to(nextFlowerRef.current, { opacity: 0.9, scale: 1, ease: "power2.out" }, 0.85)
        .to(nextTextRef.current, { opacity: 1, y: 0, ease: "power2.out" }, 0.9)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden" style={{ background: CREAM }}>
      <div ref={overlayRef} className="absolute inset-0 flex flex-col items-center justify-center">
        <div ref={railRef} className="absolute top-24 left-8 md:left-10 hidden md:flex flex-col items-center gap-6">
          <span className="text-xs font-bold tracking-widest" style={{ color: NAVY }}>16</span>
          <div className="w-[1px] h-56 opacity-30" style={{ background: NAVY }} />
        </div>

        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2
            ref={headlineRef}
            className="text-5xl md:text-7xl leading-[0.95] tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: NAVY }}
          >
            Grounded in Place
          </h2>

          <div ref={cardRef} className="mt-12 flex items-center justify-center gap-6">
            <button
              aria-label="Previous"
              onClick={() => setActive((i) => (i - 1 + REASONS.length) % REASONS.length)}
              className="text-lg opacity-50 hover:opacity-100 transition-opacity"
              style={{ color: NAVY }}
            >
              ‹
            </button>

            <div className="w-[380px] max-w-[65vw] h-56 overflow-hidden shadow-xl">
              <img src={REASONS[active].image} alt="" className="w-full h-full object-cover" />
            </div>

            <button
              aria-label="Next"
              onClick={() => setActive((i) => (i + 1) % REASONS.length)}
              className="text-lg opacity-50 hover:opacity-100 transition-opacity"
              style={{ color: NAVY }}
            >
              ›
            </button>
          </div>

          <div className="flex items-center justify-center gap-3 mt-5">
            <span className="text-xs font-bold" style={{ color: NAVY }}>{active + 1}</span>
            <div className="w-32 h-[1px] relative" style={{ background: `${NAVY}33` }}>
              <div
                className="absolute top-0 left-0 h-full transition-all duration-500"
                style={{ width: `${((active + 1) / REASONS.length) * 100}%`, background: NAVY }}
              />
            </div>
            <span className="text-xs font-bold opacity-50" style={{ color: NAVY }}>{REASONS.length}</span>
          </div>

          <div ref={paragraphRef} className="mt-10 max-w-lg mx-auto">
            <p className="text-base md:text-lg leading-relaxed" style={{ color: NAVY, opacity: 0.85 }}>
              {REASONS[active].caption}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center z-10">
        <video
          ref={nextFlowerRef}
          src={VILLA_SRC}
          autoPlay muted loop playsInline preload="auto"
          className="absolute right-10 bottom-0 w-[38vw] h-[50vw] max-w-md max-h-md object-cover mix-blend-multiply pointer-events-none"
        />
        <div ref={nextTextRef} className="relative z-20 pl-16 md:pl-24 max-w-lg">
          <p className="text-2xl md:text-4xl leading-snug" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: NAVY }}>
            Every detail here was placed on purpose, not carried over from a plan
            built for somewhere else.
          </p>
        </div>
      </div>
    </section>
  )
}