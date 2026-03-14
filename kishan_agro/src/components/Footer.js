import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="w-full bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 py-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
                <div className="flex flex-col items-center sm:items-start text-zinc-900 dark:text-zinc-50">
                    <a
                        href="tel:+919876543210"
                        className="text-2xl font-extrabold hover:text-emerald-500 transition-colors"
                    >
                        contact
                    </a>
                </div>

                {/* <div className="flex flex-col sm:flex-row items-center gap-6">
                    <Link
                        href="/awards"
                        className="text-base font-semibold text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2 group"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20" height="20"
                            viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className="text-emerald-500 group-hover:scale-110 transition-transform"
                        >
                            <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                        </svg>
                        Awards & Certificates
                    </Link>

                    <p className="text-sm text-zinc-500 dark:text-zinc-500">
                        &copy; {new Date().getFullYear()} Kishan Agro
                    </p>
                </div> */}
            </div>
        </footer>
    );
}