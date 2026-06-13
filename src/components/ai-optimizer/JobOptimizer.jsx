"use client";

import React, { useState, useEffect, useRef } from "react";
import { useResume } from "@/lib/resume-store";
import { useReactToPrint } from "react-to-print";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles, Download, CheckCircle, AlertCircle, TrendingUp, Loader2, FileJson, RefreshCcw } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import ResumePreview from "@/components/resume/ResumePreview";
import { toast } from "sonner";
import { extractKeywords, optimizeResume } from "@/services/geminiService";

export default function JobOptimizer() {
    const { resume: masterResume } = useResume();

    const [jobDescription, setJobDescription] = useState("");
    const [detectedKeywords, setDetectedKeywords] = useState([]);
    const [missingKeywords, setMissingKeywords] = useState([]);
    const [matchedKeywords, setMatchedKeywords] = useState([]);
    const [atsScore, setAtsScore] = useState(0);
    const [hasAnalyzed, setHasAnalyzed] = useState(false);
    
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    
    const [optimizedResume, setOptimizedResume] = useState(null);
    const componentRef = useRef(null);

    // Initialize with Master Resume preview if not analyzed yet
    useEffect(() => {
        if (!optimizedResume && masterResume) {
            setOptimizedResume(JSON.parse(JSON.stringify(masterResume)));
        }
    }, [masterResume, optimizedResume]);

    const handleAnalyze = async () => {
        if (!jobDescription.trim()) {
            toast.error("Please paste a job description to analyze");
            return;
        }

        setIsAnalyzing(true);
        try {
            const keywords = await extractKeywords(jobDescription);
            
            // Check against master resume for matched/missing
            const resumeText = JSON.stringify(masterResume).toLowerCase();
            const matched = [];
            const missing = [];

            keywords.forEach(kw => {
                if (resumeText.includes(kw.toLowerCase())) {
                    matched.push(kw);
                } else {
                    missing.push(kw);
                }
            });

            const score = keywords.length > 0
                ? Math.round((matched.length / keywords.length) * 100)
                : 0;

            setDetectedKeywords(keywords);
            setMatchedKeywords(matched);
            setMissingKeywords(missing);
            setAtsScore(score);
            setHasAnalyzed(true);
            
            toast.success("Job description analyzed by Gemini!");
        } catch (error) {
            toast.error(error.message || "Failed to analyze job description. Check your API key.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleGenerateOptimized = async () => {
        if (!jobDescription.trim()) {
            toast.error("Analyze a job description first.");
            return;
        }

        setIsGenerating(true);
        try {
            const result = await optimizeResume(jobDescription, masterResume);
            
            setOptimizedResume(result.optimized_resume);
            setAtsScore(parseInt(result.match_score) || 100);
            setMissingKeywords(result.missing_keywords || []);
            setMatchedKeywords(result.keywords || []);
            
            toast.success("Gemini has optimized your resume!");
        } catch (error) {
            toast.error("Failed to generate optimized resume. Please try again.");
            console.error(error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleDownloadPDF = useReactToPrint({
        contentRef: componentRef,
        documentTitle: `Optimized_Resume_${new Date().getTime()}`,
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
        onAfterPrint: () => toast.success("Optimized PDF Downloaded!"),
    });

    return (
        <div className="flex h-full gap-6 p-1">
            {/* Left Panel: Inputs & Analysis */}
            <div className="w-full lg:w-[480px] xl:w-[520px] shrink-0 flex flex-col gap-6">
                {/* JD Input Card */}
                <Card className="shadow-sm border-gray-200/60 overflow-hidden">
                    <CardHeader className="bg-gray-50/50 border-b py-4 px-6">
                        <CardTitle className="text-base font-bold flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-blue-600" />
                            Job Description Analyzer
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Paste Job Description</label>
                            <Textarea
                                placeholder="Paste the job description here to find matching keywords..."
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                className="min-h-[200px] text-sm resize-none focus:ring-blue-500 border-gray-200 rounded-xl"
                            />
                        </div>
                        <Button
                            onClick={handleAnalyze}
                            disabled={isAnalyzing}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 rounded-xl shadow-lg shadow-blue-500/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {isAnalyzing ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Analyzing with Gemini...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="h-4 w-4 mr-2" />
                                    Analyze Job Description
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>

                {/* Analysis Results */}
                {hasAnalyzed && (
                    <Card className="shadow-sm border-gray-200/60 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <CardContent className="p-6 space-y-6">
                            {/* Score Section */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-end">
                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">ATS Match Score</span>
                                    <span className={`text-3xl font-black ${atsScore >= 80 ? 'text-emerald-600' : atsScore >= 50 ? 'text-amber-500' : 'text-rose-500'}`}>
                                        {atsScore}%
                                    </span>
                                </div>
                                <Progress value={atsScore} className="h-3 w-full bg-gray-100" />
                            </div>

                            {/* Keywords Grid */}
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                                        <CheckCircle className="h-3 w-3 text-emerald-500" />
                                        Detected Keywords
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {detectedKeywords.map(kw => {
                                            const isMatched = matchedKeywords.includes(kw);
                                            return (
                                                <span
                                                    key={kw}
                                                    className={`text-[11px] px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 border transition-all ${isMatched
                                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100 shadow-sm'
                                                        : 'bg-rose-50 text-rose-700 border-rose-100 shadow-sm opacity-80'
                                                    }`}
                                                >
                                                    {isMatched ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                                                    {kw}
                                                </span>
                                            )
                                        })}
                                    </div>
                                </div>

                                {missingKeywords.length > 0 && (
                                    <div className="space-y-2">
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-rose-500 flex items-center gap-2">
                                            <AlertCircle className="h-3 w-3" />
                                            Missing from your resume
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {missingKeywords.map(kw => (
                                                <span key={kw} className="text-[11px] px-3 py-1.5 rounded-lg font-bold text-rose-700 bg-rose-50 border border-rose-100 shadow-sm animate-pulse">
                                                    {kw}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Right Panel: Optimization View */}
            <div className="flex-1 flex flex-col bg-white border border-gray-200/60 rounded-2xl shadow-sm overflow-hidden relative">
                {/* Header Actions */}
                <div className="bg-white border-b py-4 px-6 flex justify-between items-center z-10 shrink-0 shadow-sm">
                    <div className="flex flex-col">
                        <h3 className="font-bold text-gray-900">Resume Optimization</h3>
                        <p className="text-xs text-gray-500">Preview your Gemini-optimized resume below</p>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            onClick={handleGenerateOptimized}
                            disabled={!hasAnalyzed || isGenerating}
                            className="border-blue-100 bg-blue-50/50 text-blue-700 font-bold hover:bg-blue-100 h-10 px-5 rounded-xl transition-all"
                        >
                            {isGenerating ? (
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                                <RefreshCcw className="h-4 w-4 mr-2" />
                            )}
                            {isGenerating ? "Gemini is thinking..." : "Generate Optimized Resume"}
                        </Button>
                        <Button
                            onClick={handleDownloadPDF}
                            disabled={!optimizedResume}
                            className="bg-black text-white hover:bg-gray-800 font-bold h-10 px-5 rounded-xl shadow-lg shadow-black/10"
                        >
                            <Download className="h-4 w-4 mr-2" />
                            Export PDF
                        </Button>
                    </div>
                </div>

                {/* Preview Area */}
                <div className="flex-1 overflow-auto p-8 lg:p-12 flex justify-center bg-gray-50/30">
                    <div className="w-full max-w-4xl shadow-2xl bg-white rounded-lg overflow-hidden origin-top scale-[0.85] lg:scale-[0.95] xl:scale-100 transition-transform duration-500">
                        {optimizedResume ? (
                            <div ref={componentRef} className="bg-white print:!shadow-none print:!border-none print:!m-0 print:!p-0">
                                <ResumePreview resume={optimizedResume} />
                            </div>
                        ) : (
                            <div className="w-[210mm] h-[297mm] bg-white rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 p-12 text-center">
                                <FileJson className="h-12 w-12 mb-4 opacity-20" />
                                <h4 className="font-bold text-gray-600 mb-2">Ready to Optimize</h4>
                                <p className="text-sm max-w-xs">Paste a job description and click analyze to see how your resume matches up.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
