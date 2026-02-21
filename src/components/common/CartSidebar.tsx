'use client';

import React from 'react';
import Image from 'next/image';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleCart, removeItem, updateQuantity } from '@/store/features/cartSlice';

const CartSidebar = () => {
    const dispatch = useAppDispatch();
    const { items, isOpen } = useAppSelector((state) => state.cart);

    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={() => dispatch(toggleCart())}
            />

            {/* Sidebar */}
            <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-[#E7E7E3] shadow-2xl transform transition-transform duration-500 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {/* Header */}
                <div className="p-6 flex items-center justify-between border-b border-[#232321]/10 bg-white">
                    <div className="flex items-center gap-3">
                        <ShoppingBag className="text-[#4A69E2]" />
                        <h2 className="text-2xl font-bold uppercase font-rubik">My Cart</h2>
                        <span className="bg-[#4A69E2] text-white text-xs px-2 py-1 rounded-full">{items.length}</span>
                    </div>
                    <button
                        onClick={() => dispatch(toggleCart())}
                        className="p-2 hover:bg-[#ECEEF0] rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                    {items.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-[#232321]/40">
                            <ShoppingBag size={64} strokeWidth={1} />
                            <p className="font-semibold uppercase tracking-widest">Your cart is empty</p>
                            <button
                                onClick={() => dispatch(toggleCart())}
                                className="mt-4 bg-[#4A69E2] text-white px-8 py-3 rounded-xl font-bold uppercase transition-transform hover:scale-105"
                            >
                                Shop Now
                            </button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex gap-4 p-4 bg-white rounded-3xl shadow-sm group">
                                <div className="relative w-24 h-24 bg-[#ECEEF0] rounded-2xl overflow-hidden shrink-0">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform group-hover:scale-110"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <div>
                                        <h3 className="font-bold text-[#232321] leading-tight line-clamp-1 uppercase font-rubik">{item.title}</h3>
                                        <p className="text-[#4A69E2] font-bold mt-1">${item.price}</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3 bg-[#ECEEF0] px-3 py-1 rounded-full">
                                            <button
                                                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))}
                                                className="hover:text-[#4A69E2] transition-colors"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                                                className="hover:text-[#4A69E2] transition-colors"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => dispatch(removeItem(item.id))}
                                            className="text-xs font-bold uppercase text-red-500 hover:text-red-700 underline underline-offset-4"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer / Summary */}
                {items.length > 0 && (
                    <div className="p-8 bg-white rounded-t-[48px] shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
                        <div className="flex flex-col gap-4 mb-8">
                            <div className="flex justify-between items-center text-[#232321]/60 font-medium">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-[#232321]/60 font-medium">
                                <span>Shipping</span>
                                <span className="text-green-600 font-bold uppercase text-xs">Free</span>
                            </div>
                            <div className="h-px bg-[#232321]/10 my-2" />
                            <div className="flex justify-between items-center text-2xl font-black uppercase font-rubik">
                                <span>Total</span>
                                <span className="text-[#4A69E2]">${subtotal.toFixed(2)}</span>
                            </div>
                        </div>
                        <button className="w-full bg-[#232321] text-white py-6 rounded-2xl font-black uppercase tracking-widest hover:bg-black transition-all transform hover:-translate-y-1 shadow-xl">
                            Checkout Now
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartSidebar;
