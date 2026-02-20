import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
    id: string | number;
    image: string;
    title: string;
    price: number | string;
    isNew?: boolean;
}

const ProductCard = ({ id, image, title, price, isNew = true }: ProductCardProps) => {
    return (
        <div className="flex flex-col gap-4">
            {/* Image Container */}
            <div className="relative aspect-square bg-[#FAFAFA] rounded-[32px] overflow-hidden p-8 border border-white">
                {/* Status Badge */}
                {isNew && (
                    <div className="absolute top-0 left-0 bg-[#4A69E2] text-white px-4 py-3 rounded-br-[16px] text-xs font-bold z-10">
                        New
                    </div>
                )}

                {/* Product Image */}
                <div className="relative w-full h-full transform transition-transform duration-500 hover:scale-110">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-contain"
                    />
                </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col gap-4 px-2">
                <h3 className="text-[24px] font-bold leading-[1.1] uppercase text-[#232321] h-[52px] line-clamp-2">
                    {title}
                </h3>

                <Link
                    href={`/product/${id}`}
                    className="w-full bg-[#232321] hover:bg-[#232321]/90 transition-colors text-white py-4 rounded-xl font-bold uppercase text-xs flex items-center justify-center gap-1"
                >
                    VIEW PRODUCT - <span className="text-[#FFA52F]">${price}</span>
                </Link>
            </div>
        </div>
    )
}

export default ProductCard
