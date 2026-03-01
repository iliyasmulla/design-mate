import { useState, useEffect, useRef } from "react";

/* ─── Config ─── */
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfaM-nx-P93VU8_bumtPB4_uqwhnF3thPjvOxxWmwbeHUtHpg/formResponse";
const FIELD_MAP = { name: "entry.1322035744", email: "entry.1792496510", phone: "entry.1549383839", role: "entry.344800395", city: "entry.739275443" };
const ANALYTICS_URL = "https://script.google.com/macros/s/AKfycbzLCbUAUEdyjIzGccM1uGaDBEVmEj0xYPFYhQKuJ55lco44yTbJE_sQB6JwcLoJ_M3g/exec";

function sendEvent(type) {
  if (!ANALYTICS_URL) return;
  try {
    const p = JSON.stringify({ event: type, page: location.href, referrer: document.referrer || "(direct)", screenSize: `${innerWidth}x${innerHeight}` });
    navigator.sendBeacon?.(ANALYTICS_URL, p) || fetch(ANALYTICS_URL, { method: "POST", mode: "no-cors", body: p, keepalive: true });
  } catch {}
}
/* ─── Hooks ─── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ─── Marquee strip ─── */
function Marquee() {
  const items = ["Verified Professionals", "Trusted Reviews", "Quality Assured", "Transparent Pricing", "Background Checked", "Licensed & Insured", "Portfolio Verified", "On-Time Delivery"];
  return (
    <div className="relative overflow-hidden py-5 border-y border-stone-200/60">
      <div className="flex anim-marquee" style={{ width: "max-content" }}>
        {[...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-4 mx-10 text-[13px] font-medium text-stone-400 whitespace-nowrap tracking-wide uppercase">
            <span className="w-1 h-1 rounded-full bg-stone-300" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Main App ─── */
export default function App() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", role: "", city: "", otherRole: "" });
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});

  useEffect(() => { sendEvent("visit"); }, []);

  const validate = () => {
    const e = {};
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = true;
    if (form.phone.trim() && !/^[\d\s+()-]{7,15}$/.test(form.phone.trim())) e.phone = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    try {
      const body = new URLSearchParams();
      const formData = { ...form, role: form.role === "Other" ? `Other: ${form.otherRole}` : form.role };
      Object.entries(FIELD_MAP).forEach(([k, entry]) => body.append(entry, formData[k]));
      await fetch(GOOGLE_FORM_URL, { method: "POST", mode: "no-cors", body: body.toString(), headers: { "Content-Type": "application/x-www-form-urlencoded" } });
      sendEvent("submission");
      setStatus("success");
    } catch { setStatus("error"); }
  };

  const set = (field) => (e) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const [cardsRef, cardsVisible] = useInView(0.1);
  const [stepsRef, stepsVisible] = useInView(0.1);
  const [formRef, formVisible] = useInView(0.1);
  const [projectsRef, projectsVisible] = useInView(0.1);

  const ROLES = [
    { title: "Homeowners", desc: "Find verified professionals for your dream home project",
      photo: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop&q=80",
      num: "01" },
    { title: "Architects", desc: "Showcase your portfolio and get quality client leads",
      photo: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop&q=80",
      num: "02" },
    { title: "Contractors", desc: "Access a pipeline of verified projects near you",
      photo: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop&q=80",
      num: "03" },
    { title: "Interior Designers", desc: "Connect with homeowners at the right stage",
      photo: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=400&fit=crop&q=80",
      num: "04" },
  ];

  return (
    <div className="min-h-screen bg-[#F5F0EB] overflow-x-hidden">

      {/* ─── Navbar ─── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-[#F5F0EB]/80 backdrop-blur-xl border-b border-stone-200/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
          <span className="font-serif text-2xl text-stone-900 tracking-tight">
            Infra<span className="text-stone-500">Connect</span>
          </span>
          <div className="hidden md:flex items-center gap-10 text-[13px] font-medium text-stone-500 tracking-wide uppercase">
            <a href="#projects" className="hover:text-stone-900 transition-colors">Projects</a>
            <a href="#services" className="hover:text-stone-900 transition-colors">Services</a>
            <a href="#how-it-works" className="hover:text-stone-900 transition-colors">Process</a>
            <a href="#waitlist" className="hover:text-stone-900 transition-colors">Contact</a>
          </div>
          <a href="#waitlist" className="inline-flex items-center gap-2 px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold tracking-wider uppercase rounded-full hover:bg-stone-800 transition-colors">
            Join Waitlist
          </a>
        </div>
      </nav>

      {/* ─── Hero — Split Layout ─── */}
      <section className="relative pt-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid lg:grid-cols-2 gap-0 min-h-[calc(100vh-80px)]">
            {/* Left — Text */}
            <div className="flex flex-col justify-center py-16 lg:py-24 lg:pr-16">
              <div className="anim-fade-up">
                <span className="inline-block text-[11px] font-semibold tracking-[0.25em] uppercase text-stone-400 mb-8">
                  India&apos;s Verified Marketplace
                </span>
              </div>

              <h1 className="anim-fade-up delay-100 font-serif text-[clamp(2.5rem,5.5vw,5rem)] leading-[1.05] text-stone-900 mb-8">
                Don&apos;t Build
                <br />
                Blind. Build with
                <br />
                <em className="text-stone-500">the Right People.</em>
              </h1>

              <p className="anim-fade-up delay-200 text-base sm:text-lg text-stone-500 max-w-md mb-12 leading-relaxed font-light">
                Connecting homeowners with trusted architects, contractors &amp; designers. Every profile checked. Every review real.
              </p>

              <div className="anim-fade-up delay-300 flex items-center gap-6">
                <a href="#waitlist" onClick={() => sendEvent("waitlist_click")}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-stone-900 text-white text-xs font-semibold tracking-wider uppercase rounded-full hover:bg-stone-800 transition-all duration-300 hover:-translate-y-0.5">
                  <span>Join the Waitlist</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
                <a href="#how-it-works" className="text-xs font-semibold tracking-wider uppercase text-stone-400 hover:text-stone-700 transition-colors underline underline-offset-4 decoration-stone-300">
                  How it works
                </a>
              </div>

              {/* Stats row */}
              <div className="anim-fade-up delay-500 flex items-center gap-10 mt-16 pt-10 border-t border-stone-200/60">
                {[
                  { num: "100%", label: "Verified" },
                  { num: "Free", label: "To Join" },
                  { num: "Pan", label: "India" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="font-serif text-3xl sm:text-4xl text-stone-900">{s.num}</div>
                    <div className="text-[11px] font-medium tracking-[0.2em] uppercase text-stone-400 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Hero Image */}
            <div className="relative anim-fade-up delay-200 lg:self-stretch">
              <div className="relative h-full min-h-[400px] lg:min-h-0 rounded-t-[2rem] lg:rounded-none lg:rounded-bl-[3rem] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&h=1200&fit=crop&q=85"
                  alt="Modern architecture"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                {/* Overlay label */}
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="inline-flex items-center gap-3 px-5 py-3 bg-white/90 backdrop-blur-sm rounded-2xl">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-xs font-semibold text-stone-700 tracking-wide">Launching Soon — Join the Waitlist</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Marquee ─── */}
      <Marquee />

      {/* ─── Featured Projects Gallery ─── */}
      <section id="projects" ref={projectsRef} className="py-24 sm:py-32 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <span className={`inline-block text-[11px] font-semibold tracking-[0.25em] uppercase text-stone-400 mb-4 ${projectsVisible ? "anim-fade-up" : "opacity-0"}`}>Featured</span>
              <h2 className={`font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 ${projectsVisible ? "anim-fade-up delay-100" : "opacity-0"}`}>
                Built for <em className="text-stone-400">every</em> stage
              </h2>
            </div>
            <a href="#waitlist" className={`hidden sm:inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-stone-500 hover:text-stone-900 transition-colors ${projectsVisible ? "anim-fade-up delay-200" : "opacity-0"}`}>
              View All
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>

          {/* Asymmetric grid */}
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80", title: "Modern Interiors", cat: "Interior Design", tall: true },
              { src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=500&fit=crop&q=80", title: "Villa Projects", cat: "Architecture" },
              { src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=500&fit=crop&q=80", title: "Urban Homes", cat: "Construction" },
              { src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop&q=80", title: "Premium Spaces", cat: "Renovation", tall: true },
            ].map((p, i) => (
              <div key={i} className={`group relative overflow-hidden rounded-2xl cursor-pointer ${p.tall ? "sm:row-span-2" : ""} ${projectsVisible ? "anim-fade-up" : "opacity-0"}`}
                style={{ animationDelay: `${(i + 2) * 100}ms` }}>
                <div className={`${p.tall ? "h-[500px] sm:h-full" : "h-[280px] sm:h-[300px]"}`}>
                  <img src={p.src} alt={p.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-105" />
                </div>
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/60 mb-1 block">{p.cat}</span>
                  <h3 className="font-serif text-xl text-white">{p.title}</h3>
                </div>
                {/* Corner number */}
                <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-4 h-4 text-stone-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Who is this for ─── */}
      <section id="services" ref={cardsRef} className="py-24 sm:py-32 px-6 sm:px-10 bg-stone-900">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-20">
            <span className={`inline-block text-[11px] font-semibold tracking-[0.25em] uppercase text-stone-500 mb-4 ${cardsVisible ? "anim-fade-up" : "opacity-0"}`}>Services</span>
            <h2 className={`font-serif text-4xl sm:text-5xl lg:text-6xl text-white mb-6 ${cardsVisible ? "anim-fade-up delay-100" : "opacity-0"}`}>
              Built for everyone in <em className="text-stone-400">home construction</em>
            </h2>
            <p className={`text-stone-400 text-lg font-light leading-relaxed ${cardsVisible ? "anim-fade-up delay-200" : "opacity-0"}`}>
              Whether you&apos;re building your first home or managing your 100th project — we connect the right people.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ROLES.map((c, i) => (
              <div key={c.title} className={`group cursor-default ${cardsVisible ? "anim-fade-up" : "opacity-0"}`}
                style={{ animationDelay: `${(i + 3) * 100}ms` }}>
                {/* Image */}
                <div className="relative h-56 rounded-2xl overflow-hidden mb-6">
                  <img src={c.photo} alt={c.title} loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-stone-950/10 group-hover:bg-stone-950/0 transition-colors" />
                  {/* Number */}
                  <div className="absolute top-4 left-4 text-[11px] font-semibold tracking-[0.2em] text-white/80 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    {c.num}
                  </div>
                </div>
                {/* Text */}
                <h3 className="font-serif text-xl text-white mb-2 group-hover:text-stone-300 transition-colors">{c.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{c.desc}</p>
                {/* Arrow link */}
                <div className="mt-4 flex items-center gap-2 text-stone-500 group-hover:text-white transition-colors">
                  <span className="text-xs font-semibold tracking-wider uppercase">Learn more</span>
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section id="how-it-works" ref={stepsRef} className="py-24 sm:py-32 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left — Image */}
            <div className={`relative ${stepsVisible ? "anim-fade-up" : "opacity-0"}`}>
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&h=1000&fit=crop&q=80"
                  alt="Architecture process"
                  loading="lazy"
                  className="w-full h-[400px] sm:h-[550px] object-cover"
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -right-4 sm:right-[-2rem] bg-white rounded-2xl p-6 shadow-xl shadow-stone-900/5 max-w-[240px]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd"/></svg>
                  </div>
                  <div>
                    <div className="font-serif text-lg text-stone-900">Verified</div>
                    <div className="text-[10px] tracking-[0.15em] uppercase text-stone-400 font-medium">All Profiles</div>
                  </div>
                </div>
                <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                  <div className="h-full w-[85%] bg-emerald-500 rounded-full" />
                </div>
              </div>
            </div>

            {/* Right — Steps */}
            <div>
              <span className={`inline-block text-[11px] font-semibold tracking-[0.25em] uppercase text-stone-400 mb-4 ${stepsVisible ? "anim-fade-up" : "opacity-0"}`}>Process</span>
              <h2 className={`font-serif text-4xl sm:text-5xl text-stone-900 mb-14 ${stepsVisible ? "anim-fade-up delay-100" : "opacity-0"}`}>
                Three simple <em className="text-stone-400">steps</em>
              </h2>

              <div className="space-y-10">
                {[
                  { step: "01", title: "Sign up free", desc: "Create your profile in under 2 minutes. It's completely free — no hidden charges, no credit card required." },
                  { step: "02", title: "Get verified", desc: "We verify your credentials, portfolio, and reviews so that trust is built-in from day one." },
                  { step: "03", title: "Connect & build", desc: "Browse verified professionals or get matched automatically. Build your dream home with confidence." },
                ].map((s, i) => (
                  <div key={s.step} className={`group flex gap-6 ${stepsVisible ? "anim-fade-up" : "opacity-0"}`}
                    style={{ animationDelay: `${(i + 2) * 150}ms` }}>
                    <div className="shrink-0 w-14 h-14 rounded-2xl border-2 border-stone-200 flex items-center justify-center group-hover:border-stone-900 group-hover:bg-stone-900 transition-all duration-300">
                      <span className="font-serif text-lg text-stone-400 group-hover:text-white transition-colors">{s.step}</span>
                    </div>
                    <div className="pt-1">
                      <h3 className="font-serif text-xl text-stone-900 mb-2">{s.title}</h3>
                      <p className="text-sm text-stone-500 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Large CTA Image Band ─── */}
      <section className="px-6 sm:px-10 pb-24 sm:pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden h-[400px] sm:h-[500px]">
            <img
              src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1400&h=600&fit=crop&q=80"
              alt="Beautiful home"
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-stone-950/40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white mb-6 max-w-2xl leading-tight">
                Your dream home starts with the <em>right team</em>
              </h2>
              <a href="#waitlist" onClick={() => sendEvent("cta_click")}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-stone-900 text-xs font-semibold tracking-wider uppercase rounded-full hover:bg-stone-100 transition-colors">
                Get Started
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Waitlist Form ─── */}
      <section id="waitlist" ref={formRef} className="py-24 sm:py-32 px-6 sm:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left — Text */}
            <div className={`${formVisible ? "anim-fade-up" : "opacity-0"}`}>
              <span className="inline-block text-[11px] font-semibold tracking-[0.25em] uppercase text-stone-400 mb-4">Contact</span>
              <h2 className="font-serif text-4xl sm:text-5xl text-stone-900 mb-6">
                Join the <em className="text-stone-400">waitlist</em>
              </h2>
              <p className="text-stone-500 text-lg font-light leading-relaxed mb-10 max-w-md">
                Be among the first to experience India&apos;s most trusted home building marketplace. We&apos;ll notify you as soon as we launch.
              </p>
              {/* Info cards */}
              <div className="space-y-4">
                {[
                  { icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z", label: "Every professional is background-verified" },
                  { icon: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z", label: "Genuine reviews from real homeowners" },
                  { icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z", label: "Completely free to join — no hidden fees" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-stone-50 flex items-center justify-center">
                      <svg className="w-5 h-5 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                    </div>
                    <span className="text-sm text-stone-600 leading-relaxed pt-2.5">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Form */}
            <div className={`${formVisible ? "anim-fade-up delay-200" : "opacity-0"}`}>
              {status === "success" ? (
                <div className="text-center py-20 bg-stone-50 rounded-3xl">
                  <div className="text-6xl mb-6">🎉</div>
                  <h3 className="font-serif text-2xl text-stone-900 mb-3">You&apos;re on the list!</h3>
                  <p className="text-stone-500 text-sm mb-8">We&apos;ll notify you as soon as we launch.</p>
                  <button onClick={() => { setStatus("idle"); setForm({ name: "", email: "", phone: "", role: "", city: "", otherRole: "" }); }}
                    className="text-sm text-stone-900 font-semibold underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition-colors">
                    Submit another response
                  </button>
                </div>
              ) : (
                <div className="bg-stone-50 rounded-3xl p-8 sm:p-10">
                  <form onSubmit={submit} className="space-y-5">
                    <div>
                      <label className="text-[11px] font-semibold tracking-[0.15em] uppercase text-stone-400 mb-2 block">Full Name</label>
                      <input type="text" placeholder="John Doe" value={form.name} onChange={set("name")} className="input-modern" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-semibold tracking-[0.15em] uppercase text-stone-400 mb-2 block">Email</label>
                        <input type="email" placeholder="john@email.com" value={form.email} onChange={set("email")} className={`input-modern ${errors.email ? "input-error" : ""}`} />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold tracking-[0.15em] uppercase text-stone-400 mb-2 block">Phone</label>
                        <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set("phone")} className={`input-modern ${errors.phone ? "input-error" : ""}`} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-semibold tracking-[0.15em] uppercase text-stone-400 mb-2 block">Your Role</label>
                        <select value={form.role} onChange={set("role")} className={`input-modern ${!form.role ? "text-stone-400" : ""}`}>
                          <option value="" disabled>Select role</option>
                          <option>House owner</option>
                          <option>Architect</option>
                          <option>Contractor</option>
                          <option>Interior Designer</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold tracking-[0.15em] uppercase text-stone-400 mb-2 block">City</label>
                        <input type="text" placeholder="Mumbai" value={form.city} onChange={set("city")} className="input-modern" />
                      </div>
                    </div>
                    {form.role === "Other" && (
                      <div>
                        <label className="text-[11px] font-semibold tracking-[0.15em] uppercase text-stone-400 mb-2 block">Specify Role</label>
                        <input type="text" placeholder="Your role" value={form.otherRole} onChange={set("otherRole")} className="input-modern" />
                      </div>
                    )}

                    <button type="submit" disabled={status === "submitting"}
                      className="w-full py-4 bg-stone-900 text-white text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-stone-800 disabled:opacity-50 transition-all duration-300 mt-2">
                      {status === "submitting" ? "Submitting\u2026" : "Join Waitlist"}
                    </button>

                    {status === "error" && <p className="text-xs text-red-500 text-center">Something went wrong. Please try again.</p>}

                    <p className="text-[11px] text-center text-stone-400 flex items-center justify-center gap-1.5 mt-3">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd"/></svg>
                      Your data is secure. We never spam or share.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-10 px-6 sm:px-10 border-t border-stone-200/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <span className="font-serif text-xl text-stone-900">Infra<span className="text-stone-400">Connect</span></span>
            <span className="text-xs text-stone-400">&copy; {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs text-stone-400 font-medium tracking-wide">Made with love in India</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
