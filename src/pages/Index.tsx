import { useState } from "react";
import LoginPage from "@/components/pharmacy/LoginPage";
import Layout from "@/components/pharmacy/Layout";
import Dashboard from "@/components/pharmacy/Dashboard";
import InventoryPage from "@/components/pharmacy/InventoryPage";
import CriticalStocksPage from "@/components/pharmacy/CriticalStocksPage";
import EditProductsPage from "@/components/pharmacy/EditProductsPage";
import OrderHistoryPage from "@/components/pharmacy/OrderHistoryPage";

export type PageType = "dashboard" | "inventory" | "critical" | "edit" | "orders";

export interface User {
  name: string;
  role: string;
}

const MOCK_USER: User = { name: "Иванова", role: "Провизор" };

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard");

  const handleLogin = (login: string) => {
    setUser({ ...MOCK_USER, name: login || MOCK_USER.name });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setCurrentPage("dashboard");
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Layout user={user!} currentPage={currentPage} onNavigate={setCurrentPage} onLogout={handleLogout}>
      {currentPage === "dashboard" && <Dashboard onNavigate={setCurrentPage} />}
      {currentPage === "inventory" && <InventoryPage />}
      {currentPage === "critical" && <CriticalStocksPage />}
      {currentPage === "edit" && <EditProductsPage />}
      {currentPage === "orders" && <OrderHistoryPage />}
    </Layout>
  );
}
