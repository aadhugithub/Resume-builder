"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                    <div className="flex-1 text-center lg:text-left space-y-8">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900"
                        >
                            Build a premium resume <br className="hidden lg:block" />
                            <span className="text-gray-500">in minutes.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                        >
                            The professional resume builder that values your privacy.
                            Clean, ATS-friendly templates, entirely free, and runs in your browser.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                        >
                            <Link href="/builder">
                                <Button size="lg" className="h-14 px-8 rounded-full text-lg gap-2 shadow-lg shadow-black/5 hover:shadow-xl transition-all">
                                    Create Resume Now <ArrowRight className="h-5 w-5" />
                                </Button>
                            </Link>
                            <p className="text-sm text-gray-500 flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500" /> No signup required
                            </p>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
                        className="flex-1 relative w-full max-w-xl lg:max-w-none"
                    >
                        {/* Abstract UI representation */}
                        <div className="relative z-10 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden aspect-[3/4] md:aspect-[4/3] transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                            <div className="h-8 bg-gray-50 border-b border-gray-100 flex items-center gap-2 px-4">
                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                <div className="w-3 h-3 rounded-full bg-green-400" />
                            </div>
                            <div className="p-6 md:p-8 space-y-6">
                                {/* Mock content */}
                                <div className="flex gap-6">
                                    <div className="w-1/3 space-y-4">
                                        <div className="h-32 bg-gray-100 rounded-lg animate-pulse" />
                                        <div className="h-8 bg-gray-100 rounded-md w-3/4" />
                                        <div className="h-4 bg-gray-50 rounded-md w-full" />
                                        <div className="h-4 bg-gray-50 rounded-md w-5/6" />
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div className="h-10 bg-gray-100 rounded-lg w-1/2" />
                                        <div className="space-y-2">
                                            <div className="h-4 bg-gray-50 rounded w-full" />
                                            <div className="h-4 bg-gray-50 rounded w-full" />
                                            <div className="h-4 bg-gray-50 rounded w-5/6" />
                                        </div>
                                        <div className="space-y-2 pt-4">
                                            <div className="h-4 bg-gray-50 rounded w-full" />
                                            <div className="h-4 bg-gray-50 rounded w-full" />
                                            <div className="h-4 bg-gray-50 rounded w-5/6" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Background blobs */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-100 via-purple-100 to-pink-100 rounded-full blur-3xl -z-10 opacity-60" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
