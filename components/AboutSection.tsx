"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const CREAM = "#f3f1e9"
const NAVY = "#131a2b"
const VILLA_SRC = "/villa.mp4"

const REASONS = [
  {
    image: "/Swimming-pool.webp",
    caption:
      "A community built around walking paths, not corridors.",
  },
  {
    image: "/Swimming-pool.webp",
    caption:
      "Stone and greenery chosen to age well, not just to photograph well.",
  },
  {
    image: "/Swimming-pool.webp",
    caption:
      "Twenty five homes, never more, so it stays quiet.",
  },
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
      /*
       * ============================================================
       * INITIAL STATES
       * ============================================================
       */

      gsap.set(headlineRef.current, {
        opacity: 0,
        y: 24,
      })

      gsap.set(cardRef.current, {
        opacity: 0,
        y: 20,
      })

      gsap.set(paragraphRef.current, {
        opacity: 0,
        y: 16,
      })

      gsap.set(nextFlowerRef.current, {
        opacity: 0,
        scale: 0.9,
      })

      gsap.set(nextTextRef.current, {
        opacity: 0,
        y: 16,
      })

      /*
       * ============================================================
       * MAIN SCROLL TIMELINE
       *
       * Desktop/laptop animation values are unchanged.
       * ============================================================
       */

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

      /*
       * Phase 1
       *
       * Headline
       * ↓
       * Card
       * ↓
       * Paragraph
       */

      tl.to(
        headlineRef.current,
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
        },
        0
      )

        .to(
          cardRef.current,
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
          },
          0.15
        )

        .to(
          paragraphRef.current,
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
          },
          0.3
        )

        /*
         * Phase 3
         *
         * Existing reveal timing retained.
         */

        .to(
          overlayRef.current,
          {
            opacity: 0,
            ease: "power1.inOut",
          },
          0.78
        )

        .to(
          nextFlowerRef.current,
          {
            opacity: 0.9,
            scale: 1,
            ease: "power2.out",
          },
          0.85
        )

        .to(
          nextTextRef.current,
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
          },
          0.9
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="
        relative
        h-screen
        w-full
        overflow-hidden

        max-lg:h-[100svh]
      "
      style={{
        background: CREAM,
      }}
    >
      {/* ============================================================
          MAIN OVERLAY
      ============================================================ */}

      <div
        ref={overlayRef}
        className="
          absolute
          inset-0
          flex
          flex-col
          items-center
          justify-center

          max-lg:px-6

          max-sm:px-5
        "
      >
        {/* ==========================================================
            LEFT RAIL

            Original desktop stays untouched.
            Hidden on tablet/mobile because it competes with the
            actual content on smaller screens.
        =========================================================== */}

        <div
          ref={railRef}
          className="
            absolute
            left-8
            top-24
            hidden
            flex-col
            items-center
            gap-6
            md:left-10
            md:flex

            max-lg:hidden
          "
        >
          <span
            className="text-xs font-bold tracking-widest"
            style={{
              color: NAVY,
            }}
          >
            16
          </span>

          <div
            className="h-56 w-[1px] opacity-30"
            style={{
              background: NAVY,
            }}
          />
        </div>

        {/* ==========================================================
            CONTENT WRAPPER
        =========================================================== */}

        <div
          className="
            mx-auto
            max-w-4xl
            px-8
            text-center

            max-lg:w-full
            max-lg:max-w-3xl
            max-lg:px-4

            max-sm:max-w-[100%]
            max-sm:px-0
          "
        >
          {/* ========================================================
              HEADLINE
          ========================================================= */}

          <h2
            ref={headlineRef}
            className="
              text-5xl
              leading-[0.95]
              tracking-tight
              md:text-7xl

              max-lg:text-[clamp(3rem,8vw,5rem)]
              max-lg:leading-[0.92]

              max-sm:text-[clamp(2.6rem,12vw,4rem)]
              max-sm:leading-[0.9]
            "
            style={{
              fontFamily:
                "'Playfair Display', Georgia, serif",
              color: NAVY,
            }}
          >
            Grounded in Place
          </h2>

          {/* ========================================================
              IMAGE CARD + CONTROLS
          ========================================================= */}

          <div
            ref={cardRef}
            className="
              mt-12
              flex
              items-center
              justify-center
              gap-6

              max-lg:mt-10
              max-lg:gap-4

              max-sm:mt-8
              max-sm:gap-2
            "
          >
            {/* Previous */}

            <button
              type="button"
              aria-label="Previous"
              onClick={() =>
                setActive(
                  (i) =>
                    (i - 1 + REASONS.length) %
                    REASONS.length
                )
              }
              className="
                shrink-0
                text-lg
                opacity-50
                transition-opacity
                hover:opacity-100

                max-lg:text-base

                max-sm:text-sm
              "
              style={{
                color: NAVY,
              }}
            >
              ‹
            </button>

            {/* Image */}

            <div
              className="
                h-56
                w-[380px]
                max-w-[65vw]
                overflow-hidden
                shadow-xl

                max-lg:h-[clamp(13rem,29vw,14rem)]
                max-lg:w-[clamp(17rem,48vw,23.75rem)]
                max-lg:max-w-[60vw]

                max-sm:h-[42vw]
                max-sm:max-h-[13rem]
                max-sm:w-[68vw]
                max-sm:max-w-[68vw]
              "
            >
              <img
                src={REASONS[active].image}
                alt=""
                className="
                  h-full
                  w-full
                  object-cover
                "
              />
            </div>

            {/* Next */}

            <button
              type="button"
              aria-label="Next"
              onClick={() =>
                setActive(
                  (i) => (i + 1) % REASONS.length
                )
              }
              className="
                shrink-0
                text-lg
                opacity-50
                transition-opacity
                hover:opacity-100

                max-lg:text-base

                max-sm:text-sm
              "
              style={{
                color: NAVY,
              }}
            >
              ›
            </button>
          </div>

          {/* ========================================================
              PAGINATION
          ========================================================= */}

          <div
            className="
              mt-5
              flex
              items-center
              justify-center
              gap-3

              max-lg:mt-4
              max-lg:gap-2.5

              max-sm:mt-3
              max-sm:gap-2
            "
          >
            <span
              className="
                text-xs
                font-bold

                max-sm:text-[10px]
              "
              style={{
                color: NAVY,
              }}
            >
              {active + 1}
            </span>

            <div
              className="
                relative
                h-[1px]
                w-32

                max-lg:w-24

                max-sm:w-20
              "
              style={{
                background: `${NAVY}33`,
              }}
            >
              <div
                className="
                  absolute
                  left-0
                  top-0
                  h-full
                  transition-all
                  duration-500
                "
                style={{
                  width: `${((active + 1) /
                      REASONS.length) *
                    100
                    }%`,
                  background: NAVY,
                }}
              />
            </div>

            <span
              className="
                text-xs
                font-bold
                opacity-50

                max-sm:text-[10px]
              "
              style={{
                color: NAVY,
              }}
            >
              {REASONS.length}
            </span>
          </div>

          {/* ========================================================
              DESCRIPTION
          ========================================================= */}

          <div
            ref={paragraphRef}
            className="
              mx-auto
              mt-10
              max-w-lg

              max-lg:mt-8
              max-lg:max-w-xl

              max-sm:mt-7
              max-sm:max-w-[88vw]
            "
          >
            <p
              className="
                text-base
                leading-relaxed
                md:text-lg

                max-lg:text-[15px]
                max-lg:leading-[1.6]

                max-sm:text-[13px]
                max-sm:leading-[1.55]
              "
              style={{
                color: NAVY,
                opacity: 0.85,
              }}
            >
              {REASONS[active].caption}
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================
          NEXT SECTION REVEAL
      ============================================================ */}

      <div
        className="
          absolute
          inset-0
          z-10
          flex
          items-center

          max-lg:items-end
        "
      >
        {/* ==========================================================
            VIDEO
        =========================================================== */}

        <video
          ref={nextFlowerRef}
          src={VILLA_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="
            absolute
            bottom-0
            right-10
            h-[50vw]
            w-[38vw]
            max-h-md
            max-w-md
            object-cover
            mix-blend-multiply
            pointer-events-none

            max-lg:right-6
            max-lg:h-[58vw]
            max-lg:w-[43vw]
            max-lg:max-h-[620px]
            max-lg:max-w-[470px]

            max-sm:right-0
            max-sm:h-[62vw]
            max-sm:w-[55vw]
            max-sm:max-h-[430px]
            max-sm:max-w-[360px]
          "
        />

        {/* ==========================================================
            NEXT SECTION TEXT
        =========================================================== */}

        <div
          ref={nextTextRef}
          className="
            relative
            z-20
            pl-16
            max-w-lg

            md:pl-24

            max-lg:pl-8
            max-lg:max-w-[55vw]
            max-lg:pb-[18vh]

            max-sm:pl-5
            max-sm:max-w-[78vw]
            max-sm:pb-[22vh]
          "
        >
          <p
            className="
              text-2xl
              leading-snug
              md:text-4xl

              max-lg:text-[clamp(1.5rem,4vw,2.4rem)]
              max-lg:leading-[1.18]

              max-sm:text-[clamp(1.35rem,6vw,2rem)]
              max-sm:leading-[1.18]
            "
            style={{
              fontFamily:
                "'Playfair Display', Georgia, serif",
              color: NAVY,
            }}
          >
            Every detail here was placed on
            purpose, not carried over from a
            plan built for somewhere else.
          </p>
        </div>
      </div>
    </section>
  )
}