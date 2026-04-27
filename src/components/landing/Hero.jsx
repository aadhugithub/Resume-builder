"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Star } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative overflow-hidden pt-20 pb-32 lg:pt-36 lg:pb-48">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50/50 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-50/50 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 md:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    <div className="flex-1 text-center lg:text-left space-y-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 text-sm font-medium text-black/60"
                        >
                            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            Trusted by 10,000+ job seekers
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-black leading-[1.1]"
                        >
                            Elevate your <br className="hidden lg:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-400">
                                career path.
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light"
                        >
                            Create a professional, ATS-optimized resume in minutes. 
                            No subscriptions, no hidden fees, just your next big opportunity.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6"
                        >
                            <Link href="/builder">
                                <Button size="lg" className="h-16 px-10 rounded-2xl text-xl font-semibold gap-3 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] transition-all bg-black hover:bg-gray-800 scale-100 hover:scale-105">
                                    Build My Resume <ArrowRight className="h-6 w-6" />
                                </Button>
                            </Link>
                            <div className="flex flex-col items-start gap-1">
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star key={s} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-sm text-gray-600 font-medium">
                                    Rated 4.9/5 by industry experts
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="pt-8 flex flex-wrap justify-center lg:justify-start gap-x-12 gap-y-6 opacity-40 grayscale"
                        >
                            {/* Placeholder for "Featured in" logos */}
                            <span className="text-lg font-bold tracking-widest uppercase">Forbes</span>
                            <span className="text-lg font-bold tracking-widest uppercase">TechCrunch</span>
                            <span className="text-lg font-bold tracking-widest uppercase">Wired</span>
                            <span className="text-lg font-bold tracking-widest uppercase">Verge</span>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{ duration: 1, delay: 0.2, type: "spring" }}
                        className="flex-1 relative w-full perspective-1000"
                    >
                        <div className="relative z-10 bg-white p-2 rounded-[2rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] border border-gray-100 transform rotate-1 hover:rotate-0 transition-transform duration-700 overflow-hidden">
                            <div className="rounded-[1.5rem] overflow-hidden">
                                <Image 
                                    src="/Resume-builder/premium_resume_preview_1777140828005.png" 
                                    alt="Resume Preview" 
                                    width={800} 
                                    height={1000} 
                                    className="w-full h-auto"
                                    priority
                                />
                            </div>
                            
                            {/* Floating decorative card */}
                            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 hidden md:block animate-bounce-slow">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold">ATS Optimized</p>
                                        <p className="text-xs text-gray-600">100% Score</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Background glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-tr from-blue-200 via-indigo-100 to-purple-200 rounded-full blur-[100px] -z-10 opacity-30" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
