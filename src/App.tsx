import "./styles.css";
import React, { useCallback, useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { FontSize } from "./extensions/FontSizeExtension";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { OrderedList } from "@tiptap/extension-ordered-list";
import { BulletList } from "@tiptap/extension-bullet-list";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Document } from "@tiptap/extension-document";
import { Text } from "@tiptap/extension-text";
import { ListItem } from "@tiptap/extension-list-item";
import CustomKeymap from "./extensions/custom-keymap";

const DEFAULT_CONTENT = `
<p>Line 1.</p>
<p>Line 2.</p>
`;

export default function App() {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      TextStyle,
      FontSize,
      Color,
      BulletList,
      OrderedList,
      ListItem,
      CustomKeymap,
      // HiddenInline,
    ],
    editorProps: {
      attributes: {
        class: "Editor",
      },
    },
    onTransaction(tr) {
      console.log(tr);
    },
    content: DEFAULT_CONTENT,
  });

  return (
    <div className="App">
      <EditorContent editor={editor} />

      <div className="button-bar">
        <button
          onClick={() => {
            if (editor) {
              editor.chain().setColor("blue").focus().run();
            }
          }}
        >
          Blue
        </button>

        <button
          onClick={() => {
            if (editor) {
              editor.chain().setFontSize(48).focus().run();
            }
          }}
        >
          Size: 48
        </button>

        <button
          onClick={() => {
            if (editor) {
              editor.commands.setContent(DEFAULT_CONTENT);
            }
          }}
        >
          Reset
        </button>
      </div>

      <pre className="output">{JSON.stringify(editor?.getJSON(), null, 2)}</pre>
    </div>
  );
}
