/**
 * categoryApi.js — Axios-compatible service layer
 *
 * USE_MOCK = true  → all calls are handled by mockDb (LocalStorage, no server needed)
 * USE_MOCK = false → real HTTP calls go to VITE_API_BASE_URL
 *
 * The public interface (getAll / getById / create / update / remove) is identical
 * in both modes, so useCategories.js and all components are untouched.
 */

import axios from "axios";
import { dbGetAll, dbGetById, dbCreate, dbUpdate, dbDelete } from "./mockDb";

// ─── Feature flag ─────────────────────────────────────────────────────────────
// Set to false and configure VITE_API_BASE_URL to switch to a real backend.
const USE_MOCK = true;

// ─── Real Axios instance (used when USE_MOCK = false) ─────────────────────────
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

httpClient.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err.response?.data?.message ||
      err.response?.data?.detail ||
      err.message ||
      "An unexpected error occurred";
    return Promise.reject(new Error(message));
  }
);

// ─── Mock adapter ─────────────────────────────────────────────────────────────
// Wraps mockDb functions so they throw Error objects (matching Axios behaviour)
// and return `{ data: ... }` shaped responses (matching Axios response.data).

function wrapMock(fn) {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (err) {
      // err may be a plain { status, message } object thrown by mockDb
      const message =
        err instanceof Error ? err.message : err?.message || "Mock DB error";
      throw new Error(message);
    }
  };
}

const mockAdapter = {
  getAll: wrapMock(dbGetAll),
  getById: wrapMock(dbGetById),
  create: wrapMock(dbCreate),
  update: wrapMock(dbUpdate),
  remove: wrapMock(dbDelete),
};

// ─── Real HTTP adapter ────────────────────────────────────────────────────────
const httpAdapter = {
  getAll: (params = {}) =>
    httpClient.get("/categories", { params }).then((r) => ({ data: r.data })),
  getById: (id) =>
    httpClient.get(`/categories/${id}`).then((r) => ({ data: r.data })),
  create: (data) =>
    httpClient.post("/categories", data).then((r) => ({ data: r.data })),
  update: (id, data) =>
    httpClient.put(`/categories/${id}`, data).then((r) => ({ data: r.data })),
  remove: (id) =>
    httpClient.delete(`/categories/${id}`).then((r) => ({ data: r.data })),
};

// ─── Public API (same shape regardless of mode) ───────────────────────────────
export const categoryApi = USE_MOCK ? mockAdapter : httpAdapter;

export default categoryApi;
