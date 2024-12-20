import {
  mix as mixColors,
  darken as darkenColor,
  parseToRgb,
  transparentize,
} from "polished";
import {
  convertRgbToOklab,
  parseHex,
  serializeHex,
  convertOklabToRgb,
} from "culori/fn";
import { RgbaColor } from "polished/lib/types/color";

export const mix = (colorA: string, colorB: string, amount: number) => {
  return mixColors(1 - amount, colorA, colorB);
};

export const opacity = (color: string, amount: number) => {
  const colorRgba = transparentize(1 - amount, color);

  const parsed = parseToRgb(colorRgba) as RgbaColor;
  return (
    "#" +
    [
      parsed.red.toString(16),
      parsed.green.toString(16),
      parsed.blue.toString(16),
      Math.ceil(parsed.alpha * 255).toString(16),
    ]
      .map((e) => e.padStart(2, "0"))
      .join("")
  );
};

export const darken = (color: string, amount: number) =>
  mix(color, "#000000", amount);

export const lighten = (value: string, amount: number) => {
  const color = convertRgbToOklab(parseHex(value));

  return serializeHex(
    convertOklabToRgb({
      ...color,
      l: color.l + amount,
    })
  );
};

export const chroming = (value: string, amount: number) => {
  const color = convertRgbToOklab(parseHex(value));

  return serializeHex(
    convertOklabToRgb({
      ...color,
      c: color.c + amount,
    })
  );
};

export const normalizeLightness = (obj: Record<string, string>) => {
  const parsed = Object.entries(obj).map(([key, value]) => {
    const color = convertRgbToOklab(parseHex(value));

    return [key, color];
  });

  const lightness =
    parsed.reduce((acc, [_, color]) => acc + color.l, 0) / parsed.length;

  return Object.fromEntries(
    parsed.map(([key, color]) => {
      return [
        key,
        serializeHex(
          convertOklabToRgb({
            ...color,
            l: lightness,
          })
        ),
      ];
    })
  );
};
