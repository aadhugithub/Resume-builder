"use client";

import React, { useRef } from "react";
import EditorPanel from "./EditorPanel";
import PreviewPanel from "./PreviewPanel";
import JobOptimizer from "@/components/ai-optimizer/JobOptimizer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Edit3, FileText, CheckCircle, RotateCcw, Upload, Trash2, Eye, X } from "lucide-react";
import { useResume } from "@/lib/resume-store";
import { toast } from "sonner";

export default function BuilderLayout() {
    const { resume, allResumes, dispatch } = useResume();
    const [mainTab, setMainTab] = React.useState("builder"); // builder, saved, optimizer
    const [activeTab, setActiveTab] = React.useState("editor");
    const [savedTab, setSavedTab] = React.useState("created"); // created, uploaded
    const [previewResume, setPreviewResume] = React.useState(null);
    const fileInputRef = useRef(null);

    const handleReset = () => {
        if (confirm("Are you sure you want to reset your resume? All data will be lost.")) {
            dispatch({ type: "RESET_RESUME" });
        }
    };

    const handleSaveCurrent = () => {
        dispatch({ type: "SAVE_CURRENT_RESUME" });
        toast.success("Resume saved to your list!");
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                dispatch({
                    type: "UPLOAD_RESUME",
                    payload: {
                        name: file.name.replace(".json", ""),
                        data: data
                    }
                });
                toast.success("External resume uploaded successfully!");
                setSavedTab("uploaded");
            } catch (err) {
                toast.error("Invalid JSON file format");
            }
        };
        reader.readAsText(file);
    };

    const handleDelete = (id, e) => {
        e.stopPropagation();
        if (confirm("Are you sure you want to delete this resume?")) {
            dispatch({ type: "DELETE_SAVED_RESUME", id });
            toast.success("Resume deleted");
        }
    };

    const filteredResumes = allResumes.filter(r => r.type === savedTab);

    return (
        <div className="flex flex-col h-screen bg-[#F8F9FB] overflow-hidden">
            {/* Builder Header */}
            <header className="h-16 border-b bg-white/80 backdrop-blur-md flex items-center justify-between px-4 z-20 shrink-0 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
                    <Link href="/" className="mr-2">
                        <div className="h-8 w-8 rounded-lg bg-black flex items-center justify-center text-white font-bold text-xs">
                            R
                        </div>
                    </Link>

                    {/* Main Tab Navigation */}
                    <div className="flex items-center gap-1 bg-gray-100/50 p-1 rounded-xl border border-gray-200/50">
                        <button
                            onClick={() => setMainTab("builder")}
                            className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-2.5 ${mainTab === "builder" 
                                ? "bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] text-black border border-gray-100" 
                                : "text-gray-600 hover:text-black hover:bg-white/40"
                            }`}
                        >
                            <Edit3 className={`h-4 w-4 ${mainTab === "builder" ? "text-blue-600" : ""}`} />
                            <span className="hidden sm:inline">Resume Builder</span>
                        </button>

                        <button
                            onClick={() => setMainTab("saved")}
                            className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-2.5 ${mainTab === "saved" 
                                ? "bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] text-black border border-gray-100" 
                                : "text-gray-600 hover:text-black hover:bg-white/40"
                            }`}
                        >
                            <FileText className={`h-4 w-4 ${mainTab === "saved" ? "text-purple-600" : ""}`} />
                            <span className="hidden sm:inline">Saved Resumes</span>
                        </button>

                        <button
                            onClick={() => setMainTab("optimizer")}
                            className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-2.5 ${mainTab === "optimizer" 
                                ? "bg-black text-white shadow-lg" 
                                : "text-gray-600 hover:text-black hover:bg-white/40"
                            }`}
                        >
                            <CheckCircle className={`h-4 w-4 ${mainTab === "optimizer" ? "text-green-400" : ""}`} />
                            <span className="hidden sm:inline">Job Optimizer</span>
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                    {mainTab === "builder" && (
                        <>
                            <div className="flex bg-gray-100 p-1 rounded-lg lg:hidden">
                                <button
                                    onClick={() => setActiveTab("editor")}
                                    className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${activeTab === "editor" ? "bg-white shadow text-black" : "text-gray-600 hover:text-gray-900"
                                        }`}
                                >
                                    Editor
                                </button>
                                <button
                                    onClick={() => setActiveTab("preview")}
                                    className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${activeTab === "preview" ? "bg-white shadow text-black" : "text-gray-600 hover:text-gray-900"
                                        }`}
                                >
                                    Preview
                                </button>
                            </div>

                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="hidden sm:flex border-gray-200 text-gray-700 font-bold px-4 gap-2 rounded-lg" 
                                onClick={handleSaveCurrent}
                            >
                                <FileText className="h-3.5 w-3.5" />
                                Save Copy
                            </Button>

                            <Button 
                                variant="ghost" 
                                size="sm" 
                                className="hidden sm:flex text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors gap-2 rounded-lg" 
                                onClick={handleReset}
                            >
                                <RotateCcw className="h-3.5 w-3.5" />
                                Reset
                            </Button>
                        </>
                    )}
                </div>
            </header>

            <main className="flex-1 overflow-hidden p-4">
                {mainTab === "builder" && (
                    <div className="flex h-full overflow-hidden relative gap-6">
                        {/* Left Panel: Editor */}
                        <div
                            className={`
                                w-full lg:w-[480px] xl:w-[520px] bg-white border border-gray-200/60 flex flex-col z-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 absolute inset-0 lg:relative lg:transform-none rounded-2xl overflow-hidden
                                ${activeTab === "editor" ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                            `}
                        >
                            <EditorPanel />
                        </div>

                        {/* Right Panel: Preview */}
                        <div
                            className={`
                                flex-1 bg-white border border-gray-200/60 p-4 lg:p-0 overflow-hidden relative flex flex-col transition-all duration-300 absolute inset-0 lg:relative lg:transform-none rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]
                                ${activeTab === "preview" ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
                            `}
                        >
                            <PreviewPanel />
                        </div>
                    </div>
                )}

                {mainTab === "saved" && (
                    <div className="h-full bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col overflow-hidden">
                        <div className="p-6 border-b border-gray-50 flex items-center justify-between shrink-0">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-xl font-bold tracking-tight text-gray-900">Saved Resumes</h2>
                                <div className="flex bg-gray-100 p-1 rounded-lg w-fit mt-2">
                                    <button 
                                        onClick={() => setSavedTab("created")}
                                        className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${savedTab === "created" ? "bg-white shadow text-black" : "text-gray-500 hover:text-gray-900"}`}
                                    >
                                        Created
                                    </button>
                                    <button 
                                        onClick={() => setSavedTab("uploaded")}
                                        className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${savedTab === "uploaded" ? "bg-white shadow text-black" : "text-gray-500 hover:text-gray-900"}`}
                                    >
                                        Uploaded
                                    </button>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                {savedTab === "uploaded" && (
                                    <>
                                        <input 
                                            type="file" 
                                            ref={fileInputRef} 
                                            onChange={handleFileUpload} 
                                            accept=".json" 
                                            className="hidden" 
                                        />
                                        <Button 
                                            variant="outline" 
                                            className="rounded-xl px-6 h-11 font-bold border-gray-200" 
                                            onClick={() => fileInputRef.current.click()}
                                        >
                                            <Upload className="mr-2 h-4 w-4" /> Upload Externally
                                        </Button>
                                    </>
                                )}
                                <Button className="rounded-xl px-6 h-11 font-bold shadow-lg shadow-blue-500/10 transition-all hover:scale-105 active:scale-95 bg-black" onClick={() => setMainTab("builder")}>
                                    <Edit3 className="mr-2 h-4 w-4" /> Go to Builder
                                </Button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-auto p-6">
                            {filteredResumes.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center p-12">
                                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
                                        <FileText className="h-8 w-8 text-gray-300" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900">No resumes found</h3>
                                    <p className="text-gray-500 max-w-xs mt-2">
                                        {savedTab === "created" 
                                            ? "Resumes you create in the builder will appear here." 
                                            : "Upload a previously exported JSON resume to manage it here."}
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredResumes.map((res) => (
                                        <div 
                                            key={res.id} 
                                            onClick={() => setPreviewResume(res)}
                                            className="group bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all cursor-pointer relative"
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                                                    <FileText className="h-5 w-5" />
                                                </div>
                                                <button 
                                                    onClick={(e) => handleDelete(res.id, e)}
                                                    className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 transition-all"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                            <h4 className="font-bold text-gray-900 mb-1 truncate">{res.name}</h4>
                                            <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                                                <span>{res.date}</span>
                                                <span className="w-1 h-1 rounded-full bg-gray-300" />
                                                <span>{res.time}</span>
                                            </div>
                                            
                                            <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                                                    {res.type}
                                                </span>
                                                <Eye className="h-4 w-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {mainTab === "optimizer" && (
                    <div className="h-full bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
                        <JobOptimizer />
                    </div>
                )}
            </main>

            {/* Preview Modal */}
            {previewResume && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-5xl h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-4 border-b flex items-center justify-between bg-white shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                                    <FileText className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{previewResume.name}</h3>
                                    <p className="text-xs text-gray-500">{previewResume.date} at {previewResume.time}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="rounded-lg font-bold"
                                    onClick={() => {
                                        dispatch({ type: "SET_ACTIVE_RESUME", payload: previewResume.data });
                                        setMainTab("builder");
                                        setPreviewResume(null);
                                        toast.success("Resume loaded into builder");
                                    }}
                                >
                                    <Edit3 className="mr-2 h-4 w-4" /> Edit this Resume
                                </Button>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="rounded-full h-10 w-10" 
                                    onClick={() => setPreviewResume(null)}
                                >
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-auto bg-gray-100/50 p-6 md:p-12 flex justify-center">
                            <div className="w-full max-w-4xl shadow-2xl bg-white rounded-lg overflow-hidden">
                                <PreviewPanel isSavedView={true} overrideResume={previewResume.data} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
