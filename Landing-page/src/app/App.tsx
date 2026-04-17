import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { ArrowDown, Cpu, Smartphone, Zap, LucideMessageCircleCode, Sun, Moon } from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";

const ACCENT = "#22D3EE"; // bright cyan accent — reads well in both themes

function GridBackground({ isDark }: { isDark: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: isDark
            ? `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)`
            : `linear-gradient(rgba(0,0,0,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? "radial-gradient(ellipse at center, transparent 30%, #000 80%)"
            : "radial-gradient(ellipse at center, transparent 30%, #ffffff 80%)",
        }}
      />
    </div>
  );
}

function GlowOrb({ className, isDark }: { className?: string; isDark: boolean }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-[120px] pointer-events-none ${className}`}
      style={{ opacity: isDark ? 0.15 : 0.08 }}
      animate={{ scale: [1, 1.2, 1], opacity: isDark ? [0.12, 0.2, 0.12] : [0.06, 0.1, 0.06] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function DownloadButton({ isDark }: { isDark: boolean }) {
  return (
    <motion.div
      className="relative"
      whileHover={{
        scale: 1.03,
        y: -2,
      }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 360,
        damping: 22,
      }}
    >
      <motion.div
        className="absolute -inset-5 rounded-2xl blur-3xl pointer-events-none"
        style={{ backgroundColor: ACCENT }}
        initial={false}
        whileHover={{ opacity: 0.22 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
      />
      <a href="https://github.com/AbodiDawoud/SupertonicTTS" target="_blank" rel="noopener noreferrer">
        <Button
          size="lg"
          className={`relative rounded-xl px-8 py-6 gap-3 cursor-pointer transition-colors duration-300 ${isDark ? "bg-white text-black hover:bg-neutral-100" : "bg-neutral-900 text-white hover:bg-neutral-800"}`}
          style={{
            boxShadow: `0 10px 30px rgba(0,0,0,0.18)`,
          }}
        >
          <ArrowDown className="size-5" />
          Download on GitHub
        </Button>
      </a>
    </motion.div>
  );
}

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [isScreenshotLoaded, setIsScreenshotLoaded] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      setIsDark(false);
    }
  }, []);

  return (
    <div
      className="min-h-screen h-screen relative overflow-hidden transition-colors duration-500"
      style={{
        backgroundColor: isDark ? "#000" : "#ffffff",
        color: isDark ? "#fff" : "#111",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <GridBackground isDark={isDark} />
      <GlowOrb className={`w-[500px] h-[500px] -top-40 -left-40 ${isDark ? "bg-neutral-500" : "bg-neutral-400"}`} isDark={isDark} />
      <GlowOrb className={`w-[400px] h-[400px] -bottom-32 -right-32 ${isDark ? "bg-neutral-400" : "bg-neutral-300"}`} isDark={isDark} />

      {/* Theme toggle */}
      <button
        onClick={() => setIsDark(!isDark)}
        className={`fixed top-5 right-5 z-50 p-2.5 rounded-full backdrop-blur-sm border transition-colors cursor-pointer ${isDark ? "bg-neutral-900/60 border-neutral-700 text-neutral-300 hover:bg-neutral-800" : "bg-white/60 border-neutral-200 text-neutral-600 hover:bg-neutral-100"}`}
      >
        {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
      </button>

      {/* Hero */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20 overflow-hidden">
        {/* Top badge — filled with accent tint */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge
            className="rounded-full px-4 py-1.5 mb-4 gap-2 border-0"
            style={{
              backgroundColor: isDark ? `${ACCENT}18` : `${ACCENT}12`,
              color: ACCENT,
            }}
          >
            <Cpu className="size-3.5" />
            On-device AI inference
          </Badge>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-5xl sm:text-7xl md:text-8xl text-center tracking-tight max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Supertonic
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: isDark
                ? "linear-gradient(to right, #e5e5e5, #737373)"
                : "linear-gradient(to right, #404040, #a3a3a3)",
            }}
          >
            TTS
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className={`text-center max-w-xl mt-6 text-lg sm:text-xl ${isDark ? "text-gray-500" : "text-neutral-500"}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          Run powerful text-to-speech models locally on your iPhone.
          No cloud. No latency. Pure on-device performance.
        </motion.p>

        {/* Feature pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            { icon: <Smartphone className="size-4" />, label: "iOS Native", filled: true },
            { icon: <Zap className="size-4" />, label: "ONNX Runtime", filled: false },
            { icon: <LucideMessageCircleCode className="size-4" />, label: "Open Source", filled: false },
          ].map((item) => (
            <span
              key={item.label}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm backdrop-blur-sm ${
                item.filled
                  ? isDark
                    ? "bg-neutral-800 text-neutral-200 border border-neutral-700"
                    : "bg-neutral-200 text-neutral-700 border border-neutral-300"
                  : isDark
                    ? "bg-transparent border border-neutral-700 text-neutral-400"
                    : "bg-transparent border border-neutral-300 text-neutral-500"
              }`}
            >
              {item.icon}
              {item.label}
            </span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <DownloadButton isDark={isDark} />
        </motion.div>

        {/* Screenshot */}
        <motion.div
          className="mt-20 relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
        >
          <div className="relative mx-auto w-[280px] sm:w-[320px] aspect-[280/620] sm:aspect-[320/690]">
            {/* Reserved space placeholder to prevent layout shift */}
            <div
              className="absolute inset-0 rounded-3xl overflow-hidden"
              style={{
                background: isDark
                  ? "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))"
                  : "linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.02))",
                border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)",
              }}
            />

            <motion.div
              className="absolute inset-0 p-2"
              initial={{ opacity: 0, scale: 0.98, y: 8 }}
              animate={isScreenshotLoaded ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <ImageWithFallback
                src="https://github.com/user-attachments/assets/f7b76b47-2ee0-466b-9a6c-53e0f90ca80c"
                alt="SupertonicTTS App Screenshot"
                className=""
                style={{
                  boxShadow: isDark
                    ? "0 25px 60px rgba(0,0,0,0.6)"
                    : "0 25px 60px rgba(0,0,0,0.12)",
                }}
                onLoad={() => setIsScreenshotLoaded(true)}
              />
            </motion.div>

            {/* Nice loading shimmer */}
            {!isScreenshotLoaded && (
              <motion.div
                className="absolute inset-0 rounded-3xl overflow-hidden"
                initial={{ opacity: 0.6 }}
                animate={{ opacity: [0.35, 0.7, 0.35] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  background: isDark
                    ? "linear-gradient(90deg, rgba(255,255,255,0.04), rgba(255,255,255,0.10), rgba(255,255,255,0.04))"
                    : "linear-gradient(90deg, rgba(0,0,0,0.03), rgba(0,0,0,0.07), rgba(0,0,0,0.03))",
                }}
              />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
