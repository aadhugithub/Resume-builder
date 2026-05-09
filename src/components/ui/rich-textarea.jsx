import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Bold, Italic, Link as LinkIcon, List } from "lucide-react";
import { cn } from "@/lib/utils";

export const RichTextarea = React.forwardRef(({ className, value, onChange, ...props }, ref) => {
    const innerRef = useRef(null);
    const textareaRef = ref || innerRef;

    const insertText = (before, after = "") => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value || "";

        const selectedText = text.substring(start, end);
        const newText = text.substring(0, start) + before + selectedText + after + text.substring(end);

        // Create a synthetic event to trigger onChange
        const event = {
            target: {
                value: newText
            }
        };
        if (onChange) onChange(event);

        // Restore cursor position after state update
        setTimeout(() => {
            textarea.focus();
            const newCursorPos = start + before.length + selectedText.length;
            textarea.setSelectionRange(start + before.length, newCursorPos);
        }, 0);
    };

    const handleAction = (e, action) => {
        e.preventDefault();
        if (action === "bold") insertText("**", "**");
        if (action === "italic") insertText("*", "*");
        if (action === "link") insertText("[", "](url)");
        if (action === "list") insertText("• ", "");
    };

    return (
        <div className={cn("flex flex-col border rounded-md shadow-sm bg-white overflow-hidden focus-within:ring-[3px] focus-within:ring-ring/50 focus-within:border-ring transition-[color,box-shadow]", className)}>
            <div className="flex items-center gap-1 border-b p-1 bg-gray-50/80">
                <Button type="button" variant="ghost" size="icon" className="h-7 w-7 text-gray-600 hover:text-gray-900 rounded-sm" onClick={(e) => handleAction(e, "bold")} title="Bold">
                    <Bold className="h-3.5 w-3.5" />
                </Button>
                <Button type="button" variant="ghost" size="icon" className="h-7 w-7 text-gray-600 hover:text-gray-900 rounded-sm" onClick={(e) => handleAction(e, "italic")} title="Italic">
                    <Italic className="h-3.5 w-3.5" />
                </Button>
                <Button type="button" variant="ghost" size="icon" className="h-7 w-7 text-gray-600 hover:text-gray-900 rounded-sm" onClick={(e) => handleAction(e, "link")} title="Link">
                    <LinkIcon className="h-3.5 w-3.5" />
                </Button>
                <div className="w-[1px] h-4 bg-gray-300 mx-1"></div>
                <Button type="button" variant="ghost" size="icon" className="h-7 w-7 text-gray-600 hover:text-gray-900 rounded-sm" onClick={(e) => handleAction(e, "list")} title="Bullet List">
                    <List className="h-3.5 w-3.5" />
                </Button>
            </div>
            <textarea
                ref={textareaRef}
                value={value}
                onChange={onChange}
                className="flex min-h-[120px] w-full resize-y bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-0 focus:ring-0"
                {...props}
            />
        </div>
    );
});
RichTextarea.displayName = "RichTextarea";
