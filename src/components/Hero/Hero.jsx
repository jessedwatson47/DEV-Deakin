import React from 'react'
// Deakin Logos
import DeakinLogo from '../../assets/deakin-logo.png'
import DeakinBadge from '../../assets/deakin-logo-badge.png'
import Students from '../../assets/students-2.jpg'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="bg-gray-100 flex mx-auto max-w-screen-xl min-h-[70vh]">
        <div className="flex flex-col gap-4 justify-center items-center bg-cover w-full overflow-hidden relative" style={{ backgroundImage: `url(${Students})`}}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/40 to-transparent" />
            <h1 className="z-2 text-6xl text-white font-semibold">Connect with like-minded peers</h1>
            <p className="z-2 text-xl text-white">Find your dev crew. Collaborate, learn and grow together.</p>
            <Link to="signup" className="z-2 rounded bg-teal-500 px-3 py-2 mt-10 w-50 text-xl font-semibold text-white hover:bg-teal-400 text-center cursor-pointer">Join DEV@Deakin</Link>
        </div>
    </section>
  )
}

export default Hero