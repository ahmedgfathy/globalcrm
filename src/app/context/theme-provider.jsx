"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

export function ThemeProvider({ children, ...props }) {
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    if (theme) {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  );
}
