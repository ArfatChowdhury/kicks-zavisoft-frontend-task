'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Heart, Trash2, ChevronDown } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { updateQuantity, removeItem, updateSize } from '@/store/features/cartSlice';

const SIZES = [38, 39, 40, 41, 42, 43, 44, 45, 46, 47];
import YouMayAlsoLike, { Product } from '@/components/common/YouMayAlsoLike';
import api from '@/lib/api';

export default function CartPage() {
    const cartItems = useAppSelector(state => state.cart.items);
    const dispatch = useAppDispatch();

    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [loadingRelated, setLoadingRelated] = useState(true);
    const [favorites, setFavorites] = useState<Record<string, boolean>>({});

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

    const handleSizeChange = (cartId: string, newSize: number) => {
        dispatch(updateSize({ cartId, newSize }));
    };

    const handleRemove = (cartId: string) => {
        dispatch(removeItem(cartId));
    };

    const toggleFavorite = (cartId: string) => {
        setFavorites(prev => ({ ...prev, [cartId]: !prev[cartId] }));
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
                                <div key={item.cartId} className="flex gap-4 lg:gap-6 pb-8 lg:pb-8 border-b border-[#232321]/10 last:border-0 last:pb-0">
                                    {/* Item Image */}
                                    <div className="relative w-[150px] aspect-[4/5] lg:w-[160px] lg:h-[160px] lg:aspect-square bg-[#F0F0EE] border border-[#E7E7E3] rounded-[24px] lg:rounded-[32px] overflow-hidden shrink-0 flex items-center justify-center p-2">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={item.image} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
                                    </div>

                                    {/* Item Details */}
                                    <div className="flex flex-col flex-grow py-1">
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="flex flex-col gap-1 w-full">
                                                <h3 className="font-bold text-[#232321] uppercase text-[15px] lg:text-base font-rubik leading-tight mb-1">
                                                    {item.title}
                                                </h3>
                                                <p className="text-[13px] lg:text-sm text-[#232321]/70 font-medium">Men's Road Running Shoes</p>
                                                <p className="text-[13px] lg:text-sm text-[#232321]/70 font-medium">{item.colorName || "Color"}</p>

                                                {/* Selectors */}
                                                <div className="flex gap-4 mt-1 lg:mt-2">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="text-[13px] lg:text-sm font-medium text-[#232321]/70">Size</span>
                                                        <div className="relative flex items-center">
                                                            <select
                                                                className="peer text-[13px] lg:text-sm font-bold text-[#232321] bg-transparent outline-none cursor-pointer appearance-none pr-4 disabled:opacity-50 disabled:cursor-not-allowed"
                                                                value={item.size}
                                                                onChange={(e) => handleSizeChange(item.cartId, Number(e.target.value))}
                                                            >
                                                                {SIZES.map(s => (
                                                                    <option key={s} value={s}>{s}</option>
                                                                ))}
                                                            </select>
                                                            <ChevronDown className="absolute right-0 pointer-events-none text-[#232321] peer-disabled:opacity-50" size={16} strokeWidth={2} />
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="text-[13px] lg:text-sm font-medium text-[#232321]/70">Quantity</span>
                                                        <div className="relative flex items-center">
                                                            <select
                                                                className="peer text-[13px] lg:text-sm font-bold text-[#232321] bg-transparent outline-none cursor-pointer appearance-none pr-4 disabled:opacity-50 disabled:cursor-not-allowed"
                                                                value={item.quantity}
                                                                onChange={(e) => handleQuantityChange(item.cartId, Number(e.target.value))}
                                                            >
                                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                                                    <option key={n} value={n}>{n}</option>
                                                                ))}
                                                            </select>
                                                            <ChevronDown className="absolute right-0 pointer-events-none text-[#232321] peer-disabled:opacity-50" size={16} strokeWidth={2} />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Price */}
                                                <span className="font-bold text-[#4A69E2] text-base lg:text-lg whitespace-nowrap font-rubik mt-1 lg:mt-3">
                                                    ${item.price.toFixed(2)}
                                                </span>

                                                {/* Item Actions */}
                                                <div className="flex items-center gap-4 mt-2 lg:mt-3">
                                                    <button
                                                        onClick={() => toggleFavorite(item.cartId)}
                                                        className="text-[#232321] hover:text-[#4A69E2] transition-colors"
                                                    >
                                                        <Heart size={20} strokeWidth={1.5} fill={favorites[item.cartId] ? "currentColor" : "none"} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleRemove(item.cartId)}
                                                        className="text-[#232321] hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 size={20} strokeWidth={1.5} />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Optional Desktop Price Top-Right */}
                                            {/* If we want to mirror the exact same layout desktop to mobile, skip putting it here. But usually on desktop price is here. I'll omit it so it matches mobile mockup natively everywhere. */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="w-full lg:w-[35%]">
                        <div className="bg-white lg:bg-transparent rounded-[24px] lg:rounded-none p-6 lg:p-0 flex flex-col gap-5 lg:gap-6 sticky top-24">
                            <h2 className="text-2xl lg:text-[32px] font-bold text-[#232321] font-rubik mb-2">
                                Order Summary
                            </h2>

                            <div className="flex flex-col gap-4 font-medium text-[15px] lg:text-base text-[#232321]">
                                <div className="flex justify-between items-center">
                                    <span className="text-[#232321]/90 uppercase">{cartItems.length} ITEM</span>
                                    <span>${itemsTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[#232321]/90">Delivery</span>
                                    <span>${delivery.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[#232321]/90">Sales Tax</span>
                                    <span className="text-[#232321]/80">-</span>
                                </div>

                                <div className="flex justify-between items-center text-xl font-bold mt-1 font-rubik text-[#232321]">
                                    <span>Total</span>
                                    <span>${finalTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <button className="w-full bg-[#232321] hover:bg-black text-white h-[54px] lg:h-14 rounded-lg lg:rounded-xl font-bold text-sm lg:text-base uppercase tracking-wider font-rubik transition-all mt-4">
                                CHECKOUT
                            </button>

                            <button className="w-full text-left text-[#232321] font-medium text-sm mt-1 transition-opacity hover:opacity-70 underline underline-offset-4 decoration-[#232321]/30 hover:decoration-[#232321]">
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
