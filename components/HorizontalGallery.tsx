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

// Central place to swap sources later
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

  // Slide 1
  const s1FlowerTopRef = useRef<HTMLVideoElement>(null)
  const s1FlowerBottomRef = useRef<HTMLVideoElement>(null)
  const s1HeadlineRef = useRef<HTMLHeadingElement>(null)

  // Slide 2
  const s2ImageRef = useRef<HTMLDivElement>(null)
  const s2TypeRef = useRef<HTMLDivElement>(null)
  const s2FlowerRef = useRef<HTMLVideoElement>(null)

  // Slide 3
  const s3HeadlineRef = useRef<HTMLDivElement>(null)
  const s3FlowerRef = useRef<HTMLVideoElement>(null)
  const s3TimelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const wrapper = wrapperRef.current!

      const getScrollAmount = () =>
        -(wrapper.scrollWidth - window.innerWidth)

      /*
       * ============================================================
       * MAIN HORIZONTAL SCROLL
       *
       * UNCHANGED
       * ============================================================
       */

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
            Math.floor(
              self.progress *
              SLIDE_INDEX.length
            )
          )

          setActiveIndex(idx)
        },
      })

      /*
       * ============================================================
       * PARALLAX HELPER
       *
       * UNCHANGED
       * ============================================================
       */

      const parallax = (
        target: gsap.TweenTarget,
        slideTrigger: HTMLElement | null,
        fromVars: gsap.TweenVars,
        toVars: gsap.TweenVars
      ) => {
        if (!target || !slideTrigger) return

        gsap.fromTo(
          target,
          fromVars,
          {
            ...toVars,
            ease: "none",

            scrollTrigger: {
              trigger: slideTrigger,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        )
      }

      /*
       * ============================================================
       * SLIDE 1 PARALLAX
       *
       * UNCHANGED
       * ============================================================
       */

      parallax(
        s1FlowerTopRef.current,
        slide1Ref.current,
        {
          x: -40,
          y: -20,
        },
        {
          x: 40,
          y: 20,
        }
      )

      parallax(
        s1FlowerBottomRef.current,
        slide1Ref.current,
        {
          x: 40,
          y: 20,
        },
        {
          x: -40,
          y: -20,
        }
      )

      parallax(
        s1HeadlineRef.current,
        slide1Ref.current,
        {
          y: 30,
        },
        {
          y: -30,
        }
      )

      /*
       * ============================================================
       * SLIDE 2 PARALLAX
       *
       * UNCHANGED
       * ============================================================
       */

      parallax(
        s2ImageRef.current,
        slide2Ref.current,
        {
          x: 60,
          y: -10,
        },
        {
          x: -60,
          y: 10,
        }
      )

      parallax(
        s2TypeRef.current,
        slide2Ref.current,
        {
          x: -30,
        },
        {
          x: 60,
        }
      )

      parallax(
        s2FlowerRef.current,
        slide2Ref.current,
        {
          y: 50,
        },
        {
          y: -50,
        }
      )

      /*
       * ============================================================
       * SLIDE 3 PARALLAX
       *
       * UNCHANGED
       * ============================================================
       */

      parallax(
        s3HeadlineRef.current,
        slide3Ref.current,
        {
          y: -20,
        },
        {
          y: 20,
        }
      )

      parallax(
        s3FlowerRef.current,
        slide3Ref.current,
        {
          x: 30,
          y: -30,
        },
        {
          x: -30,
          y: 30,
        }
      )

      parallax(
        s3TimelineRef.current,
        slide3Ref.current,
        {
          x: 80,
        },
        {
          x: -80,
        }
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
        overflow-hidden
        font-sans

        max-lg:h-[100svh]
      "
      style={{
        background: CREAM,
        color: NAVY,
      }}
    >
      {/* =========================================================
          TOP BORDER
      ========================================================== */}

      <div
        className="
          absolute
          left-0
          top-0
          z-50
          h-[1px]
          w-full
        "
        style={{
          background: NAVY,
          opacity: 0.15,
        }}
      />

      {/* =========================================================
          TOP LEFT DECORATION
          Desktop unchanged
      ========================================================== */}

      <div
        className="
          absolute
          left-8
          top-8
          z-50
          hidden
          h-16
          w-16
          items-center
          justify-center
          border

          md:left-10
          md:top-10
          md:h-20
          md:w-20
          md:flex

          max-lg:hidden
        "
        style={{
          borderColor: `${NAVY}33`,
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill={NAVY}
        >
          <path d="M12 2c1 3 2 4 5 5-3 1-4 2-5 5-1-3-2-4-5-5 3-1 4-2 5-5z" />
        </svg>
      </div>

      {/* =========================================================
          SLIDE INDEX
          Desktop unchanged
      ========================================================== */}

      <div
        className="
          absolute
          left-8
          top-40
          z-50
          hidden
          flex-col
          items-center
          gap-6

          md:left-10
          md:flex

          max-lg:hidden
        "
      >
        <span className="text-xs font-bold tracking-widest">
          {String(
            SLIDE_INDEX[activeIndex]
          ).padStart(2, "0")}
        </span>

        <div
          className="h-64 w-[1px] opacity-30"
          style={{
            background: NAVY,
          }}
        />
      </div>

      {/* =========================================================
          HORIZONTAL TRACK
      ========================================================== */}

      <div
        ref={wrapperRef}
        className="
          flex
          h-full
          w-max
        "
      >
        {/* =======================================================
            SLIDE 1
        ======================================================== */}

        <div
          ref={slide1Ref}
          className="
            relative
            flex
            h-full
            w-screen
            shrink-0
            flex-col
            items-center
            justify-center
            px-8

            max-lg:px-6

            max-sm:px-5
          "
        >
          {/* ---------------------------------------------------
              TOP FLOWER
              --------------------------------------------------- */}

          <video
            ref={s1FlowerTopRef}
            src={FLOWER_SRC1}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="
              pointer-events-none
              absolute
              -left-16
              -top-10
              z-40
              h-72
              w-72
              object-cover
              opacity-90
              mix-blend-multiply
              will-change-transform

              max-lg:-left-12
              max-lg:-top-8
              max-lg:h-[38vw]
              max-lg:w-[38vw]
              max-lg:min-h-[220px]
              max-lg:min-w-[220px]

              max-sm:-left-10
              max-sm:-top-6
              max-sm:h-[48vw]
              max-sm:w-[48vw]
            "
          />

          {/* ---------------------------------------------------
              BOTTOM FLOWER
              --------------------------------------------------- */}

          <video
            ref={s1FlowerBottomRef}
            src={FLOWER_SRC2}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="
              pointer-events-none
              absolute
              -right-16
              -bottom-2
              z-40
              h-72
              w-72
              rotate-90
              object-cover
              opacity-90
              mix-blend-multiply
              will-change-transform

              md:h-[600px]
              md:w-[600px]

              max-lg:-right-12
              max-lg:h-[46vw]
              max-lg:w-[46vw]
              max-lg:max-h-[500px]
              max-lg:max-w-[500px]

              max-sm:-right-10
              max-sm:-bottom-4
              max-sm:h-[58vw]
              max-sm:w-[58vw]
            "
          />

          {/* ---------------------------------------------------
              LABEL
              --------------------------------------------------- */}

          <p
            className="
              relative
              z-30
              mb-10
              text-xs
              font-bold
              uppercase
              tracking-[0.25em]

              max-lg:mb-7
              max-lg:text-[10px]
              max-lg:tracking-[0.22em]

              max-sm:mb-6
              max-sm:text-[9px]
              max-sm:tracking-[0.18em]
            "
          >
            Philosophy
          </p>

          {/* ---------------------------------------------------
              MAIN HEADLINE
              Desktop untouched
              --------------------------------------------------- */}

          <h2
            ref={s1HeadlineRef}
            className="
              relative
              z-30
              max-w-5xl
              text-center
              text-4xl
              leading-[1.08]
              will-change-transform

              md:text-6xl
              lg:text-7xl

              max-lg:max-w-[82vw]
              max-lg:text-[clamp(2.4rem,6.5vw,4.5rem)]
              max-lg:leading-[1.02]

              max-sm:max-w-[90vw]
              max-sm:text-[clamp(2rem,8.7vw,3.1rem)]
              max-sm:leading-[1.03]
            "
            style={{
              fontFamily:
                "'Playfair Display', Georgia, serif",
            }}
          >
            A HANDFUL OF HOMES,
            BUILT WITHOUT COMPROMISE —
            WHERE QUIET DESIGN MEETS SLOW
            COASTAL LIVING
          </h2>

          {/* ---------------------------------------------------
              DESCRIPTION
              --------------------------------------------------- */}

          <p
            className="
              relative
              z-30
              mt-12
              max-w-md
              text-center
              text-sm
              leading-relaxed
              opacity-80

              max-lg:mt-8
              max-lg:max-w-[520px]
              max-lg:px-4
              max-lg:text-[13px]

              max-sm:mt-6
              max-sm:max-w-[88vw]
              max-sm:px-0
              max-sm:text-[12px]
              max-sm:leading-[1.55]
            "
          >
            Every layout, material and sightline
            was considered on its own terms,
            not adapted from a template — the
            result is a small collection of homes
            that feel unmistakably local.
          </p>
        </div>

        {/* =======================================================
            SLIDE 2
        ======================================================== */}

        <div
          ref={slide2Ref}
          className="
            relative
            flex
            h-full
            w-screen
            shrink-0
            items-center
            px-8

            max-lg:px-6

            max-sm:px-5
          "
        >
          {/* ---------------------------------------------------
              TYPE
              Desktop untouched
              --------------------------------------------------- */}

          <div
            ref={s2TypeRef}
            className="
              pointer-events-none
              absolute
              left-[8%]
              top-[16%]
              z-20
              will-change-transform

              max-lg:left-[6%]
              max-lg:top-[14%]

              max-sm:left-[5%]
              max-sm:top-[16%]
            "
          >
            <h2
              className="
                text-[6rem]
                leading-[0.82]
                lg:text-[10rem]

                max-lg:text-[clamp(4rem,12vw,7rem)]

                max-sm:text-[clamp(3.2rem,15vw,5.5rem)]
              "
              style={{
                fontFamily:
                  "'Playfair Display', Georgia, serif",
              }}
            >
              THE
            </h2>

            <div
              className="
                mt-2
                ml-8
                flex
                items-end
                gap-8

                max-lg:ml-5
                max-lg:gap-4

                max-sm:ml-3
                max-sm:gap-3
              "
            >
              <span
                className="
                  mb-6
                  text-sm
                  font-bold
                  tracking-[0.5em]

                  max-lg:mb-4
                  max-lg:text-[10px]
                  max-lg:tracking-[0.35em]

                  max-sm:mb-3
                  max-sm:text-[8px]
                  max-sm:tracking-[0.25em]
                "
              >
                SOUTH
              </span>

              <h2
                className="
                  text-[6rem]
                  leading-[0.82]
                  lg:text-[10rem]

                  max-lg:text-[clamp(4rem,12vw,7rem)]

                  max-sm:text-[clamp(3.2rem,15vw,5.5rem)]
                "
                style={{
                  fontFamily:
                    "'Playfair Display', Georgia, serif",
                }}
              >
                QUIET
              </h2>
            </div>

            <h2
              className="
                ml-20
                text-[6rem]
                leading-[0.82]
                lg:text-[10rem]

                max-lg:ml-14
                max-lg:text-[clamp(4rem,12vw,7rem)]

                max-sm:ml-8
                max-sm:text-[clamp(3.2rem,15vw,5.5rem)]
              "
              style={{
                fontFamily:
                  "'Playfair Display', Georgia, serif",
              }}
            >
              COAST
            </h2>
          </div>

          {/* ---------------------------------------------------
              IMAGE
              --------------------------------------------------- */}

          <div
            ref={s2ImageRef}
            className="
              absolute
              right-[12%]
              top-[10%]
              z-10
              h-[78%]
              w-[42%]
              overflow-hidden
              shadow-2xl
              will-change-transform

              max-lg:right-[7%]
              max-lg:top-[16%]
              max-lg:h-[68%]
              max-lg:w-[43%]

              max-sm:right-[5%]
              max-sm:top-[19%]
              max-sm:h-[57%]
              max-sm:w-[52%]
            "
          >
            <img
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop"
              alt="Terrace view"
              className="
                h-full
                w-full
                object-cover
              "
            />
          </div>

          {/* ---------------------------------------------------
              DESCRIPTION
              --------------------------------------------------- */}

          <div
            className="
              absolute
              bottom-16
              right-10
              z-30
              max-w-xs

              max-lg:right-7
              max-lg:bottom-[9%]
              max-lg:max-w-[42vw]

              max-sm:right-5
              max-sm:bottom-[9%]
              max-sm:max-w-[44vw]
            "
          >
            <h3
              className="
                mb-4
                text-2xl

                max-lg:mb-3
                max-lg:text-[clamp(1.2rem,3vw,1.8rem)]

                max-sm:mb-2
                max-sm:text-[clamp(1rem,4.5vw,1.4rem)]
                max-sm:leading-[1.1]
              "
              style={{
                fontFamily:
                  "'Playfair Display', Georgia, serif",
              }}
            >
              CLOSE, BUT NEVER CROWDED
            </h3>

            <p
              className="
                text-xs
                leading-relaxed
                opacity-80

                max-lg:text-[11px]

                max-sm:text-[9px]
                max-sm:leading-[1.5]
              "
            >
              Old town, harbour and vineyard
              trails sit minutes away, while the
              plot itself stays set back from the
              road — near everything, part of none
              of it.
            </p>
          </div>
        </div>

        {/* =======================================================
            SLIDE 3
        ======================================================== */}

        <div
          ref={slide3Ref}
          className="
            relative
            flex
            h-full
            w-[130vw]
            shrink-0
            flex-col
            justify-center
            px-8

            max-lg:w-[145vw]
            max-lg:px-6

            max-sm:w-[170vw]
            max-sm:px-5
          "
        >
          {/* ---------------------------------------------------
              FLOWER
              Desktop unchanged
              --------------------------------------------------- */}

          <video
            ref={s3FlowerRef}
            src={FLOWER_SRC3}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="
              pointer-events-none
              absolute
              -right-28
              -top-16
              z-40
              h-[800px]
              w-[800px]
              rotate-90
              object-cover
              opacity-90
              mix-blend-multiply
              will-change-transform

              max-lg:-right-[15vw]
              max-lg:-top-[7vh]
              max-lg:h-[68vw]
              max-lg:w-[68vw]

              max-sm:-right-[20vw]
              max-sm:-top-[8vh]
              max-sm:h-[85vw]
              max-sm:w-[85vw]
            "
          />

          {/* ---------------------------------------------------
              HEADLINE
              --------------------------------------------------- */}

          <div
            ref={s3HeadlineRef}
            className="
              relative
              z-30
              -mt-24
              text-center
              will-change-transform

              max-lg:-mt-16

              max-sm:-mt-10
            "
          >
            <h2
              className="
                text-5xl
                leading-[0.85]
                tracking-tight
                md:text-7xl
                lg:text-8xl

                max-lg:text-[clamp(3.2rem,9vw,6.5rem)]

                max-sm:text-[clamp(2.6rem,12vw,5rem)]
              "
              style={{
                fontFamily:
                  "'Playfair Display', Georgia, serif",
              }}
            >
              CLOSER THAN
            </h2>

            <div
              className="
                relative
                mt-14
                inline-block

                max-lg:mt-10

                max-sm:mt-8
              "
            >
              <h2
                className="
                  ml-24
                  text-5xl
                  leading-[0.85]
                  tracking-tight
                  md:text-7xl
                  lg:text-8xl

                  max-lg:ml-16
                  max-lg:text-[clamp(3.2rem,9vw,6.5rem)]

                  max-sm:ml-10
                  max-sm:text-[clamp(2.6rem,12vw,5rem)]
                "
                style={{
                  fontFamily:
                    "'Playfair Display', Georgia, serif",
                }}
              >
                YOU THINK
              </h2>

              <span
                className="
                  absolute
                  -left-[2%]
                  -top-14
                  rotate-[-6deg]
                  text-5xl
                  opacity-90

                  md:-top-14
                  md:text-7xl

                  max-lg:-top-10
                  max-lg:text-[clamp(2.5rem,7vw,5rem)]

                  max-sm:-top-8
                  max-sm:left-[8%]
                  max-sm:text-[clamp(2rem,9vw,3.5rem)]
                "
                style={{
                  fontFamily:
                    "'Snell Roundhand','Segoe Script','Brush Script MT',cursive",
                }}
              >
                really
              </span>
            </div>
          </div>

          {/* ---------------------------------------------------
              FLOOR PLAN BUTTON
              --------------------------------------------------- */}

          <div
            className="
              absolute
              left-16
              top-1/2
              z-30
              flex
              h-44
              w-44
              -translate-y-1/2
              cursor-pointer
              flex-col
              items-center
              justify-center
              group

              max-lg:left-[7vw]
              max-lg:h-36
              max-lg:w-36

              max-sm:left-[5vw]
              max-sm:h-28
              max-sm:w-28
            "
          >
            <svg
              viewBox="0 0 200 200"
              className="absolute inset-0 h-full w-full"
            >
              <circle
                cx="100"
                cy="100"
                r="96"
                fill="none"
                stroke={NAVY}
                strokeWidth="1"
                opacity="0.4"
                className="
                  transition-transform
                  duration-700
                  group-hover:scale-105
                "
                style={{
                  transformOrigin:
                    "center",
                }}
              />
            </svg>

            <span
              className="
                mb-2
                text-[10px]
                font-bold
                tracking-widest

                max-lg:text-[9px]

                max-sm:mb-1
                max-sm:text-[8px]
              "
            >
              12
            </span>

            <span
              className="
                px-6
                text-center
                text-[10px]
                font-bold
                uppercase
                leading-relaxed
                tracking-[0.2em]

                max-lg:px-4
                max-lg:text-[8px]

                max-sm:px-3
                max-sm:text-[7px]
                max-sm:tracking-[0.15em]
              "
            >
              See the Floor Plans
            </span>
          </div>

          {/* ---------------------------------------------------
              LOCATION TIMELINE
              --------------------------------------------------- */}

          <div
            ref={s3TimelineRef}
            className="
              absolute
              bottom-20
              w-full
              px-24
              will-change-transform

              max-lg:bottom-[8vh]
              max-lg:px-[10vw]

              max-sm:bottom-[7vh]
              max-sm:px-[8vw]
            "
          >
            <div
              className="
                relative
                h-40

                max-lg:h-32

                max-sm:h-28
              "
            >
              {/* Timeline SVG */}

              <svg
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                "
                viewBox="0 0 1000 100"
                preserveAspectRatio="none"
              >
                <path
                  d="M40,70 C120,35 160,35 190,50 C230,66 300,80 340,66 C420,25 550,25 620,48 C700,70 750,75 800,60 C860,40 920,38 960,52"
                  fill="none"
                  stroke={NAVY}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="
                    max-sm:stroke-[2]
                  "
                />

                {LOCATIONS.map((loc, i) => (
                  <circle
                    key={i}
                    cx={loc.x}
                    cy={loc.y}
                    r="3.5"
                    fill={NAVY}
                    className="
                      max-sm:[r:2.8]
                    "
                  />
                ))}
              </svg>

              {/* Location labels */}

              {LOCATIONS.map((loc, i) => (
                <div
                  key={i}
                  className="
                    absolute
                    flex
                    -translate-x-1/2
                    flex-col
                    items-center
                    text-center
                  "
                  style={{
                    left: `${loc.x / 10}%`,
                    top: `${loc.y - 32}px`,
                  }}
                >
                  <p
                    className="
                      whitespace-nowrap
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.2em]

                      max-lg:text-[8px]
                      max-lg:tracking-[0.12em]

                      max-sm:text-[6px]
                      max-sm:tracking-[0.08em]
                    "
                  >
                    {loc.name}
                  </p>

                  <p
                    className="
                      text-[10px]
                      tracking-widest
                      opacity-70

                      max-lg:text-[8px]

                      max-sm:text-[6px]
                    "
                  >
                    {loc.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}