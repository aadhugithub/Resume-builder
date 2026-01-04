"use client";

import React from "react";
import EditorPanel from "./EditorPanel";
import PreviewPanel from "./PreviewPanel";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

import { useResume } from "@/lib/resume-store";

export default function BuilderLayout() {
    const { dispatch } = useResume();

    const handleReset = () => {
        if (confirm("Are you sure you want to reset your resume? All data will be lost.")) {
            dispatch({ type: "RESET_RESUME" });
        }
    };

    const [activeTab, setActiveTab] = React.useState("editor");

    return (
        <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
            {/* Builder Header */}
            <header className="h-14 border-b bg-white flex items-center justify-between px-4 z-20 shrink-0">
                <div className="flex items-center gap-3">
                    <Link href="/">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Home className="h-4 w-4" />
                        </Button>
                    </Link>
                    <span className="font-semibold text-sm">Resume Builder</span>
                </div>
                <div className="flex items-center gap-2">
                    {/* Mobile Tabs */}
                    <div className="flex bg-gray-100 p-1 rounded-md lg:hidden">
                        <button
                            onClick={() => setActiveTab("editor")}
                            className={`px-3 py-1 text-xs font-medium rounded-sm transition-all ${activeTab === "editor" ? "bg-white shadow" : "text-gray-500 hover:text-gray-900"}`}
                        >
                            Editor
                        </button>
                        <button
                            onClick={() => setActiveTab("preview")}
                            className={`px-3 py-1 text-xs font-medium rounded-sm transition-all ${activeTab === "preview" ? "bg-white shadow" : "text-gray-500 hover:text-gray-900"}`}
                        >
                            Preview
                        </button>
                    </div>

                    {/* Actions */}
                    <Button variant="ghost" size="sm" className="hidden sm:flex" onClick={handleReset}>Reset</Button>
                </div>
            </header>

            <main className="flex-1 flex overflow-hidden relative">
                {/* Left Panel: Editor */}
                <div className={`
                    w-full lg:w-[450px] xl:w-[500px] bg-white border-r flex flex-col z-10 shadow-lg lg:shadow-none transition-transform duration-300 absolute inset-0 lg:relative lg:transform-none
                    ${activeTab === "editor" ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                `}>
                    <EditorPanel />
                </div>

                {/* Right Panel: Preview */}
                <div className={`
                    flex-1 bg-gray-100/50 p-4 lg:p-8 overflow-hidden relative flex flex-col transition-transform duration-300 absolute inset-0 lg:relative lg:transform-none
                    ${activeTab === "preview" ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
                `}>
                    <PreviewPanel />
                </div>
            </main>
        </div>
    );
}
