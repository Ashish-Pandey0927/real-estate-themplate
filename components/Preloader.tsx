"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable scrolling while preloading
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        // Remove preloader from DOM to avoid blocking clicks
        if (containerRef.current) {
          containerRef.current.style.display = "none";
        }
      },
    });

    const progressObj = { val: 0 };

    // Initial States
    gsap.set(logoRef.current, { scale: 0.9, opacity: 0 });
    gsap.set(progressBarRef.current, { width: "0%" });
    gsap.set([leftDoorRef.current, rightDoorRef.current], { xPercent: 0 });

    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
    })
    .to(progressObj, {
      val: 100,
      duration: 2.0, // Fake loading duration
      ease: "power1.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.innerText = Math.floor(progressObj.val).toString().padStart(2, '0');
        }
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${progressObj.val}%`;
        }
      }
    }, "<") // Start alongside logo fade in
    
    // Once loading hits 100%: logo fades/scales out
    .to(logoRef.current, {
      opacity: 0,
      y: -20,
      scale: 1.05,
      duration: 0.4,
      ease: "power2.in"
    })
    
    // Add label for doors opening
    .add("doorsOpen")
    
    // Unlock scrolling right as doors start to open
    .call(() => {
      document.body.style.overflow = "";
    }, undefined, "doorsOpen")
    
    // Door opening animation
    .to(leftDoorRef.current, {
      xPercent: -100,
      duration: 1.3,
      ease: "expo.inOut"
    }, "doorsOpen")
    .to(rightDoorRef.current, {
      xPercent: 100,
      duration: 1.3,
      ease: "expo.inOut"
    }, "doorsOpen")
    
    // Fire event for Hero overlap slightly before doors finish
    // Doors take 1.3s, overlapping by 0.4s means starting at 0.9s into the door animation
    .call(() => {
      window.dispatchEvent(new Event("preloaderComplete"));
    }, undefined, "doorsOpen+=0.9");

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex pointer-events-none"
    >
      {/* Left Door */}
      <div
        ref={leftDoorRef}
        className="w-1/2 h-full bg-[#0b1320] pointer-events-auto border-r border-white/5 shadow-[2px_0_10px_rgba(0,0,0,0.5)] z-10"
      />
      
      {/* Right Door */}
      <div
        ref={rightDoorRef}
        className="w-1/2 h-full bg-[#0b1320] pointer-events-auto shadow-[-2px_0_10px_rgba(0,0,0,0.5)] z-10"
      />

      {/* Centered Logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <svg
          ref={logoRef}
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white drop-shadow-2xl"
        >
          <path
            d="M3 10L12 3L21 10V21H15V14H9V21H3V10Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 21V14H15V21"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Progress Counter */}
      <div className="absolute bottom-12 right-12 z-20 pointer-events-none overflow-hidden">
        <div className="text-white font-mono text-4xl font-light tracking-tighter opacity-80">
          <span ref={counterRef}>00</span>
          <span className="text-xl ml-1 opacity-50">%</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-20 pointer-events-none">
        <div ref={progressBarRef} className="h-full bg-white/70" />
      </div>
    </div>
  );
}
