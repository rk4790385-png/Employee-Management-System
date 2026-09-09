import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Search, Mail, Phone, Briefcase } from "lucide-react";

export const Route = createFileRoute("/_authenticated/employees")({
    head: () => ({ meta: [{ title: "Employee directory — PeopleFlow HR" }] }),
    component: EmployeesPage,
});

type Profile = {
    id: string;
    full_name: string | null;
    email: string | null;
    employee_id: string | null;
    designation: string | null;
    phone: string | null;
    joining_date: string | null;
    employment_status: string | null;
    avatar_url: string | null;
    department_id: string | null;
};

type Department = { id: string; name: string };

function EmployeesPage() {
    const [q, setQ] = useState("");

    const { data: deps } = useQuery({
        queryKey: ["departments"],
        queryFn: async () => {
            const { data, error } = await supabase.from("departments").select("id, name").order("name");
            if (error) throw error;
            return data as Department[];
        },
    });

    const { data: profiles, isLoading } = useQuery({
        queryKey: ["profiles"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("profiles")
                .select("id, full_name, email, employee_id, designation, phone, joining_date, employment_status, avatar_url, department_id")
                .order("created_at", { ascending: false });
            if (error) throw error;
            return data as Profile[];
        },
    });

    const depMap = new Map(deps?.map((d) => [d.id, d.name]) ?? []);
    const filtered = (profiles ?? []).filter((p) => {
        const s = q.toLowerCase();
        return !s ||
            p.full_name?.toLowerCase().includes(s) ||
            p.email?.toLowerCase().includes(s) ||
            p.designation?.toLowerCase().includes(s) ||
            p.employee_id?.toLowerCase().includes(s);
    });

    return (
        <DashboardShell>
            <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Employee directory</h1>
                    <p className="text-sm text-muted-foreground mt-1">{filtered.length} people in your organization</p>
                </div>
                <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, email, role…" className="pl-9" />
                </div>
            </div>

            {isLoading ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => <Card key={i} className="glass h-48 animate-pulse" />)}
                </div>
            ) : filtered.length === 0 ? (
                <Card className="glass p-12 text-center">
                    <p className="text-muted-foreground">No employees found. As people sign up, they'll appear here.</p>
                </Card>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((p) => {
                        const initials = (p.full_name ?? p.email ?? "?").slice(0, 2).toUpperCase();
                        return (
                            <Card key={p.id} className="glass p-6 hover:shadow-glow transition-all group">
                                <div className="flex items-start gap-4">
                                    <Avatar className="h-14 w-14 ring-2 ring-primary/20">
                                        {p.avatar_url && <img src={p.avatar_url} alt="" />}
                                        <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">{initials}</AvatarFallback>
                                    </Avatar>
                                    <div className="min-w-0 flex-1">
                                        <div className="font-semibold truncate">{p.full_name ?? "Unnamed"}</div>
                                        <div className="text-xs text-muted-foreground truncate">{p.designation ?? "—"}</div>
                                        <div className="text-[10px] font-mono text-muted-foreground mt-1">{p.employee_id ?? "—"}</div>
                                    </div>
                                    <Badge variant="outline" className={p.employment_status === "active" ? "border-success/40 bg-success/10 text-success" : ""}>
                                        {p.employment_status ?? "active"}
                                    </Badge>
                                </div>
                                <div className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-2"><Briefcase className="h-3.5 w-3.5" />{depMap.get(p.department_id ?? "") ?? "Unassigned"}</div>
                                    {p.email && <div className="flex items-center gap-2 truncate"><Mail className="h-3.5 w-3.5" />{p.email}</div>}
                                    {p.phone && <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" />{p.phone}</div>}
                                </div>
                                <Button variant="outline" size="sm" className="w-full mt-4">View profile</Button>
                            </Card>
                        );
                    })}
                </div>
            )}
        </DashboardShell>
    );
}
