import { motion } from "framer-motion";
import { HiOutlineSearch, HiOutlineRefresh, HiOutlineDownload } from "react-icons/hi";

const inputCls =
  "bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition-all duration-200 backdrop-blur-sm";

export default function CategoryToolbar({ filters, onChange, onRefresh, loading }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="flex flex-wrap gap-3 items-center"
    >
      {/* Search name */}
      <div className="relative flex-1 min-w-[200px]">
        <HiOutlineSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={filters.name}
          onChange={(e) => onChange({ ...filters, name: e.target.value })}
          placeholder="Search by name…"
          className={`${inputCls} pl-10 w-full`}
        />
      </div>

      {/* Search code */}
      <div className="relative min-w-[160px]">
        <HiOutlineSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={filters.code}
          onChange={(e) => onChange({ ...filters, code: e.target.value })}
          placeholder="Search by code…"
          className={`${inputCls} pl-10 w-full`}
        />
      </div>

      {/* Status */}
      <select
        value={filters.status}
        onChange={(e) => onChange({ ...filters, status: e.target.value })}
        className={`${inputCls} min-w-[140px] cursor-pointer`}
      >
        <option value="">All Status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      {/* Refresh */}
      <motion.button
        onClick={onRefresh}
        disabled={loading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-200 disabled:opacity-50"
        title="Refresh"
      >
        <HiOutlineRefresh className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
      </motion.button>

      {/* Export (UI only) */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-200"
      >
        <HiOutlineDownload className="w-4 h-4" />
        Export
      </motion.button>
    </motion.div>
  );
}
