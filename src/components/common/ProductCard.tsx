'use client';

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAppDispatch } from '@/store/hooks'
import { addItem } from '@/store/features/cartSlice'

interface ProductCardProps {
    id: string | number;
    image: string;
    title: string;
    price: number | string;
    isNew?: boolean;
}

const ProductCard = ({ id, image, title, price, isNew = true }: ProductCardProps) => {
    const dispatch = useAppDispatch();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(addItem({
            id: Number(id),
            title,
            price: Number(price),
            image,
            size: 38,
            color: 'navy',
            colorName: 'Shadow Navy'
        }));
    };

    return (
        <div className="flex flex-col gap-3 md:gap-4 w-full group hover-lift transition-all duration-300">
            {/* White Stroke / Border Container */}
            <div className="relative w-full aspect-[318/350] bg-white rounded-[24px] md:rounded-[30px] p-[4px] md:p-[6px] shadow-sm border border-white overflow-hidden shimmer-sweep">
                {/* Gray Inner Background with Image filling it */}
                <div className="relative w-full h-full bg-[#ECEEF0] rounded-[20px] md:rounded-[24px] overflow-hidden">
                    {/* Status Badge - Responsive sizing */}
                    {isNew && (
                        <div className="absolute top-0 left-0 bg-[#4A69E2] text-white flex items-center justify-center w-[48px] h-[32px] md:w-[58px] md:h-[38px] rounded-br-[20px] md:rounded-br-[24px] text-[10px] md:text-[12px] font-semibold z-10 font-rubik">
                            New
                        </div>
                    )}

                    {/* Product Image */}
                    <div className="relative w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-105">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Quick Add Overlay - Hide on mobile for better touch UX, or keep for long press? Let's hide on touch. */}
                    <div className="absolute inset-0 bg-black/5 opacity-0 md:group-hover:opacity-100 transition-opacity hidden md:flex items-center justify-center">
                        <button
                            onClick={handleAddToCart}
                            className="bg-white text-[#232321] px-6 py-3 rounded-xl font-bold uppercase text-xs shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#4A69E2] hover:text-white"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col gap-2 md:gap-4 px-1 md:px-0">
                <h3 className="text-[16px] md:text-2xl font-semibold leading-tight uppercase text-[#232321] line-clamp-2 min-h-[40px] md:min-h-[60px] font-rubik">
                    {title}
                </h3>

                <Link
                    href={`/product/${id}`}
                    className="w-full bg-[#232321] hover:bg-black transition-colors text-white py-3 md:py-4 rounded-lg md:rounded-xl font-medium uppercase text-[10px] md:text-sm flex items-center justify-center gap-1 font-rubik"
                >
                    <span className="hidden sm:inline">VIEW PRODUCT - </span>
                    <span className="text-[#FFA52F]">${price}</span>
                </Link>
            </div>
        </div>
    )
}

export default ProductCard
