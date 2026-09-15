"use client"

import Link from "next/link"
import React, { useState } from "react"
import '../../app/globals.css'

export default function Navbar() {
	const [open, setOpen] = useState(false)

	return (
		<header className="py-4 px-6 absolute z-100 w-full">
			<div className="max-w-7xl mx-auto flex items-center justify-between">
				<Link href="/" className="text-xl font-bold">RealEstate</Link>

				<nav className="hidden md:flex gap-6 items-center">
					<Link href="/">Home</Link>
					<Link href="/about">About</Link>
					<Link href="/contact">Contact</Link>
					<Link href="/properties">Properties</Link>
				</nav>

				<button
					className="md:hidden text-2xl"
					onClick={() => setOpen((v) => !v)}
					aria-label="Toggle menu"
				>
					☰
				</button>
			</div>

			{open && (
				<div className="md:hidden px-6 pb-4">
					<Link href="/" className="block py-2">Home</Link>
					<Link href="/about" className="block py-2">About</Link>
					<Link href="/contact" className="block py-2">Contact</Link>
					<Link href="/properties" className="block py-2">Properties</Link>
				</div>
			)}
		</header>
	)
}
