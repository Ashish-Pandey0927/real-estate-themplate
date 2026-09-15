"use client"

import React from "react"

export default function CloudLayer() {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none">
      <img
        src="/cloud1.png"
        alt=""
        className="absolute left-8 top-8 w-[250px] opacity-95 z-10"
      />

      <img
        src="/cloud1.png"
        alt=""
        className="absolute right-10 top-28 w-[340px] opacity-95 z-10"
      />

      <img src="/cloud1.png" alt="" className="absolute left-30 top-[150px] w-[300px] opacity-95 z-10" />

      <img
        src="/cloud3.png"
        alt=""
        className="absolute left-0 bottom-0 w-full opacity-100 z-10 transform rotate-180"
      />
    </div>
  )
}
