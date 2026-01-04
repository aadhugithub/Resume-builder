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
            className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/80 backdrop-blur-md"
        >
            <div className="container mx-auto px-4 md:px-6 flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-md bg-black" />
                    <span className="text-lg font-semibold tracking-tight">ResumeOne</span>
                </div>

                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
                    <Link href="#how-it-works" className="hover:text-black transition-colors">How It Works</Link>
                    <Link href="#faq" className="hover:text-black transition-colors">FAQ</Link>
                </nav>

                <div className="flex items-center gap-4">
                    <Link href="/builder">
                        <Button className="rounded-full px-6 shadow-sm hover:shadow-md transition-all">
                            Create Resume
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.header>
    );
}
