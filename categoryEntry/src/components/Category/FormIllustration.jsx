import { motion } from "framer-motion";
import { HiOutlineTag, HiOutlineCheckCircle, HiOutlineSparkles } from "react-icons/hi";

const floatingVariants = {
  animate: {
    y: [0, -12, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

const floatingVariants2 = {
  animate: {
    y: [0, 10, 0],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 },
  },
};

export default function FormIllustration({ editMode }) {
  return (
    <div className="relative h-full min-h-[340px] rounded-2xl overflow-hidden flex flex-col items-center justify-center p-8 bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700">
      {/* Background orbs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-300/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

      {/* Floating cards */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="relative z-10 mb-8"
      >
        <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-2xl">
          <HiOutlineTag className="w-10 h-10 text-white" />
        </div>
      </motion.div>

      <div className="relative z-10 text-center space-y-3">
        <motion.h3
          className="text-2xl font-bold text-white"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {editMode ? "Edit Category" : "New Category"}
        </motion.h3>
        <motion.p
          className="text-white/70 text-sm max-w-[200px] mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {editMode
            ? "Update the category details to keep your inventory organized."
            : "Create a new category to structure your inventory and procurement workflow."}
        </motion.p>
      </div>

      {/* Feature pills */}
      <motion.div
        variants={floatingVariants2}
        animate="animate"
        className="relative z-10 mt-8 flex flex-col gap-2.5 w-full max-w-[220px]"
      >
        {["Organizes materials", "Speeds procurement", "Enables reporting"].map((text, i) => (
          <motion.div
            key={text}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="flex items-center gap-2.5 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20"
          >
            <HiOutlineCheckCircle className="w-4 h-4 text-emerald-300 flex-shrink-0" />
            <span className="text-white/90 text-xs font-medium">{text}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Sparkle accent */}
      <motion.div
        className="absolute top-6 right-6 text-yellow-300/60"
        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      >
        <HiOutlineSparkles className="w-5 h-5" />
      </motion.div>
    </div>
  );
}
