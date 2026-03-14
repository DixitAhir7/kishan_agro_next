import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 shadow-sm transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between py-3 md:h-20 gap-3 md:gap-0">

                    <div className="flex justify-between items-center w-full md:w-auto">
                        {/* Logo */}
                        <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
                            <span className="text-2xl font-black tracking-tight text-yellow-200">
                                Kishan building solutions
                            </span>
                        </Link>

                        <div className="flex md:hidden items-center gap-4">
                            <Link href="/" className="text-sm font-bold text-zinc-600 dark:text-zinc-300 hover:text-emerald-600 transition-colors">Home</Link>
                            <Link href="tel:+919427286098" className="text-sm font-bold text-zinc-600 dark:text-zinc-300 hover:text-emerald-600 transition-colors">Contact</Link>
                        </div>
                    </div>

                    <div className="flex-1 w-full md:max-w-xl mx-0 md:mx-8">
                        <form action="/" method="GET" className="w-full relative group">
                            <input
                                type="text"
                                name="q"
                                placeholder="Search products by name"
                                className="w-full pl-11 pr-4 py-3 rounded-full border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50 focus:bg-white dark:focus:bg-zinc-950 focus:outline-none focus:ring-2 transition-all shadow-sm text-sm sm:text-base font-medium placeholder-zinc-400 dark:placeholder-zinc-500 dark:text-white"
                            />
                            <div className="absolute left-4 top-3.5 text-zinc-400 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <button type="submit" className="hidden" aria-label="Search">Search</button>
                        </form>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-[15px] font-bold text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors hover:-translate-y-0.5 transform">
                            Home
                        </Link>
                        <Link href="tel:+919427286098" className="text-[15px] font-bold text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors hover:-translate-y-0.5 transform">
                            Contact
                        </Link>
                    </div>

                </div>
            </div>
        </nav>
    );
}