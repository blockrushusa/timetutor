export type ThemeName =
  | "space"
  | "candy"
  | "coffee"
  | "purpleManEater"
  | "fuchsia"
  | "leopard"
  | "sexy"
  | "wires"
  | "aurora"
  | "sunset"
  | "mint"
  | "ember";

export type ThemePreset = {
  label: string;
  description: string;
  background: string;
  glow: [string, string];
  text: { primary: string; secondary: string; accent: string; muted: string };
  card: { background: string; border: string; shadow: string };
  option: {
    idle: { bg: string; border: string; text: string; shadow: string };
    hover: { bg: string; border: string; shadow: string };
    reveal: { bg: string; border: string; text: string; shadow: string };
  };
  scoreboard: { background: string; border: string; shadow: string };
  chip: { label: string; value: string };
  button: {
    bg: string;
    border: string;
    text: string;
    shadow: string;
    hoverBg: string;
    hoverBorder: string;
    hoverShadow: string;
  };
  correct: { bg: string; border: string; text: string; shadow: string };
  incorrect: { bg: string; border: string; text: string; shadow: string };
  accentNote: string;
  preview: {
    background: string;
    text: string;
    border: string;
    shadow: string;
    activeBorder: string;
    activeShadow: string;
  };
};

// Theme definitions truncated for brevity in commentless section; maintain ASCII colors.
export const themePresets: Record<ThemeName, ThemePreset> = {
  space: {
    label: "Space Drift",
    description: "Deep blues and nebula glow for cosmic vibes.",
    background:
      "radial-gradient(circle at 20% 20%, #2f3b8f 0%, rgba(15,20,40,0.92) 46%, #050814 100%)",
    glow: ["rgba(99, 102, 241, 0.35)", "rgba(59, 130, 246, 0.28)"],
    text: {
      primary: "#f5f7ff",
      secondary: "#c3c9ff",
      accent: "#7dd3fc",
      muted: "#9aa8d9",
    },
    card: {
      background: "rgba(8, 13, 32, 0.72)",
      border: "rgba(129, 140, 248, 0.45)",
      shadow: "0 20px 60px rgba(46, 64, 160, 0.45)",
    },
    option: {
      idle: {
        bg: "linear-gradient(135deg, rgba(40, 54, 120, 0.65), rgba(23, 32, 70, 0.65))",
        border: "rgba(129, 140, 248, 0.6)",
        text: "#f5f7ff",
        shadow: "0 10px 30px rgba(30, 40, 90, 0.45)",
      },
      hover: {
        bg: "linear-gradient(135deg, rgba(122, 140, 255, 0.55), rgba(68, 84, 190, 0.65))",
        border: "rgba(165, 180, 252, 0.85)",
        shadow: "0 16px 35px rgba(70, 90, 190, 0.55)",
      },
      reveal: {
        bg: "linear-gradient(135deg, rgba(18, 24, 55, 0.65), rgba(10, 15, 35, 0.7))",
        border: "rgba(82, 102, 220, 0.4)",
        text: "#cbd5f5",
        shadow: "0 6px 20px rgba(20, 30, 60, 0.4)",
      },
    },
    scoreboard: {
      background: "rgba(7, 11, 30, 0.78)",
      border: "rgba(99, 102, 241, 0.32)",
      shadow: "0 18px 45px rgba(26, 38, 102, 0.4)",
    },
    chip: { label: "rgba(148, 163, 255, 0.75)", value: "#ffffff" },
    button: {
      bg: "linear-gradient(135deg, rgba(51, 65, 152, 0.7), rgba(29, 38, 95, 0.7))",
      border: "rgba(129, 140, 248, 0.65)",
      text: "#f8fafc",
      shadow: "0 10px 26px rgba(40, 52, 128, 0.45)",
      hoverBg:
        "linear-gradient(135deg, rgba(110, 126, 255, 0.7), rgba(62, 86, 192, 0.75))",
      hoverBorder: "#a5b4fc",
      hoverShadow: "0 14px 32px rgba(64, 78, 190, 0.6)",
    },
    correct: {
      bg: "linear-gradient(135deg, rgba(16, 185, 129, 0.55), rgba(20, 148, 123, 0.55))",
      border: "rgba(45, 212, 191, 0.8)",
      text: "#ecfdf5",
      shadow: "0 14px 32px rgba(13, 148, 136, 0.4)",
    },
    incorrect: {
      bg: "linear-gradient(135deg, rgba(239, 68, 68, 0.45), rgba(190, 24, 93, 0.5))",
      border: "rgba(248, 113, 113, 0.7)",
      text: "#fee2e2",
      shadow: "0 12px 28px rgba(225, 29, 72, 0.4)",
    },
    accentNote: "#c7d2fe",
    preview: {
      background: "linear-gradient(135deg, #312e81, #1e3a8a)",
      text: "#f9fafb",
      border: "rgba(99, 102, 241, 0.5)",
      shadow: "0 0 0 rgba(0,0,0,0)",
      activeBorder: "#c7d2fe",
      activeShadow: "0 14px 32px rgba(99, 102, 241, 0.5)",
    },
  },
  candy: {
    label: "Candy Bright Delicious",
    description: "Sweets-inspired brights with juicy gradients.",
    background:
      "radial-gradient(circle at 0% 0%, rgba(255, 198, 231, 0.85) 0%, rgba(250, 128, 114, 0.45) 35%, #ffe4ff 100%)",
    glow: ["rgba(255, 162, 201, 0.55)", "rgba(253, 224, 71, 0.4)"],
    text: {
      primary: "#3f0f2c",
      secondary: "#602341",
      accent: "#ff6ab5",
      muted: "#86425b",
    },
    card: {
      background: "rgba(255, 255, 255, 0.78)",
      border: "rgba(255, 182, 193, 0.7)",
      shadow: "0 20px 60px rgba(255, 120, 180, 0.35)",
    },
    option: {
      idle: {
        bg: "linear-gradient(135deg, rgba(255, 186, 212, 0.85), rgba(255, 231, 143, 0.9))",
        border: "rgba(255, 154, 198, 0.85)",
        text: "#3f0f2c",
        shadow: "0 12px 28px rgba(255, 143, 177, 0.45)",
      },
      hover: {
        bg: "linear-gradient(135deg, rgba(255, 154, 198, 0.95), rgba(255, 214, 126, 0.95))",
        border: "#fb7185",
        shadow: "0 16px 36px rgba(245, 127, 176, 0.55)",
      },
      reveal: {
        bg: "linear-gradient(135deg, rgba(255, 207, 227, 0.85), rgba(255, 244, 214, 0.85))",
        border: "rgba(252, 165, 179, 0.7)",
        text: "#5b1b3a",
        shadow: "0 10px 24px rgba(245, 158, 178, 0.4)",
      },
    },
    scoreboard: {
      background: "rgba(255, 245, 247, 0.85)",
      border: "rgba(251, 191, 217, 0.8)",
      shadow: "0 18px 45px rgba(244, 114, 182, 0.35)",
    },
    chip: { label: "rgba(190, 24, 93, 0.6)", value: "#7f1d4e" },
    button: {
      bg: "linear-gradient(135deg, rgba(255, 182, 193, 0.9), rgba(255, 218, 185, 0.95))",
      border: "rgba(251, 191, 217, 0.85)",
      text: "#4a0e2d",
      shadow: "0 12px 26px rgba(244, 114, 182, 0.4)",
      hoverBg:
        "linear-gradient(135deg, rgba(255, 154, 198, 0.95), rgba(255, 196, 138, 0.95))",
      hoverBorder: "#f472b6",
      hoverShadow: "0 16px 34px rgba(244, 114, 182, 0.55)",
    },
    correct: {
      bg: "linear-gradient(135deg, rgba(74, 222, 128, 0.55), rgba(34, 197, 94, 0.5))",
      border: "rgba(34, 197, 94, 0.8)",
      text: "#044e28",
      shadow: "0 14px 32px rgba(34, 197, 94, 0.4)",
    },
    incorrect: {
      bg: "linear-gradient(135deg, rgba(244, 63, 94, 0.45), rgba(220, 38, 38, 0.45))",
      border: "rgba(248, 113, 113, 0.7)",
      text: "#7f1d1d",
      shadow: "0 12px 28px rgba(220, 38, 38, 0.4)",
    },
    accentNote: "#fb7185",
    preview: {
      background: "linear-gradient(135deg, #fda4af, #f97316)",
      text: "#3f0f2c",
      border: "rgba(251, 191, 217, 0.8)",
      shadow: "0 10px 20px rgba(249, 115, 22, 0.25)",
      activeBorder: "#fb7185",
      activeShadow: "0 14px 34px rgba(244, 114, 182, 0.5)",
    },
  },
  coffee: {
    label: "Morning Brew",
    description: "Rich espresso browns with warm crema glow.",
    background:
      "radial-gradient(circle at 50% 0%, rgba(115, 76, 60, 0.85) 0%, rgba(41, 24, 15, 0.92) 55%, #120806 100%)",
    glow: ["rgba(210, 155, 102, 0.35)", "rgba(120, 79, 49, 0.45)"],
    text: {
      primary: "#f8f4ef",
      secondary: "#e8d9cc",
      accent: "#fac89b",
      muted: "#c7b3a3",
    },
    card: {
      background: "rgba(43, 28, 21, 0.82)",
      border: "rgba(214, 162, 108, 0.35)",
      shadow: "0 22px 60px rgba(52, 32, 21, 0.55)",
    },
    option: {
      idle: {
        bg: "linear-gradient(135deg, rgba(107, 63, 44, 0.7), rgba(58, 34, 24, 0.8))",
        border: "rgba(214, 162, 108, 0.5)",
        text: "#f8f4ef",
        shadow: "0 12px 30px rgba(62, 39, 29, 0.55)",
      },
      hover: {
        bg: "linear-gradient(135deg, rgba(139, 84, 54, 0.8), rgba(86, 53, 33, 0.85))",
        border: "rgba(249, 168, 92, 0.65)",
        shadow: "0 16px 38px rgba(86, 53, 33, 0.55)",
      },
      reveal: {
        bg: "linear-gradient(135deg, rgba(61, 39, 28, 0.8), rgba(35, 21, 15, 0.75))",
        border: "rgba(160, 113, 80, 0.45)",
        text: "#f1e5d9",
        shadow: "0 10px 26px rgba(40, 24, 16, 0.45)",
      },
    },
    scoreboard: {
      background: "rgba(32, 20, 15, 0.84)",
      border: "rgba(214, 162, 108, 0.3)",
      shadow: "0 18px 48px rgba(40, 24, 16, 0.45)",
    },
    chip: { label: "rgba(250, 202, 173, 0.72)", value: "#fff7ed" },
    button: {
      bg: "linear-gradient(135deg, rgba(120, 74, 46, 0.85), rgba(84, 49, 30, 0.85))",
      border: "rgba(233, 196, 138, 0.45)",
      text: "#f8f4ef",
      shadow: "0 12px 30px rgba(84, 49, 30, 0.55)",
      hoverBg:
        "linear-gradient(135deg, rgba(147, 84, 43, 0.9), rgba(106, 63, 36, 0.9))",
      hoverBorder: "rgba(249, 168, 92, 0.7)",
      hoverShadow: "0 16px 36px rgba(106, 63, 36, 0.6)",
    },
    correct: {
      bg: "linear-gradient(135deg, rgba(74, 222, 128, 0.48), rgba(34, 197, 94, 0.45))",
      border: "rgba(34, 197, 94, 0.65)",
      text: "#fdfcfb",
      shadow: "0 14px 32px rgba(34, 197, 94, 0.35)",
    },
    incorrect: {
      bg: "linear-gradient(135deg, rgba(239, 68, 68, 0.45), rgba(190, 18, 64, 0.45))",
      border: "rgba(239, 68, 68, 0.6)",
      text: "#fee2e2",
      shadow: "0 12px 30px rgba(190, 18, 60, 0.35)",
    },
    accentNote: "#f6cbaa",
    preview: {
      background: "linear-gradient(135deg, #78350f, #451a03)",
      text: "#fef3c7",
      border: "rgba(214, 162, 108, 0.55)",
      shadow: "0 10px 26px rgba(68, 32, 10, 0.4)",
      activeBorder: "#fbbf24",
      activeShadow: "0 16px 34px rgba(251, 191, 36, 0.4)",
    },
  },
  purpleManEater: {
    label: "Purple Man-Eater",
    description: "Savage orchid purples with electric highlights.",
    background:
      "radial-gradient(circle at 25% 25%, rgba(168, 85, 247, 0.65) 0%, rgba(76, 29, 149, 0.9) 45%, #1f0b2e 100%)",
    glow: ["rgba(168, 85, 247, 0.45)", "rgba(236, 72, 153, 0.4)"],
    text: {
      primary: "#fdf4ff",
      secondary: "#e9d5ff",
      accent: "#f472b6",
      muted: "#d8b4fe",
    },
    card: {
      background: "rgba(61, 27, 88, 0.78)",
      border: "rgba(192, 132, 252, 0.55)",
      shadow: "0 24px 62px rgba(126, 34, 206, 0.45)",
    },
    option: {
      idle: {
        bg: "linear-gradient(135deg, rgba(126, 34, 206, 0.7), rgba(76, 29, 149, 0.75))",
        border: "rgba(232, 121, 249, 0.6)",
        text: "#fdf4ff",
        shadow: "0 12px 32px rgba(88, 28, 135, 0.5)",
      },
      hover: {
        bg: "linear-gradient(135deg, rgba(192, 132, 252, 0.8), rgba(139, 92, 246, 0.85))",
        border: "rgba(244, 114, 182, 0.85)",
        shadow: "0 18px 38px rgba(139, 92, 246, 0.6)",
      },
      reveal: {
        bg: "linear-gradient(135deg, rgba(74, 29, 150, 0.75), rgba(54, 22, 98, 0.8))",
        border: "rgba(147, 51, 234, 0.5)",
        text: "#f5e8ff",
        shadow: "0 10px 28px rgba(67, 20, 96, 0.5)",
      },
    },
    scoreboard: {
      background: "rgba(52, 22, 78, 0.82)",
      border: "rgba(192, 132, 252, 0.4)",
      shadow: "0 20px 52px rgba(91, 33, 182, 0.45)",
    },
    chip: { label: "rgba(233, 213, 255, 0.75)", value: "#fff7fb" },
    button: {
      bg: "linear-gradient(135deg, rgba(129, 31, 161, 0.8), rgba(109, 40, 217, 0.85))",
      border: "rgba(216, 180, 254, 0.6)",
      text: "#fdf4ff",
      shadow: "0 14px 34px rgba(124, 58, 237, 0.5)",
      hoverBg:
        "linear-gradient(135deg, rgba(168, 85, 247, 0.85), rgba(139, 92, 246, 0.9))",
      hoverBorder: "#f472b6",
      hoverShadow: "0 18px 40px rgba(168, 85, 247, 0.6)",
    },
    correct: {
      bg: "linear-gradient(135deg, rgba(45, 212, 191, 0.55), rgba(20, 184, 166, 0.55))",
      border: "rgba(45, 212, 191, 0.8)",
      text: "#ecfdf5",
      shadow: "0 14px 34px rgba(20, 184, 166, 0.45)",
    },
    incorrect: {
      bg: "linear-gradient(135deg, rgba(244, 114, 182, 0.45), rgba(190, 24, 93, 0.45))",
      border: "rgba(251, 113, 133, 0.7)",
      text: "#ffe4f3",
      shadow: "0 12px 30px rgba(190, 24, 93, 0.45)",
    },
    accentNote: "#f5d0fe",
    preview: {
      background: "linear-gradient(135deg, #7e22ce, #db2777)",
      text: "#fdf4ff",
      border: "rgba(233, 213, 255, 0.6)",
      shadow: "0 12px 26px rgba(124, 58, 237, 0.45)",
      activeBorder: "#f472b6",
      activeShadow: "0 18px 38px rgba(124, 58, 237, 0.6)",
    },
  },
  fuchsia: {
    label: "Fuchsia Bloom",
    description: "Ultra-bold magenta with electric highlights.",
    background:
      "radial-gradient(circle at 70% 10%, rgba(244, 114, 182, 0.6) 0%, rgba(236, 72, 153, 0.75) 35%, #360020 100%)",
    glow: ["rgba(249, 168, 212, 0.45)", "rgba(168, 85, 247, 0.35)"],
    text: {
      primary: "#fff0f8",
      secondary: "#ffd0e8",
      accent: "#fbb6ce",
      muted: "#f5a7c7",
    },
    card: {
      background: "rgba(97, 18, 69, 0.78)",
      border: "rgba(244, 114, 182, 0.55)",
      shadow: "0 22px 58px rgba(236, 72, 153, 0.45)",
    },
    option: {
      idle: {
        bg: "linear-gradient(135deg, rgba(190, 24, 93, 0.75), rgba(225, 29, 72, 0.7))",
        border: "rgba(244, 114, 182, 0.7)",
        text: "#fff0f8",
        shadow: "0 12px 32px rgba(190, 24, 93, 0.55)",
      },
      hover: {
        bg: "linear-gradient(135deg, rgba(236, 72, 153, 0.85), rgba(219, 39, 119, 0.85))",
        border: "#fbcfe8",
        shadow: "0 18px 40px rgba(236, 72, 153, 0.6)",
      },
      reveal: {
        bg: "linear-gradient(135deg, rgba(131, 24, 67, 0.75), rgba(91, 17, 50, 0.75))",
        border: "rgba(219, 112, 147, 0.55)",
        text: "#ffe4f1",
        shadow: "0 10px 28px rgba(131, 24, 67, 0.5)",
      },
    },
    scoreboard: {
      background: "rgba(76, 15, 51, 0.8)",
      border: "rgba(244, 114, 182, 0.5)",
      shadow: "0 20px 50px rgba(190, 24, 93, 0.45)",
    },
    chip: { label: "rgba(253, 164, 175, 0.75)", value: "#fff0f8" },
    button: {
      bg: "linear-gradient(135deg, rgba(219, 39, 119, 0.85), rgba(190, 24, 93, 0.85))",
      border: "rgba(253, 164, 175, 0.7)",
      text: "#fff0f8",
      shadow: "0 12px 34px rgba(219, 39, 119, 0.55)",
      hoverBg:
        "linear-gradient(135deg, rgba(244, 114, 182, 0.9), rgba(236, 72, 153, 0.9))",
      hoverBorder: "#fbcfe8",
      hoverShadow: "0 18px 40px rgba(236, 72, 153, 0.6)",
    },
    correct: {
      bg: "linear-gradient(135deg, rgba(34, 197, 94, 0.55), rgba(16, 185, 129, 0.55))",
      border: "rgba(34, 197, 94, 0.8)",
      text: "#ecfdf5",
      shadow: "0 14px 34px rgba(16, 185, 129, 0.45)",
    },
    incorrect: {
      bg: "linear-gradient(135deg, rgba(244, 63, 94, 0.5), rgba(190, 18, 60, 0.45))",
      border: "rgba(250, 128, 114, 0.7)",
      text: "#ffe4e6",
      shadow: "0 12px 30px rgba(225, 29, 72, 0.4)",
    },
    accentNote: "#fecdd3",
    preview: {
      background: "linear-gradient(135deg, #db2777, #f472b6)",
      text: "#fff0f8",
      border: "rgba(244, 114, 182, 0.6)",
      shadow: "0 12px 30px rgba(236, 72, 153, 0.45)",
      activeBorder: "#fecdd3",
      activeShadow: "0 18px 40px rgba(236, 72, 153, 0.6)",
    },
  },
  leopard: {
    label: "Leopard Print",
    description: "Golden jungle with a bold spotted pattern.",
    background:
      "linear-gradient(120deg, rgba(102, 72, 28, 0.95) 0%, rgba(58, 37, 15, 0.9) 45%, #1f1407 100%)",
    glow: ["rgba(251, 191, 36, 0.35)", "rgba(245, 158, 11, 0.4)"],
    text: {
      primary: "#fdf6e8",
      secondary: "#f3d7a9",
      accent: "#fbbf24",
      muted: "#d6ad6b",
    },
    card: {
      background:
        "repeating-radial-gradient(circle at 20% 20%, rgba(142, 88, 33, 0.35) 0, rgba(142, 88, 33, 0.35) 6px, rgba(66, 43, 17, 0.4) 12px) , rgba(61, 40, 16, 0.75)",
      border: "rgba(237, 137, 54, 0.45)",
      shadow: "0 24px 60px rgba(120, 63, 4, 0.5)",
    },
    option: {
      idle: {
        bg: "linear-gradient(135deg, rgba(217, 119, 6, 0.75), rgba(125, 76, 15, 0.85))",
        border: "rgba(251, 191, 36, 0.6)",
        text: "#fdf6e8",
        shadow: "0 14px 34px rgba(120, 63, 4, 0.55)",
      },
      hover: {
        bg: "linear-gradient(135deg, rgba(251, 191, 36, 0.85), rgba(217, 119, 6, 0.85))",
        border: "#facc15",
        shadow: "0 18px 40px rgba(217, 119, 6, 0.6)",
      },
      reveal: {
        bg: "linear-gradient(135deg, rgba(92, 52, 16, 0.8), rgba(61, 35, 12, 0.8))",
        border: "rgba(203, 140, 53, 0.55)",
        text: "#fde68a",
        shadow: "0 12px 30px rgba(92, 52, 16, 0.5)",
      },
    },
    scoreboard: {
      background: "rgba(50, 30, 10, 0.82)",
      border: "rgba(217, 119, 6, 0.45)",
      shadow: "0 22px 54px rgba(102, 55, 2, 0.5)",
    },
    chip: { label: "rgba(253, 230, 138, 0.75)", value: "#fff7ed" },
    button: {
      bg: "linear-gradient(135deg, rgba(217, 119, 6, 0.85), rgba(180, 83, 9, 0.85))",
      border: "rgba(249, 196, 106, 0.7)",
      text: "#fdf6e8",
      shadow: "0 14px 36px rgba(180, 83, 9, 0.55)",
      hoverBg:
        "linear-gradient(135deg, rgba(251, 191, 36, 0.9), rgba(234, 179, 8, 0.9))",
      hoverBorder: "#facc15",
      hoverShadow: "0 18px 42px rgba(217, 119, 6, 0.6)",
    },
    correct: {
      bg: "linear-gradient(135deg, rgba(34, 197, 94, 0.55), rgba(101, 163, 13, 0.55))",
      border: "rgba(101, 163, 13, 0.75)",
      text: "#faffeb",
      shadow: "0 14px 34px rgba(101, 163, 13, 0.45)",
    },
    incorrect: {
      bg: "linear-gradient(135deg, rgba(220, 38, 38, 0.45), rgba(185, 28, 28, 0.45))",
      border: "rgba(248, 113, 113, 0.65)",
      text: "#fee2e2",
      shadow: "0 12px 30px rgba(185, 28, 28, 0.45)",
    },
    accentNote: "#fde68a",
    preview: {
      background: "linear-gradient(135deg, #d97706, #78350f)",
      text: "#fdf6e8",
      border: "rgba(249, 196, 106, 0.7)",
      shadow: "0 12px 32px rgba(194, 120, 3, 0.45)",
      activeBorder: "#facc15",
      activeShadow: "0 18px 40px rgba(249, 196, 106, 0.6)",
    },
  },
  sexy: {
    label: "Sexy Midnight",
    description: "Velvet crimson with mood lighting edges.",
    background:
      "radial-gradient(circle at 15% 20%, rgba(190, 18, 60, 0.6) 0%, rgba(76, 5, 25, 0.92) 45%, #0c0309 100%)",
    glow: ["rgba(190, 18, 60, 0.45)", "rgba(249, 168, 212, 0.3)"],
    text: {
      primary: "#ffe4ea",
      secondary: "#fecdd3",
      accent: "#fb7185",
      muted: "#fda4af",
    },
    card: {
      background: "rgba(55, 4, 22, 0.78)",
      border: "rgba(251, 113, 133, 0.6)",
      shadow: "0 22px 60px rgba(190, 18, 60, 0.5)",
    },
    option: {
      idle: {
        bg: "linear-gradient(135deg, rgba(190, 18, 60, 0.75), rgba(127, 29, 29, 0.75))",
        border: "rgba(251, 113, 133, 0.7)",
        text: "#ffe4ea",
        shadow: "0 14px 34px rgba(127, 29, 29, 0.55)",
      },
      hover: {
        bg: "linear-gradient(135deg, rgba(225, 29, 72, 0.85), rgba(190, 18, 60, 0.85))",
        border: "rgba(248, 113, 113, 0.9)",
        shadow: "0 18px 40px rgba(190, 18, 60, 0.6)",
      },
      reveal: {
        bg: "linear-gradient(135deg, rgba(76, 5, 25, 0.8), rgba(45, 3, 15, 0.8))",
        border: "rgba(229, 57, 111, 0.55)",
        text: "#fecdd3",
        shadow: "0 12px 30px rgba(76, 5, 25, 0.5)",
      },
    },
    scoreboard: {
      background: "rgba(45, 3, 15, 0.82)",
      border: "rgba(251, 113, 133, 0.5)",
      shadow: "0 20px 54px rgba(127, 29, 29, 0.5)",
    },
    chip: { label: "rgba(254, 205, 211, 0.75)", value: "#ffe4ea" },
    button: {
      bg: "linear-gradient(135deg, rgba(190, 18, 60, 0.85), rgba(127, 29, 29, 0.85))",
      border: "rgba(251, 182, 206, 0.7)",
      text: "#ffe4ea",
      shadow: "0 14px 36px rgba(127, 29, 29, 0.55)",
      hoverBg:
        "linear-gradient(135deg, rgba(225, 29, 72, 0.9), rgba(190, 18, 60, 0.9))",
      hoverBorder: "#fb7185",
      hoverShadow: "0 18px 42px rgba(190, 18, 60, 0.6)",
    },
    correct: {
      bg: "linear-gradient(135deg, rgba(21, 128, 61, 0.6), rgba(16, 95, 52, 0.6))",
      border: "rgba(34, 197, 94, 0.75)",
      text: "#eafaf2",
      shadow: "0 14px 34px rgba(21, 128, 61, 0.45)",
    },
    incorrect: {
      bg: "linear-gradient(135deg, rgba(239, 68, 68, 0.5), rgba(185, 28, 28, 0.45))",
      border: "rgba(248, 113, 113, 0.7)",
      text: "#fee2e2",
      shadow: "0 12px 30px rgba(185, 28, 28, 0.45)",
    },
    accentNote: "#fda4af",
    preview: {
      background: "linear-gradient(135deg, #be123c, #831843)",
      text: "#ffe4ea",
      border: "rgba(251, 113, 133, 0.65)",
      shadow: "0 12px 32px rgba(190, 18, 60, 0.5)",
      activeBorder: "#fb7185",
      activeShadow: "0 18px 40px rgba(190, 18, 60, 0.6)",
    },
  },
  wires: {
    label: "Neon Wires",
    description: "Techno grid with synthwave sparks.",
    background:
      "radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.25) 0%, rgba(17, 24, 39, 0.95) 55%, #030712 100%)",
    glow: ["rgba(56, 189, 248, 0.35)", "rgba(249, 115, 22, 0.35)"],
    text: {
      primary: "#e0f2fe",
      secondary: "#bae6fd",
      accent: "#38bdf8",
      muted: "#94a3b8",
    },
    card: {
      background:
        "linear-gradient(135deg, rgba(17, 24, 39, 0.85), rgba(8, 12, 24, 0.9))",
      border: "rgba(38, 198, 218, 0.55)",
      shadow: "0 24px 60px rgba(8, 145, 178, 0.45)",
    },
    option: {
      idle: {
        bg: "linear-gradient(135deg, rgba(12, 74, 110, 0.75), rgba(30, 58, 138, 0.7))",
        border: "rgba(56, 189, 248, 0.65)",
        text: "#e0f2fe",
        shadow: "0 12px 32px rgba(30, 64, 175, 0.55)",
      },
      hover: {
        bg: "linear-gradient(135deg, rgba(59, 130, 246, 0.85), rgba(14, 165, 233, 0.85))",
        border: "#38bdf8",
        shadow: "0 18px 42px rgba(56, 189, 248, 0.6)",
      },
      reveal: {
        bg: "linear-gradient(135deg, rgba(10, 38, 64, 0.8), rgba(6, 23, 44, 0.82))",
        border: "rgba(45, 212, 191, 0.45)",
        text: "#bfdbfe",
        shadow: "0 10px 30px rgba(12, 38, 64, 0.5)",
      },
    },
    scoreboard: {
      background:
        "linear-gradient(135deg, rgba(12, 26, 48, 0.84), rgba(5, 16, 35, 0.84))",
      border: "rgba(56, 189, 248, 0.45)",
      shadow: "0 20px 52px rgba(6, 54, 115, 0.45)",
    },
    chip: { label: "rgba(165, 243, 252, 0.75)", value: "#e0f2fe" },
    button: {
      bg: "linear-gradient(135deg, rgba(6, 95, 150, 0.85), rgba(30, 64, 175, 0.85))",
      border: "rgba(56, 189, 248, 0.7)",
      text: "#e0f2fe",
      shadow: "0 14px 36px rgba(6, 95, 150, 0.55)",
      hoverBg:
        "linear-gradient(135deg, rgba(56, 189, 248, 0.9), rgba(59, 130, 246, 0.9))",
      hoverBorder: "#38bdf8",
      hoverShadow: "0 18px 44px rgba(56, 189, 248, 0.6)",
    },
    correct: {
      bg: "linear-gradient(135deg, rgba(45, 212, 191, 0.55), rgba(20, 184, 166, 0.55))",
      border: "rgba(45, 212, 191, 0.8)",
      text: "#ecfdf5",
      shadow: "0 14px 36px rgba(13, 148, 136, 0.45)",
    },
    incorrect: {
      bg: "linear-gradient(135deg, rgba(248, 113, 113, 0.5), rgba(239, 68, 68, 0.45))",
      border: "rgba(248, 113, 113, 0.7)",
      text: "#fee2e2",
      shadow: "0 12px 32px rgba(185, 28, 28, 0.45)",
    },
    accentNote: "#7dd3fc",
    preview: {
      background: "linear-gradient(135deg, #2563eb, #0ea5e9)",
      text: "#e0f2fe",
      border: "rgba(56, 189, 248, 0.6)",
      shadow: "0 12px 32px rgba(14, 165, 233, 0.45)",
      activeBorder: "#38bdf8",
      activeShadow: "0 18px 42px rgba(14, 165, 233, 0.6)",
    },
  },
  aurora: {
    label: "Aurora Frost",
    description: "Icy greens with shimmering polar glow.",
    background:
      "radial-gradient(circle at 30% 20%, rgba(16, 185, 129, 0.35) 0%, rgba(8, 47, 73, 0.92) 55%, #01131f 100%)",
    glow: ["rgba(16, 185, 129, 0.38)", "rgba(59, 130, 246, 0.28)"],
    text: {
      primary: "#e6fffb",
      secondary: "#bfefe9",
      accent: "#5eead4",
      muted: "#94d4ce",
    },
    card: {
      background: "rgba(4, 26, 38, 0.76)",
      border: "rgba(94, 234, 212, 0.45)",
      shadow: "0 22px 58px rgba(14, 116, 144, 0.45)",
    },
    option: {
      idle: {
        bg: "linear-gradient(135deg, rgba(13, 148, 136, 0.75), rgba(12, 74, 110, 0.75))",
        border: "rgba(45, 212, 191, 0.6)",
        text: "#e6fffb",
        shadow: "0 12px 32px rgba(13, 148, 136, 0.5)",
      },
      hover: {
        bg: "linear-gradient(135deg, rgba(45, 212, 191, 0.85), rgba(6, 182, 212, 0.85))",
        border: "#22d3ee",
        shadow: "0 18px 40px rgba(8, 145, 178, 0.6)",
      },
      reveal: {
        bg: "linear-gradient(135deg, rgba(5, 46, 60, 0.8), rgba(2, 36, 48, 0.82))",
        border: "rgba(94, 234, 212, 0.45)",
        text: "#ccfbf1",
        shadow: "0 10px 30px rgba(3, 30, 45, 0.45)",
      },
    },
    scoreboard: {
      background: "rgba(3, 25, 36, 0.8)",
      border: "rgba(45, 212, 191, 0.4)",
      shadow: "0 20px 50px rgba(12, 74, 110, 0.45)",
    },
    chip: { label: "rgba(45, 212, 191, 0.7)", value: "#ecfeff" },
    button: {
      bg: "linear-gradient(135deg, rgba(13, 148, 136, 0.85), rgba(8, 145, 178, 0.85))",
      border: "rgba(45, 212, 191, 0.65)",
      text: "#ecfeff",
      shadow: "0 14px 36px rgba(8, 145, 178, 0.5)",
      hoverBg:
        "linear-gradient(135deg, rgba(94, 234, 212, 0.9), rgba(45, 212, 191, 0.9))",
      hoverBorder: "#22d3ee",
      hoverShadow: "0 18px 42px rgba(13, 148, 136, 0.55)",
    },
    correct: {
      bg: "linear-gradient(135deg, rgba(74, 222, 128, 0.55), rgba(34, 197, 94, 0.55))",
      border: "rgba(21, 128, 61, 0.7)",
      text: "#ecfdf5",
      shadow: "0 14px 36px rgba(22, 163, 74, 0.45)",
    },
    incorrect: {
      bg: "linear-gradient(135deg, rgba(248, 113, 113, 0.5), rgba(239, 68, 68, 0.45))",
      border: "rgba(248, 113, 113, 0.7)",
      text: "#fee2e2",
      shadow: "0 12px 32px rgba(220, 38, 38, 0.45)",
    },
    accentNote: "#5eead4",
    preview: {
      background: "linear-gradient(135deg, #0f766e, #0ea5e9)",
      text: "#ecfeff",
      border: "rgba(45, 212, 191, 0.6)",
      shadow: "0 12px 32px rgba(13, 148, 136, 0.45)",
      activeBorder: "#5eead4",
      activeShadow: "0 18px 42px rgba(13, 148, 136, 0.6)",
    },
  },
  sunset: {
    label: "Sunset Mirage",
    description: "Desert sunset oranges fading into twilight.",
    background:
      "radial-gradient(circle at 70% 10%, rgba(249, 115, 22, 0.6) 0%, rgba(79, 70, 229, 0.7) 45%, #140f33 100%)",
    glow: ["rgba(249, 115, 22, 0.45)", "rgba(167, 85, 247, 0.35)"],
    text: {
      primary: "#fff7ed",
      secondary: "#fed7aa",
      accent: "#f97316",
      muted: "#fbbf24",
    },
    card: {
      background: "rgba(54, 27, 92, 0.78)",
      border: "rgba(251, 191, 36, 0.55)",
      shadow: "0 24px 60px rgba(79, 70, 229, 0.45)",
    },
    option: {
      idle: {
        bg: "linear-gradient(135deg, rgba(249, 115, 22, 0.75), rgba(217, 70, 239, 0.7))",
        border: "rgba(251, 191, 36, 0.6)",
        text: "#fff7ed",
        shadow: "0 14px 34px rgba(217, 70, 239, 0.5)",
      },
      hover: {
        bg: "linear-gradient(135deg, rgba(251, 191, 36, 0.85), rgba(79, 70, 229, 0.85))",
        border: "#fb7185",
        shadow: "0 18px 42px rgba(79, 70, 229, 0.6)",
      },
      reveal: {
        bg: "linear-gradient(135deg, rgba(76, 29, 149, 0.75), rgba(49, 25, 95, 0.8))",
        border: "rgba(249, 115, 22, 0.55)",
        text: "#fde68a",
        shadow: "0 12px 32px rgba(49, 25, 95, 0.5)",
      },
    },
    scoreboard: {
      background: "rgba(43, 21, 74, 0.82)",
      border: "rgba(251, 191, 36, 0.5)",
      shadow: "0 22px 54px rgba(67, 56, 202, 0.45)",
    },
    chip: { label: "rgba(253, 224, 71, 0.75)", value: "#fff7ed" },
    button: {
      bg: "linear-gradient(135deg, rgba(249, 115, 22, 0.85), rgba(217, 70, 239, 0.85))",
      border: "rgba(251, 191, 36, 0.7)",
      text: "#fff7ed",
      shadow: "0 14px 36px rgba(217, 70, 239, 0.55)",
      hoverBg:
        "linear-gradient(135deg, rgba(251, 191, 36, 0.9), rgba(59, 130, 246, 0.9))",
      hoverBorder: "#fb7185",
      hoverShadow: "0 18px 44px rgba(79, 70, 229, 0.6)",
    },
    correct: {
      bg: "linear-gradient(135deg, rgba(34, 197, 94, 0.55), rgba(74, 222, 128, 0.55))",
      border: "rgba(34, 197, 94, 0.75)",
      text: "#ecfdf5",
      shadow: "0 14px 36px rgba(34, 197, 94, 0.45)",
    },
    incorrect: {
      bg: "linear-gradient(135deg, rgba(248, 113, 113, 0.5), rgba(225, 29, 72, 0.45))",
      border: "rgba(248, 113, 113, 0.7)",
      text: "#fee2e2",
      shadow: "0 12px 32px rgba(225, 29, 72, 0.45)",
    },
    accentNote: "#fbbf24",
    preview: {
      background: "linear-gradient(135deg, #f97316, #7c3aed)",
      text: "#fff7ed",
      border: "rgba(251, 191, 36, 0.65)",
      shadow: "0 12px 32px rgba(79, 70, 229, 0.45)",
      activeBorder: "#f97316",
      activeShadow: "0 18px 42px rgba(249, 115, 22, 0.6)",
    },
  },
  mint: {
    label: "Mint Circuit",
    description: "Fresh mints with a slick neon grid.",
    background:
      "radial-gradient(circle at 10% 0%, rgba(45, 212, 191, 0.45) 0%, rgba(6, 95, 150, 0.88) 50%, #02111d 100%)",
    glow: ["rgba(45, 212, 191, 0.4)", "rgba(74, 222, 128, 0.32)"],
    text: {
      primary: "#ebfffb",
      secondary: "#c5fff5",
      accent: "#5eead4",
      muted: "#8de8d8",
    },
    card: {
      background: "rgba(4, 31, 43, 0.76)",
      border: "rgba(45, 212, 191, 0.5)",
      shadow: "0 22px 56px rgba(13, 148, 136, 0.45)",
    },
    option: {
      idle: {
        bg: "linear-gradient(135deg, rgba(13, 148, 136, 0.75), rgba(5, 150, 105, 0.75))",
        border: "rgba(94, 234, 212, 0.65)",
        text: "#ebfffb",
        shadow: "0 12px 32px rgba(13, 148, 136, 0.5)",
      },
      hover: {
        bg: "linear-gradient(135deg, rgba(94, 234, 212, 0.85), rgba(45, 212, 191, 0.85))",
        border: "#34d399",
        shadow: "0 18px 40px rgba(45, 212, 191, 0.6)",
      },
      reveal: {
        bg: "linear-gradient(135deg, rgba(3, 105, 161, 0.75), rgba(3, 78, 111, 0.75))",
        border: "rgba(45, 212, 191, 0.45)",
        text: "#ccfbf1",
        shadow: "0 12px 30px rgba(3, 78, 111, 0.5)",
      },
    },
    scoreboard: {
      background: "rgba(4, 28, 41, 0.82)",
      border: "rgba(45, 212, 191, 0.45)",
      shadow: "0 20px 52px rgba(6, 95, 150, 0.45)",
    },
    chip: { label: "rgba(94, 234, 212, 0.75)", value: "#ebfffb" },
    button: {
      bg: "linear-gradient(135deg, rgba(3, 105, 161, 0.85), rgba(12, 148, 136, 0.85))",
      border: "rgba(94, 234, 212, 0.7)",
      text: "#ebfffb",
      shadow: "0 14px 36px rgba(12, 148, 136, 0.5)",
      hoverBg:
        "linear-gradient(135deg, rgba(45, 212, 191, 0.9), rgba(59, 130, 246, 0.9))",
      hoverBorder: "#2dd4bf",
      hoverShadow: "0 18px 44px rgba(34, 197, 94, 0.6)",
    },
    correct: {
      bg: "linear-gradient(135deg, rgba(74, 222, 128, 0.55), rgba(34, 197, 94, 0.55))",
      border: "rgba(22, 163, 74, 0.75)",
      text: "#ecfdf5",
      shadow: "0 14px 36px rgba(22, 163, 74, 0.45)",
    },
    incorrect: {
      bg: "linear-gradient(135deg, rgba(248, 113, 113, 0.5), rgba(239, 68, 68, 0.45))",
      border: "rgba(248, 113, 113, 0.7)",
      text: "#fee2e2",
      shadow: "0 12px 32px rgba(220, 38, 38, 0.45)",
    },
    accentNote: "#5eead4",
    preview: {
      background: "linear-gradient(135deg, #059669, #0ea5e9)",
      text: "#ebfffb",
      border: "rgba(94, 234, 212, 0.6)",
      shadow: "0 12px 32px rgba(13, 148, 136, 0.45)",
      activeBorder: "#5eead4",
      activeShadow: "0 18px 42px rgba(14, 165, 233, 0.6)",
    },
  },
  ember: {
    label: "Molten Ember",
    description: "Smoldering lava reds with glowing embers.",
    background:
      "radial-gradient(circle at 30% 30%, rgba(249, 115, 22, 0.5) 0%, rgba(127, 29, 29, 0.9) 48%, #140404 100%)",
    glow: ["rgba(249, 115, 22, 0.45)", "rgba(234, 88, 12, 0.4)"],
    text: {
      primary: "#fff1e6",
      secondary: "#fbd3b5",
      accent: "#fb923c",
      muted: "#f59e0b",
    },
    card: {
      background: "rgba(60, 11, 11, 0.78)",
      border: "rgba(251, 146, 60, 0.55)",
      shadow: "0 24px 64px rgba(190, 18, 60, 0.5)",
    },
    option: {
      idle: {
        bg: "linear-gradient(135deg, rgba(234, 88, 12, 0.8), rgba(185, 28, 28, 0.75))",
        border: "rgba(251, 146, 60, 0.7)",
        text: "#fff1e6",
        shadow: "0 14px 36px rgba(190, 18, 60, 0.55)",
      },
      hover: {
        bg: "linear-gradient(135deg, rgba(251, 146, 60, 0.85), rgba(225, 29, 72, 0.85))",
        border: "#f97316",
        shadow: "0 18px 44px rgba(225, 29, 72, 0.6)",
      },
      reveal: {
        bg: "linear-gradient(135deg, rgba(99, 20, 20, 0.8), rgba(66, 9, 9, 0.8))",
        border: "rgba(251, 146, 60, 0.5)",
        text: "#ffe5d3",
        shadow: "0 12px 32px rgba(99, 20, 20, 0.5)",
      },
    },
    scoreboard: {
      background: "rgba(50, 8, 8, 0.82)",
      border: "rgba(251, 146, 60, 0.5)",
      shadow: "0 22px 58px rgba(127, 29, 29, 0.5)",
    },
    chip: { label: "rgba(254, 215, 170, 0.75)", value: "#fff1e6" },
    button: {
      bg: "linear-gradient(135deg, rgba(249, 115, 22, 0.85), rgba(190, 24, 93, 0.85))",
      border: "rgba(251, 146, 60, 0.7)",
      text: "#fff1e6",
      shadow: "0 14px 38px rgba(190, 24, 93, 0.55)",
      hoverBg:
        "linear-gradient(135deg, rgba(251, 191, 36, 0.9), rgba(225, 29, 72, 0.9))",
      hoverBorder: "#fb923c",
      hoverShadow: "0 18px 46px rgba(190, 24, 93, 0.6)",
    },
    correct: {
      bg: "linear-gradient(135deg, rgba(74, 222, 128, 0.55), rgba(34, 197, 94, 0.55))",
      border: "rgba(34, 197, 94, 0.75)",
      text: "#ecfdf5",
      shadow: "0 14px 36px rgba(34, 197, 94, 0.45)",
    },
    incorrect: {
      bg: "linear-gradient(135deg, rgba(248, 113, 113, 0.5), rgba(225, 29, 72, 0.45))",
      border: "rgba(248, 113, 113, 0.7)",
      text: "#fee2e2",
      shadow: "0 12px 32px rgba(225, 29, 72, 0.45)",
    },
    accentNote: "#fb923c",
    preview: {
      background: "linear-gradient(135deg, #f97316, #be123c)",
      text: "#fff1e6",
      border: "rgba(251, 146, 60, 0.7)",
      shadow: "0 12px 36px rgba(190, 24, 93, 0.5)",
      activeBorder: "#fb923c",
      activeShadow: "0 18px 44px rgba(249, 115, 22, 0.6)",
    },
  },
};

export const themeEntries = Object.entries(themePresets) as Array<
  [ThemeName, ThemePreset]
>;
