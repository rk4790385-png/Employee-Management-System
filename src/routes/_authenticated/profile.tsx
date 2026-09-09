import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/use-auth";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";

export const Route = createFileRoute("/_authenticated/profile")({
    head: () => ({ meta: [{ title: "My profile — PeopleFlow HR" }] }),
    component: ProfilePage,
});

function ProfilePage() {
    const { user } = useAuth();
    const qc = useQueryClient();
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        full_name: "", phone: "", designation: "", department_id: "",
        date_of_birth: "", gender: "", address: "", emergency_contact: "",
        linkedin_url: "", github_url: "", portfolio_url: "", bio: "",
    });

    const { data: profile, isLoading } = useQuery({
        enabled: !!user,
        queryKey: ["profile", user?.id],
        queryFn: async () => {
            const { data, error } = await supabase.from("profiles").select("*").eq("id", user!.id).maybeSingle();
            if (error) throw error;
            return data;
        },
    });

    const { data: deps } = useQuery({
        queryKey: ["departments"],
        queryFn: async () => {
            const { data } = await supabase.from("departments").select("id, name").order("name");
            return data ?? [];
        },
    });

    useEffect(() => {
        if (profile) {
            setForm({
                full_name: profile.full_name ?? "",
                phone: profile.phone ?? "",
                designation: profile.designation ?? "",
                department_id: profile.department_id ?? "",
                date_of_birth: profile.date_of_birth ?? "",
                gender: profile.gender ?? "",
                address: profile.address ?? "",
                emergency_contact: profile.emergency_contact ?? "",
                linkedin_url: profile.linkedin_url ?? "",
                github_url: profile.github_url ?? "",
                portfolio_url: profile.portfolio_url ?? "",
                bio: profile.bio ?? "",
            });
        }
    }, [profile]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setSaving(true);
        const payload = {
            ...form,
            department_id: form.department_id || null,
            date_of_birth: form.date_of_birth || null,
        };
        const { error } = await supabase.from("profiles").update(payload).eq("id", user.id);
        setSaving(false);
        if (error) return toast.error(error.message);
        toast.success("Profile updated");
        qc.invalidateQueries({ queryKey: ["profile"] });
        qc.invalidateQueries({ queryKey: ["profiles"] });
    };

    const initials = (form.full_name || user?.email || "?").slice(0, 2).toUpperCase();

    return (
        <DashboardShell>
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">My profile</h1>
                <p className="text-sm text-muted-foreground mt-1">Keep your information up to date.</p>
            </div>

            {isLoading ? (
                <Card className="glass h-96 animate-pulse" />
            ) : (
                <form onSubmit={handleSave} className="grid lg:grid-cols-3 gap-6">
                    <Card className="glass p-6 lg:col-span-1 h-fit">
                        <div className="flex flex-col items-center text-center">
                            <Avatar className="h-24 w-24 ring-4 ring-primary/30">
                                <AvatarFallback className="bg-gradient-primary text-primary-foreground text-2xl font-bold">{initials}</AvatarFallback>
                            </Avatar>
                            <div className="mt-4 font-semibold text-lg">{form.full_name || "Unnamed"}</div>
                            <div className="text-sm text-muted-foreground">{form.designation || "—"}</div>
                            <Badge variant="outline" className="mt-3 font-mono">{profile?.employee_id ?? "—"}</Badge>
                            <div className="mt-6 w-full space-y-2 text-left text-sm">
                                <div className="flex justify-between"><span className="text-muted-foreground">Email</span><span className="truncate ml-2">{user?.email}</span></div>
                                <div className="flex justify-between"><span className="text-muted-foreground">Joined</span><span>{profile?.joining_date ?? "—"}</span></div>
                                <div className="flex justify-between"><span className="text-muted-foreground">Status</span><span className="capitalize">{profile?.employment_status ?? "active"}</span></div>
                            </div>
                        </div>
                    </Card>

                    <Card className="glass p-6 lg:col-span-2 space-y-6">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="full_name">Full name</Label>
                                <Input id="full_name" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="designation">Designation</Label>
                                <Input id="designation" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} placeholder="e.g. Senior Engineer" />
                            </div>
                            <div className="space-y-2">
                                <Label>Department</Label>
                                <Select value={form.department_id} onValueChange={(v) => setForm({ ...form, department_id: v })}>
                                    <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
                                    <SelectContent>
                                        {(deps ?? []).map((d: any) => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="dob">Date of birth</Label>
                                <Input id="dob" type="date" value={form.date_of_birth} onChange={(e) => setForm({ ...form, date_of_birth: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Gender</Label>
                                <Select value={form.gender} onValueChange={(v) => setForm({ ...form, gender: v })}>
                                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="female">Female</SelectItem>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="non_binary">Non-binary</SelectItem>
                                        <SelectItem value="prefer_not">Prefer not to say</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2 sm:col-span-2">
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                            </div>
                            <div className="space-y-2 sm:col-span-2">
                                <Label htmlFor="emergency">Emergency contact</Label>
                                <Input id="emergency" value={form.emergency_contact} onChange={(e) => setForm({ ...form, emergency_contact: e.target.value })} placeholder="Name + phone" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="linkedin">LinkedIn</Label>
                                <Input id="linkedin" value={form.linkedin_url} onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })} placeholder="https://" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="github">GitHub</Label>
                                <Input id="github" value={form.github_url} onChange={(e) => setForm({ ...form, github_url: e.target.value })} placeholder="https://" />
                            </div>
                            <div className="space-y-2 sm:col-span-2">
                                <Label htmlFor="portfolio">Portfolio</Label>
                                <Input id="portfolio" value={form.portfolio_url} onChange={(e) => setForm({ ...form, portfolio_url: e.target.value })} placeholder="https://" />
                            </div>
                            <div className="space-y-2 sm:col-span-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea id="bio" rows={4} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="Tell your team about yourself…" />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit" className="bg-gradient-primary" disabled={saving}>
                                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                Save changes
                            </Button>
                        </div>
                    </Card>
                </form>
            )}
        </DashboardShell>
    );
}
