import { useEffect, useMemo, useState } from "react";

const DEFAULT_LANG = "en";

const CONTACT_INFO = {
  phone: "+62 812-3456-7890",
  whatsapp: "https://wa.me/6281234567890",
  email: "info@primeproperty.id",
  address: "Jl. Krakatau No. 88, Medan, North Sumatra",
};

const COPY = {
  en: {
    brandSub: "Premium Real Estate · Medan",
    navHome: "Home",
    navAbout: "About Us",
    navContact: "Contact",
    loginAgent: "Agent Login",
    backHome: "Back to Home",
    language: "Language",
    heroEyebrow: "Medan · North Sumatra · Indonesia",
    heroTitleA: "Premium Properties",
    heroTitleB: "Curated for",
    heroTitleC: "Your Next Move",
    heroDesc:
      "Discover selected shophouses and villas in strategic areas of Medan. Every listing is verified, clearly priced, and supported by a professional team.",
    viewProperties: "View Properties",
    contactUs: "Contact Us",
    statsUnits: "Available Units",
    statsAreas: "Prime Areas",
    statsExperience: "Experience",
    featuredEyebrow: "Curated Inventory",
    featuredTitle: "Featured Properties",
    selectedUnits: "selected units",
    tablePhoto: "Photo",
    tableProperty: "Property",
    tableSize: "Size",
    tableType: "Type",
    tableFloors: "Floors",
    tableArea: "Area",
    tablePriceStatus: "Price & Status",
    clickDetail: "Click to view details",
    noGroup: "No group",
    whyEyebrow: "Our Advantages",
    whyTitle: "Why Prime Property",
    why: [
      {
        iconKey: "verified",
        title: "Verified Portfolio",
        desc: "Every unit goes through a careful document verification process before it is published on our platform.",
      },
      {
        iconKey: "price",
        title: "Transparent Pricing",
        desc: "Prices are presented clearly and simply, so buyers can understand every offer with confidence.",
      },
      {
        iconKey: "location",
        title: "Strategic Locations",
        desc: "Our listings are located across premium areas in Medan, including Krakatau, Helvetia, Cemara Asri, and Pancing.",
      },
      {
        iconKey: "team",
        title: "Professional Team",
        desc: "Experienced agents guide each property search with clarity, speed, and objective recommendations.",
      },
    ],
    aboutEyebrow: "About Prime Property",
    aboutTitle: "Helping you choose property with clear, reliable data.",
    aboutDesc:
      "Prime Property is a premium real estate platform for Medan and surrounding areas, focused on curated listings, transparent pricing, and professional support.",
    aboutProfileEyebrow: "Company Profile",
    aboutHeading: "A trusted platform for curated premium properties.",
    aboutP1:
      "We help buyers and investors discover selected shophouses, villas, and residential properties through concise, accurate, and comparable listing data. Core details such as size, area, unit status, carport availability, and price are displayed clearly.",
    aboutP2:
      "Our approach is simple: present the data that matters, curate relevant units, and keep communication professional from the first search to the site visit.",
    vision: "Vision",
    visionText: "To become the most trusted premium real estate platform for Medan and North Sumatra.",
    mission: "Mission",
    missionText: "To provide verified, transparent, and accessible property information for every potential buyer.",
    quote:
      "A good property is not only about location. It is also about clear data and a safe process.",
    quoteDesc:
      "Our values are transparency, accuracy, fast response, and professional communication with buyers and property owners.",
    contactEyebrow: "Contact Prime Property",
    contactTitle: "Discuss your property needs with our team.",
    contactDesc: "Send us a message through the form or contact us directly by phone, email, and WhatsApp.",
    contactInfo: "Contact Information",
    contactHeading: "Reach our office.",
    address: "Address",
    phone: "Phone",
    email: "Email",
    whatsapp: "WhatsApp",
    chatWhatsapp: "Chat via WhatsApp",
    mapsPlaceholder: "A Google Maps embed can be placed here once the office coordinates are available.",
    contactForm: "Contact Form",
    sendMessage: "Send a Message",
    name: "Name",
    mobileNumber: "Mobile Number",
    message: "Message",
    send: "Send Message",
    sending: "Sending...",
    requiredName: "Name is required.",
    requiredEmail: "Email is required.",
    invalidEmail: "Please enter a valid email address.",
    requiredPhone: "Mobile number is required.",
    invalidPhone: "Mobile number must contain at least 10 digits.",
    requiredMessage: "Message is required.",
    rateLimit: "The submission limit has been reached. Please try again later.",
    sentSuccess: "Your message has been sent. Our team will contact you soon.",
    success: "Success",
    warning: "Attention",
    footerDesc:
      "A premium property platform for Medan and surrounding areas. Verified listings, concise data, and transparent pricing.",
    footerContact: "Contact",
    footerNav: "Navigation",
    copyright: "© 2026 Prime Property. All rights reserved.",
    premiumMedan: "Premium Real Estate Medan",
    detailTitle: "Property Details",
    dashboardProperty: "Property Dashboard",
    price: "Price",
    propertyName: "Property Name",
    group: "Group",
    size: "Size",
    facing: "Facing",
    unit: "Unit",
    floorCount: "Floors",
    carport: "Carport",
    status: "Status",
    condition: "Condition",
    area: "Area",
    updated: "Last Updated",
    summary: "Summary",
    maps: "Open in Google Maps",
    editProperty: "Edit Property",
    deleteProperty: "Delete / Archive",
    summaryText: ({ name, tipe, kawasan, lebar, panjang, hadap, tingkat, carport }) =>
      `${name} is a ${tipe.toLowerCase()} in ${kawasan}, measuring ${lebar} × ${panjang} meters, facing ${hadap}, with ${tingkat} floor(s), and ${carport ? "including" : "without"} a carport.`,
    loginEyebrow: "Internal Portal",
    loginTitle: "Sign in to Dashboard",
    loginDesc: "Internal access for Prime Property administrators and superadmins. Self-registration is not available.",
    password: "Password",
    signIn: "Sign In",
    verifying: "Verifying...",
    locked: "Locked",
    secureSession: "Secure Connection · Session via httpOnly Cookie",
    superadminDemo: "Superadmin: superadmin@primeproperty.id / Prime12345!",
    adminDemo: "Admin: agent@primeproperty.id / Prime12345!",
    emailRequired: "Email is required.",
    passwordRequired: "Password is required.",
    invalidLogin: "Invalid email or password.",
    lockMessage: "This account has been temporarily locked for 15 minutes after 5 failed login attempts within 30 minutes.",
    dashboardEyebrow: "Internal Agent Portal",
    dashboardTitle: (role) => `${role === "superadmin" ? "Superadmin" : "Admin"} Dashboard`,
    dashboardDesc:
      "This is a front-end mock backend powered by localStorage. In production, all CRUD actions, authorization, audit logs, and sessions must be handled by a secure backend API.",
    addProperty: "Add Property",
    activeListings: "Active Listings",
    inStock: "In Stock",
    soldOut: "Sold Out",
    archived: "Archived",
    managementTitle: "Property Listing Management",
    managementDescSuper: "Click a row to view details. Superadmins can create, update, and soft-delete listings.",
    managementDescAdmin: "Click a row to view details. Admins can only view and search listings.",
    searchPlaceholder: "Search name, group, area...",
    actions: "Actions",
    edit: "Edit",
    delete: "Delete",
    view: "View",
    emptySearch: "No property matches your search.",
    seeWebsite: "View Website",
    logout: "Logout",
    backendNote:
      "Agent Login is intentionally hidden from the public navbar. Internal users should access it directly through /agent/login.",
    superadminForm: "Superadmin Form",
    addPropertyTitle: "Add Property",
    editPropertyTitle: "Edit Property",
    width: "Width (m)",
    length: "Length (m)",
    imageUrl: "Image URL",
    mapsLink: "Google Maps Link",
    saveChanges: "Save Changes",
    createProperty: "Add Property",
    cancel: "Cancel",
    hasCarport: "Has carport",
    nameMin: "Property name must be at least 3 characters.",
    nameMax: "Property name must be no more than 100 characters.",
    widthInvalid: "Width must be greater than 0.",
    lengthInvalid: "Length must be greater than 0.",
    floorsInvalid: "Floors must be between 1 and 10.",
    priceInvalid: "Price is required and must be greater than 0.",
    areaRequired: "Area is required.",
    mapsInvalid: "The maps link must use a Google Maps URL.",
    propertyCreated: "The property has been added successfully.",
    propertyUpdated: "Property changes have been saved successfully.",
    propertyArchived: "The property has been moved to the archive.",
    confirmDelete: (name) => `Are you sure you want to delete ${name}? This action will move the listing to the archive.`,
  },
  id: {
    brandSub: "Premium Real Estate · Medan",
    navHome: "Beranda",
    navAbout: "Tentang Kami",
    navContact: "Kontak",
    loginAgent: "Login Agent",
    backHome: "Kembali ke Beranda",
    language: "Bahasa",
    heroEyebrow: "Medan · Sumatera Utara · Indonesia",
    heroTitleA: "Properti Premium",
    heroTitleB: "Pilihan Terbaik",
    heroTitleC: "untuk Anda",
    heroDesc:
      "Temukan ruko dan villa terbaik di kawasan strategis Medan. Setiap unit terverifikasi, harga transparan, dan proses dibantu oleh tim profesional.",
    viewProperties: "Lihat Properti",
    contactUs: "Hubungi Kami",
    statsUnits: "Unit Tersedia",
    statsAreas: "Kawasan Premium",
    statsExperience: "Pengalaman",
    featuredEyebrow: "Inventori Pilihan",
    featuredTitle: "Properti Unggulan",
    selectedUnits: "unit terpilih",
    tablePhoto: "Foto",
    tableProperty: "Properti",
    tableSize: "Ukuran",
    tableType: "Tipe",
    tableFloors: "Lantai",
    tableArea: "Kawasan",
    tablePriceStatus: "Harga & Status",
    clickDetail: "Klik untuk lihat detail",
    noGroup: "Tanpa group",
    whyEyebrow: "Keunggulan Kami",
    whyTitle: "Mengapa Prime Property",
    why: [
      {
        iconKey: "verified",
        title: "Portofolio Terverifikasi",
        desc: "Setiap unit melewati proses verifikasi dokumen menyeluruh sebelum dipublikasikan ke platform kami.",
      },
      {
        iconKey: "price",
        title: "Harga Transparan",
        desc: "Harga ditampilkan secara jelas dan sederhana agar calon pembeli memahami setiap penawaran dengan percaya diri.",
      },
      {
        iconKey: "location",
        title: "Lokasi Strategis",
        desc: "Listing kami tersebar di kawasan premium Medan, termasuk Krakatau, Helvetia, Cemara Asri, dan Pancing.",
      },
      {
        iconKey: "team",
        title: "Tim Profesional",
        desc: "Agen berpengalaman mendampingi proses pencarian properti dengan jelas, cepat, dan objektif.",
      },
    ],
    aboutEyebrow: "Tentang Prime Property",
    aboutTitle: "Membantu Anda memilih properti dengan data yang jelas.",
    aboutDesc:
      "Prime Property adalah platform properti premium untuk kawasan Medan dan sekitarnya, dengan fokus pada kurasi unit, transparansi harga, dan pendampingan profesional.",
    aboutProfileEyebrow: "Profil Perusahaan",
    aboutHeading: "Platform kurasi properti premium berbasis kepercayaan.",
    aboutP1:
      "Kami membantu calon pembeli dan investor menemukan ruko, villa, dan hunian pilihan melalui data listing yang ringkas, akurat, dan mudah dibandingkan. Informasi inti seperti ukuran, kawasan, status unit, carport, dan harga ditampilkan secara jelas.",
    aboutP2:
      "Pendekatan kami sederhana: tampilkan data yang penting, kurasi unit yang relevan, dan jaga komunikasi tetap profesional dari awal pencarian hingga kunjungan lokasi.",
    vision: "Visi",
    visionText: "Menjadi platform properti premium paling dipercaya untuk pasar Medan dan Sumatera Utara.",
    mission: "Misi",
    missionText: "Menyediakan informasi properti yang terverifikasi, transparan, dan mudah diakses oleh calon pembeli.",
    quote:
      "Properti yang baik bukan hanya soal lokasi, tetapi juga kejelasan data dan proses yang aman.",
    quoteDesc:
      "Nilai kami adalah transparansi, ketelitian, respons cepat, dan komunikasi profesional dengan pembeli maupun pemilik listing.",
    contactEyebrow: "Kontak Prime Property",
    contactTitle: "Diskusikan kebutuhan properti Anda dengan tim kami.",
    contactDesc: "Kirim pesan melalui form atau hubungi kami langsung lewat telepon, email, dan WhatsApp.",
    contactInfo: "Informasi Kontak",
    contactHeading: "Hubungi kantor kami.",
    address: "Alamat",
    phone: "Telepon",
    email: "Email",
    whatsapp: "WhatsApp",
    chatWhatsapp: "Chat via WhatsApp",
    mapsPlaceholder: "Area Google Maps dapat dipasang di sini jika koordinat kantor sudah tersedia.",
    contactForm: "Form Kontak",
    sendMessage: "Kirim Pesan",
    name: "Nama",
    mobileNumber: "Nomor HP",
    message: "Pesan",
    send: "Kirim Pesan",
    sending: "Mengirim...",
    requiredName: "Nama wajib diisi.",
    requiredEmail: "Email wajib diisi.",
    invalidEmail: "Gunakan format email yang valid.",
    requiredPhone: "Nomor HP wajib diisi.",
    invalidPhone: "Nomor HP minimal 10 digit.",
    requiredMessage: "Pesan wajib diisi.",
    rateLimit: "Batas submit tercapai. Coba lagi beberapa saat nanti.",
    sentSuccess: "Pesan terkirim, tim kami akan menghubungi Anda.",
    success: "Berhasil",
    warning: "Perhatian",
    footerDesc:
      "Platform properti premium untuk kawasan Medan dan sekitarnya. Listing terverifikasi, data ringkas, harga transparan.",
    footerContact: "Kontak",
    footerNav: "Navigasi",
    copyright: "© 2026 Prime Property. Seluruh hak cipta dilindungi.",
    premiumMedan: "Premium Real Estate Medan",
    detailTitle: "Detail Properti",
    dashboardProperty: "Dashboard Properti",
    price: "Harga",
    propertyName: "Nama Properti",
    group: "Group",
    size: "Ukuran",
    facing: "Hadap",
    unit: "Unit",
    floorCount: "Lantai",
    carport: "Carport",
    status: "Status",
    condition: "Kondisi",
    area: "Kawasan",
    updated: "Update Terakhir",
    summary: "Ringkasan",
    maps: "Buka di Google Maps",
    editProperty: "Edit Properti",
    deleteProperty: "Hapus / Arsipkan",
    summaryText: ({ name, tipe, kawasan, lebar, panjang, hadap, tingkat, carport }) =>
      `${name} adalah ${tipe.toLowerCase()} di kawasan ${kawasan} dengan ukuran ${lebar} × ${panjang} meter, hadap ${hadap}, terdiri dari ${tingkat} lantai, dan ${carport ? "sudah memiliki" : "belum memiliki"} carport.`,
    loginEyebrow: "Portal Internal",
    loginTitle: "Masuk ke Dashboard",
    loginDesc: "Akses internal untuk admin dan superadmin Prime Property. Tidak ada self-registration.",
    password: "Password",
    signIn: "Masuk",
    verifying: "Memverifikasi...",
    locked: "Terkunci",
    secureSession: "Koneksi Aman · Session via httpOnly Cookie",
    superadminDemo: "Superadmin: superadmin@primeproperty.id / Prime12345!",
    adminDemo: "Admin: agent@primeproperty.id / Prime12345!",
    emailRequired: "Email wajib diisi.",
    passwordRequired: "Password wajib diisi.",
    invalidLogin: "Email atau password tidak valid.",
    lockMessage: "Akun dikunci sementara selama 15 menit karena 5x gagal login dalam 30 menit.",
    dashboardEyebrow: "Internal Agent Portal",
    dashboardTitle: (role) => `Dashboard ${role === "superadmin" ? "Superadmin" : "Admin"}`,
    dashboardDesc:
      "Ini adalah simulasi backend di frontend menggunakan localStorage. Di production, seluruh CRUD, authorization, audit log, dan session wajib dipindahkan ke backend API.",
    addProperty: "Tambah Properti",
    activeListings: "Listing Aktif",
    inStock: "In Stock",
    soldOut: "Sold Out",
    archived: "Arsip",
    managementTitle: "Manajemen Listing Properti",
    managementDescSuper: "Klik baris untuk melihat detail. Superadmin dapat membuat, mengubah, dan melakukan soft delete listing.",
    managementDescAdmin: "Klik baris untuk melihat detail. Admin hanya dapat melihat dan mencari listing.",
    searchPlaceholder: "Cari nama, group, kawasan...",
    actions: "Aksi",
    edit: "Edit",
    delete: "Hapus",
    view: "View",
    emptySearch: "Tidak ada properti yang cocok dengan pencarian.",
    seeWebsite: "Lihat Website",
    logout: "Logout",
    backendNote:
      "Login Agent sengaja disembunyikan dari navbar publik. User internal mengaksesnya langsung melalui /agent/login.",
    superadminForm: "Form Superadmin",
    addPropertyTitle: "Tambah Properti",
    editPropertyTitle: "Edit Properti",
    width: "Lebar (m)",
    length: "Panjang (m)",
    imageUrl: "Image URL",
    mapsLink: "Google Maps Link",
    saveChanges: "Simpan Perubahan",
    createProperty: "Tambah Properti",
    cancel: "Batal",
    hasCarport: "Ada carport",
    nameMin: "Nama properti minimal 3 karakter.",
    nameMax: "Nama properti maksimal 100 karakter.",
    widthInvalid: "Lebar harus lebih dari 0.",
    lengthInvalid: "Panjang harus lebih dari 0.",
    floorsInvalid: "Lantai harus 1 sampai 10.",
    priceInvalid: "Harga wajib diisi dan harus lebih dari 0.",
    areaRequired: "Kawasan wajib diisi.",
    mapsInvalid: "Link maps harus menggunakan URL Google Maps.",
    propertyCreated: "Properti berhasil ditambahkan.",
    propertyUpdated: "Perubahan properti berhasil disimpan.",
    propertyArchived: "Properti dipindahkan ke arsip.",
    confirmDelete: (name) => `Yakin hapus properti ${name}? Listing akan dipindahkan ke arsip.`,
  },
};

