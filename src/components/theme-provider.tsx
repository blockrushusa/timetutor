"use client";

import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { themePresets, type ThemeName, type ThemePreset } from "~/lib/themes";

type ThemeContextValue = {
  theme: ThemeName;
  setTheme: Dispatch<SetStateAction<ThemeName>>;
  themeValues: ThemePreset;
};

const STORAGE_KEY = "time-tutor-theme";
const FALLBACK_THEME: ThemeName = "space";

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider(props: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>(FALLBACK_THEME);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(STORAGE_KEY) as ThemeName | null;
    if (raw && themePresets[raw]) {
      setTheme(raw);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const contextValue = useMemo<ThemeContextValue>(() => {
    return { theme, setTheme, themeValues: themePresets[theme] };
  }, [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export function useThemeSelection() {
  const value = useContext(ThemeContext);
  if (!value) {
    throw new Error("useThemeSelection must be used within a ThemeProvider");
  }
  return value;
}
