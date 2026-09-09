import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Sparkles, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/reset-password")({
    head: () => ({ meta: [{ title: "Reset password — PeopleFlow HR" }] }),
    component: ResetPassword,
});

function ResetPassword() {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.updateUser({ password });
        setLoading(false);
        if (error) return toast.error(error.message);
        toast.success("Password updated.");
        navigate({ to: "/dashboard" });
    };

    return (
        <div className="min-h-screen bg-background bg-hero flex flex-col">
            <div className="container mx-auto px-4 py-6">
                <Link to="/auth" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="h-4 w-4" /> Back to sign in
                </Link>
            </div>
            <div className="flex-1 flex items-center justify-center px-4 pb-16">
                <Card className="glass w-full max-w-md p-8 shadow-card">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary shadow-glow">
                            <Sparkles className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <div className="text-lg font-bold">PeopleFlow<span className="text-gradient">HR</span></div>
                    </div>
                    <h1 className="text-2xl font-bold">Set a new password</h1>
                    <p className="text-sm text-muted-foreground mt-1">Enter your new password below.</p>
                    <form onSubmit={onSubmit} className="mt-6 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="new-pw">New password</Label>
                            <Input id="new-pw" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <Button type="submit" className="w-full bg-gradient-primary" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Update password
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    );
}
