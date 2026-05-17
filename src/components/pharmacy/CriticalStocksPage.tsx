import { PRODUCTS } from "./data";
import Icon from "@/components/ui/icon";

export default function CriticalStocksPage() {
  const today = new Date();

  const expiringSoon = PRODUCTS.filter(p => {
    const d = new Date(p.expiry);
    const diff = (d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
    return diff < 30;
  }).sort((a, b) => new Date(a.expiry).getTime() - new Date(b.expiry).getTime());

  const lowStock = PRODUCTS.filter(p => p.quantity <= p.minQuantity);

  const getDaysLeft = (expiry: string) => {
    const d = new Date(expiry);
    return Math.ceil((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="animate-fade-in space-y-6">
      <h1 className="text-xl font-bold" style={{ color: "hsl(213,50%,12%)" }}>
        Критические остатки
      </h1>

      {/* Expiring soon */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="px-5 py-4 flex items-center gap-2 border-b" style={{ borderColor: "hsl(214,30%,88%)" }}>
          <span className="text-lg">⚠️</span>
          <h2 className="font-semibold" style={{ color: "hsl(213,50%,12%)" }}>
            Истекает срок годности (менее 30 дней) — {expiringSoon.length} позиций
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "hsl(38,90%,96%)" }}>
                <th className="text-left px-5 py-3 font-semibold text-xs tracking-wider text-foreground/60">Наименование</th>
                <th className="text-left px-4 py-3 font-semibold text-xs tracking-wider text-foreground/60">Категория</th>
                <th className="text-right px-4 py-3 font-semibold text-xs tracking-wider text-foreground/60">Кол-во</th>
                <th className="text-left px-4 py-3 font-semibold text-xs tracking-wider text-foreground/60">Срок годн.</th>
                <th className="text-center px-4 py-3 font-semibold text-xs tracking-wider text-foreground/60">Осталось дней</th>
                <th className="text-left px-4 py-3 font-semibold text-xs tracking-wider text-foreground/60">Поставщик</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {expiringSoon.map(p => {
                const days = getDaysLeft(p.expiry);
                return (
                  <tr key={p.id} className="table-row-hover">
                    <td className="px-5 py-3 font-medium" style={{ color: "hsl(213,50%,12%)" }}>{p.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                    <td className="px-4 py-3 text-right font-semibold">{p.quantity} {p.unit}</td>
                    <td className="px-4 py-3 font-medium" style={{ color: "hsl(4,80%,50%)" }}>
                      {new Date(p.expiry).toLocaleDateString("ru-RU")}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className="inline-block px-3 py-1 rounded-full text-xs font-bold"
                        style={
                          days <= 7
                            ? { background: "hsl(4,80%,94%)", color: "hsl(4,80%,40%)" }
                            : { background: "hsl(38,90%,93%)", color: "hsl(38,70%,35%)" }
                        }
                      >
                        {days <= 0 ? "ПРОСРОЧЕН" : `${days} дн.`}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{p.supplier}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Low stock */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="px-5 py-4 flex items-center gap-2 border-b" style={{ borderColor: "hsl(214,30%,88%)" }}>
          <Icon name="TrendingDown" size={18} className="text-red-500" />
          <h2 className="font-semibold" style={{ color: "hsl(213,50%,12%)" }}>
            Низкий запас (ниже минимума) — {lowStock.length} позиций
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "hsl(4,80%,97%)" }}>
                <th className="text-left px-5 py-3 font-semibold text-xs tracking-wider text-foreground/60">Наименование</th>
                <th className="text-left px-4 py-3 font-semibold text-xs tracking-wider text-foreground/60">Категория</th>
                <th className="text-right px-4 py-3 font-semibold text-xs tracking-wider text-foreground/60">Остаток</th>
                <th className="text-right px-4 py-3 font-semibold text-xs tracking-wider text-foreground/60">Минимум</th>
                <th className="text-right px-4 py-3 font-semibold text-xs tracking-wider text-foreground/60">Дефицит</th>
                <th className="text-left px-4 py-3 font-semibold text-xs tracking-wider text-foreground/60">Поставщик</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {lowStock.map(p => (
                <tr key={p.id} className="table-row-hover">
                  <td className="px-5 py-3 font-medium" style={{ color: "hsl(213,50%,12%)" }}>{p.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                  <td className="px-4 py-3 text-right font-bold" style={{ color: "hsl(4,80%,50%)" }}>
                    {p.quantity} {p.unit}
                  </td>
                  <td className="px-4 py-3 text-right text-muted-foreground">{p.minQuantity}</td>
                  <td className="px-4 py-3 text-right font-semibold" style={{ color: "hsl(38,80%,38%)" }}>
                    -{p.minQuantity - p.quantity} {p.unit}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{p.supplier}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
