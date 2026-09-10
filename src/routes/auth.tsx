import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { cloudAuth } from "@/integrations/cloud-auth";
import { toast } from "sonner";
import { Loader2, Sparkles, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/auth")({
    head: () => ({
        meta: [
            { title: "Sign in — PeopleFlow HR" },
            { name: "description", content: "Sign in to your PeopleFlow HR account." },
        ],
    }),
    component: AuthPage,
});

function AuthPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState<"login" | "register" | "forgot">("login");

    const [email, setEmail] = useState("demo@peopleflow.local");
    const [password, setPassword] = useState("demo123");
    const [fullName, setFullName] = useState("");
    const [role, setRole] = useState<"employee" | "hr_manager" | "admin">("admin");
    const [remember, setRemember] = useState(true);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            if (data.user) navigate({ to: "/dashboard" });
        });
    }, [navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        setLoading(false);
        if (error) return toast.error(error.message);
        toast.success("Welcome back!");
        navigate({ to: "/dashboard" });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${window.location.origin}/dashboard`,
                data: { full_name: fullName, role },
            },
        });
        setLoading(false);
        if (error) return toast.error(error.message);
        toast.success("Account created. You can sign in now.");
        setMode("login");
    };

    const handleForgot = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        });
        setLoading(false);
        if (error) return toast.error(error.message);
        toast.success("Password reset link sent to your email.");
        setMode("login");
    };

    const handleGoogle = async () => {
        setLoading(true);
        const result = await cloudAuth.auth.signInWithOAuth("google", {
            redirect_uri: window.location.origin + "/dashboard",
        });
        if (result.error) {
            setLoading(false);
            toast.error("Google sign-in failed");
            return;
        }
        if (result.redirected) return;
        navigate({ to: "/dashboard" });
    };

    const demoCredentials = () => {
        setEmail("demo@peopleflow.local");
        setPassword("demo123");
        setMode("login");
    };

    return (
        <div className="min-h-screen bg-background bg-hero flex flex-col">
            <div className="container mx-auto px-4 py-6">
                <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="h-4 w-4" /> Back to home
                </Link>
            </div>
            <div className="flex-1 flex items-center justify-center px-4 pb-16">
                <Card className="glass w-full max-w-md overflow-hidden border-white/10 bg-slate-950/40 p-0 shadow-card backdrop-blur-xl">
                    <div className="border-b border-white/10 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 p-6">
                        <div className="flex items-center gap-3">
                            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-primary shadow-glow">
                                <Sparkles className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <div>
                                <div className="text-lg font-bold tracking-tight text-white">PeopleFlow<span className="text-gradient">HR</span></div>
                                <div className="text-xs uppercase tracking-[0.2em] text-slate-300">workforce command</div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        {mode === "forgot" ? (
                            <form onSubmit={handleForgot} className="space-y-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-white">Reset password</h1>
                                    <p className="text-sm text-slate-300">We'll email you a reset link.</p>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-slate-200">Email</Label>
                                    <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="border-white/10 bg-white/5 text-white placeholder:text-slate-400" />
                                </div>
                                <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground" disabled={loading}>
                                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Send reset link
                                </Button>
                                <button type="button" onClick={() => setMode("login")} className="w-full text-center text-sm text-slate-300 hover:text-white">
                                    Back to sign in
                                </button>
                            </form>
                        ) : (
                            <Tabs value={mode} onValueChange={(v) => setMode(v as "login" | "register")}>
                                <TabsList className="grid w-full grid-cols-2 bg-slate-900/70">
                                    <TabsTrigger value="login" className="text-slate-200 data-[state=active]:bg-white/10 data-[state=active]:text-white">Sign in</TabsTrigger>
                                    <TabsTrigger value="register" className="text-slate-200 data-[state=active]:bg-white/10 data-[state=active]:text-white">Create account</TabsTrigger>
                                </TabsList>

                                <TabsContent value="login" className="mt-6">
                                    <form onSubmit={handleLogin} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="login-email" className="text-slate-200">Email</Label>
                                            <Input id="login-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="border-white/10 bg-white/5 text-white placeholder:text-slate-400" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="login-password" className="text-slate-200">Password</Label>
                                            <Input id="login-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="border-white/10 bg-white/5 text-white placeholder:text-slate-400" />
                                        </div>
                                        <div className="flex items-center justify-between text-sm text-slate-300">
                                            <label className="flex items-center gap-2">
                                                <Checkbox checked={remember} onCheckedChange={(v) => setRemember(Boolean(v))} /> Remember me
                                            </label>
                                            <button type="button" onClick={() => setMode("forgot")} className="text-primary hover:underline">
                                                Forgot password?
                                            </button>
                                        </div>
                                        <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground" disabled={loading}>
                                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Sign in
                                        </Button>
                                    </form>
                                </TabsContent>

                                <TabsContent value="register" className="mt-6">
                                    <form onSubmit={handleRegister} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="reg-name" className="text-slate-200">Full name</Label>
                                            <Input id="reg-name" required value={fullName} onChange={(e) => setFullName(e.target.value)} className="border-white/10 bg-white/5 text-white placeholder:text-slate-400" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="reg-email" className="text-slate-200">Work email</Label>
                                            <Input id="reg-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="border-white/10 bg-white/5 text-white placeholder:text-slate-400" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="reg-password" className="text-slate-200">Password</Label>
                                            <Input id="reg-password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="border-white/10 bg-white/5 text-white placeholder:text-slate-400" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-slate-200">Role</Label>
                                            <Select value={role} onValueChange={(v) => setRole(v as typeof role)}>
                                                <SelectTrigger className="border-white/10 bg-white/5 text-white"><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="employee">Employee</SelectItem>
                                                    <SelectItem value="hr_manager">HR Manager</SelectItem>
                                                    <SelectItem value="admin">Administrator</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <p className="text-xs text-slate-300">Demo: role is self-selectable. In production, admins assign roles.</p>
                                        </div>
                                        <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground" disabled={loading}>
                                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Create account
                                        </Button>
                                    </form>
                                </TabsContent>
                            </Tabs>
                        )}

                        {mode !== "forgot" && (
                            <>
                                <div className="my-6 flex items-center gap-3 text-xs text-slate-300">
                                    <div className="h-px flex-1 bg-white/10" /> OR <div className="h-px flex-1 bg-white/10" />
                                </div>
                                <Button type="button" variant="outline" className="w-full border-white/10 bg-white/5 text-white hover:bg-white/10" onClick={handleGoogle} disabled={loading}>
                                    Continue with Google
                                </Button>
                                <button
                                    type="button"
                                    onClick={demoCredentials}
                                    className="mt-4 w-full rounded-xl border border-dashed border-primary/40 bg-primary/5 px-3 py-2 text-sm text-primary hover:bg-primary/10"
                                >
                                    Use demo admin access
                                </button>
                            </>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
}