const CONTACT_ADDRESS_ID = "Jl. Krakatau No. 88, Medan, Sumatera Utara";

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
    // Some preview environments restrict storage.
  }
}

function safeRemove(key) {
  try {
    if (typeof window === "undefined" || !window.localStorage) return;
    window.localStorage.removeItem(key);
  } catch {
    // noop
  }
}

const AUTH_KEY = "prime_property_auth_session_v2";
const PROPERTY_STORE_KEY = "prime_property_mock_backend_v2";
const LANG_KEY = "prime_property_lang_v1";

function loadAuthSession() {
  const session = safeGetJSON(AUTH_KEY, null);
  if (!session || !session.expiresAt || session.expiresAt < Date.now()) {
    safeRemove(AUTH_KEY);
    return null;
  }
  return session;
}

function saveAuthSession(account) {
  const session = {
    ...account,
    expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
  };
  safeSetJSON(AUTH_KEY, session);
  return session;
}

function formatNowWib() {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Jakarta",
  }).format(new Date());
}

function seedManagedProperties() {
  return PROPERTIES.map((p, i) => ({
    ...p,
    unit: i % 2 === 0 ? "Ready Siap Huni" : "Gate Siap",
    created_at: "24 Mei 2026",
    updated_at: "24 Mei 2026",
    created_by: "Superadmin",
    deleted_at: null,
  }));
}

