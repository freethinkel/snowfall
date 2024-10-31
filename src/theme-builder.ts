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
        scope: "markup.heading.markdown",
        settings: {
          foreground: theme.tokens.functions,
          fontStyle: "bold",
        },
      },
      {
        scope: "text.html.markdown markup.inline.raw",
        settings: {
          foreground: theme.tokens.constants,
        },
      },
      {
        scope: "markup.underline.link",
        settings: {
          foreground: theme.tokens.strings,
        },
      },
      {
        scope: "markup.list punctuation.definition.list.begin",
        settings: {
          foreground: theme.tokens.properties,
        },
      },
      {
        scope: "storage.type.annotation",
        settings: {
          foreground: theme.tokens.constants,
        },
      },
      {
        scope: ["meta.tag.attributes", "constant.numeric"],
        settings: {
          foreground: theme.tokens.functions,
        },
      },
    ];

    return tokens;
  }

  private themeToVscodeTheme(theme: Theme) {
    const isDark = theme.type === "dark";
    const secondaryBackground = mix(
      theme.background,
      "#000000",
      isDark ? 0.1 : 0.05
    );
    const shadow = darken(theme.background, 0.2);

    return {
      name: theme.name,
      $schema: "vscode://schemas/color-theme",
      colors: {
        foreground: theme.foreground,
        "editor.background": theme.background,
        "editor.foreground": theme.foreground,
        "titleBar.activeBackground": secondaryBackground,
        "titleBar.inactiveBackground": secondaryBackground,
        "editorWidget.background": secondaryBackground,

        "editorLineNumber.foreground": opacity(theme.foreground, 0.15),
        "editorLineNumber.activeForeground": opacity(theme.foreground, 0.5),
        // TAB
        "tab.activeBackground": theme.background,
        "tab.inactiveBackground": secondaryBackground,
        "tab.border": "#00000000",
        "editorGroupHeader.tabsBackground": secondaryBackground,
        "sideBar.background": secondaryBackground,
        "sideBarSectionHeader.background": darken(secondaryBackground, 0.04),
        "sideBarTitle.foreground": theme.foreground,
        "editor.wordHighlightTextBackground": opacity(theme.accent, 0.1),
        "editor.wordHighlightTextBorder": opacity(theme.accent, 0.1),
        "toolbar.activeBackground": secondaryBackground,
        "activityBarBadge.background": theme.accent,
        "activityBarBadge.foreground": theme.background,
        "statusBar.background": secondaryBackground,
        "statusBar.foreground": theme.foreground,
        "statusBarItem.remoteBackground": theme.accent,
        "statusBarItem.remoteForeground": secondaryBackground,
        "statusBarItem.errorBackground": theme.diagnostic.error,
        "statusBar.debuggingBackground": theme.accent,
        "statusBar.debuggingForeground": theme.background,
        "debugToolBar.background": secondaryBackground,
        "quickInput.background": theme.background,
        "activityBar.background": secondaryBackground,
        "activityBar.foreground": theme.foreground,
        "activityBar.inactiveForeground": opacity(theme.foreground, 0.5),
        "activityBar.activeBorder": theme.accent,
        "list.focusForeground": mix(
          theme.foreground,
          theme.type === "dark" ? "#ffffff" : "#000000",
          0.4
        ),
        "panelTitle.activeBorder": theme.accent,
        "panelTitle.activeForeground": theme.accent,
        "panelTitle.inactiveForeground": theme.foreground,

        "tree.indentGuidesStroke": opacity(theme.foreground, 0.2),
        "editorIndentGuide.activeBackground1": opacity(theme.foreground, 0.3),
        // "editorIndentGuide.activeBackground2": "red",
        "editorIndentGuide.background1": opacity(theme.foreground, 0.1),

        "quickInputList.focusForeground": theme.foreground,
        "list.hoverBackground": mix(theme.background, theme.foreground, 0.1),
        "button.background": theme.accent,
        "button.foreground": theme.background,
        "scrollbar.shadow": shadow,

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
        "editorStickyScroll.shadow": shadow,
        "editorCursor.foreground": theme.accent,
        "editorCursor.background": theme.background,
        "editor.inactiveSelectionBackground": opacity(theme.accent, 0.1),
        "editor.selectionBackground": opacity(theme.accent, 0.2),
        "selection.background": opacity(theme.accent, 0.2),
        // DIAGNOSTIC
        "editorWarning.foreground": theme.diagnostic.warning,
        "errorLens.warningBackground": opacity(theme.diagnostic.warning, 0.1),
        "errorLens.warningForeground": theme.diagnostic.warning,
        "errorLens.errorBackground": opacity(theme.diagnostic.error, 0.1),
        "errorLens.errorForeground": theme.diagnostic.error,
        "editorError.foreground": theme.diagnostic.error,
        "list.errorForeground": theme.diagnostic.error,

        // LIST
        focusBorder: theme.accent,
        "list.focusHighlightForeground": theme.foreground,
        "list.highlightForeground": theme.accent,
        "pickerGroup.foreground": theme.accent,
        "list.warningForeground": theme.diagnostic.warning,
        "list.focusBackground": opacity(theme.foreground, 0.05),
        // "list.focusForeground": theme.foreground,
        "list.activeSelectionBackground": opacity(theme.foreground, 0.1),
        "list.inactiveSelectionBackground": opacity(theme.foreground, 0.05),
        "list.activeSelectionForeground": theme.foreground,
        // GIT
        "gitDecoration.untrackedResourceForeground": theme.git.added,
        "gitDecoration.modifiedResourceForeground": theme.git.modified,
        "gitDecoration.deletedResourceForeground": theme.git.removed,
        "editorGutter.modifiedBackground": theme.git.modified,
        "editorGutter.deletedBackground": theme.git.removed,
        "diffEditor.removedLineBackground": opacity(
          theme.git.removed,
          isDark ? 0.2 : 0.1
        ),
        "diffEditor.removedTextBackground": opacity(
          theme.git.removed,
          isDark ? 0.2 : 0.1
        ),
        "diffEditor.insertedTextBackground": opacity(
          theme.git.added,
          isDark ? 0.2 : 0.1
        ),
        "diffEditor.insertedLineBackground": opacity(
          theme.git.added,
          isDark ? 0.2 : 0.1
        ),
        "editorGutter.addedBackground": theme.git.added,
        "gitDecoration.addedResourceForeground": theme.git.added,
        "gitDecoration.stageDeletedResourceForeground": "red",
        "gitDecoration.stageModifiedResourceForeground": theme.git.modified,
        "gitDecoration.renamedResourceForeground": theme.git.added,
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
