"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// ── animation variant ─────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ── data ──────────────────────────────────────────────────────────────────────
const STATS = [
  {
    label: "Unique Visitors", value: "48.2K", change: "↑ 12.4% vs last week", up: true,
    icon: "ti-users", accent: "s1",
    spark: [40, 55, 35, 70, 60, 85, 75], sparkColor: "#06B6D4",
  },
  {
    label: "Page Views", value: "213K", change: "↑ 8.1% vs last week", up: true,
    icon: "ti-eye", accent: "s2",
    spark: [50, 65, 45, 80, 60, 90, 70], sparkColor: "#A78BFA",
  },
  {
    label: "Avg Session", value: "3m 42s", change: "↑ 0.5% improvement", up: true,
    icon: "ti-clock", accent: "s3",
    spark: [55, 48, 60, 52, 70, 65, 72], sparkColor: "#34D399",
  },
  {
    label: "Bounce Rate", value: "34.7%", change: "↓ 2.3% better", up: true,
    icon: "ti-trending-down", accent: "s4",
    spark: [60, 55, 70, 50, 45, 38, 35], sparkColor: "#FCD34D",
  },
];

const TOP_PAGES = [
  { page: "/home",     views: "38.4K", pct: 100 },
  { page: "/pricing",  views: "27.6K", pct: 72  },
  { page: "/features", views: "22.1K", pct: 58  },
  { page: "/blog",     views: "16.8K", pct: 44  },
  { page: "/docs",     views: "11.5K", pct: 30  },
];

const COUNTRIES = [
  { flag: "🇺🇸", name: "United States", pct: 38 },
  { flag: "🇬🇧", name: "United Kingdom", pct: 22 },
  { flag: "🇩🇪", name: "Germany",        pct: 16 },
  { flag: "🇵🇰", name: "Pakistan",       pct: 12 },
  { flag: "🇦🇺", name: "Australia",      pct: 8  },
];

const DEVICES = [
  { icon: "ti-device-desktop", label: "Desktop", pct: 52, color: "from-cyan-500 to-sky-500"    },
  { icon: "ti-device-mobile",  label: "Mobile",  pct: 36, color: "from-violet-500 to-violet-400" },
  { icon: "ti-device-tablet",  label: "Tablet",  pct: 12, color: "from-emerald-500 to-emerald-400" },
];

const LIVE_EVENTS = [
  { msg: "User signed up via /pricing CTA",       time: "just now", color: "#06B6D4" },
  { msg: "3 users viewed /features page",          time: "12s ago",  color: "#A78BFA" },
  { msg: "Conversion goal hit — demo booked",     time: "41s ago",  color: "#34D399" },
  { msg: "High bounce on /blog/post-12",          time: "1m ago",   color: "#F87171" },
  { msg: "Traffic spike from Twitter/X",           time: "3m ago",   color: "#FCD34D" },
];

const NAV_MAIN = [
  { icon: "ti-chart-line",      label: "Overview",    active: true  },
  { icon: "ti-users",           label: "Audience"                    },
  { icon: "ti-world",           label: "Traffic"                     },
  { icon: "ti-device-mobile",   label: "Behavior"                    },
];
const NAV_REPORTS = [
  { icon: "ti-file-analytics",  label: "Custom Reports" },
  { icon: "ti-calendar-stats",  label: "Scheduled"      },
  { icon: "ti-download",        label: "Exports"         },
];

// accent top-border gradient classes (must be in content so Tailwind includes them)
const ACCENT_CLASSES = {
  s1: "from-cyan-400 to-sky-500",
  s2: "from-violet-500 to-violet-400",
  s3: "from-emerald-500 to-emerald-400",
  s4: "from-amber-400 to-yellow-300",
};

