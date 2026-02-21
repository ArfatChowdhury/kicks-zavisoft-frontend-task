"use client";

import React from 'react'
import Image from 'next/image'
import { Star } from 'lucide-react'

const ReviewCard = ({ title, description, userImage, productImage, rating }: {
    title: string,
    description: string,
    userImage: string,
    productImage: string,
    rating: number
}) => {
    return (
        <div className="flex-1 min-w-[300px] flex flex-col gap-0 rounded-[32px] overflow-hidden shadow-sm">
            {/* Top White Content Area */}
            <div className="bg-white p-8 rounded-t-[32px] relative flex flex-col gap-4">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                        <h3 className="text-2xl font-bold text-[#232321]">{title}</h3>
                        <p className="text-[#232321]/80 text-[16px] leading-relaxed max-w-[240px]">
                            {description}
                        </p>
                    </div>
                    {/* User Avatar */}
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-lg shrink-0">
                        <Image src={userImage} alt="User" fill className="object-cover" />
                    </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={20}
                                className={`${i < Math.floor(rating) ? 'fill-[#FFA52F] text-[#FFA52F]' : 'text-[#E7E7E3]'}`}
                            />
                        ))}
                    </div>
                    <span className="font-bold text-[#232321]">{rating.toFixed(1)}</span>
                </div>
            </div>

            {/* Bottom Product Image Area */}
            <div className="relative w-full h-[400px] rounded-b-[24px] overflow-hidden">
                <Image
                    src={productImage}
                    alt="Sneaker Review"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                />
            </div>
        </div>
    )
}

const Reviews = () => {
    const reviews = [
        {
            title: "Good Quality",
            description: "I highly recommend shopping from kicks",
            userImage: "/reviews/circle1.jpg",
            productImage: "/reviews/product1.png",
            rating: 5.0
        },
        {
            title: "Good Quality",
            description: "I highly recommend shopping from kicks",
            userImage: "/reviews/circle2.png",
            productImage: "/reviews/product2.png",
            rating: 5.0
        },
        {
            title: "Good Quality",
            description: "I highly recommend shopping from kicks",
            userImage: "/reviews/cicle3.png",
            productImage: "/reviews/product3.png",
            rating: 5.0
        }
    ];

    return (
        <section className="bg-transparent py-24 px-10 max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-16">
                <h2 className="text-[74px] font-bold uppercase text-[#232321] tracking-tight font-rubik">
                    Reviews
                </h2>
                <button className="bg-[#4a69e2] hover:bg-[#3b6ed3] text-white px-8 py-4 rounded-xl font-medium uppercase text-sm transition-all hover:scale-105 active:scale-95 shadow-lg">
                    See All
                </button>
            </div>

            {/* Grid */}
            <div className="flex gap-6 overflow-x-auto pb-8 no-scrollbar">
                {reviews.map((review, index) => (
                    <ReviewCard key={index} {...review} />
                ))}
            </div>
        </section>
    )
}

export default Reviews
