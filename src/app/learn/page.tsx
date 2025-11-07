"use client";

import Script from "next/script";

import { useThemeSelection } from "~/components/theme-provider";
import { timezoneOptions } from "~/lib/timezones";

export default function LearnPage() {
  const { themeValues } = useThemeSelection();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Time Tutor DST Reference",
    description:
      "A curated daylight savings reference for each timezone supported inside the Time Tutor training app.",
    creator: { "@type": "Organization", name: "blockrush" },
    inLanguage: "en-US",
    license: "https://creativecommons.org/licenses/by/4.0/",
    datasetTimeInterval: "2024/2025",
    data: timezoneOptions.map((zone) => ({
      "@type": "Place",
      name: zone.label,
      address: zone.country,
      timeZone: zone.id,
      "dst:observes": zone.dstObserves,
      "dst:standardOffsetMinutes": zone.standardOffsetMinutes,
      "dst:offsetLabel": zone.offsetLabel,
      "dst:startNote": zone.dstStartNote ?? null,
      "dst:endNote": zone.dstEndNote ?? null,
    })),
  };

  return (
    <main
      className="relative flex min-h-[100svh] flex-col overflow-hidden px-4 pb-14 pt-12 sm:px-6 md:px-10"
      style={{
        background: themeValues.background,
        color: themeValues.text.primary,
      }}
    >
      <Script
        id="time-tutor-dst-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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

      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10">
        <header className="flex flex-col gap-4 text-center sm:text-left">
          <p
            className="text-xs uppercase tracking-[0.6em]"
            style={{ color: themeValues.text.accent }}
          >
            Learn
          </p>
          <h1 className="text-balance text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
            Daylight savings cheat sheet
          </h1>
          <p className="text-base text-white/80 sm:text-lg">
            Not every city observes daylight savings, and those that do flip on
            different weeks. Use this quick reference to know when offsets
            change before you hop back to the quiz.
          </p>
        </header>

        <section className="rounded-3xl border border-white/10 bg-black/25 p-4 sm:p-6">
          <div className="grid grid-cols-1 gap-4">
            {timezoneOptions.map((zone) => (
              <article
                key={zone.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold">{zone.label}</h2>
                    <p className="text-sm text-white/70">{zone.country}</p>
                  </div>
                  <span className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.35em] text-white/70">
                    {zone.offsetLabel}
                  </span>
                </div>
                <dl className="mt-4 grid gap-3 text-sm text-white/80 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs uppercase tracking-[0.4em] text-white/60">
                      Daylight savings
                    </dt>
                    <dd>
                      {zone.dstObserves
                        ? "Observed"
                        : "Not observed (offset fixed year-round)"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.4em] text-white/60">
                      Standard offset
                    </dt>
                    <dd>
                      {formatOffset(zone.standardOffsetMinutes)}{" "}
                      {zone.dstObserves && zone.dstOffsetMinutes !== undefined
                        ? `(DST: ${formatOffset(zone.dstOffsetMinutes)})`
                        : ""}
                    </dd>
                  </div>
                  {zone.dstObserves && (
                    <>
                      <div>
                        <dt className="text-xs uppercase tracking-[0.4em] text-white/60">
                          DST begins
                        </dt>
                        <dd>{zone.dstStartNote ?? "Varies"}</dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase tracking-[0.4em] text-white/60">
                          DST ends
                        </dt>
                        <dd>{zone.dstEndNote ?? "Varies"}</dd>
                      </div>
                    </>
                  )}
                </dl>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function formatOffset(minutes: number) {
  const sign = minutes >= 0 ? "+" : "-";
  const absolute = Math.abs(minutes);
  const hours = Math.floor(absolute / 60)
    .toString()
    .padStart(2, "0");
  const mins = (absolute % 60).toString().padStart(2, "0");
  return `GMT${sign}${hours}:${mins}`;
}