// ── sub-components ────────────────────────────────────────────────────────────
function Sidebar() {
  return (
    <aside className="w-[210px] min-w-[210px] flex flex-col px-3 py-[18px] bg-[#0A1628] border-r border-cyan-500/10 relative z-10">
      <span className="font-display text-[17px] font-extrabold tracking-tight text-white px-1.5 mb-6">
        data<span className="text-cyan-400">lens</span>
      </span>

      <p className="sb-section">Analytics</p>
      {NAV_MAIN.map((n) => (
        <div key={n.label} className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[12px] font-medium mb-0.5 cursor-pointer transition-all
          ${n.active ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/25" : "text-white/40 hover:bg-cyan-500/[0.08] hover:text-white/75"}`}>
          <i className={`ti ${n.icon} text-[15px]`} aria-hidden="true" />
          {n.label}
        </div>
      ))}

      <p className="sb-section mt-4">Reports</p>
      {NAV_REPORTS.map((n) => (
        <div key={n.label} className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[12px] font-medium text-white/40 hover:bg-cyan-500/[0.08] hover:text-white/75 cursor-pointer transition-all mb-0.5">
          <i className={`ti ${n.icon} text-[15px]`} aria-hidden="true" />
          {n.label}
        </div>
      ))}

      <p className="sb-section mt-4">Settings</p>
      {["ti-adjustments|Filters", "ti-settings|Preferences"].map((s) => {
        const [icon, label] = s.split("|");
        return (
          <div key={label} className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[12px] font-medium text-white/40 hover:bg-cyan-500/[0.08] hover:text-white/75 cursor-pointer transition-all mb-0.5">
            <i className={`ti ${icon} text-[15px]`} aria-hidden="true" />
            {label}
          </div>
        );
      })}

      <div className="mt-auto flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.07] cursor-pointer hover:bg-white/[0.07] transition-all">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-sky-500 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">NQ</div>
        <div>
          <p className="text-[12px] font-semibold text-white/75">Neha Q.</p>
          <p className="text-[10px] text-white/25">Pro Plan</p>
        </div>
        <i className="ti ti-chevron-right ml-auto text-[12px] text-white/20" aria-hidden="true" />
      </div>
    </aside>
  );
}

function Topbar() {
  return (
    <div className="flex items-center justify-between px-5 py-3.5 bg-[#0A1628] border-b border-cyan-500/10">
      <div>
        <p className="font-display text-[17px] font-bold text-white tracking-tight">Real-time Analytics</p>
        <p className="text-[11px] text-white/30 mt-0.5">datalens.io · Last updated just now</p>
      </div>
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/25 rounded-full px-3 py-1.5 text-[11px] font-medium text-cyan-400">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Live · 284 active now
        </div>
        <select className="bg-[#0D1E35] border border-cyan-500/20 text-white/60 rounded-lg px-3 py-1.5 text-[12px] font-medium outline-none cursor-pointer">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
        </select>
        <button className="flex items-center gap-1.5 bg-cyan-400 hover:opacity-85 active:scale-95 text-[#060D1F] text-[12px] font-bold px-4 py-2 rounded-lg transition-all">
          <i className="ti ti-download text-[13px]" aria-hidden="true" /> Export
        </button>
      </div>
    </div>
  );
}

function Sparkline({ values, color }) {
  const max = Math.max(...values);
  return (
    <div className="flex items-end gap-0.5 h-7 mt-2">
      {values.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-sm"
          style={{
            height: `${(v / max) * 100}%`,
            background: i === values.length - 2 ? color : `${color}55`,
          }}
        />
      ))}
    </div>
  );
}

