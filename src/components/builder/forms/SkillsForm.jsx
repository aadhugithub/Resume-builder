"use client";

import React, { useState } from "react";
import { useResume } from "@/lib/resume-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SkillsForm() {
    const { resume, dispatch } = useResume();
    const { skills } = resume;
    const [editingItem, setEditingItem] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newItem, setNewItem] = useState("");

    const handleAdd = () => {
        setEditingItem({ category: "Languages", items: [] });
        setIsDialogOpen(true);
    };

    const handleEdit = (item) => {
        setEditingItem({ ...item });
        setIsDialogOpen(true);
    };

    const handleDelete = (id) => {
        if (confirm("Delete this skill category?")) {
            dispatch({ type: "DELETE_ITEM", section: "skills", id });
        }
    };

    const handleSave = () => {
        if (editingItem.id) {
            dispatch({ type: "UPDATE_ITEM", section: "skills", id: editingItem.id, payload: editingItem });
        } else {
            dispatch({ type: "ADD_ITEM", section: "skills", payload: editingItem });
        }
        setIsDialogOpen(false);
        setEditingItem(null);
    };

    const addSkillItem = (e) => {
        if (e.key === "Enter" && newItem.trim()) {
            setEditingItem({
                ...editingItem,
                items: [...(editingItem.items || []), newItem.trim()]
            });
            setNewItem("");
        }
    };

    const removeSkillItem = (index) => {
        const newItems = [...editingItem.items];
        newItems.splice(index, 1);
        setEditingItem({ ...editingItem, items: newItems });
    };

    return (
        <div className="space-y-4">
            {skills.map((item) => (
                <Card key={item.id} className="group hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-sm">{item.category}</span>
                            <div className="flex gap-1">
                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleEdit(item)}>
                                    <Pencil className="h-3 w-3" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500" onClick={() => handleDelete(item.id)}>
                                    <Trash2 className="h-3 w-3" />
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                            {item.items && item.items.map((skill, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs font-normal">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            ))}

            <Button onClick={handleAdd} className="w-full gap-2" variant="outline">
                <Plus className="h-4 w-4" /> Add Skill Category
            </Button>

            {/* Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingItem?.id ? "Edit Skills" : "Add Skills"}</DialogTitle>
                    </DialogHeader>

                    {editingItem && (
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>Category Name</Label>
                                <Input
                                    value={editingItem.category}
                                    onChange={e => setEditingItem({ ...editingItem, category: e.target.value })}
                                    placeholder="e.g. Frontend, Languages, Tools"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Skills (Press Enter to add)</Label>
                                <Input
                                    value={newItem}
                                    onChange={e => setNewItem(e.target.value)}
                                    onKeyDown={addSkillItem}
                                    placeholder="Type skill and press Enter..."
                                />
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {editingItem.items?.map((skill, idx) => (
                                        <Badge key={idx} className="gap-1 pr-1">
                                            {skill}
                                            <span className="cursor-pointer hover:text-red-200" onClick={() => removeSkillItem(idx)}>
                                                <X className="h-3 w-3" />
                                            </span>
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleSave}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
