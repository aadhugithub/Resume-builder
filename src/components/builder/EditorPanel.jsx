"use client";

import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ProfileForm from "./forms/ProfileForm";
import SummaryForm from "./forms/SummaryForm";
import ExperienceForm from "./forms/ExperienceForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import ProjectsForm from "./forms/ProjectsForm";
import CertificationsForm from "./forms/CertificationsForm";
import DesignForm from "./forms/DesignForm";

export default function EditorPanel() {
    return (
        <div className="flex flex-col h-full bg-white">
            <div className="px-4 py-3 border-b">
                <Tabs defaultValue="content" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="content">Content</TabsTrigger>
                        <TabsTrigger value="design">Design</TabsTrigger>
                    </TabsList>

                    <TabsContent value="content" className="flex-1 h-full mt-0">
                        <ScrollArea className="h-[calc(100vh-140px)]">
                            <div className="p-4 pb-20">
                                <Accordion type="single" collapsible defaultValue="profile" className="w-full space-y-2">

                                    <AccordionItem value="profile" className="border rounded-lg px-4 data-[state=open]:bg-gray-50/50">
                                        <AccordionTrigger className="hover:no-underline py-3">Profile Information</AccordionTrigger>
                                        <AccordionContent className="pt-2 pb-4">
                                            <ProfileForm />
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="summary" className="border rounded-lg px-4 data-[state=open]:bg-gray-50/50">
                                        <AccordionTrigger className="hover:no-underline py-3">Summary</AccordionTrigger>
                                        <AccordionContent className="pt-2 pb-4">
                                            <SummaryForm />
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="experience" className="border rounded-lg px-4 data-[state=open]:bg-gray-50/50">
                                        <AccordionTrigger className="hover:no-underline py-3">Experience</AccordionTrigger>
                                        <AccordionContent className="pt-2 pb-4">
                                            <ExperienceForm />
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="education" className="border rounded-lg px-4 data-[state=open]:bg-gray-50/50">
                                        <AccordionTrigger className="hover:no-underline py-3">Education</AccordionTrigger>
                                        <AccordionContent className="pt-2 pb-4">
                                            <EducationForm />
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="skills" className="border rounded-lg px-4 data-[state=open]:bg-gray-50/50">
                                        <AccordionTrigger className="hover:no-underline py-3">Skills</AccordionTrigger>
                                        <AccordionContent className="pt-2 pb-4">
                                            <SkillsForm />
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="projects" className="border rounded-lg px-4 data-[state=open]:bg-gray-50/50">
                                        <AccordionTrigger className="hover:no-underline py-3">Projects</AccordionTrigger>
                                        <AccordionContent className="pt-2 pb-4">
                                            <ProjectsForm />
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="certifications" className="border rounded-lg px-4 data-[state=open]:bg-gray-50/50">
                                        <AccordionTrigger className="hover:no-underline py-3">Certifications</AccordionTrigger>
                                        <AccordionContent className="pt-2 pb-4">
                                            <CertificationsForm />
                                        </AccordionContent>
                                    </AccordionItem>

                                </Accordion>
                            </div>
                        </ScrollArea>
                    </TabsContent>

                    <TabsContent value="design" className="flex-1 h-full mt-0">
                        <ScrollArea className="h-[calc(100vh-140px)]">
                            <div className="p-4">
                                <DesignForm />
                            </div>
                        </ScrollArea>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
