import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth, roleLabel } from "@/lib/use-auth";
import {
    Users, CalendarCheck, Clock, Wallet, TrendingUp, Briefcase,
    Megaphone, GraduationCap, Star, ArrowUpRight,
} from "lucide-react";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell,
} from "recharts";

export const Route = createFileRoute("/_authenticated/dashboard")({
    head: () => ({ meta: [{ title: "Dashboard — PeopleFlow HR" }] }),
    component: DashboardPage,
});

const headcountData = [
    { month: "Jan", count: 120 }, { month: "Feb", count: 132 }, { month: "Mar", count: 141 },
    { month: "Apr", count: 158 }, { month: "May", count: 170 }, { month: "Jun", count: 188 },
];
const attendanceData = [
    { day: "Mon", present: 92 }, { day: "Tue", present: 95 }, { day: "Wed", present: 91 },
    { day: "Thu", present: 96 }, { day: "Fri", present: 88 },
];
const deptData = [
    { name: "Engineering", value: 64, color: "oklch(0.65 0.2 260)" },
    { name: "Sales", value: 32, color: "oklch(0.6 0.24 295)" },
    { name: "Design", value: 18, color: "oklch(0.72 0.15 200)" },
    { name: "Marketing", value: 22, color: "oklch(0.72 0.18 150)" },
    { name: "Other", value: 52, color: "oklch(0.8 0.16 75)" },
];

function StatCard({ icon: Icon, label, value, change, accent }: { icon: any; label: string; value: string; change?: string; accent?: string }) {
    return (
        <Card className="glass p-6 hover:shadow-glow transition-all">
            <div className="flex items-start justify-between">
                <div className={`grid h-11 w-11 place-items-center rounded-xl ${accent ?? "bg-gradient-primary"}`}>
                    <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
                {change && (
                    <Badge variant="outline" className="text-success border-success/30 bg-success/10">
                        <ArrowUpRight className="mr-1 h-3 w-3" /> {change}
                    </Badge>
                )}
            </div>
            <div className="mt-4">
                <div className="text-3xl font-bold">{value}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
            </div>
        </Card>
    );
}

function EmployeeView() {
    return (
        <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={CalendarCheck} label="Days present (this month)" value="18 / 22" change="92%" />
                <StatCard icon={Clock} label="Hours worked" value="146h" accent="bg-gradient-accent" />
                <StatCard icon={Wallet} label="Leave balance" value="12 days" />
                <StatCard icon={Star} label="Performance rating" value="4.6 / 5" change="+0.3" />
            </div>

            <div className="grid lg:grid-cols-3 gap-4 mt-6">
                <Card className="glass p-6 lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Profile completion</h3>
                        <Badge variant="outline">72%</Badge>
                    </div>
                    <Progress value={72} className="h-2" />
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                        <li>✓ Basic information complete</li>
                        <li>✓ Emergency contact added</li>
                        <li>• Add education history</li>
                        <li>• Upload resume</li>
                    </ul>
                </Card>
                <Card className="glass p-6">
                    <h3 className="font-semibold mb-3">Upcoming holidays</h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex justify-between"><span>Independence Day</span><span className="text-muted-foreground">Jul 4</span></li>
                        <li className="flex justify-between"><span>Labor Day</span><span className="text-muted-foreground">Sep 1</span></li>
                        <li className="flex justify-between"><span>Thanksgiving</span><span className="text-muted-foreground">Nov 27</span></li>
                    </ul>
                </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-4 mt-6">
                <Card className="glass p-6">
                    <div className="flex items-center gap-2 mb-3">
                        <Megaphone className="h-4 w-4 text-primary" />
                        <h3 className="font-semibold">Company announcements</h3>
                    </div>
                    <ul className="space-y-3 text-sm">
                        <li className="border-l-2 border-primary/60 pl-3"><div className="font-medium">Q3 all-hands</div><div className="text-muted-foreground">Friday at 3 PM in the main hall.</div></li>
                        <li className="border-l-2 border-secondary/60 pl-3"><div className="font-medium">New dental plan</div><div className="text-muted-foreground">Updated benefits go live Aug 1.</div></li>
                    </ul>
                </Card>
                <Card className="glass p-6">
                    <div className="flex items-center gap-2 mb-3">
                        <Briefcase className="h-4 w-4 text-primary" />
                        <h3 className="font-semibold">Assigned tasks</h3>
                    </div>
                    <ul className="space-y-3 text-sm">
                        <li className="flex justify-between items-center"><span>Submit timesheet</span><Badge variant="outline">Due today</Badge></li>
                        <li className="flex justify-between items-center"><span>Complete security training</span><Badge variant="outline">3 days</Badge></li>
                        <li className="flex justify-between items-center"><span>Q3 goals review</span><Badge variant="outline">Next week</Badge></li>
                    </ul>
                </Card>
            </div>
        </>
    );
}