function StatCards() {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-4">
      {STATS.map((s, i) => (
        <motion.div
          key={s.label}
          variants={fadeUp} initial="hidden" animate="show" custom={i}
          className="relative bg-[#0D1E35] border border-cyan-500/12 rounded-2xl p-4 overflow-hidden"
        >
          <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${ACCENT_CLASSES[s.accent]}`} />
          <div className="flex items-center justify-between text-[11px] font-medium text-white/35 mb-2">
            {s.label}
            <i className={`ti ${s.icon} text-[13px]`} style={{ color: s.sparkColor }} aria-hidden="true" />
          </div>
          <p className="font-display text-[26px] font-extrabold text-white tracking-tight leading-none">{s.value}</p>
          <p className={`text-[10px] font-medium mt-1.5 ${s.up ? "text-emerald-400" : "text-red-400"}`}>{s.change}</p>
          <Sparkline values={s.spark} color={s.sparkColor} />
        </motion.div>
      ))}
    </div>
  );
}

function GlassCard({ children, className = "" }) {
  return (
    <div className={`bg-[#0D1E35] border border-cyan-500/10 rounded-2xl p-4 ${className}`}>
      {children}
    </div>
  );
}

function CardHeader({ title, sub }) {
  return (
    <div className="mb-3.5">
      <p className="text-[13px] font-semibold text-white/85">{title}</p>
      <p className="text-[11px] text-white/30 mt-0.5">{sub}</p>
    </div>
  );
}

function LineChart() {
  return (
    <GlassCard>
      <CardHeader title="Visitors Over Time" sub="Daily unique visitors — last 7 days" />
      <div className="relative h-[120px]">
        {/* Y labels */}
        <div className="absolute left-0 top-0 bottom-[18px] flex flex-col justify-between">
          {["60K", "40K", "20K", "0"].map((l) => (
            <span key={l} className="text-[9px] text-white/20">{l}</span>
          ))}
        </div>
        {/* SVG Chart */}
        <div className="absolute left-7 right-0 top-0 bottom-[18px]">
          <svg width="100%" height="100%" viewBox="0 0 400 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0EA5E9" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
            {/* grid */}
            {[33, 66].map((y) => (
              <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            ))}
            {/* area */}
            <path
              d="M0,72 C57,72 57,48 114,48 C171,48 171,28 228,22 C285,16 285,42 342,35 C370,31 400,18 400,18 L400,100 L0,100 Z"
              fill="url(#areaGrad)"
            />
            {/* line */}
            <path
              d="M0,72 C57,72 57,48 114,48 C171,48 171,28 228,22 C285,16 285,42 342,35 C370,31 400,18 400,18"
              fill="none" stroke="url(#lineGrad)" strokeWidth="2.5" strokeLinecap="round"
            />
            {/* dots */}
            {[[0,72],[114,48],[228,22],[342,35]].map(([cx,cy]) => (
              <circle key={cx} cx={cx} cy={cy} r="3" fill="#06B6D4" />
            ))}
            <circle cx="400" cy="18" r="4" fill="#fff" stroke="#06B6D4" strokeWidth="2" />
          </svg>
        </div>
        {/* X labels */}
        <div className="absolute left-7 right-0 bottom-0 flex justify-between">
          {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d) => (
            <span key={d} className="text-[9px] text-white/20">{d}</span>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}

function TopPages() {
  return (
    <GlassCard>
      <CardHeader title="Top Pages" sub="By pageviews this week" />
      <div className="flex flex-col divide-y divide-white/[0.04]">
        {TOP_PAGES.map((p, i) => (
          <div key={p.page} className="flex items-center gap-2.5 py-2">
            <span className="text-[10px] text-white/20 w-4">{i + 1}</span>
            <span className="text-[12px] font-medium text-white/70 flex-1">{p.page}</span>
            <div className="w-[60px] h-1 bg-white/[0.06] rounded-full overflow-hidden">
              <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${p.pct}%` }} />
            </div>
            <span className="text-[12px] font-semibold text-cyan-400">{p.views}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

function TopCountries() {
  return (
    <GlassCard>
      <CardHeader title="Top Countries" sub="Visitor breakdown by location" />
      <div className="flex flex-col divide-y divide-white/[0.04]">
        {COUNTRIES.map((c) => (
          <div key={c.name} className="flex items-center gap-2.5 py-1.5">
            <span className="text-base">{c.flag}</span>
            <span className="text-[12px] font-medium text-white/65 flex-1">{c.name}</span>
            <div className="w-[50px] h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-400 to-sky-500 rounded-full" style={{ width: `${c.pct}%` }} />
            </div>
            <span className="text-[11px] font-semibold text-cyan-400">{c.pct}%</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

function DeviceBreakdown() {
  return (
    <GlassCard>
      <CardHeader title="Device Breakdown" sub="Sessions by device type" />
      <div className="flex flex-col gap-3">
        {DEVICES.map((d) => (
          <div key={d.label} className="flex items-center gap-2.5">
            <div className="w-[30px] h-[30px] rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
              <i className={`ti ${d.icon} text-sm`} aria-hidden="true" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[12px] font-medium text-white/65">{d.label}</span>
                <span className="text-[11px] font-bold text-white">{d.pct}%</span>
              </div>
              <div className="w-full h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${d.color} rounded-full`} style={{ width: `${d.pct}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

function LiveEvents() {
  return (
    <GlassCard>
      <CardHeader title="Live Events" sub="Real-time user actions" />
      <div className="flex flex-col divide-y divide-white/[0.04]">
        {LIVE_EVENTS.map((e, i) => (
          <div key={i} className="flex items-start gap-2.5 py-1.5">
            <div className="w-[6px] h-[6px] rounded-full mt-1 flex-shrink-0" style={{ background: e.color }} />
            <div>
              <p className="text-[11px] text-white/50 leading-relaxed">{e.msg}</p>
              <p className="text-[10px] text-white/20 mt-0.5">{e.time}</p>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

// ── page ──────────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <div className="flex min-h-screen bg-[#060D1F] font-sans overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-y-auto p-5">
          <StatCards />

          {/* mid row */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={4}
            className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-3 mb-3"
          >
            <LineChart />
            <TopPages />
          </motion.div>

          {/* bottom row */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={5}
            className="grid grid-cols-1 xl:grid-cols-3 gap-3"
          >
            <TopCountries />
            <DeviceBreakdown />
            <LiveEvents />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
