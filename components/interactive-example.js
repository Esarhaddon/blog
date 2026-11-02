// @flow

import { html, task, signal } from "aspen";
import { $isMobile } from "../design-tokens.js";

export * as WrapTextIcon from "./wrap-text-icon.js";
export * as NoWrapTextIcon from "./no-wrap-text.js";
export * as RefreshIcon from "./refresh-icon.js";

/*::
type Snippet = {
  language: "css" | "js" | "html",
  show: boolean,
  wrapped: boolean,
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
      wrapped: false,
      initialValue: trimIndent(snippet.value),
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
              (snippet) => html(Symbol())`
                 <Snippet $snippet=${snippet} />
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
      codeElement.innerHTML = hljs.highlight(
        // Add a trailing space to prevent trailing line breaks from being
        // truncated
        $snippet.value + ($snippet.value.endsWith("\n") ? " " : ""),
        {
          language: $snippet.language,
        },
      ).value;
    }
  });

  // TODO: add some sandboxing
  return html`
    <div
      style=${`
        border: 1px solid #C3C7CB;
        border-radius: 4px;
        overflow-x: scroll;
      `}
    >
      <style>
        @scope {
          &:has(textarea:focus) {
            outline: 1px solid blue;
          }
        }
      </style>
      <div
        style="
          position: sticky;
          left: 0;
          display: flex;
          justify-content: space-between;
          padding-inline: 16px;
          padding-top: 16px;
        "
      >
        <div
          style="
            font-family: Inter;
            font-size: .865rem;
            color: gray;
          "
        >
          ${$snippet.language.toUpperCase()}
        </div>
        <div>
          ${$snippet.initialValue !== $snippet.value
            ? html`
                <button
                  style="
                    all: unset;
                    cursor: pointer;
                    transform: scaleX(-1); 
                  "
                  onClick=${() => {
                    const textarea = document.getElementById(textareaId);
                    textarea.value = $snippet.initialValue;
                    $snippet.value = $snippet.initialValue;
                  }}
                >
                  <RefreshIcon />
                </button>
              `
            : null}
          <button
            style="
              all: unset;
              cursor: pointer;
            "
            onClick=${() => ($snippet.wrapped = !$snippet.wrapped)}
          >
            ${$snippet.wrapped
              ? html`<WrapTextIcon />`
              : html`<NoWrapTextIcon />`}
          </button>
        </div>
      </div>
      <div
        style=${`
          position: relative; 
          min-width: fit-content;
        `}
      >
        <pre
          style=${`
            margin: 0; 
            padding: ${padding}px;
            ${
              $snippet.wrapped
                ? `
              white-space: pre-wrap;
              word-break: break-all;
            `
                : ""
            }
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
              $snippet.value = e.target.value;
            }
          }}
          style=${`
            resize: none;
            outline: none;
            font-family: monospace;
            font-size: ${fontSize}px;
            line-height: ${lineHeight}px;
            padding: ${padding}px;
            caret-color: black;
            border: none;
            color: transparent;
            word-break: break-all;
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
