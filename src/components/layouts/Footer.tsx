import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Instagram, Twitter, Music2 } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="w-full bg-[#E7E7E3] pt-12 md:pt-20 px-4 md:px-10 pb-8 md:pb-10 transition-all duration-300">
            {/* Main Blue Container */}
            <div className="max-w-[1400px] mx-auto bg-[#4A69E2] rounded-[32px] md:rounded-[48px] overflow-hidden flex flex-col shadow-2xl">

                {/* 1. Newsletter Section (Inside Blue) */}
                <div className="p-8 md:p-16 flex flex-col lg:flex-row justify-between lg:items-center gap-8 md:gap-10 relative">
                    <div className="flex flex-col gap-4 md:gap-6 z-10 w-full lg:w-auto">
                        <h2 className="text-3xl md:text-[64px] font-bold text-white leading-tight font-rubik uppercase">
                            Join our KicksPlus <br className="hidden sm:block" />
                            Club & get 15% off
                        </h2>
                        <p className="text-white/80 text-base md:text-xl font-medium">
                            Sign up for free! Join the community.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-2 md:mt-4">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="bg-transparent border border-white/50 rounded-xl px-5 md:px-6 py-3 md:py-4 text-white placeholder:text-white/60 focus:outline-none focus:border-white w-full sm:min-w-[300px]"
                            />
                            <button className="bg-[#232321] text-white px-8 md:px-10 py-3 md:py-4 rounded-xl font-bold uppercase hover:bg-black transition-all text-sm md:text-base">
                                Submit
                            </button>
                        </div>
                    </div>

                    {/* Branding Image in Blue Section */}
                    <div className="relative w-[140px] h-[60px] md:w-[250px] md:h-[110px] z-10 shrink-0 self-start lg:self-auto">
                        <Image
                            src="/footer/kicksFronts.png"
                            alt="Kicks Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* 2. Links Section (Dark) - Nested inside Blue with rounded top */}
                <div className="bg-[#232321] rounded-t-[32px] md:rounded-t-[48px] pt-10 md:pt-16 px-8 md:px-16 pb-0 flex flex-col gap-10 md:gap-20 relative overflow-hidden">
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 z-10">
                        {/* About Us */}
                        <div className="flex flex-col gap-4 md:gap-6 col-span-2 md:col-span-1">
                            <h4 className="text-[#FFA52F] text-xl md:text-2xl font-bold font-rubik">About us</h4>
                            <p className="text-white/70 text-sm md:text-lg leading-relaxed">
                                We are the biggest hyperstore in the universe.
                                We got you all cover with our exclusive
                                collections and latest drops.
                            </p>
                        </div>

                        {/* Categories */}
                        <div className="flex flex-col gap-4 md:gap-6">
                            <h4 className="text-[#FFA52F] text-xl md:text-2xl font-bold font-rubik">Categories</h4>
                            <ul className="flex flex-col gap-2 md:gap-3">
                                {['Runners', 'Sneakers', 'Basketball', 'Outdoor', 'Golf', 'Hiking'].map((item) => (
                                    <li key={item}>
                                        <Link href="#" className="text-white hover:text-[#FFA52F] transition-colors font-medium text-sm md:text-base">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company */}
                        <div className="flex flex-col gap-4 md:gap-6">
                            <h4 className="text-[#FFA52F] text-xl md:text-2xl font-bold font-rubik">Company</h4>
                            <ul className="flex flex-col gap-2 md:gap-3">
                                {['About', 'Contact', 'Blogs'].map((item) => (
                                    <li key={item}>
                                        <Link href="#" className="text-white hover:text-[#FFA52F] transition-colors font-medium text-sm md:text-base">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Follow Us */}
                        <div className="flex flex-col gap-4 md:gap-6">
                            <h4 className="text-[#FFA52F] text-xl md:text-2xl font-bold font-rubik">Follow us</h4>
                            <div className="flex gap-4">
                                <Link href="#" className="text-white hover:scale-110 transition-transform">
                                    <Facebook className="w-5 h-5 md:w-6 md:h-6" />
                                </Link>
                                <Link href="#" className="text-white hover:scale-110 transition-transform">
                                    <Instagram className="w-5 h-5 md:w-6 md:h-6" />
                                </Link>
                                <Link href="#" className="text-white hover:scale-110 transition-transform">
                                    <Twitter className="w-5 h-5 md:w-6 md:h-6" />
                                </Link>
                                <Link href="#" className="text-white hover:scale-110 transition-transform">
                                    <Music2 className="w-5 h-5 md:w-6 md:h-6" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Massive Branding at Bottom */}
                    <div className="relative w-full h-[60px] sm:h-[100px] md:h-[160px] lg:h-[224px] mt-4 flex items-end">
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
            <div className="text-center mt-6 md:mt-8 text-[#232321]/50 font-medium max-w-[1400px] mx-auto text-xs md:text-base">
                © All rights reserved
            </div>
        </footer>
    )
}

export default Footer