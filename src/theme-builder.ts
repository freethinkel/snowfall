import { Theme } from "./types";
import { join } from "node:path";
import fs from "node:fs";
import { darken, mix, opacity } from "./utils";

export class ThemeBuilder {
  constructor(private theme: Theme) {}

  private toTokens(theme: Theme) {
    const tokens = [
      {
        scope: "comment",
        settings: {
          foreground: theme.tokens.comment,
        },
      },
      {
        scope: ["keyword", "storage.modifier"],
        settings: {
          foreground: theme.tokens.keywords,
        },
      },
      {
        scope: "support.class",
        settings: {
          foreground: theme.tokens.constants,
        },
      },
      {
        scope: "storage.type.primitive",
        settings: {
          foreground: theme.tokens.keywords,
        },
      },
      {
        scope: "string",
        settings: {
          foreground: theme.tokens.strings,
        },
      },
      {
        scope: "variable",
        settings: {
          foreground: theme.tokens.properties,
        },
      },
      {
        scope: ["entity.name", "support.function"],
        settings: {
          foreground: theme.tokens.functions,
        },
      },
      {
        scope: "storage.type.annotation",
        settings: {
          foreground: theme.tokens.constants,
        },
      },
    ];

    return tokens;
  }

  private themeToVscodeTheme(theme: Theme) {
    const secondaryBackground = mix(theme.background, "#000000", 0.1);
    return {
      name: theme.name,
      $schema: "vscode://schemas/color-theme",
      colors: {
        foreground: theme.foreground,
        "editor.background": theme.background,
        "editor.foreground": theme.foreground,
        "activityBar.background": theme.background,
        "titleBar.activeBackground": theme.background,
        "titleBar.inactiveBackground": theme.background,
        // TAB
        "tab.activeBackground": mix(theme.background, theme.foreground, 0.1),
        "tab.inactiveBackground": theme.background,
        "tab.border": "#00000000",
        "editorGroupHeader.tabsBackground": theme.background,
        "sideBar.background": theme.background,
        "toolbar.activeBackground": theme.background,
        "activityBarBadge.background": theme.accent,
        "statusBar.background": theme.background,
        "statusBarItem.remoteBackground": theme.accent,
        "statusBarItem.remoteForeground": theme.background,
        "statusBarItem.errorBackground": theme.diagnostic.error,
        "statusBar.debuggingBackground": theme.accent,
        "statusBar.debuggingForeground": theme.background,
        "debugToolBar.background": secondaryBackground,
        "sideBarTitle.foreground": theme.foreground,
        "quickInput.background": theme.background,
        "activityBar.activeBackground": theme.background,
        "activityBar.foreground": theme.foreground,
        "activityBar.inactiveForeground": opacity(theme.foreground, 0.5),
        "activityBar.activeBorder": opacity(theme.accent, 0),
        "list.focusForeground": "red",
        "list.hoverBackground": mix(theme.background, theme.foreground, 0.1),
        "button.background": theme.accent,

        "button.secondaryBackground": mix(theme.background, "#ffffff", 0.1),
        "notifications.background": secondaryBackground,
        "notificationsInfoIcon.foreground": theme.diagnostic.info,

        "editorActionList.background": theme.background,
        "tab.selectedBackground": theme.accent,
        "panel.background": theme.background,
        "editorPane.background": theme.background,
        "quickInputList.focusBackground": opacity(theme.accent, 0.2),
        "editor.lineHighlightBorder": opacity(theme.foreground, 0.05),
        "editor.lineHighlightBackground": opacity(theme.foreground, 0.05),
        "editorStickyScroll.shadow": darken(theme.background, 0.3),
        "editorCursor.foreground": theme.accent,
        "editor.inactiveSelectionBackground": opacity(theme.accent, 0.1),
        "editor.selectionBackground": opacity(theme.accent, 0.2),
        "selection.background": opacity(theme.accent, 0.2),
        // DIAGNOSTIC
        "editorWarning.foreground": theme.diagnostic.warning,
        "errorLens.warningBackground": opacity(theme.diagnostic.warning, 0.1),
        "errorLens.warningForeground": theme.diagnostic.warning,
        // LIST
        focusBorder: theme.accent,
        "list.focusHighlightForeground": theme.accent,
        "list.highlightForeground": theme.accent,
        "pickerGroup.foreground": theme.accent,
        "list.warningForeground": theme.diagnostic.warning,
        "list.focusBackground": opacity(theme.foreground, 0.05),
        "list.activeSelectionBackground": opacity(theme.foreground, 0.1),
        "list.inactiveSelectionBackground": opacity(theme.foreground, 0.05),
        // GIT
        "gitDecoration.untrackedResourceForeground": theme.git.added,
        "gitDecoration.modifiedResourceForeground": theme.git.modified,
        "gitDecoration.deletedResourceForeground": theme.git.removed,
        "editorGutter.modifiedBackground": theme.git.modified,
        "editorGutter.deletedBackground": theme.git.removed,
        "gitDecoration.ignoredResourceForeground": opacity(
          theme.foreground,
          0.6
        ),
        //TERMINAL
        ...Object.fromEntries(
          Object.entries(theme.terminal ?? {}).map(([key, value]) => {
            return [
              `terminal.ansi${key[0].toUpperCase()}${key.slice(1)}`,
              value,
            ];
          })
        ),
        // Bracket Pair Colorizer
        ...Array(6)
          .fill(0)
          .map((_, i) => i)
          .reduce((acc, i) => {
            acc[`editorBracketHighlight.foreground${i + 1}`] =
              theme.tokens.brackets[i % theme.tokens.brackets.length];
            return acc;
          }, {}),
      },
      tokenColors: this.toTokens(theme),
    };
  }
  async build(path: string) {
    const target = join(__dirname, "..", path);
    fs.writeFileSync(
      target,
      JSON.stringify(this.themeToVscodeTheme(this.theme), null, 2),
      {}
    );
  }
}
