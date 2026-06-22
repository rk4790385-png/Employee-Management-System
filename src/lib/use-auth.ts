import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

export type AppRole = "employee" | "hr_manager" | "admin";

export interface AuthState {
    user: User | null;
    role: AppRole | null;
    loading: boolean;
}

export function useAuth(): AuthState {
    const [state, setState] = useState<AuthState>({ user: null, role: null, loading: true });

    useEffect(() => {
        let active = true;

        const loadRole = async (userId: string): Promise<AppRole | null> => {
            const { data } = await supabase
                .from("user_roles")
                .select("role")
                .eq("user_id", userId)
                .order("role", { ascending: true });
            if (!data || data.length === 0) return null;
            const roles = data.map((r) => r.role as AppRole);
            if (roles.includes("admin")) return "admin";
            if (roles.includes("hr_manager")) return "hr_manager";
            return "employee";
        };

        const sync = async (user: User | null) => {
            if (!user) {
                if (active) setState({ user: null, role: null, loading: false });
                return;
            }
            const role = await loadRole(user.id);
            if (active) setState({ user, role, loading: false });
        };

        const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
            sync(session?.user ?? null);
        });

        supabase.auth.getUser().then(({ data }) => sync(data.user ?? null));

        return () => {
            active = false;
            sub.subscription.unsubscribe();
        };
    }, []);

    return state;
}

export function roleLabel(role: AppRole | null): string {
    if (role === "admin") return "Administrator";
    if (role === "hr_manager") return "HR Manager";
    if (role === "employee") return "Employee";
    return "Member";
}
