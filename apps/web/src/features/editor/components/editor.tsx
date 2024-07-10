"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { Sheet } from "@mui/joy";
import Toolbar from "@/features/editor/components/toolbar";

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
    extensions: [StarterKit, Underline],
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
    <>
      <Sheet sx={{ p: 4 }}>
        <EditorContent editor={editor} />
      </Sheet>

      <Toolbar editor={editor} />
    </>
  );
};

export default Editor;
