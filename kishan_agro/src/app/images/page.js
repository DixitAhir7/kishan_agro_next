import React from 'react';

const mediaItems = [
    {
        type: 'video',
        src: "/WhatsApp Video 2026-03-14 at 19.51.35_2.mp4"
    },
    {
        type: 'image',
        src: "/WhatsApp Image 2026-03-14 at 19.51.35.jpeg"
    },
    {
        type: 'image',
        src: "/WhatsApp Image 2026-03-14 at 19.51.39.jpeg"
    },
    {
        type: 'image',
        src: "/WhatsApp Image 2026-03-14 at 19.53.05.jpeg"
    },
    {
        type: 'image',
        src: "/WhatsApp Image 2026-03-14 at 19.54.50.jpeg"
    },
    {
        type: 'image',
        src: "/WhatsApp Image 2026-03-14 at 19.53.03.jpeg"
    }
];

export const metadata = {
    title: 'Gallery - Kishan Building Solutions',
    description: 'Explore our shop photos and media.',
};

export default function ImagesPage() {
    return (
        <section className="w-full py-12 bg-transparent transition-colors duration-300 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center md:text-left mb-10 md:mb-14">
                    <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-black">
                        Our Gallery
                    </h1>
                    <p className="mt-4 text-zinc-500 dark:text-zinc-400 font-medium tracking-wide max-w-2xl text-lg">
                        Take a look at Kishan Building Solutions inside and out.
                    </p>
                </div>

                {/* Collage Grid (Masonry Style) */}
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                    {mediaItems.map((item, index) => (
                        <div
                            key={index}
                            className="break-inside-avoid rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-zinc-200 dark:border-zinc-800 group relative bg-zinc-100 dark:bg-zinc-900"
                        >
                            {item.type === 'video' ? (
                                <video
                                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 sepia-[.15]"
                                    src={item.src}
                                    controls
                                    muted
                                    loop
                                    playsInline
                                />
                            ) : (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img
                                    src={item.src}
                                    alt={`Gallery photo ${index + 1}`}
                                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 sepia-[.15]"
                                    loading="lazy"
                                />
                            )}

                            {/* Stylish Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end">
                                <span className="text-white font-bold tracking-wider text-sm p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 uppercase">
                                    {item.type === 'video' ? 'Shop Walkthrough' : 'Store View'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
