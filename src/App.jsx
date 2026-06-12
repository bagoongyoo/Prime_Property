import { useEffect, useMemo, useState } from "react";

const SHOW_AGENT_LOGIN_IN_PUBLIC_NAV = true;

const CONTACT_INFO = {
  phone: "+62 812-3456-7890",
  whatsapp: "https://wa.me/6281234567890",
  email: "info@primeproperty.id",
  address: "Jl. Krakatau No. 88, Medan, Sumatera Utara",
};

const PROPERTIES = [
  {
    id: 1,
    name: "Aston Villas",
    group: "Mentari",
    lebar: 6,
    panjang: 21.5,
    hadap: "Timur",
    tipe: "Ruko",
    tingkat: 3,
    price: 1350000000,
    carport: true,
    status: "in_stock",
    siap: "siap_huni",
    kawasan: "Krakatau",
    maps_link: "https://www.google.com/maps/search/?api=1&query=Krakatau+Medan",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 2,
    name: "Banyan Tree Blok A",
    group: null,
    lebar: 8,
    panjang: 15,
    hadap: "Utara",
    tipe: "Villa",
    tingkat: 2,
    price: 2100000000,
    carport: true,
    status: "in_stock",
    siap: "siap_huni",
    kawasan: "Helvetia",
    maps_link: "https://www.google.com/maps/search/?api=1&query=Helvetia+Medan",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 3,
    name: "Mentari Square",
    group: "Permai 123",
    lebar: 4.5,
    panjang: 20,
    hadap: "Selatan",
    tipe: "Ruko",
    tingkat: 2,
    price: 875000000,
    carport: false,
    status: "in_stock",
    siap: "siap_kosong",
    kawasan: "Pancing",
    maps_link: "https://www.google.com/maps/search/?api=1&query=Pancing+Medan",
    image: "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 4,
    name: "Permai Residence",
    group: null,
    lebar: 10,
    panjang: 18,
    hadap: "Barat",
    tipe: "Villa",
    tingkat: 2.5,
    price: 3250000000,
    carport: true,
    status: "in_stock",
    siap: "siap_huni",
    kawasan: "Cemara Asri",
    maps_link: "https://www.google.com/maps/search/?api=1&query=Cemara+Asri+Medan",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 5,
    name: "Project Ville C3",
    group: "Project Ville",
    lebar: 5,
    panjang: 22,
    hadap: "Timur",
    tipe: "Ruko",
    tingkat: 3,
    price: 980000000,
    carport: true,
    status: "sold_out",
    siap: "siap_huni",
    kawasan: "Tembung",
    maps_link: "https://www.google.com/maps/search/?api=1&query=Tembung+Medan",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 6,
    name: "Sunrise Townhouse",
    group: null,
    lebar: 7,
    panjang: 16,
    hadap: "Utara",
    tipe: "Villa",
    tingkat: 2,
    price: 1750000000,
    carport: true,
    status: "in_stock",
    siap: "siap_huni_renovasi",
    kawasan: "Krakatau",
    maps_link: "https://www.google.com/maps/search/?api=1&query=Krakatau+Medan",
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1200&q=85",
  },
];

const WHY = [
  {
    iconKey: "verified",
    title: "Portofolio Terverifikasi",
    desc: "Setiap unit melewati proses verifikasi dokumen menyeluruh sebelum dipublikasikan ke platform kami.",
  },
  {
    iconKey: "price",
    title: "Harga Transparan",
    desc: "Harga yang tercantum jelas, ringkas, dan mudah dipahami oleh calon pembeli.",
  },
  {
    iconKey: "location",
    title: "Lokasi Strategis",
    desc: "Tersebar di kawasan premium Medan — Krakatau, Helvetia, Cemara Asri, Pancing, dan sekitarnya.",
  },
  {
    iconKey: "team",
    title: "Tim Profesional",
    desc: "Agen berpengalaman mendampingi proses pencarian properti secara rapi dan objektif.",
  },
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function fmtRp(n) {
  return "Rp " + Number(n || 0).toLocaleString("id-ID");
}

function validateEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim());
}

function onlyDigits(v) {
  return String(v || "").replace(/\D/g, "");
}

