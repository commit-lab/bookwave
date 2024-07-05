"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { Sheet } from "@mui/joy";
import Toolbar from "@/features/editor/components/toolbar";

const Editor = () => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: testContent,
    editorProps: {
      attributes: {
        class: "tiptap",
      },
    },
  });

  return (
    <>
      <Sheet sx={{ maxWidth: "40rem", p: 4 }}>
        <EditorContent editor={editor} />
      </Sheet>

      <Toolbar editor={editor} />
    </>
  );
};

export default Editor;

const testContent = `
<h1>
  H1 Heading
</h1>
<h2>
  H2 Heading
</h2>
<h3>
  H3 Heading
</h3>
<br/>
<p>
  this is a <em>italic</em> and this is <strong>bold</strong>. 
</p>

<br/>
<p>
 <u> This is underline</u>
</p>

<ul>
  <li>Bullet list</li>
</ul>

<ol>
  <li>list item 1</li>
  <li>list item 2</li>
  <li>list item 3</li>
</ol>

<pre><code> console.log("You make me smile")
</code></pre>

<blockquote>
Here's a blockquote
</blockquote>
`;
