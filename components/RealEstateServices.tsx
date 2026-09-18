"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

type Service = {
    number: string;
    title: string;
    description: string;
    image: string;
};

const services: Service[] = [
    {
        number: "1",
        title: "Buy",
        description:
            "Find the right property with expert guidance, local insight, and a smoother path from search to ownership.",
        image:
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=90",
    },
    {
        number: "2",
        title: "Sell",
        description:
            "Present your property at its best with strategic positioning, thoughtful marketing, and support at every step.",
        image:
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2200&q=90",
    },
    {
        number: "3",
        title: "Rent",
        description:
            "Discover spaces that fit the way you live, with carefully selected homes and guidance from first viewing to move-in.",
        image:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=90",
    },
];

export default function RealEstateServices() {
    return (
        <section className="relative w-full bg-[#111212] text-white">
            {/* ==========================================
                HEADER
            ========================================== */}

            <div
                className={`
                    relative
                    border-b
                    border-white/15
                    px-6
                    pb-24
                    pt-28
                    md:px-[5.3vw]
                    md:pb-28
                    md:pt-32

                    max-lg:px-7
                    max-lg:pb-20
                    max-lg:pt-24

                    max-md:px-6
                    max-md:pb-16
                    max-md:pt-20

                    max-sm:px-5
                    max-sm:pb-14
                    max-sm:pt-16
                `}
            >
                <div
                    className={`
                        grid
                        grid-cols-12
                        items-start

                        max-lg:grid-cols-12
                        max-md:grid-cols-1
                    `}
                >
                    {/* Left label */}

                    <div
                        className={`
                            col-span-3

                            max-md:col-span-1
                            max-md:mb-7
                        `}
                    >
                        <span
                            className={`
                                text-[11px]
                                font-medium
                                tracking-[-0.01em]
                                text-white
                                md:text-sm

                                max-sm:text-[10px]
                            `}
                        >
                            Services
                        </span>
                    </div>

                    {/* Center heading */}

                    <div
                        className={`
                            col-span-9
                            md:col-span-6
                            md:col-start-6

                            max-lg:col-span-9
                            max-lg:col-start-4

                            max-md:col-span-1
                            max-md:col-start-auto
                        `}
                    >
                        <h2
                            className={`
                                text-[11vw]
                                font-light
                                leading-[0.83]
                                tracking-[-0.065em]
                                md:text-[6.8vw]

                                max-lg:text-[8.5vw]

                                max-md:text-[14vw]
                                max-md:leading-[0.86]

                                max-sm:text-[15vw]
                            `}
                        >
                            <span className="block text-white">
                                How WE
                            </span>

                            <span className="block text-white/55">
                                Can Help You
                            </span>
                        </h2>
                    </div>

                    {/* Small supporting text */}

                    <div className="hidden md:block md:col-span-2 md:col-start-11">
                        <p className="max-w-[170px] pt-2 text-[11px] leading-[1.5] text-white/45">
                            Thoughtful property services built around where
                            you're going next.
                        </p>
                    </div>
                </div>
            </div>

            {/* ==========================================
                SERVICES
            ========================================== */}

            <div>
                {services.map((service) => (
                    <ServiceRow
                        key={service.title}
                        service={service}
                    />
                ))}
            </div>

            {/* ==========================================
                FOOTER
            ========================================== */}

            <div
                className={`
                    flex
                    items-center
                    justify-center
                    border-t
                    border-white/15
                    py-10

                    max-md:py-8

                    max-sm:py-7
                `}
            >
                <div className="flex items-center gap-4">
                    <span
                        className={`
                            text-[10px]
                            uppercase
                            tracking-[0.25em]
                            text-white/70

                            max-sm:text-[8px]
                            max-sm:tracking-[0.2em]
                        `}
                    >
                        Explore all services
                    </span>

                    <span
                        className={`
                            h-px
                            w-12
                            bg-white/45

                            max-sm:w-8
                        `}
                    />
                </div>
            </div>
        </section>
    );
}

/* ======================================================
   SERVICE ROW
====================================================== */

