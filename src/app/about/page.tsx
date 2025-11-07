"use client";

import { useThemeSelection } from "~/components/theme-provider";

export default function AboutPage() {
  const { themeValues } = useThemeSelection();

  return (
    <main
      className="relative flex min-h-[100svh] flex-col overflow-hidden px-4 pb-14 pt-12 sm:px-6 md:px-10"
      style={{
        background: themeValues.background,
        color: themeValues.text.primary,
      }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="orbital-glow glow-one"
          style={{ background: themeValues.glow[0] }}
        />
        <div
          className="orbital-glow glow-two"
          style={{ background: themeValues.glow[1] }}
        />
      </div>

      <article className="mx-auto flex w-full max-w-4xl flex-col gap-8 rounded-3xl border border-white/10 bg-black/20 p-6 text-base text-white/80 sm:p-10">
        <header className="text-center sm:text-left">
          <p
            className="text-xs uppercase tracking-[0.6em]"
            style={{ color: themeValues.text.accent }}
          >
            About
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
            Time Tutor
          </h1>
          <p className="mt-2 text-lg text-white/80">
            A simple, practical way to learn time zone conversions rote.
          </p>
        </header>

        <section className="space-y-4">
          <p>
            Are you in New York and work with someone in London? Want to finally
            stop subtracting 12 when converting 24-hour time? Tired of doing math?
            Time Tutor was built for you.
          </p>
          <p>
            The quiz drills 24-hour clocks, translates meetings between world
            cities, and lets you toggle daylight savings exactly the way your
            team works. Twelve customizable skins keep things fun while muscle
            memory does the rest.
          </p>
          <p>
            Use the Settings page to pin your most common timezone pairs and flip
            DST on/off, then check the Learn page for the daylight-savings
            cheat sheet covering every supported city.
          </p>
        </section>
      </article>
    </main>
  );
}
