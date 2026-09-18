"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const CREAM = "#f3f1e9"
const NAVY = "#131a2b"

const IMAGE_SRC = "/facade-full.webp" // ONE tall image — every crop below comes from this same file
const FLOWER_SRC = "/bougainvillea-flowers_01.webm"

const PHASE_INDEX = [78, 82, 86, 90]

export default function ArchitectureRevealZoom() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const stageRef = useRef<HTMLDivElement>(null)
    const leftRef = useRef<HTMLDivElement>(null)
    const rightRef = useRef<HTMLDivElement>(null)
    const leftBgRef = useRef<HTMLDivElement>(null)
    const rightBgRef = useRef<HTMLDivElement>(null)
    const railRef = useRef<HTMLDivElement>(null)

    const titleRef = useRef<HTMLHeadingElement>(null)
    const textBlockRef = useRef<HTMLDivElement>(null)
    const ctaRef = useRef<HTMLDivElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)

    const nextFlowerRef = useRef<HTMLVideoElement>(null)
    const nextTextRef = useRef<HTMLDivElement>(null)

    const [phase, setPhase] = useState(0)

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const ctx = gsap.context(() => {
            gsap.set(leftRef.current, { xPercent: -3, yPercent: 8 })
            gsap.set(rightRef.current, { xPercent: 3, yPercent: -8 })
            gsap.set(titleRef.current, {
                clipPath: "inset(0 100% 0 0)",
                opacity: 1,
                y: 0,
            })
            gsap.set(textBlockRef.current, { opacity: 0, y: 20 })
            gsap.set(ctaRef.current, { opacity: 0, scale: 0.85 })
            gsap.set(nextFlowerRef.current, { opacity: 0, scale: 0.9 })
            gsap.set(nextTextRef.current, { opacity: 0, y: 16 })

            // Proxy driving background-size / background-position on both halves.
            const bg = { sizeY: 500, posY: 0 }

            const applyBg = () => {
                const sizeStr = `200% ${bg.sizeY}%`

                if (leftBgRef.current) {
                    leftBgRef.current.style.backgroundSize = sizeStr
                    leftBgRef.current.style.backgroundPosition = `left ${bg.posY}%`
                }

                if (rightBgRef.current) {
                    rightBgRef.current.style.backgroundSize = sizeStr
                    rightBgRef.current.style.backgroundPosition = `right ${bg.posY}%`
                }
            }

            applyBg()

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=500%",
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        const p = self.progress
                        const idx =
                            p < 0.5
                                ? 0
                                : p < 0.66
                                    ? 1
                                    : p < 0.8
                                        ? 2
                                        : 3

                        setPhase(idx)
                    },
                },
            })

            // ── Phase 1 (0 → 0.5): close the gap ──
            tl.to(
                leftRef.current,
                {
                    xPercent: 0,
                    yPercent: 0,
                    ease: "power1.inOut",
                },
                0
            )
                .to(
                    rightRef.current,
                    {
                        xPercent: 0,
                        yPercent: 0,
                        ease: "power1.inOut",
                    },
                    0
                )

                // ── Phase 2: expand to full bleed ──
                .to(
                    stageRef.current,
                    {
                        width: "100vw",
                        height: "100vh",
                        borderRadius: 0,
                        ease: "power1.inOut",
                    },
                    0.5
                )

                // ── Concurrent title wipe ──
                .to(
                    titleRef.current,
                    {
                        clipPath: "inset(0 0% 0 0)",
                        ease: "power1.inOut",
                    },
                    0.5
                )

                // ── Phase 4: title exits + image pans ──
                .to(
                    titleRef.current,
                    {
                        y: -40,
                        opacity: 0,
                        ease: "power1.in",
                    },
                    0.66
                )
                .to(
                    bg,
                    {
                        sizeY: 150,
                        posY: 100,
                        ease: "power1.inOut",
                        onUpdate: applyBg,
                    },
                    0.66
                )

                // ── Phase 5: description ──
                .to(
                    textBlockRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        ease: "power2.out",
                    },
                    0.75
                )

                // ── Phase 6: CTA ──
                .to(
                    ctaRef.current,
                    {
                        opacity: 1,
                        scale: 1,
                        ease: "power2.out",
                    },
                    0.82
                )

                // ── Phase 7: reveal next section ──
                .to(
                    overlayRef.current,
                    {
                        opacity: 0,
                        ease: "power1.inOut",
                    },
                    0.9
                )
                .to(
                    railRef.current,
                    {
                        opacity: 0,
                        ease: "power1.inOut",
                    },
                    0.9
                )
                .to(
                    nextFlowerRef.current,
                    {
                        opacity: 1,
                        scale: 1,
                        ease: "power2.out",
                    },
                    0.92
                )
                .to(
                    nextTextRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        ease: "power2.out",
                    },
                    0.94
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
                max-sm:min-h-[680px]
            "
            style={{ background: CREAM }}
        >
            {/* ── Left rail ── */}
            <div
                ref={railRef}
                className="
                    absolute
                    top-40
                    left-8
                    md:left-10
                    z-50
                    hidden
                    md:flex
                    flex-col
                    items-center
                    gap-6

                    max-lg:top-28
                "
                style={{
                    color: phase >= 1 ? CREAM : NAVY,
                }}
            >
                <span className="text-xs font-bold tracking-widest">
                    {String(PHASE_INDEX[phase]).padStart(2, "0")}
                </span>

                <div
                    className="w-[1px] h-64 opacity-30"
                    style={{ background: "currentColor" }}
                />
            </div>

            {/* ── Main architecture reveal ── */}
            <div
                ref={overlayRef}
                className="absolute inset-0"
            >
                <div
                    ref={stageRef}
                    className="
                        absolute
                        top-40
                        lg:top-1/2
                        left-1/2
                        -translate-x-1/2
                        -translate-y-1/2
                        flex
                        items-center
                        justify-center
                        will-change-transform
                        overflow-hidden

                        w-[72vw]
                        h-[56vh]

                        max-lg:w-[88vw]
                        max-lg:h-[58svh]

                        max-md:w-[92vw]
                        max-md:h-[56svh]

                        max-sm:w-[94vw]
                        max-sm:h-[50svh]
                    "
                    style={{
                        borderRadius: "2px",
                    }}
                >
                    <div className="relative w-full h-full flex">
                        {/* LEFT IMAGE */}
                        <div
                            ref={leftRef}
                            className="
                                w-1/2
                                h-full
                                overflow-hidden
                                will-change-transform
                            "
                        >
                            <div
                                ref={leftBgRef}
                                className="w-full h-full"
                                style={{
                                    backgroundImage: `url(${IMAGE_SRC})`,
                                    backgroundSize: "200% 500%",
                                    backgroundPosition: "left 0%",
                                }}
                            />
                        </div>

                        {/* RIGHT IMAGE */}
                        <div
                            ref={rightRef}
                            className="
                                w-1/2
                                h-full
                                overflow-hidden
                                will-change-transform
                            "
                        >
                            <div
                                ref={rightBgRef}
                                className="w-full h-full"
                                style={{
                                    backgroundImage: `url(${IMAGE_SRC})`,
                                    backgroundSize: "200% 500%",
                                    backgroundPosition: "right 0%",
                                }}
                            />
                        </div>
                    </div>

                    {/* ── Architecture title ── */}
                    <h2
                        ref={titleRef}
                        className="
                            absolute
                            inset-0
                            flex
                            items-center
                            justify-center
                            text-center
                            px-4
                            pointer-events-none
                            select-none
                            z-30

                            text-[clamp(3rem,12vw,11rem)]
                            leading-[0.85]

                            max-lg:text-[clamp(3.2rem,14vw,8rem)]
                            max-lg:px-5

                            max-md:text-[clamp(2.8rem,15vw,6rem)]
                            max-md:leading-[0.88]

                            max-sm:text-[clamp(2.4rem,16vw,5rem)]
                            max-sm:px-3
                        "
                        style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            color: CREAM,
                        }}
                    >
                        Architecture
                    </h2>

                    {/* ── Description ── */}
                    <div
                        ref={textBlockRef}
                        className="
                            absolute
                            left-8
                            md:left-14
                            bottom-10
                            md:bottom-14
                            z-30
                            max-w-md

                            max-lg:left-7
                            max-lg:right-28
                            max-lg:bottom-8
                            max-lg:max-w-[470px]

                            max-md:left-6
                            max-md:right-24
                            max-md:bottom-7
                            max-md:max-w-[390px]

                            max-sm:left-5
                            max-sm:right-20
                            max-sm:bottom-5
                            max-sm:max-w-[300px]
                        "
                    >
                        <p
                            className="
                                text-lg
                                md:text-2xl
                                leading-snug

                                max-lg:text-[1.2rem]
                                max-lg:leading-[1.3]

                                max-md:text-[1.05rem]
                                max-md:leading-[1.3]

                                max-sm:text-[0.9rem]
                                max-sm:leading-[1.35]
                            "
                            style={{
                                fontFamily:
                                    "'Playfair Display', Georgia, serif",
                                color: CREAM,
                            }}
                        >
                            The architecture here favours clean lines and warm
                            stone — built to feel settled into the coastline,
                            not dropped onto it.
                        </p>

                        <p
                            className="
                                mt-4
                                text-[10px]
                                tracking-[0.2em]
                                uppercase
                                opacity-70

                                max-sm:mt-3
                                max-sm:text-[8px]
                                max-sm:tracking-[0.16em]
                            "
                            style={{ color: CREAM }}
                        >
                            Design — Ashish Pandey
                        </p>
                    </div>

                    {/* ── CTA circle ── */}
                    <div
                        ref={ctaRef}
                        className="
                            absolute
                            right-10
                            bottom-10
                            z-30
                            w-32
                            h-32
                            flex
                            flex-col
                            items-center
                            justify-center
                            cursor-pointer

                            max-lg:right-7
                            max-lg:bottom-7
                            max-lg:w-28
                            max-lg:h-28

                            max-md:right-5
                            max-md:bottom-6
                            max-md:w-24
                            max-md:h-24

                            max-sm:right-4
                            max-sm:bottom-4
                            max-sm:w-20
                            max-sm:h-20
                        "
                    >
                        <svg
                            viewBox="0 0 200 200"
                            className="
                                absolute
                                inset-0
                                w-full
                                h-full
                            "
                        >
                            <circle
                                cx="100"
                                cy="100"
                                r="96"
                                fill="none"
                                stroke={CREAM}
                                strokeWidth="1"
                                strokeDasharray="4 6"
                                opacity="0.6"
                            />
                        </svg>

                        <span
                            className="
                                text-[9px]
                                font-bold
                                tracking-[0.2em]
                                uppercase
                                text-center
                                px-4

                                max-lg:text-[8px]
                                max-lg:px-3

                                max-sm:text-[7px]
                                max-sm:tracking-[0.14em]
                                max-sm:px-2
                            "
                            style={{ color: CREAM }}
                        >
                            Book a Call Now
                        </span>
                    </div>
                </div>
            </div>

            {/* ── Next section content ── */}
            <div className="absolute inset-0 flex items-center z-10">
                <video
                    ref={nextFlowerRef}
                    src={FLOWER_SRC}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="
                        absolute
                        right-10
                        top-20
                        rotate-90
                        -translate-y-1/2
                        w-[36vw]
                        h-[36vw]
                        max-w-md
                        max-h-md
                        object-cover
                        mix-blend-multiply
                        pointer-events-none

                        max-lg:right-5
                        max-lg:top-24
                        max-lg:w-[34vw]
                        max-lg:h-[34vw]
                        max-lg:max-w-[280px]
                        max-lg:max-h-[280px]

                        max-md:right-2
                        max-md:top-20
                        max-md:w-[38vw]
                        max-md:h-[38vw]
                        max-md:max-w-[230px]
                        max-md:max-h-[230px]

                        max-sm:right-[-10px]
                        max-sm:top-16
                        max-sm:w-[42vw]
                        max-sm:h-[42vw]
                        max-sm:max-w-[190px]
                        max-sm:max-h-[190px]
                    "
                />

                <div
                    ref={nextTextRef}
                    className="
                        relative
                        z-20
                        pl-16
                        md:pl-24
                        max-w-lg

                        max-lg:pl-10
                        max-lg:max-w-[60%]

                        max-md:pl-7
                        max-md:max-w-[62%]

                        max-sm:pl-5
                        max-sm:max-w-[70%]
                    "
                >
                    <p
                        className="
                            text-3xl
                            md:text-5xl
                            leading-tight

                            max-lg:text-[2.7rem]
                            max-lg:leading-[1.05]

                            max-md:text-[2.2rem]
                            max-md:leading-[1.05]

                            max-sm:text-[1.7rem]
                            max-sm:leading-[1.08]
                        "
                        style={{
                            fontFamily:
                                "'Playfair Display', Georgia, serif",
                            color: NAVY,
                        }}
                    >
                        Developer
                        <br />
                        Sales &amp; Marketing
                        <br />
                        License Obtained
                        <br />
                        2026
                    </p>
                </div>
            </div>
        </section>
    )
}