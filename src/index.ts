import { ThemeBuilder } from "./theme-builder";
import { Theme } from "./types";
import { chroming, lighten, normalizeLightness } from "./utils";

const DARK: Theme = {
  name: "Snowfall dark",
  type: "dark",
  background: "#24272d",
  foreground: "#91a2a6",
  accent: "#84c4df",
  tokens: {
    brackets: ["#7FB2C7", "#EBD2A7"],
    comment: "#474c54", // base03
    strings: "#BDB969", // base0B
    constants: "#EBD2A7", // base09
    keywords: "#B08CBA", // base0E
    operators: "#B08CBA", // base05,
    properties: "#EBD2A7", // base0D,
    types: "#ACBDC3", // base0C
    functions: "#7FB2C7",
  },
  git: normalizeLightness({
    added: "#BDB969",
    modified: "#84c4df",
    removed: "#FA7583",
  }),
  diagnostic: {
    error: "#FA7583",
    warning: "#EBD2A7",
    info: "#9BCAFF",
  },
  terminal: normalizeLightness(
    Object.fromEntries(
      Object.entries({
        black: "#1c1c1c",
        red: "#cc6666",
        green: "#bdb968",
        yellow: "#f0c674",
        blue: "#81a2be",
        magenta: "#b193ba",
        cyan: "#7fb2c8",
        white: "#c8ccd4",
        brightBlack: "#636363",
        brightYellow: "#EBD2A7",
        brightRed: "#a04041",
        brightGreen: "#8b9440",
        brightBlue: "#5d7f9a",
        brightMagenta: "#82658c",
        brightCyan: "#5e8d87",
        brightWhite: "#ffffff",
      }).map(([key, value]) => [key, lighten(value, 0.1)])
    ) as any
  ),
};

const LIGHT: Theme = {
  name: "Snowfall light",
  type: "light",
  background: "#ffffff",
  foreground: "#5C6165",
  accent: "#88C0D0",
  tokens: {
    brackets: ["#50afce", "#d59225"],
    comment: "#bdc1c8", // base03
    strings: "#85B300", // base0B
    constants: "#d59225", // base09
    keywords: "#a25cb5", // base0E
    operators: "#ACBDC3", // base05,
    properties: "#d59225", // base0D,
    types: "#ACBDC3", // base0C
    functions: "#50afce",
  },
  git: normalizeLightness({
    added: "#8ACB6B",
    modified: "#88C0D0",
    removed: "#FF8F9B",
  }),
  diagnostic: normalizeLightness({
    error: "#FA7583",
    warning: "#ec9c62",
    info: "#9BCAFF",
  }),
  terminal: normalizeLightness({
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
  }),
};

const main = async () => {
  console.log("Start building themes...");
  await new ThemeBuilder(DARK).build("./themes/snowfall_dark.json");
  await new ThemeBuilder(LIGHT).build("./themes/snowfall_light.json");
};

main();
