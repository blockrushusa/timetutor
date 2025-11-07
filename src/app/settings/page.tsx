"use client";

import Link from "next/link";
import { type CSSProperties, useEffect, useState } from "react";

import { useThemeSelection } from "~/components/theme-provider";
import { themeEntries } from "~/lib/themes";
import {
  pinnedTimezoneScenarios,
  timezoneOptionMap,
  timezoneOptions,
} from "~/lib/timezones";

export default function SettingsPage() {
  const {
    theme,
    setTheme,
    themeValues,
    timezonePair,
    setTimezonePair,
    dstPreference,
    setDstPreference,
  } = useThemeSelection();
  const [previewTheme, setPreviewTheme] = useState(theme);

  useEffect(() => {
    setPreviewTheme(theme);
  }, [theme]);

  const activePreview =
    themeEntries.find(([name]) => name === previewTheme)?.[1] ?? themeValues;

  const sourceMeta = timezoneOptionMap[timezonePair.source];
  const targetMeta = timezoneOptionMap[timezonePair.target];

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
        <header
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          aria-label="Settings header"
        >
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
          <nav aria-label="Settings navigation">
            <Link
              href="/"
              className="nav-button inline-flex rounded-full border px-5 py-2 text-sm font-semibold uppercase tracking-[0.25em]"
              style={{
                background: activePreview.button.bg,
                borderColor: activePreview.button.border,
                color: activePreview.button.text,
                boxShadow: activePreview.button.shadow,
              }}
            >
              Back to quiz
            </Link>
          </nav>
        </header>

        <section
          className="flex flex-col gap-3 text-left sm:gap-4"
          aria-labelledby="skins-heading"
        >
          <h1
            id="skins-heading"
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
        </section>

        <section
          className="flex flex-col gap-4"
          aria-labelledby="timezones-heading"
        >
          <div>
            <h2
              id="timezones-heading"
              className="text-2xl font-semibold"
              style={{ color: activePreview.text.primary }}
            >
              Timezone trainer
            </h2>
            <p
              className="text-sm text-white/80 sm:text-base"
              style={{ color: activePreview.text.secondary }}
            >
              Pin a scenario such as New York ↔ Auckland or mix your own pair to
              practice global conversions.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {pinnedTimezoneScenarios.map((preset) => {
              const isActive =
                preset.pair.source === timezonePair.source &&
                preset.pair.target === timezonePair.target;
              const presetSource =
                timezoneOptionMap[preset.pair.source]?.label ??
                preset.pair.source;
              const presetTarget =
                timezoneOptionMap[preset.pair.target]?.label ??
                preset.pair.target;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setTimezonePair(preset.pair)}
                  className="settings-card flex flex-col gap-2 rounded-2xl border px-4 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
                  style={{
                    background: activePreview.card.background,
                    borderColor: isActive
                      ? activePreview.correct.border
                      : activePreview.card.border,
                    boxShadow: isActive
                      ? activePreview.correct.shadow
                      : activePreview.card.shadow,
                    color: activePreview.text.primary,
                  }}
                  aria-pressed={isActive}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                      {preset.label}
                    </span>
                    <span
                      className="rounded-full border px-2 py-1 text-xs uppercase tracking-[0.3em]"
                      style={{
                        borderColor: activePreview.option.idle.border,
                        color: activePreview.option.idle.text,
                      }}
                    >
                      {isActive ? "Pinned" : "Apply"}
                    </span>
                  </div>
                  <p className="text-lg font-semibold">
                    {presetSource} → {presetTarget}
                  </p>
                  <p className="text-sm text-white/80">{preset.description}</p>
                </button>
              );
            })}
          </div>

          <form className="grid gap-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm sm:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-[0.4em] text-white/70">
                From timezone
              </span>
              <select
                className="rounded-xl border border-white/20 bg-black/30 px-3 py-2 text-white"
                value={timezonePair.source}
                onChange={(event) =>
                  setTimezonePair((prev) => ({
                    ...prev,
                    source: event.target.value,
                  }))
                }
              >
                {timezoneOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label} ({option.offsetLabel})
                  </option>
                ))}
              </select>
              <span className="text-xs text-white/60">
                Current: {sourceMeta?.label ?? timezonePair.source}
              </span>
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-[0.4em] text-white/70">
                To timezone
              </span>
              <select
                className="rounded-xl border border-white/20 bg-black/30 px-3 py-2 text-white"
                value={timezonePair.target}
                onChange={(event) =>
                  setTimezonePair((prev) => ({
                    ...prev,
                    target: event.target.value,
                  }))
                }
              >
                {timezoneOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label} ({option.offsetLabel})
                  </option>
                ))}
              </select>
              <span className="text-xs text-white/60">
                Current: {targetMeta?.label ?? timezonePair.target}
              </span>
            </label>

            <div className="col-span-full flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="nav-button rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em]"
                style={{
                  background: activePreview.button.bg,
                  borderColor: activePreview.button.border,
                  color: activePreview.button.text,
                  boxShadow: activePreview.button.shadow,
                }}
                onClick={() =>
                  setTimezonePair((prev) => ({
                    source: prev.target,
                    target: prev.source,
                  }))
                }
              >
                Swap timezones
              </button>
              <span className="text-xs text-white/70">
                Practicing: {sourceMeta?.label ?? timezonePair.source} →
                {" "}{targetMeta?.label ?? timezonePair.target}
              </span>
            </div>

            <div className="col-span-full grid gap-4 sm:grid-cols-2">
              <label className="flex items-start gap-3 rounded-2xl border border-white/15 bg-black/20 px-3 py-3">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={dstPreference.source}
                  onChange={(event) =>
                    setDstPreference((prev) => ({
                      ...prev,
                      source: event.target.checked,
                    }))
                  }
                  disabled={!sourceMeta?.dstObserves}
                />
                <span className="text-xs text-white/80 sm:text-sm">
                  Apply daylight savings for {sourceMeta?.label ?? "source"}{" "}
                  {!sourceMeta?.dstObserves && "(not applicable)"}
                  {sourceMeta?.dstObserves && sourceMeta.dstStartNote && (
                    <span className="block text-[0.65rem] uppercase tracking-[0.35em] text-white/60">
                      {sourceMeta.dstStartNote} – {sourceMeta.dstEndNote}
                    </span>
                  )}
                </span>
              </label>
              <label className="flex items-start gap-3 rounded-2xl border border-white/15 bg-black/20 px-3 py-3">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={dstPreference.target}
                  onChange={(event) =>
                    setDstPreference((prev) => ({
                      ...prev,
                      target: event.target.checked,
                    }))
                  }
                  disabled={!targetMeta?.dstObserves}
                />
                <span className="text-xs text-white/80 sm:text-sm">
                  Apply daylight savings for {targetMeta?.label ?? "target"}{" "}
                  {!targetMeta?.dstObserves && "(not applicable)"}
                  {targetMeta?.dstObserves && targetMeta.dstStartNote && (
                    <span className="block text-[0.65rem] uppercase tracking-[0.35em] text-white/60">
                      {targetMeta.dstStartNote} – {targetMeta.dstEndNote}
                    </span>
                  )}
                </span>
              </label>
            </div>
          </form>
        </section>

        <section className="flex flex-col gap-6" aria-labelledby="skins-heading">
          <div
            className="flex flex-wrap items-center gap-4 text-sm sm:text-base"
            aria-label="Skin status"
          >
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
