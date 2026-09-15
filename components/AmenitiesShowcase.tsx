"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const CREAM = "#f3f1e9"
const NAVY = "#131a2b"

const AMENITIES = [
    {
        label: "Gated Community",
        image: "/Gated-community.webp",
        desc: "Instead of corridors, walking paths connect the residences — making it feel closer to a group of private homes than a standard complex.",
    },
    {
        label: "Swimming Pool",
        image: "/Swimming-Pool.webp",
        desc: "A saltwater pool, a separate children's pool, and a quiet corner set aside for sauna and jacuzzi.",
    },
    {
        label: "Parking Area",
        image: "/parking.webp",
        desc: "Private covered parking for every residence, with pre-installation for optional EV charging.",
    },
    {
        label: "Spa & Gym",
        image: "/spa.webp",
        desc: "A resident-only spa and fitness space, built for a slower, more balanced rhythm of living.",
    },
    {
        label: "Landscaping",
        image: "/landscaping.webp",
        desc: "Planting chosen to soften the architecture and tie each residence back to its surroundings.",
    },
]

export default function AmenitiesShowcase() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const imageRefs = useRef<(HTMLDivElement | null)[]>([])
    const [active, setActive] = useState(0)

    // Parallax pan inside the background image — driven by normal scroll through
    // this section (not pinned), so the image quietly drifts as you pass it.
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)
        const ctx = gsap.context(() => {
            imageRefs.current.forEach((el) => {
                if (!el) return
                gsap.fromTo(
                    el,
                    { yPercent: -6 },
                    {
                        yPercent: 6,
                        ease: "none",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                    }
                )
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative h-screen w-full overflow-hidden"
            style={{ background: NAVY, color: CREAM }}
        >
            {/* ── Background images, crossfaded on tab change ── */}
            {AMENITIES.map((a, i) => (
                <div
                    key={a.label}
                    className="absolute inset-0 overflow-hidden transition-opacity duration-700"
                    style={{ opacity: active === i ? 1 : 0, zIndex: active === i ? 10 : 0 }}
                >
                    <div
                        ref={(el) => { imageRefs.current[i] = el }}
                        className="absolute inset-0 will-change-transform"
                        style={{
                            backgroundImage: `url(${a.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            height: "112%",
                            top: "-6%",
                        }}
                    />
                </div>
            ))}

            {/* Darken overlay so the tab list and text stay legible over any photo */}
            <div
                className="absolute inset-0 z-20 pointer-events-none"
                style={{
                    background:
                        "linear-gradient(180deg, rgba(19,26,43,0.15) 0%, rgba(19,26,43,0.05) 40%, rgba(19,26,43,0.55) 100%)",
                }}
            />

            {/* ── Left rail: index number + line only ── */}
            <div className="absolute top-40 left-8 md:left-10 z-50 hidden md:flex flex-col items-center gap-6">
                <span className="text-xs font-bold tracking-widest">
                    {String(60 + active * 4).padStart(2, "0")}
                </span>
                <div className="w-[1px] h-64 opacity-30" style={{ background: CREAM }} />
            </div>

            {/* ── Tab list, right side ── */}
            <div className="absolute top-16 right-10 z-50 flex flex-col items-end gap-2 text-right">
                {AMENITIES.map((a, i) => (
                    <button
                        key={a.label}
                        onClick={() => setActive(i)}
                        className="text-xl md:text-2xl leading-snug tracking-wide transition-all duration-500"
                        style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            opacity: active === i ? 1 : 0.4,
                            fontWeight: active === i ? 600 : 400,
                        }}
                    >
                        {a.label}
                    </button>
                ))}
            </div>

            {/* ── Dashed CTA circle over the image ── */}
            <div className="absolute right-[18%] bottom-[16%] z-50 w-36 h-36 flex flex-col items-center justify-center cursor-pointer">
                <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
                    <circle cx="100" cy="100" r="96" fill="none" stroke={CREAM} strokeWidth="1" strokeDasharray="4 6" opacity="0.6" />
                </svg>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-center px-6 leading-relaxed">
                    Book a Call<br />Now
                </span>
            </div>

            {/* ── Bottom-left description, crossfades with the active tab ── */}
            <div className="absolute left-8 md:left-24 bottom-16 z-40 max-w-2xl">
                <p
                    key={active}
                    className="text-2xl md:text-4xl leading-[1.25]"
                    style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        animation: "fadeUp 0.6s ease",
                    }}
                >
                    {AMENITIES[active].desc}
                </p>
            </div>

            <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </section>
    )
}