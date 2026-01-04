import React from "react";
import { ListTodo, PenTool, Download } from "lucide-react";

export default function HowItWorks() {
    const steps = [
        {
            icon: <ListTodo className="h-6 w-6 text-purple-600" />,
            title: "1. Enter Details",
            description: "Fill in your professional summary, experience, education, and skills. Your data stays on your device."
        },
        {
            icon: <PenTool className="h-6 w-6 text-purple-600" />,
            title: "2. Customize",
            description: "Choose from our Classic or Modern templates. Adjust fonts, spacing, and layout to match your style."
        },
        {
            icon: <Download className="h-6 w-6 text-purple-600" />,
            title: "3. Export PDF",
            description: "Instantly download your pixel-perfect resume as a PDF, ready for job applications."
        }
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Build your professional resume in three simple steps. No signup required.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
