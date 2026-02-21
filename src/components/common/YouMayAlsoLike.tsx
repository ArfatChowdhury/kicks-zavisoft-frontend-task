"use client";

import React, { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/common/ProductCard';

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    category: {
        id: number;
        name: string;
        image: string;
    };
}

export default function YouMayAlsoLike({
    products,
}: {
    products: Product[];
}) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' });
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setCanPrev(emblaApi.canScrollPrev());
        setCanNext(emblaApi.canScrollNext());
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);

        const resizeHandler = () => {
            emblaApi.reInit();
            setScrollSnaps(emblaApi.scrollSnapList());
        };
        window.addEventListener('resize', resizeHandler);

        onSelect();

        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, [emblaApi, onSelect]);

    useEffect(() => {
        if (emblaApi) {
            emblaApi.reInit();
            setScrollSnaps(emblaApi.scrollSnapList());
        }
    }, [emblaApi, products]);

    const cleanImage = (url: string) => {
        return url?.replace(/[\[\]"]/g, '') || '';
    };

    return (
        <div className="mt-6 flex flex-col gap-8">
            {/* Hero-style header */}
            <div className="flex flex-row items-center md:items-end justify-between gap-4">
                <h2 className="text-[20px] md:text-[74px] font-bold md:font-semibold md:uppercase leading-tight md:leading-none tracking-tight text-[#232321] font-rubik">
                    You may <br className="hidden md:block" />also like
                </h2>
                <div className="flex items-center gap-2 md:gap-4">
                    {/* Categories-style prev/next */}
                    <button
                        onClick={() => emblaApi?.scrollPrev()}
                        disabled={!canPrev}
                        className={`w-7 h-7 md:w-12 md:h-12 rounded-md md:rounded-xl flex items-center justify-center border-2 transition-all font-rubik ${canPrev
                            ? 'bg-[#232321] md:bg-transparent border-[#232321] text-white md:text-[#232321] md:hover:bg-[#232321] hover:text-white'
                            : 'bg-[#232321]/50 md:bg-transparent border-transparent md:border-[#232321]/20 text-white/50 md:text-[#232321]/30 cursor-not-allowed'
                            }`}
                    >
                        <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
                    </button>
                    <button
                        onClick={() => emblaApi?.scrollNext()}
                        disabled={!canNext}
                        className={`w-7 h-7 md:w-12 md:h-12 rounded-md md:rounded-xl flex items-center justify-center border-2 transition-all font-rubik ${canNext
                            ? 'bg-[#232321] border-[#232321] text-white hover:bg-black'
                            : 'bg-[#232321]/50 md:bg-[#232321]/20 border-transparent text-white/50 cursor-not-allowed'
                            }`}
                    >
                        <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
                    </button>
                </div>
            </div>

            {/* Embla carousel */}
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-4">
                    {products.reduce((acc: Product[][], curr: Product, i: number) => {
                        if (i % 4 === 0) acc.push([curr]);
                        else acc[acc.length - 1].push(curr);
                        return acc;
                    }, []).map((group, groupIdx) => (
                        <div key={`slide-${groupIdx}`} className="flex-[0_0_100%] min-w-0">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                {group.map(prod => (
                                    <ProductCard
                                        key={prod.id}
                                        id={prod.id}
                                        title={prod.title}
                                        price={prod.price}
                                        image={cleanImage(prod.images[0])}
                                        isNew={true}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-1.5 md:gap-2 mt-2 md:mt-4">
                {scrollSnaps.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => emblaApi?.scrollTo(index)}
                        className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${index === selectedIndex
                            ? 'w-10 bg-[#4A69E2]'
                            : 'w-6 bg-[#232321]/20 hover:bg-[#232321]/40'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
