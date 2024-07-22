"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { FontFamily } from "@tiptap/extension-font-family";
import Toolbar from "@/features/editor/components/toolbar/toolbar";

interface EditorProps {
  content: string;
  onChange: (value: string) => void;
  contentRecentlyChanged: boolean;
  setContentRecentlyChanged: React.Dispatch<React.SetStateAction<boolean>>;
}
const Editor = (props: EditorProps) => {
  const {
    content,
    onChange,
    contentRecentlyChanged,
    setContentRecentlyChanged,
  } = props;

  const editor = useEditor({
    extensions: [StarterKit, Underline, TextStyle, FontFamily],
    content,
    editorProps: {
      attributes: {
        class: "tiptap",
      },
    },
    onUpdate: ({ editor: richTextEditor }) => {
      if (!contentRecentlyChanged) {
        setContentRecentlyChanged(true);
      }
      onChange(richTextEditor.getHTML());
    },
  });

  return (
    <EditorContent editor={editor}>
      <Toolbar editor={editor} />
    </EditorContent>
  );
};

export default Editor;
