"use client";

import React, { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import api from '@/lib/api'
import ApiState from '../common/ApiState'

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
            /* Mobile: sizing is handled by the slide container */
            w-full h-[300px] border-b border-[#232321]/5 last:border-b-0 flex-shrink-0
            /* Desktop: horizontal carousel slide sizing */
            md:flex-[0_0_50%] md:min-w-0 md:h-[600px] md:border-b-0 md:border-r md:last:border-r-0
        ">
            {/* Image Container - Sneaker centered and contained */}
            <div className="absolute inset-0 p-8 md:p-16 flex items-center justify-center pointer-events-none">
                <div className="relative w-8/12 h-8/12 md:w-full md:h-full transition-transform duration-700 group-hover:scale-110">
                    <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>

            {/* Bottom Content Area */}
            <div className="absolute bottom-0 left-0 right-0 px-12 py-4 md:px-10 md:py-8 flex items-end justify-between z-10 w-full">
                <h3 className="text-2xl md:text-[32px] font-bold text-[#232321] leading-[1.1] font-rubik tracking-tight max-w-[150px] md:max-w-[200px]">
                    {formattedName}
                </h3>

                <Link
                    href={`/category/${category.id}`}
                    className="bg-[#232321] text-white w-9 h-9 md:w-12 md:h-12 rounded-lg flex items-center justify-center transition-all hover:bg-[#4a69e2] hover:scale-110 shadow-xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
                </Link>
            </div>
        </div>
    )
}

const Categories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(false)

    // Separate Embla instances for Mobile (Page of 2) and Desktop (Page of 1 per 50% slide)
    const [emblaRefMobile, emblaApiMobile] = useEmblaCarousel({ align: 'start', loop: false })
    const [emblaRefDesktop, emblaApiDesktop] = useEmblaCarousel({ align: 'start', loop: false, dragFree: true })

    const updateNavStates = useCallback(() => {
        const activeApi = window.innerWidth < 768 ? emblaApiMobile : emblaApiDesktop
        if (activeApi) {
            setCanScrollPrev(activeApi.canScrollPrev())
            setCanScrollNext(activeApi.canScrollNext())
        }
    }, [emblaApiMobile, emblaApiDesktop])

    useEffect(() => {
        const apis = [emblaApiMobile, emblaApiDesktop]
        apis.forEach(api => {
            if (!api) return
            api.on('select', updateNavStates)
            api.on('reInit', updateNavStates)
        })
        updateNavStates()
    }, [emblaApiMobile, emblaApiDesktop, updateNavStates])

    const handlePrev = useCallback(() => {
        const activeApi = window.innerWidth < 768 ? emblaApiMobile : emblaApiDesktop
        activeApi?.scrollPrev()
    }, [emblaApiMobile, emblaApiDesktop]);

    const handleNext = useCallback(() => {
        const activeApi = window.innerWidth < 768 ? emblaApiMobile : emblaApiDesktop
        activeApi?.scrollNext()
    }, [emblaApiMobile, emblaApiDesktop]);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await api.get('/categories');
            let data: Category[] = response.data;

            // 1. Fix spelling for "miscellaneos" -> "Miscellaneous"
            data = data.map(cat => ({
                ...cat,
                name: cat.name.toLowerCase().includes('miscellane') ? 'Miscellaneous' : cat.name
            }));

            // 2. Define priority names (provided by user)
            const priorityNames = ['electronics', 'shoes', 'furniture', 'miscellaneous'];

            // 3. Sort logic:
            data.sort((a, b) => {
                const aHasImage = !!a.image && a.image.length > 5;
                const bHasImage = !!b.image && b.image.length > 5;
                const aNameLower = a.name.toLowerCase();
                const bNameLower = b.name.toLowerCase();
                const aIsPriority = priorityNames.includes(aNameLower);
                const bIsPriority = priorityNames.includes(bNameLower);

                if (aHasImage && !bHasImage) return -1;
                if (!aHasImage && bHasImage) return 1;

                if (aHasImage && bHasImage) {
                    if (aIsPriority && !bIsPriority) return -1;
                    if (!aIsPriority && bIsPriority) return 1;
                    return aNameLower.localeCompare(bNameLower);
                }
                return aNameLower.localeCompare(bNameLower);
            });

            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setError('Failed to load categories.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const CategoriesSkeleton = (
        <div className="w-full h-full flex items-center justify-center">
            <div className="animate-pulse text-[#232321]/40 font-bold uppercase tracking-widest font-rubik text-xl">
                Preparing Collections...
            </div>
        </div>
    );

    // Helper to chunk categories into pairs for mobile slides
    const categoryPairs = Array.from({ length: Math.ceil(categories.length / 2) }, (_, i) =>
        categories.slice(i * 2, i * 2 + 2)
    );

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
                    <ApiState
                        loading={loading}
                        error={error}
                        isEmpty={categories.length === 0}
                        onRetry={fetchCategories}
                        skeleton={CategoriesSkeleton}
                        emptyMessage="Check back soon for new sneaker categories!"
                    >
                        {/* MOBILE: Horizontal Carousel of Vertical Pairs */}
                        <div className="md:hidden overflow-hidden h-[600px] embla" ref={emblaRefMobile}>
                            <div className="flex touch-pan-y">
                                {categoryPairs.map((pair, pIdx) => (
                                    <div key={pIdx} className="flex-[0_0_100%] min-w-0 flex flex-col h-[600px]">
                                        {pair.map((category) => (
                                            <CategoryCard key={category.id} category={category} />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* DESKTOP: Standard Horizontal Embla Carousel */}
                        <div className="hidden md:block overflow-hidden h-[600px] embla" ref={emblaRefDesktop}>
                            <div className="flex">
                                {categories.map((category) => (
                                    <CategoryCard key={category.id} category={category} />
                                ))}
                            </div>
                        </div>
                    </ApiState>
                </div>
            </div>
        </section>
    )
}

export default Categories
