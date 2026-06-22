import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
    Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
    SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";
import {
    LayoutDashboard, Users, User, CalendarCheck, Wallet, BarChart3, Megaphone,
    Settings, GraduationCap, Briefcase, ShieldCheck, LogOut, Sparkles, Building2,
} from "lucide-react";
import type { AppRole } from "@/lib/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const baseItems = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "My Profile", url: "/profile", icon: User },
    { title: "Employee Directory", url: "/employees", icon: Users },
];

const hrItems = [
    { title: "Attendance", url: "/dashboard", icon: CalendarCheck },
    { title: "Payroll", url: "/dashboard", icon: Wallet },
    { title: "Recruitment", url: "/dashboard", icon: Briefcase },
    { title: "Announcements", url: "/dashboard", icon: Megaphone },
    { title: "Training", url: "/dashboard", icon: GraduationCap },
    { title: "Reports", url: "/dashboard", icon: BarChart3 },
];

const adminItems = [
    { title: "Departments", url: "/dashboard", icon: Building2 },
    { title: "Roles & Access", url: "/dashboard", icon: ShieldCheck },
    { title: "System Settings", url: "/dashboard", icon: Settings },
];

export function AppSidebar({ role }: { role: AppRole | null }) {
    const { state } = useSidebar();
    const collapsed = state === "collapsed";
    const pathname = useRouterState({ select: (r) => r.location.pathname });
    const navigate = useNavigate();

    const isActive = (path: string) => pathname === path;

    const signOut = async () => {
        await supabase.auth.signOut();
        toast.success("Signed out");
        navigate({ to: "/auth" });
    };

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <Link to="/dashboard" className="flex items-center gap-2 px-2 py-3">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-primary shadow-glow">
                        <Sparkles className="h-4 w-4 text-primary-foreground" />
                    </div>
                    {!collapsed && (
                        <div className="min-w-0">
                            <div className="font-bold truncate">Pulse<span className="text-gradient">HR</span></div>
                            <div className="text-[10px] uppercase tracking-wider text-muted-foreground truncate">
                                {role === "admin" ? "Admin workspace" : role === "hr_manager" ? "HR workspace" : "Employee workspace"}
                            </div>
                        </div>
                    )}
                </Link>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Workspace</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {baseItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={isActive(item.url)}>
                                        <Link to={item.url}>
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {(role === "hr_manager" || role === "admin") && (
                    <SidebarGroup>
                        <SidebarGroupLabel>HR</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {hrItems.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link to={item.url}>
                                                <item.icon className="h-4 w-4" />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                )}

                {role === "admin" && (
                    <SidebarGroup>
                        <SidebarGroupLabel>Admin</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {adminItems.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link to={item.url}>
                                                <item.icon className="h-4 w-4" />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                )}
            </SidebarContent>

            <SidebarFooter>
                <Button variant="ghost" size="sm" className="justify-start" onClick={signOut}>
                    <LogOut className="h-4 w-4" />
                    {!collapsed && <span className="ml-2">Sign out</span>}
                </Button>
            </SidebarFooter>
        </Sidebar>
    );
}
