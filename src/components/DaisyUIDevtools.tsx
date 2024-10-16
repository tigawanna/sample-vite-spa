import React from "react";
export const DaisyUiDevtools = import.meta.env.DEV
  ? React.lazy(() =>
      // Lazy load in development
      import("daisyui-devtools").then((res) => ({
        default: res.DaisyUiDevtools,
      }))
    )
  : () => null; // Render nothing in production

  export const DaisyUiDevtoolsContainner = import.meta.env.DEV
    ? () =><DaisyUiDevtools
        customThemeName="cupcake"
        onCommitChanges={(themeObject) => {
        //   updateTailwindConfig(themeObject,"cupcake");
        }}
      />
    : () => null; // Render nothing in production


