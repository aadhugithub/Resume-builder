"use client";

import React from "react";
import { ListTodo, PenTool, Download, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function HowItWorks() {
    const steps = [
        {
            icon: <ListTodo className="h-8 w-8 text-blue-600" />,
            title: "Fill Details",
            description: "Input your professional story, skills, and education. Your data stays entirely local.",
            color: "bg-blue-50"
        },
        {
            icon: <PenTool className="h-8 w-8 text-purple-600" />,
            title: "Custom Design",
            description: "Select a premium template and customize every detail to match your personal brand.",
            color: "bg-purple-50"
        },
        {
            icon: <Download className="h-8 w-8 text-emerald-600" />,
            title: "Ready to Apply",
            description: "Export your pixel-perfect, ATS-optimized PDF and land that dream interview.",
            color: "bg-emerald-50"
        }
    ];

    return (
        <section id="how-it-works" className="py-32 bg-gray-50/30">
            <div className="container mx-auto px-6 md:px-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
                        <Sparkles className="h-3 w-3" />
                        Seamless Process
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">Three Steps to Success</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
                        Building a high-impact resume has never been this effortless.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-10">
                    {steps.map((step, index) => (
                        <motion.div 
                            key={index} 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] border border-gray-100/50 hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.08)] transition-all duration-500 group text-center"
                        >
                            <div className={`w-20 h-20 ${step.color} rounded-3xl flex items-center justify-center mx-auto mb-8 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                                {step.icon}
                            </div>
                            <h3 className="text-2xl font-black mb-4">{step.title}</h3>
                            <p className="text-gray-600 leading-relaxed font-medium">{step.description}</p>
                            
                            {/* Step number indicator */}
                            <div className="mt-8 text-5xl font-black text-gray-100 select-none">
                                0{index + 1}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
