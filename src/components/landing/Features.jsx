"use client";

import { motion } from "framer-motion";
import { Eye, Shield, Download, Smartphone, Zap, Palette } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
    {
        icon: <Eye className="h-6 w-6 text-blue-500" />,
        title: "Real-time Preview",
        description: "See your changes instantly as you type. No more guessing how it will look."
    },
    {
        icon: <Shield className="h-6 w-6 text-green-500" />,
        title: "Privacy First",
        description: "Your data never leaves your browser. We don't store your resume on our servers."
    },
    {
        icon: <Download className="h-6 w-6 text-purple-500" />,
        title: "PDF Export",
        description: "Download high-quality, ATS-friendly PDFs ready for job applications."
    },
    {
        icon: <Palette className="h-6 w-6 text-pink-500" />,
        title: "Modern Templates",
        description: "Choose from 6 professionally designed templates that stand out."
    },
    {
        icon: <Zap className="h-6 w-6 text-yellow-500" />,
        title: "Smart Formatting",
        description: "Automatic layout adjustments ensure your resume always fits perfectly."
    },
    {
        icon: <Smartphone className="h-6 w-6 text-orange-500" />,
        title: "ATS Friendly",
        description: "Standard fonts and structure ensuring your resume gets past the bots."
    }
];

export default function Features() {
    return (
        <section id="features" className="py-24 bg-gray-50/50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">Everything you need to get hired</h2>
                    <p className="text-lg text-gray-600">
                        Powerful features to help you build a standout resume without the hassle.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="border-none shadow-sm hover:shadow-md transition-shadow h-full">
                                <CardContent className="p-8 space-y-4">
                                    <div className="p-3 bg-gray-50 w-fit rounded-xl">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                                    <p className="text-gray-500 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
