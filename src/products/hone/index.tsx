import React from "react";
import type { ProductConfig, ThemeTokens } from "@/lib/types";
import { HoneSlide1, HoneSlide2, HoneSlide3, HoneSlide4, HoneSlide5 } from "./slides";

export const HONE_THEME: ThemeTokens = {
  bg: "#0A0A0C",
  bgAlt: "#111114",
  fg: "#F8F8F2",
  fgMuted: "#8A8A94",
  accent: "#F97316",
  accentGlow: "rgba(249,115,22,0.35)",
  accentSoft: "rgba(249,115,22,0.12)",
  surface: "rgba(255,255,255,0.04)",
  gradients: {
    dark: "linear-gradient(180deg, #0A0A0C 0%, #12120F 50%, #0A0A0C 100%)",
    warm: "linear-gradient(180deg, #0F0D0A 0%, #1A150E 40%, #0F0D0A 100%)",
    accent: "linear-gradient(135deg, #0A0A0C 0%, #1A120A 50%, #0A0A0C 100%)",
    deep: "linear-gradient(180deg, #08080A 0%, #0F0E10 50%, #08080A 100%)",
    hero: "linear-gradient(180deg, #0E0C08 0%, #141008 35%, #0A0A0C 100%)",
  },
};

const T = HONE_THEME;

export const HONE: ProductConfig = {
  id: "hone",
  name: "Hone AI: Journal & Habit Log",
  iconPath: "/products/hone/icon.png",
  screenshotBase: "/products/hone/screenshots",
  theme: HONE_THEME,
  slides: {
    iphone: [
      {
        id: "hero",
        copy: {
          label: "THE 10K ITERATION PROTOCOL",
          headline: <>Track Repetitions.<br /><span style={{ color: T.accent }}>Not Results.</span></>,
          subtitle: "Master any skill, one rep at a time.",
        },
        Component: HoneSlide1,
      },
      {
        id: "journal",
        copy: {
          label: "AI SENSEI",
          headline: <>Reflect. Refine.<br /><span style={{ color: T.accent }}>Repeat.</span></>,
          subtitle: <>Journal every rep. Your AI coach analyzes<br />each iteration and delivers tactical micro-adjustments.</>,
        },
        Component: HoneSlide2,
      },
      {
        id: "protocol",
        copy: {
          label: "DAILY PROTOCOL",
          headline: <>Execute.<br />Log. <span style={{ color: T.accent }}>Repeat.</span></>,
          subtitle: <>Define concrete daily actions.<br />Check them off. Build the streak.</>,
        },
        Component: HoneSlide3,
      },
      {
        id: "progress",
        copy: {
          label: "PROGRESS",
          headline: <>Consistency<br /><span style={{ color: T.accent }}>Compounds</span></>,
          subtitle: <>Mood flow. Streaks. Consistency heatmap.<br />See every dimension of your progress.</>,
        },
        Component: HoneSlide4,
      },
      {
        id: "journey",
        copy: {
          label: "THE JOURNEY",
          headline: <>10,000 Reps<br /><span style={{ color: T.accent }}>To Mastery</span></>,
          subtitle: <>1% better every single day.<br />Watch your effect compound over time.</>,
        },
        Component: HoneSlide5,
      },
    ],
  },
  featureGraphic: {
    tagline: "Hone AI: Journal & Habit Log",
    subtitle: "Sharpen your edge. Every day.",
  },
  socialOg: {
    tagline: "Hone AI: Journal & Habit Log",
    subtitle: "Daily protocols, AI coaching, and progress tracking for peak performance.",
  },
  metadata: {
    name: "Hone AI: Journal & Habit Log",
    subtitle: "Daily Protocols · AI Coach",
    promoText: "Meet your AI Sensei - personalized daily protocols to sharpen body, mind, and spirit.",
    shortDescription: "Daily protocols and AI coaching for peak performance and personal growth.",
    keywords: "daily protocol,ai coach,habit tracker,self improvement,biohacking,wellness,journal",
    description: `Stop obsessing over goals. Start winning your daily process.

Hone AI is your personal AI coach that turns journaling into action -
automatically extracting todos, tracking your mood, and building the
daily discipline that makes greatness inevitable.

THE 1.37 EFFECT - SCIENCE-BACKED PERSONAL GROWTH

A 2022 meta-analysis proved it: focusing on Process Goals (d=1.37) is 15x
more effective than chasing Outcome Goals (d=0.09). Hone is the first app
built entirely on this principle.

HOW HONE WORKS

1. JOURNAL - Talk to your AI coach like a friend. Write, speak, or share
   photos. The AI understands your context, detects your mood, and responds
   with empathy.

2. EXECUTE - Hone automatically extracts actionable todos from your journal
   entries. No manual task creation needed. Just tell the AI what's on your
   mind, and it organizes your next steps.

3. TRACK - Watch your consistency compound. A GitHub-style heatmap, mood flow
   chart, and streak counter show you the proof that the process is working.

KEY FEATURES

- AI-Powered Journaling - Natural conversation with an AI that remembers
  your context and responds with real insight
- Smart Todo Extraction - AI identifies tasks from your journal and creates
  confirmable action items
- Mood Detection - Automatic mood tracking from your writing patterns
- Voice Journaling - Record your thoughts; AI transcribes instantly
- Photo Journaling - Attach images to your journal entries
- Weekly Calendar - See and manage todos in a clean weekly view
- Consistency Heatmap - GitHub-style daily activity visualization
- Mood Flow Chart - 14-day emotional trend with emoji markers
- Streak Tracking - Current and best consecutive-day streaks
- Goal Progress - Visual milestone tracking with progress bars

PRIVACY-FIRST

Your journal is sacred. Hone uses a local-first architecture:
- All data stored on-device in encrypted SQLite
-  No cloud sync, no accounts, no data mining
- Full export/import for data portability
- No ads - ever

HONE PRO

Start free with 100 AI interactions. Go Pro for unlimited:
- Unlimited AI conversations
- Voice-to-text journaling
- Photo journal attachments
- Advanced mood analytics
- Priority AI processing

Weekly ($7.99) · Monthly ($12.99) · Yearly (best value)

Questions? support@thehoneapp.com
Privacy: https://thehoneapp.com/privacy
Terms: https://thehoneapp.com/terms`,
  },
};
