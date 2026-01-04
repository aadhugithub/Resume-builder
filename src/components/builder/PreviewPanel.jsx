"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Download, FileJson } from "lucide-react";
import ResumePreview from "@/components/resume/ResumePreview";
import { useReactToPrint } from "react-to-print";
import { useResume } from "@/lib/resume-store";
import { toast } from "sonner";

export default function PreviewPanel() {
    const [scale, setScale] = useState(0.8);
    const componentRef = useRef(null);
    const { resume, dispatch } = useResume();

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: `${resume.profile.name || "Resume"} - Resume`,
        pageStyle: `
          @page {
            size: auto;
            margin: 0mm;
          }
          @media print {
            body {
              -webkit-print-color-adjust: exact;
            }
          }
        `,
        onAfterPrint: () => {
            dispatch({ type: "RESET_RESUME" });
            toast.success("Resume exported and builder reset!");
        },
    });

    const exportJson = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resume, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "resume.json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        toast.success("JSON exported!");
    }

    return (
        <div className="flex flex-col h-full gap-4">
            {/* Toolbar */}
            <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-sm border shrink-0">
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" onClick={() => setScale(s => Math.max(0.4, s - 0.1))}>
                        <ZoomOut className="h-4 w-4" />
                    </Button>
                    <span className="text-xs w-12 text-center">{Math.round(scale * 100)}%</span>
                    <Button variant="ghost" size="icon" onClick={() => setScale(s => Math.min(1.5, s + 0.1))}>
                        <ZoomIn className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="gap-2 hidden md:flex" onClick={exportJson}>
                        <FileJson className="h-4 w-4" /> JSON
                    </Button>
                    <Button size="sm" className="gap-2" onClick={handlePrint}>
                        <Download className="h-4 w-4" /> Export PDF
                    </Button>
                </div>
            </div>

            {/* Preview Area */}
            <div className="flex-1 overflow-auto flex justify-center p-4 bg-gray-100/50 rounded-xl relative">
                <div
                    className="origin-top transition-transform duration-200 shadow-2xl"
                    style={{ transform: `scale(${scale})` }}
                >
                    <div ref={componentRef}>
                        <ResumePreview />
                    </div>
                </div>
            </div>
        </div>
    );
}
