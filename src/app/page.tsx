"use client";

import Link from "next/link";
import Script from "next/script";
import {
  type CSSProperties,
  type MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useThemeSelection } from "~/components/theme-provider";
import { type ThemePreset } from "~/lib/themes";
import {
  timezoneOptionMap,
  type TimezonePair,
} from "~/lib/timezones";

type Question = {
  hour24: number;
  minute: number;
  options: string[];
  correct: string;
  sourceZone: string;
  targetZone: string;
  sourceLabel: string;
  targetLabel: string;
  sourceCountry: string;
  targetCountry: string;
  sourceDstEnabled: boolean;
  targetDstEnabled: boolean;
};

type FeedbackState = "idle" | "correct" | "incorrect";

const OPTION_COUNT = 3;
const VARIANT_OFFSETS = [15, 30, 45, 60, 90, 120];

type DstPreferenceState = {
  source: boolean;
  target: boolean;
};

const PLACEHOLDER_QUESTION: Question = {
  hour24: 0,
  minute: 0,
  options: ["12:00 AM", "12:05 AM", "12:10 AM"],
  correct: "12:00 AM",
  sourceZone: "America/New_York",
  targetZone: "America/New_York",
  sourceLabel: "12/24 Hour",
  targetLabel: "12/24 Hour",
  sourceCountry: "United States",
  targetCountry: "United States",
  sourceDstEnabled: true,
  targetDstEnabled: true,
};

