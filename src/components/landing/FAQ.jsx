"use client";

import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

export default function FAQ() {
    const faqs = [
        {
            question: "Is ResumeOne really free?",
            answer: "Yes, ResumeOne is completely free to use. There are no hidden fees, subscriptions, or premium paywalls. Our mission is to help job seekers without adding a financial burden."
        },
        {
            question: "Is my data private?",
            answer: "Absolutely. ResumeOne operates entirely in your browser. Your personal data is stored locally on your device and is never sent to our servers or shared with third parties. You have total control."
        },
        {
            question: "Can I import my existing resume?",
            answer: "Currently, we support building resumes from scratch using our optimized builder. However, you can save your progress as a JSON file and import it back later to make quick edits or updates."
        },
        {
            question: "What PDF formats are supported?",
            answer: "We export standard A4 PDF documents that are ATS-friendly. We use high-quality rendering to ensure your resume looks pixel-perfect in all major job application systems."
        }
    ];

    return (
        <section id="faq" className="py-32 bg-white">
            <div className="container mx-auto px-6 md:px-8 max-w-4xl">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">Common Questions</h2>
                    <p className="text-xl text-gray-600 font-light">Everything you need to know about ResumeOne.</p>
                </motion.div>

                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <AccordionItem value={`item-${index}`} className="border border-gray-100 rounded-2xl px-6 bg-gray-50/30 hover:bg-gray-50/50 transition-colors">
                                <AccordionTrigger className="text-left text-lg font-bold py-6 hover:no-underline">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600 text-base leading-relaxed pb-6">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        </motion.div>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
