import React from "react";
import type { LeadRow, LeadsResponse } from "../types/leads";

/** Format ISO timestamp from sheet to local human-readable */
function toLocal(dt?: string) {
  if (!dt) return "";
  try {
    return new Date(dt).toLocaleString();
  } catch {
    return String(dt);
  }
}

/** Get the first non-empty value among possible header names */
const pick = (obj: any, ...names: string[]) => {
  for (const n of names) {
    const v = obj?.[n];
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return "";
};

/** Normalize one raw sheet row (keys come from the header row) to our LeadRow shape */
const normalize = (r: any): LeadRow => ({
  timestamp: pick(r, "timestamp", "Timestamp", "Time", "Created At"),
  firstName: pick(r, "firstName", "First Name", "First"),
  lastName:  pick(r, "lastName",  "Last Name",  "Last"),
  phone:     pick(r, "phone",     "Phone", "Phone Number"),
  email:     pick(r, "email",     "Email"),
  startDate: pick(r, "startDate", "Preferred Start Date", "Start Date", "Start"),
  city:      pick(r, "city",      "City"),
  goals:     pick(r, "goals",     "Goals", "Message", "Notes", "Description"),
  consent:   pick(r, "consent",   "Consent"),
});

export default function LeadsTable() {
  const [rows, setRows] = React.useState<LeadRow[]>([]);
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [q, setQ] = React.useState("");

  const fetchPage = React.useCallback(
    async (p = page, ps = pageSize) => {
      try {
        setLoading(true);
        setError(null);
        const r = await fetch(`/api/leads?page=${p}&pageSize=${ps}`);
        const json: LeadsResponse = await r.json();
        if (!json.ok) throw new Error(json.error || "Failed to load");
        setRows((json.rows || []).map(normalize));
        setTotal(json.total || 0);
        setPage(p);
        setPageSize(ps);
      } catch (e: any) {
        setError(e?.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    },
    [page, pageSize]
  );

  React.useEffect(() => {
    fetchPage(1, pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // initial load

  const filtered = React.useMemo(() => {
    if (!q) return rows;
    const needle = q.toLowerCase();
    return rows.filter((r) =>
      [r.firstName, r.lastName, r.email, r.phone, r.city, r.goals]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(needle))
    );
  }, [rows, q]);

  const canPrev = page > 1;
  const canNext = page * pageSize < total;

  const exportCSV = () => {
    const header = [
      "timestamp",
      "firstName",
      "lastName",
      "phone",
      "email",
      "startDate",
      "city",
      "goals",
      "consent",
    ];
    const lines = [header.join(",")].concat(
      filtered.map((r) =>
        header
          .map((h) => {
            const cell = (r as any)[h] ?? "";
            const safe = String(cell).replace(/"/g, '""');
            return `"${safe}"`;
          })
          .join(",")
      )
    );
    const blob = new Blob([lines.join("\n")], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads_page${page}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-xl font-semibold">Leads</h1>
        <div className="flex gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, email, city…"
            className="w-64 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none"
          />
          <button onClick={exportCSV} className="rounded-md border px-3 py-2 text-sm">
            Export CSV
          </button>
        </div>
      </div>

      <div className="mb-3 text-sm text-gray-600">
        {loading ? "Loading…" : `Total: ${total} (showing ${filtered.length} on this page)`}
        {error ? <span className="ml-2 text-red-600">• {error}</span> : null}
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-[900px] w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left">Time</th>
              <th className="px-3 py-2 text-left">First</th>
              <th className="px-3 py-2 text-left">Last</th>
              <th className="px-3 py-2 text-left">Phone</th>
              <th className="px-3 py-2 text-left">Email</th>
              <th className="px-3 py-2 text-left">Start</th>
              <th className="px-3 py-2 text-left">City</th>
              <th className="px-3 py-2 text-left">Goals</th>
              <th className="px-3 py-2 text-left">Consent</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && !loading ? (
              <tr>
                <td className="px-3 py-6 text-center text-gray-500" colSpan={9}>
                  No rows
                </td>
              </tr>
            ) : (
              filtered.map((r, i) => (
                <tr key={i} className="border-t">
                  <td className="px-3 py-2">{toLocal(r.timestamp)}</td>
                  <td className="px-3 py-2">{r.firstName || "—"}</td>
                  <td className="px-3 py-2">{r.lastName || "—"}</td>
                  <td className="px-3 py-2">
                    {r.phone ? (
                      <a href={`tel:${r.phone}`} className="underline">
                        {r.phone}
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-3 py-2">
                    {r.email ? (
                      <a href={`mailto:${r.email}`} className="underline">
                        {r.email}
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-3 py-2">{r.startDate || "—"}</td>
                  <td className="px-3 py-2">{r.city || "—"}</td>
                  <td className="px-3 py-2 max-w-[320px]">
                    <span title={r.goals}>
                      {String(r.goals || "").slice(0, 100)}
                      {String(r.goals || "").length > 100 ? "…" : ""}
                    </span>
                  </td>
                  <td className="px-3 py-2">{r.consent || "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={() => fetchPage(page - 1, pageSize)}
          disabled={!canPrev || loading}
          className="rounded-md border px-3 py-2 text-sm disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm">Page {page}</span>
        <button
          onClick={() => fetchPage(page + 1, pageSize)}
          disabled={!canNext || loading}
          className="rounded-md border px-3 py-2 text-sm disabled:opacity-50"
        >
          Next
        </button>
        <select
          value={pageSize}
          onChange={(e) => fetchPage(1, Number(e.target.value))}
          className="ml-2 rounded-md border px-2 py-2 text-sm"
        >
          {[10, 25, 50, 100].map((n) => (
            <option key={n} value={n}>
              {n}/page
            </option>
          ))}
        </select>
        <button
          onClick={() => fetchPage(page, pageSize)}
          disabled={loading}
          className="ml-auto rounded-md border px-3 py-2 text-sm disabled:opacity-50"
        >
          Refresh
        </button>
      </div>
    </div>
  );
}