function loadManagedProperties() {
  const stored = safeGetJSON(PROPERTY_STORE_KEY, null);
  if (Array.isArray(stored) && stored.length) return stored;
  const seeded = seedManagedProperties();
  safeSetJSON(PROPERTY_STORE_KEY, seeded);
  return seeded;
}

function persistManagedProperties(items) {
  safeSetJSON(PROPERTY_STORE_KEY, items);
}

function safeOpenExternal(url) {
  try {
    const w = window.open(url, "_blank", "noopener,noreferrer");
    if (!w) window.location.href = url;
  } catch {
    alert(`Please open this link manually:\n${url}`);
  }
}

function pageFromPath(pathname) {
  if (pathname.startsWith("/agent/dashboard")) return "dashboard";
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
  dashboard: "/agent/dashboard",
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
    } catch {
      // Keep navigation state-based in restricted preview environments.
    }

    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      window.scrollTo(0, 0);
    }
  };

  return { page, navigate };
}

function useReactivePointer() {
  const [point, setPoint] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const move = (event) => {
      const x = (event.clientX / Math.max(window.innerWidth, 1)) * 100;
      const y = (event.clientY / Math.max(window.innerHeight, 1)) * 100;
      setPoint({ x, y });
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return point;
}

function ReactiveBackground({ variant = "dark" }) {
  const { x, y } = useReactivePointer();
  const isDark = variant === "dark";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className={cn(
          "absolute inset-0 transition-[background] duration-300",
          isDark ? "opacity-100" : "opacity-70"
        )}
        style={{
          background: `radial-gradient(circle at ${x}% ${y}%, rgba(201,169,97,0.20), transparent 22rem)`,
        }}
      />
      <div
        className={cn(
          "absolute inset-0 animate-grid-move",
          isDark ? "opacity-[0.06]" : "opacity-[0.05]"
        )}
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,169,97,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,97,0.55) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(circle at center, black, transparent 78%)",
          WebkitMaskImage: "radial-gradient(circle at center, black, transparent 78%)",
        }}
      />
      <div className="absolute right-[8%] top-[14%] h-72 w-72 animate-float-slow rounded-full bg-prime-gold/10 blur-3xl" />
      <div className="absolute bottom-[12%] left-[6%] h-56 w-56 animate-drift rounded-full bg-prime-gold/5 blur-3xl" />
      {[...Array(7)].map((_, i) => (
        <span
          key={i}
          className="absolute h-1.5 w-1.5 rotate-45 bg-prime-gold/30"
          style={{
            left: `${12 + i * 13}%`,
            top: `${18 + ((i * 17) % 60)}%`,
            animation: `drift ${6 + i * 0.8}s ease-in-out infinite`,
            animationDelay: `${i * 0.35}s`,
          }}
        />
      ))}
    </div>
  );
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

  return (
    <div className="soft-icon h-10 w-10 transition duration-300 group-hover:-translate-y-1 group-hover:scale-105">
      {map[kind] || <SparklesIcon />}
    </div>
  );
}

