"use client";

import { ResumeProvider } from "@/lib/resume-store";
import dynamic from "next/dynamic";

const BuilderLayout = dynamic(() => import("@/components/builder/BuilderLayout"), {
  ssr: false,
});

export default function BuilderPage() {
    return (
        <ResumeProvider>
            <BuilderLayout />
        </ResumeProvider>
    );
}
