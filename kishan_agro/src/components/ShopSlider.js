"use client";
import React, { useState } from 'react';

export default function ShopSlider() {
    const [index, setIndex] = useState(0);

    const slides = [
        {
            type: 'map',
            src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7860.1616580166265!2d70.11605946397384!3d21.12435742976467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bfd41325b730035%3A0x922a6b046e0f2537!2sKISHAN%20AGRO%20CENTRE!5e1!3m2!1sen!2sin!4v1773227641629!5m2!1sen!2sin"
        },
        {
            type: 'image',
            src: "https://images.unsplash.com/photo-1542038584-c89e82c5aabe?q=80&w=800&auto=format&fit=crop"
        },
        {
            type: 'image',
            src: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=800&auto=format&fit=crop"
        },
        {
            type: 'image',
            src: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop"
        }
    ];

    const next = () => {
        setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const prev = () => {
        setIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    return (
        <div className="flex-1 w-full max-w-md shrink-0 relative">
            <div className="overflow-hidden rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800 relative group aspect-video md:aspect-square bg-zinc-100 dark:bg-zinc-800">
                <div
                    className="flex transition-transform duration-500 ease-out h-full w-full"
                    style={{ transform: `translateX(-${index * 100}%)` }}
                >
                    {slides.map((slide, i) => (
                        <div key={i} className="w-full shrink-0 h-full flex items-center justify-center">
                            {slide.type === 'map' ? (
                                <iframe
                                    className="w-full h-full object-cover sepia-[.3]"
                                    src={slide.src}
                                    allowFullScreen={true}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            ) : (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img
                                    src={slide.src}
                                    alt={`Shop view ${i}`}
                                    className="w-full h-full object-cover sepia-[.3]"
                                    loading="lazy"
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Controls */}
                <button
                    onClick={prev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none hover:bg-white dark:hover:bg-zinc-700 hover:scale-105 active:scale-95"
                    aria-label="Previous slide"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </button>

                <button
                    onClick={next}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none hover:bg-white dark:hover:bg-zinc-700 hover:scale-105 active:scale-95"
                    aria-label="Next slide"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </button>

                {/* Dots indicator */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={`w-2 h-2 rounded-full transition-all ${i === index ? 'bg-emerald-600 scale-125 w-4' : 'bg-zinc-300 dark:bg-zinc-600 hover:bg-zinc-400'}`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