function LangToggle({ lang, setLang, dark = true }) {
  const set = (next) => {
    setLang(next);
    safeSetJSON(LANG_KEY, next);
    document.documentElement.lang = next === "en" ? "en" : "id";
  };

  return (
    <div className={cn("inline-flex rounded-2xl p-1", dark ? "bg-white/5" : "bg-prime-black/5")}>
      {["en", "id"].map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => set(item)}
          className={cn(
            "rounded-xl px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] transition duration-300",
            lang === item
              ? "bg-prime-gold text-prime-black shadow-gold"
              : dark
                ? "text-white/45 hover:text-white"
                : "text-prime-black/45 hover:text-prime-black"
          )}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

function SectionEyebrow({ children, light = false }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <span className="h-px w-5 bg-prime-gold" />
      <span className={cn("text-[9px] font-extrabold uppercase tracking-[0.24em]", light ? "text-prime-gold" : "text-prime-gold")}>{children}</span>
    </div>
  );
}

function Wordmark({ light = true, onClick, t }) {
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
          {t.brandSub}
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
    siap_huni_renovasi: "Renovation",
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

function Header({ currentPage, navigate, lang, setLang, t }) {
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
    ["landing", t.navHome],
    ["about", t.navAbout],
    ["contact", t.navContact],
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b px-6 transition-all duration-500 sm:px-8",
        scrolled || menuOpen ? "border-prime-gold/15 bg-prime-black/95 backdrop-blur-xl" : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between">
        <Wordmark light onClick={() => go("landing")} t={t} />

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

          <LangToggle lang={lang} setLang={setLang} />
        </nav>

        <button
          type="button"
          aria-label="Open menu"
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

            <div className="pt-4">
              <LangToggle lang={lang} setLang={setLang} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero({ navigate, t }) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-prime-black py-28">
      <ReactiveBackground />
      <div className="container-prime relative">
        <div className="max-w-3xl animate-fade-up">
          <SectionEyebrow light>{t.heroEyebrow}</SectionEyebrow>

          <h1 className="max-w-3xl text-4xl font-black leading-[1.03] tracking-[-0.045em] text-white sm:text-6xl lg:text-[76px]">
            {t.heroTitleA}
            <br />
            <span className="text-prime-gold">{t.heroTitleB}</span>
            <br />
            {t.heroTitleC}
          </h1>

          <p className="mt-6 max-w-lg text-sm leading-8 text-white/55 sm:text-base">{t.heroDesc}</p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <PrimaryCTA
              onClick={() => document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" })}
            >
              {t.viewProperties}
            </PrimaryCTA>

            <button
              type="button"
              onClick={() => navigate("contact")}
              className="group inline-flex items-center gap-2 rounded-2xl px-2 py-3 text-sm font-semibold text-white/55 transition duration-300 hover:text-white"
            >
              {t.contactUs}
              <span className="text-prime-gold transition duration-300 group-hover:translate-x-1">
                <ArrowRightIcon />
              </span>
            </button>
          </div>

          <div className="mt-16 flex flex-wrap gap-9 border-t border-prime-gold/15 pt-7 sm:gap-14">
            {[
              { n: "200+", l: t.statsUnits },
              { n: "15+", l: t.statsAreas },
              { n: "10 Yrs", l: t.statsExperience },
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

function PropertyRow({ prop, onSelect, t }) {
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
          alt={prop.name}
          loading="lazy"
          className="h-48 w-full rounded-2xl object-cover shadow-sm transition duration-500 group-hover:scale-[1.01] group-hover:saturate-110 sm:h-56 lg:h-16 lg:w-[88px] lg:rounded-xl"
        />

        <div className="min-w-0">
          <h3 className="truncate text-sm font-extrabold tracking-[-0.01em] text-prime-black">{prop.name}</h3>
          <p className="mt-1 text-xs text-prime-black/45">{prop.group || t.noGroup}</p>
          <p className="mt-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-prime-gold">
            {t.clickDetail}
          </p>
        </div>

        <div className="hidden text-xs text-prime-black/45 lg:block">
          {prop.lebar} × {prop.panjang} m
        </div>

        <div className="hidden lg:block">
          <TypeBadge type={prop.tipe} />
        </div>

        <div className="hidden text-xs text-prime-black/45 lg:block">{prop.tingkat}</div>
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

function PropertyDetailDrawer({
  property,
  onClose,
  canManage = false,
  onEdit,
  onDelete,
  context = "public",
  t,
}) {
  const [renderedProperty, setRenderedProperty] = useState(property);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (property) {
      setRenderedProperty(property);
      setClosing(false);
      document.body.style.overflow = "hidden";
      return undefined;
    }

    if (renderedProperty) {
      setClosing(true);
      const timer = setTimeout(() => {
        setRenderedProperty(null);
        setClosing(false);
        document.body.style.overflow = "";
      }, 500);
      return () => clearTimeout(timer);
    }

    document.body.style.overflow = "";
    return undefined;
  }, [property, renderedProperty]);

  useEffect(() => {
    if (!renderedProperty) return undefined;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [renderedProperty, onClose]);

  if (!renderedProperty) return null;

  const siapLabel = {
    siap_huni: t.lang === "id" ? "Siap Huni" : "Ready to Occupy",
    siap_kosong: t.lang === "id" ? "Siap Kosong" : "Vacant",
    siap_huni_renovasi: t.lang === "id" ? "Siap Huni Renovasi" : "Ready After Renovation",
  }[renderedProperty.siap] || "Ready to Occupy";

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-[70] bg-prime-black/55 backdrop-blur-sm",
          closing ? "animate-fade-out" : "animate-fade-in"
        )}
        onClick={onClose}
      />

      <aside
        role="dialog"
        aria-modal="true"
        className={cn(
          "fixed bottom-0 right-0 top-0 z-[71] w-full max-w-[520px] overflow-y-auto bg-white shadow-soft",
          closing ? "animate-slide-out-right" : "animate-slide-in-right"
        )}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-prime-black/10 bg-white/95 p-5 backdrop-blur-xl">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-prime-gold">
              {context === "dashboard" ? t.dashboardProperty : t.detailTitle}
            </p>
            <h2 className="mt-1 text-xl font-black tracking-[-0.03em] text-prime-black">{renderedProperty.name}</h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-2xl bg-prime-soft text-prime-black transition duration-300 hover:rotate-90 hover:bg-prime-red/10 hover:text-prime-red"
            aria-label="Close details"
          >
            <XIcon />
          </button>
        </div>

        <div className="relative">
          <img src={renderedProperty.image} alt={renderedProperty.name} className="h-64 w-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-prime-black/55 to-transparent p-5">
            <div className="flex flex-wrap gap-2">
              <TypeBadge type={renderedProperty.tipe} />
              <StatusTag status={renderedProperty.status} siap={renderedProperty.siap} />
            </div>
          </div>
        </div>

        <div className="space-y-6 p-5">
          <section className="animate-fade-up rounded-3xl bg-prime-soft p-5">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-prime-black/40">{t.price}</p>
            <p className="mt-1 text-3xl font-black tracking-[-0.05em] text-prime-black">{fmtRp(renderedProperty.price)}</p>
            <p className="mt-2 text-sm leading-6 text-prime-black/55">
              {renderedProperty.group ? `${renderedProperty.group} · ` : ""}{renderedProperty.kawasan}
            </p>
          </section>

          {canManage && (
            <section className="animate-fade-up flex flex-wrap gap-3 rounded-3xl border border-prime-gold/20 bg-prime-gold/5 p-4">
              <button
                type="button"
                onClick={() => onEdit?.(renderedProperty)}
                className="inline-flex items-center justify-center rounded-2xl bg-prime-black px-5 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-prime-gold transition duration-300 hover:-translate-y-0.5"
              >
                {t.editProperty}
              </button>
              <button
                type="button"
                onClick={() => onDelete?.(renderedProperty)}
                className="inline-flex items-center justify-center rounded-2xl bg-prime-red/10 px-5 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-prime-red transition duration-300 hover:-translate-y-0.5 hover:bg-prime-red/15"
              >
                {t.deleteProperty}
              </button>
            </section>
          )}

          <section className="animate-fade-up grid gap-x-5 md:grid-cols-2">
            <div>
              <DetailRow label={t.propertyName} value={renderedProperty.name} />
              <DetailRow label={t.group} value={renderedProperty.group || "-"} />
              <DetailRow label={t.size} value={`${renderedProperty.lebar} × ${renderedProperty.panjang} m`} />
              <DetailRow label={t.facing} value={renderedProperty.hadap} />
              <DetailRow label={t.tableType} value={renderedProperty.tipe} />
              <DetailRow label={t.unit} value={renderedProperty.unit || "-"} />
            </div>
            <div>
              <DetailRow label={t.floorCount} value={renderedProperty.tingkat} />
              <DetailRow label={t.carport} value={renderedProperty.carport ? "Yes" : "No"} />
              <DetailRow label={t.status} value={renderedProperty.status === "sold_out" ? "Sold Out" : "In Stock"} />
              <DetailRow label={t.condition} value={siapLabel} />
              <DetailRow label={t.area} value={renderedProperty.kawasan} />
              <DetailRow label={t.updated} value={renderedProperty.updated_at || "-"} />
            </div>
          </section>

          <section className="animate-fade-up rounded-3xl border border-prime-gold/20 bg-prime-gold/5 p-5">
            <h3 className="text-sm font-black text-prime-black">{t.summary}</h3>
            <p className="mt-2 text-sm leading-7 text-prime-black/60">
              {t.summaryText(renderedProperty)}
            </p>
          </section>

          {renderedProperty.maps_link && (
            <button
              type="button"
              onClick={() => safeOpenExternal(renderedProperty.maps_link)}
              className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-prime-black px-5 py-4 text-xs font-black uppercase tracking-[0.16em] text-prime-gold transition duration-300 hover:-translate-y-0.5 hover:bg-black"
            >
              <PinIcon />
              {t.maps}
            </button>
          )}
        </div>
      </aside>
    </>
  );
}

function FeaturedSection({ t }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <section id="featured" className="relative overflow-hidden bg-white py-16 sm:py-24">
        <ReactiveBackground variant="light" />
        <div className="container-prime relative">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <SectionEyebrow>{t.featuredEyebrow}</SectionEyebrow>
              <h2 className="text-3xl font-black tracking-[-0.04em] text-prime-black sm:text-4xl">{t.featuredTitle}</h2>
            </div>
            <span className="text-xs font-semibold tracking-wide text-prime-black/45">{PROPERTIES.length} {t.selectedUnits}</span>
          </div>

          <div className="hidden border-b border-prime-black/5 px-4 pb-3 lg:grid lg:grid-cols-[88px_minmax(0,1fr)_118px_70px_54px_112px_172px] lg:gap-4">
            {[t.tablePhoto, t.tableProperty, t.tableSize, t.tableType, t.tableFloors, t.tableArea, t.tablePriceStatus].map((h, i) => (
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
              <PropertyRow key={p.id} prop={p} onSelect={setSelected} t={t} />
            ))}
          </div>
        </div>
      </section>

      <PropertyDetailDrawer property={selected} onClose={() => setSelected(null)} t={t} />
    </>
  );
}

function WhySection({ t }) {
  return (
    <section className="bg-prime-soft py-16 sm:py-24">
      <div className="container-prime">
        <div className="mb-14">
          <SectionEyebrow>{t.whyEyebrow}</SectionEyebrow>
          <h2 className="text-3xl font-black tracking-[-0.04em] text-prime-black sm:text-4xl">{t.whyTitle}</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {t.why.map((item, i) => (
            <div
              key={item.title}
              className={cn(
                "group animate-fade-up border-prime-black/10 lg:px-7",
                i > 0 && "lg:border-l",
                i === 0 && "lg:pl-0",
                i === t.why.length - 1 && "lg:pr-0"
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
      <ReactiveBackground />
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

function AboutPage({ navigate, currentPage, lang, setLang, t }) {
  return (
    <>
      <Header currentPage={currentPage} navigate={navigate} lang={lang} setLang={setLang} t={t} />
      <PageHero eyebrow={t.aboutEyebrow} title={t.aboutTitle} desc={t.aboutDesc} />

      <main className="relative overflow-hidden bg-white py-16 sm:py-24">
        <ReactiveBackground variant="light" />
        <div className="container-prime relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <section className="animate-fade-up">
            <SectionEyebrow>{t.aboutProfileEyebrow}</SectionEyebrow>
            <h2 className="text-3xl font-black tracking-[-0.04em] text-prime-black sm:text-4xl">
              {t.aboutHeading}
            </h2>
            <p className="mt-5 text-sm leading-8 text-prime-black/60">{t.aboutP1}</p>
            <p className="mt-4 text-sm leading-8 text-prime-black/60">{t.aboutP2}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <InfoBlock title={t.vision} text={t.visionText} />
              <InfoBlock title={t.mission} text={t.missionText} />
            </div>
          </section>

          <aside className="relative min-h-[420px] overflow-hidden rounded-[2rem] bg-prime-black p-8 text-white shadow-soft sm:p-10">
            <ReactiveBackground />
            <div className="relative animate-fade-up">
              <div className="mb-8 text-7xl leading-none text-prime-gold">“</div>
              <blockquote className="text-3xl font-black leading-tight tracking-[-0.04em]">
                {t.quote}
              </blockquote>
              <p className="mt-6 text-sm leading-8 text-white/35">{t.quoteDesc}</p>
            </div>
          </aside>
        </div>
      </main>

      <Footer navigate={navigate} t={t} />
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
        <textarea className={cn("field-input min-h-32 resize-y rounded-2xl", error && "border-prime-red")} value={value} onChange={onChange} />
      ) : (
        <input className={cn("field-input rounded-2xl", error && "border-prime-red")} value={value} onChange={onChange} />
      )}
      {error && <FieldError>{error}</FieldError>}
    </div>
  );
}

function ContactForm({ onSuccess, t }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = t.requiredName;
    if (!form.email.trim()) next.email = t.requiredEmail;
    else if (!validateEmail(form.email)) next.email = t.invalidEmail;
    if (!form.phone.trim()) next.phone = t.requiredPhone;
    else if (onlyDigits(form.phone).length < 10) next.phone = t.invalidPhone;
    if (!form.message.trim()) next.message = t.requiredMessage;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const checkContactRateLimit = () => {
    const key = "prime_contact_submit_log";
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    const log = safeGetJSON(key, []).filter((time) => now - time < oneHour);
    if (log.length >= 3) return false;
    safeSetJSON(key, [...log, now]);
    return true;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (!checkContactRateLimit()) {
      setErrors({ message: t.rateLimit });
      return;
    }

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 650));
    setSubmitting(false);
    setForm({ name: "", email: "", phone: "", message: "" });
    onSuccess(t.sentSuccess);
  };

  return (
    <form onSubmit={submit} className="animate-fade-up rounded-[2rem] border border-prime-black/5 bg-prime-soft p-6 sm:p-8">
      <SectionEyebrow>{t.contactForm}</SectionEyebrow>
      <h2 className="mb-6 text-3xl font-black tracking-[-0.04em] text-prime-black">{t.sendMessage}</h2>

      <PublicInput label={t.name} value={form.name} onChange={set("name")} error={errors.name} />
      <PublicInput label={t.email} value={form.email} onChange={set("email")} error={errors.email} />
      <PublicInput label={t.mobileNumber} value={form.phone} onChange={set("phone")} error={errors.phone} />
      <PublicInput label={t.message} value={form.message} onChange={set("message")} error={errors.message} textarea />

      {errors.message && errors.message === t.rateLimit && <FieldError>{errors.message}</FieldError>}

      <PrimaryCTA type="submit" disabled={submitting} icon={<ArrowRightIcon />}>
        {submitting ? t.sending : t.send}
      </PrimaryCTA>
    </form>
  );
}

function Toast({ message, type = "success", onClose, t }) {
  useEffect(() => {
    if (!message) return undefined;
    const timer = setTimeout(onClose, 3200);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={cn("fixed bottom-6 right-6 z-[90] max-w-sm animate-fade-up rounded-2xl border p-4 text-sm leading-6 shadow-soft", type === "error" ? "border-white/20 bg-prime-red text-white" : "border-prime-gold/30 bg-prime-black text-white")}>
      <b className={type === "error" ? "text-white" : "text-prime-gold"}>{type === "error" ? t.warning : t.success}</b>
      <p>{message}</p>
    </div>
  );
}

function ContactPage({ navigate, currentPage, lang, setLang, t }) {
  const [toast, setToast] = useState(null);
  const address = lang === "id" ? CONTACT_ADDRESS_ID : CONTACT_INFO.address;

  return (
    <>
      <Header currentPage={currentPage} navigate={navigate} lang={lang} setLang={setLang} t={t} />
      <PageHero eyebrow={t.contactEyebrow} title={t.contactTitle} desc={t.contactDesc} />

      <main className="relative overflow-hidden bg-white py-16 sm:py-24">
        <ReactiveBackground variant="light" />
        <div className="container-prime relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <section className="animate-fade-up">
            <SectionEyebrow>{t.contactInfo}</SectionEyebrow>
            <h2 className="text-3xl font-black tracking-[-0.04em] text-prime-black sm:text-4xl">{t.contactHeading}</h2>

            <div className="mt-6">
              <ContactCard label={t.address} value={address} />
              <ContactCard label={t.phone} value={CONTACT_INFO.phone} />
              <ContactCard label={t.email} value={CONTACT_INFO.email} />
              <ContactCard label={t.whatsapp} value={t.chatWhatsapp} href={CONTACT_INFO.whatsapp} />
            </div>

            <div className="mt-6 grid min-h-56 place-items-center rounded-[2rem] border border-prime-black/5 bg-prime-soft p-8 text-center">
              <div>
                <div className="mx-auto mb-4 w-fit">
                  <WhyIcon kind="location" />
                </div>
                <p className="text-sm leading-7 text-prime-black/45">{t.mapsPlaceholder}</p>
              </div>
            </div>
          </section>

          <ContactForm onSuccess={(msg) => setToast(msg)} t={t} />
        </div>
      </main>

      <Footer navigate={navigate} t={t} />
      <Toast message={toast} onClose={() => setToast(null)} t={t} />
    </>
  );
}

function Footer({ navigate, t }) {
  return (
    <footer className="relative overflow-hidden bg-prime-black py-12 text-white sm:py-16">
      <ReactiveBackground />
      <div className="container-prime relative">
        <div className="flex flex-wrap justify-between gap-10">
          <div className="max-w-xs">
            <Wordmark light onClick={() => navigate("landing")} t={t} />
            <p className="mt-5 text-sm leading-7 text-white/25">{t.footerDesc}</p>
          </div>

          <div>
            <p className="mb-4 text-[8px] font-black uppercase tracking-[0.22em] text-prime-gold">{t.footerContact}</p>
            {[
              [t.phone, CONTACT_INFO.phone],
              [t.whatsapp, "wa.me/6281234567890"],
              [t.email, CONTACT_INFO.email],
            ].map(([k, v]) => (
              <p key={k} className="mb-2 text-xs text-white/45">
                <span className="text-white/25">{k}: </span>
                {v}
              </p>
            ))}
          </div>

          <div>
            <p className="mb-4 text-[8px] font-black uppercase tracking-[0.22em] text-prime-gold">{t.footerNav}</p>
            {[
              ["landing", t.navHome],
              ["about", t.navAbout],
              ["contact", t.navContact],
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
          <p className="text-xs text-white/20">{t.copyright}</p>
          <p className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.18em] text-white/20">
            <span className="h-1 w-1 rotate-45 bg-prime-gold/50" />
            {t.premiumMedan}
          </p>
        </div>
      </div>
    </footer>
  );
}

function DashboardStat({ label, value, tone = "gold" }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
      <p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/35">{label}</p>
      <p className={cn("mt-3 text-3xl font-black tracking-[-0.05em]", tone === "red" ? "text-prime-red" : "text-prime-gold")}>
        {value}
      </p>
    </div>
  );
}

function DashboardHeader({ auth, onLogout, navigate, lang, setLang, t }) {
  return (
    <header className="sticky top-0 z-50 border-b border-prime-gold/15 bg-prime-black/95 px-6 py-4 backdrop-blur-xl sm:px-8">
      <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-4">
        <Wordmark light onClick={() => navigate("dashboard")} t={t} />
        <div className="flex items-center gap-3">
          <LangToggle lang={lang} setLang={setLang} />
          <div className="hidden text-right sm:block">
            <p className="text-xs font-black text-white">{auth.name}</p>
            <p className="text-[9px] font-black uppercase tracking-[0.16em] text-prime-gold">{auth.role}</p>
          </div>
          <button
            type="button"
            onClick={() => navigate("landing")}
            className="rounded-2xl px-4 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-white/45 transition hover:bg-white/5 hover:text-white"
          >
            {t.seeWebsite}
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="rounded-2xl bg-prime-red/10 px-4 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-prime-red transition hover:bg-prime-red/15"
          >
            {t.logout}
          </button>
        </div>
      </div>
    </header>
  );
}

function emptyPropertyForm() {
  return {
    name: "",
    group: "",
    lebar: "",
    panjang: "",
    hadap: "Timur",
    tipe: "Ruko",
    tingkat: "1",
    price: "",
    carport: true,
    status: "in_stock",
    siap: "siap_huni",
    kawasan: "",
    unit: "",
    maps_link: "",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
  };
}

function propertyToForm(p) {
  return {
    ...emptyPropertyForm(),
    ...p,
    group: p.group || "",
    lebar: String(p.lebar ?? ""),
    panjang: String(p.panjang ?? ""),
    tingkat: String(p.tingkat ?? ""),
    price: String(p.price ?? ""),
    unit: p.unit || "",
    maps_link: p.maps_link || "",
    image: p.image || emptyPropertyForm().image,
  };
}

function validatePropertyForm(form, t) {
  const errors = {};
  if (!form.name.trim()) errors.name = t.requiredName;
  else if (form.name.trim().length < 3) errors.name = t.nameMin;
  else if (form.name.trim().length > 100) errors.name = t.nameMax;

  const lebar = Number(form.lebar);
  const panjang = Number(form.panjang);
  const tingkat = Number(form.tingkat);
  const price = Number(String(form.price).replace(/\D/g, ""));

  if (!lebar || lebar <= 0) errors.lebar = t.widthInvalid;
  if (!panjang || panjang <= 0) errors.panjang = t.lengthInvalid;
  if (!tingkat || tingkat < 1 || tingkat > 10) errors.tingkat = t.floorsInvalid;
  if (!price || price <= 0) errors.price = t.priceInvalid;
  if (!form.kawasan.trim()) errors.kawasan = t.areaRequired;
  if (form.maps_link && !form.maps_link.includes("google.com/maps") && !form.maps_link.includes("google.com/search")) {
    errors.maps_link = t.mapsInvalid;
  }

  return errors;
}

function DashInput({ label, error, children }) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      {children}
      {error && <FieldError>{error}</FieldError>}
    </label>
  );
}

function PropertyEditorDrawer({ open, property, onClose, onSubmit, t }) {
  const [renderOpen, setRenderOpen] = useState(open);
  const [closing, setClosing] = useState(false);
  const [form, setForm] = useState(emptyPropertyForm());
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setRenderOpen(true);
      setClosing(false);
      setForm(property ? propertyToForm(property) : emptyPropertyForm());
      setErrors({});
      document.body.style.overflow = "hidden";
    } else if (renderOpen) {
      setClosing(true);
      const timer = setTimeout(() => {
        setRenderOpen(false);
        setClosing(false);
        document.body.style.overflow = "";
      }, 500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [open, property, renderOpen]);

  useEffect(() => {
    if (!renderOpen) return undefined;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [renderOpen, onClose]);

  if (!renderOpen) return null;

  const set = (field) => (e) => {
    const value = e?.target?.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((er) => ({ ...er, [field]: "" }));
  };

  const submit = (e) => {
    e.preventDefault();
    const nextErrors = validatePropertyForm(form, t);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    onSubmit({
      ...form,
      id: property?.id || Date.now(),
      name: form.name.trim(),
      group: form.group.trim() || null,
      lebar: Number(form.lebar),
      panjang: Number(form.panjang),
      tingkat: Number(form.tingkat),
      price: Number(String(form.price).replace(/\D/g, "")),
      kawasan: form.kawasan.trim(),
      unit: form.unit.trim() || null,
      maps_link: form.maps_link.trim() || "",
      image: form.image.trim() || emptyPropertyForm().image,
      created_at: property?.created_at || formatNowWib(),
      updated_at: formatNowWib(),
      created_by: property?.created_by || "Superadmin",
      deleted_at: null,
    });
  };

  const inputClass = "field-input rounded-2xl";

  return (
    <>
      <div
        className={cn("fixed inset-0 z-[80] bg-prime-black/55 backdrop-blur-sm", closing ? "animate-fade-out" : "animate-fade-in")}
        onClick={onClose}
      />

      <aside className={cn("fixed bottom-0 right-0 top-0 z-[81] w-full max-w-[640px] overflow-y-auto bg-white shadow-soft", closing ? "animate-slide-out-right" : "animate-slide-in-right")}>
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-prime-black/10 bg-white/95 p-5 backdrop-blur-xl">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-prime-gold">{t.superadminForm}</p>
            <h2 className="mt-1 text-xl font-black tracking-[-0.03em] text-prime-black">
              {property ? t.editPropertyTitle : t.addPropertyTitle}
            </h2>
          </div>
          <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-2xl bg-prime-soft text-prime-black transition hover:rotate-90 hover:text-prime-red">
            <XIcon />
          </button>
        </div>

        <form onSubmit={submit} className="grid gap-5 p-5 sm:grid-cols-2">
          <DashInput label={t.propertyName} error={errors.name}>
            <input className={cn(inputClass, errors.name && "border-prime-red")} value={form.name} onChange={set("name")} />
          </DashInput>

          <DashInput label={t.group} error={errors.group}>
            <input className={inputClass} value={form.group} onChange={set("group")} placeholder="Optional" />
          </DashInput>

          <DashInput label={t.width} error={errors.lebar}>
            <input className={cn(inputClass, errors.lebar && "border-prime-red")} value={form.lebar} onChange={set("lebar")} inputMode="decimal" />
          </DashInput>

          <DashInput label={t.length} error={errors.panjang}>
            <input className={cn(inputClass, errors.panjang && "border-prime-red")} value={form.panjang} onChange={set("panjang")} inputMode="decimal" />
          </DashInput>

          <DashInput label={t.facing} error={errors.hadap}>
            <select className={inputClass} value={form.hadap} onChange={set("hadap")}>
              {["Utara", "Selatan", "Timur", "Barat"].map((v) => <option key={v}>{v}</option>)}
            </select>
          </DashInput>

          <DashInput label={t.tableType} error={errors.tipe}>
            <select className={inputClass} value={form.tipe} onChange={set("tipe")}>
              <option>Ruko</option>
              <option>Villa</option>
            </select>
          </DashInput>

          <DashInput label={t.floorCount} error={errors.tingkat}>
            <input className={cn(inputClass, errors.tingkat && "border-prime-red")} value={form.tingkat} onChange={set("tingkat")} inputMode="decimal" />
          </DashInput>

          <DashInput label={t.price} error={errors.price}>
            <input className={cn(inputClass, errors.price && "border-prime-red")} value={form.price} onChange={set("price")} inputMode="numeric" />
          </DashInput>

          <DashInput label={t.status} error={errors.status}>
            <select className={inputClass} value={form.status} onChange={set("status")}>
              <option value="in_stock">In Stock</option>
              <option value="sold_out">Sold Out</option>
            </select>
          </DashInput>

          <DashInput label={t.condition} error={errors.siap}>
            <select className={inputClass} value={form.siap} onChange={set("siap")}>
              <option value="siap_huni">Siap Huni</option>
              <option value="siap_kosong">Siap Kosong</option>
              <option value="siap_huni_renovasi">Siap Huni Renovasi</option>
            </select>
          </DashInput>

          <DashInput label={t.area} error={errors.kawasan}>
            <input className={cn(inputClass, errors.kawasan && "border-prime-red")} value={form.kawasan} onChange={set("kawasan")} />
          </DashInput>

          <DashInput label={t.unit} error={errors.unit}>
            <input className={inputClass} value={form.unit} onChange={set("unit")} placeholder="Ready Siap Huni" />
          </DashInput>

          <label className="flex items-center gap-3 rounded-2xl bg-prime-soft p-4 text-sm font-bold text-prime-black">
            <input type="checkbox" checked={form.carport} onChange={set("carport")} />
            {t.hasCarport}
          </label>

          <DashInput label={t.imageUrl} error={errors.image}>
            <input className={inputClass} value={form.image} onChange={set("image")} />
          </DashInput>

          <DashInput label={t.mapsLink} error={errors.maps_link}>
            <input className={cn(inputClass, errors.maps_link && "border-prime-red")} value={form.maps_link} onChange={set("maps_link")} placeholder="https://www.google.com/maps/..." />
          </DashInput>

          <div className="sm:col-span-2 flex flex-wrap gap-3 border-t border-prime-black/10 pt-5">
            <PrimaryCTA type="submit" icon={<ArrowRightIcon />}>
              {property ? t.saveChanges : t.createProperty}
            </PrimaryCTA>
            <button type="button" onClick={onClose} className="rounded-2xl bg-prime-soft px-5 py-4 text-[11px] font-black uppercase tracking-[0.16em] text-prime-black/55 transition hover:bg-prime-black/10">
              {t.cancel}
            </button>
          </div>
        </form>
      </aside>
    </>
  );
}

function DashboardPage({ auth, onLogout, navigate, lang, setLang, t }) {
  const [properties, setProperties] = useState(loadManagedProperties);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const isSuperadmin = auth.role === "superadmin";

  useEffect(() => {
    persistManagedProperties(properties);
  }, [properties]);

  const activeProperties = properties.filter((p) => !p.deleted_at);
  const archived = properties.filter((p) => p.deleted_at);
  const filtered = activeProperties.filter((p) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return [p.name, p.group, p.kawasan, p.tipe, p.status, p.siap].filter(Boolean).join(" ").toLowerCase().includes(q);
  });

  const openCreate = () => {
    setEditing(null);
    setEditorOpen(true);
  };

  const openEdit = (property) => {
    setSelected(null);
    setEditing(property);
    setEditorOpen(true);
  };

  const saveProperty = (payload) => {
    const exists = properties.some((x) => x.id === payload.id);
    setProperties((items) => (exists ? items.map((x) => (x.id === payload.id ? payload : x)) : [payload, ...items]));
    setEditorOpen(false);
    setEditing(null);
    setToast(exists ? t.propertyUpdated : t.propertyCreated);
  };

  const deleteProperty = (property) => {
    const ok = window.confirm(t.confirmDelete(property.name));
    if (!ok) return;
    setSelected(null);
    setProperties((items) => items.map((x) => (x.id === property.id ? { ...x, deleted_at: formatNowWib(), updated_at: formatNowWib() } : x)));
    setToast(t.propertyArchived);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-prime-black">
      <ReactiveBackground />
      <div className="relative">
        <DashboardHeader auth={auth} onLogout={onLogout} navigate={navigate} lang={lang} setLang={setLang} t={t} />

        <main className="mx-auto max-w-[1320px] px-6 py-8 sm:px-8">
          <section className="animate-fade-up">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <SectionEyebrow light>{t.dashboardEyebrow}</SectionEyebrow>
                <h1 className="text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl">{t.dashboardTitle(auth.role)}</h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/40">{t.dashboardDesc}</p>
                <p className="mt-3 max-w-2xl text-xs leading-6 text-prime-gold/70">{t.backendNote}</p>
              </div>

              {isSuperadmin && (
                <PrimaryCTA onClick={openCreate} icon={<HomeSearchIcon />}>
                  {t.addProperty}
                </PrimaryCTA>
              )}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <DashboardStat label={t.activeListings} value={activeProperties.length} />
              <DashboardStat label={t.inStock} value={activeProperties.filter((p) => p.status === "in_stock").length} />
              <DashboardStat label={t.soldOut} value={activeProperties.filter((p) => p.status === "sold_out").length} tone="red" />
              <DashboardStat label={t.archived} value={archived.length} />
            </div>
          </section>

          <section className="mt-8 animate-fade-up overflow-hidden rounded-[2rem] bg-white shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-prime-black/10 p-5">
              <div>
                <h2 className="text-xl font-black tracking-[-0.03em] text-prime-black">{t.managementTitle}</h2>
                <p className="mt-1 text-xs text-prime-black/45">
                  {isSuperadmin ? t.managementDescSuper : t.managementDescAdmin}
                </p>
              </div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="field-input w-full rounded-2xl sm:w-80"
              />
            </div>

            <div className="hidden grid-cols-[1.2fr_0.8fr_0.7fr_0.7fr_0.9fr_1fr_0.7fr] gap-4 border-b border-prime-black/5 px-5 py-3 lg:grid">
              {[t.tableProperty, t.tableSize, t.tableType, t.price, t.status, t.updated, t.actions].map((h) => (
                <div key={h} className="text-[8px] font-black uppercase tracking-[0.2em] text-prime-black/40">{h}</div>
              ))}
            </div>

            <div>
              {filtered.map((p) => (
                <article
                  key={p.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelected(p)}
                  className="grid cursor-pointer gap-4 border-b border-prime-black/5 p-5 transition duration-300 hover:bg-prime-soft lg:grid-cols-[1.2fr_0.8fr_0.7fr_0.7fr_0.9fr_1fr_0.7fr] lg:items-center"
                >
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="h-14 w-16 rounded-2xl object-cover" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-black text-prime-black">{p.name}</p>
                      <p className="text-xs text-prime-black/45">{p.group || t.noGroup} · {p.kawasan}</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-prime-black/55">{p.lebar} × {p.panjang} m</p>
                  <TypeBadge type={p.tipe} />
                  <p className="text-sm font-black text-prime-black">{fmtRp(p.price)}</p>
                  <StatusTag status={p.status} siap={p.siap} />
                  <p className="text-xs text-prime-black/45">{p.updated_at || "-"}</p>
                  <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                    {isSuperadmin ? (
                      <>
                        <button type="button" onClick={() => openEdit(p)} className="rounded-xl bg-prime-gold/15 px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-prime-gold">
                          {t.edit}
                        </button>
                        <button type="button" onClick={() => deleteProperty(p)} className="rounded-xl bg-prime-red/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-prime-red">
                          {t.delete}
                        </button>
                      </>
                    ) : (
                      <span className="rounded-xl bg-prime-black/5 px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-prime-black/40">
                        {t.view}
                      </span>
                    )}
                  </div>
                </article>
              ))}

              {!filtered.length && (
                <div className="p-10 text-center text-sm text-prime-black/45">{t.emptySearch}</div>
              )}
            </div>
          </section>
        </main>

        <PropertyDetailDrawer
          property={selected}
          onClose={() => setSelected(null)}
          canManage={isSuperadmin}
          onEdit={openEdit}
          onDelete={deleteProperty}
          context="dashboard"
          t={t}
        />

        <PropertyEditorDrawer
          open={editorOpen}
          property={editing}
          onClose={() => {
            setEditorOpen(false);
            setEditing(null);
          }}
          onSubmit={saveProperty}
          t={t}
        />

        <Toast message={toast} onClose={() => setToast(null)} t={t} />
      </div>
    </div>
  );
}

const LOGIN_LOCK_KEY = "prime_agent_login_lock_v2";
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
        className={cn("field-input-dark rounded-2xl", error && "border-prime-red")}
      />
      {error && <FieldError>{error}</FieldError>}
    </div>
  );
}

function LoginPage({ navigate, onLogin, lang, setLang, t }) {
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
    if (!email.trim()) next.email = t.emailRequired;
    else if (!validateEmail(email)) next.email = t.invalidEmail;
    if (!password) next.password = t.passwordRequired;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const recordFailure = () => {
    const now = Date.now();
    const state = getLoginState(email.trim());
    const recent = (state.failedAt || []).filter((time) => now - time <= LOGIN_WINDOW_MS);
    const nextFailed = [...recent, now];
    const next = { failedAt: nextFailed, lockUntil: state.lockUntil || 0 };

    if (nextFailed.length >= MAX_LOGIN_ATTEMPTS) {
      next.lockUntil = now + LOGIN_LOCK_MS;
      setLockUntil(next.lockUntil);
      setMessage(t.lockMessage);
    } else {
      setMessage(`${t.invalidLogin} ${nextFailed.length}/${MAX_LOGIN_ATTEMPTS}.`);
    }

    setLoginState(email.trim(), next);
  };

  const mockLoginRequest = async () => {
    await new Promise((resolve) => setTimeout(resolve, 720));

    const accounts = {
      "superadmin@primeproperty.id": {
        email: "superadmin@primeproperty.id",
        name: "Prime Superadmin",
        role: "superadmin",
      },
      "agent@primeproperty.id": {
        email: "agent@primeproperty.id",
        name: "Prime Agent",
        role: "admin",
      },
    };

    const account = accounts[email.trim().toLowerCase()];
    if (!account || password !== "Prime12345!") return null;
    return account;
  };

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (loading) return;
    if (!validate()) return;

    const state = getLoginState(email.trim());
    if ((state.lockUntil || 0) > Date.now()) {
      setLockUntil(state.lockUntil);
      setMessage(`${t.locked} ${lockedMinutes || 15} minutes.`);
      return;
    }

    setLoading(true);
    try {
      const account = await mockLoginRequest();
      if (!account) {
        recordFailure();
        return;
      }

      clearLoginState(email.trim());
      setPassword("");
      onLogin?.(account);
    } catch {
      recordFailure();
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-prime-black p-6">
      <ReactiveBackground />

      <button
        type="button"
        onClick={() => navigate("landing")}
        className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-2xl px-2 py-2 text-xs font-semibold text-white/55 transition duration-300 hover:bg-white/5 hover:text-white"
      >
        <span className="text-prime-gold">←</span>
        {t.backHome}
      </button>

      <div className="absolute right-6 top-6">
        <LangToggle lang={lang} setLang={setLang} />
      </div>

      <div className="relative w-full max-w-[430px] animate-fade-up">
        <div className="mb-10 flex justify-center">
          <Wordmark light onClick={() => navigate("landing")} t={t} />
        </div>

        <form onSubmit={submit} className="rounded-[2rem] border border-prime-gold/15 bg-white/[0.026] p-7 shadow-soft backdrop-blur-xl sm:p-10">
          <SectionEyebrow light>{t.loginEyebrow}</SectionEyebrow>

          <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-prime-gold/10 text-prime-gold shadow-gold">
            <UserArrowIcon />
          </div>

          <h1 className="text-2xl font-black tracking-[-0.04em] text-white">{t.loginTitle}</h1>
          <p className="mt-2 text-sm leading-6 text-white/25">{t.loginDesc}</p>

          <div className="my-7 h-px bg-prime-gold/15" />

          <InputFieldDark
            label={t.email}
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((er) => ({ ...er, email: "" }));
            }}
            placeholder="superadmin@primeproperty.id"
            error={errors.email}
          />

          <InputFieldDark
            label={t.password}
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
            <div className="mb-5 rounded-2xl border border-prime-red/35 bg-prime-red/10 p-3 text-xs leading-6 text-prime-red">
              {message}
            </div>
          )}

          <PrimaryCTA type="submit" disabled={locked || loading} icon={<UserArrowIcon />}>
            {loading ? t.verifying : locked ? `${t.locked} ${lockedMinutes} min` : t.signIn}
          </PrimaryCTA>

          <p className="mt-5 text-center text-[10px] leading-5 text-white/25">
            {t.superadminDemo}
            <br />
            {t.adminDemo}
          </p>
        </form>

        <p className="mt-5 flex items-center justify-center gap-2 text-[8px] font-bold uppercase tracking-[0.18em] text-white/20">
          <span className="h-1 w-1 rotate-45 bg-prime-gold/40" />
          {t.secureSession}
          <span className="h-1 w-1 rotate-45 bg-prime-gold/40" />
        </p>
      </div>
    </main>
  );
}

