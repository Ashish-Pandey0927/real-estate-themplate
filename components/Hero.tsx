"use client"

import { useEffect, useState, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function Hero() {
  // ─── React state for phases 1-3 (original scroll-sync logic) ────────────
  const [scrollY, setScrollY] = useState(0)
  const containerRef   = useRef<HTMLDivElement>(null)
  const domeRef        = useRef<HTMLDivElement>(null)
  const domeContentRef = useRef<HTMLDivElement>(null)

  // Original rAF-throttled scroll listener — perfect 1:1 sync with scroll
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // ─── GSAP: entrance + dome only ─────────────────────────────────────────
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    let cleanupPreloaderFn = () => {}

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(containerRef.current!)

      // Dome initial state
      gsap.set(domeRef.current, { clipPath: "ellipse(65% 0% at 50% 100%)" })
      gsap.set(domeContentRef.current, { opacity: 0, y: 20 })

      // ── Entrance (page load) ──
      // Only target leaf elements so React's parent inline-styles don't conflict
      const intro = gsap.timeline({ paused: true })
      intro
        .fromTo(q(".hero-bg"), 
          { scale: 1.08 }, 
          { scale: 1, duration: 1.5, ease: "power2.out" }, 
          0
        )
        .to(q(".hero-word"), {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.07,
        }, 0)
        .fromTo("header", 
          { y: -20, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 
          0.3 // slightly after the heading starts
        )

      const onPreloaderComplete = () => intro.play()
      window.addEventListener("preloaderComplete", onPreloaderComplete)
      // Fallback in case preloader isn't present or already finished
      const fallbackTimer = setTimeout(() => intro.play(), 2500)

      // Store cleanup function in a variable accessible outside the context
      cleanupPreloaderFn = () => {
        window.removeEventListener("preloaderComplete", onPreloaderComplete)
        clearTimeout(fallbackTimer)
      }

      // ── Dome rise + expand (phases 4-5): scroll 2400 → 3800 ──
      // Separate from the scrubbed React phases — uses its own ScrollTrigger
      const domeTl = gsap.timeline({ paused: true })
      domeTl
        // Phase 4 (0% → 57%): dome rises
        .to(domeRef.current, {
          clipPath: "ellipse(65% 55% at 50% 100%)",
          ease: "power2.out",
          duration: 0.57,
        }, 0)
        // Content fades in mid-rise
        .to(domeContentRef.current, {
          opacity: 1, y: 0,
          ease: "power2.out",
          duration: 0.28,
        }, 0.28)
        // Phase 5 (57% → 100%): dome expands full-screen
        .to(domeRef.current, {
          clipPath: "ellipse(200% 200% at 50% 100%)",
          ease: "power3.inOut",
          duration: 0.43,
        }, 0.57)

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top+=2400 top",   // when scrollY = 2400
        end:   "top+=3800 top",   // when scrollY = 3800
        scrub: 1.8,
        animation: domeTl,
      })

    }, containerRef)

    return () => {
      ctx.revert()
      cleanupPreloaderFn()
    }
  }, [])

  // ─── Original scroll-phase calculations (untouched) ─────────────────────
  const pinDistance = 3800
  const progressY = Math.min(scrollY, pinDistance)

  // Phase 1: Heading disappears (0 → 250)
  const headingTranslateY = Math.min(progressY * 0.5, 50)
  const headingOpacity    = Math.max(1 - progressY / 250, 0)

  // Continuous parallax (House & Clouds)
  const houseScrollOffset = progressY * 1.0
  const houseScale        = 1 + progressY * 0.0005
  const cloudBehindX      = -progressY * 0.15
  const cloudFrontX       = progressY * 0.25

  // Phase 2: SVG outline draws (300 → 2200)
  const drawStart    = 300
  const drawEnd      = 2200
  const drawProgress = Math.max(0, Math.min(1, (progressY - drawStart) / (drawEnd - drawStart)))
  const outlineOpacity = progressY > drawStart ? 1 : 0

  // Phase 3: Sky-mask snaps in (2200 → 2220)
  const maskOpacity = Math.max(0, Math.min(1, (progressY - 2200) / 20))

  // Original CSS transitions — what made the house feel smooth
  const transitionStyle    = "transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1)"
  const svgTransitionStyle = "stroke-dashoffset 0.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1)"
  const maskTransitionStyle = "opacity 0.1s linear"

  return (
    <div
      ref={containerRef}
      style={{ height: `calc(100vh + ${pinDistance}px)` }}
      className="relative w-full"
    >
      <section className="sticky top-0 h-screen w-full overflow-hidden">
        <div 
          className="hero-bg absolute inset-0 bg-cover bg-center z-0 origin-center" 
          style={{ backgroundImage: "url('/bg-sky.jpg')" }} 
        />
        {/* ── Background clouds ── */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ transform: `translateX(${cloudBehindX}px)`, transition: transitionStyle }}
        >
          <img src="/cloud1.png" alt="" className="absolute left-8 top-24 w-72 opacity-90" />
          <img src="/cloud5.png" alt="" className="absolute left-56 top-44 w-96 opacity-90" />
        </div>

        {/* ── Heading ── */}
        {/* Outer div: no GSAP inline styles conflict here.
            GSAP entrance targets .hero-word (children).
            React scroll state targets this wrapper div. */}
        <div
          className="relative z-20 max-w-7xl mx-auto h-full flex items-center px-6"
          style={{
            transform: `translateY(${headingTranslateY}px)`,
            opacity: headingOpacity,
            transition: transitionStyle,
          }}
        >
          <div className="w-1/2 flex items-start z-30">
            <h2 className="text-3xl lg:text-4xl text-left text-gray-800 drop-shadow-md font-semibold mt-20 flex flex-wrap gap-x-2">
              {"Find your dream home".split(" ").map((word, i) => (
                <span key={i} className="hero-word inline-block opacity-0" style={{ transform: "translateY(40px)" }}>{word}</span>
              ))}
            </h2>
          </div>
          <div className="w-1/2 flex items-center justify-center -mt-20 z-8">
            <h1 className="text-[7rem] font-extrabold text-center text-gray-900 drop-shadow-lg tracking-tight flex flex-wrap justify-center gap-x-6">
              {"Real estate".split(" ").map((word, i) => (
                <span key={i} className="hero-word inline-block opacity-0" style={{ transform: "translateY(40px)" }}>{word}</span>
              ))}
            </h1>
          </div>
        </div>

        {/* ── Foreground house — original parallax transform ── */}
        <div
          className="absolute left-0 bottom-0 z-30 w-full pointer-events-none origin-bottom flex justify-center"
          style={{
            transform: `translateY(max(0px, 20vh - ${houseScrollOffset}px)) scale(${houseScale})`,
            transition: transitionStyle,
          }}
        >
          <img src="/house.png" alt="house" className="w-full h-[120vh] object-cover object-top" />
        </div>

        {/* ── Foreground clouds ── */}
        <div className="absolute inset-0 z-40 pointer-events-none">
          <img src="/cloud4.png" alt="" className="absolute top-42 w-full opacity-95" />
          <img
            src="/cloud5.png"
            alt=""
            className="absolute right-48 top-12 w-[500px] opacity-95"
            style={{ transform: `translateX(${cloudFrontX}px)`, transition: transitionStyle }}
          />
        </div>

        {/* ── SVG: outline draw + sky mask (original logic) ── */}
        <svg className="absolute inset-0 w-full h-full z-45 pointer-events-none">
          <defs>
            <mask id="textMask">
              <rect width="100%" height="100%" fill="white" />
              <text
                x="50%" y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="12vw"
                fontWeight="900"
                fill="black"
                style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif", letterSpacing: "-0.05em" }}
              >
                Real estate
              </text>
            </mask>
          </defs>

          {/* Sky image — visible only outside the text cutout */}
          <image
            href="/bg-sky.jpg"
            x="0" y="0"
            width="100%" height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#textMask)"
            style={{ opacity: maskOpacity, transition: maskTransitionStyle }}
          />

          {/* Outline that draws — vanishes when mask appears */}
          <text
            x="50%" y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="12vw"
            fontWeight="900"
            fill="none"
            stroke="#111827"
            strokeWidth="3"
            pathLength="100"
            style={{
              opacity: (1 - maskOpacity) * outlineOpacity,
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
              letterSpacing: "-0.05em",
              strokeDasharray: "100",
              strokeDashoffset: 100 - drawProgress * 100,
              transition: svgTransitionStyle,
            }}
          >
            Real estate
          </text>
        </svg>

        {/* ── GSAP dome overlay — phases 4 + 5 ── */}
        <div
          ref={domeRef}
          className="absolute inset-0 z-[60] pointer-events-none overflow-hidden"
          style={{
            background:
              "linear-gradient(170deg, #b8d8e8 0%, #c8e0ed 35%, #d8eaf5 70%, #e2f0f8 100%)",
          }}
        >
          <div ref={domeContentRef} className="absolute inset-0">

            {/* Arch headline */}
            <div className="absolute w-full" style={{ top: "28%" }}>
              <svg viewBox="0 0 1200 200" className="w-full h-auto" aria-hidden="true">
                <defs>
                  <path id="heroArch" d="M 60 185 A 540 540 0 0 1 1140 185" />
                </defs>
                <text
                  fontSize="62"
                  fontWeight="900"
                  letterSpacing="18"
                  fill="#1a3044"
                  fontFamily="'Georgia', 'Times New Roman', serif"
                  textAnchor="middle"
                >
                  <textPath href="#heroArch" startOffset="50%">
                    THREE REASONS TO CHOOSE US
                  </textPath>
                </text>
              </svg>
            </div>

            {/* Compass ornament */}
            <div
              className="absolute"
              style={{ top: "53%", left: "50%", transform: "translate(-50%, -50%)" }}
            >
              <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="26" r="12" stroke="#1a3044" strokeWidth="1.2" fill="none" />
                <path d="M26 8 L28 24 L26 26 L24 24Z" fill="#1a3044" opacity="0.55" />
                <path d="M44 26 L28 28 L26 26 L28 24Z" fill="#1a3044" opacity="0.55" />
                <path d="M26 44 L24 28 L26 26 L28 28Z" fill="#1a3044" opacity="0.55" />
                <path d="M8 26 L24 24 L26 26 L24 28Z" fill="#1a3044" opacity="0.55" />
                <circle cx="26" cy="26" r="2.5" fill="#1a3044" />
              </svg>
            </div>

            {/* Sub-label */}
            <div
              className="absolute flex items-center gap-5"
              style={{ top: "60%", left: "50%", transform: "translate(-50%, -50%)" }}
            >
              <span className="tracking-[0.45em] text-[11px] uppercase font-bold text-[#1a3044] opacity-60">Premium</span>
              <span className="w-1 h-1 rounded-full bg-[#1a3044] opacity-40 inline-block" />
              <span className="tracking-[0.45em] text-[11px] uppercase font-bold text-[#1a3044] opacity-60">Real Estate</span>
            </div>

            {/* Three pillars */}
            <div
              className="absolute grid grid-cols-3 gap-10 text-center"
              style={{ top: "68%", left: "50%", transform: "translateX(-50%)", width: "72%" }}
            >
              {[
                {
                  num: "01",
                  title: "Expert Guidance",
                  body: "Seasoned advisors navigate every transaction with precision — ensuring you never overpay or undersell.",
                },
                {
                  num: "02",
                  title: "Curated Portfolio",
                  body: "From beachfront villas to urban penthouses — every listing is hand-picked for quality and investment potential.",
                },
                {
                  num: "03",
                  title: "Transparent Deals",
                  body: "No hidden fees, no surprises. Trust is the foundation of every great property relationship.",
                },
              ].map((item) => (
                <div key={item.num} className="flex flex-col items-center gap-2 px-2">
                  <span className="text-[10px] tracking-[0.35em] font-bold text-[#1a3044] opacity-45 uppercase">
                    {item.num}
                  </span>
                  <h3 className="text-[#1a3044] font-bold text-sm tracking-widest uppercase">{item.title}</h3>
                  <p className="text-[#2a4a60] text-xs leading-relaxed opacity-75">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
