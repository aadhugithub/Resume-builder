"use client";

import React, { useState } from "react";
import { useOptimizer } from "@/lib/ai/optimizer-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";
import { extractTextFromPDF, isPDF, isValidPDFSize } from "@/lib/ai/pdf-parser";
import { toast } from "sonner";

export default function BackgroundInput() {
    const { state, dispatch } = useOptimizer();
    const [isUploading, setIsUploading] = useState(false);

    const handleInputChange = (field, value) => {
        dispatch({
            type: "SET_BACKGROUND",
            payload: { [field]: value },
        });
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file
        if (!isPDF(file)) {
            toast.error("Please upload a PDF file");
            return;
        }

        if (!isValidPDFSize(file)) {
            toast.error("File size must be less than 5MB");
            return;
        }

        setIsUploading(true);
        dispatch({ type: "SET_UPLOADED_FILE", payload: file.name });

        try {
            // Extract text from PDF
            const text = await extractTextFromPDF(file);

            // Send to API for parsing
            const response = await fetch("/api/optimize-resume", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "parse",
                    resumeText: text,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to parse resume");
            }

            const { parsedData } = await response.json();

            // Update background with parsed data
            dispatch({
                type: "SET_BACKGROUND",
                payload: {
                    name: parsedData.name || "",
                    email: parsedData.email || "",
                    phone: parsedData.phone || "",
                    location: parsedData.location || "",
                    linkedin: parsedData.linkedin || "",
                    website: parsedData.website || "",
                    summary: parsedData.summary || "",
                    experience: parsedData.experience || [],
                    education: parsedData.education || [],
                    skills: parsedData.skills || [],
                },
            });

            toast.success("Resume uploaded and parsed successfully!");
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Failed to parse resume. Please try manual entry.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Your Background</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Upload Resume */}
                <div className="space-y-2">
                    <Label>Upload Resume (Optional)</Label>
                    <div className="flex gap-2">
                        <Input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileUpload}
                            disabled={isUploading}
                            className="flex-1"
                        />
                        {isUploading && <Loader2 className="h-5 w-5 animate-spin" />}
                    </div>
                    {state.uploadedFileName && (
                        <p className="text-xs text-green-600">✓ {state.uploadedFileName}</p>
                    )}
                </div>

                {/* Manual Entry */}
                <div className="space-y-3 pt-2 border-t">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label className="text-xs">Name</Label>
                            <Input
                                value={state.background.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                placeholder="John Doe"
                                className="h-9"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-xs">Email</Label>
                            <Input
                                value={state.background.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                placeholder="john@example.com"
                                className="h-9"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <Label className="text-xs">Key Skills (comma-separated)</Label>
                        <Input
                            value={state.background.skills.join(", ")}
                            onChange={(e) =>
                                handleInputChange("skills", e.target.value.split(",").map((s) => s.trim()))
                            }
                            placeholder="JavaScript, React, Node.js"
                            className="h-9"
                        />
                    </div>

                    <div className="space-y-1">
                        <Label className="text-xs">Experience Summary</Label>
                        <Textarea
                            value={state.background.summary}
                            onChange={(e) => handleInputChange("summary", e.target.value)}
                            placeholder="Brief summary of your experience..."
                            className="h-20 text-sm"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
