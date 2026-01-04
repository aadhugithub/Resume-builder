"use client";

import React, { useState } from "react";
import { useResume } from "@/lib/resume-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

export default function CertificationsForm() {
    const { resume, dispatch } = useResume();
    const { certifications = [] } = resume;
    const [editingItem, setEditingItem] = useState(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const handleAdd = () => {
        setEditingItem({
            name: "", issuer: "", date: ""
        });
        setIsSheetOpen(true);
    };

    const handleEdit = (item) => {
        setEditingItem({ ...item });
        setIsSheetOpen(true);
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this certification?")) {
            dispatch({ type: "DELETE_ITEM", section: "certifications", id });
        }
    };

    const handleSave = () => {
        if (editingItem.id) {
            dispatch({ type: "UPDATE_ITEM", section: "certifications", id: editingItem.id, payload: editingItem });
        } else {
            dispatch({ type: "ADD_ITEM", section: "certifications", payload: editingItem });
        }
        setIsSheetOpen(false);
        setEditingItem(null);
    };

    return (
        <div className="space-y-4">
            {certifications.map((item) => (
                <Card key={item.id} className="group relative hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <GripVertical className="h-4 w-4 text-gray-300 cursor-move" />
                            <div>
                                <p className="font-semibold text-sm">{item.name || "Untitled Certification"}</p>
                                <p className="text-xs text-gray-500">{item.issuer || "Unknown Issuer"}</p>
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
                <Plus className="h-4 w-4" /> Add Certification
            </Button>

            {/* Edit Sheet */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent className="w-full sm:w-[500px] overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>{editingItem?.id ? "Edit Certification" : "Add Certification"}</SheetTitle>
                        <SheetDescription>
                            List your licenses and certifications.
                        </SheetDescription>
                    </SheetHeader>

                    {editingItem && (
                        <div className="space-y-4 py-6">
                            <div className="space-y-2">
                                <Label>Certification Name</Label>
                                <Input value={editingItem.name} onChange={e => setEditingItem({ ...editingItem, name: e.target.value })} placeholder="AWS Certified Solutions Architect" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Issuer</Label>
                                    <Input value={editingItem.issuer} onChange={e => setEditingItem({ ...editingItem, issuer: e.target.value })} placeholder="Amazon Web Services" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Date</Label>
                                    <Input value={editingItem.date} onChange={e => setEditingItem({ ...editingItem, date: e.target.value })} placeholder="Dec 2023" />
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
