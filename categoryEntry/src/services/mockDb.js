/**
 * mockDb.js — LocalStorage-backed mock database
 *
 * Simulates a REST backend with realistic async delays.
 * Replace this file (or flip USE_MOCK in categoryApi.js) to switch to a real backend.
 *
 * Storage key: "ims_categories"
 */

const STORAGE_KEY = "ims_categories";

const SEED_DATA = [
  {
    id: 1,
    category_code: "ELEC-001",
    category_name: "Electrical Components",
    description: "All electrical parts, wiring, and circuit components",
    status: "Active",
    created_at: "2024-11-12T08:00:00.000Z",
  },
  {
    id: 2,
    category_code: "MECH-002",
    category_name: "Mechanical Parts",
    description: "Mechanical hardware, fittings, bearings, and fasteners",
    status: "Active",
    created_at: "2024-12-01T09:30:00.000Z",
  },
  {
    id: 3,
    category_code: "CHEM-003",
    category_name: "Chemical Supplies",
    description: "Industrial chemicals, solvents, and reagents",
    status: "Inactive",
    created_at: "2025-01-05T11:00:00.000Z",
  },
  {
    id: 4,
    category_code: "IT-004",
    category_name: "IT Equipment",
    description: "Computers, servers, networking gear, and peripherals",
    status: "Active",
    created_at: "2025-02-20T14:15:00.000Z",
  },
  {
    id: 5,
    category_code: "SAFETY-005",
    category_name: "Safety Equipment",
    description: "Personal protective equipment and safety gear",
    status: "Active",
    created_at: "2025-06-18T08:45:00.000Z",
  },
  {
    id: 6,
    category_code: "CIVIL-006",
    category_name: "Civil & Structural",
    description: "Construction materials, cement, and structural components",
    status: "Active",
    created_at: "2025-06-20T10:00:00.000Z",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Artificial network delay between min–max ms */
const delay = (min = 300, max = 700) =>
  new Promise((res) => setTimeout(res, Math.random() * (max - min) + min));

/** Read all records from LocalStorage, seeding on first run */
function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {
    // corrupted storage — re-seed
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_DATA));
  return SEED_DATA;
}

/** Persist the full list back to LocalStorage */
function writeAll(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

/** Generate a new numeric ID (max existing + 1) */
function nextId(list) {
  return list.length > 0 ? Math.max(...list.map((r) => r.id)) + 1 : 1;
}

// ─── Validation ──────────────────────────────────────────────────────────────

function validate(data, existingId = null) {
  const all = readAll();

  if (!data.category_name || data.category_name.trim().length < 2) {
    throw { status: 400, message: "Category name must be at least 2 characters." };
  }

  const nameDuplicate = all.find(
    (c) =>
      c.category_name.toLowerCase() === data.category_name.trim().toLowerCase() &&
      c.id !== existingId
  );
  if (nameDuplicate) {
    throw { status: 409, message: `Category name "${data.category_name}" already exists.` };
  }

  if (data.category_code) {
    const codeDuplicate = all.find(
      (c) =>
        c.category_code?.toLowerCase() === data.category_code.trim().toLowerCase() &&
        c.id !== existingId
    );
    if (codeDuplicate) {
      throw { status: 409, message: `Category code "${data.category_code}" is already in use.` };
    }
  }
}

// ─── CRUD operations ─────────────────────────────────────────────────────────

/**
 * GET /categories
 * Supports: page, limit, search (name/code), status
 * Returns: { data: [...], count: N }
 */
export async function dbGetAll(params = {}) {
  await delay(300, 600);
  let list = readAll();

  // Filter
  const name = (params.name || "").toLowerCase();
  const code = (params.code || "").toLowerCase();
  const status = params.status || "";

  if (name) list = list.filter((c) => c.category_name.toLowerCase().includes(name));
  if (code) list = list.filter((c) => c.category_code?.toLowerCase().includes(code));
  if (status) list = list.filter((c) => c.status === status);

  // Sort newest first
  list = [...list].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const total = list.length;

  // Paginate
  const page = Math.max(1, parseInt(params.page) || 1);
  const limit = Math.max(1, parseInt(params.limit) || 10);
  const start = (page - 1) * limit;
  const paged = list.slice(start, start + limit);

  return { data: paged, count: total };
}

/**
 * GET /categories/:id
 */
export async function dbGetById(id) {
  await delay(200, 400);
  const list = readAll();
  const record = list.find((c) => c.id === Number(id));
  if (!record) throw { status: 404, message: `Category #${id} not found.` };
  return { data: record };
}

/**
 * POST /categories
 */
export async function dbCreate(data) {
  await delay(400, 800);
  validate(data);

  const list = readAll();
  const newRecord = {
    id: nextId(list),
    category_code: (data.category_code || "").trim() || null,
    category_name: data.category_name.trim(),
    description: (data.description || "").trim() || null,
    status: data.status || "Active",
    created_at: new Date().toISOString(),
  };

  list.unshift(newRecord);
  writeAll(list);
  return { data: newRecord };
}

/**
 * PUT /categories/:id
 */
export async function dbUpdate(id, data) {
  await delay(400, 700);
  validate(data, Number(id));

  const list = readAll();
  const idx = list.findIndex((c) => c.id === Number(id));
  if (idx === -1) throw { status: 404, message: `Category #${id} not found.` };

  const updated = {
    ...list[idx],
    category_code: (data.category_code || "").trim() || null,
    category_name: data.category_name.trim(),
    description: (data.description || "").trim() || null,
    status: data.status || list[idx].status,
    updated_at: new Date().toISOString(),
  };

  list[idx] = updated;
  writeAll(list);
  return { data: updated };
}

/**
 * DELETE /categories/:id
 */
export async function dbDelete(id) {
  await delay(300, 600);
  const list = readAll();
  const idx = list.findIndex((c) => c.id === Number(id));
  if (idx === -1) throw { status: 404, message: `Category #${id} not found.` };

  list.splice(idx, 1);
  writeAll(list);
  return { data: { id: Number(id), deleted: true } };
}

/** Wipe and re-seed (useful for dev/testing) */
export function dbReset() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_DATA));
}
