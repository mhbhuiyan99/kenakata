"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { setSessionCookie, clearSessionCookie } from "@/lib/api/auth";
import { endPoints } from "@/lib/api/endPoints";

interface UserProfile {
    id: number;
    email: string;
    name: string;
    role: string;
    avatar: string;
}

interface AuthContextType {
    user: UserProfile | null;
    loading: boolean;
    login: (token: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUserProfile = async (token: string) => {
        try {
            const res = await fetch(endPoints.auth.profile, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const profileData = await res.json();
                setUser(profileData);
            } else {
                logout(); // Token might be expired or invalid
            }
        } catch (error) {
            console.error("Error loading user profile:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("kenakata_access_token");
        if (token) {
            fetchUserProfile(token);
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (token: string) => {
        setLoading(true);
        localStorage.setItem("kenakata_access_token", token);

        setSessionCookie(token, 7);

        await fetchUserProfile(token);
    };

    const logout = () => {
        localStorage.removeItem("kenakata_access_token");

        clearSessionCookie();

        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
}