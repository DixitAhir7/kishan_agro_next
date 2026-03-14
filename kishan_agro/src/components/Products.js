import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import ShopSlider from './ShopSlider';

export default async function Products({ initialQuery = '' }) {
    let products = [];


    try {
        const url = new URL('https://kishan-agro-next.vercel.app/api/products');
        if (initialQuery) {
            url.searchParams.append('keyword', initialQuery);
        }

        // Fetch fresh data dynamically from your express backend using axios!
        const res = await axios.get(url.toString());

        if (res.status === 200) {
            products = res.data;
        } else {
            console.error('Failed to fetch from the backend');
        }
    } catch (error) {
        console.error('Error fetching products:', error.message);
    }

    return (
        <section className="w-full py-6 bg-transparent transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 border-b w-fit border-zinc-200 dark:border-zinc-800">
                    <div>
                        <h1 className="text-2xl font-extrabold tracking-tight sm:text-4xl">
                            {initialQuery ? `Search Results for "${initialQuery}"` : "All Products"}
                        </h1>
                        <p className="mt-2 text-zinc-500 dark:text-zinc-400 font-medium tracking-wide">
                            {products.length} {products.length === 1 ? 'Product' : 'Products'} Available
                        </p>
                    </div>
                </div>

                {/* Grid Section */}
                {products.length === 0 ? (
                    <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 py-12 px-6 md:px-6 shadow-sm rounded-2xl border border-zinc-200 dark:border-zinc-800">
                        <div className="flex-1 text-center md:text-left">
                            <div className="inline-flex items-center justify-center size-12 bg-zinc-100 dark:bg-zinc-800 rounded-full mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-zinc-400 dark:text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-3xl font-extrabold mb-4">Product N/A</h3>
                            <p className="text-lg text-zinc-500 dark:text-zinc-400 mb-8 max-w-md mx-auto md:mx-0">
                                We couldn't find any materials matching {initialQuery}. Try searching for general terms like Cement,Steel, or Bricks.
                            </p>
                            <Link href="/" className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-emerald-700 shadow-sm focus:outline-none focus:ring-4 focus:ring-emerald-500/30">
                                View Available Products
                            </Link>
                        </div>
                        <ShopSlider />
                    </div>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 xl:gap-4">
                        {products.map((product) => (
                            <div
                                key={product._id}
                                className="group flex flex-col overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 dark:hover:border-emerald-500/50 transition-all duration-300 shadow-sm hover:shadow-2xl"
                            >
                                {/* Image Container */}
                                <div className="flex-1 w-full max-w-md shrink-0 relative">
                                    {/* label */}
                                    {
                                        !product.isAvailable &&
                                        <span className="absolute top-4 right-0 bg-gray-400 text-white text-sm px-3 py-0.5 rounded-l-lg">
                                            Out of Stock
                                        </span>
                                    }

                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="https://images.unsplash.com/photo-1542038584-c89e82c5aabe?q=80&w=800&auto=format&fit=crop"
                                        alt="Empty inventory box"
                                        className="w-full h-auto aspect-video md:aspect-square object-cover rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 sepia-[.3]"
                                    />
                                </div>

                                {/* Content Details */}
                                <div className="flex flex-1 flex-col p-3 sm:p-4">
                                    <div className="w-fit mb-2 sm:mb-3 rounded-md sm:rounded-lg bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[11px] font-black tracking-widest dark:text-purple-400 border dark:border-emerald-900/80 uppercase truncate">
                                        {product.category}
                                    </div>
                                    <h3 className="text-sm sm:text-base lg:text-lg font-bold text-zinc-900 dark:text-zinc-50 transition-colors line-clamp-2 wrap-break-word">
                                        {product.name}
                                    </h3>
                                    <p className="mt-1.5 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 flex-1 leading-relaxed">
                                        {product.description}
                                    </p>

                                    <div className="mt-4 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-3 sm:pt-4">
                                        {/* <button className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-zinc-100 dark:bg-zinc-800 group-hover:bg-emerald-600 group-hover:text-white text-emerald-600 dark:text-emerald-400 rounded-full transition-colors shadow-sm focus:outline-none focus:ring-4 focus:ring-emerald-500/30">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M5 12h14" /><path d="M12 5v14" />
                                            </svg>
                                        </button> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}