import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineTag, HiOutlineCode, HiOutlineDocumentText } from "react-icons/hi";
import { ImSpinner8 } from "react-icons/im";

const inputCls =
  "w-full bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all duration-200 backdrop-blur-sm";

const labelCls = "block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2";

function Field({ label, icon: Icon, error, children }) {
  return (
    <div>
      <label className={labelCls}>
        <span className="inline-flex items-center gap-1.5">
          {Icon && <Icon className="w-3.5 h-3.5" />}
          {label}
        </span>
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-rose-500 text-xs mt-1.5 font-medium"
          >
            {error.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CategoryForm({ editData, onSave, onCancel, saving }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: { category_name: "", category_code: "", description: "", status: "Active" },
  });

  useEffect(() => {
    if (editData) {
      Object.entries(editData).forEach(([k, v]) => setValue(k, v));
    } else {
      reset();
    }
  }, [editData, setValue, reset]);

  const onSubmit = (data) => onSave(data);

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-5"
      noValidate
    >
      {/* Category Name */}
      <Field label="Category Name" icon={HiOutlineTag} error={errors.category_name}>
        <input
          {...register("category_name", {
            required: "Category name is required",
            minLength: { value: 2, message: "Minimum 2 characters" },
            maxLength: { value: 100, message: "Maximum 100 characters" },
          })}
          placeholder="e.g. Electrical Components"
          className={`${inputCls} ${errors.category_name ? "border-rose-400 focus:ring-rose-400/50" : ""}`}
        />
      </Field>

      {/* Category Code */}
      <Field label="Category Code" icon={HiOutlineCode} error={errors.category_code}>
        <input
          {...register("category_code", {
            maxLength: { value: 20, message: "Maximum 20 characters" },
            pattern: { value: /^[A-Z0-9_-]*$/i, message: "Only letters, numbers, _ and -" },
          })}
          placeholder="e.g. ELEC-001"
          className={`${inputCls} ${errors.category_code ? "border-rose-400 focus:ring-rose-400/50" : ""}`}
        />
      </Field>

      {/* Description */}
      <Field label="Description" icon={HiOutlineDocumentText} error={errors.description}>
        <textarea
          {...register("description", { maxLength: { value: 500, message: "Maximum 500 characters" } })}
          rows={3}
          placeholder="Brief description of this category..."
          className={`${inputCls} resize-none ${errors.description ? "border-rose-400 focus:ring-rose-400/50" : ""}`}
        />
      </Field>

      {/* Status */}
      <div>
        <label className={labelCls}>Status</label>
        <div className="flex gap-3">
          {["Active", "Inactive"].map((s) => (
            <label
              key={s}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="radio"
                value={s}
                {...register("status")}
                className="sr-only peer"
              />
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all peer-checked:border-violet-500 ${
                  s === "Active" ? "peer-checked:bg-violet-500" : "peer-checked:bg-rose-500 peer-checked:border-rose-500"
                } border-slate-300 group-hover:border-violet-400`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white opacity-0 peer-checked:opacity-100" />
              </div>
              <span className={`text-sm font-medium ${s === "Active" ? "text-emerald-600" : "text-rose-500"}`}>
                {s}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 pt-2">
        <motion.button
          type="submit"
          disabled={saving}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
        >
          {saving ? (
            <>
              <ImSpinner8 className="w-4 h-4 animate-spin" />
              {editData ? "Updating…" : "Saving…"}
            </>
          ) : (
            <>{editData ? "Update" : "Save"}</>
          )}
        </motion.button>

        <motion.button
          type="button"
          onClick={() => reset()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-200"
        >
          Reset
        </motion.button>

        {editData && (
          <motion.button
            type="button"
            onClick={onCancel}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-5 py-2.5 rounded-xl border border-rose-200 dark:border-rose-500/30 text-rose-600 dark:text-rose-400 text-sm font-semibold hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all duration-200"
          >
            Cancel
          </motion.button>
        )}
      </div>
    </motion.form>
  );
}
