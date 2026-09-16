"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    ArrowUpRight,
    Mail,
    MapPin,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function RealEstateFooter() {
    const sectionRef = useRef<HTMLElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    const skylineRef = useRef<HTMLImageElement>(null);
    const skylineGlowRef = useRef<HTMLDivElement>(null);

    const topItemsRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const brandRef = useRef<HTMLHeadingElement>(null);
    const bottomItemsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            const section = sectionRef.current;
            const panel = panelRef.current;
            const skyline = skylineRef.current;
            const skylineGlow = skylineGlowRef.current;

            const topItems = topItemsRef.current;
            const cta = ctaRef.current;
            const brand = brandRef.current;
            const bottomItems = bottomItemsRef.current;

            if (
                !section ||
                !panel ||
                !skyline ||
                !skylineGlow ||
                !topItems ||
                !cta ||
                !brand ||
                !bottomItems
            ) {
                return;
            }

            /* ==========================================================
               INITIAL STATES
            ========================================================== */

            gsap.set(panel, {
                y: 60,
                opacity: 0,
            });

            gsap.set(topItems.children, {
                y: 18,
                opacity: 0,
            });

            gsap.set(cta, {
                y: 28,
                opacity: 0,
            });

            gsap.set(brand, {
                y: 50,
                opacity: 0,
            });

            gsap.set(bottomItems.children, {
                y: 14,
                opacity: 0,
            });

            /*
             * Skyline is mostly static on entry.
             *
             * Small transform only so it can settle into the composition.
             */
            gsap.set(skyline, {
                yPercent: 5,
                scale: 1.02,
            });

            gsap.set(skylineGlow, {
                opacity: 0,
            });

            /* ==========================================================
               MAIN FOOTER ENTRANCE
            ========================================================== */

            const entrance = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top 82%",
                    end: "top 20%",
                    scrub: 1.1,
                    invalidateOnRefresh: true,
                },
            });

            entrance.to(
                panel,
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power4.out",
                },
                0
            );

            entrance.to(
                topItems.children,
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.55,
                    stagger: 0.07,
                    ease: "power3.out",
                },
                0.12
            );

            entrance.to(
                cta,
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.75,
                    ease: "power3.out",
                },
                0.25
            );

            entrance.to(
                brand,
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                },
                0.38
            );

            entrance.to(
                skyline,
                {
                    yPercent: 0,
                    scale: 1,
                    duration: 0.9,
                    ease: "power3.out",
                },
                0.28
            );

            entrance.to(
                skylineGlow,
                {
                    opacity: 0.35,
                    duration: 0.7,
                    ease: "power2.out",
                },
                0.3
            );

            entrance.to(
                bottomItems.children,
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.07,
                    ease: "power3.out",
                },
                0.58
            );

            /* ==========================================================
               VERY SMALL SKYLINE PARALLAX
            ========================================================== */

            gsap.to(skyline, {
                yPercent: -5,
                xPercent: -2,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 4,
                },
            });

            /*
             * Very subtle glow movement.
             * The buildings themselves remain visually calm.
             */

            gsap.to(skylineGlow, {
                y: -5,
                duration: 5,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
            });

            /* ==========================================================
               BRAND PARALLAX
            ========================================================== */

            gsap.to(brand, {
                yPercent: -2,
                xPercent: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 4,
                },
            });

            ScrollTrigger.refresh();
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer
            ref={sectionRef}
            className="
                relative
                w-full
                overflow-hidden
                bg-[#e8e7e3]
                px-4
                pb-4
                pt-4
                md:px-6
                md:pb-6
                md:pt-6
            "
        >
            {/* ==========================================================
                MAIN FOOTER PANEL
            ========================================================== */}

            <div
                ref={panelRef}
                className="
                    relative
                    min-h-[760px]
                    overflow-hidden
                    rounded-[36px]
                    bg-[#f6f6f3]
                    md:min-h-[840px]
                    md:rounded-[48px]
                "
            >
                {/* ======================================================
                    TOP NAV
                ====================================================== */}

                <div
                    ref={topItemsRef}
                    className="
                        relative
                        z-[60]
                        grid
                        grid-cols-1
                        gap-8
                        px-7
                        pt-9
                        md:grid-cols-12
                        md:px-12
                        md:pt-10
                    "
                >
                    {/* Brand statement */}

                    <div className="md:col-span-4">
                        <p
                            className="
                                max-w-[280px]
                                text-[12px]
                                font-medium
                                leading-[1.45]
                                tracking-[-0.02em]
                                text-[#121212]
                                md:text-[14px]
                            "
                        >
                            Crafted around people, place,
                            and the feeling of coming home.
                        </p>
                    </div>

                    {/* Explore */}

                    <div className="hidden md:col-span-2 md:col-start-5 md:block">
                        <p
                            className="
                                mb-3
                                text-[9px]
                                font-semibold
                                uppercase
                                tracking-[0.2em]
                                text-black/40
                            "
                        >
                            Explore
                        </p>

                        <nav className="flex flex-col gap-1.5 text-[11px] text-black/65">
                            <a
                                href="#about"
                                className="w-fit transition-colors hover:text-black"
                            >
                                About
                            </a>

                            <a
                                href="#properties"
                                className="w-fit transition-colors hover:text-black"
                            >
                                Properties
                            </a>

                            <a
                                href="#services"
                                className="w-fit transition-colors hover:text-black"
                            >
                                Services
                            </a>

                            <a
                                href="#contact"
                                className="w-fit transition-colors hover:text-black"
                            >
                                Contact
                            </a>
                        </nav>
                    </div>

                    {/* Follow */}

                    <div className="hidden md:col-span-3 md:block">
                        <p
                            className="
                                mb-3
                                text-[9px]
                                font-semibold
                                uppercase
                                tracking-[0.2em]
                                text-black/40
                            "
                        >
                            Follow
                        </p>

                        <div className="flex flex-col gap-2 text-[11px] text-black/65">
                            <a
                                href="#"
                                className="w-fit transition-transform duration-300 hover:translate-x-1"
                            >
                                Instagram
                            </a>

                            <a
                                href="#"
                                className="w-fit transition-transform duration-300 hover:translate-x-1"
                            >
                                LinkedIn
                            </a>

                            <a
                                href="#"
                                className="flex w-fit items-center gap-2 transition-transform duration-300 hover:translate-x-1"
                            >
                                <Mail size={12} />
                                Newsletter
                            </a>
                        </div>
                    </div>

                    {/* Contact */}

                    <div className="md:col-span-3 md:col-start-10">
                        <div className="flex flex-col items-start md:items-end">
                            <a
                                href="#contact"
                                className="
                                    group
                                    flex
                                    items-center
                                    gap-2
                                    text-[13px]
                                    font-semibold
                                    text-[#151515]
                                "
                            >
                                Let's find your place

                                <span
                                    className="
                                        flex
                                        h-5
                                        w-5
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-[#f04b35]
                                        text-white
                                        transition-transform
                                        duration-300
                                        group-hover:rotate-45
                                    "
                                >
                                    <ArrowUpRight size={11} />
                                </span>
                            </a>

                            <span
                                className="
                                    mt-1
                                    text-[9px]
                                    uppercase
                                    tracking-[0.12em]
                                    text-black/40
                                "
                            >
                                Start a conversation
                            </span>
                        </div>
                    </div>
                </div>

                {/* ======================================================
                    MAIN CTA
                ====================================================== */}

                <div
                    ref={ctaRef}
                    className="
                        absolute
                        left-1/2
                        top-[39%]
                        z-[50]
                        w-[92%]
                        -translate-x-1/2
                        text-center
                        md:top-[38%]
                        md:w-auto
                    "
                >
                    <p
                        className="
                            mb-4
                            text-[9px]
                            font-semibold
                            uppercase
                            tracking-[0.3em]
                            text-black/40
                        "
                    >
                        Your next address
                    </p>

                    <h2
                        className="
                            text-[10vw]
                            font-light
                            leading-[0.87]
                            tracking-[-0.075em]
                            text-[#111111]
                            md:text-[6.8vw]
                        "
                    >
                        Find a place
                        <br />
                        that feels like yours.
                    </h2>

                    <button
                        className="
                            group
                            mt-7
                            inline-flex
                            items-center
                            gap-3
                            rounded-full
                            bg-[#111111]
                            px-6
                            py-3
                            text-[10px]
                            uppercase
                            tracking-[0.18em]
                            text-white
                            transition-transform
                            duration-300
                            hover:scale-105
                        "
                    >
                        Explore properties

                        <span
                            className="
                                flex
                                h-6
                                w-6
                                items-center
                                justify-center
                                rounded-full
                                bg-white
                                text-black
                                transition-transform
                                duration-300
                                group-hover:rotate-45
                            "
                        >
                            <ArrowUpRight size={12} />
                        </span>
                    </button>
                </div>

                {/* ======================================================
                    SKYLINE
                    ------------------------------------------------------
                    IMPORTANT:
                    This sits BETWEEN the CTA and REAL ESTATE.
                ====================================================== */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        left-1/2
                        top-[54%]
                        z-[30]
                        w-full
                        -translate-x-1/2
                        md:top-[52%]
                    "
                >
                    {/* Glow behind buildings */}

                    <div
                        ref={skylineGlowRef}
                        className="
                            absolute
                            bottom-[-20px]
                            left-1/2
                            h-[170px]
                            w-[75%]
                            -translate-x-1/2
                            rounded-full
                            bg-white
                            blur-[65px]
                        "
                    />

                    {/* Skyline */}

                    <img
                        ref={skylineRef}
                        src="/footer-img.png"
                        alt=""
                        className="
                            relative
                            left-1/2
                            block
                            w-[150%]
                            max-w-none
                            -translate-x-1/2
                            md:w-[120%]
                        "
                    />
                </div>

                {/* ======================================================
                    GIANT REAL ESTATE
                    ------------------------------------------------------
                    Skyline is above this layer so the buildings appear
                    to sit in front of / behind the giant type.
                ====================================================== */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        bottom-[-7%]
                        left-0
                        z-[20]
                        w-full
                        overflow-hidden
                    "
                >
                    <h1
                        ref={brandRef}
                        className="
                            whitespace-nowrap
                            text-center
                            text-[24vw]
                            font-black
                            uppercase
                            leading-[0.68]
                            tracking-[-0.075em]
                            text-[#111111]
                            md:text-[15.5vw]
                        "
                    >
                        REAL ESTATE
                    </h1>
                </div>

                {/* ======================================================
                    HORIZONTAL DIVIDER
                ====================================================== */}

                <div
                    className="
                        absolute
                        bottom-[18%]
                        left-7
                        right-7
                        z-[35]
                        h-px
                        bg-black/[0.08]
                        md:left-12
                        md:right-12
                    "
                />

                {/* ======================================================
                    BOTTOM INFO
                ====================================================== */}

                <div
                    ref={bottomItemsRef}
                    className="
                        absolute
                        bottom-6
                        left-7
                        right-7
                        z-[60]
                        flex
                        flex-col
                        gap-5
                        md:bottom-8
                        md:left-12
                        md:right-12
                        md:flex-row
                        md:items-end
                        md:justify-between
                    "
                >
                    {/* Copyright */}

                    <div
                        className="
                            text-[9px]
                            uppercase
                            tracking-[0.12em]
                            text-black/40
                        "
                    >
                        © {new Date().getFullYear()} FIND
                    </div>

                    {/* Location */}

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            text-[9px]
                            uppercase
                            tracking-[0.15em]
                            text-black/45
                        "
                    >
                        <MapPin size={11} />
                        India · Worldwide
                    </div>

                    {/* Legal */}

                    <div
                        className="
                            flex
                            gap-5
                            text-[9px]
                            uppercase
                            tracking-[0.12em]
                            text-black/40
                        "
                    >
                        <a
                            href="#"
                            className="transition-colors hover:text-black"
                        >
                            Privacy
                        </a>

                        <a
                            href="#"
                            className="transition-colors hover:text-black"
                        >
                            Terms
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}