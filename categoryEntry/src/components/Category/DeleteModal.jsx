import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineExclamationCircle, HiX } from "react-icons/hi";
import { ImSpinner8 } from "react-icons/im";

export default function DeleteModal({ isOpen, category, onConfirm, onCancel, deleting }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Dialog */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-white/10 overflow-hidden"
            >
              {/* Top accent */}
              <div className="h-1 w-full bg-gradient-to-r from-rose-500 to-pink-600" />

              <div className="p-8">
                {/* Close */}
                <button
                  onClick={onCancel}
                  className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                >
                  <HiX className="w-4 h-4" />
                </button>

                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
                  className="w-16 h-16 rounded-2xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mx-auto mb-6"
                >
                  <HiOutlineExclamationCircle className="w-9 h-9 text-rose-500" />
                </motion.div>

                <h2 className="text-xl font-bold text-slate-800 dark:text-white text-center mb-2">
                  Delete Category?
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 text-center leading-relaxed mb-1">
                  You're about to delete{" "}
                  <span className="font-semibold text-slate-700 dark:text-white">
                    {category?.category_name}
                  </span>
                  .
                </p>
                <p className="text-xs text-rose-500 text-center font-medium mb-8">
                  This action cannot be undone.
                </p>

                <div className="flex gap-3">
                  <motion.button
                    onClick={onCancel}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-200"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    onClick={onConfirm}
                    disabled={deleting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white text-sm font-semibold shadow-lg shadow-rose-500/30 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {deleting ? (
                      <>
                        <ImSpinner8 className="w-4 h-4 animate-spin" />
                        Deleting…
                      </>
                    ) : (
                      "Delete"
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
