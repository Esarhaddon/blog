// @flow

import { html, task, signal } from "aspen";
import { $isMobile } from "../design-tokens.js";

/*::
type Snippet = {
  language: "css" | "js" | "html",
  show: boolean,
  value: string,
};
*/

export function trimIndent(text /*: string */) {
  const lines = text.split("\n");
  const minIndent = Math.min(
    ...lines
      .filter((line) => Boolean(line.trim()))
      .map((line) => line.match(/[^ ]/)?.index ?? line.length),
  );

  return lines
    .slice(lines.findIndex((line) => Boolean(line)))
    .map((line) => line.slice(minIndent))
    .join("\n")
    .trimEnd();
}

export function InteractiveExample(
  { snippets } /*: { snippets: Snippet[] } */,
) {
  const $snippets = signal(
    snippets.map((snippet) => ({
      ...snippet,
      value: trimIndent(snippet.value),
    })),
  );

  const { val: iframeId } = signal(Math.random() * 1_000_000);

  // TODO: For some reason srcdoc can't be set directly below
  task(() => {
    const iframeElement = document.getElementById(iframeId);

    if (iframeElement instanceof HTMLIFrameElement) {
      iframeElement.srcdoc = trimIndent(`
        <!doctype html>
        <html>
          <head>
            <title>test doc</title>
            <style>
              html, body {
                padding: 0;
                margin: 0;
              }

              ${$snippets.val
                .filter((snippet) => snippet.language === "css")
                .map((snippet) => snippet.value)
                .join("\n\n")}
            </style>
          </head>
          <body>
            ${$snippets.val
              .filter((snippet) => snippet.language === "html")
              .map((snippet) => snippet.value)
              .join("\n")}
            ${$snippets.val
              .filter((snippet) => snippet.language === "js")
              .map((snippet) => `<script>${snippet.value}</script>`)
              .join("\n")}
          </body>
        </html>
      `);
    }
  });

  return html`
    <div
      style=${`
        display: flex;
        justify-content: center;
      `}
    >
      <div
        style=${`
          box-sizing: border-box;
          max-width: calc(100vw - 24px);
          flex-shrink: 0;
          width: 100%;
          display: flex;
          flex-direction: ${$isMobile.val ? "column-reverse" : "row"} ;
          gap: 16px;
          border-radius: 4px;
          border: 1px solid #C3C7CB;
          padding: 16px;
        `}
      >
        <div
          style="
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 16px;
            min-width: 0;
          "
        >
          ${$snippets.val
            .filter((snippet) => snippet.show)
            .map(
              (snippet, i) => html(Symbol())`
              <Snippet $snippet=${snippet}/>
            `,
            )}
        </div>
        <div
          style=${`
            background-color: #C3C7CB;
            ${
              $isMobile.val
                ? `
                   height: 1px;
                   margin-inline: 16px;
                 `
                : `
                    width: 1px;
                    margin-block: 16px;
                  `
            }
          `}
        ></div>
        <iframe
          style=${`
            flex: 1;
            min-height: ${$isMobile.val ? "274px" : 0};
            border: none;
          `}
          id=${iframeId}
        ></iframe>
      </div>
    </div>
  `;
}

export function Snippet({ $snippet } /*: { $snippet:  Snippet } */) {
  const $textareaInitialized = signal(false);

  // TODO: you need some kind of ref mechanism
  const { val: textareaId } = signal(Math.random() * 1_000_000);
  const { val: codeId } = signal(Math.random() * 1_000_000);

  const lineHeight = 19;
  const fontSize = 14;
  const padding = 16;

  // TODO: add support for controlling textareas with signals
  task(function initializeTextarea() {
    const textareaElement = document.getElementById(textareaId);

    if (
      !$textareaInitialized.val &&
      textareaElement instanceof HTMLTextAreaElement
    ) {
      textareaElement.value = $snippet.value;
      $textareaInitialized.val = true;
    }
  });

  task(function hightlightCode() {
    const codeElement = document.getElementById(codeId);

    if (codeElement) {
      codeElement.innerHTML = hljs.highlight($snippet.value, {
        language: $snippet.language,
      }).value;
    }
  });

  return html`
    <div
      style=${`
        border: 1px solid #C3C7CB;
        border-radius: 4px;
        overflow-x: scroll;
      `}
    >
      <div
        style="
          font-family: Inter;
          font-size: .865rem;
          color: gray;
          margin-left: 16px;
          margin-top: 16px;
        "
      >
        ${$snippet.language.toUpperCase()}
      </div>
      <div
        style=${`
          position: relative; 
          min-width: fit-content;
          height: ${(($snippet.value.match(/\n/g)?.length || 0) + 1) * lineHeight + 2 * padding}px;
        `}
      >
        <pre
          style=${`
            margin: 0; 
            padding: ${padding}px;
          `}
        ><code 
          id=${codeId} 
          style=${`background: none;
            font-size: ${fontSize}px; 
            line-height: ${lineHeight}px;
          `}
        ></code></pre>
        <textarea
          id=${textareaId}
          oninput=${(e /*: InputEvent */) => {
            if (e.target instanceof HTMLTextAreaElement) {
              const target = e.target;
              $snippet.value = target.value;
            }
          }}
          style=${`
            resize: none;
            font-family: monospace;
            font-size: ${fontSize}px;
            line-height: ${lineHeight}px;
            padding: ${padding}px;
            caret-color: black;
            border: none;
            color: transparent;
            background: transparent;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
          `}
        >
        </textarea>
      </div>
    </div>
  `;
}
