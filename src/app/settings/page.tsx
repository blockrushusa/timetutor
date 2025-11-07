"use client";

import Link from "next/link";
import { type CSSProperties, useEffect, useState } from "react";

import { useThemeSelection } from "~/components/theme-provider";
import { themeEntries } from "~/lib/themes";

export default function SettingsPage() {
  const { theme, setTheme, themeValues } = useThemeSelection();
  const [previewTheme, setPreviewTheme] = useState(theme);

  useEffect(() => {
    setPreviewTheme(theme);
  }, [theme]);

  const activePreview = themeEntries.find(([name]) => name === previewTheme)?.[1] ?? themeValues;

  return (
    <main
      className="relative flex min-h-[100svh] flex-col overflow-hidden px-4 pb-14 pt-12 sm:px-6 md:px-10"
      style={{
        background: activePreview.background,
        color: activePreview.text.primary,
      }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="orbital-glow glow-one"
          style={{ background: activePreview.glow[0] }}
        />
        <div
          className="orbital-glow glow-two"
          style={{ background: activePreview.glow[1] }}
        />
        <div className="aurora-band" />
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 md:gap-14">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <span
              className="text-xs uppercase tracking-[0.6em]"
              style={{ color: activePreview.text.accent }}
            >
              Settings
            </span>
            <span
              className="text-sm font-medium sm:text-base"
              style={{ color: activePreview.text.secondary }}
            >
              Choose a skin to remix the quiz atmosphere.
            </span>
          </div>
          <Link
            href="/"
            className="nav-button rounded-full border px-5 py-2 text-sm font-semibold uppercase tracking-[0.25em]"
            style={{
              background: activePreview.button.bg,
              borderColor: activePreview.button.border,
              color: activePreview.button.text,
              boxShadow: activePreview.button.shadow,
            }}
          >
            Back to quiz
          </Link>
        </div>

        <header className="flex flex-col gap-3 text-left sm:gap-4">
          <h1
            className="text-balance text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl"
            style={{ color: activePreview.text.primary }}
          >
            Skins &amp; vibe controls
          </h1>
          <p
            className="max-w-3xl text-pretty text-base leading-relaxed md:text-lg"
            style={{ color: activePreview.text.secondary }}
          >
            Hover or tap to preview a skin, then select it to lock it in.
            Your pick syncs instantly and sticks across visits. Perfect for
            midnight study sessions or Saturday morning drills.
          </p>
        </header>

        <section className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
            <span
              className="rounded-full px-4 py-2 text-xs uppercase tracking-[0.35em]"
              style={{
                border: `1px solid ${activePreview.option.idle.border}`,
                color: activePreview.option.idle.text,
                background: activePreview.option.idle.bg,
              }}
            >
              Current skin: {themeValues.label}
            </span>
            <span
              className="rounded-full px-4 py-2 text-xs uppercase tracking-[0.35em]"
              style={{
                border: `1px solid ${activePreview.correct.border}`,
                color: activePreview.correct.text,
                background: activePreview.correct.bg,
              }}
            >
              Preview: {activePreview.label}
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {themeEntries.map(([name, preset]) => {
              const isActive = name === theme;
              const isPreviewing = name === previewTheme;

              return (
                <button
                  key={name}
                  type="button"
                  onMouseEnter={() => setPreviewTheme(name)}
                  onFocus={() => setPreviewTheme(name)}
                  onClick={() => {
                    setTheme(name);
                    setPreviewTheme(name);
                  }}
                  className="settings-card group flex flex-col gap-4 rounded-3xl border p-5 text-left transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 sm:p-6"
                  style={{
                    background: preset.preview.background,
                    borderColor: isActive
                      ? preset.preview.activeBorder
                      : preset.preview.border,
                    boxShadow: isPreviewing
                      ? preset.preview.activeShadow
                      : preset.preview.shadow,
                    color: preset.preview.text,
                    opacity: isActive ? 1 : 0.94,
                  }}
                  aria-pressed={isActive}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-lg font-semibold">
                        {preset.label}
                      </span>
                      <span
                        className="text-xs uppercase tracking-[0.35em]"
                        style={{ color: preset.text.accent }}
                      >
                        {name}
                      </span>
                    </div>
                    <span
                      className="status-chip rounded-full px-3 py-1 text-xs uppercase tracking-[0.35em]"
                      style={{
                        background: isActive
                          ? preset.correct.bg
                          : preset.option.idle.bg,
                        border: `1px solid ${
                          isActive ? preset.correct.border : preset.option.idle.border
                        }`,
                        color: isActive
                          ? preset.correct.text
                          : preset.option.idle.text,
                      }}
                    >
                      {isActive ? "Selected" : "Preview"}
                    </span>
                  </div>
                  <p
                    className="min-h-[3.5rem] text-sm leading-relaxed opacity-95"
                    style={{ color: preset.text.secondary }}
                  >
                    {preset.description}
                  </p>
                  <div className="flex flex-wrap gap-3 text-xs">
                    <PreviewBadge
                      label="Buttons"
                      style={{
                        background: preset.button.bg,
                        borderColor: preset.button.border,
                        color: preset.button.text,
                        boxShadow: preset.button.shadow,
                      }}
                    />
                    <PreviewBadge
                      label="Cards"
                      style={{
                        background: preset.card.background,
                        borderColor: preset.card.border,
                        color: preset.text.primary,
                        boxShadow: preset.card.shadow,
                      }}
                    />
                    <PreviewBadge
                      label="Glow"
                      style={{
                        background: preset.glow[0],
                        borderColor: preset.option.idle.border,
                        color: preset.text.primary,
                        boxShadow: "0 0 0 rgba(0,0,0,0)",
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

function PreviewBadge(props: { label: string; style: CSSProperties }) {
  return (
    <span
      className="badge-preview inline-flex items-center rounded-full border px-3 py-1 font-semibold uppercase tracking-[0.35em]"
      style={props.style}
    >
      {props.label}
    </span>
  );
}
