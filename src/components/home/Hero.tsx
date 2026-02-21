"use client";

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import api from '@/lib/api'
import ProductCard from '../common/ProductCard'

interface Product {
    id: number;
    title: string;
    price: number;
    images: string[];
}

const Hero = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products?categoryId=4&offset=0&limit=4');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <section className="max-w-[1400px] mx-auto px-4 md:px-6 py-6 md:py-8 flex flex-col gap-6 md:gap-12 transition-all duration-300">
            {/* Massive Heading */}
            <div className="flex flex-col">
                <h1 className="font-bold text-[56px] sm:text-[100px] md:text-[180px] lg:text-[220px] text-center leading-[0.85] tracking-tighter uppercase text-[#232321] font-rubik">
                    DO IT <span className="text-[#4A69E2]">RIGHT</span>
                </h1>
            </div>

            {/* Banner Container */}
            <div className="relative w-full max-w-[1320px] h-[450px] md:h-[750px] mx-auto bg-[#707070] rounded-[32px] md:rounded-[48px] overflow-hidden group">
                {/* Background Image */}
                <Image
                    src="/hero/small2.jpg"
                    alt="Nike Air Max"
                    fill
                    className="object-cover"
                    priority
                />

                {/* Overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

                {/* Vertical Label - Hide on small mobile */}
                <div className="absolute left-0 top-16 md:top-22 hidden sm:block">
                    <div className="bg-[#232321] text-white px-2 md:px-3 py-6 md:py-8 rounded-tl-[12px] rounded-bl-[12px] text-[10px] md:text-[12px] font-bold uppercase tracking-[0.2em] [writing-mode:vertical-lr] rotate-180 flex items-center justify-center">
                        Nike product of the year
                    </div>
                </div>

                {/* Content */}
                <div className="absolute left-6 md:left-24 bottom-10 md:bottom-24 flex flex-col gap-2 md:gap-4 text-white z-10 w-[80%] md:w-auto">
                    <h2 className="text-[32px] md:text-[74px] font-semibold uppercase leading-tight md:leading-none tracking-tight">
                        Nike Air Max
                    </h2>
                    <p className="text-[14px] md:text-[24px] font-medium opacity-90 max-w-2xl leading-snug">
                        Nike introducing the new air max for everyone's comfort
                    </p>
                    <button className="bg-[#437EF7] hover:bg-[#3b6ed3] transition-colors text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold uppercase w-fit text-xs md:text-sm mt-2 md:mt-4">
                        Shop Now
                    </button>
                </div>

                {/* Thumbnails - Reposition and resize for mobile */}
                <div className="absolute right-4 md:right-12 bottom-10 md:bottom-12 flex flex-col gap-3 md:gap-6">
                    <div className="relative w-[80px] h-[80px] md:w-[160px] md:h-[160px] rounded-[16px] md:rounded-[32px] overflow-hidden border-[2px] md:border-[3px] border-white shadow-xl">
                        <Image src="/hero/main.jpg" alt="Sneaker Detail 1" fill className="object-cover" />
                    </div>
                    <div className="relative w-[80px] h-[80px] md:w-[160px] md:h-[160px] rounded-[16px] md:rounded-[32px] overflow-hidden border-[2px] md:border-[3px] border-white shadow-xl">
                        <Image src="/hero/small1.jpg" alt="Sneaker Detail 2" fill className="object-cover" />
                    </div>
                </div>
            </div>

            {/* New Drops Section */}
            <div className="flex flex-col gap-6 md:gap-8 mt-4 md:mt-0">
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                    <h2 className="text-[36px] md:text-[74px] font-semibold uppercase leading-tight md:leading-none tracking-tight text-[#232321]">
                        Don’t miss out <br className="hidden md:block" /> new drops
                    </h2>
                    <button className="bg-[#437EF7] hover:bg-[#3b6ed3] transition-colors text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold uppercase w-full md:w-fit text-xs md:text-sm">
                        Shop New Drops
                    </button>
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="aspect-square bg-gray-200 animate-pulse rounded-[16px] md:rounded-[32px]" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                title={product.title}
                                price={product.price}
                                image={product.images[0]?.replace(/[\[\]"]/g, '') || ''}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default Hero