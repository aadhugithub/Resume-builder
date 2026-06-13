"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Download, FileJson, Maximize2 } from "lucide-react";
import ResumePreview from "@/components/resume/ResumePreview";
import { useReactToPrint } from "react-to-print";
import { useResume } from "@/lib/resume-store";
import { toast } from "sonner";

export default function PreviewPanel({ isSavedView = false, overrideResume = null }) {
    const [scale, setScale] = useState(0.85);
    const componentRef = useRef(null);
    const { resume: activeResume } = useResume();
    const resume = overrideResume || activeResume;

    useEffect(() => {
        if (isSavedView) setScale(1.1);
    }, [isSavedView]);

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: `${resume.profile.name || "Resume"} - Resume`,
        pageStyle: `
          @page {
            size: A4;
            margin: 0mm;
          }
          @media print {
            body {
              -webkit-print-color-adjust: exact;
              background: white !important;
            }
            #resume-preview-content {
              box-shadow: none !important;
              border: none !important;
              margin: 0 !important;
              padding: 0 !important;
            }
          }
        `,
        onAfterPrint: () => {
            // Note: In a real app, you might not want to reset here if they just want to print
            // dispatch({ type: "RESET_RESUME" });
            toast.success("Resume exported successfully!");
        },
    });

    const exportJson = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resume, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `${resume.profile.name || "resume"}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        toast.success("Resume data exported as JSON");
    }

    return (
        <div className={`flex flex-col h-full ${isSavedView ? "gap-0" : "gap-4"}`}>
            {/* Toolbar */}
            <div className={`flex items-center justify-between bg-white px-4 py-3 shrink-0 ${isSavedView ? "border-b" : "rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border"}`}>
                <div className="flex items-center gap-2">
                    <div className="flex items-center bg-gray-50 rounded-lg p-0.5 border border-gray-100">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-md" 
                            onClick={() => setScale(s => Math.max(0.4, s - 0.1))}
                        >
                            <ZoomOut className="h-4 w-4" />
                        </Button>
                        <div className="text-[10px] font-bold w-10 text-center text-gray-600 uppercase tracking-tighter">
                            {Math.round(scale * 100)}%
                        </div>
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-md" 
                            onClick={() => setScale(s => Math.min(1.5, s + 0.1))}
                        >
                            <ZoomIn className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                
                <div className="flex items-center gap-2">
                    <Button 
                        size="sm" 
                        variant="ghost" 
                        className="gap-2 text-gray-600 font-semibold hover:bg-gray-50" 
                        onClick={exportJson}
                    >
                        <FileJson className="h-4 w-4" />
                        <span className="hidden sm:inline text-xs">JSON</span>
                    </Button>
                    <Button 
                        size="sm" 
                        className="gap-2 bg-black hover:bg-gray-800 text-white font-bold rounded-lg px-5 shadow-lg shadow-black/5" 
                        onClick={handlePrint}
                    >
                        <Download className="h-4 w-4" />
                        <span className="text-xs">Export PDF</span>
                    </Button>
                </div>
            </div>

            {/* Preview Area */}
            <div className={`flex-1 overflow-auto flex justify-center p-8 lg:p-12 transition-colors ${isSavedView ? "bg-transparent" : "bg-gray-50/50 rounded-2xl"}`}>
                <div
                    className="origin-top transition-all duration-300 ease-out"
                    style={{ 
                        transform: `scale(${scale})`,
                        filter: "drop-shadow(0 25px 50px -12px rgba(0, 0, 0, 0.15))"
                    }}
                >
                    <div ref={componentRef} className="bg-white print:shadow-none print:border-none print:m-0 print:p-0">
                        <ResumePreview resume={resume} />
                    </div>
                </div>
            </div>
        </div>
    );
}