function safeGetJSON(key, fallback) {
  try {
    if (typeof window === "undefined" || !window.localStorage) return fallback;
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function safeSetJSON(key, value) {
  try {
    if (typeof window === "undefined" || !window.localStorage) return;
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Preview extension bisa membatasi storage.
  }
}

function safeOpenExternal(url) {
  try {
    const w = window.open(url, "_blank", "noopener,noreferrer");
    if (!w) window.location.href = url;
  } catch {
    alert(`Silakan buka tautan ini secara manual:\n${url}`);
  }
}

function pageFromPath(pathname) {
  if (pathname.startsWith("/agent/login")) return "login";
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/contact")) return "contact";
  return "landing";
}

const routes = {
  landing: "/",
  about: "/about",
  contact: "/contact",
  login: "/agent/login",
};

function readInitialPage() {
  if (typeof window === "undefined") return "landing";
  const hash = (window.location.hash || "").replace(/^#/, "");
  if (hash) return pageFromPath(hash.startsWith("/") ? hash : `/${hash}`);
  return pageFromPath(window.location.pathname || "/");
}

function useClientRouter() {
  const [page, setPage] = useState(readInitialPage);

  useEffect(() => {
    const sync = () => setPage(readInitialPage());
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, []);

  const navigate = (to) => {
    const path = routes[to] || to;
    setPage(pageFromPath(path));

    try {
      const isWeb = window.location.protocol === "http:" || window.location.protocol === "https:";
      if (isWeb) window.history.pushState({}, "", path);
      // Di JSX Opener / chrome-extension / blob / file, biarkan React state saja.
    } catch {
      // Abaikan manipulasi URL agar tidak muncul error Uncaught di preview extension.
    }

    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      window.scrollTo(0, 0);
    }
  };

  return { page, navigate };
}

function Svg({ children, size = 20, strokeWidth = 1.8, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <Svg>
      <path d="M12 3l7 3v5c0 4.5-2.8 7.4-7 10-4.2-2.6-7-5.5-7-10V6l7-3z" />
      <path d="M9.5 12.2l1.8 1.8 3.4-4" />
    </Svg>
  );
}

function CoinsIcon() {
  return (
    <Svg>
      <ellipse cx="12" cy="7" rx="5.5" ry="2.5" />
      <path d="M6.5 7v6c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5V7" />
      <path d="M6.5 10c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5" />
    </Svg>
  );
}

function PinIcon() {
  return (
    <Svg>
      <path d="M12 21s-5.5-5.4-5.5-10a5.5 5.5 0 1111 0c0 4.6-5.5 10-5.5 10z" />
      <circle cx="12" cy="11" r="1.8" />
    </Svg>
  );
}

function SparklesIcon() {
  return (
    <Svg>
      <path d="M12 4l1.3 3.2 3.2 1.3-3.2 1.3L12 13l-1.3-3.2-3.2-1.3 3.2-1.3L12 4z" />
      <path d="M18.5 14.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8z" />
      <path d="M6 15.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1z" />
    </Svg>
  );
}

function UserArrowIcon() {
  return (
    <Svg size={16} strokeWidth={1.9}>
      <circle cx="10" cy="8" r="3" />
      <path d="M5.5 17c1.2-2.2 3-3.2 4.5-3.2S13.3 14.8 14.5 17" />
      <path d="M15 10h5" />
      <path d="M17.5 7.5L20 10l-2.5 2.5" />
    </Svg>
  );
}

function HomeSearchIcon() {
  return (
    <Svg size={18} strokeWidth={1.8}>
      <path d="M4 11.2L12 4l8 7.2" />
      <path d="M6.5 10.5V20h6" />
      <path d="M17.5 20a3 3 0 100-6 3 3 0 000 6z" />
      <path d="M19.7 19.7L21 21" />
    </Svg>
  );
}

function ArrowRightIcon() {
  return (
    <Svg size={17}>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </Svg>
  );
}

function XIcon() {
  return (
    <Svg size={18}>
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </Svg>
  );
}

function WhyIcon({ kind }) {
  const map = {
    verified: <ShieldCheckIcon />,
    price: <CoinsIcon />,
    location: <PinIcon />,
    team: <SparklesIcon />,
  };

  return <div className="soft-icon h-10 w-10 transition duration-300 group-hover:-translate-y-1 group-hover:scale-105">{map[kind] || <SparklesIcon />}</div>;
}

function SectionEyebrow({ children, light = false }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <span className="h-px w-5 bg-prime-gold" />
      <span className={cn("text-[9px] font-extrabold uppercase tracking-[0.24em]", light ? "text-prime-gold" : "text-prime-gold")}>{children}</span>
    </div>
  );
}

function Wordmark({ light = true, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Prime Property Home"
      className={cn("group flex items-center gap-3 text-left", onClick ? "cursor-pointer" : "cursor-default")}
    >
      <span className="h-3.5 w-3.5 flex-none rotate-45 bg-prime-gold transition duration-300 group-hover:scale-110" />
      <span>
        <span className={cn("block text-sm font-extrabold uppercase leading-none tracking-[0.18em]", light ? "text-white" : "text-prime-black")}>
          Prime Property
        </span>
        <span className="mt-1 block text-[8px] font-semibold uppercase tracking-[0.22em] text-prime-gold">
          Premium Real Estate · Medan
        </span>
      </span>
    </button>
  );
}

function StatusTag({ status, siap }) {
  if (status === "sold_out") {
    return (
      <span className="inline-flex whitespace-nowrap rounded-full bg-prime-red/10 px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em] text-prime-red">
        Sold Out
      </span>
    );
  }

  const map = {
    siap_huni: "bg-prime-gold/15 text-prime-gold",
    siap_kosong: "bg-prime-purple/10 text-prime-purple",
    siap_huni_renovasi: "bg-prime-green/10 text-prime-green",
  };

  const label = {
    siap_huni: "Siap Huni",
    siap_kosong: "Siap Kosong",
    siap_huni_renovasi: "Renovasi",
  }[siap] || "Siap Huni";

  return (
    <span className={cn("inline-flex whitespace-nowrap rounded-full px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em]", map[siap] || map.siap_huni)}>
      {label}
    </span>
  );
}

function TypeBadge({ type }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em]",
        type === "Villa" ? "bg-prime-purple/10 text-prime-purple" : "bg-prime-gold/15 text-prime-gold"
      )}
    >
      {type}
    </span>
  );
}

function PrimaryCTA({ children, onClick, type = "button", disabled = false, icon = <HomeSearchIcon /> }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "group inline-flex items-center gap-3 rounded-2xl bg-prime-gold px-5 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-prime-black shadow-gold transition duration-300",
        "hover:-translate-y-0.5 hover:bg-[#d3b46f] active:translate-y-0",
        disabled && "cursor-not-allowed opacity-60 hover:translate-y-0"
      )}
    >
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-prime-black/10 text-prime-black transition duration-300 group-hover:rotate-3 group-hover:scale-105">
        {icon}
      </span>
      <span>{children}</span>
    </button>
  );
}

