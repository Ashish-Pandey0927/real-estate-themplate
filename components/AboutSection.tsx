"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const CREAM = "#f3f1e9"
const NAVY = "#131a2b"

// ── Data ────────────────────────────────────────────────────────────────────
const STATS = [
  { label: "Homes Sold", numVal: 2400, fmt: (v: number) => `${Math.round(v).toLocaleString()}+` },
  { label: "Industry Experience", numVal: 18, fmt: (v: number) => `${Math.round(v)} yrs` },
  { label: "Client Satisfaction", numVal: 97, fmt: (v: number) => `${Math.round(v)}%` },
  { label: "Total Transaction Value", numVal: 4.2, fmt: (v: number) => `$${v.toFixed(1)}B` },
]

const FEATURES = [
  {
    n: "01",
    title: "Urban & Suburban Markets",
    desc: "Deep local knowledge across metropolitan hubs and quiet suburban communities alike.",
  },
  {
    n: "02",
    title: "Investment Intelligence",
    desc: "Data-driven insights that help you time the market and maximise your return on investment.",
  },
  {
    n: "03",
    title: "White-Glove Service",
    desc: "A dedicated concierge for every client — from first viewing to final handover.",
  },
  {
    n: "04",
    title: "Sustainable Developments",
    desc: "Partnered with eco-conscious builders, we champion homes that respect the planet.",
  },
]

// ── Component ────────────────────────────────────────────────────────────────
export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const statRefs = useRef<(HTMLSpanElement | null)[]>([])
  const dividerRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)
  const featureRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {

      // ── 1. Stats counters ──────────────────────────────────────────────────
      STATS.forEach((stat, i) => {
        const el = statRefs.current[i]
        if (!el) return

        const proxy = { val: 0 }
        gsap.to(proxy, {
          val: stat.numVal,
          duration: 2.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
          onUpdate() { el.textContent = stat.fmt(proxy.val) },
        })

        gsap.from(el.closest(".stat-card")!, {
          y: 40,
          opacity: 0,
          duration: 1.0,
          ease: "power3.out",
          delay: i * 0.12,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        })
      })

      // ── 2. Divider line grows ──────────────────────────────────────────────
      gsap.fromTo(
        dividerRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: dividerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      )

      // ── 3. Quote slides in ────────────────────────────────────────────────
      gsap.from(quoteRef.current, {
        x: -50,
        opacity: 0,
        duration: 1.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: quoteRef.current,
          start: "top 80%",
          once: true,
        },
      })

      // ── 4. Quote border-left "draws" down ────────────────────────────────
      const borderEl = quoteRef.current?.querySelector(".quote-border") as HTMLElement
      if (borderEl) {
        gsap.fromTo(
          borderEl,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            duration: 1.4,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: quoteRef.current,
              start: "top 80%",
              once: true,
            },
          }
        )
      }

      // ── 5. Feature cards stagger in ───────────────────────────────────────
      featureRefs.current.forEach((card, i) => {
        if (!card) return
        gsap.from(card, {
          y: 45,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            once: true,
          },
        })
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={sectionRef}
      className="relative w-full"
      style={{
        background:
          "linear-gradient(170deg, #b8d8e8 0%, #c8e0ed 35%, #d8eaf5 70%, #e2f0f8 100%)", color: NAVY
      }}
    >
      {/* thin top border, consistent with the gallery section */}
      <div className="w-full h-[1px]" style={{ background: NAVY, opacity: 0.15 }} />

      <div className="max-w-6xl mx-auto px-8 py-28 space-y-20">

        {/* ── Eyebrow label, matches "THE CONCEPT" styling ── */}
        <p className="text-xs font-bold tracking-[0.25em] uppercase text-center opacity-80">
          Our Track Record
        </p>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {STATS.map((s, i) => (
            <div key={s.label} className="stat-card flex flex-col gap-3">
              <span
                ref={(el) => { statRefs.current[i] = el }}
                className="text-5xl md:text-6xl tracking-tight tabular-nums"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {s.fmt(0)}
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] opacity-60">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Divider ── */}
        <div
          ref={dividerRef}
          className="w-20 h-px mx-auto"
          style={{ background: NAVY, opacity: 0.3 }}
        />

        {/* ── Quote ── */}
        <div ref={quoteRef} className="flex gap-0 max-w-3xl mx-auto">
          <div
            className="quote-border w-[2px] flex-shrink-0 mr-10"
            style={{ background: NAVY, opacity: 0.35 }}
          />
          <div>
            <p
              className="text-2xl md:text-3xl leading-relaxed"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic" }}
            >
              "Real estate is not just about bricks and mortar — it is about
              building futures, creating legacies, and turning aspirations into
              addresses."
            </p>
            <p className="mt-5 text-[10px] tracking-[0.25em] uppercase opacity-55">
              — Our Philosophy
            </p>
          </div>
        </div>

        {/* ── Feature grid ── */}
        <div className="grid md:grid-cols-2 gap-6">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              ref={(el) => { featureRefs.current[i] = el }}
              className="flex gap-6 p-7 transition-colors duration-300 hover:bg-black/[0.02]"
              style={{ border: `1px solid ${NAVY}1f` }}
            >
              <span
                className="text-sm flex-shrink-0 mt-0.5 tracking-widest opacity-50"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {f.n}
              </span>
              <div>
                <h4 className="font-bold mb-1.5 tracking-wide text-sm uppercase">
                  {f.title}
                </h4>
                <p className="text-sm opacity-70 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      <div className="w-full h-[1px]" style={{ background: NAVY, opacity: 0.15 }} />
    </div>
  )
}