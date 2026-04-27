"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Header() {
    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="sticky top-0 z-50 w-full border-b border-black/[0.03] bg-white/70 backdrop-blur-xl"
        >
            <div className="container mx-auto px-6 md:px-8 flex h-20 items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="h-8 w-8 rounded-xl bg-black flex items-center justify-center text-white font-bold transition-transform group-hover:scale-110">
                        R
                    </div>
                    <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-600">
                        ResumeOne
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
                    <Link href="#features" className="hover:text-black transition-colors">Features</Link>
                    <Link href="#how-it-works" className="hover:text-black transition-colors">How It Works</Link>
                    <Link href="#faq" className="hover:text-black transition-colors">FAQ</Link>
                </nav>

                <div className="flex items-center gap-6">
                    <Link href="/builder">
                        <Button className="rounded-full px-8 h-11 font-medium shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] transition-all bg-black hover:bg-gray-800 border-none">
                            Get Started
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.header>
    );
}
