"use client";

import React, { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import api from '@/lib/api'

interface Category {
    id: number;
    name: string;
    image: string;
}

const CategoryCard = ({ category }: { category: Category }) => {
    // Force mixed case for the title to match Figma precisely
    const formattedName = category.name
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return (
        <div className="
            relative overflow-hidden group cursor-pointer bg-[#ECEEF0] transition-all duration-500
            /* Mobile: full-width stacked blocks */
            w-full h-[300px] border-b border-[#232321]/5 last:border-b-0 flex-shrink-0
            /* Desktop: horizontal carousel slide */
            md:flex-[0_0_50%] md:min-w-0 md:h-[600px] md:border-b-0 md:border-r md:last:border-r-0
        ">
            {/* Image Container - Pushed higher to give space to the title */}
            <div className="absolute inset-0 p-8 md:p-12 pb-20 md:pb-28 flex items-center justify-center pointer-events-none">
                <div className="relative w-full h-full transition-transform duration-700 group-hover:scale-110">
                    <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>

            {/* Bottom Content Area - Positioned precisely as per Figma */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex items-end justify-between z-10 w-full">
                <h3 className="text-2xl md:text-[32px] font-bold text-[#232321] leading-[1.1] font-rubik tracking-tight max-w-[150px] md:max-w-[200px]">
                    {formattedName}
                </h3>

                <Link
                    href={`/category/${category.id}`}
                    className="bg-[#232321] text-white w-9 h-9 md:w-11 md:h-11 rounded-lg flex items-center justify-center transition-all hover:bg-[#4a69e2] hover:scale-110 shadow-xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                </Link>
            </div>
        </div>
    )
}

const Categories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [mobileIndex, setMobileIndex] = useState(0);
    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    // Embla for Desktop
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        loop: false,
        dragFree: true,
        watchDrag: () => window.innerWidth >= 768
    })

    // Determine if we are on mobile reactively
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const updateNavStates = useCallback(() => {
        if (isMobile) {
            setCanScrollPrev(mobileIndex > 0);
            setCanScrollNext(mobileIndex < categories.length - 2);
        } else if (emblaApi) {
            setCanScrollPrev(emblaApi.canScrollPrev());
            setCanScrollNext(emblaApi.canScrollNext());
        }
    }, [isMobile, mobileIndex, categories.length, emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        emblaApi.on('select', updateNavStates)
        emblaApi.on('reInit', updateNavStates)
        updateNavStates()
    }, [emblaApi, updateNavStates])

    // Also update when mobileIndex or categories change
    useEffect(() => {
        updateNavStates()
    }, [mobileIndex, categories.length, isMobile, updateNavStates])

    const handlePrev = useCallback(() => {
        if (isMobile) {
            setMobileIndex(prev => Math.max(0, prev - 2));
        } else {
            emblaApi?.scrollPrev();
        }
    }, [emblaApi, isMobile]);

    const handleNext = useCallback(() => {
        if (isMobile) {
            const maxIdx = Math.max(0, categories.length - 2);
            setMobileIndex(prev => Math.min(prev + 2, maxIdx));
        } else {
            emblaApi?.scrollNext();
        }
    }, [emblaApi, isMobile, categories.length]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    return (
        <section className="bg-[#232321] pt-12 md:pt-24 pb-12 md:pb-24 mt-12 md:mt-20 overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10">
                <div className="flex items-center justify-between mb-8 md:mb-16 gap-6">
                    <h2 className="text-[36px] md:text-[74px] font-bold text-white leading-none tracking-tight font-rubik">
                        Categories
                    </h2>

                    <div className="flex gap-4">
                        <button
                            onClick={handlePrev}
                            disabled={!canScrollPrev}
                            className={`p-3 md:p-4 rounded-xl transition-all ${canScrollPrev
                                ? "bg-white text-[#232321] opacity-100"
                                : "bg-white/30 text-[#232321] opacity-50 cursor-not-allowed"
                                }`}
                        >
                            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={!canScrollNext}
                            className={`p-3 md:p-4 rounded-xl shadow-lg transition-all ${canScrollNext
                                ? "bg-white text-[#232321] opacity-100"
                                : "bg-white/30 text-[#232321] opacity-50 cursor-not-allowed"
                                }`}
                        >
                            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="px-6 md:px-0 md:pl-10 lg:pl-[calc((100vw-1400px)/2+40px)]">
                <div className="rounded-tl-[32px] md:rounded-tl-[64px] rounded-tr-none rounded-bl-none rounded-br-none overflow-hidden bg-[#ECEEF0] shadow-2xl">

                    {/* MOBILE: Vertical Sliding Window (2 items visible) */}
                    <div className="md:hidden overflow-hidden h-[600px]">
                        <div
                            className="flex flex-col transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateY(-${mobileIndex * 300}px)` }}
                        >
                            {loading ? (
                                <div className="w-full h-[600px] flex items-center justify-center">
                                    <div className="animate-pulse text-[#232321] font-bold">Loading...</div>
                                </div>
                            ) : (
                                categories.map((category) => (
                                    <CategoryCard key={category.id} category={category} />
                                ))
                            )}
                        </div>
                    </div>

                    {/* DESKTOP: Horizontal Embla Carousel */}
                    <div className="hidden md:block overflow-hidden h-[600px]" ref={emblaRef}>
                        <div className="flex">
                            {loading ? (
                                <div className="w-full h-[600px] flex items-center justify-center">
                                    <div className="animate-pulse text-[#232321] font-bold">Loading...</div>
                                </div>
                            ) : (
                                categories.map((category) => (
                                    <CategoryCard key={category.id} category={category} />
                                ))
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Categories
