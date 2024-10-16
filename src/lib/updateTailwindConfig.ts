import fs from "vite-plugin-fs/browser";
import { parseModule, generateCode } from "magicast";
import daisyUIThemes from "daisyui/src/theming/themes";
import { DaisyUIThemeSearchParmsTypes, exportThemeArray } from "daisyui-devtools";



export type ViteFS = {
  readFile: (path: string) => Promise<string>;
  writeFile: (path: string, data: string | ArrayBufferView | DataView) => Promise<void>;
  rm: (
    path: string,
    options?: {
      recursive?: boolean;
      force?: boolean;
    }
  ) => Promise<void>;
};


export async function updateTailwindConfig(
  themeObject: DaisyUIThemeSearchParmsTypes,
  custom_theme_name?: string,
) {
  const extendingThemeName = themeObject["--color-scheme"]?.value as keyof typeof daisyUIThemes;
  const themeName = custom_theme_name || extendingThemeName;
  const extendingTheme = daisyUIThemes[extendingThemeName];
  const newThemeArray = exportThemeArray(themeObject, false);
  const newThemeObject = newThemeArray.reduce((acc, curr, ) => {
    if (curr) {
      const [key, value] = curr.split(":");
      return { ...acc, [key.slice(1, -1)]: value.slice(1, -1) };
    }
    return acc;
  }, {});
  const newTheme = {
    [themeName]: {
      wash_me: `...require('daisyui/src/theming/themes')[${extendingThemeName}]`,
      ...extendingTheme,
      ...newThemeObject,
    },
  };
  const text_file = await fs.readFile("./tailwind.config.js");
  const mod = parseModule(text_file);
  const themes = mod.exports.default.daisyui.themes;
  const daisyuiThemes = JSON.parse(JSON.stringify(themes, null, 2)) as (string | {})[];
  const daisyuiStringsOnly = daisyuiThemes.map((theme) => {
    if (typeof theme === "string") {
      return theme;
    }
  }).filter(Boolean) as string[];
  if (themeName) {
    const customThemeIndex = daisyuiStringsOnly.findIndex((theme) => {
      return theme === themeName;
    });
    if (customThemeIndex > -1) {
      // @ts-expect-error
      daisyuiStringsOnly.splice(customThemeIndex, 1, newTheme);
    } else {
      // @ts-expect-error
      daisyuiStringsOnly.push(newTheme);
    }
  }
  const finalNewThemeObject = { themes: daisyuiStringsOnly };
  mod.exports.default.daisyui = finalNewThemeObject;
  const { code,  } = generateCode(mod);
  const manipulatedString = code.replace(
    /\s*wash_me\s*:\s*"...require\('daisyui\/src\/theming\/themes'\)\[${extendingThemeName}\]"/,
    `...require('daisyui/src/theming/themes')[${extendingThemeName}]`
  );
    await fs.writeFile("./tailwind.config.js", manipulatedString);
}
