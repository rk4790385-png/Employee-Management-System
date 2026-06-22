import { type ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useAuth, roleLabel } from "@/lib/use-auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function DashboardShell({ children }: { children: ReactNode }) {
    const { user, role } = useAuth();
    const initials = (user?.email ?? "?").slice(0, 2).toUpperCase();

    return (
        <SidebarProvider>
            <div className="min-h-screen flex w-full bg-background">
                <AppSidebar role={role} />
                <div className="flex-1 flex flex-col min-w-0">
                    <header className="sticky top-0 z-30 h-16 border-b border-border/40 bg-background/70 backdrop-blur-xl flex items-center gap-4 px-4">
                        <SidebarTrigger />
                        <div className="hidden md:flex items-center gap-2 max-w-md flex-1">
                            <div className="relative w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search employees, projects, announcements..." className="pl-9 bg-muted/40 border-border/60" />
                            </div>
                        </div>
                        <div className="ml-auto flex items-center gap-3">
                            <button className="relative grid h-9 w-9 place-items-center rounded-lg hover:bg-muted transition">
                                <Bell className="h-4 w-4" />
                                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
                            </button>
                            <div className="flex items-center gap-3 pl-3 border-l border-border/60">
                                <div className="text-right hidden sm:block">
                                    <div className="text-sm font-medium truncate max-w-[140px]">{user?.email}</div>
                                    <Badge variant="outline" className="text-[10px] h-4 px-1.5">{roleLabel(role)}</Badge>
                                </div>
                                <Avatar className="h-9 w-9">
                                    <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs font-semibold">{initials}</AvatarFallback>
                                </Avatar>
                            </div>
                        </div>
                    </header>
                    <main className="flex-1 p-6">{children}</main>
                </div>
            </div>
        </SidebarProvider>
    );
}
