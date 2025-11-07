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
import {
  defaultTimezonePair,
  timezoneOptionMap,
  type TimezonePair,
} from "~/lib/timezones";

type ThemeContextValue = {
  theme: ThemeName;
  setTheme: Dispatch<SetStateAction<ThemeName>>;
  themeValues: ThemePreset;
  timezonePair: TimezonePair;
  setTimezonePair: Dispatch<SetStateAction<TimezonePair>>;
  dstPreference: DstPreference;
  setDstPreference: Dispatch<SetStateAction<DstPreference>>;
};

type DstPreference = {
  source: boolean;
  target: boolean;
};

const THEME_STORAGE_KEY = "time-tutor-theme";
const TIMEZONE_STORAGE_KEY = "time-tutor-timezone";
const DST_STORAGE_KEY = "time-tutor-dst";
const FALLBACK_THEME: ThemeName = "space";

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider(props: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>(FALLBACK_THEME);
  const [timezonePair, setTimezonePair] =
    useState<TimezonePair>(defaultTimezonePair);
  const [dstPreference, setDstPreference] = useState<DstPreference>({
    source: true,
    target: true,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY) as
      | ThemeName
      | null;
    if (raw && themePresets[raw]) {
      setTheme(raw);
    }
    const storedPair = window.localStorage.getItem(TIMEZONE_STORAGE_KEY);
    if (storedPair) {
      try {
        const parsed = JSON.parse(storedPair) as TimezonePair;
        if (parsed.source && parsed.target) {
          setTimezonePair(parsed);
        }
      } catch {
        // Ignore malformed data
      }
    }
    const storedDst = window.localStorage.getItem(DST_STORAGE_KEY);
    if (storedDst) {
      try {
        const parsed = JSON.parse(storedDst) as Partial<DstPreference>;
        setDstPreference((prev) => ({
          source: parsed.source ?? prev.source,
          target: parsed.target ?? prev.target,
        }));
      } catch {
        // ignore
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      TIMEZONE_STORAGE_KEY,
      JSON.stringify(timezonePair),
    );
  }, [timezonePair]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(DST_STORAGE_KEY, JSON.stringify(dstPreference));
  }, [dstPreference]);

  useEffect(() => {
    setDstPreference((prev) => {
      const sourceOption = timezoneOptionMap[timezonePair.source];
      const targetOption = timezoneOptionMap[timezonePair.target];
      return {
        source: sourceOption?.dstObserves ? prev.source : false,
        target: targetOption?.dstObserves ? prev.target : false,
      };
    });
  }, [timezonePair]);

  const contextValue = useMemo<ThemeContextValue>(() => {
    return {
      theme,
      setTheme,
      themeValues: themePresets[theme],
      timezonePair,
      setTimezonePair,
      dstPreference,
      setDstPreference,
    };
  }, [theme, timezonePair, dstPreference]);

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