export default function HomePage() {
  const { themeValues, timezonePair, dstPreference, setDstPreference } =
    useThemeSelection();
  const [question, setQuestion] = useState<Question | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState>("idle");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skipDstRegenerationRef = useRef(false);

  useEffect(() => {
    const getTimeout = () => timeoutRef.current;
    const getAudioContext = () => audioContextRef.current;

    return () => {
      const timeout = getTimeout();
      if (timeout) {
        clearTimeout(timeout);
      }
      const ctx = getAudioContext();
      if (ctx && ctx.state !== "closed") {
        ctx.close().catch(() => {
          // Ignore close errors on unmounted component
        });
      }
    };
  }, []);

  useEffect(() => {
    if (skipDstRegenerationRef.current) {
      skipDstRegenerationRef.current = false;
      return;
    }
    setQuestion(null);
    setSelectedOption(null);
    setFeedback("idle");
    setQuestion(generateQuestion(timezonePair, dstPreference));
  }, [timezonePair, dstPreference]);

  const accuracy = useMemo(() => {
    if (totalCount === 0) return "N/A";
    return `${Math.round((correctCount / totalCount) * 100)}%`;
  }, [correctCount, totalCount]);

  const activeQuestion = question ?? PLACEHOLDER_QUESTION;
  const isLoadingQuestion = question === null;
  const isSameZone =
    activeQuestion.sourceZone === activeQuestion.targetZone;
  const scenarioHeading = isSameZone
    ? "12/24 Hour"
    : `${activeQuestion.sourceLabel} → ${activeQuestion.targetLabel}`;
  const scenarioSubHeading = isSameZone
    ? activeQuestion.sourceCountry || activeQuestion.sourceLabel
    : `${activeQuestion.sourceCountry || activeQuestion.sourceLabel} to ${activeQuestion.targetCountry || activeQuestion.targetLabel}`;
  const sourceZoneMeta = timezoneOptionMap[timezonePair.source];
  const targetZoneMeta = timezoneOptionMap[timezonePair.target];
  const sourceAllowsDst = !!sourceZoneMeta?.dstObserves;
  const targetAllowsDst = !!targetZoneMeta?.dstObserves;

  const sourceDstStyle = dstPreference.source
    ? {
        background: themeValues.correct.bg,
        borderColor: themeValues.correct.border,
        color: themeValues.correct.text,
        boxShadow: themeValues.correct.shadow,
        opacity: sourceAllowsDst ? 1 : 0.4,
      }
    : {
        background: themeValues.incorrect.bg,
        borderColor: themeValues.incorrect.border,
        color: themeValues.incorrect.text,
        boxShadow: themeValues.incorrect.shadow,
        opacity: sourceAllowsDst ? 1 : 0.4,
      };
  const targetDstStyle = dstPreference.target
    ? {
        background: themeValues.correct.bg,
        borderColor: themeValues.correct.border,
        color: themeValues.correct.text,
        boxShadow: themeValues.correct.shadow,
        opacity: targetAllowsDst ? 1 : 0.4,
      }
    : {
        background: themeValues.incorrect.bg,
        borderColor: themeValues.incorrect.border,
        color: themeValues.incorrect.text,
        boxShadow: themeValues.incorrect.shadow,
        opacity: targetAllowsDst ? 1 : 0.4,
      };

  const handleDstToggle = (target: "source" | "target") => {
    const allows = target === "source" ? sourceAllowsDst : targetAllowsDst;
    if (!allows) return;
    const nextPref: DstPreferenceState = {
      ...dstPreference,
      [target]: !dstPreference[target],
    };
    skipDstRegenerationRef.current = true;
    setDstPreference(nextPref);
    setQuestion((prev) =>
      prev
        ? buildQuestionWithTime(
            prev.hour24,
            prev.minute,
            timezonePair,
            nextPref,
          )
        : prev,
    );
  };

  const structuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "EducationalApplication",
      name: "Time Tutor",
      description:
        "Interactive quiz that teaches how to convert 24-hour clocks to 12-hour time and translate between world time zones.",
      applicationCategory: ["Educational", "Quiz"],
      operatingSystem: "Web",
      inLanguage: "en-US",
      genre: ["Education", "Games"],
      isAccessibleForFree: true,
      publisher: {
        "@type": "Organization",
        name: "blockrush",
      },
      featureList: [
        "Randomized 24h → 12h drills",
        `Timezone focus: ${activeQuestion.sourceLabel} to ${activeQuestion.targetLabel}`,
        `Active skin: ${themeValues.label}`,
      ],
    }),
    [
      activeQuestion.sourceLabel,
      activeQuestion.targetLabel,
      themeValues.label,
    ],
  );

  const handleOptionSelect = (option: string) => {
    if (feedback !== "idle" || !question) return;

    const isCorrect = option === question.correct;
    setSelectedOption(option);
    setFeedback(isCorrect ? "correct" : "incorrect");
    setTotalCount((prev) => prev + 1);
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }

    playSound(isCorrect ? "correct" : "incorrect", audioContextRef);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setQuestion(generateQuestion(timezonePair, dstPreference));
      setSelectedOption(null);
      setFeedback("idle");
    }, 1400);
  };

  const skipQuestion = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setQuestion(generateQuestion(timezonePair, dstPreference));
    setSelectedOption(null);
    setFeedback("idle");
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
        id="time-tutor-structured-data"
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
        <div className="aurora-band" />
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 md:gap-14">
        <header
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          aria-label="Site header"
        >
          <div className="flex flex-col gap-1">
            <span
              className="text-xs uppercase tracking-[0.6em]"
              style={{ color: themeValues.text.accent }}
            >
              Time Tutor
            </span>
          <p className="text-sm text-white/80 sm:text-base">
            A simple, practical way to learn time zone conversions rote.
          </p>
          </div>

          <nav
            aria-label="Primary navigation"
            className="flex flex-wrap items-center gap-3"
          >
            <Link
              href="/settings"
              className="nav-button rounded-full border px-5 py-2 text-sm font-semibold uppercase tracking-[0.25em]"
              style={{
                background: themeValues.button.bg,
                borderColor: themeValues.button.border,
                color: themeValues.button.text,
                boxShadow: themeValues.button.shadow,
              }}
            >
              Settings
            </Link>
            <Link
              href="/learn"
              className="nav-button rounded-full border px-5 py-2 text-sm font-semibold uppercase tracking-[0.25em]"
              style={{
                background: "transparent",
                borderColor: themeValues.option.idle.border,
                color: themeValues.option.idle.text,
                boxShadow: "none",
              }}
            >
              Learn
            </Link>
            <Link
              href="/about"
              className="nav-button rounded-full border px-5 py-2 text-sm font-semibold uppercase tracking-[0.25em]"
              style={{
                background: "transparent",
                borderColor: themeValues.option.idle.border,
                color: themeValues.option.idle.text,
                boxShadow: "none",
              }}
            >
              About
            </Link>
          </nav>
        </header>

        <section
          className="flex flex-col gap-4 text-center sm:gap-6"
          aria-labelledby="quiz-intro-heading"
        >
          <h1
            id="quiz-intro-heading"
            className="text-balance text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl"
            style={{ color: themeValues.text.primary }}
          >
            A simple, practical way to learn time zone conversions rote.
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-base leading-relaxed text-white/80 md:text-lg">
            Are you in New York and work with someone in London? Want to finally
            stop subtracting 12 when converting 24-hour time? Tired of doing math?
          </p>
        </section>

        <article
          className="quiz-card animate-scale-in grid gap-6 rounded-3xl border p-6 shadow-2xl backdrop-blur-sm sm:p-8"
          style={{
            background: themeValues.card.background,
            borderColor: themeValues.card.border,
            boxShadow: themeValues.card.shadow,
          }}
          aria-labelledby="question-heading"
        >
          <div className="flex flex-col items-center gap-4 text-center sm:gap-5">
            <span
              className="text-xs uppercase tracking-[0.45em]"
              style={{ color: themeValues.text.accent }}
            >
              24-hour time
            </span>
            <p
              id="question-heading"
              className="shine-text text-6xl font-bold tracking-tight sm:text-7xl md:text-8xl"
              style={{ color: themeValues.text.primary }}
            >
              {format24(activeQuestion.hour24, activeQuestion.minute)}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-[0.35em] text-white/70">
              <span className="rounded-full border border-white/20 px-3 py-1">
                {isSameZone
                  ? "12/24 Hour"
                  : activeQuestion.sourceLabel}
              </span>
              {!isSameZone && <span>→</span>}
              {!isSameZone && (
                <span className="rounded-full border border-white/20 px-3 py-1">
                  {activeQuestion.targetLabel}
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 text-[0.65rem] uppercase tracking-[0.35em] text-white/70">
              <button
                type="button"
                className="rounded-2xl border border-white/20 px-3 py-1 text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
                onClick={() => handleDstToggle("source")}
                aria-pressed={dstPreference.source}
                style={sourceDstStyle}
                disabled={!sourceAllowsDst}
              >
                Source
                <br />
                Daylight Savings:&nbsp;
                {dstPreference.source ? "On" : "Off"}
              </button>
              <button
                type="button"
                className="rounded-2xl border border-white/20 px-3 py-1 text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
                onClick={() => handleDstToggle("target")}
                aria-pressed={dstPreference.target}
                style={targetDstStyle}
                disabled={!targetAllowsDst}
              >
                Target
                <br />
                Daylight Savings:&nbsp;
                {dstPreference.target ? "On" : "Off"}
              </button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
            {activeQuestion.options.map((option, index) => {
              const isSelected = selectedOption === option;
              const isCorrectOption = question ? option === question.correct : false;
              const isInteractive = feedback === "idle" && !!question;

              const baseStyle =
                isInteractive
                  ? {
                      background: themeValues.option.idle.bg,
                      borderColor: themeValues.option.idle.border,
                      color: themeValues.option.idle.text,
                      boxShadow: themeValues.option.idle.shadow,
                      "--answer-hover-bg": themeValues.option.hover.bg,
                      "--answer-hover-border": themeValues.option.hover.border,
                      "--answer-hover-shadow": themeValues.option.hover.shadow,
                    }
                  : isCorrectOption
                    ? {
                        background: themeValues.correct.bg,
                        borderColor: themeValues.correct.border,
                        color: themeValues.correct.text,
                        boxShadow: themeValues.correct.shadow,
                      }
                    : isSelected
                      ? {
                          background: themeValues.incorrect.bg,
                          borderColor: themeValues.incorrect.border,
                          color: themeValues.incorrect.text,
                          boxShadow: themeValues.incorrect.shadow,
                        }
                      : {
                          background: themeValues.option.reveal.bg,
                          borderColor: themeValues.option.reveal.border,
                          color: themeValues.option.reveal.text,
                          boxShadow: themeValues.option.reveal.shadow,
                        };

              return (
                <button
                  key={`${option}-${index}`}
                  type="button"
                  onClick={() => handleOptionSelect(option)}
                  className="answer-button rounded-2xl border px-4 py-5 text-lg font-medium transition duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40 sm:px-6 sm:py-6 sm:text-xl"
                  style={baseStyle as CSSProperties}
                  disabled={!isInteractive || isLoadingQuestion}
                  aria-pressed={isSelected}
                >
                  {option}
                </button>
              );
            })}
          </div>

          <section
            aria-label="Scoreboard"
            className="animate-rise flex flex-col items-center justify-between gap-4 rounded-2xl border px-5 py-5 text-sm sm:flex-row sm:gap-6 sm:px-6 sm:text-base"
            style={{
              background: themeValues.scoreboard.background,
              borderColor: themeValues.scoreboard.border,
              boxShadow: themeValues.scoreboard.shadow,
              color: themeValues.text.primary,
            }}
          >
            <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
              <span className="text-sm font-semibold">{scenarioHeading}</span>
              <span className="text-xs text-white/70">
                {scenarioSubHeading}
              </span>
            </div>

            <div
              className="flex w-full flex-wrap items-center justify-center gap-5 sm:justify-center"
              aria-live="polite"
            >
              <ScoreChip
                label="Correct"
                value={correctCount.toString()}
                theme={themeValues}
              />
              <ScoreChip
                label="Answered"
                value={totalCount.toString()}
                theme={themeValues}
              />
              <ScoreChip label="Accuracy" value={accuracy} theme={themeValues} />
            </div>

            <div className="flex flex-col items-center gap-4 sm:flex-row">
              {feedback === "correct" && (
                <span style={{ color: themeValues.accentNote }}>Nice work!</span>
              )}
              {feedback === "incorrect" && (
                <span style={{ color: themeValues.incorrect.text }}>
                  Correct answer: {question?.correct}
                </span>
              )}
              <button
                type="button"
                onClick={skipQuestion}
                className="skip-button rounded-full border px-5 py-2 text-sm font-semibold uppercase tracking-[0.3em] sm:text-base"
                style={{
                  background: themeValues.button.bg,
                  borderColor: themeValues.button.border,
                  color: themeValues.button.text,
                  boxShadow: themeValues.button.shadow,
                  "--skip-hover-bg": themeValues.button.hoverBg,
                  "--skip-hover-border": themeValues.button.hoverBorder,
                  "--skip-hover-shadow": themeValues.button.hoverShadow,
                } as CSSProperties}
              >
                Next question
              </button>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}

function ScoreChip(props: {
  label: string;
  value: string;
  theme: ThemePreset;
}) {
  return (
    <div className="flex flex-col text-left text-white">
      <span
        className="text-xs uppercase tracking-[0.3em]"
        style={{ color: props.theme.chip.label }}
      >
        {props.label}
      </span>
      <span
        className="text-lg font-semibold sm:text-xl"
        style={{ color: props.theme.chip.value }}
      >
        {props.value}
      </span>
    </div>
  );
}

function format24(hour: number, minute: number) {
  return `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;
}

function formatMinutesTo12h(totalMinutes: number) {
  const hours24 = Math.floor(totalMinutes / 60) % 24;
  const minutes = totalMinutes % 60;
  const period = hours24 >= 12 ? "PM" : "AM";
  let hour12 = hours24 % 12;
  if (hour12 === 0) hour12 = 12;
  return `${hour12}:${minutes.toString().padStart(2, "0")} ${period}`;
}

function normalizeMinutes(value: number) {
  let result = value % 1440;
  if (result < 0) result += 1440;
  return result;
}

function getOffsetForZone(zoneId: string, useDst: boolean) {
  const meta = timezoneOptionMap[zoneId];
  if (!meta) return 0;
  if (!meta.dstObserves || !useDst) {
    return meta.standardOffsetMinutes;
  }
  return meta.dstOffsetMinutes ?? meta.standardOffsetMinutes;
}

function generateQuestion(
  pair: TimezonePair,
  dstPreference: DstPreferenceState,
): Question {
  const hour24 = Math.floor(Math.random() * 24);
  const minute = Math.floor(Math.random() * 12) * 5;
  return buildQuestionWithTime(hour24, minute, pair, dstPreference);
}

function buildQuestionWithTime(
  hour24: number,
  minute: number,
  pair: TimezonePair,
  dstPreference: DstPreferenceState,
): Question {
  const sourceMeta = timezoneOptionMap[pair.source];
  const targetMeta = timezoneOptionMap[pair.target];
  const sourceOffset = getOffsetForZone(pair.source, dstPreference.source);
  const targetOffset = getOffsetForZone(pair.target, dstPreference.target);

  const localMinutes = hour24 * 60 + minute;
  const utcMinutes = normalizeMinutes(localMinutes - sourceOffset);
  const targetMinutes = normalizeMinutes(utcMinutes + targetOffset);
  const correct = formatMinutesTo12h(targetMinutes);

  const options = new Set<string>([correct]);
  while (options.size < OPTION_COUNT) {
    const delta =
      (VARIANT_OFFSETS[Math.floor(Math.random() * VARIANT_OFFSETS.length)] ??
        15) * (Math.random() < 0.5 ? -1 : 1);
    options.add(formatMinutesTo12h(normalizeMinutes(targetMinutes + delta)));
  }

  return {
    hour24,
    minute,
    options: shuffleArray(Array.from(options)),
    correct,
    sourceZone: pair.source,
    targetZone: pair.target,
    sourceLabel: sourceMeta?.label ?? pair.source,
    targetLabel: targetMeta?.label ?? pair.target,
    sourceCountry: sourceMeta?.country ?? "",
    targetCountry: targetMeta?.country ?? "",
    sourceDstEnabled: dstPreference.source && !!sourceMeta?.dstObserves,
    targetDstEnabled: dstPreference.target && !!targetMeta?.dstObserves,
  };
}
function shuffleArray<T>(values: Iterable<T>): T[] {
  const array = Array.from(values);
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i]!;
    array[i] = array[j]!;
    array[j] = temp;
  }
  return array;
}

function playSound(
  type: "correct" | "incorrect",
  audioRef: MutableRefObject<AudioContext | null>,
) {
  if (typeof window === "undefined") return;

  const getAudioContext = () => {
    if (!audioRef.current) {
      const AudioCtor =
        window.AudioContext ??
        (window as unknown as {
          webkitAudioContext?: typeof window.AudioContext;
        }).webkitAudioContext;

      if (!AudioCtor) return null;

      audioRef.current = new AudioCtor();
    }

    if (audioRef.current.state === "suspended") {
      void audioRef.current.resume();
    }

    return audioRef.current;
  };

  const ctx = getAudioContext();
  if (!ctx) return;

  const notes =
    type === "correct" ? [523.25, 659.25, 783.99] : [196.0, 174.61, 164.81];
  const baseTime = ctx.currentTime;

  notes.forEach((frequency, index) => {
    const start = baseTime + index * 0.18;
    const end = start + 0.25;

    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = type === "correct" ? "sine" : "sawtooth";
    oscillator.frequency.setValueAtTime(frequency, start);

    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.35, start + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, end);

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start(start);
    oscillator.stop(end);
  });
}
