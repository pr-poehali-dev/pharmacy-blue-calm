import { PageType } from "@/pages/Index";
import Icon from "@/components/ui/icon";

interface Props {
  onNavigate: (page: PageType) => void;
}

const stats = [
  {
    label: "ТОВАРОВ НА СКЛАДЕ",
    value: "392",
    icon: "📦",
    cardClass: "",
    sub: "позиций в ассортименте",
  },
  {
    label: "ИСТЕКАЕТ СРОК (<30 ДНЕЙ)",
    value: "7",
    icon: "⚠️",
    cardClass: "stat-card-warning",
    sub: "требуют внимания",
  },
  {
    label: "ЗАКАЗОВ СЕГОДНЯ",
    value: "0",
    icon: "🛒",
    cardClass: "stat-card-accent",
    sub: "за сегодня",
  },
];

export default function Dashboard({ onNavigate }: Props) {
  return (
    <div className="animate-fade-in space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {stats.map((s, i) => (
          <div
            key={i}
            className={`stat-card ${s.cardClass}`}
            style={{ animationDelay: `${i * 0.07}s` }}
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs font-semibold tracking-widest" style={{ color: "hsl(215,20%,55%)" }}>
                {s.icon}&nbsp; {s.label}
              </span>
            </div>
            <div className="text-5xl font-bold" style={{ color: "hsl(213,50%,12%)" }}>
              {s.value}
            </div>
            <div className="text-xs mt-2" style={{ color: "hsl(215,20%,55%)" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onNavigate("inventory")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
          style={{ background: "hsl(210,65%,22%)" }}
        >
          <Icon name="Package" size={16} />
          Перейти к учёту товаров
        </button>
        <button
          onClick={() => onNavigate("critical")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
          style={{ background: "hsl(210,60%,32%)" }}
        >
          <Icon name="AlertTriangle" size={16} />
          Посмотреть критические остатки
        </button>
        <button
          onClick={() => onNavigate("edit")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
          style={{ background: "hsl(210,20%,78%)", color: "hsl(213,50%,12%)" }}
        >
          <Icon name="FilePen" size={16} />
          Редактировать ассортимент
        </button>
      </div>

      {/* Today summary */}
      <div className="bg-white rounded-2xl p-6 border border-border">
        <h2 className="font-semibold text-base mb-4 flex items-center gap-2" style={{ color: "hsl(213,50%,12%)" }}>
          <Icon name="CalendarDays" size={18} />
          Сводка на сегодня — 17 мая 2026
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "hsl(210,33%,96%)" }}>
            <span className="text-lg">🟢</span>
            <span style={{ color: "hsl(213,50%,15%)" }}>Система работает штатно</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "hsl(38,90%,96%)" }}>
            <span className="text-lg">⚠️</span>
            <span style={{ color: "hsl(213,50%,15%)" }}>7 препаратов требуют списания</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "hsl(210,33%,96%)" }}>
            <span className="text-lg">📋</span>
            <span style={{ color: "hsl(213,50%,15%)" }}>Последний заказ: 14 мая 2026</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "hsl(210,33%,96%)" }}>
            <span className="text-lg">💊</span>
            <span style={{ color: "hsl(213,50%,15%)" }}>12 позиций с низким запасом</span>
          </div>
        </div>
      </div>
    </div>
  );
}
