'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import api from '@/lib/api';
import ProductCard from '@/components/common/ProductCard';
import { useAppDispatch } from '@/store/hooks';
import { addItem } from '@/store/features/cartSlice';

// ── Pixel-perfect Magnifier ──────────────────────────────────────
const LENS_SIZE = 180;
const ZOOM = 2.5;

function MagnifierImage({ src, alt }: { src: string; alt: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

    const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <div
            ref={ref}
            className="relative w-full h-full overflow-hidden cursor-crosshair"
            onMouseMove={onMove}
            onMouseLeave={() => setPos(null)}
        >
            {/* Base image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt} className="w-full h-full object-contain select-none" draggable={false} />

            {/*
             * Zoom layer: an identical copy of the image, scaled from the cursor point.
             * clip-path cuts it to a circle around the cursor — pixel-perfect because
             * both copies use the same object-contain rendering; no background-math needed.
             */}
            {pos && (
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        clipPath: `circle(${LENS_SIZE / 2}px at ${pos.x}px ${pos.y}px)`,
                    }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={src}
                        alt=""
                        aria-hidden
                        draggable={false}
                        className="w-full h-full object-contain select-none"
                        style={{
                            transform: `scale(${ZOOM})`,
                            transformOrigin: `${pos.x}px ${pos.y}px`,
                        }}
                    />
                    {/* Lens ring */}
                    <div
                        className="absolute rounded-full border-[3px] border-white/80 shadow-2xl pointer-events-none ring-1 ring-black/10"
                        style={{
                            width: LENS_SIZE,
                            height: LENS_SIZE,
                            left: pos.x - LENS_SIZE / 2,
                            top: pos.y - LENS_SIZE / 2,
                        }}
                    />
                </div>
            )}
        </div>
    );
}
// ─────────────────────────────────────────────────────────────────

