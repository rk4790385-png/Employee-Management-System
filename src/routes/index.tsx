import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    ArrowRight,
    BarChart3,
    CalendarCheck,
    ShieldCheck,
    Users,
    Wallet,
    Sparkles,
    Building2,
    Clock,
    GraduationCap,
    Mail,
    Star,
} from "lucide-react";

export const Route = createFileRoute("/")({
    head: () => ({
        meta: [
            { title: "PeopleFlow HR — Workforce management for modern teams" },
            { name: "description", content: "All-in-one workforce platform: attendance, leave, payroll, performance, recruitment and analytics." },
            { property: "og:title", content: "PeopleFlow HR — Workforce management" },
            { property: "og:description", content: "All-in-one workforce platform for modern teams." },
        ],
    }),
    component: Landing,
});

const stats = [
    { value: "10K+", label: "Companies" },
    { value: "2M+", label: "Employees managed" },
    { value: "99.99%", label: "Uptime" },
    { value: "40+", label: "Countries" },
];

const features = [
    { icon: Users, title: "Employee Directory", desc: "Centralised profiles, org chart, skills, and reporting hierarchy." },
    { icon: CalendarCheck, title: "Attendance & Leave", desc: "Clock in/out, calendars, balances, and one-click approvals." },
    { icon: Wallet, title: "Payroll", desc: "Salary structures, allowances, deductions, and downloadable payslips." },
    { icon: BarChart3, title: "Performance", desc: "Goals, 360° reviews, ratings, and growth analytics." },
    { icon: GraduationCap, title: "Training", desc: "Courses, assessments, certificates, and progress tracking." },
    { icon: ShieldCheck, title: "Enterprise security", desc: "Role-based access, audit logs, encryption at rest and in transit." },
];

const benefits = [
    "Self-serve dashboards for every employee",
    "Manager-friendly approval workflows",
    "Realtime analytics across the org",
    "Multi-country, multi-currency payroll",
    "SOC 2 ready & GDPR compliant",
    "Open API & integrations",
];

const testimonials = [
    { name: "Priya Sharma", role: "Head of People, Northwind Labs", quote: "Pulse HR replaced four different tools. Our HR team finally has time for actual people work." },
    { name: "Marcus Chen", role: "CTO, Helio Robotics", quote: "Onboarding 80 engineers used to take weeks. Now it's a same-day workflow." },
    { name: "Sara Okafor", role: "COO, Bridgepoint", quote: "The analytics are exactly what our board has been asking for — clear, live, and credible." },
];

const faqs = [
    { q: "How long does setup take?", a: "Most teams are running in under a day. Import a CSV of employees, invite admins, and you're live." },
    { q: "Can I migrate from BambooHR / Workday / Zoho People?", a: "Yes — we provide import templates and our team helps with data mapping at no extra cost." },
    { q: "Is my data secure?", a: "All data is encrypted at rest and in transit. We run regular pen-tests and maintain SOC 2 controls." },
    { q: "Do you support custom roles?", a: "Out of the box: Employee, HR Manager, and Administrator. Custom roles with granular permissions are on the Enterprise plan." },
];