function LoginAgentButton({ onClick, mobile = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group inline-flex items-center justify-center gap-3 rounded-2xl px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-prime-gold transition duration-300",
        "border-0 outline-none hover:-translate-y-0.5 hover:bg-white/[0.06] active:translate-y-0",
        mobile && "w-full bg-prime-gold/10 py-3"
      )}
    >
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-prime-gold/10 text-prime-gold transition duration-300 group-hover:scale-105 group-hover:bg-prime-gold/15">
        <UserArrowIcon />
      </span>
      <span>Login Agent</span>
    </button>
  );
}

function Header({ currentPage, navigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 48);
    h();
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = (page) => {
    setMenuOpen(false);
    navigate(page);
  };

  const navItems = [
    ["landing", "Beranda"],
    ["about", "Tentang Kami"],
    ["contact", "Kontak"],
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b px-6 transition-all duration-500 sm:px-8",
        scrolled || menuOpen ? "border-prime-gold/15 bg-prime-black/95 backdrop-blur-xl" : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between">
        <Wordmark light onClick={() => go("landing")} />

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => go(id)}
              className={cn(
                "text-sm font-bold transition duration-300 hover:text-white",
                currentPage === id ? "text-white" : "text-white/50"
              )}
            >
              {label}
            </button>
          ))}

          {SHOW_AGENT_LOGIN_IN_PUBLIC_NAV && <LoginAgentButton onClick={() => go("login")} />}
        </nav>

        <button
          type="button"
          aria-label="Buka menu"
          onClick={() => setMenuOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-prime-gold/25 text-prime-gold md:hidden"
        >
          <span className="space-y-1.5">
            <span className="block h-px w-5 bg-current" />
            <span className="block h-px w-5 bg-current" />
            <span className="block h-px w-5 bg-current" />
          </span>
        </button>
      </div>

      {menuOpen && (
        <div className="mx-auto max-w-[1200px] pb-5 md:hidden">
          <div className="animate-fade-up border-t border-white/5 pt-2">
            {navItems.map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => go(id)}
                className={cn(
                  "block w-full border-b border-white/5 py-4 text-left text-sm font-bold",
                  currentPage === id ? "text-white" : "text-white/60"
                )}
              >
                {label}
              </button>
            ))}

            {SHOW_AGENT_LOGIN_IN_PUBLIC_NAV && (
              <div className="pt-4">
                <LoginAgentButton onClick={() => go("login")} mobile />
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

function Hero({ navigate }) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-prime-black py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-[linear-gradient(125deg,transparent_55%,rgba(201,169,97,0.035)_100%)]" />
        <div className="absolute left-6 top-[22%] h-[56%] w-px bg-gradient-to-b from-transparent via-prime-gold/25 to-transparent sm:left-20" />
        <div className="absolute left-[45%] top-1/4 h-px w-[55%] bg-gradient-to-r from-transparent via-prime-gold/10 to-transparent" />
        <div className="absolute left-[45%] top-3/4 h-px w-[55%] bg-gradient-to-r from-transparent via-prime-gold/10 to-transparent" />
        <div className="absolute right-[12%] top-[18%] h-56 w-56 animate-float-slow rounded-full bg-prime-gold/5 blur-3xl" />
      </div>

      <div className="container-prime relative">
        <div className="max-w-3xl animate-fade-up">
          <SectionEyebrow light>Medan · Sumatera Utara · Indonesia</SectionEyebrow>

          <h1 className="max-w-3xl text-4xl font-black leading-[1.03] tracking-[-0.045em] text-white sm:text-6xl lg:text-[76px]">
            Properti Premium
            <br />
            <span className="text-prime-gold">Pilihan Terbaik</span>
            <br />
            untuk Anda
          </h1>

          <p className="mt-6 max-w-lg text-sm leading-8 text-white/55 sm:text-base">
            Temukan ruko dan villa terbaik di kawasan strategis Medan. Setiap unit terverifikasi,
            harga transparan, dan proses dibantu oleh tim profesional.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <PrimaryCTA
              onClick={() => document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" })}
            >
              Lihat Properti
            </PrimaryCTA>

            <button
              type="button"
              onClick={() => navigate("contact")}
              className="group inline-flex items-center gap-2 rounded-2xl px-2 py-3 text-sm font-semibold text-white/55 transition duration-300 hover:text-white"
            >
              Hubungi Kami
              <span className="text-prime-gold transition duration-300 group-hover:translate-x-1">
                <ArrowRightIcon />
              </span>
            </button>
          </div>

          <div className="mt-16 flex flex-wrap gap-9 border-t border-prime-gold/15 pt-7 sm:gap-14">
            {[
              { n: "200+", l: "Unit Tersedia" },
              { n: "15+", l: "Kawasan Premium" },
              { n: "10 Thn", l: "Pengalaman" },
            ].map((s) => (
              <div key={s.l} className="animate-fade-up">
                <div className="text-3xl font-black leading-none tracking-[-0.04em] text-white sm:text-4xl">
                  {s.n}
                </div>
                <div className="mt-2 text-[9px] font-bold uppercase tracking-[0.16em] text-white/30">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PropertyRow({ prop, onSelect }) {
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onSelect(prop)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(prop);
        }
      }}
      className="group relative cursor-pointer border-b border-prime-black/5 bg-white transition duration-300 hover:bg-prime-soft"
    >
      <div className="absolute inset-y-0 left-0 w-0.5 bg-prime-gold opacity-0 transition duration-300 group-hover:opacity-100" />

      <div className="grid gap-4 px-0 py-5 sm:px-4 lg:grid-cols-[88px_minmax(0,1fr)_118px_70px_54px_112px_172px] lg:items-center">
        <img
          src={prop.image}
          alt={`Foto ${prop.name}`}
          loading="lazy"
          className="h-48 w-full rounded-2xl object-cover shadow-sm transition duration-500 group-hover:scale-[1.01] group-hover:saturate-110 sm:h-56 lg:h-16 lg:w-[88px] lg:rounded-xl"
        />

        <div className="min-w-0">
          <h3 className="truncate text-sm font-extrabold tracking-[-0.01em] text-prime-black">{prop.name}</h3>
          <p className="mt-1 text-xs text-prime-black/45">{prop.group || "Tanpa group"}</p>
          <p className="mt-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-prime-gold">
            Klik untuk lihat detail
          </p>
        </div>

        <div className="hidden text-xs text-prime-black/45 lg:block">
          {prop.lebar} × {prop.panjang} m
        </div>

        <div className="hidden lg:block">
          <TypeBadge type={prop.tipe} />
        </div>

        <div className="hidden text-xs text-prime-black/45 lg:block">{prop.tingkat} lt</div>
        <div className="hidden text-xs text-prime-black/45 lg:block">{prop.kawasan}</div>

        <div className="flex flex-wrap items-center gap-2 lg:flex-col lg:items-end">
          <span className="whitespace-nowrap text-sm font-black text-prime-black">{fmtRp(prop.price)}</span>
          <StatusTag status={prop.status} siap={prop.siap} />
        </div>

        <div className="flex flex-wrap gap-2 lg:hidden">
          <TypeBadge type={prop.tipe} />
          <span className="rounded-full bg-prime-black/5 px-3 py-1 text-[11px] font-semibold text-prime-black/55">
            {prop.lebar} × {prop.panjang} m
          </span>
          <span className="rounded-full bg-prime-black/5 px-3 py-1 text-[11px] font-semibold text-prime-black/55">
            {prop.kawasan}
          </span>
        </div>
      </div>
    </article>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="border-b border-prime-black/10 py-3">
      <div className="mb-1 text-[8px] font-black uppercase tracking-[0.18em] text-prime-black/40">{label}</div>
      <div className="text-sm font-bold leading-6 text-prime-black">{value}</div>
    </div>
  );
}

function PropertyDetailDrawer({ property, onClose }) {
  useEffect(() => {
    if (!property) return undefined;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [property, onClose]);

  if (!property) return null;

  const siapLabel = {
    siap_huni: "Siap Huni",
    siap_kosong: "Siap Kosong",
    siap_huni_renovasi: "Siap Huni Renovasi",
  }[property.siap] || "Siap Huni";

  return (
    <>
      <div
        className="fixed inset-0 z-[70] animate-fade-in bg-prime-black/55 backdrop-blur-sm"
        onClick={onClose}
      />

      <aside
        role="dialog"
        aria-modal="true"
        className="fixed bottom-0 right-0 top-0 z-[71] w-full max-w-[500px] animate-slide-in-right overflow-y-auto bg-white shadow-soft"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-prime-black/10 bg-white/95 p-5 backdrop-blur-xl">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-prime-gold">Detail Properti</p>
            <h2 className="mt-1 text-xl font-black tracking-[-0.03em] text-prime-black">{property.name}</h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-2xl bg-prime-soft text-prime-black transition duration-300 hover:rotate-90 hover:bg-prime-red/10 hover:text-prime-red"
            aria-label="Tutup detail"
          >
            <XIcon />
          </button>
        </div>

        <div className="relative">
          <img src={property.image} alt={`Foto ${property.name}`} className="h-64 w-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-prime-black/55 to-transparent p-5">
            <div className="flex flex-wrap gap-2">
              <TypeBadge type={property.tipe} />
              <StatusTag status={property.status} siap={property.siap} />
            </div>
          </div>
        </div>

        <div className="space-y-6 p-5">
          <section className="animate-fade-up rounded-3xl bg-prime-soft p-5">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-prime-black/40">Harga</p>
            <p className="mt-1 text-3xl font-black tracking-[-0.05em] text-prime-black">{fmtRp(property.price)}</p>
            <p className="mt-2 text-sm leading-6 text-prime-black/55">
              {property.group ? `${property.group} · ` : ""}{property.kawasan}
            </p>
          </section>

          <section className="animate-fade-up grid gap-x-5 md:grid-cols-2">
            <div>
              <DetailRow label="Nama Properti" value={property.name} />
              <DetailRow label="Group" value={property.group || "-"} />
              <DetailRow label="Ukuran" value={`${property.lebar} × ${property.panjang} meter`} />
              <DetailRow label="Hadap" value={property.hadap} />
              <DetailRow label="Tipe" value={property.tipe} />
            </div>
            <div>
              <DetailRow label="Tingkat" value={`${property.tingkat} lantai`} />
              <DetailRow label="Carport" value={property.carport ? "Ya" : "Tidak"} />
              <DetailRow label="Status" value={property.status === "sold_out" ? "Sold Out" : "In Stock"} />
              <DetailRow label="Kondisi" value={siapLabel} />
              <DetailRow label="Kawasan" value={property.kawasan} />
            </div>
          </section>

          <section className="animate-fade-up rounded-3xl border border-prime-gold/20 bg-prime-gold/5 p-5">
            <h3 className="text-sm font-black text-prime-black">Ringkasan</h3>
            <p className="mt-2 text-sm leading-7 text-prime-black/60">
              {property.name} adalah {property.tipe.toLowerCase()} di kawasan {property.kawasan} dengan
              ukuran {property.lebar} × {property.panjang} meter, hadap {property.hadap}, terdiri dari{" "}
              {property.tingkat} lantai, dan {property.carport ? "sudah memiliki" : "belum memiliki"} carport.
            </p>
          </section>

          {property.maps_link && (
            <button
              type="button"
              onClick={() => safeOpenExternal(property.maps_link)}
              className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-prime-black px-5 py-4 text-xs font-black uppercase tracking-[0.16em] text-prime-gold transition duration-300 hover:-translate-y-0.5 hover:bg-black"
            >
              <PinIcon />
              Buka di Google Maps
            </button>
          )}
        </div>
      </aside>
    </>
  );
}

function FeaturedSection() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <section id="featured" className="bg-white py-16 sm:py-24">
        <div className="container-prime">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <SectionEyebrow>Inventori Pilihan</SectionEyebrow>
              <h2 className="text-3xl font-black tracking-[-0.04em] text-prime-black sm:text-4xl">Properti Unggulan</h2>
            </div>
            <span className="text-xs font-semibold tracking-wide text-prime-black/45">{PROPERTIES.length} unit terpilih</span>
          </div>

          <div className="hidden border-b border-prime-black/5 px-4 pb-3 lg:grid lg:grid-cols-[88px_minmax(0,1fr)_118px_70px_54px_112px_172px] lg:gap-4">
            {["Foto", "Properti", "Ukuran", "Tipe", "Lantai", "Kawasan", "Harga & Status"].map((h, i) => (
              <div
                key={h}
                className={cn(
                  "text-[8px] font-black uppercase tracking-[0.22em] text-prime-black/40",
                  i === 6 && "text-right"
                )}
              >
                {h}
              </div>
            ))}
          </div>

          <div className="border-t border-prime-black/5 lg:border-t-0">
            {PROPERTIES.map((p) => (
              <PropertyRow key={p.id} prop={p} onSelect={setSelected} />
            ))}
          </div>
        </div>
      </section>

      <PropertyDetailDrawer property={selected} onClose={() => setSelected(null)} />
    </>
  );
}

function WhySection() {
  return (
    <section className="bg-prime-soft py-16 sm:py-24">
      <div className="container-prime">
        <div className="mb-14">
          <SectionEyebrow>Keunggulan Kami</SectionEyebrow>
          <h2 className="text-3xl font-black tracking-[-0.04em] text-prime-black sm:text-4xl">Mengapa Prime Property</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {WHY.map((item, i) => (
            <div
              key={item.title}
              className={cn(
                "group animate-fade-up border-prime-black/10 lg:px-7",
                i > 0 && "lg:border-l",
                i === 0 && "lg:pl-0",
                i === WHY.length - 1 && "lg:pr-0"
              )}
            >
              <WhyIcon kind={item.iconKey} />
              <h3 className="mt-5 text-base font-black tracking-[-0.01em] text-prime-black">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-prime-black/45">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PageHero({ eyebrow, title, desc }) {
  return (
    <section className="relative overflow-hidden bg-prime-black pt-32 pb-16 sm:pt-40 sm:pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_20%,rgba(201,169,97,0.10),transparent_32%)]" />
      <div className="container-prime relative animate-fade-up">
        <SectionEyebrow light>{eyebrow}</SectionEyebrow>
        <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-[-0.045em] text-white sm:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-8 text-white/55 sm:text-base">{desc}</p>
      </div>
    </section>
  );
}

function InfoBlock({ title, text }) {
  return (
    <div className="rounded-3xl border border-prime-black/5 bg-prime-soft p-5 transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      <h3 className="text-sm font-black text-prime-black">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-prime-black/55">{text}</p>
    </div>
  );
}

function AboutPage({ navigate, currentPage }) {
  return (
    <>
      <Header currentPage={currentPage} navigate={navigate} />
      <PageHero
        eyebrow="Tentang Prime Property"
        title="Membantu Anda memilih properti dengan data yang jelas."
        desc="Prime Property adalah platform properti premium untuk kawasan Medan dan sekitarnya, dengan fokus pada kurasi unit, transparansi harga, dan pendampingan profesional."
      />

      <main className="bg-white py-16 sm:py-24">
        <div className="container-prime grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <section className="animate-fade-up">
            <SectionEyebrow>Profil Perusahaan</SectionEyebrow>
            <h2 className="text-3xl font-black tracking-[-0.04em] text-prime-black sm:text-4xl">
              Platform kurasi properti premium berbasis kepercayaan.
            </h2>
            <p className="mt-5 text-sm leading-8 text-prime-black/60">
              Kami membantu calon pembeli dan investor menemukan ruko, villa, dan hunian pilihan melalui data
              listing yang ringkas, akurat, dan mudah dibandingkan. Setiap informasi inti seperti ukuran,
              kawasan, status unit, carport, dan harga ditampilkan secara jelas.
            </p>
            <p className="mt-4 text-sm leading-8 text-prime-black/60">
              Pendekatan kami sederhana: tampilkan data yang penting, kurasi unit yang relevan, dan jaga proses
              komunikasi tetap profesional dari awal pencarian sampai tahap kunjungan lokasi.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <InfoBlock title="Visi" text="Menjadi platform properti premium paling dipercaya untuk pasar Medan dan Sumatera Utara." />
              <InfoBlock title="Misi" text="Menyediakan informasi listing yang terverifikasi, transparan, dan mudah diakses oleh calon pembeli." />
            </div>
          </section>

          <aside className="relative min-h-[420px] overflow-hidden rounded-[2rem] bg-prime-black p-8 text-white shadow-soft sm:p-10">
            <div className="absolute -right-20 -top-20 h-64 w-64 rotate-45 border border-prime-gold/20" />
            <div className="relative animate-fade-up">
              <div className="mb-8 text-7xl leading-none text-prime-gold">“</div>
              <blockquote className="text-3xl font-black leading-tight tracking-[-0.04em]">
                Properti yang baik bukan hanya soal lokasi, tetapi juga kejelasan data dan proses yang aman.
              </blockquote>
              <p className="mt-6 text-sm leading-8 text-white/35">
                Nilai kami: transparansi, ketelitian, respons cepat, dan komunikasi yang rapi dengan calon pembeli
                maupun pemilik listing.
              </p>
            </div>
          </aside>
        </div>
      </main>

      <Footer navigate={navigate} />
    </>
  );
}

function ContactCard({ label, value, href }) {
  return (
    <div className="border-b border-prime-black/10 py-4">
      <p className="mb-2 text-[8px] font-black uppercase tracking-[0.22em] text-prime-gold">{label}</p>
      {href ? (
        <button
          type="button"
          onClick={() => safeOpenExternal(href)}
          className="text-sm font-black text-prime-black transition duration-300 hover:text-prime-gold"
        >
          {value} →
        </button>
      ) : (
        <p className="text-sm font-bold leading-7 text-prime-black">{value}</p>
      )}
    </div>
  );
}

function FieldError({ children }) {
  return <p className="mt-2 text-xs leading-5 text-prime-red">{children}</p>;
}

function PublicInput({ label, value, onChange, error, textarea = false }) {
  return (
    <div className="mb-5">
      <label className="field-label">{label}</label>
      {textarea ? (
        <textarea className={cn("field-input min-h-32 resize-y", error && "border-prime-red")} value={value} onChange={onChange} />
      ) : (
        <input className={cn("field-input", error && "border-prime-red")} value={value} onChange={onChange} />
      )}
      {error && <FieldError>{error}</FieldError>}
    </div>
  );
}

function ContactForm({ onSuccess }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Nama wajib diisi.";
    if (!form.email.trim()) next.email = "Email wajib diisi.";
    else if (!validateEmail(form.email)) next.email = "Format email tidak valid.";
    if (!form.phone.trim()) next.phone = "Nomor HP wajib diisi.";
    else if (onlyDigits(form.phone).length < 10) next.phone = "Nomor HP minimal 10 digit.";
    if (!form.message.trim()) next.message = "Pesan wajib diisi.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const checkContactRateLimit = () => {
    const key = "prime_contact_submit_log";
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    const log = safeGetJSON(key, []).filter((t) => now - t < oneHour);
    if (log.length >= 3) return false;
    safeSetJSON(key, [...log, now]);
    return true;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (!checkContactRateLimit()) {
      setErrors({ message: "Batas submit tercapai. Coba lagi beberapa saat nanti." });
      return;
    }

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 650));
    setSubmitting(false);
    setForm({ name: "", email: "", phone: "", message: "" });
    onSuccess("Pesan terkirim, tim kami akan menghubungi Anda.");
  };

  return (
    <form onSubmit={submit} className="animate-fade-up rounded-[2rem] border border-prime-black/5 bg-prime-soft p-6 sm:p-8">
      <SectionEyebrow>Form Kontak</SectionEyebrow>
      <h2 className="mb-6 text-3xl font-black tracking-[-0.04em] text-prime-black">Kirim pesan</h2>

      <PublicInput label="Nama" value={form.name} onChange={set("name")} error={errors.name} />
      <PublicInput label="Email" value={form.email} onChange={set("email")} error={errors.email} />
      <PublicInput label="Nomor HP" value={form.phone} onChange={set("phone")} error={errors.phone} />
      <PublicInput label="Pesan" value={form.message} onChange={set("message")} error={errors.message} textarea />

      {errors.message && errors.message.includes("Batas") && <FieldError>{errors.message}</FieldError>}

      <PrimaryCTA type="submit" disabled={submitting} icon={<ArrowRightIcon />}>
        {submitting ? "Mengirim..." : "Kirim Pesan"}
      </PrimaryCTA>
    </form>
  );
}

function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    if (!message) return undefined;
    const timer = setTimeout(onClose, 3200);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={cn("fixed bottom-6 right-6 z-[90] max-w-sm animate-fade-up rounded-2xl border p-4 text-sm leading-6 shadow-soft", type === "error" ? "border-white/20 bg-prime-red text-white" : "border-prime-gold/30 bg-prime-black text-white")}>
      <b className={type === "error" ? "text-white" : "text-prime-gold"}>{type === "error" ? "Perhatian" : "Berhasil"}</b>
      <p>{message}</p>
    </div>
  );
}

