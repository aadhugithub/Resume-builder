"use client";

import React from "react";
import { OptimizerProvider } from "@/lib/ai/optimizer-store";
import BackgroundInput from "./BackgroundInput";
import JobRequirementsInput from "./JobRequirementsInput";
import OptimizedPreview from "./OptimizedPreview";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function OptimizerPanel() {
    return (
        <OptimizerProvider>
            <div className="flex h-full gap-4">
                {/* Left Panel: Inputs */}
                <div className="w-full md:w-[500px] shrink-0 overflow-hidden">
                    <ScrollArea className="h-full pr-4">
                        <div className="flex flex-col gap-4 pb-4">
                            <BackgroundInput />
                            <JobRequirementsInput />
                        </div>
                    </ScrollArea>
                </div>

                {/* Right Panel: Preview */}
                <div className="flex-1 bg-gray-50 rounded-xl p-4 overflow-hidden">
                    <ScrollArea className="h-full">
                        <OptimizedPreview />
                    </ScrollArea>
                </div>
            </div>
        </OptimizerProvider>
    );
}
