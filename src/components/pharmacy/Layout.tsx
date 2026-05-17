import { PageType, User } from "@/pages/Index";
import Icon from "@/components/ui/icon";

interface NavItem {
  id: PageType;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Главная", icon: "LayoutDashboard" },
  { id: "inventory", label: "Учёт товаров", icon: "Package" },
  { id: "critical", label: "Критические остатки", icon: "AlertTriangle" },
  { id: "edit", label: "Редактирование товаров", icon: "FilePen" },
  { id: "orders", label: "История заказов", icon: "ClipboardList" },
];

interface Props {
  user: User;
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export default function Layout({ user, currentPage, onNavigate, onLogout, children }: Props) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "hsl(210,33%,96%)" }}>
      {/* Header */}
      <header style={{ background: "hsl(210,65%,16%)" }} className="shadow-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">💊</span>
            <div>
              <div className="text-white font-bold text-lg leading-tight tracking-tight">Аптека+</div>
              <div className="text-xs leading-tight" style={{ color: "hsl(210,40%,65%)" }}>Умный учёт лекарств</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: "hsl(210,55%,24%)" }}>
              <Icon name="UserCircle" size={18} className="text-white opacity-80" />
              <span className="text-sm font-medium text-white">
                {user.role} {user.name}
              </span>
            </div>
            <button
              onClick={onLogout}
              className="px-4 py-2 rounded-xl text-sm font-medium text-white border transition-colors hover:bg-white/10"
              style={{ borderColor: "hsl(210,40%,40%)" }}
            >
              Выйти
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-1 h-11">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPage === item.id
                    ? "text-foreground"
                    : "text-foreground/55 hover:text-foreground/80"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-5 text-center" style={{ color: "hsl(215,20%,55%)", fontSize: "0.8rem" }}>
        Аптека+ — система учёта товаров&nbsp;&nbsp;|&nbsp;&nbsp;Учебный проект
      </footer>
    </div>
  );
}
