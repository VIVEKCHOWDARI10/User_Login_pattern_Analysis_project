import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineTag,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineClock,
} from "react-icons/hi";

function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(0);
  const frame = useRef(null);

  useEffect(() => {
    const start = 0;
    const end = value;
    const duration = 900;
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + (end - start) * ease));
      if (progress < 1) frame.current = requestAnimationFrame(step);
    };

    frame.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame.current);
  }, [value]);

  return <span>{display}</span>;
}

const cards = [
  {
    key: "total",
    label: "Total Categories",
    icon: HiOutlineTag,
    gradient: "from-violet-500 to-indigo-600",
    bg: "from-violet-500/10 to-indigo-600/10",
    border: "border-violet-500/20",
    trend: "+12%",
    trendUp: true,
  },
  {
    key: "active",
    label: "Active",
    icon: HiOutlineCheckCircle,
    gradient: "from-emerald-400 to-teal-500",
    bg: "from-emerald-400/10 to-teal-500/10",
    border: "border-emerald-500/20",
    trend: "+8%",
    trendUp: true,
  },
  {
    key: "inactive",
    label: "Inactive",
    icon: HiOutlineXCircle,
    gradient: "from-rose-400 to-pink-600",
    bg: "from-rose-400/10 to-pink-600/10",
    border: "border-rose-500/20",
    trend: "-3%",
    trendUp: false,
  },
  {
    key: "recentlyAdded",
    label: "This Week",
    icon: HiOutlineClock,
    gradient: "from-amber-400 to-orange-500",
    bg: "from-amber-400/10 to-orange-500/10",
    border: "border-amber-500/20",
    trend: "+5",
    trendUp: true,
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 280, damping: 28 } },
};

export default function StatsCards({ stats }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {cards.map(({ key, label, icon: Icon, gradient, bg, border, trend, trendUp }) => (
        <motion.div
          key={key}
          variants={itemVariants}
          whileHover={{ y: -4, scale: 1.02 }}
          className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${bg} border ${border} backdrop-blur-sm p-5 cursor-default`}
        >
          {/* Icon */}
          <div
            className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} text-white mb-4 shadow-lg`}
          >
            <Icon className="w-5 h-5" />
          </div>

          {/* Value */}
          <div className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">
            <AnimatedNumber value={stats[key] ?? 0} />
          </div>

          {/* Label */}
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">
            {label}
          </div>

          {/* Trend */}
          <div
            className={`inline-flex items-center gap-1 mt-3 text-xs font-semibold px-2 py-0.5 rounded-full ${
              trendUp
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400"
                : "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400"
            }`}
          >
            <span>{trendUp ? "↑" : "↓"}</span>
            <span>{trend} vs last month</span>
          </div>

          {/* Decorative circle */}
          <div
            className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-gradient-to-br ${gradient} opacity-10`}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
