# README

## Context

mmm.page uses the TipTap editor, and there are a few bugs I want resolved.
This will be the beginner task -- very tightly-scoped, and without external dependencies.
Everything you need should be in this sandbox.

## Issue

I want the text editing to work like Google Slides.
Specifically, for this task, I want a way to "preserve text styles/marks" on empty lines.

## Specification

_Hit `Reset` button to, well, reset styles._

1. **Preserve text marks on empty lines.** Go to end of "Line 2". Click "Size: 48" button to style it. Hit enter once. You should be on a new line, but that new line's blinking cursor is /not/ size 48, so when you type, it jumps. I want the blinking cursor to be size 48.
2. **Ability to "recover" styles from empty lines.** Go to end of "Line 2". Click "Size: 48" button to style it. Hit enter, then hit enter, and type. You should have four total lines, and the fourth line should be styled. But if you click back to line 3, it will not hold the font-size: 48 styling.
3. **Keep all styles on select all text and delete.** When you select all text and delete, I want the style of the {first line} to preserve. Right now, after you delete all and type, it will fallback to unstyled text.
4. **Keep styles on bullet disc.** Turn Line 2 "blue" and "size 48. Now enter new line, type in `*` to create a bullet list. Notice the text is blue and size 48, but the bullet point isn't either. I want the list bullet to be styled.
5. **Keep styles when exiting list item.** Take the list item from step 4. Hit new line. Notice how it loses style? I want it to retain style.

## Ideas

- I think a lot of these issues would be solved if there were some kind of `StyledBreak` node/extension, which held -- but doesn't render -- the styles (except for maybe `font-size`, so that the cursor is the correct height).
