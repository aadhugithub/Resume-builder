import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
    const faqs = [
        {
            question: "Is ResumeOne really free?",
            answer: "Yes, ResumeOne is completely free to use. There are no hidden fees, subscriptions, or premium paywalls."
        },
        {
            question: "Is my data private?",
            answer: "Absolutely. ResumeOne operates entirely in your browser. Your personal data is stored locally on your device and is never sent to our servers or shared with third parties."
        },
        {
            question: "Can I import my existing resume?",
            answer: "Currently, we support building resumes from scratch. However, you can save your progress as a JSON file and import it back later to make edits."
        },
        {
            question: "What PDF formats are supported?",
            answer: "We export standard A4 PDF documents that are ATS-friendly and compatible with all major job application systems."
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                </div>

                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-gray-600">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
