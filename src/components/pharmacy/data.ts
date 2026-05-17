export interface Product {
  id: number;
  name: string;
  category: string;
  quantity: number;
  minQuantity: number;
  price: number;
  expiry: string;
  supplier: string;
  unit: string;
}

export const PRODUCTS: Product[] = [
  { id: 1, name: "Аспирин 500мг", category: "Анальгетики", quantity: 240, minQuantity: 50, price: 89, expiry: "2026-12-01", supplier: "Байер", unit: "таб." },
  { id: 2, name: "Амоксициллин 500мг", category: "Антибиотики", quantity: 18, minQuantity: 30, price: 215, expiry: "2026-06-10", supplier: "Сандоз", unit: "капс." },
  { id: 3, name: "Нурофен 200мг", category: "Анальгетики", quantity: 130, minQuantity: 40, price: 178, expiry: "2027-03-15", supplier: "Рекитт", unit: "таб." },
  { id: 4, name: "Эналаприл 10мг", category: "Кардиология", quantity: 5, minQuantity: 25, price: 62, expiry: "2026-05-28", supplier: "Тева", unit: "таб." },
  { id: 5, name: "Лоратадин 10мг", category: "Антигистамины", quantity: 76, minQuantity: 20, price: 95, expiry: "2027-08-20", supplier: "Акрихин", unit: "таб." },
  { id: 6, name: "Метформин 850мг", category: "Диабетология", quantity: 9, minQuantity: 30, price: 143, expiry: "2026-06-05", supplier: "Озон", unit: "таб." },
  { id: 7, name: "Омепразол 20мг", category: "Гастроэнтерология", quantity: 88, minQuantity: 25, price: 127, expiry: "2027-01-10", supplier: "Хемофарм", unit: "капс." },
  { id: 8, name: "Валерианы экстракт", category: "Седативные", quantity: 200, minQuantity: 30, price: 54, expiry: "2028-05-01", supplier: "Фармстандарт", unit: "таб." },
  { id: 9, name: "Цитрамон П", category: "Анальгетики", quantity: 14, minQuantity: 40, price: 45, expiry: "2026-05-20", supplier: "Дальхимфарм", unit: "таб." },
  { id: 10, name: "Бисопролол 5мг", category: "Кардиология", quantity: 42, minQuantity: 20, price: 188, expiry: "2027-09-30", supplier: "Сандоз", unit: "таб." },
  { id: 11, name: "Клотримазол крем", category: "Дерматология", quantity: 22, minQuantity: 15, price: 112, expiry: "2026-11-01", supplier: "Хемофарм", unit: "туба" },
  { id: 12, name: "Атенолол 50мг", category: "Кардиология", quantity: 3, minQuantity: 20, price: 76, expiry: "2026-05-25", supplier: "Тева", unit: "таб." },
  { id: 13, name: "Но-шпа 40мг", category: "Спазмолитики", quantity: 156, minQuantity: 30, price: 198, expiry: "2027-06-15", supplier: "Хиноин", unit: "таб." },
  { id: 14, name: "Мирамистин 0.01%", category: "Антисептики", quantity: 11, minQuantity: 20, price: 345, expiry: "2026-06-01", supplier: "Инфамед", unit: "фл." },
  { id: 15, name: "Панкреатин 25ЕД", category: "Гастроэнтерология", quantity: 67, minQuantity: 25, price: 89, expiry: "2027-04-20", supplier: "Акрихин", unit: "таб." },
];

export interface Order {
  id: number;
  date: string;
  product: string;
  quantity: number;
  action: "поступление" | "списание" | "продажа" | "возврат";
  operator: string;
  note: string;
}

export const ORDERS: Order[] = [
  { id: 1, date: "14.05.2026 10:22", product: "Аспирин 500мг", quantity: 100, action: "поступление", operator: "Иванова", note: "Плановая поставка" },
  { id: 2, date: "13.05.2026 15:40", product: "Нурофен 200мг", quantity: 3, action: "продажа", operator: "Петрова", note: "" },
  { id: 3, date: "12.05.2026 09:15", product: "Эналаприл 10мг", quantity: 50, action: "поступление", operator: "Иванова", note: "Экстренный заказ" },
  { id: 4, date: "12.05.2026 11:00", product: "Цитрамон П", quantity: 10, action: "списание", operator: "Иванова", note: "Истёк срок годности" },
  { id: 5, date: "11.05.2026 16:30", product: "Амоксициллин 500мг", quantity: 5, action: "продажа", operator: "Сидорова", note: "" },
  { id: 6, date: "10.05.2026 14:00", product: "Метформин 850мг", quantity: 30, action: "поступление", operator: "Иванова", note: "Плановая поставка" },
  { id: 7, date: "09.05.2026 10:45", product: "Лоратадин 10мг", quantity: 2, action: "возврат", operator: "Петрова", note: "Брак упаковки" },
  { id: 8, date: "08.05.2026 12:20", product: "Омепразол 20мг", quantity: 7, action: "продажа", operator: "Сидорова", note: "" },
];

export const ACTION_COLORS: Record<string, string> = {
  "поступление": "hsl(145,60%,35%)",
  "списание": "hsl(4,80%,55%)",
  "продажа": "hsl(196,80%,40%)",
  "возврат": "hsl(38,90%,50%)",
};
