"use client";

import React, { forwardRef } from "react";
import { useResume } from "@/lib/resume-store";
import MinimalTemplate from "./templates/MinimalTemplate";
// Import other templates later

const ResumePreview = forwardRef((props, ref) => {
    const { resume } = useResume();
    const { meta } = resume;

    // Font Map
    const fontMap = {
        inter: "font-sans",
        serif: "font-serif",
        mono: "font-mono",
    };

    // Scale Config
    const scaleMap = {
        small: "text-[0.875rem]", // 14px base -> smaller relative
        medium: "text-[1rem]",
        large: "text-[1.125rem]",
    };

    return (
        <div
            ref={ref}
            id="resume-preview-content"
            className={`bg-white shadow-xl mx-auto origin-top transition-all duration-200
            ${fontMap[meta.fontFamily] || "font-sans"}
        `}
            style={{
                width: "210mm",
                minHeight: "297mm",
                // A4 Aspect Ratio forced or auto height
            }}
        >
            {/* Template Switcher Logic */}
            {meta.templateId === "minimal" ? (
                <MinimalTemplate resume={resume} />
            ) : (
                // Fallback to Minimal for now
                <MinimalTemplate resume={resume} />
            )}
        </div>
    );
});

ResumePreview.displayName = "ResumePreview";

export default ResumePreview;
