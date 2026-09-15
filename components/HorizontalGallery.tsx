"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const CREAM = "#f3f1e9"
const NAVY = "#131a2b"

const SLIDE_INDEX = [14, 22, 31]

const LOCATIONS = [
  { name: "AIRPORT", time: "35 MIN", x: 40, y: 70 },
  { name: "OLD TOWN", time: "8 MIN", x: 190, y: 50 },
  { name: "HARBOUR CLUB", time: "12 MIN", x: 340, y: 66 },
  { name: "VINEYARD ROAD", time: "18 MIN", x: 620, y: 48 },
  { name: "BAY VIEW", time: "22 MIN", x: 800, y: 60 },
  { name: "CITY CENTRE", time: "40 MIN", x: 960, y: 52 },
]

// Central place to swap sources later — point these at your real .webm files
const FLOWER_SRC1 = "/bougainvillea-flowers_01.webm"
const FLOWER_SRC2 = "/bougainvillea-flowers_02.webm"
const FLOWER_SRC3 = "/bougainvillea-flowers_05.webm"

export default function HorizontalGallery() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const slide1Ref = useRef<HTMLDivElement>(null)
  const slide2Ref = useRef<HTMLDivElement>(null)
  const slide3Ref = useRef<HTMLDivElement>(null)

  // parallax targets — flower refs are now HTMLVideoElement
  const s1FlowerTopRef = useRef<HTMLVideoElement>(null)
  const s1FlowerBottomRef = useRef<HTMLVideoElement>(null)
  const s1HeadlineRef = useRef<HTMLHeadingElement>(null)

  const s2ImageRef = useRef<HTMLDivElement>(null)
  const s2TypeRef = useRef<HTMLDivElement>(null)
  const s2FlowerRef = useRef<HTMLVideoElement>(null)

  const s3HeadlineRef = useRef<HTMLDivElement>(null)
  const s3FlowerRef = useRef<HTMLVideoElement>(null)
  const s3TimelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const wrapper = wrapperRef.current!
      const getScrollAmount = () => -(wrapper.scrollWidth - window.innerWidth)

      const tween = gsap.to(wrapper, {
        x: getScrollAmount,
        ease: "none",
      })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${wrapper.scrollWidth}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const idx = Math.min(
            SLIDE_INDEX.length - 1,
            Math.floor(self.progress * SLIDE_INDEX.length)
          )
          setActiveIndex(idx)
        },
      })

      const parallax = (
        target: gsap.TweenTarget,
        slideTrigger: HTMLElement | null,
        fromVars: gsap.TweenVars,
        toVars: gsap.TweenVars
      ) => {
        if (!target || !slideTrigger) return
        gsap.fromTo(target, fromVars, {
          ...toVars,
          ease: "none",
          scrollTrigger: {
            trigger: slideTrigger,
            containerAnimation: tween,
            start: "left right",
            end: "right left",
            scrub: true,
          },
        })
      }

      parallax(s1FlowerTopRef.current, slide1Ref.current, { x: -40, y: -20 }, { x: 40, y: 20 })
      parallax(s1FlowerBottomRef.current, slide1Ref.current, { x: 40, y: 20 }, { x: -40, y: -20 })
      parallax(s1HeadlineRef.current, slide1Ref.current, { y: 30 }, { y: -30 })

      parallax(s2ImageRef.current, slide2Ref.current, { x: 60, y: -10 }, { x: -60, y: 10 })
      parallax(s2TypeRef.current, slide2Ref.current, { x: -30 }, { x: 60 })
      parallax(s2FlowerRef.current, slide2Ref.current, { y: 50 }, { y: -50 })

      parallax(s3HeadlineRef.current, slide3Ref.current, { y: -20 }, { y: 20 })
      parallax(s3FlowerRef.current, slide3Ref.current, { x: 30, y: -30 }, { x: -30, y: 30 })
      parallax(s3TimelineRef.current, slide3Ref.current, { x: 80 }, { x: -80 })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden font-sans"
      style={{ background: CREAM, color: NAVY }}
    >
      <div className="absolute top-0 left-0 w-full h-[1px] z-50" style={{ background: NAVY, opacity: 0.15 }} />

      <div className="absolute top-8 left-8 md:top-10 md:left-10 z-50 w-16 h-16 md:w-20 md:h-20 hidden md:flex items-center justify-center border" style={{ borderColor: `${NAVY}33` }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill={NAVY}>
          <path d="M12 2c1 3 2 4 5 5-3 1-4 2-5 5-1-3-2-4-5-5 3-1 4-2 5-5z" />
        </svg>
      </div>

      <div className="absolute top-40 left-8 md:left-10 z-50 hidden md:flex flex-col items-center gap-6">
        <span className="text-xs font-bold tracking-widest">
          {String(SLIDE_INDEX[activeIndex]).padStart(2, "0")}
        </span>
        <div className="w-[1px] h-64 opacity-30" style={{ background: NAVY }} />
      </div>

      <div ref={wrapperRef} className="flex h-full w-max">
        {/* ── SLIDE 1: Philosophy ── */}
        <div ref={slide1Ref} className="w-screen h-full flex flex-col items-center justify-center relative shrink-0 px-8">
          <video
            ref={s1FlowerTopRef}
            src={FLOWER_SRC1}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute -top-10 -left-16 w-72 h-72 md:w-[500px] md:h-[500px] object-cover opacity-90 mix-blend-multiply pointer-events-none z-40 will-change-transform"
          />
          <video
            ref={s1FlowerBottomRef}
            src={FLOWER_SRC2}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute -bottom-2 rotate-90 -right-16 w-72 h-72 md:w-[600px] md:h-[600px] object-cover opacity-90 mix-blend-multiply pointer-events-none z-40 will-change-transform"
          />

          <p className="text-xs font-bold tracking-[0.25em] uppercase mb-10 relative z-30">Philosophy</p>
          <h2
            ref={s1HeadlineRef}
            className="text-4xl md:text-6xl lg:text-7xl text-center max-w-5xl leading-[1.08] relative z-30 will-change-transform"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            A HANDFUL OF HOMES, BUILT WITHOUT COMPROMISE —
            WHERE QUIET DESIGN MEETS SLOW COASTAL LIVING
          </h2>
          <p className="mt-12 text-sm text-center max-w-md leading-relaxed relative z-30 opacity-80">
            Every layout, material and sightline was considered on its own terms,
            not adapted from a template — the result is a small collection of
            homes that feel unmistakably local.
          </p>
        </div>

        {/* ── SLIDE 2: Setting ── */}
        <div ref={slide2Ref} className="w-screen h-full flex items-center relative shrink-0 px-8">


          <div ref={s2TypeRef} className="absolute left-[8%] top-[16%] z-20 pointer-events-none will-change-transform">
            <h2
              className="text-[6rem] lg:text-[10rem] leading-[0.82]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              THE
            </h2>
            <div className="flex items-end gap-8 mt-2 ml-8">
              <span className="text-sm font-bold tracking-[0.5em] mb-6">SOUTH</span>
              <h2
                className="text-[6rem] lg:text-[10rem] leading-[0.82]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                QUIET
              </h2>
            </div>
            <h2
              className="text-[6rem] lg:text-[10rem] leading-[0.82] ml-20"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              COAST
            </h2>
          </div>

          <div
            ref={s2ImageRef}
            className="absolute right-[12%] top-[10%] w-[42%] h-[78%] overflow-hidden z-10 shadow-2xl will-change-transform"
          >
            <img
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop"
              alt="Terrace view"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute right-10 bottom-16 max-w-xs z-30">
            <h3 className="text-2xl mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              CLOSE, BUT NEVER CROWDED
            </h3>
            <p className="text-xs leading-relaxed opacity-80">
              Old town, harbour and vineyard trails sit minutes away, while the
              plot itself stays set back from the road — near everything, part
              of none of it.
            </p>
          </div>
        </div>

        {/* ── SLIDE 3: Access & Location ── */}
        <div ref={slide3Ref} className="w-[130vw] h-full flex flex-col justify-center relative shrink-0 px-8">
          <video
            ref={s3FlowerRef}
            src={FLOWER_SRC3}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute -top-16 -right-28 rotate-90 w-[800px] h-[800px] object-cover opacity-90 mix-blend-multiply pointer-events-none z-40 will-change-transform"
          />

          <div ref={s3HeadlineRef} className="text-center relative -mt-24 z-30 will-change-transform">
            <h2
              className="text-5xl md:text-7xl lg:text-8xl leading-[0.85] tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              CLOSER THAN
            </h2>
            <div className="relative inline-block mt-14">
              <h2
                className="text-5xl md:text-7xl lg:text-8xl leading-[0.85] tracking-tight ml-24"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                YOU THINK
              </h2>
              <span
                className="absolute -top-14 left-[30%] text-5xl md:text-7xl opacity-90 -rotate-6"
                style={{ fontFamily: "'Snell Roundhand','Segoe Script','Brush Script MT',cursive" }}
              >
                really
              </span>
            </div>
          </div>

          <div className="absolute left-16 top-1/2 -translate-y-1/2 w-44 h-44 flex flex-col items-center justify-center cursor-pointer group z-30">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
              <circle cx="100" cy="100" r="96" fill="none" stroke={NAVY} strokeWidth="1" opacity="0.4" />
            </svg>
            <span className="text-[10px] font-bold tracking-widest mb-2">12</span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-center px-6 leading-relaxed uppercase">
              See the Floor Plans
            </span>
          </div>

          <div ref={s3TimelineRef} className="absolute bottom-20 w-full px-24 will-change-transform">
            <div className="relative w-full h-40">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 100" preserveAspectRatio="none">
                <path
                  d="M40,70 C120,35 160,35 190,50 C230,66 300,80 340,66 C420,25 550,25 620,48 C700,70 750,75 800,60 C860,40 920,38 960,52"
                  fill="none" stroke={NAVY} strokeWidth="2.5" strokeLinecap="round"
                />
                {LOCATIONS.map((loc, i) => (
                  <circle key={i} cx={loc.x} cy={loc.y} r="3.5" fill={NAVY} />
                ))}
              </svg>

              {LOCATIONS.map((loc, i) => (
                <div
                  key={i}
                  className="absolute flex flex-col items-center text-center"
                  style={{
                    left: `${loc.x / 10}%`,
                    top: `${loc.y - 32}px`,
                    transform: "translateX(-50%)",
                  }}
                >
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase whitespace-nowrap">{loc.name}</p>
                  <p className="text-[10px] tracking-widest opacity-70">{loc.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}