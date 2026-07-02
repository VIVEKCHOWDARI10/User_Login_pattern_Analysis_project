import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineChevronRight,
  HiOutlinePlus,
  HiOutlineTag,
  HiOutlineX,
} from "react-icons/hi";

import StatsCards      from "../../components/Category/StatsCards";
import CategoryForm    from "../../components/Category/CategoryForm";
import FormIllustration from "../../components/Category/FormIllustration";
import CategoryToolbar from "../../components/Category/CategoryToolbar";
import CategoryTable   from "../../components/Category/CategoryTable";
import DeleteModal     from "../../components/Category/DeleteModal";
import { useCategories } from "../../hooks/useCategories";

export default function CategoryPage() {
  const [editData,     setEditData]     = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showForm,     setShowForm]     = useState(true);
  const [filters,      setFilters]      = useState({ name: "", code: "", status: "" });

  const {
    categories,
    stats,
    loading,
    saving,
    deleting,
    pagination,
    setPage,
    setRowsPerPage,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategories();

  // Keep a stable ref to the current filters + pagination so the refresh
  // callback always uses the latest values without being a dependency.
  const stateRef = useRef({ filters, pagination });
  useEffect(() => { stateRef.current = { filters, pagination }; });

  const refresh = useCallback(() => {
    const { filters: f, pagination: p } = stateRef.current;
    fetchCategories(f, { page: p.page, limit: p.rowsPerPage });
  }, [fetchCategories]);

  // Initial load
  useEffect(() => { refresh(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Re-fetch when filters change (reset to page 1)
  useEffect(() => {
    fetchCategories(filters, { page: 1, limit: pagination.rowsPerPage });
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  // Re-fetch when page or rowsPerPage changes
  useEffect(() => {
    fetchCategories(filters, { page: pagination.page, limit: pagination.rowsPerPage });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, pagination.rowsPerPage]);

  // ─── CRUD handlers ────────────────────────────────────────────────────────
  const handleSave = useCallback(async (data) => {
    const ok = editData
      ? await updateCategory(editData.id, data)
      : await createCategory(data);

    if (ok) {
      setEditData(null);
      // Slight delay so the user sees the toast before the list reloads
      setTimeout(refresh, 200);
    }
  }, [editData, createCategory, updateCategory, refresh]);

  const handleDelete = useCallback(async () => {
    if (!deleteTarget) return;
    const ok = await deleteCategory(deleteTarget.id);
    if (ok) {
      setDeleteTarget(null);
      setTimeout(refresh, 200);
    }
  }, [deleteTarget, deleteCategory, refresh]);

  const handleEdit = (cat) => {
    setEditData(cat);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddNew = () => {
    setEditData(null);
    setShowForm(true);
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* ── Breadcrumb ── */}
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm"
        >
          <Link to="/" className="flex items-center gap-1.5 text-slate-400 hover:text-violet-600 transition-colors">
            <HiOutlineHome className="w-4 h-4" />
            Dashboard
          </Link>
          <HiOutlineChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="text-slate-400">Master</span>
          <HiOutlineChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="text-violet-600 font-semibold">Category Entry</span>
        </motion.nav>

        {/* ── Hero Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700 p-8 md:p-10"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-indigo-300/10 rounded-full translate-y-1/2 blur-2xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                  <HiOutlineTag className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/60 text-sm font-medium">Master Module</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
                Category Management
              </h1>
              <p className="text-white/65 text-sm md:text-base max-w-lg leading-relaxed">
                Manage inventory categories efficiently. Categories help organize materials,
                procurement, and stock operations throughout the system.
              </p>
            </div>

            <motion.button
              onClick={handleAddNew}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2.5 self-start md:self-auto px-6 py-3.5 rounded-2xl bg-white text-violet-700 font-semibold text-sm shadow-xl shadow-black/20 hover:shadow-black/30 transition-all duration-200 whitespace-nowrap"
            >
              <HiOutlinePlus className="w-4 h-4" />
              Add Category
            </motion.button>
          </div>
        </motion.div>

        {/* ── Stats ── */}
        <StatsCards stats={stats} />

        {/* ── Form Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative rounded-3xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-xl shadow-slate-200/50 dark:shadow-black/30 overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 pt-6 pb-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                <HiOutlinePlus className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-800 dark:text-white">
                  {editData ? "Edit Category" : "New Category"}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {editData ? `Editing: ${editData.category_name}` : "Fill in the details below"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowForm((s) => !s)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            >
              <HiOutlineX className={`w-4 h-4 transition-transform ${showForm ? "" : "rotate-45"}`} />
            </button>
          </div>

          {showForm && (
            <div className="grid md:grid-cols-[1fr_320px] gap-0 p-6">
              <div className="pr-0 md:pr-8">
                <CategoryForm
                  editData={editData}
                  onSave={handleSave}
                  onCancel={() => setEditData(null)}
                  saving={saving}
                />
              </div>
              <div className="hidden md:block">
                <FormIllustration editMode={!!editData} />
              </div>
            </div>
          )}
        </motion.div>

        {/* ── Table Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-3xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-xl shadow-slate-200/50 dark:shadow-black/30 overflow-hidden"
        >
          <div className="px-6 pt-6 pb-4 border-b border-slate-100 dark:border-white/10">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-base font-bold text-slate-800 dark:text-white">
                  All Categories
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {stats.total} {stats.total === 1 ? "category" : "categories"} total
                </p>
              </div>
            </div>
            <CategoryToolbar
              filters={filters}
              onChange={setFilters}
              onRefresh={refresh}
              loading={loading}
            />
          </div>

          <div className="p-6">
            <CategoryTable
              categories={categories}
              loading={loading}
              pagination={pagination}
              onEdit={handleEdit}
              onDelete={setDeleteTarget}
              onView={(cat) => alert(`Viewing: ${cat.category_name}\nCode: ${cat.category_code ?? "—"}\nStatus: ${cat.status}`)}
              onPageChange={setPage}
              onRowsChange={setRowsPerPage}
              onAdd={handleAddNew}
            />
          </div>
        </motion.div>
      </div>

      {/* ── Delete Modal ── */}
      <DeleteModal
        isOpen={!!deleteTarget}
        category={deleteTarget}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        deleting={deleting}
      />
    </div>
  );
}