function HrAdminView({ admin }: { admin: boolean }) {
    return (
        <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={Users} label="Total employees" value="188" change="+18" />
                <StatCard icon={CalendarCheck} label="Present today" value="172" change="91%" accent="bg-gradient-accent" />
                <StatCard icon={Briefcase} label="Open positions" value="12" />
                <StatCard icon={Wallet} label="Payroll this month" value="$1.42M" change="On track" />
            </div>

            <div className="grid lg:grid-cols-3 gap-4 mt-6">
                <Card className="glass p-6 lg:col-span-2">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">Headcount growth</h3>
                        <Badge variant="outline" className="text-success border-success/30 bg-success/10">+56% YTD</Badge>
                    </div>
                    <ResponsiveContainer width="100%" height={260}>
                        <LineChart data={headcountData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
                            <XAxis dataKey="month" stroke="oklch(0.7 0.03 257)" fontSize={12} />
                            <YAxis stroke="oklch(0.7 0.03 257)" fontSize={12} />
                            <Tooltip contentStyle={{ background: "oklch(0.22 0.045 260)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12 }} />
                            <Line type="monotone" dataKey="count" stroke="oklch(0.65 0.2 260)" strokeWidth={3} dot={{ r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>
                <Card className="glass p-6">
                    <h3 className="font-semibold mb-2">Department mix</h3>
                    <ResponsiveContainer width="100%" height={260}>
                        <PieChart>
                            <Pie data={deptData} dataKey="value" innerRadius={50} outerRadius={85} paddingAngle={2}>
                                {deptData.map((d) => <Cell key={d.name} fill={d.color} />)}
                            </Pie>
                            <Tooltip contentStyle={{ background: "oklch(0.22 0.045 260)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12 }} />
                        </PieChart>
                    </ResponsiveContainer>
                </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-4 mt-6">
                <Card className="glass p-6">
                    <h3 className="font-semibold mb-2">Attendance this week</h3>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={attendanceData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
                            <XAxis dataKey="day" stroke="oklch(0.7 0.03 257)" fontSize={12} />
                            <YAxis stroke="oklch(0.7 0.03 257)" fontSize={12} />
                            <Tooltip contentStyle={{ background: "oklch(0.22 0.045 260)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12 }} />
                            <Bar dataKey="present" fill="oklch(0.65 0.2 260)" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
                <Card className="glass p-6">
                    <h3 className="font-semibold mb-3">Pending approvals</h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-center justify-between"><span>Leave requests</span><Badge>7</Badge></li>
                        <li className="flex items-center justify-between"><span>Expense claims</span><Badge>3</Badge></li>
                        <li className="flex items-center justify-between"><span>Offer letters</span><Badge>2</Badge></li>
                        {admin && <li className="flex items-center justify-between"><span>Role change requests</span><Badge>1</Badge></li>}
                    </ul>
                </Card>
            </div>
        </>
    );
}

function DashboardPage() {
    const { user, role, loading } = useAuth();
    const name = user?.user_metadata?.full_name ?? user?.email?.split("@")[0] ?? "there";

    return (
        <DashboardShell>
            <div className="mb-6 flex items-end justify-between flex-wrap gap-3">
                <div>
                    <div className="text-sm text-muted-foreground">{roleLabel(role)} workspace</div>
                    <h1 className="text-3xl font-bold tracking-tight mt-1">Welcome back, {name} 👋</h1>
                </div>
                <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary">
                    <TrendingUp className="mr-1 h-3 w-3" /> Org performance: Excellent
                </Badge>
            </div>

            {loading ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => <Card key={i} className="glass p-6 h-32 animate-pulse" />)}
                </div>
            ) : role === "employee" ? (
                <EmployeeView />
            ) : (
                <HrAdminView admin={role === "admin"} />
            )}
        </DashboardShell>
    );
}
