'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Heart, Trash2 } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { updateQuantity, removeItem } from '@/store/features/cartSlice';
import YouMayAlsoLike, { Product } from '@/components/common/YouMayAlsoLike';
import api from '@/lib/api';

export default function CartPage() {
    const cartItems = useAppSelector(state => state.cart.items);
    const dispatch = useAppDispatch();

    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [loadingRelated, setLoadingRelated] = useState(true);

    // Calculate totals
    const itemsTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const delivery = 6.99;
    const finalTotal = itemsTotal > 0 ? itemsTotal + delivery : 0;

    useEffect(() => {
        const fetchRelated = async () => {
            try {
                setLoadingRelated(true);
                // Fetching a category for 'You may also like'
                const res = await api.get('/products?categoryId=4&offset=0&limit=8');
                setRelatedProducts(res.data);
            } catch (error) {
                console.error("Failed to fetch related products for cart:", error);
            } finally {
                setLoadingRelated(false);
            }
        };
        fetchRelated();
    }, []);

    const handleQuantityChange = (cartId: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        dispatch(updateQuantity({ cartId, quantity: newQuantity }));
    };

    const handleRemove = (cartId: string) => {
        dispatch(removeItem(cartId));
    };

    return (
        <main className="bg-[#E7E7E3] pt-4 lg:pt-4 pb-0 shrink-0">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-col gap-8">

                {/* Header Banner */}
                <div className="flex flex-col gap-1">
                    <h1 className="text-[24px] lg:text-[32px] font-bold text-[#232321] font-rubik leading-tight">
                        Saving to celebrate
                    </h1>
                    <p className="text-sm font-medium text-[#232321]/80 max-w-2xl leading-relaxed">
                        Enjoy up to 60% off thousands of styles during the End of Year sale - while supplies last. No code needed. <br />
                        <span className="underline cursor-pointer hover:text-black">Join us</span> or <span className="underline cursor-pointer hover:text-black">Sign-in</span>
                    </p>
                </div>

                {/* 2-Column Cart Layout */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 bg-transparent lg:bg-transparent rounded-none lg:rounded-[32px]">

                    {/* Left: Your Bag */}
                    <div className="w-full lg:w-[65%] flex flex-col gap-6 bg-white rounded-[24px] md:rounded-[32px] p-6 lg:p-10 shadow-sm">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-2xl lg:text-[32px] font-bold text-[#232321] font-rubik">
                                Your Bag
                            </h2>
                            <p className="text-base text-[#232321]/70">
                                {cartItems.length > 0 ? 'Items in your bag not reserved- check out now to make them yours.' : 'Your bag is empty.'}
                            </p>
                        </div>

                        {/* Cart Items List */}
                        <div className="flex flex-col gap-8 mt-4">
                            {cartItems.map(item => (
                                <div key={item.cartId} className="flex gap-4 lg:gap-6 pb-8 border-b border-[#232321]/10 last:border-0 last:pb-0">
                                    {/* Item Image */}
                                    <div className="relative w-[120px] h-[120px] lg:w-[160px] lg:h-[160px] bg-[#F0F0EE] rounded-2xl overflow-hidden shrink-0 hidden sm:block">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="relative w-[100px] h-[100px] bg-[#F0F0EE] rounded-2xl overflow-hidden shrink-0 sm:hidden">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                    </div>

                                    {/* Item Details */}
                                    <div className="flex flex-col flex-grow justify-between py-1">
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="flex flex-col gap-1">
                                                <h3 className="font-bold text-[#232321] uppercase text-sm lg:text-base font-rubik pr-4">
                                                    {item.title}
                                                </h3>
                                                <p className="text-sm text-[#232321]/70 font-medium">Men's Road Running Shoes</p>
                                                <p className="text-sm text-[#232321]/70 font-medium">Enamel Blue/ University White</p>

                                                {/* Selectors */}
                                                <div className="flex gap-4 mt-3">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-semibold text-[#232321]">Size</span>
                                                        <select
                                                            className="text-sm font-medium bg-transparent outline-none cursor-pointer"
                                                            value={item.size}
                                                            disabled
                                                        >
                                                            <option>{item.size}</option>
                                                        </select>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-semibold text-[#232321]">Quantity</span>
                                                        <select
                                                            className="text-sm font-medium bg-transparent outline-none cursor-pointer"
                                                            value={item.quantity}
                                                            onChange={(e) => handleQuantityChange(item.cartId, Number(e.target.value))}
                                                        >
                                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                                                <option key={n} value={n}>{n}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="font-bold text-[#4A69E2] text-sm lg:text-base whitespace-nowrap font-rubik">
                                                ${item.price.toFixed(2)}
                                            </span>
                                        </div>

                                        {/* Item Actions */}
                                        <div className="flex items-center gap-4 mt-4 lg:mt-0">
                                            <button className="text-[#232321]/70 hover:text-[#232321] transition-colors">
                                                <Heart size={20} strokeWidth={2.5} />
                                            </button>
                                            <button
                                                onClick={() => handleRemove(item.cartId)}
                                                className="text-[#232321]/70 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={20} strokeWidth={2.5} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="w-full lg:w-[35%]">
                        <div className="bg-transparent flex flex-col gap-6 sticky top-24">
                            <h2 className="text-2xl lg:text-[32px] font-bold text-[#232321] font-rubik">
                                Order Summary
                            </h2>

                            <div className="flex flex-col gap-4 font-medium text-base text-[#232321]">
                                <div className="flex justify-between items-center">
                                    <span className="uppercase text-[#232321]/80">{cartItems.length} ITEM{cartItems.length !== 1 && 'S'}</span>
                                    <span>${itemsTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[#232321]/80">Delivery</span>
                                    <span>${delivery.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[#232321]/80">Sales Tax</span>
                                    <span className="text-[#232321]/50">-</span>
                                </div>

                                <div className="flex justify-between items-center text-xl font-bold mt-2 pt-4 font-rubik uppercase">
                                    <span>Total</span>
                                    <span>${finalTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <button className="w-full bg-[#232321] hover:bg-black text-white h-14 rounded-xl font-bold uppercase tracking-wide font-rubik transition-all mt-4">
                                Checkout
                            </button>

                            <button className="w-full text-left text-[#232321] font-bold underline text-sm mt-2 transition-opacity hover:opacity-70">
                                Use a promo code
                            </button>
                        </div>
                    </div>

                </div>

                {/* You May Also Like Section */}
                <div className="-mx-6 lg:mx-0 px-6 lg:px-0  w-[100vw] lg:w-full">
                    {!loadingRelated && relatedProducts.length > 0 && (
                        <YouMayAlsoLike products={relatedProducts} />
                    )}
                </div>

            </div>
        </main>
    );
}
