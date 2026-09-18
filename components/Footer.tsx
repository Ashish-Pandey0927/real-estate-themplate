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
            className={`
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

                max-sm:px-3
                max-sm:pb-3
                max-sm:pt-3
            `}
        >
            {/* ==========================================================
                MAIN FOOTER PANEL
            ========================================================== */}

            <div
                ref={panelRef}
                className={`
                    relative
                    min-h-[760px]
                    overflow-hidden
                    rounded-[36px]
                    bg-[#f6f6f3]

                    md:min-h-[840px]
                    md:rounded-[48px]

                    max-lg:min-h-[790px]

                    max-md:min-h-[760px]
                    max-md:rounded-[32px]

                    max-sm:min-h-[720px]
                    max-sm:rounded-[24px]
                `}
            >
                {/* ======================================================
                    TOP NAV
                ====================================================== */}

                <div
                    ref={topItemsRef}
                    className={`
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

                        max-md:gap-5
                        max-md:px-6
                        max-md:pt-7

                        max-sm:gap-4
                        max-sm:px-5
                        max-sm:pt-6
                    `}
                >
                    {/* Brand statement */}

                    <div className="md:col-span-4">
                        <p
                            className={`
                                max-w-[280px]
                                text-[12px]
                                font-medium
                                leading-[1.45]
                                tracking-[-0.02em]
                                text-[#121212]
                                md:text-[14px]

                                max-md:max-w-[250px]
                                max-sm:text-[11px]
                            `}
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

                    <div
                        className="
                            md:col-span-3
                            md:col-start-10

                            max-md:mt-1
                        "
                    >
                        <div className="flex flex-col items-start md:items-end">
                            <a
                                href="#contact"
                                className={`
                                    group
                                    flex
                                    items-center
                                    gap-2
                                    text-[13px]
                                    font-semibold
                                    text-[#151515]

                                    max-sm:text-[11px]
                                `}
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
                                className={`
                                    mt-1
                                    text-[9px]
                                    uppercase
                                    tracking-[0.12em]
                                    text-black/40

                                    max-sm:text-[8px]
                                `}
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
                    className={`
                        absolute
                        left-1/2
                        top-[39%]
                        z-[50]
                        w-[92%]
                        -translate-x-1/2
                        text-center

                        md:top-[38%]
                        md:w-auto

                        max-lg:top-[37%]
                        max-lg:w-[90%]

                        max-md:top-[33%]
                        max-md:w-[94%]

                        max-sm:top-[31%]
                        max-sm:w-[94%]
                    `}
                >
                    <p
                        className={`
                            mb-4
                            text-[9px]
                            font-semibold
                            uppercase
                            tracking-[0.3em]
                            text-black/40

                            max-md:mb-3
                            max-md:text-[8px]
                            max-md:tracking-[0.25em]

                            max-sm:mb-2.5
                            max-sm:text-[7px]
                            max-sm:tracking-[0.22em]
                        `}
                    >
                        Your next address
                    </p>

                    <h2
                        className={`
                            text-[10vw]
                            font-light
                            leading-[0.87]
                            tracking-[-0.075em]
                            text-[#111111]
                            md:text-[6.8vw]

                            max-lg:text-[8.5vw]

                            max-md:text-[11vw]
                            max-md:leading-[0.88]

                            max-sm:text-[11.8vw]
                            max-sm:leading-[0.9]
                        `}
                    >
                        Find a place
                        <br />
                        that feels like yours.
                    </h2>

                    <button
                        className={`
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

                            max-md:mt-6
                            max-md:px-5
                            max-md:py-2.5
                            max-md:text-[9px]

                            max-sm:mt-5
                            max-sm:gap-2
                            max-sm:px-4
                            max-sm:py-2.5
                            max-sm:text-[8px]
                        `}
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

                                max-sm:h-5
                                max-sm:w-5
                            "
                        >
                            <ArrowUpRight
                                size={12}
                                className="max-sm:h-[10px] max-sm:w-[10px]"
                            />
                        </span>
                    </button>
                </div>

                {/* ======================================================
                    SKYLINE
                    ------------------------------------------------------
                    Sits between CTA and REAL ESTATE.
                ====================================================== */}

                <div
                    className={`
                        pointer-events-none
                        absolute
                        left-1/2
                        top-[54%]
                        z-[30]
                        w-full
                        -translate-x-1/2

                        md:top-[52%]

                        max-lg:top-[53%]

                        max-md:top-[49%]
                        max-md:w-[130%]

                        max-sm:top-[48%]
                        max-sm:w-[170%]
                    `}
                >
                    {/* Glow behind buildings */}

                    <div
                        ref={skylineGlowRef}
                        className={`
                            absolute
                            bottom-[-20px]
                            left-1/2
                            h-[170px]
                            w-[75%]
                            -translate-x-1/2
                            rounded-full
                            bg-white
                            blur-[65px]

                            max-md:h-[130px]
                            max-md:w-[80%]
                            max-md:blur-[50px]

                            max-sm:h-[100px]
                            max-sm:w-[78%]
                            max-sm:blur-[40px]
                        `}
                    />

                    {/* Skyline */}

                    <img
                        ref={skylineRef}
                        src="/footer-img.png"
                        alt=""
                        className={`
                            relative
                            left-1/2
                            block
                            w-[150%]
                            max-w-none
                            -translate-x-1/2

                            md:w-[120%]

                            max-lg:w-[135%]

                            max-md:w-[145%]

                            max-sm:w-[170%]
                        `}
                    />
                </div>

                {/* ======================================================
                    GIANT REAL ESTATE
                ====================================================== */}

                <div
                    className={`
                        pointer-events-none
                        absolute
                        bottom-[-7%]
                        left-0
                        z-[20]
                        w-full
                        overflow-hidden

                        max-md:bottom-[-3%]

                        max-sm:bottom-[-2%]
                    `}
                >
                    <h1
                        ref={brandRef}
                        className={`
                            whitespace-nowrap
                            text-center
                            text-[24vw]
                            font-black
                            uppercase
                            leading-[0.68]
                            tracking-[-0.075em]
                            text-[#111111]
                            md:text-[15.5vw]

                            max-lg:text-[19vw]

                            max-md:text-[20vw]
                            max-md:leading-[0.7]

                            max-sm:text-[21vw]
                            max-sm:tracking-[-0.07em]
                        `}
                    >
                        REAL ESTATE
                    </h1>
                </div>

                {/* ======================================================
                    HORIZONTAL DIVIDER
                ====================================================== */}

                <div
                    className={`
                        absolute
                        bottom-[18%]
                        left-7
                        right-7
                        z-[35]
                        h-px
                        bg-black/[0.08]

                        md:left-12
                        md:right-12

                        max-md:bottom-[17%]
                        max-md:left-6
                        max-md:right-6

                        max-sm:bottom-[16%]
                        max-sm:left-5
                        max-sm:right-5
                    `}
                />

                {/* ======================================================
                    BOTTOM INFO
                ====================================================== */}

                <div
                    ref={bottomItemsRef}
                    className={`
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

                        max-md:bottom-6
                        max-md:left-6
                        max-md:right-6
                        max-md:gap-3

                        max-sm:bottom-5
                        max-sm:left-5
                        max-sm:right-5
                    `}
                >
                    {/* Copyright */}

                    <div
                        className={`
                            text-[9px]
                            uppercase
                            tracking-[0.12em]
                            text-black/40

                            max-sm:text-[8px]
                        `}
                    >
                        © {new Date().getFullYear()} FIND
                    </div>

                    {/* Location */}

                    <div
                        className={`
                            flex
                            items-center
                            gap-2
                            text-[9px]
                            uppercase
                            tracking-[0.15em]
                            text-black/45

                            max-sm:text-[8px]
                            max-sm:tracking-[0.1em]
                        `}
                    >
                        <MapPin
                            size={11}
                            className="max-sm:h-[10px] max-sm:w-[10px]"
                        />
                        India · Worldwide
                    </div>

                    {/* Legal */}

                    <div
                        className={`
                            flex
                            gap-5
                            text-[9px]
                            uppercase
                            tracking-[0.12em]
                            text-black/40

                            max-sm:gap-4
                            max-sm:text-[8px]
                            max-sm:tracking-[0.1em]
                        `}
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