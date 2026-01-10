"use client";

import React from "react";
import { useOptimizer } from "@/lib/ai/optimizer-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function JobRequirementsInput() {
    const { state, dispatch } = useOptimizer();

    const handleOptimize = async () => {
        // Validate inputs
        if (!state.background.name || !state.background.email) {
            toast.error("Please provide at least your name and email");
            return;
        }

        if (!state.jobRequirements.trim()) {
            toast.error("Please paste the job description");
            return;
        }

        dispatch({ type: "SET_LOADING", payload: true });
        dispatch({ type: "SET_ERROR", payload: null });

        try {
            const response = await fetch("/api/optimize-resume", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "optimize",
                    background: state.background,
                    jobRequirements: state.jobRequirements,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Failed to optimize resume");
            }

            const { optimizedResume } = await response.json();

            dispatch({ type: "SET_OPTIMIZED_RESUME", payload: optimizedResume });
            toast.success("Resume optimized successfully!");
        } catch (error) {
            console.error("Optimization error:", error);
            dispatch({ type: "SET_ERROR", payload: error.message });
            toast.error(error.message || "Failed to optimize resume");
        } finally {
            dispatch({ type: "SET_LOADING", payload: false });
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Job Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Textarea
                    value={state.jobRequirements}
                    onChange={(e) =>
                        dispatch({ type: "SET_JOB_REQUIREMENTS", payload: e.target.value })
                    }
                    placeholder="Paste the job description here...&#10;&#10;Example:&#10;We are looking for a Senior Software Engineer with 5+ years of experience in React, Node.js, and AWS..."
                    className="min-h-[200px] text-sm"
                />

                <Button
                    onClick={handleOptimize}
                    disabled={state.isLoading}
                    className="w-full gap-2"
                    size="lg"
                >
                    {state.isLoading ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Optimizing...
                        </>
                    ) : (
                        <>
                            <Sparkles className="h-4 w-4" />
                            Generate Optimized Resume
                        </>
                    )}
                </Button>

                {state.error && (
                    <p className="text-sm text-red-500 text-center">{state.error}</p>
                )}
            </CardContent>
        </Card>
    );
}
