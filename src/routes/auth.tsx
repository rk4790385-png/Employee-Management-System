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

    // shared
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [role, setRole] = useState<"employee" | "hr_manager" | "admin">("employee");
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

    return (
        <div className="min-h-screen bg-background bg-hero flex flex-col">
            <div className="container mx-auto px-4 py-6">
                <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="h-4 w-4" /> Back to home
                </Link>
            </div>
            <div className="flex-1 flex items-center justify-center px-4 pb-16">
                <Card className="glass w-full max-w-md p-8 shadow-card">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary shadow-glow">
                            <Sparkles className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <div>
                            <div className="text-lg font-bold">PeopleFlow<span className="text-gradient">HR</span></div>
                            <div className="text-xs text-muted-foreground">Workforce management</div>
                        </div>
                    </div>

                    {mode === "forgot" ? (
                        <form onSubmit={handleForgot} className="space-y-4">
                            <div>
                                <h1 className="text-2xl font-bold">Reset password</h1>
                                <p className="text-sm text-muted-foreground">We'll email you a reset link.</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <Button type="submit" className="w-full bg-gradient-primary" disabled={loading}>
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Send reset link
                            </Button>
                            <button type="button" onClick={() => setMode("login")} className="text-sm text-muted-foreground hover:text-foreground w-full text-center">
                                Back to sign in
                            </button>
                        </form>
                    ) : (
                        <Tabs value={mode} onValueChange={(v) => setMode(v as "login" | "register")}>
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="login">Sign in</TabsTrigger>
                                <TabsTrigger value="register">Create account</TabsTrigger>
                            </TabsList>

                            <TabsContent value="login" className="mt-6">
                                <form onSubmit={handleLogin} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="login-email">Email</Label>
                                        <Input id="login-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="login-password">Password</Label>
                                        <Input id="login-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <label className="flex items-center gap-2">
                                            <Checkbox checked={remember} onCheckedChange={(v) => setRemember(Boolean(v))} /> Remember me
                                        </label>
                                        <button type="button" onClick={() => setMode("forgot")} className="text-primary hover:underline">
                                            Forgot password?
                                        </button>
                                    </div>
                                    <Button type="submit" className="w-full bg-gradient-primary" disabled={loading}>
                                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Sign in
                                    </Button>
                                </form>
                            </TabsContent>

                            <TabsContent value="register" className="mt-6">
                                <form onSubmit={handleRegister} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="reg-name">Full name</Label>
                                        <Input id="reg-name" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="reg-email">Work email</Label>
                                        <Input id="reg-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="reg-password">Password</Label>
                                        <Input id="reg-password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Role</Label>
                                        <Select value={role} onValueChange={(v) => setRole(v as typeof role)}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="employee">Employee</SelectItem>
                                                <SelectItem value="hr_manager">HR Manager</SelectItem>
                                                <SelectItem value="admin">Administrator</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <p className="text-xs text-muted-foreground">Demo: role is self-selectable. In production, admins assign roles.</p>
                                    </div>
                                    <Button type="submit" className="w-full bg-gradient-primary" disabled={loading}>
                                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Create account
                                    </Button>
                                </form>
                            </TabsContent>
                        </Tabs>
                    )}

                    {mode !== "forgot" && (
                        <>
                            <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
                                <div className="h-px flex-1 bg-border" /> OR <div className="h-px flex-1 bg-border" />
                            </div>
                            <Button type="button" variant="outline" className="w-full" onClick={handleGoogle} disabled={loading}>
                                Continue with Google
                            </Button>
                        </>
                    )}
                </Card>
            </div>
        </div>
    );
}