function ContactPage({ navigate, currentPage }) {
  const [toast, setToast] = useState(null);

  return (
    <>
      <Header currentPage={currentPage} navigate={navigate} />
      <PageHero
        eyebrow="Kontak Prime Property"
        title="Diskusikan kebutuhan properti Anda dengan tim kami."
        desc="Kirim pesan melalui form atau hubungi kami langsung lewat telepon, email, dan WhatsApp."
      />

      <main className="bg-white py-16 sm:py-24">
        <div className="container-prime grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <section className="animate-fade-up">
            <SectionEyebrow>Informasi Kontak</SectionEyebrow>
            <h2 className="text-3xl font-black tracking-[-0.04em] text-prime-black sm:text-4xl">Hubungi kantor kami.</h2>

            <div className="mt-6">
              <ContactCard label="Alamat" value={CONTACT_INFO.address} />
              <ContactCard label="Telepon" value={CONTACT_INFO.phone} />
              <ContactCard label="Email" value={CONTACT_INFO.email} />
              <ContactCard label="WhatsApp" value="Chat via WhatsApp" href={CONTACT_INFO.whatsapp} />
            </div>

            <div className="mt-6 grid min-h-56 place-items-center rounded-[2rem] border border-prime-black/5 bg-prime-soft p-8 text-center">
              <div>
                <div className="mx-auto mb-4 w-fit">
                  <WhyIcon kind="location" />
                </div>
                <p className="text-sm leading-7 text-prime-black/45">
                  Area Google Maps dapat dipasang di sini jika koordinat kantor sudah tersedia.
                </p>
              </div>
            </div>
          </section>

          <ContactForm onSuccess={(msg) => setToast(msg)} />
        </div>
      </main>

      <Footer navigate={navigate} />
      <Toast message={toast} onClose={() => setToast(null)} />
    </>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="bg-prime-black py-12 text-white sm:py-16">
      <div className="container-prime">
        <div className="flex flex-wrap justify-between gap-10">
          <div className="max-w-xs">
            <Wordmark light onClick={() => navigate("landing")} />
            <p className="mt-5 text-sm leading-7 text-white/25">
              Platform properti premium untuk kawasan Medan dan sekitarnya. Verifikasi ketat, data ringkas, harga transparan.
            </p>
          </div>

          <div>
            <p className="mb-4 text-[8px] font-black uppercase tracking-[0.22em] text-prime-gold">Kontak</p>
            {[
              ["Telepon", CONTACT_INFO.phone],
              ["WhatsApp", "wa.me/6281234567890"],
              ["Email", CONTACT_INFO.email],
            ].map(([k, v]) => (
              <p key={k} className="mb-2 text-xs text-white/45">
                <span className="text-white/25">{k}: </span>
                {v}
              </p>
            ))}
          </div>

          <div>
            <p className="mb-4 text-[8px] font-black uppercase tracking-[0.22em] text-prime-gold">Navigasi</p>
            {[
              ["landing", "Beranda"],
              ["about", "Tentang Kami"],
              ["contact", "Kontak"],
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => navigate(id)}
                className="mb-2 block text-sm text-white/45 transition duration-300 hover:text-prime-gold"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-prime-gold/10 pt-6">
          <p className="text-xs text-white/20">© 2026 Prime Property. Seluruh hak cipta dilindungi.</p>
          <p className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.18em] text-white/20">
            <span className="h-1 w-1 rotate-45 bg-prime-gold/50" />
            Premium Real Estate Medan
          </p>
        </div>
      </div>
    </footer>
  );
}

