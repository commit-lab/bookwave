import {
  Code,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  FormatUnderlined,
} from "@mui/icons-material";
import { Divider, Sheet, SvgIcon, ToggleButtonGroup } from "@mui/joy";
import { ToggleButton } from "@mui/material";
import { type Editor } from "@tiptap/react";
import React from "react";

export interface ToolbarProps {
  className?: string;
  editor?: Editor | null;
}

const Toolbar = (props: ToolbarProps) => {
  const { editor } = props;
  if (!editor) {
    return null;
  }
  return (
    <Sheet
      variant="outlined"
      sx={{
        borderRadius: "md",
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

      <Divider
        orientation="vertical"
        sx={{ height: "60%", alignSelf: "center" }}
      />

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
          <SvgIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#666666"
              viewBox="0 0 16 16"
            >
              <path d="M8.637 13V3.669H7.379V7.62H2.758V3.67H1.5V13h1.258V8.728h4.62V13h1.259zm5.329 0V3.669h-1.244L10.5 5.316v1.265l2.16-1.565h.062V13h1.244z" />{" "}
            </svg>
          </SvgIcon>
        </ToggleButton>
        <ToggleButton
          value="h2"
          aria-label="h2"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          selected={editor.isActive("heading", { level: 2 })}
        >
          <SvgIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="#666666"
            >
              <path d="M7.638 13V3.669H6.38V7.62H1.759V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.022-6.733v-.048c0-.889.63-1.668 1.716-1.668.957 0 1.675.608 1.675 1.572 0 .855-.554 1.504-1.067 2.085l-3.513 3.999V13H15.5v-1.094h-4.245v-.075l2.481-2.844c.875-.998 1.586-1.784 1.586-2.953 0-1.463-1.155-2.556-2.919-2.556-1.941 0-2.966 1.326-2.966 2.74v.049h1.223z" />{" "}
            </svg>
          </SvgIcon>
        </ToggleButton>
        <ToggleButton
          value="h3"
          aria-label="h3"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          selected={editor.isActive("heading", { level: 3 })}
        >
          <SvgIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#666666"
              viewBox="0 0 16 16"
            >
              <path d="M7.637 13V3.669H6.379V7.62H1.758V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.625-4.272h1.018c1.142 0 1.935.67 1.949 1.674.013 1.005-.78 1.737-2.01 1.73-1.08-.007-1.853-.588-1.935-1.32H9.108c.069 1.327 1.224 2.386 3.083 2.386 1.935 0 3.343-1.155 3.309-2.789-.027-1.51-1.251-2.16-2.037-2.249v-.068c.704-.123 1.764-.91 1.723-2.229-.035-1.353-1.176-2.4-2.954-2.385-1.873.006-2.857 1.162-2.898 2.358h1.196c.062-.69.711-1.299 1.696-1.299.998 0 1.695.622 1.695 1.525.007.922-.718 1.592-1.695 1.592h-.964v1.074z" />{" "}
            </svg>
          </SvgIcon>
        </ToggleButton>
      </ToggleButtonGroup>
      <Divider
        orientation="vertical"
        sx={{ height: "60%", alignSelf: "center" }}
      />

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

      <Divider
        orientation="vertical"
        sx={{ height: "60%", alignSelf: "center" }}
      />
      <ToggleButtonGroup
        variant="plain"
        spacing={1.5}
        aria-label="code and blockquote formatting"
      >
        <ToggleButton
          value="codeBlock"
          aria-label="codeBlock"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          selected={editor.isActive("codeBlock")}
        >
          <Code />
        </ToggleButton>

        <ToggleButton
          value="blockquote"
          aria-label="blockquote"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          selected={editor.isActive("blockquote")}
        >
          <FormatQuote />
        </ToggleButton>
      </ToggleButtonGroup>
    </Sheet>
  );
};

export default Toolbar;
