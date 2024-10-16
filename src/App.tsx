import { MainNavbar } from "./components/navbar/MainNavbar";
import { useEffect } from "react";
import { themeChange } from "theme-change";
import { AllDaisyUIComponents } from "./components/daisyui/AllDaisyUI";
import { DaisyUiDevtoolsContainner } from "./components/DaisyUIDevtools";
// import { updateTailwindConfig } from "./lib/updateTailwindConfig";
function App() {
  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);
  return (
    <div className="min-h-screen w-full flex flex-col gap-2 items-center">
      <MainNavbar />
      <AllDaisyUIComponents />
      <DaisyUiDevtoolsContainner/>
    </div>
  );
}

export default App;
