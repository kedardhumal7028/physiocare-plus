"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface UserSession {
  id?: string; // Patient ID
  name: string;
  email: string;
  phone?: string; // Patient phone
}

export type UserRole = "admin" | "user";

interface AuthContextType {
  user: UserSession | null;
  role: UserRole | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, phone: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const PATIENTS_STORAGE_KEY = "physiocare_patients";
const SESSION_STORAGE_KEY = "physiocare_session";

// Seed initial patients so mock data is immediately testable
const DEFAULT_PATIENTS = [
  {
    id: "pat-1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 555-0123",
    password: "john123"
  },
  {
    id: "pat-2",
    name: "Alice Hill",
    email: "alice@example.com",
    phone: "+1 555-9876",
    password: "alice123"
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Initializing store values
    if (typeof window !== "undefined") {
      // 1. Seed initial patient credentials if none exist
      const existingPatients = localStorage.getItem(PATIENTS_STORAGE_KEY);
      if (!existingPatients) {
        localStorage.setItem(PATIENTS_STORAGE_KEY, JSON.stringify(DEFAULT_PATIENTS));
      }

      // 2. Restore active session
      const storedSession = localStorage.getItem(SESSION_STORAGE_KEY);
      if (storedSession) {
        try {
          const parsed = JSON.parse(storedSession);
          setUser(parsed.user);
          setRole(parsed.role);
        } catch (e) {
          console.error("Failed to parse session", e);
          localStorage.removeItem(SESSION_STORAGE_KEY);
        }
      }
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // First, attempt to authenticate as Admin on the Server
      const apiResponse = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (apiResponse.ok) {
        const data = await apiResponse.json();
        if (data.success) {
          const sessionData = {
            role: "admin" as UserRole,
            user: { name: data.user.name, email: data.user.email }
          };
          setUser(sessionData.user);
          setRole(sessionData.role);
          localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));
          return { success: true };
        }
      }

      // If server-side admin check fails, check local storage for registered Patient users
      if (typeof window !== "undefined") {
        const storedPatientsStr = localStorage.getItem(PATIENTS_STORAGE_KEY) || "[]";
        const patients = JSON.parse(storedPatientsStr);
        const match = patients.find(
          (p: any) => p.email.toLowerCase() === email.toLowerCase() && p.password === password
        );

        if (match) {
          const sessionData = {
            role: "user" as UserRole,
            user: { id: match.id, name: match.name, email: match.email, phone: match.phone }
          };
          setUser(sessionData.user);
          setRole(sessionData.role);
          localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));
          return { success: true };
        }
      }

      return { success: false, error: "Invalid email or password combination" };
    } catch (err) {
      console.error("Login verification error:", err);
      return { success: false, error: "An unexpected error occurred. Please try again." };
    }
  };

  const register = async (
    name: string,
    phone: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      if (typeof window === "undefined") {
        return { success: false, error: "Client registration environment unavailable" };
      }

      const storedPatientsStr = localStorage.getItem(PATIENTS_STORAGE_KEY) || "[]";
      const patients = JSON.parse(storedPatientsStr);

      // Check if email or phone is already registered
      const emailExists = patients.some((p: any) => p.email.toLowerCase() === email.toLowerCase());
      const phoneExists = patients.some((p: any) => p.phone === phone);

      if (emailExists) {
        return { success: false, error: "Email address is already registered." };
      }
      if (phoneExists) {
        return { success: false, error: "Phone number is already registered." };
      }

      // Save new patient profile
      const newPatient = {
        id: `pat-${Date.now()}`,
        name,
        phone,
        email,
        password
      };
      patients.push(newPatient);
      localStorage.setItem(PATIENTS_STORAGE_KEY, JSON.stringify(patients));

      // Auto-login registered user
      const sessionData = {
        role: "user" as UserRole,
        user: { id: newPatient.id, name: newPatient.name, email: newPatient.email, phone: newPatient.phone }
      };
      setUser(sessionData.user);
      setRole(sessionData.role);
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));

      return { success: true };
    } catch (err) {
      console.error("Registration error:", err);
      return { success: false, error: "An error occurred during registration. Please try again." };
    }
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    }
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
