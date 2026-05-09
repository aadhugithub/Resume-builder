"use client";

import React from "react";
import { useResume } from "@/lib/resume-store";
import { Label } from "@/components/ui/label";
import { RichTextarea } from "@/components/ui/rich-textarea";

export default function SummaryForm() {
    const { resume, dispatch } = useResume();

    const handleChange = (e) => {
        dispatch({
            type: "UPDATE_SUMMARY",
            payload: e.target.value,
        });
    };

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="summary">Professional Summary</Label>
                <RichTextarea
                    id="summary"
                    value={resume.summary || ""}
                    onChange={handleChange}
                    placeholder="Briefly describe your professional background and key achievements..."
                    className="min-h-[150px]"
                />
                <p className="text-xs text-gray-400">
                    Tip: Use <b>**text**</b> for bold and <b>[text](url)</b> for links.
                </p>
            </div>
        </div>
    );
}