function Landing() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="sticky top-0 z-40 border-b border-border/40 bg-background/70 backdrop-blur-xl">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary shadow-glow">
                            <Sparkles className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <span className="text-lg font-bold tracking-tight text-white">PeopleFlow<span className="text-gradient">HR</span></span>
                    </Link>
                    <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
                        <a href="#features" className="transition hover:text-foreground">Features</a>
                        <a href="#benefits" className="transition hover:text-foreground">Benefits</a>
                        <a href="#testimonials" className="transition hover:text-foreground">Customers</a>
                        <a href="#faq" className="transition hover:text-foreground">FAQ</a>
                    </nav>
                    <div className="flex items-center gap-2">
                        <Button asChild variant="ghost" size="sm"><Link to="/auth">Sign in</Link></Button>
                        <Button asChild size="sm" className="bg-gradient-primary shadow-glow text-primary-foreground"><Link to="/auth">Launch app</Link></Button>
                    </div>
                </div>
            </header>

            <section className="relative overflow-hidden bg-hero">
                <div className="absolute inset-0 opacity-40" aria-hidden="true">
                    <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
                    <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[#ffb454]/20 blur-3xl" />
                </div>
                <div className="container relative mx-auto px-4 py-24 text-center md:py-32">
                    <Badge variant="outline" className="mb-6 border-primary/40 bg-primary/10 text-primary">
                        <Sparkles className="mr-1.5 h-3 w-3" /> Demo-ready workforce platform
                    </Badge>
                    <h1 className="mx-auto max-w-5xl text-5xl font-black tracking-[-0.06em] text-white md:text-7xl">
                        Build a calmer,
                        <span className="text-gradient block">smarter people system.</span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
                        Pulse your workforce with attendance, payroll, hiring, performance, and secure employee moments — everything in one elegant command center.
                    </p>
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                        <Button asChild size="lg" className="bg-gradient-primary shadow-glow text-primary-foreground">
                            <Link to="/auth">Start free <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
                            <Link to="/auth">Employee portal</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
                            <Link to="/auth">HR workspace</Link>
                        </Button>
                    </div>

                    <div className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4">
                        {stats.map((s) => (
                            <Card key={s.label} className="glass border-white/10 bg-slate-950/30 p-6 text-center text-white">
                                <div className="text-3xl font-black md:text-4xl text-gradient">{s.value}</div>
                                <div className="mt-2 text-[11px] uppercase tracking-[0.22em] text-slate-300">{s.label}</div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section id="features" className="container mx-auto px-4 py-24">
                <div className="mb-16 text-center">
                    <Badge variant="outline" className="mb-3 border-primary/40 bg-primary/10 text-primary">Capabilities</Badge>
                    <h2 className="text-4xl font-bold tracking-tight md:text-5xl">One platform for the full employee lifecycle.</h2>
                    <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Manage the people, processes, and moments that matter—without the spreadsheet chaos.</p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((f) => (
                        <Card key={f.title} className="glass group p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
                            <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary shadow-glow group-hover:scale-105">
                                <f.icon className="h-6 w-6 text-primary-foreground" />
                            </div>
                            <h3 className="text-xl font-semibold">{f.title}</h3>
                            <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
                        </Card>
                    ))}
                </div>
            </section>

            <section id="benefits" className="container mx-auto px-4 py-24">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <div>
                        <Badge variant="outline" className="mb-3 border-primary/40 bg-primary/10 text-primary">Why teams switch</Badge>
                        <h2 className="text-4xl font-bold tracking-tight md:text-5xl">A command center for every employee experience.</h2>
                        <p className="mt-4 text-muted-foreground">Replace disconnected tools with one operating layer for hiring, onboarding, approvals, performance, and planning.</p>
                        <div className="mt-8 grid gap-3 sm:grid-cols-2">
                            {benefits.map((b) => (
                                <div key={b} className="flex items-start gap-3 rounded-2xl border border-border/80 bg-card/50 p-3">
                                    <div className="mt-1 grid h-5 w-5 place-items-center rounded-full bg-success/15 text-success">✓</div>
                                    <span className="text-sm">{b}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Card className="glass p-8 shadow-card">
                        <div className="space-y-4">
                            {[
                                { icon: Building2, label: "Departments", value: "10 active" },
                                { icon: Users, label: "Headcount this month", value: "+24" },
                                { icon: Clock, label: "Avg. approval time", value: "3.2 hrs" },
                                { icon: Wallet, label: "Payroll on time", value: "100%" },
                            ].map((r) => (
                                <div key={r.label} className="flex items-center justify-between rounded-2xl border border-border/70 bg-background/40 p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                                            <r.icon className="h-5 w-5" />
                                        </div>
                                        <span className="text-sm text-muted-foreground">{r.label}</span>
                                    </div>
                                    <span className="text-base font-semibold">{r.value}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </section>

            <section id="testimonials" className="container mx-auto px-4 py-24">
                <div className="mb-12 text-center">
                    <Badge variant="outline" className="mb-3 border-primary/40 bg-primary/10 text-primary">Loved by people teams</Badge>
                    <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Built for teams that move fast.</h2>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                    {testimonials.map((t) => (
                        <Card key={t.name} className="glass p-7">
                            <div className="flex gap-1 text-warning">
                                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                            </div>
                            <p className="mt-4 text-base leading-relaxed">"{t.quote}"</p>
                            <div className="mt-6">
                                <div className="font-semibold">{t.name}</div>
                                <div className="text-xs text-muted-foreground">{t.role}</div>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            <section id="faq" className="container mx-auto max-w-3xl px-4 py-24">
                <div className="mb-10 text-center">
                    <Badge variant="outline" className="mb-3 border-primary/40 bg-primary/10 text-primary">FAQ</Badge>
                    <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Questions, answered.</h2>
                </div>
                <Accordion type="single" collapsible className="space-y-3">
                    {faqs.map((f, i) => (
                        <AccordionItem key={i} value={`item-${i}`} className="rounded-2xl border border-border bg-card/60 px-4">
                            <AccordionTrigger className="py-4 text-left text-base font-medium">{f.q}</AccordionTrigger>
                            <AccordionContent className="pb-4 text-sm text-muted-foreground">{f.a}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>

            <section className="container mx-auto px-4 pb-24">
                <Card className="glass overflow-hidden p-8 md:p-12">
                    <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
                        <div>
                            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Launch faster</p>
                            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Ready to modernize your HR stack?</h2>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground shadow-glow">
                                <Link to="/auth">Start free <ArrowRight className="ml-2 h-4 w-4" /></Link>
                            </Button>
                            <Button asChild size="lg" variant="outline">
                                <a href="mailto:hello@peopleflowhr.com">Talk to sales</a>
                            </Button>
                        </div>
                    </div>
                </Card>
            </section>

            <footer className="border-t border-border/60 bg-background/90">
                <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground md:flex-row">
                    <div className="flex items-center gap-2">
                        <div className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-primary shadow-glow">
                            <Sparkles className="h-4 w-4 text-primary-foreground" />
                        </div>
                        © 2026 PeopleFlow HR. All rights reserved.
                    </div>
                    <div className="flex items-center gap-4">
                        <a href="#" className="transition hover:text-foreground">Privacy</a>
                        <a href="#" className="transition hover:text-foreground">Terms</a>
                        <a href="#" className="transition hover:text-foreground">Security</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
