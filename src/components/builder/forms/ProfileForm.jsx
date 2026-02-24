"use client";

import React from "react";
import { useResume } from "@/lib/resume-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfileForm() {
    const { resume, dispatch } = useResume();
    const { profile } = resume;

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({
            type: "UPDATE_PROFILE",
            payload: { [name]: value },
        });
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                        id="name"
                        name="name"
                        value={profile.name || ""}
                        onChange={handleChange}
                        placeholder="John Doe"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input
                        id="title"
                        name="title"
                        value={profile.title || ""}
                        onChange={handleChange}
                        placeholder="Software Engineer"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            value={profile.email || ""}
                            onChange={handleChange}
                            placeholder="john@example.com"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            name="phone"
                            value={profile.phone || ""}
                            onChange={handleChange}
                            placeholder="(555) 123-4567"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                        id="location"
                        name="location"
                        value={profile.location || ""}
                        onChange={handleChange}
                        placeholder="San Francisco, CA"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="website">Website (Optional)</Label>
                    <Input
                        id="website"
                        name="website"
                        value={profile.website || ""}
                        onChange={handleChange}
                        placeholder="johndoe.com"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn (Optional)</Label>
                    <Input
                        id="linkedin"
                        name="linkedin"
                        value={profile.linkedin || ""}
                        onChange={handleChange}
                        placeholder="linkedin.com/in/johndoe"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="github">GitHub (Optional)</Label>
                    <Input
                        id="github"
                        name="github"
                        value={profile.github || ""}
                        onChange={handleChange}
                        placeholder="github.com/johndoe"
                    />
                </div>
            </div>
        </div>
    );
}
