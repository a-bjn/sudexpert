"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

type User = {
    email: string;
    // Add other user fields if needed (e.g. role, name)
};

type AuthContextType = {
    user: User | null;
    token: string | null;
    login: (token: string, email: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Load from localStorage on mount
        const storedToken = localStorage.getItem("token");
        const storedEmail = localStorage.getItem("email");

        if (storedToken && storedEmail) {
            setToken(storedToken);
            setUser({ email: storedEmail });
        }
    }, []);

    const login = (newToken: string, email: string) => {
        setToken(newToken);
        setUser({ email });
        localStorage.setItem("token", newToken);
        localStorage.setItem("email", email);
        router.push("/");
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        router.push("/login");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                isAuthenticated: !!token,
            }}
        >
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
