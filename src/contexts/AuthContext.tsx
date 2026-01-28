import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  registrationId: string;
}

interface StoredUser {
  id: string;
  hospitalName: string;
  doctorName: string;
  registrationId: string;
  password: string; // Note: In production, passwords should be hashed before storage
}

interface AuthContextType {
  user: User | null;
  login: (registrationId: string, password: string) => Promise<boolean>;
  register: (hospitalName: string, doctorName: string, registrationId: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  getUserDetails: () => { doctorName: string; hospitalName: string } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("heartfl-user");
    if (!saved) {
      return null;
    }
    const parsed = JSON.parse(saved) as Partial<User>;
    if (!parsed.id || !parsed.registrationId) {
      return null;
    }
    return {
      id: parsed.id,
      registrationId: parsed.registrationId,
    };
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = async (
    registrationId: string,
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Get registered users from localStorage
    const users = JSON.parse(localStorage.getItem("heartfl-users") || "[]") as StoredUser[];
    const foundUser = users.find(
      (u) => u.registrationId === registrationId && u.password === password
    );

    if (foundUser) {
      const loggedInUser = {
        id: foundUser.id,
        registrationId: foundUser.registrationId,
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
    hospitalName: string,
    doctorName: string,
    registrationId: string,
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const users = JSON.parse(localStorage.getItem("heartfl-users") || "[]") as StoredUser[];
    
    // Check if registration ID already exists
    if (users.some((u) => u.registrationId === registrationId)) {
      setIsLoading(false);
      return false;
    }

    // Register new hospital user - store with password
    const newUser: StoredUser = {
      id: crypto.randomUUID(),
      hospitalName,
      doctorName,
      registrationId,
      password,
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

  // Get full user details from localStorage (excluding password for security)
  const getUserDetails = (): { doctorName: string; hospitalName: string } | null => {
    if (!user) return null;
    const users = JSON.parse(localStorage.getItem("heartfl-users") || "[]") as StoredUser[];
    const foundUser = users.find((u) => u.id === user.id);
    if (!foundUser) return null;
    // Return only necessary fields, excluding password for security
    return {
      doctorName: foundUser.doctorName,
      hospitalName: foundUser.hospitalName,
    };
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, getUserDetails }}>
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
