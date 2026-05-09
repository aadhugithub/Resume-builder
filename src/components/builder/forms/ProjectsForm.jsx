"use client";

import React, { useState } from "react";
import { useResume } from "@/lib/resume-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RichTextarea } from "@/components/ui/rich-textarea";
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetFooter,
    SheetClose
} from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";

export default function ProjectsForm() {
    const { resume, dispatch } = useResume();
    const { projects = [] } = resume; // Default to empty array if undefined
    const [editingItem, setEditingItem] = useState(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const handleAdd = () => {
        setEditingItem({
            name: "", link: "", date: "", tools: "", description: ""
        });
        setIsSheetOpen(true);
    };

    const handleEdit = (item) => {
        setEditingItem({ ...item });
        setIsSheetOpen(true);
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this project?")) {
            dispatch({ type: "DELETE_ITEM", section: "projects", id });
        }
    };

    const handleSave = () => {
        if (editingItem.id) {
            dispatch({ type: "UPDATE_ITEM", section: "projects", id: editingItem.id, payload: editingItem });
        } else {
            dispatch({ type: "ADD_ITEM", section: "projects", payload: editingItem });
        }
        setIsSheetOpen(false);
        setEditingItem(null);
    };

    return (
        <div className="space-y-4">
            {projects.map((item) => (
                <Card key={item.id} className="group relative hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <GripVertical className="h-4 w-4 text-gray-300 cursor-move" />
                            <div>
                                <p className="font-semibold text-sm">{item.name || "Untitled Project"}</p>
                                <p className="text-xs text-gray-500">{item.tools || "No tools specified"}</p>
                            </div>
                        </div>
                        <div className="flex gap-1">
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                                <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => handleDelete(item.id)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}

            <Button onClick={handleAdd} className="w-full gap-2" variant="outline">
                <Plus className="h-4 w-4" /> Add Project
            </Button>

            {/* Edit Sheet */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent className="w-full sm:w-[500px] overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>{editingItem?.id ? "Edit Project" : "Add Project"}</SheetTitle>
                        <SheetDescription>
                            Showcase your best work.
                        </SheetDescription>
                    </SheetHeader>

                    {editingItem && (
                        <div className="space-y-4 py-6">
                            <div className="space-y-2">
                                <Label>Project Name</Label>
                                <Input value={editingItem.name} onChange={e => setEditingItem({ ...editingItem, name: e.target.value })} placeholder="E-Commerce App" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Date</Label>
                                    <Input value={editingItem.date} onChange={e => setEditingItem({ ...editingItem, date: e.target.value })} placeholder="Jan 2024" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Link</Label>
                                    <Input value={editingItem.link} onChange={e => setEditingItem({ ...editingItem, link: e.target.value })} placeholder="https://github.com/..." />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Tools / Tech Stack</Label>
                                <Input value={editingItem.tools} onChange={e => setEditingItem({ ...editingItem, tools: e.target.value })} placeholder="React, Node.js, MongoDB" />
                            </div>

                            <div className="space-y-2">
                                <Label>Description</Label>
                                <RichTextarea
                                    value={editingItem.description}
                                    onChange={e => setEditingItem({ ...editingItem, description: e.target.value })}
                                    className="h-32"
                                    placeholder="• Key featues..."
                                />
                                <p className="text-xs text-gray-400">
                                    Tip: Use <b>**text**</b> for bold and <b>[text](url)</b> for links.
                                </p>
                            </div>
                        </div>
                    )}

                    <SheetFooter>
                        <SheetClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </SheetClose>
                        <Button onClick={handleSave}>Save Changes</Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
}
