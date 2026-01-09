"use client";

import React from "react";
import { useResume } from "@/lib/resume-store";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Reorder } from "framer-motion";
import { GripVertical } from "lucide-react";

export default function DesignForm() {
    const { resume, dispatch } = useResume();
    const { meta } = resume;
    const sectionOrder = meta.sectionOrder || ["summary", "certifications", "projects", "education", "skills", "experience"];

    const updateMeta = (key, value) => {
        dispatch({
            type: "UPDATE_META",
            payload: { [key]: value },
        });
    };

    return (
        <div className="space-y-8 p-1">

            {/* Template Selection */}
            <div className="space-y-3">
                <Label className="text-base font-semibold">Template</Label>
                <div className="grid grid-cols-2 gap-4">
                    {["minimal", "modern", "executive", "creative"].map((t) => (
                        <div
                            key={t}
                            className={`
                    cursor-pointer border-2 rounded-lg p-2 text-center text-sm capitalize hover:border-black transition-colors
                    ${meta.templateId === t ? "border-black bg-gray-50 font-medium" : "border-gray-200"}
                `}
                            onClick={() => updateMeta("templateId", t)}
                        >
                            {t}
                        </div>
                    ))}
                </div>
                <p className="text-xs text-gray-400">More templates coming soon.</p>
            </div>

            {/* Typography */}
            <div className="space-y-3">
                <Label className="text-base font-semibold">Typography</Label>

                <div className="space-y-2">
                    <Label className="text-xs text-gray-500">Font Family</Label>
                    <Select value={meta.fontFamily} onValueChange={(v) => updateMeta("fontFamily", v)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Font" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="inter">Inter (Sans)</SelectItem>
                            <SelectItem value="serif">Merriweather (Serif)</SelectItem>
                            <SelectItem value="mono">Roboto Mono (Monospace)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label className="text-xs text-gray-500">Font Size</Label>
                    <RadioGroup
                        value={meta.fontSize}
                        onValueChange={(v) => updateMeta("fontSize", v)}
                        className="flex gap-4"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="small" id="s" />
                            <Label htmlFor="s">Small</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="medium" id="m" />
                            <Label htmlFor="m">Medium</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="large" id="l" />
                            <Label htmlFor="l">Large</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>

            {/* Spacing / Density */}
            <div className="space-y-3">
                <Label className="text-base font-semibold">Spacing</Label>
                <Select value={meta.spacing} onValueChange={(v) => updateMeta("spacing", v)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Density" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="compact">Compact</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="airy">Airy</SelectItem>
                    </SelectContent>
                </Select>
            </div>



            {/* Section Reordering */}
            <div className="space-y-3">
                <Label className="text-base font-semibold">Section Ordering</Label>
                <div className="text-xs text-gray-500 mb-2">Drag to reorder sections</div>
                <Reorder.Group axis="y" values={sectionOrder} onReorder={(newOrder) => updateMeta("sectionOrder", newOrder)} className="space-y-2">
                    {sectionOrder.map((section) => {
                        // Check if this is a custom section
                        const isCustom = section.startsWith('custom-');
                        let displayName = section;

                        if (isCustom) {
                            const customId = section.replace('custom-', '');
                            const customSection = resume.custom?.find(item => item.id === customId);
                            displayName = customSection?.title || 'Custom Section';
                        }

                        return (
                            <Reorder.Item key={section} value={section} className="flex items-center gap-3 bg-white p-2 border rounded cursor-move shadow-sm select-none">
                                <GripVertical className="h-4 w-4 text-gray-400" />
                                <span className="capitalize text-sm font-medium">{displayName}</span>
                            </Reorder.Item>
                        );
                    })}
                </Reorder.Group>
            </div>

        </div>
    );
}