function ServiceRow({ service }: { service: Service }) {
    const rowRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const arrowRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        const bg = bgRef.current;
        const image = imageRef.current;
        const content = contentRef.current;
        const title = titleRef.current;
        const arrow = arrowRef.current;

        if (!bg || !image || !content || !title || !arrow) return;

        gsap.killTweensOf([bg, image, content, title, arrow]);

        const tl = gsap.timeline();

        tl.set(bg, {
            transformOrigin: "bottom center",
        });

        tl.fromTo(
            bg,
            {
                scaleY: 0,
            },
            {
                scaleY: 1,
                duration: 0.7,
                ease: "power4.out",
            }
        );

        tl.fromTo(
            image,
            {
                scale: 1.15,
                y: 40,
            },
            {
                scale: 1,
                y: 0,
                duration: 1.1,
                ease: "power3.out",
            },
            0
        );

        tl.to(
            content,
            {
                y: -3,
                duration: 0.35,
                ease: "power2.out",
            },
            0
        );

        tl.to(
            title,
            {
                x: 8,
                duration: 0.45,
                ease: "power3.out",
            },
            0.08
        );

        tl.to(
            arrow,
            {
                x: 8,
                scale: 1.08,
                duration: 0.45,
                ease: "power3.out",
            },
            0.12
        );
    };

    const handleMouseLeave = () => {
        const bg = bgRef.current;
        const image = imageRef.current;
        const content = contentRef.current;
        const title = titleRef.current;
        const arrow = arrowRef.current;

        if (!bg || !image || !content || !title || !arrow) return;

        gsap.killTweensOf([bg, image, content, title, arrow]);

        const tl = gsap.timeline();

        tl.to(
            bg,
            {
                scaleY: 0,
                duration: 0.55,
                ease: "power3.inOut",
            },
            0
        );

        tl.to(
            image,
            {
                scale: 1.08,
                y: 20,
                duration: 0.55,
                ease: "power2.inOut",
            },
            0
        );

        tl.to(
            content,
            {
                y: 0,
                duration: 0.3,
                ease: "power2.out",
            },
            0
        );

        tl.to(
            title,
            {
                x: 0,
                duration: 0.35,
                ease: "power2.out",
            },
            0
        );

        tl.to(
            arrow,
            {
                x: 0,
                scale: 1,
                duration: 0.35,
                ease: "power2.out",
            },
            0
        );
    };

    return (
        <article
            ref={rowRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleMouseEnter}
            className="
                group
                relative
                overflow-hidden
                border-b
                border-white/15
            "
        >
            {/* ==========================================
                BACKGROUND IMAGE
            ========================================== */}

            <div
                ref={bgRef}
                className="
                    absolute
                    inset-0
                    z-0
                    origin-bottom
                    scale-y-0
                    overflow-hidden
                "
            >
                {/* Image */}

                <div
                    ref={imageRef}
                    className="
                        absolute
                        inset-0
                        scale-[1.15]

                        max-md:scale-[1.12]
                    "
                    style={{
                        backgroundImage: `url("${service.image}")`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                    }}
                />

                {/* Dark overlay */}

                <div className="absolute inset-0 bg-black/45" />

                {/* Gradient */}

                <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-black/25" />

                {/* Subtle grain */}

                <div
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E\")",
                    }}
                />
            </div>

            {/* ==========================================
                ROW CONTENT
            ========================================== */}

            <div
                ref={contentRef}
                className={`
                    relative
                    z-10
                    grid
                    min-h-[380px]
                    cursor-pointer
                    grid-cols-12
                    items-center
                    px-6
                    py-16
                    md:min-h-[340px]
                    md:px-[5.3vw]

                    max-lg:min-h-[320px]
                    max-lg:px-7
                    max-lg:py-14

                    max-md:min-h-[330px]
                    max-md:grid-cols-1
                    max-md:items-start
                    max-md:px-6
                    max-md:py-12

                    max-sm:min-h-[300px]
                    max-sm:px-5
                    max-sm:py-10
                `}
            >
                {/* Number */}

                <div
                    className={`
                        col-span-2
                        self-start
                        pt-1
                        md:col-span-1

                        max-lg:col-span-1

                        max-md:col-span-1
                        max-md:pt-0

                        max-sm:absolute
                        max-sm:left-5
                        max-sm:top-8
                    `}
                >
                    <div
                        className={`
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-white/70
                            text-[11px]
                            transition-all
                            duration-500
                            group-hover:bg-white
                            group-hover:text-black

                            max-sm:h-9
                            max-sm:w-9
                            max-sm:text-[10px]
                        `}
                    >
                        {service.number}
                    </div>
                </div>

                {/* Description */}

                <div
                    className={`
                        col-span-4
                        md:col-span-3

                        max-lg:col-span-4

                        max-md:col-span-1
                        max-md:mt-14
                        max-md:max-w-[75%]

                        max-sm:mt-12
                        max-sm:max-w-[82%]
                    `}
                >
                    <p
                        className={`
                            max-w-[285px]
                            text-[14px]
                            font-medium
                            leading-[1.55]
                            tracking-[-0.025em]
                            text-white/90
                            md:text-[16px]

                            max-lg:max-w-[240px]
                            max-lg:text-[14px]

                            max-md:max-w-[400px]
                            max-md:text-[13px]
                            max-md:leading-[1.5]

                            max-sm:max-w-[310px]
                            max-sm:text-[12px]
                        `}
                    >
                        {service.description}
                    </p>
                </div>

                {/* Main title */}

                <div
                    className={`
                        col-span-6
                        flex
                        items-center
                        justify-center
                        md:col-span-7

                        max-lg:col-span-7

                        max-md:col-span-1
                        max-md:mt-8
                        max-md:w-full
                        max-md:justify-start

                        max-sm:mt-7
                    `}
                >
                    <h3
                        ref={titleRef}
                        className={`
                            text-[22vw]
                            font-light
                            leading-[0.75]
                            tracking-[-0.075em]
                            text-white
                            transition-colors
                            duration-300
                            md:text-[13vw]

                            max-lg:text-[14vw]

                            max-md:text-[25vw]
                            max-md:leading-[0.72]
                            max-md:pl-[7vw]

                            max-sm:text-[27vw]
                            max-sm:pl-[8vw]
                        `}
                    >
                        {service.title}
                    </h3>
                </div>

                {/* Arrow */}

                <div
                    className={`
                        absolute
                        right-6
                        top-1/2
                        -translate-y-1/2
                        md:right-[5.3vw]

                        max-lg:right-7

                        max-md:right-5
                        max-md:top-8
                        max-md:translate-y-0

                        max-sm:right-4
                        max-sm:top-7
                    `}
                >
                    <div
                        ref={arrowRef}
                        className={`
                            flex
                            h-16
                            w-16
                            items-center
                            justify-center
                            md:h-20
                            md:w-20

                            max-lg:h-16
                            max-lg:w-16

                            max-md:h-12
                            max-md:w-12

                            max-sm:h-10
                            max-sm:w-10
                        `}
                    >
                        <ArrowUpRight
                            strokeWidth={1}
                            className={`
                                h-12
                                w-12
                                md:h-16
                                md:w-16

                                max-lg:h-12
                                max-lg:w-12

                                max-md:h-9
                                max-md:w-9

                                max-sm:h-8
                                max-sm:w-8
                            `}
                        />
                    </div>
                </div>
            </div>
        </article>
    );
}