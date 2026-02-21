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
    return (
        <div className="relative flex-[0_0_50%] min-w-0 h-[600px] overflow-hidden group cursor-pointer bg-[#ECEEF0] border-r border-[#232321]/10 last:border-r-0">
            {/* Image Background */}
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
                {/* Subtle Overlay to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Content Overlay */}
            <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between z-10">
                <h3 className="text-3xl font-bold uppercase text-white drop-shadow-md leading-tight max-w-[200px] font-rubik">
                    {category.name}
                </h3>

                <Link
                    href={`/category/${category.id}`}
                    className="bg-[#232321] text-white p-3 rounded-lg flex items-center justify-center transition-all hover:bg-[#4a69e2] hover:scale-110 shadow-xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <ArrowUpRight size={24} />
                </Link>
            </div>
        </div>
    )
}

const Categories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(false)

    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        loop: false,
        dragFree: true
    })

    const onSelect = useCallback((api: any) => {
        setCanScrollPrev(api.canScrollPrev())
        setCanScrollNext(api.canScrollNext())
    }, [])

    useEffect(() => {
        if (!emblaApi) return
        onSelect(emblaApi)
        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', onSelect)
    }, [emblaApi, onSelect])

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

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
        <section className="bg-[#232321] pt-24 pb-12 mt-20 overflow-hidden">
            {/* Header Section - Kept centered */}
            <div className="max-w-[1400px] mx-auto px-10">
                <div className="flex items-center justify-between mb-16 px-4">
                    <h2 className="text-[74px] font-semibold uppercase text-white leading-none tracking-tight font-rubik">
                        Categories
                    </h2>

                    <div className="flex gap-4">
                        <button
                            onClick={scrollPrev}
                            disabled={!canScrollPrev}
                            className={`p-4 rounded-xl transition-all cursor-pointer z-10 ${canScrollPrev
                                ? "bg-[#FAFAFA] text-[#232321] opacity-100"
                                : "bg-[#FAFAFA] text-[#232321] opacity-50"
                                }`}
                            aria-label="Previous categories"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={scrollNext}
                            disabled={!canScrollNext}
                            className={`p-4 rounded-xl shadow-lg transition-all cursor-pointer z-10 ${canScrollNext
                                ? "bg-[#FAFAFA] text-[#232321] opacity-100"
                                : "bg-[#FAFAFA] text-[#232321] opacity-50"
                                }`}
                            aria-label="Next categories"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Cards Wrapper (Embla Container) - Bleeds to the right */}
            <div className="pl-[40px] lg:pl-[calc((100vw-1400px)/2+40px)]">
                <div className="rounded-tl-[64px] overflow-hidden bg-[#ECEEF0] shadow-2xl">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex">
                            {loading ? (
                                <div className="w-full h-[600px] flex items-center justify-center bg-[#ECEEF0]">
                                    <div className="animate-pulse flex flex-col items-center gap-4">
                                        <div className="text-[#232321] font-bold text-xl uppercase tracking-[0.2em]">Loading...</div>
                                    </div>
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
