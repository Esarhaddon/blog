declare var hljs: {
  highlightAll(): void,

  highlight(text: string, { language: string }): { value: string }
};
