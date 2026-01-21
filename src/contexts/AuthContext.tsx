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
}

interface AuthContextType {
  user: User | null;
  login: (registrationId: string) => Promise<boolean>;
  register: (hospitalName: string, doctorName: string, registrationId: string) => Promise<boolean>;
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
    registrationId: string
  ): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Get registered users from localStorage
    const users = JSON.parse(localStorage.getItem("heartfl-users") || "[]") as StoredUser[];
    const foundUser = users.find(
      (u) => u.registrationId === registrationId
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
    registrationId: string
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

    // Register new hospital user - store only ID
    const newUser: StoredUser = {
      id: registrationId,
      hospitalName,
      doctorName,
      registrationId,
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
