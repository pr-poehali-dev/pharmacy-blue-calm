import { useState } from "react";
import { ORDERS, ACTION_COLORS } from "./data";
import Icon from "@/components/ui/icon";

const ACTION_LABELS = ["Все", "поступление", "продажа", "списание", "возврат"];

export default function OrderHistoryPage() {
  const [filter, setFilter] = useState("Все");
  const [search, setSearch] = useState("");

  const filtered = ORDERS.filter(o => {
    const matchFilter = filter === "Все" || o.action === filter;
    const matchSearch = o.product.toLowerCase().includes(search.toLowerCase()) ||
      o.operator.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const totals = {
    поступление: ORDERS.filter(o => o.action === "поступление").length,
    продажа: ORDERS.filter(o => o.action === "продажа").length,
    списание: ORDERS.filter(o => o.action === "списание").length,
    возврат: ORDERS.filter(o => o.action === "возврат").length,
  };

  return (
    <div className="animate-fade-in space-y-5">
      <h1 className="text-xl font-bold" style={{ color: "hsl(213,50%,12%)" }}>История заказов</h1>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Поступления", count: totals["поступление"], color: "hsl(145,60%,35%)", bg: "hsl(145,60%,94%)", icon: "TrendingUp" },
          { label: "Продажи", count: totals["продажа"], color: "hsl(196,80%,40%)", bg: "hsl(196,80%,94%)", icon: "ShoppingCart" },
          { label: "Списания", count: totals["списание"], color: "hsl(4,80%,55%)", bg: "hsl(4,80%,95%)", icon: "Trash2" },
          { label: "Возвраты", count: totals["возврат"], color: "hsl(38,90%,45%)", bg: "hsl(38,90%,94%)", icon: "RotateCcw" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-border flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: s.bg }}>
              <Icon name={s.icon as "TrendingUp"} size={18} style={{ color: s.color }} />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
              <div className="text-xl font-bold" style={{ color: s.color }}>{s.count}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 border border-border flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-48">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Поиск по товару или оператору..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border text-sm outline-none"
            style={{ borderColor: "hsl(214,30%,85%)", background: "hsl(210,30%,98%)" }}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {ACTION_LABELS.map(a => (
            <button
              key={a}
              onClick={() => setFilter(a)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize"
              style={
                filter === a
                  ? { background: "hsl(210,65%,22%)", color: "#fff" }
                  : { background: "hsl(210,30%,92%)", color: "hsl(213,50%,20%)" }
              }
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "hsl(210,65%,16%)", color: "hsl(210,40%,85%)" }}>
                <th className="text-left px-5 py-3 font-semibold text-xs tracking-wider">Дата и время</th>
                <th className="text-left px-4 py-3 font-semibold text-xs tracking-wider">Товар</th>
                <th className="text-right px-4 py-3 font-semibold text-xs tracking-wider">Кол-во</th>
                <th className="text-center px-4 py-3 font-semibold text-xs tracking-wider">Тип операции</th>
                <th className="text-left px-4 py-3 font-semibold text-xs tracking-wider">Оператор</th>
                <th className="text-left px-4 py-3 font-semibold text-xs tracking-wider">Примечание</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((o, i) => (
                <tr key={o.id} className="table-row-hover" style={{ animationDelay: `${i * 0.03}s` }}>
                  <td className="px-5 py-3 text-muted-foreground font-mono text-xs">{o.date}</td>
                  <td className="px-4 py-3 font-medium" style={{ color: "hsl(213,50%,12%)" }}>{o.product}</td>
                  <td className="px-4 py-3 text-right font-semibold">{o.quantity}</td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold capitalize"
                      style={{
                        background: ACTION_COLORS[o.action] + "22",
                        color: ACTION_COLORS[o.action],
                      }}
                    >
                      {o.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{o.operator}</td>
                  <td className="px-4 py-3 text-muted-foreground italic text-xs">{o.note || "—"}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-muted-foreground">
                    Записей не найдено
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
