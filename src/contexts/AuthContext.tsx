import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "hospital" | "admin";
export const DEFAULT_USER_ROLE: UserRole = "hospital";

interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
}

interface StoredUser {
  id: string;
  username: string;
  email: string;
  password: string;
  role?: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, role: UserRole) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("heartfl-user");
    if (!saved) {
      return null;
    }
    const parsed = JSON.parse(saved) as Partial<User>;
    if (!parsed.id || !parsed.username) {
      return null;
    }
    return {
      id: parsed.id,
      username: parsed.username,
      email: parsed.email ?? "",
      role: parsed.role ?? DEFAULT_USER_ROLE,
    };
  });
  const [isLoading, setIsLoading] = useState(false);

  // Initialize admin account on component mount
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("heartfl-users") || "[]") as StoredUser[];
    const adminExists = users.some((u) => u.username === "admin" && u.role === "admin");
    
    if (!adminExists) {
      const adminUser: StoredUser = {
        id: "admin-account",
        username: "admin",
        email: "admin@heartfl.system",
        password: "admin@123",
        role: "admin",
      };
      users.push(adminUser);
      localStorage.setItem("heartfl-users", JSON.stringify(users));
    }
  }, []);

  const login = async (
    username: string,
    password: string,
    role: UserRole
  ): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Get registered users from localStorage
    const users = JSON.parse(localStorage.getItem("heartfl-users") || "[]") as StoredUser[];
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      const resolvedRole = foundUser.role ?? DEFAULT_USER_ROLE;
      if (resolvedRole !== role) {
        setIsLoading(false);
        return false;
      }
      const loggedInUser = {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
        role: resolvedRole,
      };
      setUser(loggedInUser);
      localStorage.setItem("heartfl-user", JSON.stringify(loggedInUser));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const users = JSON.parse(localStorage.getItem("heartfl-users") || "[]") as StoredUser[];
    
    // Check if user already exists
    if (users.some((u) => u.username === username || u.email === email)) {
      setIsLoading(false);
      return false;
    }

    // Default role for self-registered users is hospital
    const newUser: StoredUser = {
      id: crypto.randomUUID(),
      username,
      email,
      password,
      role: DEFAULT_USER_ROLE,
    };

    users.push(newUser);
    localStorage.setItem("heartfl-users", JSON.stringify(users));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("heartfl-user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
