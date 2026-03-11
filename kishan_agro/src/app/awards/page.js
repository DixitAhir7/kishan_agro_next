import React from 'react';
import Link from 'next/link';

export const metadata = {
    title: "Awards & Certificates",
    description: "Explore Kishan Agro's industry awards, certifications, and quality assurances for our premium building materials.",
    alternates: {
        canonical: "/awards",
    },
    openGraph: {
        title: "Awards & Certificates - Kishan Agro",
        description: "Our commitment to quality construction materials is backed by industry certifications and awards.",
        url: "https://kishanagro.com/awards",
    },
};

const awards = [
    {
        id: 1,
        title: "ISO 9001:2015 Certified",
        description: "Recognized for maintaining international quality management standards across our product distribution.",
        year: "2023",
    },
    {
        id: 2,
        title: "Best Supplier Award - UltraTech",
        description: "Awarded by UltraTech Cement for outstanding supply chain efficiency and consistent retail excellence.",
        year: "2022",
    },
    {
        id: 3,
        title: "Green Building Material Partner",
        description: "Certified for providing sustainable and eco-friendly construction materials that meet green building codes.",
        year: "2021",
    },
    {
        id: 4,
        title: "Excellence in Customer Service",
        description: "National industry award recognizing our dedication to customer satisfaction and support.",
        year: "2023",
    }
];

export default function Awards() {
    return (
        <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black transition-colors duration-300">
            <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-20 lg:px-8">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-sm font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase mb-3 block">
                        Our Achievements
                    </span>
                    <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl mb-6">
                        Awards & Certificates
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400">
                        Our unwavering commitment to delivering top-tier building materials has been tested, proven, and recognized across the industry.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {awards.map((award) => (
                        <div
                            key={award.id}
                            className="group p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg>
                            </div>

                            <div className="flex items-center gap-4 mb-4">
                                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 font-bold">
                                    {award.year}
                                </span>
                                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                                    {award.title}
                                </h3>
                            </div>
                            <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed">
                                {award.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm font-semibold text-zinc-500 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m15 18-6-6 6-6" /></svg>
                        Back to Home
                    </Link>
                </div>

            </main>
        </div>
    );
}
