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
            {/* Nav */}
            <header className="sticky top-0 z-40 border-b border-border/40 backdrop-blur-xl bg-background/60">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary shadow-glow">
                            <Sparkles className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <span className="text-lg font-bold tracking-tight">PeopleFlow<span className="text-gradient">HR</span></span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
                        <a href="#features" className="hover:text-foreground transition">Features</a>
                        <a href="#benefits" className="hover:text-foreground transition">Benefits</a>
                        <a href="#testimonials" className="hover:text-foreground transition">Customers</a>
                        <a href="#faq" className="hover:text-foreground transition">FAQ</a>
                    </nav>
                    <div className="flex items-center gap-2">
                        <Button asChild variant="ghost" size="sm"><Link to="/auth">Sign in</Link></Button>
                        <Button asChild size="sm" className="bg-gradient-primary shadow-glow"><Link to="/auth">Get started</Link></Button>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="relative overflow-hidden bg-hero">
                <div className="container mx-auto px-4 py-24 md:py-32 text-center">
                    <Badge variant="outline" className="mb-6 border-primary/40 text-primary bg-primary/10">
                        <Sparkles className="mr-1.5 h-3 w-3" /> Now with AI-powered performance reviews
                    </Badge>
                    <h1 className="mx-auto max-w-4xl text-5xl md:text-7xl font-black tracking-tight leading-[1.05]">
                        Smart HR management for <span className="text-gradient">modern organizations</span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                        One enterprise-grade platform for attendance, leave, payroll, performance, and people analytics — used by teams from startups to the Fortune 500.
                    </p>
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                        <Button asChild size="lg" className="bg-gradient-primary shadow-glow">
                            <Link to="/auth">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                        <Button asChild size="lg" variant="outline">
                            <Link to="/auth">Employee Login</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline">
                            <Link to="/auth">HR Login</Link>
                        </Button>
                    </div>

                    <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {stats.map((s) => (
                            <Card key={s.label} className="glass p-6 text-center">
                                <div className="text-3xl md:text-4xl font-bold text-gradient">{s.value}</div>
                                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="container mx-auto px-4 py-24">
                <div className="text-center mb-16">
                    <Badge variant="outline" className="mb-3">Features</Badge>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Everything HR needs. Nothing it doesn't.</h2>
                    <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">A complete suite covering the entire employee lifecycle — from hire to retire.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((f) => (
                        <Card key={f.title} className="glass p-7 group hover:shadow-glow transition-all duration-300">
                            <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary mb-5 group-hover:scale-110 transition-transform">
                                <f.icon className="h-6 w-6 text-primary-foreground" />
                            </div>
                            <h3 className="text-xl font-semibold">{f.title}</h3>
                            <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Benefits */}
            <section id="benefits" className="container mx-auto px-4 py-24">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <Badge variant="outline" className="mb-3">Why Pulse HR</Badge>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Built for people teams that want to move fast.</h2>
                        <p className="mt-4 text-muted-foreground">Replace your patchwork of spreadsheets and legacy HRIS with a single platform that scales from 10 to 10,000+ employees.</p>
                        <div className="mt-8 grid sm:grid-cols-2 gap-3">
                            {benefits.map((b) => (
                                <div key={b} className="flex items-start gap-3">
                                    <div className="mt-1 grid h-5 w-5 place-items-center rounded-full bg-success/20 text-success">✓</div>
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
                                <div key={r.label} className="flex items-center justify-between rounded-xl border border-border/60 p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary">
                                            <r.icon className="h-5 w-5" />
                                        </div>
                                        <span className="text-sm text-muted-foreground">{r.label}</span>
                                    </div>
                                    <span className="font-semibold">{r.value}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="container mx-auto px-4 py-24">
                <div className="text-center mb-12">
                    <Badge variant="outline" className="mb-3">Loved by HR teams</Badge>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Trusted by 10,000+ companies</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
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

            {/* FAQ */}
            <section id="faq" className="container mx-auto px-4 py-24 max-w-3xl">
                <div className="text-center mb-10">
                    <Badge variant="outline" className="mb-3">FAQ</Badge>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Questions, answered.</h2>
                </div>
                <Accordion type="single" collapsible className="space-y-3">
                    {faqs.map((f, i) => (
                        <AccordionItem key={i} value={`item-${i}`} className="glass rounded-xl px-5 border-0">
                            <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>

            {/* Contact / CTA */}
            <section className="container mx-auto px-4 py-24">
                <Card className="glass p-12 text-center shadow-card overflow-hidden relative">
                    <div className="absolute inset-0 bg-hero opacity-60 pointer-events-none" />
                    <div className="relative">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Ready to modernise your HR?</h2>
                        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Join thousands of teams running people operations on Pulse HR.</p>
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                            <Button asChild size="lg" className="bg-gradient-primary shadow-glow">
                                <Link to="/auth">Start free trial <ArrowRight className="ml-2 h-4 w-4" /></Link>
                            </Button>
                            <Button asChild size="lg" variant="outline">
                                <a href="mailto:hello@peopleflowhr.com"><Mail className="mr-2 h-4 w-4" /> Talk to sales</a>
                            </Button>
                        </div>
                    </div>
                </Card>
            </section>

            {/* Footer */}
            <footer className="border-t border-border/40 mt-12">
                <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <div className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-primary">
                            <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
                        </div>
                        <span>© {new Date().getFullYear()} PeopleFlow HR. All rights reserved.</span>
                    </div>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-foreground">Privacy</a>
                        <a href="#" className="hover:text-foreground">Terms</a>
                        <a href="#" className="hover:text-foreground">Security</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
