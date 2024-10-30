export type Theme = {
  name: string;
  type: "dark" | "light";
  accent: string;
  background: string;
  foreground: string;
  tokens: {
    brackets: string[];
    comment: string;
    strings: string;
    types: string;
    functions: string;
    properties: string;
    keywords: string;
    constants: string;
    operators: string;
  };
  diagnostic: {
    error: string;
    warning: string;
    info: string;
  };
  git: {
    added: string;
    modified: string;
    removed: string;
  };
  terminal?: {
    black: string;
    red: string;
    green: string;
    yellow: string;
    blue: string;
    magenta: string;
    cyan: string;
    white: string;
    brightBlack: string;
    brightRed: string;
    brightGreen: string;
    brightYellow: string;
    brightBlue: string;
    brightMagenta: string;
    brightCyan: string;
    brightWhite: string;
  };
};
