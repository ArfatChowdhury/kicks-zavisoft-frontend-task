'use client';

import React from 'react'
import { Search, User, ChevronDown, Menu } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { toggleCart } from '@/store/features/cartSlice'

const Header = () => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart.items);

    // Calculate total quantity of items in cart
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <header className="px-4 py-6 md:py-8 transition-all duration-300">
            <div className="max-w-[1400px] mx-auto bg-white rounded-[16px] md:rounded-[24px] px-4 md:px-8 py-3 md:py-4 flex items-center justify-between shadow-sm border border-[#FAFAFA]">

                {/* Left Section (Equal Width for Center Alignment) */}
                <div className="flex-1 flex items-center justify-start">
                    {/* Mobile Menu Icon */}
                    <button className="md:hidden p-2 hover:bg-gray-50 rounded-lg transition-colors -ml-2">
                        <Menu size={24} className="text-[#232321]" />
                    </button>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden md:flex items-center gap-8 font-bold text-sm text-[#232321]">
                        <Link href="/new-drops" className="relative group py-1">
                            <span>New Drops 🔥</span>
                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#4A69E2] transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link href="/men" className="relative group py-1 flex items-center gap-1">
                            <span>Men</span>
                            <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#4A69E2] transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link href="/women" className="relative group py-1 flex items-center gap-1">
                            <span>Women</span>
                            <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#4A69E2] transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </nav>
                </div>

                {/* Center Section: Logo (Perfectly Centered) */}
                <div className="flex-shrink-0 flex justify-center">
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/m-logo.png"
                            alt="KICKS"
                            width={120}
                            height={40}
                            className="h-6 md:h-8 w-auto object-contain"
                            priority
                        />
                    </Link>
                </div>

                {/* Right Section (Equal Width for Center Alignment) */}
                <div className="flex-1 flex items-center justify-end gap-2 md:gap-4 text-[#171717]">
                    {/* Search only on Desktop */}
                    <button className="hidden md:block hover:text-[#4A69E2] transition-colors p-2">
                        <Search size={22} strokeWidth={2} />
                    </button>

                    {/* User Icon always visible */}
                    <button className="hover:text-[#4A69E2] transition-colors p-2">
                        <User size={20} className="md:w-[22px]" strokeWidth={2} />
                    </button>

                    {/* Cart Badge always visible */}
                    <Link
                        href="/cart"
                        key={itemCount} // Key change triggers animation
                        className={`relative hover:opacity-90 transition-all active:scale-90 cursor-pointer bg-[#F5A623] rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center font-bold text-xs md:text-sm text-[#232321] ${itemCount > 0 ? 'animate-pop' : ''}`}
                    >
                        {itemCount}
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header
