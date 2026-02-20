import React from 'react'
import Image from 'next/image'

const Hero = () => {
    return (
        <section className="max-w-[1400px] mx-auto px-6 py-12 flex flex-col gap-8">
            {/* Massive Heading */}
            <div className="flex flex-col">
                <h1 className='font-bold text-[220px] text-center'>DO IT <span className='text-[#4a69e2]'>RIGHT</span></h1>
            </div>

            {/* Banner Container */}
            <div className="relative w-full max-w-[1320px] h-[750px] mx-auto bg-[#707070] rounded-[48px] overflow-hidden group">
                {/* Background Image */}
                <Image
                    src="/hero/main.jpg"
                    alt="Nike Air Max"
                    fill
                    className="object-cover"
                    priority
                />

                {/* Overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

                {/* Vertical Label */}
                <div className="absolute left-10 top-10">
                    <div className="bg-[#232321] text-white px-3 py-8 rounded-[12px] text-[12px] font-bold uppercase tracking-[0.2em] [writing-mode:vertical-lr] rotate-180 flex items-center justify-center">
                        Nike product of the year
                    </div>
                </div>

                {/* Content */}
                <div className="absolute left-24 bottom-24 flex flex-col gap-4 text-white z-10">
                    <h2 className="text-[74px] font-semibold uppercase leading-none tracking-tight">
                        Nike Air Max
                    </h2>
                    <p className="text-[24px] font-medium opacity-90 max-w-2xl">
                        Nike introducing the new air max for everyone's comfort
                    </p>
                    <button className="bg-[#437EF7] hover:bg-[#3b6ed3] transition-colors text-white px-8 py-4 rounded-xl font-bold uppercase w-fit text-sm mt-4">
                        Shop Now
                    </button>
                </div>

                {/* Thumbnails */}
                <div className="absolute right-12 bottom-12 flex flex-col gap-6">
                    <div className="relative w-[160px] h-[160px] rounded-[32px] overflow-hidden border-[3px] border-white shadow-xl">
                        <Image src="/hero/small1.jpg" alt="Sneaker Detail 1" fill className="object-cover" />
                    </div>
                    <div className="relative w-[160px] h-[160px] rounded-[32px] overflow-hidden border-[3px] border-white shadow-xl">
                        <Image src="/hero/small2.jpg" alt="Sneaker Detail 2" fill className="object-cover" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero