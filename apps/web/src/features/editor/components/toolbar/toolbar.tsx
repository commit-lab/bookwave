import {
  Code,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  FormatUnderlined,
  TextRotationNone,
} from "@mui/icons-material";
import { Sheet, ToggleButtonGroup } from "@mui/joy";
import { Divider, AppBar, ToggleButton } from "@mui/material";
import { type Editor } from "@tiptap/react";
import React from "react";
import H1HeadingIcon from "@/features/editor/components/toolbar/h1-heading-icon";
import H2HeadingIcon from "@/features/editor/components/toolbar/h2-heading-icon";
import H3HeadingIcon from "@/features/editor/components/toolbar/h3-heading-icon";

export interface ToolbarProps {
  editor?: Editor | null;
}

const Toolbar = (props: ToolbarProps) => {
  const { editor } = props;
  if (!editor) {
    return null;
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        top: "auto",
        bottom: 0,
        backgroundColor: "white",
        boxShadow: "0",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Sheet
        variant="outlined"
        sx={{
          borderRadius: "sm",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 1.5,
          p: 0.5,
          maxWidth: "40rem",
        }}
      >
        <ToggleButtonGroup
          variant="plain"
          spacing={1.5}
          aria-label="text formatting"
        >
          <ToggleButton
            value="bold"
            aria-label="bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
            selected={editor.isActive("bold")}
          >
            <FormatBold />
          </ToggleButton>

          <ToggleButton
            value="italic"
            aria-label="italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            selected={editor.isActive("italic")}
          >
            <FormatItalic />
          </ToggleButton>

          <ToggleButton
            value="underlined"
            aria-label="underlined"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            selected={editor.isActive("underline")}
          >
            <FormatUnderlined />
          </ToggleButton>
        </ToggleButtonGroup>

        <Divider orientation="vertical" variant="middle" flexItem />

        <ToggleButtonGroup
          variant="plain"
          spacing={1.5}
          aria-label="heading styles"
        >
          <ToggleButton
            value="h1"
            aria-label="h1"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            selected={editor.isActive("heading", { level: 1 })}
          >
            <H1HeadingIcon />
          </ToggleButton>
          <ToggleButton
            value="h2"
            aria-label="h2"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            selected={editor.isActive("heading", { level: 2 })}
          >
            <H2HeadingIcon />
          </ToggleButton>
          <ToggleButton
            value="h3"
            aria-label="h3"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            selected={editor.isActive("heading", { level: 3 })}
          >
            <H3HeadingIcon />
          </ToggleButton>
        </ToggleButtonGroup>
        <Divider orientation="vertical" variant="middle" flexItem />

        <ToggleButtonGroup
          variant="plain"
          spacing={1.5}
          aria-label="list formatting"
        >
          <ToggleButton
            value="bulletList"
            aria-label="bulletList"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            selected={editor.isActive("bulletList")}
          >
            <FormatListBulleted />
          </ToggleButton>
          <ToggleButton
            value="orderedList"
            aria-label="orderedList"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            selected={editor.isActive("orderedList")}
          >
            <FormatListNumbered />
          </ToggleButton>
        </ToggleButtonGroup>

        <Divider orientation="vertical" variant="middle" flexItem />

        <ToggleButtonGroup
          variant="plain"
          spacing={1.5}
          aria-label="code and blockquote formatting"
        >
          <ToggleButton
            value="monospace"
            aria-label="monospace"
            onClick={() => {
              editor
                .chain()
                .focus()
                .toggleMark("textStyle", { fontFamily: "monospace" })
                .run();
            }}
            selected={editor.isActive("textStyle")}
          >
            <TextRotationNone />
          </ToggleButton>
          <ToggleButton
            value="blockquote"
            aria-label="blockquote"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            selected={editor.isActive("blockquote")}
          >
            <FormatQuote />
          </ToggleButton>
          <ToggleButton
            value="codeBlock"
            aria-label="codeBlock"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            selected={editor.isActive("codeBlock")}
          >
            <Code />
          </ToggleButton>
        </ToggleButtonGroup>
      </Sheet>
    </AppBar>
  );
};

export default Toolbar;
