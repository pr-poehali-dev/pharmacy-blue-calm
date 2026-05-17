import { useState } from "react";
import { PRODUCTS, Product } from "./data";
import Icon from "@/components/ui/icon";

export default function EditProductsPage() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [editing, setEditing] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState(false);

  const emptyProduct: Omit<Product, "id"> = {
    name: "", category: "", quantity: 0, minQuantity: 0,
    price: 0, expiry: "", supplier: "", unit: "таб."
  };
  const [form, setForm] = useState<Omit<Product, "id">>(emptyProduct);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const startEdit = (p: Product) => {
    setEditing(p);
    setForm({ ...p });
    setIsAdding(false);
  };

  const startAdd = () => {
    setIsAdding(true);
    setEditing(null);
    setForm(emptyProduct);
  };

  const handleSave = () => {
    if (editing) {
      setProducts(prev => prev.map(p => p.id === editing.id ? { ...form, id: editing.id } : p));
    } else {
      const newId = Math.max(...products.map(p => p.id)) + 1;
      setProducts(prev => [...prev, { ...form, id: newId }]);
    }
    setEditing(null);
    setIsAdding(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDelete = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    if (editing?.id === id) setEditing(null);
  };

  const showForm = editing !== null || isAdding;

  return (
    <div className="animate-fade-in space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold" style={{ color: "hsl(213,50%,12%)" }}>Редактирование товаров</h1>
        <button
          onClick={startAdd}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ background: "hsl(210,65%,22%)" }}
        >
          <Icon name="Plus" size={16} />
          Добавить товар
        </button>
      </div>

      {saved && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium animate-fade-in" style={{ background: "hsl(145,60%,92%)", color: "hsl(145,60%,28%)" }}>
          <Icon name="CheckCircle2" size={16} />
          Изменения сохранены
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-border p-6 animate-scale-in">
          <h2 className="font-semibold mb-4" style={{ color: "hsl(213,50%,12%)" }}>
            {isAdding ? "Новый товар" : `Редактирование: ${editing?.name}`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { key: "name", label: "Наименование", type: "text" },
              { key: "category", label: "Категория", type: "text" },
              { key: "supplier", label: "Поставщик", type: "text" },
              { key: "unit", label: "Единица", type: "text" },
              { key: "quantity", label: "Количество", type: "number" },
              { key: "minQuantity", label: "Минимум", type: "number" },
              { key: "price", label: "Цена, ₽", type: "number" },
              { key: "expiry", label: "Срок годности", type: "date" },
            ].map(field => (
              <div key={field.key}>
                <label className="block text-xs font-medium mb-1.5 text-muted-foreground">{field.label}</label>
                <input
                  type={field.type}
                  value={String((form as Record<string, unknown>)[field.key] ?? "")}
                  onChange={e => setForm(prev => ({ ...prev, [field.key]: field.type === "number" ? Number(e.target.value) : e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border text-sm outline-none focus:ring-2 transition-all"
                  style={{ borderColor: "hsl(214,30%,85%)", background: "hsl(210,30%,98%)" }}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-5">
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "hsl(210,65%,22%)" }}
            >
              Сохранить
            </button>
            <button
              onClick={() => { setEditing(null); setIsAdding(false); }}
              className="px-5 py-2 rounded-xl text-sm font-medium transition-all hover:bg-muted"
              style={{ color: "hsl(215,20%,48%)" }}
            >
              Отмена
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="relative max-w-xs">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border text-sm outline-none"
              style={{ borderColor: "hsl(214,30%,85%)", background: "hsl(210,30%,98%)" }}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "hsl(210,65%,16%)", color: "hsl(210,40%,85%)" }}>
                <th className="text-left px-5 py-3 font-semibold text-xs tracking-wider">Наименование</th>
                <th className="text-left px-4 py-3 font-semibold text-xs tracking-wider">Категория</th>
                <th className="text-right px-4 py-3 font-semibold text-xs tracking-wider">Кол-во</th>
                <th className="text-right px-4 py-3 font-semibold text-xs tracking-wider">Цена, ₽</th>
                <th className="text-left px-4 py-3 font-semibold text-xs tracking-wider">Поставщик</th>
                <th className="text-center px-4 py-3 font-semibold text-xs tracking-wider">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(p => (
                <tr
                  key={p.id}
                  className="table-row-hover"
                  style={editing?.id === p.id ? { background: "hsl(210,40%,97%)" } : {}}
                >
                  <td className="px-5 py-3 font-medium" style={{ color: "hsl(213,50%,12%)" }}>{p.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                  <td className="px-4 py-3 text-right">{p.quantity} {p.unit}</td>
                  <td className="px-4 py-3 text-right">{p.price}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.supplier}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => startEdit(p)}
                        className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                        title="Редактировать"
                      >
                        <Icon name="Pencil" size={14} className="text-muted-foreground" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                        title="Удалить"
                      >
                        <Icon name="Trash2" size={14} className="text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
