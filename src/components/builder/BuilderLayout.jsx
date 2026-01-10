"use client";

import React from "react";
import EditorPanel from "./EditorPanel";
import PreviewPanel from "./PreviewPanel";
import OptimizerPanel from "@/components/ai-optimizer/OptimizerPanel";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Wand2, Edit3 } from "lucide-react";
import { useResume } from "@/lib/resume-store";

export default function BuilderLayout() {
    const { dispatch } = useResume();
    const [mainTab, setMainTab] = React.useState("builder"); // builder or optimizer
    const [activeTab, setActiveTab] = React.useState("editor");

    const handleReset = () => {
        if (confirm("Are you sure you want to reset your resume? All data will be lost.")) {
            dispatch({ type: "RESET_RESUME" });
        }
    };

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
                    <span className="font-semibold text-sm hidden sm:inline">Resume Builder</span>

                    {/* Main Tab Navigation */}
                    <div className="flex bg-gray-100 p-1 rounded-md ml-4">
                        <button
                            onClick={() => setMainTab("builder")}
                            className={`px-4 py-1.5 text-sm font-medium rounded-sm transition-all flex items-center gap-2 ${mainTab === "builder" ? "bg-white shadow text-black" : "text-gray-500 hover:text-gray-900"
                                }`}
                        >
                            <Edit3 className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline">Custom Builder</span>
                        </button>
                        <button
                            onClick={() => setMainTab("optimizer")}
                            className={`px-4 py-1.5 text-sm font-medium rounded-sm transition-all flex items-center gap-2 ${mainTab === "optimizer" ? "bg-white shadow text-black" : "text-gray-500 hover:text-gray-900"
                                }`}
                        >
                            <Wand2 className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline">Smart Match</span>
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {mainTab === "builder" && (
                        <>
                            {/* Mobile Editor/Preview Tabs */}
                            <div className="flex bg-gray-100 p-1 rounded-md lg:hidden">
                                <button
                                    onClick={() => setActiveTab("editor")}
                                    className={`px-3 py-1 text-xs font-medium rounded-sm transition-all ${activeTab === "editor" ? "bg-white shadow" : "text-gray-500 hover:text-gray-900"
                                        }`}
                                >
                                    Editor
                                </button>
                                <button
                                    onClick={() => setActiveTab("preview")}
                                    className={`px-3 py-1 text-xs font-medium rounded-sm transition-all ${activeTab === "preview" ? "bg-white shadow" : "text-gray-500 hover:text-gray-900"
                                        }`}
                                >
                                    Preview
                                </button>
                            </div>

                            {/* Actions */}
                            <Button variant="ghost" size="sm" className="hidden sm:flex" onClick={handleReset}>
                                Reset
                            </Button>
                        </>
                    )}
                </div>
            </header>

            <main className="flex-1 overflow-hidden p-4">
                {mainTab === "builder" ? (
                    <div className="flex h-full overflow-hidden relative">
                        {/* Left Panel: Editor */}
                        <div
                            className={`
                                w-full lg:w-[450px] xl:w-[500px] bg-white border-r flex flex-col z-10 shadow-lg lg:shadow-none transition-transform duration-300 absolute inset-0 lg:relative lg:transform-none rounded-l-xl
                                ${activeTab === "editor" ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                            `}
                        >
                            <EditorPanel />
                        </div>

                        {/* Right Panel: Preview */}
                        <div
                            className={`
                                flex-1 bg-gray-100/50 p-4 lg:p-8 overflow-hidden relative flex flex-col transition-transform duration-300 absolute inset-0 lg:relative lg:transform-none rounded-r-xl
                                ${activeTab === "preview" ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
                            `}
                        >
                            <PreviewPanel />
                        </div>
                    </div>
                ) : (
                    <div className="h-full bg-white rounded-xl shadow-sm p-4">
                        <OptimizerPanel />
                    </div>
                )}
            </main>
        </div>
    );
}
