import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import categoryApi from "../services/categoryApi";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0, recentlyAdded: 0 });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, rowsPerPage: 10, total: 0 });

  // ─── Fetch ──────────────────────────────────────────────────────────────────
  const fetchCategories = useCallback(async (queryParams = {}, paginationOverride = {}) => {
    setLoading(true);
    try {
      const merged = { ...queryParams, ...paginationOverride };

      // Map internal field names → what the adapter (mock or real) expects
      const apiParams = {
        page:   merged.page   ?? pagination.page,
        limit:  merged.limit  ?? pagination.rowsPerPage,
        name:   merged.name   ?? "",
        code:   merged.code   ?? "",
        status: merged.status ?? "",
      };

      const result = await categoryApi.getAll(apiParams);

      // Normalise response: { data: [...], count: N }  or plain array
      const list  = Array.isArray(result.data)
        ? result.data
        : result.data?.data  ?? result.data?.results ?? [];
      const total = typeof result.data?.count === "number"
        ? result.data.count
        : typeof result.data?.total === "number"
        ? result.data.total
        : list.length;

      setCategories(list);
      setPagination((p) => ({ ...p, total }));

      const cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      setStats({
        total,
        active:        list.filter((c) => c.status === "Active").length,
        inactive:      list.filter((c) => c.status === "Inactive").length,
        recentlyAdded: list.filter((c) => new Date(c.created_at) >= cutoff).length,
      });
    } catch (err) {
      toast.error(err.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.rowsPerPage]);

  // ─── Create ─────────────────────────────────────────────────────────────────
  const createCategory = useCallback(async (formData) => {
    setSaving(true);
    try {
      await categoryApi.create(formData);
      toast.success("Category created successfully");
      return true;
    } catch (err) {
      toast.error(err.message || "Failed to create category");
      return false;
    } finally {
      setSaving(false);
    }
  }, []);

  // ─── Update ─────────────────────────────────────────────────────────────────
  const updateCategory = useCallback(async (id, formData) => {
    setSaving(true);
    try {
      await categoryApi.update(id, formData);
      toast.success("Category updated successfully");
      return true;
    } catch (err) {
      toast.error(err.message || "Failed to update category");
      return false;
    } finally {
      setSaving(false);
    }
  }, []);

  // ─── Delete ─────────────────────────────────────────────────────────────────
  const deleteCategory = useCallback(async (id) => {
    setDeleting(true);
    try {
      await categoryApi.remove(id);
      toast.success("Category deleted successfully");
      return true;
    } catch (err) {
      toast.error(err.message || "Failed to delete category");
      return false;
    } finally {
      setDeleting(false);
    }
  }, []);

  // ─── Pagination helpers ──────────────────────────────────────────────────────
  const setPage        = (page)        => setPagination((p) => ({ ...p, page }));
  const setRowsPerPage = (rowsPerPage) => setPagination((p) => ({ ...p, rowsPerPage, page: 1 }));

  return {
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
  };
}
