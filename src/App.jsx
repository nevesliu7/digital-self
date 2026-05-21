import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  ChevronRight,
  Eye,
  Footprints,
  Gamepad2,
  Mail,
  MessageCircle,
  Monitor,
  Pause,
  Play,
  Smartphone,
  X,
  Zap,
} from "lucide-react";

const AVATAR_BASE = "/xiaoren.png";
const AMBULANCE_IMAGE = "/ambulance.png";

const days = [
  {
    id: "apr21",
    label: "APR 21",
    steps: 3801,
    screen: 6.2,
    events: 3,
    pressure: 38,
    title: "The body still remembers movement",
    note: "The phone is already busy, but the body has not fully disappeared yet.",
    apps: ["instagram", "messages", "calendar"],
  },
  {
    id: "apr22",
    label: "APR 22",
    steps: 877,
    screen: 6.4,
    events: 5,
    pressure: 62,
    title: "A clean calendar makes the body smaller",
    note: "The schedule looks controlled. The physical self begins to sink under digital order.",
    apps: ["slack", "outlook", "messages", "calendar"],
  },
  {
    id: "apr23",
    label: "APR 23",
    steps: 4718,
    screen: 5.7,
    events: 4,
    pressure: 31,
    title: "The body briefly returns",
    note: "Movement comes back for a moment. The digital field becomes quieter, but never turns off.",
    apps: ["discord", "calendar", "outlook"],
  },
  {
    id: "apr25",
    label: "APR 25",
    steps: 479,
    screen: 7.1,
    events: 6,
    pressure: 75,
    title: "The chair starts growing roots",
    note: "The digital self is active. The physical self feels glued to the desk.",
    apps: ["instagram", "outlook", "messages", "slack"],
  },
  {
    id: "apr27",
    label: "APR 27",
    steps: 234,
    screen: 7.6,
    events: 7,
    pressure: 86,
    title: "Attention keeps leaving the room",
    note: "The body is almost still. Attention keeps moving outward through glowing windows.",
    apps: ["messages", "discord", "slack", "calendar", "outlook"],
  },
  {
    id: "apr29",
    label: "APR 29",
    steps: 220,
    screen: 8.4,
    events: 9,
    pressure: 98,
    title: "My digital self did the walking",
    note: "A full day on paper: interviews, calls, deadlines, applications. The step count was 220.",
    apps: ["outlook", "calendar", "instagram", "messages", "slack", "discord"],
  },
];

const gameApps = ["outlook", "instagram", "slack", "discord", "calendar", "messages"];
const ROUND_DURATION = 6200;

const avatarPresets = {
  outfit: [
    { id: "base", label: "Base", src: AVATAR_BASE },
    { id: "cozy", label: "Cozy", src: "/taozhuang1.png" },
    { id: "school", label: "School", src: "/taozhuang2.png" },
    { id: "street", label: "Street", src: "/taozhuang3.png" },
    { id: "smart", label: "Smart", src: "/taozhuang4.png" },
  ],
  hair: [
    { id: "none", label: "Bald", src: null, style: {} },
    {
      id: "longWavy",
      label: "Long Wavy",
      src: "/fx1.png",
      style: { left: "15%", top: "14%", width: "70%", height: "46%" },
    },
    {
      id: "twinTails",
      label: "Twin Tails",
      src: "/fx2.png",
      style: { left: "22%", top: "9%", width: "56%", height: "45%" },
    },
    {
      id: "bob",
      label: "Soft Bob",
      src: "/fx3.png",
      style: { left: "22%", top: "14%", width: "56%", height: "28%" },
    },
    {
      id: "sidePart",
      label: "Side Part",
      src: "/fx4.png",
      style: { left: "19%", top: "9%", width: "60%", height: "35%" },
    },
    {
      id: "messyShort",
      label: "Messy Short",
      src: "/fx5.png",
      style: { left: "19%", top: "8%", width: "60%", height: "35%" },
    },
    {
      id: "layeredShort",
      label: "Layered Short",
      src: "/fx6.png",
      style: { left: "15%", top: "12%", width: "70%", height: "30%" },
    },
  ],
  accessory: [
    { id: "none", label: "None" },
    { id: "glasses", label: "Glasses" },
    { id: "headphones", label: "Headphones" },
    { id: "bow", label: "Bow" },
    { id: "sparkle", label: "Sparkle" },
  ],
  tone: [
    { id: "original", label: "Original" },
    { id: "dreamy", label: "Dreamy" },
    { id: "warm", label: "Warm" },
    { id: "cool", label: "Cool" },
    { id: "noir", label: "Noir" },
  ],
};

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

function mapRange(value, inMin, inMax, outMin, outMax) {
  const t = (value - inMin) / (inMax - inMin);
  return outMin + clamp(t, 0, 1) * (outMax - outMin);
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function byId(list, id) {
  return list.find((item) => item.id === id) || list[0];
}

function appGradient(type) {
  if (type === "instagram") return "from-purple-600 via-fuchsia-500 to-orange-400";
  if (type === "outlook") return "from-blue-500 via-blue-600 to-blue-800";
  if (type === "slack") return "from-white via-white to-slate-100";
  if (type === "discord") return "from-indigo-400 via-indigo-500 to-blue-700";
  if (type === "messages") return "from-lime-400 via-green-500 to-emerald-700";
  if (type === "calendar") return "from-white via-white to-slate-200";
  return "from-cyan-400 via-cyan-500 to-blue-700";
}

function appLabel(type) {
  if (type === "instagram") return "Instagram";
  if (type === "outlook") return "Outlook";
  if (type === "slack") return "Slack";
  if (type === "discord") return "Discord";
  if (type === "messages") return "Messages";
  if (type === "calendar") return "Calendar";
  return "Mail";
}

function AppGlyph({ type }) {
  if (type === "instagram") {
    return (
      <div className="relative h-9 w-9">
        <div className="absolute inset-[3px] rounded-[11px] border-[3px] border-white" />
        <div className="absolute left-1/2 top-1/2 h-[13px] w-[13px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white" />
        <div className="absolute right-[8px] top-[8px] h-[5px] w-[5px] rounded-full bg-white" />
      </div>
    );
  }

  if (type === "outlook") {
    return (
      <div className="relative h-full w-full">
        <div className="absolute left-3 top-3 h-11 w-8 rounded-lg bg-blue-800 shadow-lg" />
        <div className="absolute left-[18px] top-[22px] text-xl font-black text-white">O</div>
        <div className="absolute right-3 top-[18px] h-8 w-9 rounded-md bg-white shadow-md">
          <div className="absolute left-1 top-2.5 h-[2px] w-7 rotate-[28deg] bg-blue-500" />
          <div className="absolute left-1 top-2.5 h-[2px] w-7 -rotate-[28deg] bg-blue-500" />
        </div>
      </div>
    );
  }

  if (type === "slack") {
    return (
      <div className="grid grid-cols-2 gap-1 p-3">
        <div className="h-4 w-7 rounded-full bg-sky-400" />
        <div className="h-7 w-4 rounded-full bg-emerald-500" />
        <div className="h-7 w-4 rounded-full bg-rose-500" />
        <div className="h-4 w-7 rounded-full bg-amber-400" />
      </div>
    );
  }

  if (type === "discord") {
    return (
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="h-8 w-11 rounded-[14px] bg-white" />
        <div className="absolute left-[23px] top-[27px] h-1.5 w-1.5 rounded-full bg-indigo-500" />
        <div className="absolute right-[23px] top-[27px] h-1.5 w-1.5 rounded-full bg-indigo-500" />
        <div className="absolute top-[38px] h-[2px] w-5 rounded-full bg-indigo-500" />
      </div>
    );
  }

  if (type === "calendar") {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-[18px] bg-white text-slate-700">
        <div className="absolute top-0 h-4 w-full bg-red-500" />
        <CalendarDays className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-[42%]" strokeWidth={2.5} />
      </div>
    );
  }

  if (type === "messages") return <MessageCircle className="h-9 w-9 text-white" strokeWidth={2.6} />;
  return <Mail className="h-9 w-9 text-white" strokeWidth={2.6} />;
}

