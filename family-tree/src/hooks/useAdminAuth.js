import { createContext, useContext, useState } from "react";

const AdminAuthContext = createContext(null);

const STORAGE_KEY = "therampu_admin_session";
const ADMIN_ID = "Admin";
const ADMIN_PASSWORD = "Ther@mpu#321";

export function AdminAuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  });

  const login = (id, password) => {
    if (id === ADMIN_ID && password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      try {
        sessionStorage.setItem(STORAGE_KEY, "true");
      } catch {
        // sessionStorage unavailable (private mode etc.) — stay logged in for this render tree only
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <AdminAuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
