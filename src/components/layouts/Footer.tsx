import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Instagram, Twitter, Music2 } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="w-full bg-[#E7E7E3] pt-20 px-4 md:px-10 pb-10">
            {/* Main Blue Container */}
            <div className="max-w-[1400px] mx-auto bg-[#4A69E2] rounded-[48px] overflow-hidden flex flex-col">

                {/* 1. Newsletter Section (Inside Blue) */}
                <div className="p-10 md:p-16 flex flex-col md:flex-row justify-between items-center gap-10 relative">
                    <div className="flex flex-col gap-6 z-10">
                        <h2 className="text-4xl md:text-[64px] font-bold text-white leading-tight font-rubik uppercase">
                            Join our KicksPlus <br />
                            Club & get 15% off
                        </h2>
                        <p className="text-white/80 text-lg md:text-xl font-medium">
                            Sign up for free! Join the community.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mt-4">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="bg-transparent border border-white/50 rounded-xl px-6 py-4 text-white placeholder:text-white/60 focus:outline-none focus:border-white min-w-[300px]"
                            />
                            <button className="bg-[#232321] text-white px-10 py-4 rounded-xl font-bold uppercase hover:bg-black transition-all">
                                Submit
                            </button>
                        </div>
                    </div>

                    {/* Branding Image in Blue Section */}
                    <div className="relative w-[180px] h-[80px] md:w-[250px] md:h-[110px] z-10 shrink-0">
                        <Image
                            src="/footer/kicksFronts.png"
                            alt="Kicks Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* 2. Links Section (Dark) - Nested inside Blue with rounded top */}
                <div className="bg-[#232321] rounded-t-[48px] pt-10 md:pt-16 px-10 md:px-16 pb-0 flex flex-col gap-10 md:gap-20 relative overflow-hidden">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 z-10">
                        {/* About Us */}
                        <div className="flex flex-col gap-6">
                            <h4 className="text-[#FFA52F] text-2xl font-bold font-rubik">About us</h4>
                            <p className="text-white/70 text-lg leading-relaxed">
                                We are the biggest hyperstore in the universe.
                                We got you all cover with our exclusive
                                collections and latest drops.
                            </p>
                        </div>

                        {/* Categories */}
                        <div className="flex flex-col gap-6">
                            <h4 className="text-[#FFA52F] text-2xl font-bold font-rubik">Categories</h4>
                            <ul className="flex flex-col gap-3">
                                {['Runners', 'Sneakers', 'Basketball', 'Outdoor', 'Golf', 'Hiking'].map((item) => (
                                    <li key={item}>
                                        <Link href="#" className="text-white hover:text-[#FFA52F] transition-colors font-medium">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company */}
                        <div className="flex flex-col gap-6">
                            <h4 className="text-[#FFA52F] text-2xl font-bold font-rubik">Company</h4>
                            <ul className="flex flex-col gap-3">
                                {['About', 'Contact', 'Blogs'].map((item) => (
                                    <li key={item}>
                                        <Link href="#" className="text-white hover:text-[#FFA52F] transition-colors font-medium">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Follow Us */}
                        <div className="flex flex-col gap-6">
                            <h4 className="text-[#FFA52F] text-2xl font-bold font-rubik">Follow us</h4>
                            <div className="flex gap-4">
                                <Link href="#" className="text-white hover:scale-110 transition-transform">
                                    <Facebook size={24} />
                                </Link>
                                <Link href="#" className="text-white hover:scale-110 transition-transform">
                                    <Instagram size={24} />
                                </Link>
                                <Link href="#" className="text-white hover:scale-110 transition-transform">
                                    <Twitter size={24} />
                                </Link>
                                <Link href="#" className="text-white hover:scale-110 transition-transform">
                                    <Music2 size={24} />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Massive Branding at Bottom */}
                    <div className="relative w-full h-[80px] sm:h-[120px] md:h-[160px] lg:h-[224px] mt-4 flex items-end">
                        <Image
                            src="/footer/kicks2bottom.png"
                            alt="KICKS Branding"
                            fill
                            className="object-contain object-bottom"
                        />
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-center mt-8 text-[#232321]/50 font-medium max-w-[1400px] mx-auto">
                © All rights reserved
            </div>
        </footer>
    )
}

export default Footer