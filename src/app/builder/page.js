"use client";

import { ResumeProvider } from "@/lib/resume-store";
import BuilderLayout from "@/components/builder/BuilderLayout";

export default function BuilderPage() {
    return (
        <ResumeProvider>
            <BuilderLayout />
        </ResumeProvider>
    );
}
