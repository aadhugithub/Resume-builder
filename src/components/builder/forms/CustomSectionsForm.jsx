"use client";

import React, { useState } from "react";
import { useResume } from "@/lib/resume-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

export default function CustomSectionsForm() {
    const { resume, dispatch } = useResume();
    const { custom } = resume;
    const [editingItem, setEditingItem] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleAdd = () => {
        setEditingItem({
            title: "",
            content: "",
            type: "text" // text or list
        });
        setIsDialogOpen(true);
    };

    const handleEdit = (item) => {
        setEditingItem({ ...item });
        setIsDialogOpen(true);
    };

    const handleDelete = (id) => {
        if (confirm("Delete this custom section?")) {
            dispatch({ type: "DELETE_ITEM", section: "custom", id });
        }
    };

    const handleSave = () => {
        if (!editingItem.title.trim()) {
            alert("Please enter a section title");
            return;
        }

        if (editingItem.id) {
            dispatch({
                type: "UPDATE_ITEM",
                section: "custom",
                id: editingItem.id,
                payload: editingItem
            });
        } else {
            dispatch({ type: "ADD_ITEM", section: "custom", payload: editingItem });
        }
        setIsDialogOpen(false);
        setEditingItem(null);
    };

    return (
        <div className="space-y-4">
            {custom && custom.map((item) => (
                <Card key={item.id} className="group hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                    <GripVertical className="h-4 w-4 text-gray-400" />
                                    <span className="font-semibold text-sm">{item.title}</span>
                                </div>
                                <p className="text-xs text-gray-600 line-clamp-2">
                                    {item.content}
                                </p>
                            </div>
                            <div className="flex gap-1 shrink-0">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => handleEdit(item)}
                                >
                                    <Pencil className="h-3 w-3" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 text-red-500"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    <Trash2 className="h-3 w-3" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}

            <Button onClick={handleAdd} className="w-full gap-2" variant="outline">
                <Plus className="h-4 w-4" /> Add Custom Section
            </Button>

            {/* Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>
                            {editingItem?.id ? "Edit Custom Section" : "Add Custom Section"}
                        </DialogTitle>
                    </DialogHeader>

                    {editingItem && (
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>Section Title *</Label>
                                <Input
                                    value={editingItem.title}
                                    onChange={e => setEditingItem({ ...editingItem, title: e.target.value })}
                                    placeholder="e.g. Languages, Volunteer Work, Publications"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Content Type</Label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="contentType"
                                            value="text"
                                            checked={editingItem.type === "text"}
                                            onChange={e => setEditingItem({ ...editingItem, type: e.target.value })}
                                            className="w-4 h-4"
                                        />
                                        <span className="text-sm">Paragraph</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="contentType"
                                            value="list"
                                            checked={editingItem.type === "list"}
                                            onChange={e => setEditingItem({ ...editingItem, type: e.target.value })}
                                            className="w-4 h-4"
                                        />
                                        <span className="text-sm">Bullet List</span>
                                    </label>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>
                                    Content *
                                    {editingItem.type === "list" && (
                                        <span className="text-xs text-gray-500 ml-2">
                                            (One item per line)
                                        </span>
                                    )}
                                </Label>
                                <Textarea
                                    value={editingItem.content}
                                    onChange={e => setEditingItem({ ...editingItem, content: e.target.value })}
                                    placeholder={
                                        editingItem.type === "list"
                                            ? "Enter each item on a new line...\nItem 1\nItem 2\nItem 3"
                                            : "Enter your content here..."
                                    }
                                    rows={8}
                                    className="resize-none"
                                />
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave}>Save Section</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