const LOGIN_LOCK_KEY = "prime_agent_login_lock_v1";
const LOGIN_WINDOW_MS = 30 * 60 * 1000;
const LOGIN_LOCK_MS = 15 * 60 * 1000;
const MAX_LOGIN_ATTEMPTS = 5;

function getLoginState(email) {
  const all = safeGetJSON(LOGIN_LOCK_KEY, {});
  return all[String(email || "").toLowerCase()] || { failedAt: [], lockUntil: 0 };
}

function setLoginState(email, next) {
  const key = String(email || "").toLowerCase();
  const all = safeGetJSON(LOGIN_LOCK_KEY, {});
  all[key] = next;
  safeSetJSON(LOGIN_LOCK_KEY, all);
}

function clearLoginState(email) {
  const key = String(email || "").toLowerCase();
  const all = safeGetJSON(LOGIN_LOCK_KEY, {});
  delete all[key];
  safeSetJSON(LOGIN_LOCK_KEY, all);
}

function InputFieldDark({ label, type = "text", value, onChange, error, placeholder }) {
  return (
    <div className="mb-5">
      <label className="mb-2 block text-[8px] font-black uppercase tracking-[0.22em] text-white/35">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={type === "password" ? "current-password" : "email"}
        className={cn("field-input-dark", error && "border-prime-red")}
      />
      {error && <FieldError>{error}</FieldError>}
    </div>
  );
}

