"use client";

import React from "react";
import { useOptimizer } from "@/lib/ai/optimizer-store";
import { useResume } from "@/lib/resume-store";
import { Button } from "@/components/ui/button";
import { Download, Copy } from "lucide-react";
import { toast } from "sonner";
import ResumePreview from "@/components/resume/ResumePreview";

export default function OptimizedPreview() {
    const { state } = useOptimizer();
    const { dispatch: resumeDispatch } = useResume();

    const handleCopyToBuilder = () => {
        if (!state.optimizedResume) return;

        // Convert optimized resume to builder format
        const builderData = {
            profile: state.optimizedResume.profile || {},
            summary: state.optimizedResume.summary || "",
            experience: state.optimizedResume.experience || [],
            education: state.optimizedResume.education || [],
            skills: state.optimizedResume.skills || [],
            projects: state.optimizedResume.projects || [],
            certifications: state.optimizedResume.certifications || [],
        };

        // Load into builder
        resumeDispatch({ type: "LOAD_DATA", payload: builderData });
        toast.success("Resume copied to Custom Builder!");
    };

    const handleExportJSON = () => {
        if (!state.optimizedResume) return;

        const dataStr =
            "data:text/json;charset=utf-8," +
            encodeURIComponent(JSON.stringify(state.optimizedResume, null, 2));
        const downloadAnchorNode = document.createElement("a");
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "optimized-resume.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        toast.success("JSON exported!");
    };

    if (!state.optimizedResume) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-4 max-w-md">
                    <div className="text-6xl">✨</div>
                    <h3 className="text-xl font-semibold text-gray-700">
                        AI-Optimized Resume Preview
                    </h3>
                    <p className="text-sm text-gray-500">
                        Fill in your background and paste the job requirements, then click
                        "Generate Optimized Resume" to see your AI-enhanced resume here.
                    </p>
                    <div className="pt-4 space-y-2 text-xs text-gray-400 text-left">
                        <p>✓ ATS-friendly formatting</p>
                        <p>✓ Keyword optimization</p>
                        <p>✓ Quantified achievements</p>
                        <p>✓ Tailored to job requirements</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Action Buttons */}
            <div className="flex gap-2 justify-end bg-white p-3 rounded-lg border sticky top-0 z-10">
                <Button variant="outline" size="sm" onClick={handleExportJSON} className="gap-2">
                    <Download className="h-4 w-4" />
                    Export JSON
                </Button>
                <Button size="sm" onClick={handleCopyToBuilder} className="gap-2">
                    <Copy className="h-4 w-4" />
                    Copy to Custom Builder
                </Button>
            </div>

            {/* Match Score */}
            {state.optimizedResume.matchScore && (
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Match Score</span>
                        <span className="text-2xl font-bold text-green-600">
                            {state.optimizedResume.matchScore}%
                        </span>
                    </div>
                    {state.optimizedResume.keywords && (
                        <div className="mt-2 flex flex-wrap gap-1">
                            {state.optimizedResume.keywords.slice(0, 8).map((keyword, i) => (
                                <span
                                    key={i}
                                    className="text-xs bg-white px-2 py-1 rounded-full border"
                                >
                                    {keyword}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Recommendations */}
            {state.optimizedResume.recommendations && state.optimizedResume.recommendations.length > 0 && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h4 className="text-sm font-semibold mb-2">AI Recommendations</h4>
                    <ul className="text-xs space-y-1 text-gray-700">
                        {state.optimizedResume.recommendations.map((rec, i) => (
                            <li key={i}>• {rec}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Resume Preview */}
            <div className="bg-white rounded-lg shadow-xl">
                <ResumePreview resume={state.optimizedResume} />
            </div>
        </div>
    );
}