function CleanCutImage({ src, alt, className = "", style, draggable = false }) {
  const [cleanSrc, setCleanSrc] = useState(src);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const { data, width, height } = imageData;
        const visited = new Uint8Array(width * height);
        const stack = [];

        const isLightOrChecker = (idx) => {
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];
          if (a < 12) return true;
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const lowChroma = max - min < 45;
          const veryLight = r > 172 && g > 172 && b > 172;
          return veryLight && lowChroma;
        };

        const push = (x, y) => {
          if (x < 0 || y < 0 || x >= width || y >= height) return;
          const p = y * width + x;
          if (visited[p]) return;
          visited[p] = 1;
          const idx = p * 4;
          if (!isLightOrChecker(idx)) return;
          data[idx + 3] = 0;
          stack.push([x, y]);
        };

        for (let x = 0; x < width; x++) {
          push(x, 0);
          push(x, height - 1);
        }
        for (let y = 0; y < height; y++) {
          push(0, y);
          push(width - 1, y);
        }

        while (stack.length) {
          const [x, y] = stack.pop();
          push(x + 1, y);
          push(x - 1, y);
          push(x, y + 1);
          push(x, y - 1);
        }

        ctx.putImageData(imageData, 0, 0);
        const url = canvas.toDataURL("image/png");
        if (!cancelled) setCleanSrc(url);
      } catch (error) {
        if (!cancelled) setCleanSrc(src);
      }
    };

    img.onerror = () => {
      if (!cancelled) setCleanSrc(src);
    };

    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [src]);

  return <img src={cleanSrc} alt={alt} draggable={draggable} style={style} className={className} />;
}

