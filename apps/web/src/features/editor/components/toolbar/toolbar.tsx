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
import { Sheet } from "@mui/joy";
import { Divider, Paper } from "@mui/material";
import { type Editor } from "@tiptap/react";
import React from "react";
import H1HeadingIcon from "@/features/editor/components/toolbar/h1-heading-icon";
import H2HeadingIcon from "@/features/editor/components/toolbar/h2-heading-icon";
import H3HeadingIcon from "@/features/editor/components/toolbar/h3-heading-icon";
import MenuButton from "@/features/editor/components/toolbar/menu-button";
import MenuButtonGroup from "@/features/editor/components/toolbar/menu-button-group";

export interface ToolbarProps {
  editor?: Editor | null;
}

const Toolbar = (props: ToolbarProps) => {
  const { editor } = props;
  if (!editor) {
    return null;
  }

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        boxShadow: "none",
      }}
    >
      <Sheet
        variant="outlined"
        sx={{
          borderRadius: 0,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
          p: 1,
          maxWidth: "40rem",
        }}
      >
        <MenuButtonGroup ariaLabel="text formatting">
          <MenuButton
            title="Bold"
            value="bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
            selected={editor.isActive("bold")}
          >
            {" "}
            <FormatBold />
          </MenuButton>

          <MenuButton
            title="Underline"
            value="underline"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            selected={editor.isActive("underline")}
          >
            {" "}
            <FormatUnderlined />
          </MenuButton>

          <MenuButton
            title="Italic"
            value="italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            selected={editor.isActive("italic")}
          >
            {" "}
            <FormatItalic />
          </MenuButton>
        </MenuButtonGroup>

        <Divider orientation="vertical" variant="middle" flexItem />

        <MenuButtonGroup ariaLabel="heading styles">
          <MenuButton
            title="Heading 1"
            value="h1"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            selected={editor.isActive("heading", { level: 1 })}
          >
            {" "}
            <H1HeadingIcon />
          </MenuButton>

          <MenuButton
            title="Heading 2"
            value="h2"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            selected={editor.isActive("heading", { level: 2 })}
          >
            {" "}
            <H2HeadingIcon />
          </MenuButton>

          <MenuButton
            title="Heading 3"
            value="h3"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            selected={editor.isActive("heading", { level: 3 })}
          >
            {" "}
            <H3HeadingIcon />
          </MenuButton>
        </MenuButtonGroup>
        <Divider orientation="vertical" variant="middle" flexItem />

        <MenuButtonGroup ariaLabel="list formatting">
          <MenuButton
            title="Bullet List"
            value="bulletList"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            selected={editor.isActive("bulletList")}
          >
            {" "}
            <FormatListBulleted />
          </MenuButton>

          <MenuButton
            title="Ordered List"
            value="orderedList"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            selected={editor.isActive("orderedList")}
          >
            {" "}
            <FormatListNumbered />
          </MenuButton>
        </MenuButtonGroup>

        <Divider orientation="vertical" variant="middle" flexItem />

        <MenuButtonGroup ariaLabel="code and blockquote formatting">
          <MenuButton
            title="Monospace"
            value="monospace"
            onClick={() => {
              editor
                .chain()
                .focus()
                .toggleMark("textStyle", { fontFamily: "monospace" })
                .run();
            }}
            selected={editor.isActive("textStyle")}
          >
            {" "}
            <TextRotationNone />
          </MenuButton>

          <MenuButton
            title="Blockquote"
            value="blockquote"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            selected={editor.isActive("blockquote")}
          >
            {" "}
            <FormatQuote />
          </MenuButton>

          <MenuButton
            title="Code"
            value="code"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            selected={editor.isActive("codeBlock")}
          >
            {" "}
            <Code />
          </MenuButton>
        </MenuButtonGroup>
      </Sheet>
    </Paper>
  );
};

export default Toolbar;
