import React from 'react'
import { Search, User, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
    return (
        <header className=" px-4 py-8">
            <div className="max-w-[1400px] mx-auto bg-white rounded-[24px] px-8 py-4 flex items-center justify-between shadow-sm">
                {/* Navigation Links */}
                <nav className="hidden md:flex items-center gap-8 font-bold text-sm text-[#232321]">
                    <Link href="/new-drops" className="hover:opacity-60 transition-opacity flex items-center gap-1">
                        New Drops 🔥
                    </Link>
                    <Link href="/men" className="hover:opacity-60 transition-opacity flex items-center gap-1">
                        Men <ChevronDown size={16} />
                    </Link>
                    <Link href="/women" className="hover:opacity-60 transition-opacity flex items-center gap-1">
                        Women <ChevronDown size={16} />
                    </Link>
                </nav>

                {/* Logo */}
                <div className="flex-1 flex justify-center">
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/image.png"
                            alt="KICKS"
                            width={120}
                            height={40}
                            className="h-8 w-auto object-contain"
                            priority
                        />
                    </Link>
                </div>

                {/* Icons */}
                <div className="flex items-center gap-6 text-[#171717]">
                    <button className="hover:text-gray-600 transition-colors cursor-pointer">
                        <Search size={22} strokeWidth={2} />
                    </button>
                    <button className="hover:text-gray-600 transition-colors cursor-pointer">
                        <User size={22} strokeWidth={2} />
                    </button>
                    <button className="relative hover:opacity-90 transition-opacity cursor-pointer bg-[#F5A623] rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm">
                        0
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header