function LoginPage({ navigate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [lockUntil, setLockUntil] = useState(0);

  const locked = lockUntil > Date.now();
  const lockedMinutes = Math.ceil(Math.max(lockUntil - Date.now(), 0) / 60000);

  useEffect(() => {
    if (!email.trim()) {
      setLockUntil(0);
      return;
    }
    const state = getLoginState(email.trim());
    setLockUntil(state.lockUntil || 0);
  }, [email]);

  const validate = () => {
    const next = {};
    if (!email.trim()) next.email = "Email wajib diisi.";
    else if (!validateEmail(email)) next.email = "Gunakan format email yang valid.";
    if (!password) next.password = "Password wajib diisi.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const recordFailure = () => {
    const now = Date.now();
    const state = getLoginState(email.trim());
    const recent = (state.failedAt || []).filter((t) => now - t <= LOGIN_WINDOW_MS);
    const nextFailed = [...recent, now];
    const next = { failedAt: nextFailed, lockUntil: state.lockUntil || 0 };

    if (nextFailed.length >= MAX_LOGIN_ATTEMPTS) {
      next.lockUntil = now + LOGIN_LOCK_MS;
      setLockUntil(next.lockUntil);
      setMessage("Akun dikunci sementara selama 15 menit karena 5x gagal login dalam 30 menit.");
    } else {
      setMessage(`Email atau password tidak valid. Percobaan ${nextFailed.length} dari ${MAX_LOGIN_ATTEMPTS}.`);
    }

    setLoginState(email.trim(), next);
  };

  const mockLoginRequest = async () => {
    await new Promise((resolve) => setTimeout(resolve, 720));
    return email.trim().toLowerCase() === "agent@primeproperty.id" && password === "Prime12345!";
  };

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (loading) return;
    if (!validate()) return;

    const state = getLoginState(email.trim());
    if ((state.lockUntil || 0) > Date.now()) {
      setLockUntil(state.lockUntil);
      setMessage(`Akun masih terkunci. Coba lagi sekitar ${lockedMinutes || 15} menit lagi.`);
      return;
    }

    setLoading(true);
    try {
      const ok = await mockLoginRequest();
      if (!ok) {
        recordFailure();
        return;
      }

      clearLoginState(email.trim());
      setPassword("");
      setMessage("Login berhasil. Backend production perlu mengirim httpOnly cookie SameSite=Lax berlaku 30 hari.");
    } catch {
      recordFailure();
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-prime-black p-6">
      <div className="absolute right-[12%] top-[12%] h-80 w-80 animate-float-slow rounded-full bg-prime-gold/5 blur-3xl" />
      <div className="absolute bottom-[15%] left-[8%] h-56 w-56 rounded-full bg-prime-gold/5 blur-3xl" />

      <button
        type="button"
        onClick={() => navigate("landing")}
        className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-2xl px-2 py-2 text-xs font-semibold text-white/55 transition duration-300 hover:bg-white/5 hover:text-white"
      >
        <span className="text-prime-gold">←</span>
        Kembali ke Beranda
      </button>

      <div className="relative w-full max-w-[430px] animate-fade-up">
        <div className="mb-10 flex justify-center">
          <Wordmark light onClick={() => navigate("landing")} />
        </div>

        <form onSubmit={submit} className="rounded-[2rem] border border-prime-gold/15 bg-white/[0.026] p-7 shadow-soft backdrop-blur-xl sm:p-10">
          <SectionEyebrow light>Portal Internal</SectionEyebrow>

          <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-prime-gold/10 text-prime-gold shadow-gold">
            <UserArrowIcon />
          </div>

          <h1 className="text-2xl font-black tracking-[-0.04em] text-white">Masuk ke Dashboard</h1>
          <p className="mt-2 text-sm leading-6 text-white/25">
            Akses internal untuk admin dan superadmin Prime Property. Tidak ada self-registration.
          </p>

          <div className="my-7 h-px bg-prime-gold/15" />

          <InputFieldDark
            label="Email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((er) => ({ ...er, email: "" }));
            }}
            placeholder="agent@primeproperty.id"
            error={errors.email}
          />

          <InputFieldDark
            label="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((er) => ({ ...er, password: "" }));
            }}
            placeholder="••••••••••"
            error={errors.password}
          />

          {message && (
            <div
              className={cn(
                "mb-5 rounded-2xl border p-3 text-xs leading-6",
                message.includes("berhasil")
                  ? "border-prime-gold/30 bg-prime-gold/10 text-prime-gold"
                  : "border-prime-red/35 bg-prime-red/10 text-prime-red"
              )}
            >
              {message}
            </div>
          )}

          <PrimaryCTA type="submit" disabled={locked || loading} icon={<UserArrowIcon />}>
            {loading ? "Memverifikasi..." : locked ? `Terkunci ${lockedMinutes} menit` : "Masuk"}
          </PrimaryCTA>

          <p className="mt-5 text-center text-[10px] leading-5 text-white/25">
            Demo login: agent@primeproperty.id / Prime12345!
            <br />
            Akun asli dibuat manual oleh superadmin.
          </p>
        </form>

        <p className="mt-5 flex items-center justify-center gap-2 text-[8px] font-bold uppercase tracking-[0.18em] text-white/20">
          <span className="h-1 w-1 rotate-45 bg-prime-gold/40" />
          Koneksi Aman · Session via httpOnly Cookie
          <span className="h-1 w-1 rotate-45 bg-prime-gold/40" />
        </p>
      </div>
    </main>
  );
}

function LandingPage({ navigate, currentPage }) {
  return (
    <>
      <Header currentPage={currentPage} navigate={navigate} />
      <Hero navigate={navigate} />
      <FeaturedSection />
      <WhySection />
      <Footer navigate={navigate} />
    </>
  );
}

export default function App() {
  const { page, navigate } = useClientRouter();

  const renderedPage = useMemo(() => {
    if (page === "login") return <LoginPage navigate={navigate} />;
    if (page === "about") return <AboutPage currentPage={page} navigate={navigate} />;
    if (page === "contact") return <ContactPage currentPage={page} navigate={navigate} />;
    return <LandingPage currentPage={page} navigate={navigate} />;
  }, [page, navigate]);

  return renderedPage;
}
