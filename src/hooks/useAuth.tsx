
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

type User = {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // Mock login for now - would connect to backend API in production
      if (email === "admin@sajuma.com" && password === "password") {
        const user = {
          id: "1",
          email: "admin@sajuma.com",
          name: "Admin User",
          role: "admin" as const
        };
        
        setUser(user);
        localStorage.setItem("sajumaUser", JSON.stringify(user));
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
      } else if (email && password) {
        // Demo user login
        const user = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          name: email.split('@')[0],
          role: "user" as const
        };
        
        setUser(user);
        localStorage.setItem("sajumaUser", JSON.stringify(user));
        toast({
          title: "Welcome to Sajuma Market!",
          description: "You have successfully logged in.",
        });
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please check your credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      // Mock registration for now - would connect to backend API in production
      if (email && password && name) {
        const user = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          name,
          role: "user" as const
        };
        
        setUser(user);
        localStorage.setItem("sajumaUser", JSON.stringify(user));
        toast({
          title: "Registration successful!",
          description: "Welcome to Sajuma Market.",
        });
      } else {
        throw new Error("Please provide all required information");
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Please check your information",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("sajumaUser");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  // Check for existing user on app load
  useEffect(() => {
    const storedUser = localStorage.getItem("sajumaUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
