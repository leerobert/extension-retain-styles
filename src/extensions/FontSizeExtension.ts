import { Extension } from "@tiptap/core";

import StarterKit from "@tiptap/starter-kit";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (fontSize: number) => ReturnType;
      unsetFontSize: () => ReturnType;
    };
  }
}

const DEFAULT_FONT_SIZE = 20;

export const FontSize = Extension.create({
  name: "fontSize",

  addOptions() {
    // if you wanna store the marks globally..
    return { types: ["textStyle", "paragraph"] };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null, // DEFAULT_FONT_SIZE,
            isRequired: false,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }

              return {
                style: `font-size: ${attributes.fontSize}px`,
              };
            },
            parseHTML: (element) => {
              try {
                const fontSizeStyle =
                  element.style.getPropertyValue("font-size");
                const fontSize = fontSizeStyle.match(/\d+/);
                return fontSize ? parseFloat(fontSize[0]) : null; // DEFAULT_FONT_SIZE;
              } catch (e) {
                // Fallback in case of an error
                return null; // DEFAULT_FONT_SIZE;
              }
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSize:
        (fontSize) =>
        ({ commands }) => {
          return commands.setMark("textStyle", { fontSize });
        },

      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain()
            .setFontSize(DEFAULT_FONT_SIZE)
            .removeEmptyTextStyle()
            .run();
        },
    };
  },
});
