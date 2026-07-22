/* ============================================================
   OLYMPUS ELITES — Auth Context
   Manages user login state, role (lambda/bureau), and school
   ============================================================ */
import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "lambda" | "bureau";

export interface User {
  id: string;
  email: string;
  name: string;
  school: string;
  role: UserRole;
  bureauCode?: string; // Only if role === "bureau"
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    name: string;
    school: string;
    role: UserRole;
    bureauCode?: string;
  }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Mock login — in production, call your backend API
  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock validation
    if (!email || !password) {
      throw new Error("Email et mot de passe requis");
    }

    // Mock user data
    setUser({
      id: "user-" + Date.now(),
      email,
      name: email.split("@")[0],
      school: "Lycée Moderne Abidjan",
      role: "lambda",
    });
  };

  // Mock register
  const register = async (data: {
    email: string;
    password: string;
    name: string;
    school: string;
    role: UserRole;
    bureauCode?: string;
  }) => {
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!data.email || !data.password || !data.name || !data.school) {
      throw new Error("Tous les champs sont requis");
    }

    // Validate Bureau code if role is "bureau"
    if (data.role === "bureau") {
      // Mock validation: code must be 6 characters
      if (!data.bureauCode || data.bureauCode.length < 6) {
        throw new Error("Code Bureau des 5 invalide");
      }
      // In production, verify code against database
    }

    setUser({
      id: "user-" + Date.now(),
      email: data.email,
      name: data.name,
      school: data.school,
      role: data.role,
      bureauCode: data.bureauCode,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
