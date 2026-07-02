import { motion } from "framer-motion";
import { HiOutlineTag, HiOutlinePlus } from "react-icons/hi";

export default function EmptyState({ onAdd }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      {/* Illustration */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative mb-6"
      >
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-violet-100 to-indigo-100 dark:from-violet-900/30 dark:to-indigo-900/30 flex items-center justify-center border border-violet-200/50 dark:border-violet-500/20 shadow-xl shadow-violet-100 dark:shadow-violet-900/20">
          <HiOutlineTag className="w-12 h-12 text-violet-400" />
        </div>
        {/* Ping dot */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-violet-500" />
        </span>
      </motion.div>

      <h3 className="text-lg font-bold text-slate-700 dark:text-white mb-2">
        No Categories Found
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mb-8 leading-relaxed">
        Get started by creating your first category to organize inventory materials and procurement.
      </p>

      {onAdd && (
        <motion.button
          onClick={onAdd}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-200"
        >
          <HiOutlinePlus className="w-4 h-4" />
          Create First Category
        </motion.button>
      )}
    </motion.div>
  );
}
