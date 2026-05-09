import React from "react";

export const RichText = ({ text, className }) => {
    if (!text) return null;

    // Split by bold (**text**), italic (*text*), and links ([text](url))
    // Basic regex parser
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|\[.*?\]\(.*?\))/g);

    return (
        <span className={className}>
            {parts.map((part, index) => {
                if (part.startsWith("**") && part.endsWith("**")) {
                    return <strong key={index} className="font-bold">{part.slice(2, -2)}</strong>;
                }
                if (part.startsWith("*") && part.endsWith("*") && !part.startsWith("**")) {
                    return <em key={index} className="italic">{part.slice(1, -1)}</em>;
                }
                if (part.startsWith("[") && part.includes("](") && part.endsWith(")")) {
                    const [display, url] = part.slice(1, -1).split("](");
                    return (
                        <a
                            key={index}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-700 underline hover:text-purple-900"
                        >
                            {display}
                        </a>
                    );
                }
                return part;
            })}
        </span>
    );
};
