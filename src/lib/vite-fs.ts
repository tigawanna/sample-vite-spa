import fs from "vite-plugin-fs/browser";
import { DaisyUIThemeSearchParmsTypes  } from "daisyui-devtools";
import daisyUIThemes from "daisyui/src/theming/themes";
export async function updatedaisyUIConfig(newTheme: Record<string, any>,themeObject:DaisyUIThemeSearchParmsTypes) {
  try {
    const file = await fs.readFile("daisyui.config.json");
    if (file) {
      try {
        const daisyuuiconfig = JSON.parse(file);
        if (!daisyuuiconfig) {
          console.log("daisyui.config.json is empty");
        }
        console.log("daisyuuiconfig", daisyuuiconfig);
        if (newTheme) {
          const extendingTheme = daisyUIThemes[themeObject["--color-scheme"]?.value as keyof typeof daisyUIThemes];
          // daisyuuiconfig.themes.push({ ...extendingTheme, ...newTheme });
                 const listThatNeedsDashPrefix = [
                   "rounded-box",
                   "rounded-btn",
                   "rounded-badge",
                   "animation-btn",
                   "animation-input",
                   "btn-focus-scale",
                   "border-btn",
                   "tab-border",
                   "tab-radius",
                 ];
                 const parsedThemeObject = Object.entries(themeObject).reduce(
                   (acc, [key, value]) => {
                     if (listThatNeedsDashPrefix.includes(value.name)) {
                       // @ts-expect-error
                       acc[value?.variable] = value.value;
                     } else {
                       // @ts-expect-error
                       acc[value?.name] = value.value;
                     }
                     return acc;
                   }
                 );
         
         
         
          const customThemesObject = daisyuuiconfig.themes.filter((item:string|{}) => {
            if(typeof item === "object") { 
              console.log("item", item);
              return item;
            }
          });
          const themesSet = new Set(daisyuuiconfig.themes);
          // themesSet.add({ ...extendingTheme, ...newTheme });
          daisyuuiconfig.themes = [...themesSet];
          console.log("daisyuuiconfig", daisyuuiconfig);
          // await fs.writeFile("daisyui.config.json", JSON.stringify(daisyuuiconfig, null, 2));
        }
      } catch (error: any) {
        console.log("error parsing daisyui.config.json:", error.message);
      }
    }
  } catch (error: any) {
    console.log("errro loading file", error.message);
  }
}
