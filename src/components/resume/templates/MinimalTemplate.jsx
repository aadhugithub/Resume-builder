"use client";

import React from "react";

import { RichText } from "@/components/ui/RichText";

const ensureUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `https://${url}`;
};

export default function MinimalTemplate({ resume }) {
    const { profile, experience, education, skills, summary, projects, certifications } = resume;

    const { meta } = resume;

    // Font Map
    const fontMap = {
        inter: "font-sans",
        serif: "font-serif",
        mono: "font-mono",
    };

    // Spacing Map
    const spacingMap = {
        compact: "space-y-2",
        normal: "space-y-4",
        airy: "space-y-6",
    };

    // Margin Bottom Map
    const mbMap = {
        compact: "mb-3",
        normal: "mb-5",
        airy: "mb-8",
    };

    // Section Render Map
    const renderSection = (section) => {
        switch (section) {
            case "summary":
                return summary && (
                    <section key="summary" className={mbMap[meta.spacing] || "mb-5"}>
                        <h2 className={`${bodyTextSize} font-bold uppercase tracking-widest border-b border-gray-400 mb-3 pb-1`}>Professional Summary</h2>
                        <div className={`${bodyTextSize} text-justify leading-relaxed`}>
                            <RichText text={summary} />
                        </div>
                    </section>
                );
            case "certifications":
                return certifications && certifications.length > 0 && (
                    <section key="certifications" className="mb-5">
                        <h2 className={`${bodyTextSize} font-bold uppercase tracking-widest border-b border-gray-400 mb-3 pb-1`}>Certification</h2>
                        <div className="space-y-1">
                            {certifications.map((item) => (
                                <div key={item.id} className={`flex justify-between ${bodyTextSize}`}>
                                    <span>{item.name} – {item.issuer}</span>
                                    <span className="uppercase text-gray-600">{item.date}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                );
            case "projects":
                return projects && projects.length > 0 && (
                    <section key="projects" className="mb-5">
                        <h2 className={`${bodyTextSize} font-bold uppercase tracking-widest border-b border-gray-400 mb-3 pb-1`}>Projects</h2>
                        <div className="space-y-4">
                            {projects.map((item, index) => (
                                <div key={item.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <div className="flex items-baseline gap-2">
                                            <span className={`font-bold ${bodyTextSize}`}>{index + 1}. {item.name}</span>
                                            {item.link && (
                                                <span className="text-xs">
                                                    Link: <a href={ensureUrl(item.link)} className="text-purple-700 font-bold hover:underline">Click Here</a>
                                                </span>
                                            )}
                                        </div>
                                        <span className={`${bodyTextSize} uppercase text-gray-600 whitespace-nowrap`}>{item.date}</span>
                                    </div>
                                    {item.tools && <p className="text-xs text-gray-600 mb-1">Tools: {item.tools}</p>}
                                    {item.description && (
                                        <div className="text-sm text-gray-900 pl-4">
                                            <ul className="list-disc space-y-1">
                                                {item.description.split('\n').filter(line => line.trim()).map((line, i) => (
                                                    <li key={i}><RichText text={line} /></li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                );
            case "education":
                return education.length > 0 && (
                    <section key="education" className="mb-5">
                        <h2 className={`${bodyTextSize} font-bold uppercase tracking-widest border-b border-gray-400 mb-3 pb-1`}>Education</h2>
                        <div className="space-y-3">
                            {education.map((item) => (
                                <div key={item.id}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className={`font-bold ${bodyTextSize}`}>{item.school} <span className="font-normal text-gray-700">({item.location})</span></h3>
                                        <span className={`${bodyTextSize} uppercase text-gray-600 whitespace-nowrap`}>
                                            {item.startDate} – {item.current ? "Present" : item.endDate}
                                        </span>
                                    </div>
                                    <div className={`${bodyTextSize} text-gray-800`}>
                                        {item.degree}
                                    </div>

                                    {item.extraLinkUrl && (
                                        <div className="text-xs mt-1 mb-1">
                                            <a href={ensureUrl(item.extraLinkUrl)} className="text-purple-700 font-bold hover:underline" target="_blank" rel="noreferrer">
                                                {item.extraLinkHeading || "Link"}
                                            </a>
                                        </div>
                                    )}

                                    {item.description && <p className="text-xs text-gray-600 mt-1"><RichText text={item.description} /></p>}
                                </div>
                            ))}
                        </div>
                    </section>
                );
            case "skills":
                return skills.length > 0 && (
                    <section key="skills" className="mb-5">
                        <h2 className={`${bodyTextSize} font-bold uppercase tracking-widest border-b border-gray-400 mb-3 pb-1`}>Skills</h2>
                        <div className={`space-y-1 ${bodyTextSize}`}>
                            {skills.map((item) => (
                                <div key={item.id} className="flex">
                                    <span className="font-bold w-32 shrink-0">{item.category}</span>
                                    <span className="text-gray-800">: {item.items ? item.items.join(", ") : ""}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                );
            case "experience":
                return experience.length > 0 && (
                    <section key="experience" className="mb-5">
                        <h2 className={`${bodyTextSize} font-bold uppercase tracking-widest border-b border-gray-400 mb-3 pb-1`}>Experience</h2>
                        <div className="space-y-4">
                            {experience.map((item) => (
                                <div key={item.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className={`font-bold ${bodyTextSize}`}>{item.company}</h3>
                                        <span className={`${bodyTextSize} uppercase text-gray-600 whitespace-nowrap`}>
                                            {item.startDate} – {item.current ? "Present" : item.endDate}
                                        </span>
                                    </div>
                                    <div className={`font-bold ${bodyTextSize} text-gray-700 mb-1`}>{item.role}</div>

                                    {item.extraLinkUrl && (
                                        <div className="text-xs mb-1">
                                            <a href={ensureUrl(item.extraLinkUrl)} className="text-purple-700 font-bold hover:underline" target="_blank" rel="noreferrer">
                                                {item.extraLinkHeading || "Link"}
                                            </a>
                                        </div>
                                    )}

                                    {item.description && (
                                        <div className="text-sm text-gray-900 pl-4">
                                            <ul className="list-disc space-y-1">
                                                {item.description.split('\n').filter(line => line.trim()).map((line, i) => (
                                                    <li key={i}><RichText text={line.replace(/^•\s*/, '')} /></li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                );
            default:
                return null;
        }
    };

    const sectionOrder = resume.meta.sectionOrder || ["summary", "certifications", "projects", "education", "skills", "experience"];


    // Text Size Map
    const textSizeMap = {
        small: "text-xs",
        medium: "text-sm",
        large: "text-base",
    };

    const bodyTextSize = textSizeMap[meta.fontSize] || "text-sm";

    return (
        <div className={`p-10 h-full flex flex-col ${fontMap[meta.fontFamily] || "font-serif"} text-gray-900 leading-normal`}>
            {/* Header */}
            <header className={`border-b-2 border-gray-300 pb-4 mb-6 text-center`}>
                <h1 className="text-3xl font-bold uppercase tracking-widest mb-2">{profile.name}</h1>
                <p className={`${bodyTextSize} font-bold uppercase tracking-widest mb-2 text-gray-600`}>{profile.title}</p>

                <div className={`flex flex-wrap justify-center gap-x-2 ${bodyTextSize} text-gray-700`}>
                    {profile.phone && <span>{profile.phone}</span>}
                    {profile.email && (
                        <>
                            <span>|</span>
                            <span>{profile.email}</span>
                        </>
                    )}
                    {profile.location && (
                        <>
                            <span>|</span>
                            <span>{profile.location}</span>
                        </>
                    )}
                    {profile.linkedin && (
                        <>
                            <span>|</span>
                            <a href={ensureUrl(profile.linkedin)} className="text-purple-700 font-bold hover:underline" target="_blank" rel="noreferrer">LinkedIn</a>
                        </>
                    )}
                    {profile.website && (
                        <>
                            <span>|</span>
                            <a href={ensureUrl(profile.website)} className="text-purple-700 font-bold hover:underline" target="_blank" rel="noreferrer">Portfolio</a>
                        </>
                    )}
                </div>
            </header>

            {/* Dynamic Sections */}
            <div className={spacingMap[meta.spacing] || "space-y-4"}>
                {sectionOrder.map(section => renderSection(section))}
            </div>
        </div>
    );

}
