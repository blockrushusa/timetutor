"use client";

import Link from "next/link";
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

type Question = {
  hour24: number;
  minute: number;
  options: string[];
  correct: string;
};

type FeedbackState = "idle" | "correct" | "incorrect";

const OPTION_COUNT = 3;
const PLACEHOLDER_QUESTION: Question = {
  hour24: 0,
  minute: 0,
  options: ["12:00 AM", "12:05 AM", "12:10 AM"],
  correct: "12:00 AM",
};

export default function HomePage() {
  const { themeValues, theme } = useThemeSelection();
  const [question, setQuestion] = useState<Question | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState>("idle");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setQuestion(generateQuestion());

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

  const accuracy = useMemo(() => {
    if (totalCount === 0) return "N/A";
    return `${Math.round((correctCount / totalCount) * 100)}%`;
  }, [correctCount, totalCount]);

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
      setQuestion(generateQuestion());
      setSelectedOption(null);
      setFeedback("idle");
    }, 1400);
  };

  const skipQuestion = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setQuestion(generateQuestion());
    setSelectedOption(null);
    setFeedback("idle");
  };

  const activeQuestion = question ?? PLACEHOLDER_QUESTION;
  const isLoadingQuestion = question === null;

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
        <div className="aurora-band" />
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 md:gap-14">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <span
              className="text-xs uppercase tracking-[0.6em]"
              style={{ color: themeValues.text.accent }}
            >
              Time Tutor
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
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
          </div>
        </div>

        <header className="flex flex-col gap-4 text-center sm:gap-6">
          <h1
            className="text-balance text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl"
            style={{ color: themeValues.text.primary }}
          >
            Convert 24-hour clocks to 12-hour time in seconds flat.
          </h1>
          <p
            className="mx-auto max-w-2xl text-pretty text-base leading-relaxed md:text-lg"
            style={{ color: themeValues.text.secondary }}
          >
            Tap the matching clock while the beat plays. Each win boosts your
            accuracy streak, then dive into settings whenever you want a new
            look.
          </p>
        </header>

        <section
          className="quiz-card animate-scale-in grid gap-6 rounded-3xl border p-6 shadow-2xl backdrop-blur-sm sm:p-8"
          style={{
            background: themeValues.card.background,
            borderColor: themeValues.card.border,
            boxShadow: themeValues.card.shadow,
          }}
        >
          <div className="flex flex-col items-center gap-4 text-center sm:gap-5">
            <span
              className="text-xs uppercase tracking-[0.45em]"
              style={{ color: themeValues.text.accent }}
            >
              24-hour time
            </span>
            <p
              className="shine-text text-6xl font-bold tracking-tight sm:text-7xl md:text-8xl"
              style={{ color: themeValues.text.primary }}
            >
              {format24(activeQuestion.hour24, activeQuestion.minute)}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
            {activeQuestion.options.map((option, index) => {
              const isSelected = selectedOption === option;
              const isCorrect = option === question?.correct;

              const baseStyle =
                feedback === "idle" && question
                  ? {
                      background: themeValues.option.idle.bg,
                      borderColor: themeValues.option.idle.border,
                      color: themeValues.option.idle.text,
                      boxShadow: themeValues.option.idle.shadow,
                      "--answer-hover-bg": themeValues.option.hover.bg,
                      "--answer-hover-border": themeValues.option.hover.border,
                      "--answer-hover-shadow": themeValues.option.hover.shadow,
                    }
                  : isCorrect
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
                  disabled={feedback !== "idle" || isLoadingQuestion}
                >
                  {option}
                </button>
              );
            })}
          </div>

          <div
            className="animate-rise flex flex-col items-center justify-between gap-4 rounded-2xl border px-5 py-5 text-sm sm:flex-row sm:gap-6 sm:px-6 sm:text-base"
            style={{
              background: themeValues.scoreboard.background,
              borderColor: themeValues.scoreboard.border,
              boxShadow: themeValues.scoreboard.shadow,
              color: themeValues.text.primary,
            }}
          >
            <div className="flex w-full flex-wrap items-center justify-center gap-5 sm:justify-start">
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
          </div>
        </section>
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
    <div className="flex flex-col text-left">
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

function format12(hour: number, minute: number) {
  const period = hour >= 12 ? "PM" : "AM";
  let hour12 = hour % 12;
  if (hour12 === 0) {
    hour12 = 12;
  }
  return `${hour12}:${minute.toString().padStart(2, "0")} ${period}`;
}

function generateQuestion(): Question {
  const hour24 = Math.floor(Math.random() * 24);
  const minute = Math.floor(Math.random() * 12) * 5;
  const correct = format12(hour24, minute);

  const distractors = new Set<string>();
  while (distractors.size < OPTION_COUNT - 1) {
    const variant = createVariant(hour24, minute);
    const formatted = format12(variant.hour, variant.minute);
    if (formatted !== correct) {
      distractors.add(formatted);
    }
  }

  const options = shuffleArray([correct, ...distractors]);

  return {
    hour24,
    minute,
    options,
    correct,
  };
}

function createVariant(hour: number, minute: number) {
  const mode = Math.random();

  if (mode < 0.4) {
    const offset = Math.random() < 0.5 ? -1 : 1;
    return normalizeTime(hour + offset, minute);
  }

  if (mode < 0.75) {
    const offsetSteps = Math.floor(Math.random() * 3 + 1);
    const minuteOffset = offsetSteps * 5 * (Math.random() < 0.5 ? -1 : 1);
    return normalizeTime(hour, minute + minuteOffset);
  }

  return normalizeTime(hour + 12, minute);
}

function normalizeTime(hour: number, minute: number) {
  let newHour = hour;
  let newMinute = minute;

  while (newMinute >= 60) {
    newMinute -= 60;
    newHour += 1;
  }

  while (newMinute < 0) {
    newMinute += 60;
    newHour -= 1;
  }

  newHour = ((newHour % 24) + 24) % 24;

  return { hour: newHour, minute: newMinute };
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
