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
        <div className="flex flex-col gap-4 w-[318px]">
            {/* White Stroke / Border Container (318x350 per Figma) */}
            <div className="relative w-[318px] h-[350px] bg-white rounded-[30px] p-[6px] shadow-sm border border-white">
                {/* Gray Inner Background with Image filling it */}
                <div className="relative w-full h-full bg-[#ECEEF0] rounded-[24px] overflow-hidden">
                    {/* Status Badge - Now inside the image area */}
                    {isNew && (
                        <div className="absolute top-0 left-0 bg-[#4A69E2] text-white flex items-center justify-center w-[58px] h-[38px] rounded-br-[24px] text-[12px] font-semibold z-10 font-rubik">
                            New
                        </div>
                    )}

                    {/* Product Image - Filling the container (object-cover) */}
                    <div className="relative w-full h-full transform transition-transform duration-500 hover:scale-110">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-semibold leading-tight uppercase text-[#232321] line-clamp-2 min-h-[60px] font-rubik">
                    {title}
                </h3>

                <Link
                    href={`/product/${id}`}
                    className="w-full bg-[#232321] hover:bg-black transition-colors text-white py-4 rounded-xl font-medium uppercase text-sm flex items-center justify-center gap-1 font-rubik"
                >
                    VIEW PRODUCT - <span className="text-[#FFA52F]">${price}</span>
                </Link>
            </div>
        </div>
    )
}

export default ProductCard
