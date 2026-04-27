"use client";

import React, { useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FileUp, Loader2, Sparkles } from "lucide-react";
import ProfileForm from "./forms/ProfileForm";
import SummaryForm from "./forms/SummaryForm";
import ExperienceForm from "./forms/ExperienceForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import ProjectsForm from "./forms/ProjectsForm";
import CertificationsForm from "./forms/CertificationsForm";
import CustomSectionsForm from "./forms/CustomSectionsForm";
import DesignForm from "./forms/DesignForm";
import { extractTextFromFile } from "@/utils/fileParser";
import { parseResumeFromFile } from "@/services/geminiService";
import { useResume } from "@/lib/resume-store";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

export default function EditorPanel() {
    const { dispatch } = useResume();
    const [isImporting, setIsImporting] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileImport = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsImporting(true);
        const toastId = toast.loading("Extracting text and analyzing with AI...");

        try {
            // 1. Extract text from file
            const rawText = await extractTextFromFile(file);
            
            // 2. Parse with Gemini
            const parsedData = await parseResumeFromFile(rawText);

            // 3. Add IDs to the lists
            const finalizedData = {
                ...parsedData,
                experience: (parsedData.experience || []).map(item => ({ ...item, id: uuidv4() })),
                education: (parsedData.education || []).map(item => ({ ...item, id: uuidv4() })),
                projects: (parsedData.projects || []).map(item => ({ ...item, id: uuidv4() })),
                skills: (parsedData.skills || []).map(item => ({ ...item, id: uuidv4() })),
                certifications: (parsedData.certifications || []).map(item => ({ ...item, id: uuidv4() })),
            };

            // 4. Update the store
            dispatch({ type: "LOAD_ACTIVE_DATA", payload: finalizedData });
            
            toast.success("Resume imported successfully!", { id: toastId });
        } catch (error) {
            console.error("Import error:", error);
            toast.error(error.message || "Failed to import resume. Please try again.", { id: toastId });
        } finally {
            setIsImporting(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    return (
        <div className="flex flex-col h-full bg-white">
            <div className="px-4 py-3 border-b bg-gray-50/50">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-tight">Editor</h2>
                    <div className="flex gap-2">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileImport}
                            accept=".pdf,.docx,.txt"
                            className="hidden"
                        />
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={isImporting}
                            onClick={() => fileInputRef.current.click()}
                            className="text-xs font-bold border-blue-100 bg-blue-50/50 text-blue-700 hover:bg-blue-100 transition-all gap-1.5 rounded-lg h-8"
                        >
                            {isImporting ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                                <FileUp className="h-3.5 w-3.5" />
                            )}
                            {isImporting ? "Parsing..." : "Import from File"}
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="content" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 p-1 bg-gray-100 rounded-xl">
                        <TabsTrigger value="content" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Content</TabsTrigger>
                        <TabsTrigger value="design" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Design</TabsTrigger>
                    </TabsList>

                    <TabsContent value="content" className="flex-1 h-full mt-4">
                        <ScrollArea className="h-[calc(100vh-210px)]">
                            <div className="pb-20 space-y-2">
                                <Accordion type="single" collapsible defaultValue="profile" className="w-full space-y-2">

                                    <AccordionItem value="profile" className="border border-gray-100 rounded-xl px-4 data-[state=open]:bg-gray-50/30 transition-all shadow-sm">
                                        <AccordionTrigger className="hover:no-underline py-4 font-bold text-sm text-gray-700">Profile Information</AccordionTrigger>
                                        <AccordionContent className="pt-2 pb-4">
                                            <ProfileForm />
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="summary" className="border border-gray-100 rounded-xl px-4 data-[state=open]:bg-gray-50/30 transition-all shadow-sm">
                                        <AccordionTrigger className="hover:no-underline py-4 font-bold text-sm text-gray-700">Professional Summary</AccordionTrigger>
                                        <AccordionContent className="pt-2 pb-4">
                                            <SummaryForm />
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="experience" className="border border-gray-100 rounded-xl px-4 data-[state=open]:bg-gray-50/30 transition-all shadow-sm">
                                        <AccordionTrigger className="hover:no-underline py-4 font-bold text-sm text-gray-700">Work Experience</AccordionTrigger>
                                        <AccordionContent className="pt-2 pb-4">
                                            <ExperienceForm />
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="education" className="border border-gray-100 rounded-xl px-4 data-[state=open]:bg-gray-50/30 transition-all shadow-sm">
                                        <AccordionTrigger className="hover:no-underline py-4 font-bold text-sm text-gray-700">Education</AccordionTrigger>
                                        <AccordionContent className="pt-2 pb-4">
                                            <EducationForm />
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="skills" className="border border-gray-100 rounded-xl px-4 data-[state=open]:bg-gray-50/30 transition-all shadow-sm">
                                        <AccordionTrigger className="hover:no-underline py-4 font-bold text-sm text-gray-700">Skills & Expertise</AccordionTrigger>
                                        <AccordionContent className="pt-2 pb-4">
                                            <SkillsForm />
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="projects" className="border border-gray-100 rounded-xl px-4 data-[state=open]:bg-gray-50/30 transition-all shadow-sm">
                                        <AccordionTrigger className="hover:no-underline py-4 font-bold text-sm text-gray-700">Key Projects</AccordionTrigger>
                                        <AccordionContent className="pt-2 pb-4">
                                            <ProjectsForm />
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="certifications" className="border border-gray-100 rounded-xl px-4 data-[state=open]:bg-gray-50/30 transition-all shadow-sm">
                                        <AccordionTrigger className="hover:no-underline py-4 font-bold text-sm text-gray-700">Certifications</AccordionTrigger>
                                        <AccordionContent className="pt-2 pb-4">
                                            <CertificationsForm />
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="custom" className="border border-gray-100 rounded-xl px-4 data-[state=open]:bg-gray-50/30 transition-all shadow-sm">
                                        <AccordionTrigger className="hover:no-underline py-4 font-bold text-sm text-gray-700">Custom Sections</AccordionTrigger>
                                        <AccordionContent className="pt-2 pb-4">
                                            <CustomSectionsForm />
                                        </AccordionContent>
                                    </AccordionItem>

                                </Accordion>
                            </div>
                        </ScrollArea>
                    </TabsContent>

                    <TabsContent value="design" className="flex-1 h-full mt-4">
                        <ScrollArea className="h-[calc(100vh-210px)]">
                            <div className="space-y-4">
                                <DesignForm />
                            </div>
                        </ScrollArea>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