function AvatarBase({ avatar, size = "large", redEyes = false, collapsed = false, className = "" }) {
  const outfit = byId(avatarPresets.outfit, avatar.outfit);
  const hair = byId(avatarPresets.hair, avatar.hair);

  const sizes = {
    hero: "h-[340px] w-[238px]",
    large: "h-[320px] w-[224px]",
    medium: "h-[230px] w-[161px]",
    small: "h-[168px] w-[118px]",
    tiny: "h-[112px] w-[78px]",
  };

  const toneClass = {
    original: "",
    dreamy: "brightness-110 saturate-110 contrast-105",
    warm: "brightness-105 saturate-110 sepia-[0.07]",
    cool: "brightness-105 saturate-95 hue-rotate-[10deg]",
    noir: "grayscale contrast-110 brightness-95",
  }[avatar.tone];

  return (
    <motion.div
      className={`relative isolate overflow-visible ${sizes[size]} ${className}`}
      animate={collapsed ? { rotate: 88, x: 34, y: 42, scale: 0.9 } : { rotate: 0, x: 0, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      style={{ transformOrigin: "56% 78%" }}
    >
      <CleanCutImage
        src={outfit.src}
        alt="custom digital self outfit"
        className={`pointer-events-none select-none absolute inset-0 z-10 h-full w-full object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.45)] ${toneClass}`}
      />

      {hair.src && (
        <CleanCutImage
          src={hair.src}
          alt={`${hair.label} hair`}
          className="pointer-events-none select-none absolute z-20 object-contain drop-shadow-[0_12px_18px_rgba(0,0,0,0.28)]"
          style={hair.style}
        />
      )}

      {avatar.accessory === "glasses" && (
        <>
          <div className="pointer-events-none absolute left-[39%] top-[28%] z-30 h-[4.6%] w-[9.2%] rounded-full border-[2.5px] border-black/70" />
          <div className="pointer-events-none absolute left-[52%] top-[28%] z-30 h-[4.6%] w-[9.2%] rounded-full border-[2.5px] border-black/70" />
          <div className="pointer-events-none absolute left-[47.5%] top-[30%] z-30 h-[2px] w-[5.5%] rounded-full bg-black/65" />
        </>
      )}

      {avatar.accessory === "headphones" && (
        <>
          <div className="pointer-events-none absolute left-[23%] top-[15%] z-30 h-[19%] w-[8%] rounded-full border-[4px] border-slate-800 border-r-0" />
          <div className="pointer-events-none absolute right-[23%] top-[15%] z-30 h-[19%] w-[8%] rounded-full border-[4px] border-slate-800 border-l-0" />
          <div className="pointer-events-none absolute left-[31%] top-[11%] z-30 h-[6%] w-[38%] rounded-full border-[4px] border-slate-800 border-b-0" />
        </>
      )}

      {avatar.accessory === "bow" && (
        <>
          <div className="pointer-events-none absolute left-[27%] top-[10%] z-30 h-[6.5%] w-[9%] rotate-[-28deg] rounded-full bg-pink-400" />
          <div className="pointer-events-none absolute left-[34%] top-[10%] z-30 h-[6.5%] w-[9%] rotate-[28deg] rounded-full bg-pink-400" />
          <div className="pointer-events-none absolute left-[33%] top-[12%] z-30 h-[3.5%] w-[3.5%] rounded-full bg-pink-300" />
        </>
      )}

      {avatar.accessory === "sparkle" && (
        <>
          <div className="pointer-events-none absolute left-[20%] top-[14%] z-30 text-lg text-cyan-200">✦</div>
          <div className="pointer-events-none absolute right-[21%] top-[21%] z-30 text-base text-fuchsia-200">✧</div>
          <div className="pointer-events-none absolute right-[31%] top-[10%] z-30 text-sm text-yellow-200">✦</div>
        </>
      )}

      {redEyes && (
        <>
          <motion.div className="absolute left-[40%] top-[27%] z-40 h-[3.2%] w-[3.2%] rounded-full bg-red-500 shadow-[0_0_18px_rgba(255,0,0,0.95)]" animate={{ opacity: [0.55, 1, 0.55] }} transition={{ duration: 0.55, repeat: Infinity }} />
          <motion.div className="absolute left-[55%] top-[27%] z-40 h-[3.2%] w-[3.2%] rounded-full bg-red-500 shadow-[0_0_18px_rgba(255,0,0,0.95)]" animate={{ opacity: [0.55, 1, 0.55] }} transition={{ duration: 0.55, repeat: Infinity, delay: 0.15 }} />
        </>
      )}
    </motion.div>
  );
}

function ChoiceTile({ selected, onClick, children, label }) {
  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl border p-2 text-left transition ${selected ? "border-fuchsia-300/70 bg-fuchsia-300/12 shadow-[0_0_22px_rgba(217,70,239,0.14)]" : "border-white/10 bg-white/[0.04] hover:bg-white/[0.07]"}`}
    >
      <div className="flex h-[96px] items-center justify-center rounded-xl bg-black/20">{children}</div>
      <div className={`mt-2 truncate text-center text-[11px] font-bold ${selected ? "text-white" : "text-slate-300"}`}>{label}</div>
    </button>
  );
}

function DustField({ intensity }) {
  const amount = Math.round(mapRange(intensity, 0, 1, 12, 30));
  return (
    <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden rounded-[36px]">
      {Array.from({ length: amount }).map((_, i) => {
        const left = (i * 29) % 100;
        const top = 5 + ((i * 37) % 88);
        const size = 1 + ((i * 7) % 3);
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/40 blur-[0.6px]"
            style={{ left: `${left}%`, top: `${top}%`, width: size, height: size }}
            animate={{ y: [0, -5, 0], opacity: [0.03, 0.14, 0.03] }}
            transition={{ duration: 10 + (i % 5), repeat: Infinity, ease: "easeInOut", delay: i * 0.12 }}
          />
        );
      })}
    </div>
  );
}

function Cobwebs({ intensity }) {
  const opacity = mapRange(intensity, 0, 1, 0.03, 0.14);
  return (
    <svg className="pointer-events-none absolute inset-0 z-[8] h-full w-full" viewBox="0 0 1200 800" fill="none">
      <g opacity={opacity} stroke="rgba(255,255,255,0.58)" strokeWidth="1">
        <path d="M70 110 L210 180 L300 300" />
        <path d="M70 110 L170 280 L220 430" />
        <path d="M70 110 L110 340 L120 510" />
        <path d="M70 110 L230 115 L390 130" />
        <path d="M210 180 Q150 220 130 280" />
        <path d="M210 180 Q255 235 270 300" />
        <path d="M170 280 Q210 310 240 360" />
        <path d="M110 340 Q165 370 210 415" />
      </g>
      <g opacity={opacity * 0.7} stroke="rgba(255,255,255,0.44)" strokeWidth="1">
        <path d="M920 110 L860 180 L820 260" />
        <path d="M920 110 L960 210 L990 320" />
        <path d="M920 110 L1020 130 L1120 180" />
        <path d="M850 210 Q920 225 980 260" />
      </g>
    </svg>
  );
}

function VineStroke({
  left,
  bottom,
  height,
  delay = 0,
  flip = false,
  front = false,
}) {
  const width = Math.max(70, Math.round(height * 0.34));

  return (
    <motion.svg
      className="absolute overflow-visible"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{
        left: `${left}%`,
        bottom: `${bottom}%`,
        transform: flip ? "scaleX(-1)" : "none",
        transformOrigin: "center bottom",
        filter: front
          ? "drop-shadow(0 0 12px rgba(34,197,94,0.25))"
          : "drop-shadow(0 0 9px rgba(21,128,61,0.18))",
      }}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: front ? 0.96 : 0.78, scale: 1 }}
      transition={{ duration: 0.8, delay }}
    >
      <motion.path
        d={`
          M ${width * 0.40} ${height}
          C ${width * 0.18} ${height * 0.84},
            ${width * 0.72} ${height * 0.68},
            ${width * 0.46} ${height * 0.50}
          C ${width * 0.22} ${height * 0.34},
            ${width * 0.82} ${height * 0.22},
            ${width * 0.50} 8
        `}
        fill="none"
        stroke={front ? "rgba(5,46,22,0.98)" : "rgba(6,78,35,0.82)"}
        strokeWidth={front ? 6 : 5}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay }}
      />

      <motion.path
        d={`
          M ${width * 0.48} ${height * 0.58}
          C ${width * 0.66} ${height * 0.55},
            ${width * 0.80} ${height * 0.48},
            ${width * 0.88} ${height * 0.40}
        `}
        fill="none"
        stroke={front ? "rgba(6,64,29,0.95)" : "rgba(21,94,49,0.78)"}
        strokeWidth={front ? 4 : 3}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: delay + 0.18 }}
      />

      <motion.path
        d={`
          M ${width * 0.42} ${height * 0.34}
          C ${width * 0.30} ${height * 0.28},
            ${width * 0.14} ${height * 0.20},
            ${width * 0.08} ${height * 0.10}
        `}
        fill="none"
        stroke={front ? "rgba(6,64,29,0.95)" : "rgba(21,94,49,0.78)"}
        strokeWidth={front ? 4 : 3}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: delay + 0.26 }}
      />

      {[0.62, 0.42, 0.22].map((t, i) => {
        const cx = width * (i % 2 === 0 ? 0.82 : 0.18);
        const cy = height * t;

        return (
          <motion.ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx={front ? 8 : 6}
            ry={front ? 4.5 : 4}
            fill={front ? "rgba(34,197,94,0.62)" : "rgba(74,222,128,0.38)"}
            transform={`rotate(${i % 2 === 0 ? -24 : 28} ${cx} ${cy})`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, delay: delay + 0.38 + i * 0.08 }}
          />
        );
      })}
    </motion.svg>
  );
}

function OrganicGrowthBack({ intensity }) {
  const level = Math.max(0, Math.min(1, intensity));

  return (
    <div className="pointer-events-none absolute inset-0 z-[8] overflow-hidden">
      <VineStroke
        left={8}
        bottom={10}
        height={220 + level * 60}
        delay={0.05}
      />
      <VineStroke
        left={14}
        bottom={8}
        height={180 + level * 50}
        delay={0.18}
        flip
      />
      {level > 0.35 && (
        <VineStroke
          left={21}
          bottom={11}
          height={160 + level * 40}
          delay={0.28}
        />
      )}
    </div>
  );
}

function OrganicGrowthFront({ intensity }) {
  const level = Math.max(0, Math.min(1, intensity));

  if (level < 0.25) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-[17] overflow-hidden">
      <VineStroke
        left={10.5}
        bottom={11}
        height={170 + level * 36}
        delay={0.15}
        front
      />
      {level > 0.55 && (
        <VineStroke
          left={16}
          bottom={13}
          height={145 + level * 28}
          delay={0.3}
          flip
          front
        />
      )}
    </div>
  );
}

function SignalPaths({ pressure }) {
  const opacity = mapRange(pressure, 30, 100, 0.15, 0.48);
  return (
    <svg className="pointer-events-none absolute inset-0 z-[7] h-full w-full" viewBox="0 0 1200 800" fill="none">
      <defs>
        <linearGradient id="pathGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(34,211,238,0.88)" />
          <stop offset="48%" stopColor="rgba(236,72,153,0.88)" />
          <stop offset="100%" stopColor="rgba(251,191,36,0.88)" />
        </linearGradient>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <motion.path
        d="M260 480 C 360 425, 450 330, 580 310 S 790 248, 900 322"
        stroke="url(#pathGlow)"
        strokeWidth="5"
        strokeDasharray="10 8"
        strokeLinecap="round"
        filter="url(#softGlow)"
        style={{ opacity }}
        animate={{ strokeDashoffset: [0, -160] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
      <motion.path
        d="M600 328 C 690 420, 808 518, 960 570"
        stroke="url(#pathGlow)"
        strokeWidth="3"
        strokeDasharray="5 11"
        strokeLinecap="round"
        filter="url(#softGlow)"
        style={{ opacity: opacity * 0.55 }}
        animate={{ strokeDashoffset: [0, -100] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}

function MonitorDesk({ active, onOpenGame, onOpenXray }) {
  const blocks = Array.from({ length: active.events + 5 });
  return (
    <div className="absolute right-[8%] top-[34%] z-[12] h-[320px] w-[58%]">
      <div className="absolute left-[12%] top-[158px] h-[120px] w-[80%] rounded-[28px] bg-gradient-to-r from-slate-800 via-slate-900 to-black shadow-[0_36px_90px_rgba(0,0,0,0.62)] ring-1 ring-white/10" style={{ transform: "perspective(1050px) rotateX(63deg) rotateZ(-4deg)" }}>
        <div className="absolute inset-4 rounded-2xl border border-white/5 bg-white/[0.025]" />
      </div>

      <motion.div
        className="absolute left-[28%] top-[6px] h-[212px] w-[330px] rounded-[26px] border border-cyan-200/25 bg-slate-950 shadow-[0_0_32px_rgba(56,189,248,0.16),0_24px_60px_rgba(0,0,0,0.58)]"
        animate={{ boxShadow: ["0 0 22px rgba(56,189,248,0.12),0 24px 60px rgba(0,0,0,0.58)", "0 0 28px rgba(236,72,153,0.12),0 24px 60px rgba(0,0,0,0.58)", "0 0 22px rgba(56,189,248,0.12),0 24px 60px rgba(0,0,0,0.58)"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 overflow-hidden rounded-[26px] bg-[radial-gradient(circle_at_50%_20%,rgba(56,189,248,0.22),transparent_35%),linear-gradient(180deg,#0f172a,#020617)]">
          <div className="absolute left-4 top-4 flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
          </div>
          <div className="absolute left-4 right-4 top-12 grid grid-cols-4 gap-2">
            {blocks.map((_, i) => (
              <motion.div
                key={i}
                className={`h-9 rounded-lg ${i % 5 === 0 ? "bg-orange-400" : i % 4 === 0 ? "bg-fuchsia-500" : i % 3 === 0 ? "bg-cyan-400" : "bg-violet-500"}`}
                initial={{ opacity: 0, scale: 0.92, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: i * 0.022 }}
              />
            ))}
          </div>
          <div className="absolute bottom-5 left-4 right-4 flex items-center justify-between gap-3">
            <button type="button" onClick={onOpenGame} className="rounded-full border border-white/10 bg-white/8 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-200">Enter Game</button>
            <button type="button" onClick={onOpenXray} className="rounded-full border border-white/10 bg-white/8 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-fuchsia-200">Open X-Ray</button>
          </div>
        </div>
        <div className="absolute -bottom-9 left-1/2 h-9 w-16 -translate-x-1/2 rounded-b-lg bg-slate-900 shadow-xl" />
      </motion.div>
    </div>
  );
}

function FloatingApps({ apps }) {
  const positions = [
    { x: "78%", y: "28%" },
    { x: "89%", y: "38%" },
    { x: "70%", y: "48%" },
    { x: "82%", y: "56%" },
    { x: "94%", y: "52%" },
    { x: "73%", y: "64%" },
  ];

  return (
    <div className="absolute inset-0 z-[15]">
      {apps.map((app, i) => (
        <motion.div
          key={`${app}-${i}`}
          className="absolute h-16 w-16"
          style={{ left: positions[i % positions.length].x, top: positions[i % positions.length].y }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 6 + i * 0.45, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className={`relative flex h-full w-full items-center justify-center rounded-[21px] bg-gradient-to-br ${appGradient(app)} shadow-[0_18px_34px_rgba(0,0,0,0.38)] ring-1 ring-white/20`}>
            <AppGlyph type={app} />
            <div className="absolute -right-3 -top-3 flex h-8 min-w-8 items-center justify-center rounded-full bg-red-500 px-2 text-sm font-black text-white shadow-[0_8px_16px_rgba(255,0,0,0.28)] ring-2 ring-white">
              {9 + i * 3}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function MetricCard({ icon: Icon, label, value }) {
  return (
    <div className="min-w-[92px] rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-center shadow-inner">
      <Icon className="mx-auto mb-1 h-4 w-4 text-cyan-200" />
      <div className="text-3xl font-black text-white">{value}</div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.24em] text-slate-400">{label}</div>
    </div>
  );
}

function DaySelector({ activeIndex, setActiveIndex }) {
  return (
    <div className="grid gap-2 md:grid-cols-6">
      {days.map((d, i) => {
        const active = i === activeIndex;
        return (
          <button key={d.id} onClick={() => setActiveIndex(i)} className={`group relative overflow-hidden rounded-2xl border p-3 text-left transition ${active ? "border-cyan-300/70 bg-cyan-300/15 shadow-[0_0_30px_rgba(34,211,238,0.18)]" : "border-white/10 bg-white/[0.04] hover:bg-white/[0.08]"}`}>
            <div className="flex items-center justify-between gap-2">
              <span className={`text-xs font-black tracking-[0.18em] ${active ? "text-cyan-100" : "text-slate-400"}`}>{d.label}</span>
              <ChevronRight size={15} className={active ? "text-cyan-100" : "text-slate-600 group-hover:text-slate-300"} />
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-400" style={{ width: `${clamp(100 - d.steps / 50, 10, 96)}%` }} />
            </div>
            <div className="mt-2 text-[11px] text-slate-400">{d.steps.toLocaleString()} steps</div>
          </button>
        );
      })}
    </div>
  );
}

function ModeButton({ active, onClick, icon: Icon, title, text }) {
  return (
    <button onClick={onClick} className={`w-full rounded-2xl border p-4 text-left transition ${active ? "border-cyan-300/50 bg-cyan-300/10 shadow-[0_0_24px_rgba(34,211,238,0.1)]" : "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]"}`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/8 text-cyan-200 ring-1 ring-white/10"><Icon size={17} /></div>
        <div>
          <div className="text-sm font-bold text-white">{title}</div>
          <div className="text-sm leading-5 text-slate-400">{text}</div>
        </div>
      </div>
    </button>
  );
}

function SelectorGroup({ title, children }) {
  return (
    <div>
      <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">{title}</div>
      {children}
    </div>
  );
}

function ToneAccessoryButtons({ title, options, current, onChange }) {
  return (
    <SelectorGroup title={title}>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = current === option.id;
          return (
            <button key={option.id} onClick={() => onChange(option.id)} className={`rounded-xl border px-3 py-2 text-xs font-bold transition ${selected ? "border-fuchsia-300/60 bg-fuchsia-300/12 text-white" : "border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.07]"}`}>
              {option.label}
            </button>
          );
        })}
      </div>
    </SelectorGroup>
  );
}

function RightPanel({ mode, setMode, autoplay, setAutoplay, onOpenGame, onOpenXray, avatar, setAvatar }) {
  function update(part, value) {
    setAvatar((prev) => ({ ...prev, [part]: value }));
  }

  return (
    <aside className="space-y-5">
      <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-300/15 text-cyan-200 ring-1 ring-cyan-200/20"><Monitor size={22} /></div>
          <div>
            <div className="text-sm font-black uppercase tracking-[0.22em] text-slate-400">interaction</div>
            <div className="font-semibold text-white">Customize, scan, then enter the monitor.</div>
          </div>
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-300">Now the avatar uses image assets instead of crude CSS clothing. Outfits and hair are selectable, so the body looks more natural and more like a dress-up avatar.</p>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <button onClick={() => setAutoplay(!autoplay)} className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-3 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08]">
            {autoplay ? <Pause size={16} /> : <Play size={16} />} {autoplay ? "Pause" : "Auto Play"}
          </button>
          <button onClick={onOpenXray} className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-3 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08]"><Eye size={16} /> X-Ray</button>
        </div>
        <button onClick={onOpenGame} className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-fuchsia-300/20 bg-fuchsia-300/10 px-3 py-3 text-sm font-semibold text-white transition hover:bg-fuchsia-300/18"><Gamepad2 size={16} /> Enter Monitor Game</button>
      </div>

      <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl">
        <div className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-slate-400">View Mode</div>
        <div className="space-y-2">
          <ModeButton active={mode === "scene"} onClick={() => setMode("scene")} icon={Monitor} title="Scene" text="Installation view" />
          <ModeButton active={mode === "xray"} onClick={onOpenXray} icon={Eye} title="X-Ray" text="Clean scan, no overlap" />
          <ModeButton active={mode === "game"} onClick={onOpenGame} icon={Gamepad2} title="Game" text="Notification panic" />
        </div>
      </div>

      <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl">
        <div className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-slate-400">Avatar Lab</div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
          <AvatarBase avatar={avatar} size="small" className="mx-auto scale-[0.92]" />
        </div>

        <div className="mt-5 space-y-5">
          <ToneAccessoryButtons title="Tone" options={avatarPresets.tone} current={avatar.tone} onChange={(v) => update("tone", v)} />

          <SelectorGroup title="Outfit">
            <div className="grid grid-cols-2 gap-2">
              {avatarPresets.outfit.map((item) => (
                <ChoiceTile key={item.id} label={item.label} selected={avatar.outfit === item.id} onClick={() => update("outfit", item.id)}>
                  <AvatarBase avatar={{ ...avatar, outfit: item.id, hair: "none", accessory: "none" }} size="tiny" />
                </ChoiceTile>
              ))}
            </div>
          </SelectorGroup>

          <SelectorGroup title="Hair">
            <div className="grid grid-cols-2 gap-2">
              {avatarPresets.hair.map((item) => (
                <ChoiceTile key={item.id} label={item.label} selected={avatar.hair === item.id} onClick={() => update("hair", item.id)}>
                  {item.src ? (
                    <CleanCutImage src={item.src} alt={item.label} className="h-[76px] w-[76px] object-contain drop-shadow-[0_10px_12px_rgba(0,0,0,0.28)]" />
                  ) : (
                    <div className="flex h-[62px] w-[62px] items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-orange-200 text-xs font-black text-slate-700">BALD</div>
                  )}
                </ChoiceTile>
              ))}
            </div>
          </SelectorGroup>

          <ToneAccessoryButtons title="Accessory" options={avatarPresets.accessory} current={avatar.accessory} onChange={(v) => update("accessory", v)} />
        </div>
      </div>

      <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl">
        <div className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-slate-400">Mapping</div>
        <div className="space-y-4 text-sm text-slate-300">
          <div><span className="font-bold text-white">Low steps</span><br />More dust, webs, grass, and locked-in stillness.</div>
          <div><span className="font-bold text-white">High screen time</span><br />Stronger monitor glow and more active notification pressure.</div>
          <div><span className="font-bold text-white">Game pressure</span><br />Misses turn the eyes red. Three misses trigger collapse and ambulance rescue.</div>
        </div>
      </div>
    </aside>
  );
}

function ScanCard({ title, value, color, pct }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
      <div className="text-xs uppercase tracking-[0.22em] text-slate-400">{title}</div>
      <div className="mt-2 text-4xl font-black text-white">{value}</div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10"><div className={`${color} h-full rounded-full`} style={{ width: `${pct}%` }} /></div>
    </div>
  );
}

function XRayModal({ open, onClose, active, avatar }) {
  if (!open) return null;
  const stillness = Math.round(clamp(1 - active.steps / 5000, 0, 1) * 100);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-6 backdrop-blur-md">
      <motion.div initial={{ opacity: 0, scale: 0.94, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="relative w-full max-w-5xl rounded-[32px] border border-white/10 bg-[#07111d] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.65)]">
        <button onClick={onClose} className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/5 p-2 text-white"><X size={18} /></button>
        <div className="mb-6 text-sm font-black uppercase tracking-[0.24em] text-cyan-200">X-Ray Scan</div>
        <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4"><AvatarBase avatar={avatar} size="medium" className="mx-auto" /></div>
            <div className="text-xs uppercase tracking-[0.22em] text-slate-400">stillness index</div>
            <div className="mt-1 text-4xl font-black text-white">{stillness}</div>
            <div className="mt-5 text-xs uppercase tracking-[0.22em] text-slate-400">pressure</div>
            <div className="mt-1 text-4xl font-black text-white">{active.pressure}</div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <ScanCard title="Step Count" value={active.steps.toLocaleString()} color="bg-lime-400" pct={mapRange(active.steps, 0, 5000, 8, 100)} />
            <ScanCard title="Screen Time" value={`${active.screen}h`} color="bg-cyan-400" pct={mapRange(active.screen, 5, 9, 30, 100)} />
            <ScanCard title="Calendar Load" value={active.events} color="bg-fuchsia-400" pct={mapRange(active.events, 2, 10, 20, 100)} />
            <ScanCard title="App Load" value={active.apps.length} color="bg-orange-300" pct={mapRange(active.apps.length, 2, 6, 20, 100)} />
            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5 md:col-span-2">
              <div className="mb-3 text-xs uppercase tracking-[0.22em] text-slate-400">most active apps</div>
              <div className="flex flex-wrap gap-3">
                {active.apps.map((app, i) => <div key={`${app}-${i}`} className={`flex h-16 w-16 items-center justify-center rounded-[20px] bg-gradient-to-br ${appGradient(app)} shadow-lg`}><AppGlyph type={app} /></div>)}
              </div>
              <div className="mt-5 text-sm leading-7 text-slate-300">This scan separates the data layer from the installation scene, so the main page can stay atmospheric while the hidden pressure becomes readable.</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function AmbulanceRunner({ active = false, exiting = false }) {
  return (
    <motion.div
      className="relative h-[125px] w-[260px]"
      initial={{ x: -430, y: 0, scale: 1 }}
      animate={exiting ? { x: 580, y: -8, scale: 1.03 } : active ? { x: [-430, -110, 24, 0], y: [0, -4, 0, 0] } : { x: 0, y: 0, scale: 1 }}
      transition={{ duration: exiting ? 1.35 : 1.85, ease: exiting ? "easeIn" : "easeOut", times: exiting ? undefined : [0, 0.55, 0.9, 1] }}
    >
      <motion.div className="relative z-10 h-full w-full" animate={active ? { x: [0, 1.5, -1.5, 1, 0] } : {}} transition={active ? { duration: 0.18, repeat: Infinity, ease: "linear" } : {}}>
        <CleanCutImage src={AMBULANCE_IMAGE} alt="ambulance" className="h-full w-full object-contain drop-shadow-[0_18px_26px_rgba(0,0,0,0.45)]" />
      </motion.div>
      <motion.div className="absolute left-[32%] top-[12%] z-20 h-4 w-4 rounded-full bg-red-500 blur-[1px]" animate={active ? { opacity: [0.2, 1, 0.2] } : { opacity: 0.4 }} transition={{ duration: 0.35, repeat: Infinity }} />
      <motion.div className="absolute left-[40%] top-[12%] z-20 h-4 w-4 rounded-full bg-cyan-300 blur-[1px]" animate={active ? { opacity: [1, 0.2, 1] } : { opacity: 0.5 }} transition={{ duration: 0.35, repeat: Infinity }} />
      {active && Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-[14px] left-[14px] rounded-full bg-[#d9c8ad]/55 blur-sm"
          style={{ width: 14 + i * 4, height: 10 + i * 3 }}
          initial={{ x: 0, y: 0, opacity: 0.55, scale: 0.8 }}
          animate={{ x: -44 - i * 15, y: -6 + (i % 3) * 4, opacity: 0, scale: 1.45 }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.07, ease: "easeOut" }}
        />
      ))}
    </motion.div>
  );
}

function GameStat({ label, value, danger = false }) {
  return (
    <div className={`rounded-2xl border px-4 py-3 text-center ${danger ? "border-red-400/20 bg-red-400/8" : "border-white/10 bg-white/[0.04]"}`}>
      <div className="text-[10px] uppercase tracking-[0.22em] text-slate-400">{label}</div>
      <div className="mt-1 text-3xl font-black text-white">{value}</div>
    </div>
  );
}

function NotificationGameModal({ open, onClose, onMissesChange, avatar }) {
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [target, setTarget] = useState("outlook");
  const [tiles, setTiles] = useState([]);
  const [round, setRound] = useState(1);
  const [phase, setPhase] = useState("playing");
  const [roundKey, setRoundKey] = useState(0);

  function createRound(nextRound = 1) {
    const chosen = randomFrom(gameApps);
    const positions = [
      { left: "11%", top: "18%" },
      { left: "40%", top: "18%" },
      { left: "69%", top: "18%" },
      { left: "20%", top: "55%" },
      { left: "49%", top: "55%" },
      { left: "78%", top: "55%" },
    ];
    let types = shuffle(gameApps).slice(0, 6);
    if (!types.includes(chosen)) types[0] = chosen;
    setTarget(chosen);
    setTiles(types.map((t, i) => ({ id: `${t}-${i}-${Date.now()}`, type: t, ...positions[i] })));
    setRound(nextRound);
    setPhase("playing");
    setRoundKey(Date.now());
  }

  function resetGame() {
    setScore(0);
    setMisses(0);
    onMissesChange(0);
    createRound(1);
  }

  useEffect(() => {
    if (!open) return;
    resetGame();
  }, [open]);

  useEffect(() => {
    if (!open || phase !== "playing") return;
    const timer = setTimeout(() => registerMiss(), ROUND_DURATION);
    return () => clearTimeout(timer);
  }, [open, phase, roundKey]);

  useEffect(() => {
    if (phase !== "fall") return;
    const t1 = setTimeout(() => setPhase("rescue"), 650);
    const t2 = setTimeout(() => setPhase("carry"), 2100);
    const t3 = setTimeout(() => setPhase("done"), 3600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [phase]);

  function registerMiss() {
    setMisses((prev) => {
      const next = prev + 1;
      onMissesChange(next);
      if (next >= 3) {
        setTiles([]);
        setPhase("fall");
      } else {
        setTimeout(() => createRound(round + 1), 250);
      }
      return next;
    });
  }

  function handleTileClick(type) {
    if (phase !== "playing") return;
    if (type === target) {
      setScore((prev) => prev + 1);
      setTiles([]);
      setTimeout(() => createRound(round + 1), 320);
    } else {
      registerMiss();
    }
  }

  if (!open) return null;
  const redState = misses >= 2 || phase !== "playing";

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center bg-black/80 p-6 backdrop-blur-md">
      <motion.div initial={{ opacity: 0, scale: 0.94, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="relative w-full max-w-6xl rounded-[34px] border border-white/10 bg-[#06111c] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.72)]">
        <button onClick={onClose} className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/5 p-2 text-white"><X size={18} /></button>
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-black uppercase tracking-[0.24em] text-cyan-200">Notification Panic</div>
            <div className="mt-2 text-3xl font-black text-white">Click the correct app before the body crashes.</div>
          </div>
          <div className="flex gap-3"><GameStat label="score" value={score} /><GameStat label="misses" value={misses} danger /></div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
            <div className="text-xs uppercase tracking-[0.22em] text-slate-400">alert target</div>
            <div className="mt-2 text-4xl font-black text-white">{appLabel(target).toUpperCase()}</div>
            <div className="mt-6 text-xs uppercase tracking-[0.22em] text-slate-400">condition</div>
            <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4"><AvatarBase avatar={avatar} size="small" redEyes={redState} collapsed={phase !== "playing"} className="mx-auto" /></div>
            <div className="mt-4 text-sm leading-7 text-slate-300">Miss 3 times and the figure collapses.</div>
            <div className="mt-3 flex gap-2">{[0, 1, 2].map((n) => <div key={n} className={`h-4 flex-1 rounded-full ${misses > n ? "bg-red-500" : "bg-white/10"}`} />)}</div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_50%_10%,rgba(56,189,248,0.14),transparent_28%),linear-gradient(180deg,#0b1724,#04080d)] p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="rounded-full border border-fuchsia-300/20 bg-fuchsia-300/10 px-4 py-2 text-sm font-black uppercase tracking-[0.22em] text-fuchsia-200">Click {appLabel(target)}</div>
              <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-100">Round {round}</div>
            </div>

            {phase === "playing" && (
              <div className="mb-4">
                <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-400"><span>Time</span><span>6.2s window</span></div>
                <motion.div key={roundKey} className="h-2 rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-orange-300" initial={{ width: "100%" }} animate={{ width: "0%" }} transition={{ duration: ROUND_DURATION / 1000, ease: "linear" }} />
              </div>
            )}

            <div className="relative h-[470px] overflow-hidden rounded-[28px] border border-white/10 bg-black/25">
              {phase === "playing" && (
                <AnimatePresence>
                  {tiles.map((tile) => (
                    <motion.button key={tile.id} type="button" onClick={() => handleTileClick(tile.type)} className="absolute h-[88px] w-[88px] rounded-[26px] outline-none transition hover:scale-[1.03]" style={{ left: tile.left, top: tile.top }} initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }} transition={{ duration: 0.18 }}>
                      <div className={`relative flex h-full w-full items-center justify-center rounded-[26px] bg-gradient-to-br ${appGradient(tile.type)} shadow-[0_22px_45px_rgba(0,0,0,0.45)] ring-1 ring-white/20`}><AppGlyph type={tile.type} /></div>
                    </motion.button>
                  ))}
                </AnimatePresence>
              )}

              {(phase === "fall" || phase === "rescue" || phase === "carry" || phase === "done") && (
                <div className="absolute inset-0 bg-black/72">
                  <motion.div
                    className="absolute bottom-[54px] left-[140px] z-20"
                    animate={phase === "fall" ? { rotate: 90, x: 70, y: 70, scale: 0.88, opacity: 1 } : phase === "rescue" ? { rotate: 90, x: 100, y: 78, scale: 0.84, opacity: 1 } : phase === "carry" ? { rotate: 90, x: 210, y: 58, scale: 0.72, opacity: 0.65 } : { rotate: 90, x: 250, y: 44, scale: 0.62, opacity: 0 }}
                    transition={{ duration: 0.9, ease: "easeInOut" }}
                  >
                    <AvatarBase avatar={avatar} size="small" redEyes />
                  </motion.div>

                  {(phase === "rescue" || phase === "carry" || phase === "done") && (
                    <div className="absolute bottom-[102px] left-[40px] z-30"><AmbulanceRunner active={phase === "rescue"} exiting={phase === "carry" || phase === "done"} /></div>
                  )}

                  {phase === "done" && (
                    <motion.div className="absolute inset-0 flex flex-col items-center justify-center text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                      <div className="text-4xl font-black text-white">The body crashed.</div>
                      <div className="mt-3 max-w-xl text-lg leading-8 text-slate-300">Three missed alerts. The red-eyed figure collapsed. The ambulance rushed in through the dust and took them away.</div>
                      <div className="mt-6 flex gap-3">
                        <button onClick={resetGame} className="rounded-2xl border border-fuchsia-300/20 bg-fuchsia-300/10 px-5 py-3 font-bold text-white">Play Again</button>
                        <button onClick={onClose} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-bold text-white">Exit</button>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function App() {
  const [activeIndex, setActiveIndex] = useState(5);
  const [mode, setMode] = useState("scene");
  const [autoplay, setAutoplay] = useState(false);
  const [xrayOpen, setXrayOpen] = useState(false);
  const [gameOpen, setGameOpen] = useState(false);
  const [gameMisses, setGameMisses] = useState(0);

  const [avatar, setAvatar] = useState({
    tone: "original",
    outfit: "cozy",
    hair: "none",
    accessory: "none",
  });

  const active = days[activeIndex];
  const stillness = clamp(1 - active.steps / 5000, 0, 1);
  const visualIntensity = clamp((stillness + active.pressure / 100) / 2, 0, 1);

  useEffect(() => {
    if (!autoplay) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % days.length);
    }, 4200);

    return () => clearInterval(timer);
  }, [autoplay]);

  return (
    <main className="min-h-screen bg-[#03040a] px-4 py-6 text-slate-100 md:px-8 md:py-10">
      <div className="mx-auto max-w-[1680px]">
        <DaySelector activeIndex={activeIndex} setActiveIndex={setActiveIndex} />

        <div className="mt-6 grid gap-6 2xl:grid-cols-[minmax(0,1fr)_380px]">
          <div>
            <div className="relative min-h-[860px] overflow-hidden rounded-[36px] border border-white/10 bg-[radial-gradient(circle_at_18%_0%,rgba(59,130,246,0.2),transparent_30%),radial-gradient(circle_at_78%_18%,rgba(236,72,153,0.15),transparent_33%),linear-gradient(180deg,#080b14,#111827_55%,#05070b)] p-6 shadow-[0_42px_110px_rgba(0,0,0,0.58)]">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:42px_42px] opacity-35" />
              <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
              <div className="absolute -right-24 bottom-20 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />

              <DustField intensity={visualIntensity} />
              <Cobwebs intensity={visualIntensity} />
              <SignalPaths pressure={active.pressure} />
              <OrganicGrowthBack intensity={visualIntensity} />

              <div className="relative z-[30] flex items-start justify-between gap-6">
                <div>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200 backdrop-blur">
                    Digital Installation
                  </div>

                  <h1 className="max-w-[780px] text-5xl font-black leading-[0.95] tracking-tight text-white md:text-7xl">
                    My Digital Self Did the Walking
                  </h1>

                  <p className="mt-5 max-w-[720px] text-lg leading-8 text-slate-300">
                    A physical body becomes still while calendar blocks, alerts, apps, deadlines, and digital
                    pressure keep moving. This screen exaggerates that split.
                  </p>
                </div>

                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="hidden rounded-[24px] border border-white/10 bg-white/10 p-5 text-right backdrop-blur-md md:block"
                >
                  <div className="text-xs uppercase tracking-[0.22em] text-slate-400">
                    current state
                  </div>
                  <div className="mt-1 text-5xl font-black text-white">{active.label}</div>
                  <div className="mt-2 text-lg text-cyan-200">{active.steps} steps</div>
                </motion.div>
              </div>

              <div className="relative z-[10] mt-10 h-[520px]">
                <div className="absolute bottom-12 left-[4%] h-14 w-[280px] rounded-full bg-black/28 blur-2xl" />

                <div className="absolute left-[7%] top-[14%] z-[16]">
                  <AvatarBase avatar={avatar} size="hero" redEyes={gameMisses >= 2} />
                </div>
                <OrganicGrowthFront intensity={visualIntensity} />

                <div className="absolute left-[4.5%] top-[74%] z-[18] rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-slate-300 backdrop-blur">
                  <div className="font-bold text-cyan-200">custom digital self</div>
                  <div>Dress up the body that stays still.</div>
                </div>

                <MonitorDesk
                  active={active}
                  onOpenGame={() => {
                    setMode("game");
                    setGameOpen(true);
                  }}
                  onOpenXray={() => {
                    setMode("xray");
                    setXrayOpen(true);
                  }}
                />

                <FloatingApps apps={active.apps} />
              </div>

              <div className="relative z-[30] mt-4 rounded-[28px] border border-white/10 bg-black/35 p-6 backdrop-blur-xl">
                <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
                  <div className="max-w-[760px]">
                    <div className="text-sm font-semibold uppercase tracking-[0.22em] text-fuchsia-200">
                      {active.label}
                    </div>

                    <h2 className="mt-1 text-4xl font-black text-white">
                      {active.title}
                    </h2>

                    <p className="mt-3 text-lg leading-8 text-slate-300">
                      {active.note}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <MetricCard
                      icon={Footprints}
                      label="steps"
                      value={active.steps.toLocaleString()}
                    />
                    <MetricCard
                      icon={Smartphone}
                      label="screen"
                      value={`${active.screen}h`}
                    />
                    <MetricCard
                      icon={CalendarDays}
                      label="events"
                      value={active.events}
                    />
                    <MetricCard
                      icon={Zap}
                      label="pressure"
                      value={active.pressure}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <RightPanel
            mode={mode}
            setMode={setMode}
            autoplay={autoplay}
            setAutoplay={setAutoplay}
            onOpenGame={() => {
              setMode("game");
              setGameOpen(true);
            }}
            onOpenXray={() => {
              setMode("xray");
              setXrayOpen(true);
            }}
            avatar={avatar}
            setAvatar={setAvatar}
          />
        </div>
      </div>

      <XRayModal
        open={xrayOpen}
        onClose={() => {
          setXrayOpen(false);
          if (mode === "xray") setMode("scene");
        }}
        active={active}
        avatar={avatar}
      />

      <NotificationGameModal
        open={gameOpen}
        onClose={() => {
          setGameOpen(false);
          if (mode === "game") setMode("scene");
        }}
        onMissesChange={setGameMisses}
        avatar={avatar}
      />
    </main>
  );
}