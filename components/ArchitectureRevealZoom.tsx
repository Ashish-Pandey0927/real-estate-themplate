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
            gsap.set(titleRef.current, { clipPath: "inset(0 100% 0 0)", opacity: 1, y: 0 })
            gsap.set(textBlockRef.current, { opacity: 0, y: 20 })
            gsap.set(ctaRef.current, { opacity: 0, scale: 0.85 })
            gsap.set(nextFlowerRef.current, { opacity: 0, scale: 0.9 })
            gsap.set(nextTextRef.current, { opacity: 0, y: 16 })

            // Proxy driving background-size / background-position on both halves.
            const bg = { sizeY: 500, posY: 0 } // 500% ⇒ only the top ~20% slice shows
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
                    end: "+=500%", // long pin distance — the gap-close phase alone needs real scroll room
                    pin: true,
                    scrub: 1,
                    // markers: true,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        const p = self.progress
                        const idx = p < 0.5 ? 0 : p < 0.66 ? 1 : p < 0.8 ? 2 : 3
                        setPhase(idx)
                    },
                },
            })

            // ── Phase 1 (0 → 0.5): close the gap. This is the SLOW, deliberate
            // half of the whole sequence — crop stays fixed at the top 20% the
            // entire time, only the horizontal gap between panels closes ──
            tl.to(leftRef.current, { xPercent: 0, yPercent: 0, ease: "power1.inOut" }, 0)
                .to(rightRef.current, { xPercent: 0, yPercent: 0, ease: "power1.inOut" }, 0)

                // ── Phase 2 (0.5 → 0.58): box expands to true full-bleed. Crop stays
                // the same top-20% slice — the box just grows to fill the viewport,
                // so it reads as "getting bigger," not "revealing more of the photo" ──
                .to(stageRef.current, { width: "100vw", height: "100vh", borderRadius: 0, ease: "power1.inOut" }, 0.5)

                // ── Concurrent with phase 2: title wipes in left-to-right ──
                .to(titleRef.current, { clipPath: "inset(0 0% 0 0)", ease: "power1.inOut" }, 0.5)

                // ── Phase 3 (0.58 → 0.66): hold — full title, full-bleed image,
                // nothing moves. This is a deliberate pause in the reference ──
                // (no tween needed — timeline naturally holds between keyframes)

                // ── Phase 4 (0.66 → 0.75): title exits upward + fades, WHILE the
                // image pans down through itself to reveal the courtyard/ground
                // level further down the same photo — this is the same file, just
                // panning, not a crossfade to a different image ──
                .to(titleRef.current, { y: -40, opacity: 0, ease: "power1.in" }, 0.66)
                .to(bg, { sizeY: 150, posY: 100, ease: "power1.inOut", onUpdate: applyBg }, 0.66)

                // ── Phase 5 (0.75 → 0.8): description text fades in over the newly
                // revealed lower crop ──
                .to(textBlockRef.current, { opacity: 1, y: 0, ease: "power2.out" }, 0.75)

                // ── Phase 6 (0.8 → 0.88): hold, then the CTA circle fades in ──
                .to(ctaRef.current, { opacity: 1, scale: 1, ease: "power2.out" }, 0.82)

                // ── Phase 7 (0.9 → 1.0): quick fade to reveal the next section ──
                .to(overlayRef.current, { opacity: 0, ease: "power1.inOut" }, 0.9)
                .to(railRef.current, { opacity: 0, ease: "power1.inOut" }, 0.9)
                .to(nextFlowerRef.current, { opacity: 1, scale: 1, ease: "power2.out" }, 0.92)
                .to(nextTextRef.current, { opacity: 1, y: 0, ease: "power2.out" }, 0.94)
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="relative h-screen w-full overflow-hidden" style={{ background: CREAM }}>
            <div
                ref={railRef}
                className="absolute top-40 left-8 md:left-10 z-50 hidden md:flex flex-col items-center gap-6"
                style={{ color: phase >= 1 ? CREAM : NAVY }}
            >
                <span className="text-xs font-bold tracking-widest">{String(PHASE_INDEX[phase]).padStart(2, "0")}</span>
                <div className="w-[1px] h-64 opacity-30" style={{ background: "currentColor" }} />
            </div>

            <div ref={overlayRef} className="absolute inset-0">
                <div
                    ref={stageRef}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center will-change-transform overflow-hidden"
                    style={{ width: "72vw", height: "56vh", borderRadius: "2px" }}
                >
                    <div className="relative w-full h-full flex">
                        <div ref={leftRef} className="w-1/2 h-full overflow-hidden will-change-transform">
                            <div
                                ref={leftBgRef}
                                className="w-full h-full"
                                style={{ backgroundImage: `url(${IMAGE_SRC})`, backgroundSize: "200% 500%", backgroundPosition: "left 0%" }}
                            />
                        </div>
                        <div ref={rightRef} className="w-1/2 h-full overflow-hidden will-change-transform">
                            <div
                                ref={rightBgRef}
                                className="w-full h-full"
                                style={{ backgroundImage: `url(${IMAGE_SRC})`, backgroundSize: "200% 500%", backgroundPosition: "right 0%" }}
                            />
                        </div>
                    </div>

                    <h2
                        ref={titleRef}
                        className="absolute inset-0 flex items-center justify-center text-center px-4 pointer-events-none select-none z-30"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(3rem, 12vw, 11rem)", lineHeight: 0.85, color: CREAM }}
                    >
                        Architecture
                    </h2>

                    <div ref={textBlockRef} className="absolute left-8 md:left-14 bottom-10 md:bottom-14 z-30 max-w-md">
                        <p className="text-lg md:text-2xl leading-snug" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: CREAM }}>
                            The architecture here favours clean lines and warm stone — built to feel
                            settled into the coastline, not dropped onto it.
                        </p>
                        <p className="mt-4 text-[10px] tracking-[0.2em] uppercase opacity-70" style={{ color: CREAM }}>
                            Design — Ashish Pandey
                        </p>
                    </div>

                    <div ref={ctaRef} className="absolute right-10 bottom-10 z-30 w-32 h-32 flex flex-col items-center justify-center cursor-pointer">
                        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
                            <circle cx="100" cy="100" r="96" fill="none" stroke={CREAM} strokeWidth="1" strokeDasharray="4 6" opacity="0.6" />
                        </svg>
                        <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-center px-4" style={{ color: CREAM }}>
                            Book a Call Now
                        </span>
                    </div>
                </div>
            </div>

            <div className="absolute inset-0 flex items-center z-10">
                <video
                    ref={nextFlowerRef}
                    src={FLOWER_SRC}
                    autoPlay muted loop playsInline preload="auto"
                    className="absolute right-10 top-20 rotate-90 -translate-y-1/2 w-[36vw] h-[36vw] max-w-md max-h-md object-cover mix-blend-multiply pointer-events-none"
                />
                <div ref={nextTextRef} className="relative z-20 pl-16 md:pl-24 max-w-lg">
                    <p className="text-3xl md:text-5xl leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: NAVY }}>
                        Developer<br />Sales &amp; Marketing<br />License Obtained<br />2026
                    </p>
                </div>
            </div>
        </section>
    )
}