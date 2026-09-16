"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REASONS = [
  {
    title: "Real-Life Location",
    image: "/landscaping.webp",
  },
  {
    title: "Built to Stay",
    image: "/Gated-community.webp",
  },
  {
    title: "Boutique Concept",
    image: "/facade-full.webp",
  },
];

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const domeRef = useRef<HTMLDivElement>(null);

  // Dome elements
  const archWrapRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const domeLineRef = useRef<HTMLDivElement>(null);

  // Final location content
  const finalTitleRef = useRef<HTMLHeadingElement>(null);
  const finalImageRef = useRef<HTMLDivElement>(null);
  const finalInfoRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });

        ticking = true;
      }
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    let cleanupPreloaderFn = () => { };

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(containerRef.current!);

      /*
       * ----------------------------------------
       * INITIAL STATES
       * ----------------------------------------
       */

      gsap.set(q(".hero-bg"), {
        scale: 1.08,
      });

      gsap.set(q(".hero-word"), {
        y: 40,
        opacity: 0,
      });

      // Dome itself
      gsap.set(domeRef.current, {
        clipPath: "ellipse(48% 0% at 50% 100%)",
        WebkitClipPath: "ellipse(48% 0% at 50% 100%)",
      });

      // Dome content
      gsap.set(
        [
          archWrapRef.current,
          brandRef.current,
          locationRef.current,
          domeLineRef.current,
        ],
        {
          opacity: 0,
          y: 35,
        }
      );

      // Final content
      gsap.set(
        [
          finalTitleRef.current,
          finalImageRef.current,
          finalInfoRef.current,
          paginationRef.current,
        ],
        {
          opacity: 0,
          y: 35,
        }
      );

      /*
       * ----------------------------------------
       * HERO INTRO
       * ----------------------------------------
       */

      const intro = gsap.timeline({
        paused: true,
      });

      intro
        .to(
          q(".hero-bg"),
          {
            scale: 1,
            duration: 1.6,
            ease: "power2.out",
          },
          0
        )
        .to(
          q(".hero-word"),
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.07,
          },
          0
        );

      const onPreloaderComplete = () => {
        intro.play();
      };

      window.addEventListener(
        "preloaderComplete",
        onPreloaderComplete
      );

      const fallbackTimer = setTimeout(() => {
        intro.play();
      }, 2500);

      cleanupPreloaderFn = () => {
        window.removeEventListener(
          "preloaderComplete",
          onPreloaderComplete
        );

        clearTimeout(fallbackTimer);
      };

      /*
       * ----------------------------------------
       * DOME MASTER TIMELINE
       * ----------------------------------------
       */

      const domeTl = gsap.timeline({
        paused: true,
      });

      /*
       * PHASE 1
       * Dome begins rising
       */

      domeTl.to(
        domeRef.current,
        {
          clipPath:
            "ellipse(88% 43% at 50% 100%)",
          WebkitClipPath:
            "ellipse(88% 43% at 50% 100%)",
          duration: 0.9,
          ease: "power3.out",
        },
        0
      );

      /*
       * Curved heading enters
       * earlier than your current implementation
       */

      domeTl.to(
        archWrapRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        0.18
      );

      /*
       * Brand mark
       */

      domeTl.to(
        brandRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
        },
        0.35
      );

      /*
       * Location text
       */

      domeTl.to(
        locationRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        0.48
      );

      /*
       * Small line / divider
       */

      domeTl.to(
        domeLineRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        0.58
      );

      /*
       * ----------------------------------------
       * PHASE 2
       * Dome takes over screen
       * ----------------------------------------
       */

      domeTl.to(
        domeRef.current,
        {
          clipPath:
            "ellipse(190% 190% at 50% 100%)",
          WebkitClipPath:
            "ellipse(190% 190% at 50% 100%)",
          duration: 1.35,
          ease: "power3.inOut",
        },
        0.78
      );

      /*
       * ----------------------------------------
       * PHASE 3
       * Final location section content
       * ----------------------------------------
       */

      domeTl.to(
        finalTitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        1.35
      );

      domeTl.to(
        finalImageRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
        },
        1.5
      );

      domeTl.to(
        paginationRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        1.6
      );

      domeTl.to(
        finalInfoRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        1.72
      );

      /*
       * ----------------------------------------
       * SCROLL TRIGGER
       * ----------------------------------------
       */

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top+=2200 top",
        end: "top+=4300 top",
        scrub: 1.5,
        animation: domeTl,
        invalidateOnRefresh: true,
      });
    }, containerRef);

    return () => {
      ctx.revert();
      cleanupPreloaderFn();
    };
  }, []);

  /*
   * ----------------------------------------
   * EXISTING HERO PARALLAX VALUES
   * ----------------------------------------
   */

  const pinDistance = 4300;
  const progressY = Math.min(scrollY, pinDistance);

  const headingTranslateY = Math.min(
    progressY * 0.5,
    50
  );

  const headingOpacity = Math.max(
    1 - progressY / 250,
    0
  );

  const houseScrollOffset = progressY;

  const houseScale =
    1 + progressY * 0.0005;

  const cloudBehindX =
    -progressY * 0.15;

  const cloudFrontX =
    progressY * 0.25;

  const transitionStyle =
    "transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1)";

  return (
    <div
      ref={containerRef}
      style={{
        height: `calc(100vh + ${pinDistance}px)`,
      }}
      className="relative w-full"
    >
      <section className="sticky top-0 h-screen w-full overflow-hidden">
        {/* =========================================================
            HERO IMAGE
        ========================================================== */}

        <div
          className="hero-bg absolute inset-0 z-0 origin-center bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/bg-sky.jpg')",
          }}
        />

        {/* =========================================================
            BACK CLOUDS
        ========================================================== */}

        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            transform: `translateX(${cloudBehindX}px)`,
            transition: transitionStyle,
          }}
        >
          <img
            src="/cloud1.png"
            alt=""
            className="absolute left-8 top-24 w-72 opacity-90"
          />

          <img
            src="/cloud5.png"
            alt=""
            className="absolute left-56 top-44 w-96 opacity-90"
          />
        </div>

        {/* =========================================================
            HERO TITLE
        ========================================================== */}

        <div
          className="relative z-20 mx-auto flex h-full max-w-7xl items-center px-6"
          style={{
            transform: `translateY(${headingTranslateY}px)`,
            opacity: headingOpacity,
            transition: transitionStyle,
          }}
        >
          <div className="flex w-1/2 items-start">
            <h2 className="mt-20 flex flex-wrap gap-x-2 text-left text-3xl font-semibold text-gray-800 drop-shadow-md lg:text-4xl">
              {"Find your dream home"
                .split(" ")
                .map((word, i) => (
                  <span
                    key={i}
                    className="hero-word inline-block"
                  >
                    {word}
                  </span>
                ))}
            </h2>
          </div>

          <div className="flex w-1/2 items-center justify-center">
            <h1 className="flex flex-wrap justify-center gap-x-6 text-center text-[7rem] font-extrabold tracking-tight text-gray-900 drop-shadow-lg">
              {"Real estate"
                .split(" ")
                .map((word, i) => (
                  <span
                    key={i}
                    className="hero-word inline-block"
                  >
                    {word}
                  </span>
                ))}
            </h1>
          </div>
        </div>

        {/* =========================================================
            HOUSE
        ========================================================== */}

        <div
          className="pointer-events-none absolute bottom-0 left-0 z-30 flex w-full origin-bottom justify-center"
          style={{
            transform: `translateY(max(0px, 20vh - ${houseScrollOffset}px)) scale(${houseScale})`,
            transition: transitionStyle,
          }}
        >
          <img
            src="/house.png"
            alt="house"
            className="h-[120vh] w-full object-cover object-top"
          />
        </div>

        {/* =========================================================
            FRONT CLOUDS
        ========================================================== */}

        <div className="pointer-events-none absolute inset-0 z-40">
          <img
            src="/cloud4.png"
            alt=""
            className="absolute top-42 w-full opacity-95"
          />

          <img
            src="/cloud5.png"
            alt=""
            className="absolute right-48 top-12 w-[500px] opacity-95"
            style={{
              transform: `translateX(${cloudFrontX}px)`,
              transition: transitionStyle,
            }}
          />
        </div>

        {/* =========================================================
            HERO TEXT MASK
        ========================================================== */}

        <svg className="pointer-events-none absolute inset-0 z-45 h-full w-full">
          <defs>
            <mask id="textMask">
              <rect
                width="100%"
                height="100%"
                fill="white"
              />

              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="12vw"
                fontWeight="900"
                fill="black"
                style={{
                  fontFamily:
                    "ui-sans-serif, system-ui, sans-serif",
                  letterSpacing: "-0.05em",
                }}
              >
                Real estate
              </text>
            </mask>
          </defs>
        </svg>

        {/* =========================================================
            DOME
        ========================================================== */}

        <div
          ref={domeRef}
          className="absolute inset-0 z-[60]"
          style={{
            background:
              "#f3f1e9",
            clipPath:
              "ellipse(48% 0% at 50% 100%)",
            WebkitClipPath:
              "ellipse(48% 0% at 50% 100%)",
          }}
        >
          {/* =====================================================
              DOME INNER CONTENT
          ====================================================== */}

          <div className="absolute inset-0">

            {/* -----------------------------------------------
                subtle texture
            ------------------------------------------------ */}

            <div
              className="pointer-events-none absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, rgba(255,255,255,.7) 0.7px, transparent 0.8px)",
                backgroundSize:
                  "18px 18px",
              }}
            />

            {/* -----------------------------------------------
                TOP BRAND / HEADER
            ------------------------------------------------ */}

            {/* <div className="absolute left-6 right-6 top-7 flex items-start justify-between md:left-[5vw] md:right-[5vw]">

              {/* Brand */}

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1a3044]/40">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 50 50"
                  fill="none"
                >
                  <circle
                    cx="25"
                    cy="25"
                    r="19"
                    stroke="#1a3044"
                    strokeWidth="1"
                  />

                  <path
                    d="M25 9 L28 22 L25 25 L22 22Z"
                    fill="#1a3044"
                  />

                  <path
                    d="M41 25 L28 28 L25 25 L28 22Z"
                    fill="#1a3044"
                  />

                  <path
                    d="M25 41 L22 28 L25 25 L28 28Z"
                    fill="#1a3044"
                  />

                  <path
                    d="M9 25 L22 22 L25 25 L22 28Z"
                    fill="#1a3044"
                  />
                </svg>
              </div>

              <span className="text-[9px] font-semibold uppercase tracking-[0.35em] text-[#1a3044]/70">
                FIND
              </span>
            </div>

            {/* CTA */}

            {/* <div className="text-right">
                <p className="text-[11px] font-serif uppercase tracking-[0.12em] text-[#1a3044] underline underline-offset-4">
                  Select a property
                </p>

                <p className="mt-2 text-[8px] font-semibold uppercase tracking-[0.25em] text-[#1a3044]/70">
                  Book a call
                </p>

                <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.25em] text-[#1a3044]/70">
                  Contact
                </p>
              </div> */}
            {/* </div> */}

            {/* -----------------------------------------------
                LEFT SIDE SCROLL INDEX
            ------------------------------------------------ */}

            {/* <div className="absolute left-[5vw] top-[26%] hidden flex-col items-center md:flex">
              <div className="h-16 w-px bg-[#1a3044]/35" />

              <span className="my-4 text-[9px] font-medium tracking-[0.3em] text-[#1a3044]/70 [writing-mode:vertical-rl]">
                01
              </span>

              <div className="h-24 w-px bg-[#1a3044]/15" />

              <span className="mt-8 text-[8px] font-bold tracking-[0.32em] text-[#1a3044]/65 [writing-mode:vertical-rl]">
                SCROLL
              </span>

              <span className="mt-4 text-lg text-[#1a3044]/70">
                ↓
              </span>
            </div> */}

            {/* -----------------------------------------------
                ARCH CURVED TEXT
            ------------------------------------------------ */}

            <div
              ref={archWrapRef}
              className="absolute left-0 top-[12%] w-full"
            >
              <svg
                viewBox="0 0 1200 350"
                className="mx-auto block h-[600px] w-[92%] max-w-[1200px]"
              >
                <defs>
                  <path
                    id="locationArch"
                    d="M 90 300 A 530 530 0 0 1 1110 300"
                    fill="none"
                  />
                </defs>

                <text
                  fill="#1a3044"
                  fontFamily="Georgia, 'Times New Roman', serif"
                  fontSize="34"
                  fontWeight="500"
                  letterSpacing="13"
                  textAnchor="middle"
                >
                  <textPath
                    href="#locationArch"
                    startOffset="50%"
                  >
                    A PLACE TO LIVE — TO RETURN YEAR AFTER YEAR
                  </textPath>
                </text>
              </svg>
            </div>

            {/* -----------------------------------------------
                CENTER BRAND MARK
            ------------------------------------------------ */}

            <div
              ref={brandRef}
              className="absolute left-1/2 top-[48%] -translate-x-1/2"
            >
              <div className="flex flex-col items-center">
                <svg
                  width="52"
                  height="52"
                  viewBox="0 0 52 52"
                  fill="none"
                >
                  <circle
                    cx="26"
                    cy="26"
                    r="14"
                    stroke="#1a3044"
                    strokeWidth="1"
                  />

                  <path
                    d="M26 6 L29 23 L26 26 L23 23Z"
                    fill="#1a3044"
                  />

                  <path
                    d="M46 26 L29 29 L26 26 L29 23Z"
                    fill="#1a3044"
                  />

                  <path
                    d="M26 46 L23 29 L26 26 L29 29Z"
                    fill="#1a3044"
                  />

                  <path
                    d="M6 26 L23 23 L26 26 L23 29Z"
                    fill="#1a3044"
                  />

                  <circle
                    cx="26"
                    cy="26"
                    r="2.5"
                    fill="#1a3044"
                  />
                </svg>

                <div className="mt-3 flex items-center gap-5">
                  <span className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#1a3044]">
                    GURUGRAM
                  </span>

                  <span className="h-1 w-1 rounded-full bg-[#1a3044]/50" />

                  <span className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#1a3044]">
                    INDIA
                  </span>
                </div>
              </div>
            </div>

            {/* -----------------------------------------------
                SMALL CENTRAL STATEMENT
            ------------------------------------------------ */}

            <div
              ref={locationRef}
              className="absolute left-1/2 top-[59%] w-[80%] max-w-[520px] -translate-x-1/2 text-center"
            >
              <p className="text-[10px] font-semibold uppercase leading-[1.7] tracking-[0.22em] text-[#1a3044]/75 md:text-[11px]">
                A considered address where architecture,
                nature and everyday life meet.
              </p>
            </div>

            {/* -----------------------------------------------
                DECORATIVE LINE
            ------------------------------------------------ */}

            <div
              ref={domeLineRef}
              className="absolute left-1/2 top-[67%] h-16 w-px -translate-x-1/2 bg-[#1a3044]/35"
            />

            {/* -----------------------------------------------
                FINAL LOCATION TITLE
            ------------------------------------------------ */}

            <div
              ref={finalTitleRef}
              className="absolute left-1/2 top-[80%] w-full -translate-x-1/2 px-5 text-center"
            >
              <h2 className="font-serif text-[13vw] leading-[0.82] tracking-[-0.055em] text-[#122338] md:text-[9vw]">
                REAL-LIFE LOCATION
              </h2>
            </div>

            {/* -----------------------------------------------
                PROPERTY IMAGE
            ------------------------------------------------ */}

            {/* <div
              ref={finalImageRef}
              className="absolute left-1/2 top-[88%] w-[62vw] max-w-[760px] -translate-x-1/2 overflow-hidden md:w-[43vw]"
            >
              <div className="relative aspect-[1.55] overflow-hidden">
                <img
                  src={REASONS[0].image}
                  alt={REASONS[0].title}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />

                

                <div className="absolute bottom-4 left-4">
                  <span className="text-[8px] font-medium uppercase tracking-[0.25em] text-white">
                    GURUGRAM / 01
                  </span>
                </div>
              </div>
            </div> */}

            {/* -----------------------------------------------
                PAGINATION
            ------------------------------------------------ */}

            {/* <div
              ref={paginationRef}
              className="absolute left-1/2 top-[99%] flex -translate-x-1/2 items-center gap-5"
            >
              <span className="text-[#1a3044]/70">
                ‹
              </span>

              <span className="text-[10px] font-semibold text-[#1a3044]">
                01
              </span>

              <div className="h-px w-20 bg-[#1a3044]/25">
                <div className="h-px w-1/2 bg-[#1a3044]" />
              </div>

              <span className="text-[10px] font-semibold text-[#1a3044]/50">
                02
              </span>

              <span className="text-[#1a3044]/70">
                ›
              </span>
            </div> */}

            {/* -----------------------------------------------
                BOTTOM INFO
            ------------------------------------------------ */}

            <div
              ref={finalInfoRef}
              className="absolute left-1/2 top-[107%] w-[76%] max-w-[620px] -translate-x-1/2 text-center"
            >
              <p className="text-[11px] leading-[1.7] text-[#1a3044]/70 md:text-[13px]">
                Set within a connected urban neighbourhood,
                the address brings together considered homes,
                green spaces and the rhythm of the city.
              </p>

              <p className="mt-6 text-[8px] font-bold uppercase tracking-[0.28em] text-[#1a3044]">
                DESIGNED AROUND EVERYDAY LIFE
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}