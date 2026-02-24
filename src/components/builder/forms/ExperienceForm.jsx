"use client";

import React, { useState } from "react";
import { useResume } from "@/lib/resume-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    SheetClose
} from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export default function ExperienceForm() {
    const { resume, dispatch } = useResume();
    const { experience } = resume;
    const [editingItem, setEditingItem] = useState(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const handleAdd = () => {
        setEditingItem({
            role: "", company: "", location: "", startDate: "", endDate: "", current: false, description: "", tool: "", tech: ""
        });
        setIsSheetOpen(true);
    };

    const handleEdit = (item) => {
        setEditingItem({ ...item });
        setIsSheetOpen(true);
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this item?")) {
            dispatch({ type: "DELETE_ITEM", section: "experience", id });
        }
    };

    const handleSave = () => {
        if (editingItem.id) {
            dispatch({ type: "UPDATE_ITEM", section: "experience", id: editingItem.id, payload: editingItem });
        } else {
            dispatch({ type: "ADD_ITEM", section: "experience", payload: editingItem });
        }
        setIsSheetOpen(false);
        setEditingItem(null);
    };

    return (
        <div className="space-y-4">
            {experience.map((item) => (
                <Card key={item.id} className="group relative hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <GripVertical className="h-4 w-4 text-gray-300 cursor-move" />
                            <div>
                                <p className="font-semibold text-sm">{item.role || "Untitled Role"}</p>
                                <p className="text-xs text-gray-500">{item.company || "Unknown Company"}</p>
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
                <Plus className="h-4 w-4" /> Add Experience
            </Button>

            {/* Edit Sheet */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent className="w-full sm:w-[500px] overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>{editingItem?.id ? "Edit Experience" : "Add Experience"}</SheetTitle>
                        <SheetDescription>
                            Add details about your professional experience.
                        </SheetDescription>
                    </SheetHeader>

                    {editingItem && (
                        <div className="space-y-6 py-6">
                            {/* Basic Info Box */}
                            <div className="p-4 border rounded-lg bg-gray-50/50 space-y-4">
                                <h4 className="text-xs font-semibold uppercase text-gray-500 tracking-wider mb-2">Basic Info</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Job Title</Label>
                                        <Input value={editingItem.role} onChange={e => setEditingItem({ ...editingItem, role: e.target.value })} placeholder="Product Manager" className="bg-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Company</Label>
                                        <Input value={editingItem.company} onChange={e => setEditingItem({ ...editingItem, company: e.target.value })} placeholder="Acme Inc." className="bg-white" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Location</Label>
                                    <Input value={editingItem.location} onChange={e => setEditingItem({ ...editingItem, location: e.target.value })} placeholder="New York, NY" className="bg-white" />
                                </div>
                            </div>

                            {/* Duration Box */}
                            <div className="p-4 border rounded-lg bg-gray-50/50 space-y-4">
                                <h4 className="text-xs font-semibold uppercase text-gray-500 tracking-wider mb-2">Duration</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Start Date</Label>
                                        <Input value={editingItem.startDate} onChange={e => setEditingItem({ ...editingItem, startDate: e.target.value })} placeholder="Jan 2020" className="bg-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>End Date</Label>
                                        <Input
                                            value={editingItem.endDate}
                                            onChange={e => setEditingItem({ ...editingItem, endDate: e.target.value })}
                                            disabled={editingItem.current}
                                            placeholder="Present"
                                            className="bg-white"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 pt-1">
                                    <Switch
                                        checked={editingItem.current}
                                        onCheckedChange={checked => setEditingItem({ ...editingItem, current: checked, endDate: checked ? "Present" : "" })}
                                    />
                                    <Label>I currently work here</Label>
                                </div>
                            </div>

                            {/* Description Box */}
                            <div className="p-4 border rounded-lg bg-gray-50/50 space-y-4">
                                <h4 className="text-xs font-semibold uppercase text-gray-500 tracking-wider mb-2">Details</h4>
                                <div className="space-y-2 pt-2">
                                    <Label>Description</Label>
                                    <Textarea
                                        value={editingItem.description}
                                        onChange={e => setEditingItem({ ...editingItem, description: e.target.value })}
                                        className="h-32 bg-white"
                                        placeholder="• Key responsibility..."
                                    />
                                    <p className="text-xs text-gray-400">
                                        Tip: Use <b>**text**</b> for bold and <b>[text](url)</b> for links.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <div className="space-y-2">
                                        <Label>Tool</Label>
                                        <Input value={editingItem.tool || ""} onChange={e => setEditingItem({ ...editingItem, tool: e.target.value })} placeholder="e.g. Jira" className="bg-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Tech</Label>
                                        <Input value={editingItem.tech || ""} onChange={e => setEditingItem({ ...editingItem, tech: e.target.value })} placeholder="e.g. React" className="bg-white" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <div className="space-y-2">
                                        <Label>Extra Link Heading</Label>
                                        <Input value={editingItem.extraLinkHeading || ""} onChange={e => setEditingItem({ ...editingItem, extraLinkHeading: e.target.value })} placeholder="Project URL" className="bg-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Extra Link URL</Label>
                                        <Input value={editingItem.extraLinkUrl || ""} onChange={e => setEditingItem({ ...editingItem, extraLinkUrl: e.target.value })} placeholder="https://..." className="bg-white" />
                                    </div>
                                </div>
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
