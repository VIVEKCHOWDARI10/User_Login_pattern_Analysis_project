import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";
import LoadingSkeleton from "./LoadingSkeleton";
import EmptyState from "./EmptyState";

function StatusPill({ status }) {
  const isActive = status === "Active";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
        isActive
          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
          : "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-emerald-500" : "bg-rose-500"}`}
      />
      {status}
    </span>
  );
}

const rowVariants = {
  hidden: { opacity: 0, y: 8 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, duration: 0.25, ease: "easeOut" },
  }),
};

export default function CategoryTable({
  categories,
  loading,
  pagination,
  onEdit,
  onDelete,
  onView,
  onPageChange,
  onRowsChange,
  onAdd,
}) {
  const { page, rowsPerPage, total } = pagination;
  const totalPages = Math.ceil(total / rowsPerPage);
  const start = (page - 1) * rowsPerPage + 1;
  const end = Math.min(page * rowsPerPage, total);

  return (
    <div>
      {/* Table wrapper */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-white/10">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="bg-slate-50/80 dark:bg-white/5 border-b border-slate-200/80 dark:border-white/10">
              {["#", "Code", "Category Name", "Description", "Status", "Created", "Actions"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-4 py-3.5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/5">
            {loading ? (
              <tr>
                <td colSpan={7} className="p-2">
                  <LoadingSkeleton rows={rowsPerPage} />
                </td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <EmptyState onAdd={onAdd} />
                </td>
              </tr>
            ) : (
              <AnimatePresence>
                {categories.map((cat, i) => (
                  <motion.tr
                    key={cat.id}
                    custom={i}
                    variants={rowVariants}
                    initial="hidden"
                    animate="show"
                    exit={{ opacity: 0, x: -10 }}
                    className="group hover:bg-violet-50/50 dark:hover:bg-violet-900/10 transition-colors duration-150"
                  >
                    <td className="px-4 py-3.5 text-xs text-slate-400 font-mono">
                      {start + i}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="font-mono text-xs bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-lg">
                        {cat.category_code || "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-semibold text-sm text-slate-800 dark:text-white">
                      {cat.category_name}
                    </td>
                    <td className="px-4 py-3.5 text-sm text-slate-500 dark:text-slate-400 max-w-[200px] truncate">
                      {cat.description || "—"}
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusPill status={cat.status} />
                    </td>
                    <td className="px-4 py-3.5 text-xs text-slate-400 whitespace-nowrap">
                      {cat.created_at
                        ? new Date(cat.created_at).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "—"}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        <motion.button
                          onClick={() => onView(cat)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title="View"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                        >
                          <HiOutlineEye className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          onClick={() => onEdit(cat)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title="Edit"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-colors"
                        >
                          <HiOutlinePencil className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          onClick={() => onDelete(cat)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title="Delete"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-colors"
                        >
                          <HiOutlineTrash className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!loading && categories.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-wrap items-center justify-between gap-4 mt-4 px-1"
        >
          <div className="flex items-center gap-3">
            <label className="text-xs text-slate-500 dark:text-slate-400">Rows per page:</label>
            <select
              value={rowsPerPage}
              onChange={(e) => onRowsChange(Number(e.target.value))}
              className="bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-3 py-1.5 text-xs text-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/40"
            >
              {[5, 10, 25, 50].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400">
            {total > 0 ? `${start}–${end} of ${total} records` : "No records"}
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg border border-slate-200 dark:border-white/10 text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <HiOutlineChevronLeft className="w-4 h-4" />
            </motion.button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                const p = i + 1;
                return (
                  <button
                    key={p}
                    onClick={() => onPageChange(p)}
                    className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
                      p === page
                        ? "bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/30"
                        : "text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10"
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>

            <motion.button
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg border border-slate-200 dark:border-white/10 text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <HiOutlineChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
