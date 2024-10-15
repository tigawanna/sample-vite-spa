import { MainNavbar } from "./components/navbar/MainNavbar";
import { useEffect } from "react";
import { themeChange } from "theme-change";
import { AllDaisyUIComponents } from "./components/daisyui/AllDaisyUI";
import { DaisyUiDevtools  } from "daisyui-devtools";
import { updatedaisyUIConfig } from "./lib/vite-fs";
function App() {
  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);
  return (
    <div className="min-h-screen w-full flex flex-col gap-2 items-center">
      <MainNavbar />

      <AllDaisyUIComponents />
      <DaisyUiDevtools 
      customThemeName="cupcake"
      onCommitChanges={(themeObject) => {

        console.log("parsedThemeObject", parsedThemeObject);
        // updatedaisyUIConfig(JSON.parse(themeString),themeObject);
      }}/>
    </div>
  );
}

export default App;




