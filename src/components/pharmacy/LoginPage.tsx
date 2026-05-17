import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Props {
  onLogin: (login: string) => void;
}

export default function LoginPage({ onLogin }: Props) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin(login);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "hsl(210,33%,96%)" }}>
      <div className="w-full max-w-md animate-fade-in">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-8 py-7" style={{ background: "hsl(210,65%,16%)" }}>
            <div className="flex items-center gap-3">
              <span className="text-3xl">💊</span>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">Аптека+</h1>
                <p className="text-xs" style={{ color: "hsl(210,40%,70%)" }}>Умный учёт лекарств</p>
              </div>
            </div>
          </div>

          <div className="px-8 py-8">
            <h2 className="text-lg font-semibold mb-1" style={{ color: "hsl(213,50%,12%)" }}>Вход в систему</h2>
            <p className="text-sm mb-6" style={{ color: "hsl(215,20%,48%)" }}>Введите данные вашей учётной записи</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "hsl(213,50%,12%)" }}>
                  Логин
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Icon name="User" size={16} />
                  </span>
                  <input
                    type="text"
                    value={login}
                    onChange={e => setLogin(e.target.value)}
                    placeholder="provizor.ivanova"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 transition-all"
                    style={{
                      borderColor: "hsl(214,30%,85%)",
                      background: "hsl(210,30%,98%)",
                    }}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "hsl(213,50%,12%)" }}>
                  Пароль
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Icon name="Lock" size={16} />
                  </span>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 transition-all"
                    style={{
                      borderColor: "hsl(214,30%,85%)",
                      background: "hsl(210,30%,98%)",
                    }}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-70 mt-2"
                style={{ background: "hsl(210,65%,22%)" }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Icon name="Loader2" size={16} className="animate-spin" />
                    Вход...
                  </span>
                ) : (
                  "Войти"
                )}
              </button>
            </form>

            <p className="text-xs text-center mt-6" style={{ color: "hsl(215,20%,60%)" }}>
              Тестовый вход: любой логин и пароль
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
