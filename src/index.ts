import { ThemeBuilder } from "./theme-builder";
import { Theme } from "./types";

const DARK: Theme = {
  name: "Snowfall dark",
  type: "dark",
  background: "#24272d",
  foreground: "#A8BEC4",
  accent: "#84c4df",
  tokens: {
    brackets: ["#7FB2C7", "#93b8c5"],
    comment: "#474c54", // base03
    strings: "#BDB969", // base0B
    constants: "#EBD2A7", // base09
    keywords: "#B08CBA", // base0E
    operators: "#ACBDC3", // base05,
    properties: "#EBD2A7", // base0D,
    types: "#ACBDC3", // base0C
    functions: "#7FB2C7",
  },
  git: {
    added: "#BDB969",
    modified: "#EBD2A7",
    removed: "#FA7583",
  },
  diagnostic: {
    error: "#FA7583",
    warning: "#e6a46e",
    info: "#9BCAFF",
  },
  terminal: {
    black: "#1c1c1c",
    red: "#cc6666",
    green: "#bdb968",
    yellow: "#f0c674",
    blue: "#81a2be",
    magenta: "#b193ba",
    cyan: "#7fb2c8",
    white: "#c8ccd4",
    brightBlack: "#636363",
    brightRed: "#a04041",
    brightGreen: "#8b9440",
    brightYellow: "#ec9c62",
    brightBlue: "#5d7f9a",
    brightMagenta: "#82658c",
    brightCyan: "#5e8d87",
    brightWhite: "#ffffff",
  },
};

const LIGHT: Theme = {
  ...DARK,
  name: "Snowfall light",
};

const main = async () => {
  console.log("Start building themes...");
  await new ThemeBuilder(DARK).build("./themes/snowfall_dark.json");
  await new ThemeBuilder(LIGHT).build("./themes/snowfall_light.json");
};

main();
