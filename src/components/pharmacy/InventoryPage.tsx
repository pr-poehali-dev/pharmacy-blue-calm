import { useState } from "react";
import { PRODUCTS } from "./data";
import Icon from "@/components/ui/icon";

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Все");

  const categories = ["Все", ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

  const filtered = PRODUCTS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "Все" || p.category === category;
    return matchSearch && matchCat;
  });

  const isExpiringSoon = (expiry: string) => {
    const d = new Date(expiry);
    const diff = (d.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    return diff < 30;
  };

  const isLowStock = (p: typeof PRODUCTS[0]) => p.quantity <= p.minQuantity;

  return (
    <div className="animate-fade-in space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold" style={{ color: "hsl(213,50%,12%)" }}>
          Учёт товаров
        </h1>
        <span className="text-sm" style={{ color: "hsl(215,20%,55%)" }}>
          Найдено: {filtered.length} позиций
        </span>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 border border-border flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-52">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Поиск по названию..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border text-sm outline-none"
            style={{ borderColor: "hsl(214,30%,85%)", background: "hsl(210,30%,98%)" }}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={
                category === cat
                  ? { background: "hsl(210,65%,22%)", color: "#fff" }
                  : { background: "hsl(210,30%,92%)", color: "hsl(213,50%,20%)" }
              }
            >
              {cat}
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
                <th className="text-left px-5 py-3 font-semibold text-xs tracking-wider">Наименование</th>
                <th className="text-left px-4 py-3 font-semibold text-xs tracking-wider">Категория</th>
                <th className="text-right px-4 py-3 font-semibold text-xs tracking-wider">Кол-во</th>
                <th className="text-right px-4 py-3 font-semibold text-xs tracking-wider">Мин.</th>
                <th className="text-right px-4 py-3 font-semibold text-xs tracking-wider">Цена, ₽</th>
                <th className="text-left px-4 py-3 font-semibold text-xs tracking-wider">Срок годн.</th>
                <th className="text-left px-4 py-3 font-semibold text-xs tracking-wider">Поставщик</th>
                <th className="text-center px-4 py-3 font-semibold text-xs tracking-wider">Статус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((p, i) => {
                const expiring = isExpiringSoon(p.expiry);
                const lowStock = isLowStock(p);
                return (
                  <tr
                    key={p.id}
                    className="table-row-hover"
                    style={{ animationDelay: `${i * 0.03}s` }}
                  >
                    <td className="px-5 py-3 font-medium" style={{ color: "hsl(213,50%,12%)" }}>
                      {p.name}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                    <td className="px-4 py-3 text-right font-semibold" style={{ color: lowStock ? "hsl(4,80%,50%)" : "hsl(213,50%,12%)" }}>
                      {p.quantity} {p.unit}
                    </td>
                    <td className="px-4 py-3 text-right text-muted-foreground">{p.minQuantity}</td>
                    <td className="px-4 py-3 text-right font-medium" style={{ color: "hsl(213,50%,20%)" }}>
                      {p.price}
                    </td>
                    <td className="px-4 py-3" style={{ color: expiring ? "hsl(4,80%,50%)" : "hsl(213,50%,30%)" }}>
                      {new Date(p.expiry).toLocaleDateString("ru-RU")}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{p.supplier}</td>
                    <td className="px-4 py-3 text-center">
                      {expiring && (
                        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium mr-1" style={{ background: "hsl(4,80%,94%)", color: "hsl(4,80%,45%)" }}>
                          Срок!
                        </span>
                      )}
                      {lowStock && (
                        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: "hsl(38,90%,93%)", color: "hsl(38,80%,35%)" }}>
                          Мало
                        </span>
                      )}
                      {!expiring && !lowStock && (
                        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: "hsl(145,60%,92%)", color: "hsl(145,60%,32%)" }}>
                          ОК
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