function LandingPage({ navigate, currentPage, lang, setLang, t }) {
  return (
    <>
      <Header currentPage={currentPage} navigate={navigate} lang={lang} setLang={setLang} t={t} />
      <Hero navigate={navigate} t={t} />
      <FeaturedSection t={t} />
      <WhySection t={t} />
      <Footer navigate={navigate} t={t} />
    </>
  );
}

export default function App() {
  const { page, navigate } = useClientRouter();
  const [auth, setAuth] = useState(loadAuthSession);
  const [lang, setLang] = useState(() => safeGetJSON(LANG_KEY, DEFAULT_LANG));
  const t = useMemo(() => ({ ...COPY[lang], lang }), [lang]);

  useEffect(() => {
    document.documentElement.lang = lang === "en" ? "en" : "id";
  }, [lang]);

  const handleLogin = (account) => {
    const session = saveAuthSession(account);
    setAuth(session);
    navigate("dashboard");
  };

  const handleLogout = () => {
    safeRemove(AUTH_KEY);
    setAuth(null);
    navigate("login");
  };

  const renderedPage = useMemo(() => {
    if (page === "dashboard") {
      if (!auth) return <LoginPage navigate={navigate} onLogin={handleLogin} lang={lang} setLang={setLang} t={t} />;
      return <DashboardPage auth={auth} onLogout={handleLogout} navigate={navigate} lang={lang} setLang={setLang} t={t} />;
    }
    if (page === "login") return <LoginPage navigate={navigate} onLogin={handleLogin} lang={lang} setLang={setLang} t={t} />;
    if (page === "about") return <AboutPage currentPage={page} navigate={navigate} lang={lang} setLang={setLang} t={t} />;
    if (page === "contact") return <ContactPage currentPage={page} navigate={navigate} lang={lang} setLang={setLang} t={t} />;
    return <LandingPage currentPage={page} navigate={navigate} lang={lang} setLang={setLang} t={t} />;
  }, [page, navigate, auth, lang, t]);

  return renderedPage;
}