interface Product {
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

const SIZES = [38, 39, 40, 41, 42, 43, 44, 45, 46, 47];
const COLORS = [
    { id: 'navy', hex: '#32374B', name: 'Shadow Navy' },
    { id: 'green', hex: '#637365', name: 'Army Green' },
];

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params);
    const dispatch = useAppDispatch();
    const [product, setProduct] = useState<Product | null>(null);
    const [related, setRelated] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState<number>(38);
    const [selectedColor, setSelectedColor] = useState('navy');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const [productRes, relatedRes] = await Promise.all([
                    api.get(`/products/${id}`),
                    api.get('/products?offset=0&limit=8')
                ]);
                setProduct(productRes.data);
                const others = (relatedRes.data as Product[]).filter(
                    (p: Product) => p.id !== Number(id)
                ).slice(0, 4);
                setRelated(others);
            } catch (error) {
                console.error('Failed to fetch product:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;
        dispatch(addItem({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.images[0],
        }));
    };

    // Clean image URLs (Platzi API sometimes wraps them in JSON arrays as strings)
    const cleanImage = (img: string) => {
        try {
            const parsed = JSON.parse(img);
            if (Array.isArray(parsed)) return parsed[0];
            return parsed;
        } catch {
            return img;
        }
    };

    if (loading) {
        return (
            <main className="bg-[#E7E7E3] min-h-screen pt-20 flex items-center justify-center">
                <div className="animate-pulse text-[#232321] font-bold text-2xl font-rubik">Loading...</div>
            </main>
        );
    }

    if (!product) {
        return (
            <main className="bg-[#E7E7E3] min-h-screen pt-20 flex items-center justify-center">
                <div className="text-[#232321] font-bold text-2xl font-rubik">Product not found.</div>
            </main>
        );
    }

    // Build gallery: fill to 4 images
    const rawImages = product.images.map(cleanImage);
    const gallery: string[] = [];
    for (let i = 0; i < 4; i++) {
        gallery.push(rawImages[i % rawImages.length]);
    }

    return (
        <main className="bg-[#E7E7E3] min-h-screen pt-20 pb-20">
            <div className="max-w-[1400px] mx-auto px-10">

                {/* ===== Main Product Section ===== */}
                <div className="flex gap-10">

                    {/* Left: 4-Image Gallery with pixel-perfect magnifier */}
                    <div className="w-[65%] grid grid-cols-2 gap-3 rounded-[32px] overflow-hidden">
                        {gallery.map((img, idx) => (
                            <div key={idx} className="relative aspect-square bg-[#F0F0EE]">
                                <MagnifierImage src={img} alt={`${product.title} view ${idx + 1}`} />
                            </div>
                        ))}
                    </div>

                    {/* Right: Product Info */}
                    <div className="w-[35%] flex flex-col gap-8">

                        {/* Badge + Title + Price */}
                        <div>
                            <div className="bg-[#4A69E2] text-white px-3 py-1 rounded-lg text-[10px] font-bold inline-block mb-4 uppercase tracking-wider font-rubik">
                                New Release
                            </div>
                            <h1 className="text-[30px] font-bold text-[#232321] leading-tight mb-4 font-rubik uppercase">
                                {product.title}
                            </h1>
                            <p className="text-2xl font-bold text-[#4A69E2] font-rubik">
                                ${product.price.toFixed(2)}
                            </p>
                        </div>

                        {/* Color Selector */}
                        <div className="flex flex-col gap-3">
                            <span className="text-sm font-bold text-[#232321] font-rubik uppercase tracking-wide">Color</span>
                            <div className="flex gap-3">
                                {COLORS.map(color => (
                                    <button
                                        key={color.id}
                                        onClick={() => setSelectedColor(color.id)}
                                        title={color.name}
                                        className={`w-8 h-8 rounded-full border-[3px] transition-all duration-200 ${selectedColor === color.id
                                            ? 'border-[#232321] scale-110'
                                            : 'border-transparent'
                                            }`}
                                        style={{ backgroundColor: color.hex }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Size Selector */}
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-bold text-[#232321] font-rubik uppercase tracking-wide">Size</span>
                                <button className="text-[11px] font-bold text-[#232321] underline uppercase font-rubik">
                                    Size Chart
                                </button>
                            </div>
                            <div className="grid grid-cols-5 gap-2">
                                {SIZES.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`h-12 rounded-xl text-sm font-bold font-rubik transition-all duration-200 ${selectedSize === size
                                            ? 'bg-[#232321] text-white'
                                            : 'bg-white text-[#232321] hover:bg-[#232321]/10'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-3 mt-2">
                            <div className="flex gap-3">
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-grow bg-[#232321] hover:bg-black text-white h-14 rounded-xl font-bold uppercase tracking-wide font-rubik transition-all"
                                >
                                    Add to Cart
                                </button>
                                <button className="w-14 h-14 bg-[#232321] hover:bg-black text-white flex items-center justify-center rounded-xl transition-all">
                                    <Heart size={22} />
                                </button>
                            </div>
                            <button className="w-full bg-[#4A69E2] hover:bg-[#3b59c2] text-white h-14 rounded-xl font-bold uppercase tracking-wide font-rubik transition-all">
                                Buy It Now
                            </button>
                        </div>

                        {/* About the Product */}
                        <div className="flex flex-col gap-4 pt-4 border-t border-[#232321]/10">
                            <h4 className="text-sm font-bold text-[#232321] font-rubik uppercase tracking-wide">
                                About the product
                            </h4>
                            <div className="text-sm text-[#232321]/70 leading-relaxed">
                                <p className="mb-3 font-medium text-[#232321]/90">
                                    {COLORS.find(c => c.id === selectedColor)?.name}
                                </p>
                                <p className="mb-4">{product.description}</p>
                                <ul className="flex flex-col gap-3 list-disc pl-5">
                                    <li>Pay over time in interest-free installments with Affirm, Klarna or Afterpay.</li>
                                    <li>Join adiClub to get unlimited free standard shipping, returns, &amp; exchanges.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ===== You May Also Like ===== */}
                {related.length > 0 && (
                    <div className="mt-32">
                        <div className="flex justify-between items-end mb-12">
                            <h2 className="text-[48px] font-bold text-[#232321] font-rubik uppercase tracking-tight">
                                You may also like
                            </h2>
                            <div className="flex gap-3">
                                <button className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow hover:bg-[#232321] hover:text-white transition-all">
                                    <ChevronLeft size={22} />
                                </button>
                                <button className="w-12 h-12 bg-[#232321] text-white rounded-xl flex items-center justify-center shadow hover:bg-black transition-all">
                                    <ChevronRight size={22} />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-6">
                            {related.map(prod => (
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
                )}
            </div>
        </main>
    );
}
