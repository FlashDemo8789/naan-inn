import React, { useState, useEffect } from "react";
import {
  Play,
  Star,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  ChevronDown,
  Menu as MenuIcon,
  X,
  Instagram,
  Facebook,
  Twitter,
  Calendar,
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import heroVideo from "./assets/hero.mp4";

/* --- ASSETS & CONSTANTS --- */
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
  interior:
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop",

  // Menu Images
  buffet:
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop", // Biryani/Buffet
  lunchSet:
    "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=2070&auto=format&fit=crop", // Thali
  curry:
    "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1971&auto=format&fit=crop", // Chicken Curry
  steak:
    "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070&auto=format&fit=crop", // Steak
  tandoori:
    "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=2080&auto=format&fit=crop", // Tandoori
  palak:
    "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1974&auto=format&fit=crop", // Palak

  // General
  food1: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1971&auto=format&fit=crop",
  food2: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2070&auto=format&fit=crop",
  kobe: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2070&auto=format&fit=crop",
  wagyu: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2070&auto=format&fit=crop",
  reservation:
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop", // Table setting
};

const COLORS = {
  gold: "#D4AF37",
  goldLight: "#F3E5AB",
  charcoal: "#0F0F0F",
  darkGrey: "#1A1A1A",
  saffron: "#FF9933",
  white: "#FFFFFF",
};

/* --- COMPONENTS --- */

// 1. NAVIGATION
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Heritage", href: "#story" },
    { name: "Menu", href: "#menu" },
    { name: "Gallery", href: "#gallery" },
    { name: "Reservations", href: "#reservations" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-md py-4 shadow-xl border-b border-white/10"
          : "bg-transparent py-8"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#"
          className="font-serif text-3xl tracking-[0.2em] text-white flex items-center gap-2"
        >
          <span style={{ color: COLORS.gold }}>NAAN</span>{" "}
          <span className="text-xs tracking-widest opacity-70 mt-1">INN</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm uppercase tracking-widest text-gray-300 hover:text-[#D4AF37] transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <button
            onClick={() =>
              document.getElementById("reservations")?.scrollIntoView()
            }
            className="border border-[#D4AF37] text-[#D4AF37] px-6 py-2 uppercase text-xs tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all duration-500"
          >
            Book a Table
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black border-b border-white/10 py-10 flex flex-col items-center gap-6 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white uppercase tracking-widest text-sm"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// 2. HERO SECTION
const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Parallax Background (Video) */}
      <motion.div style={{ y }} className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={IMAGES.hero}
          className="w-full h-full object-cover opacity-50"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black"></div>
      </motion.div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p className="text-[#D4AF37] uppercase tracking-[0.4em] text-sm mb-6">
            Halal Pakistani &amp; Indian • Sannomiya, Kobe
          </p>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white mb-8 tracking-tighter">
            NAAN INN
          </h1>
          <p className="text-gray-300 max-w-lg mx-auto font-light leading-relaxed mb-12">
            Authentic Pakistani and Indian curry, a short walk from Sannomiya Station in Kobe.
          </p>

          <div className="flex gap-6 justify-center">
            <button className="bg-[#D4AF37] text-black px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-white transition-colors duration-300">
              View Menu
            </button>
            <button className="flex items-center gap-3 text-white border border-white/30 px-8 py-3 uppercase tracking-widest text-xs hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all group">
              <Play size={14} className="group-hover:fill-[#D4AF37]" /> Our
              Legacy
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown size={30} />
      </motion.div>
    </div>
  );
};

// 3. STORY SECTION
const Story = () => {
  return (
    <section id="story" className="py-24 md:py-32 bg-[#0F0F0F] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-[#D4AF37]"></div>
              <span className="text-[#D4AF37] uppercase tracking-widest text-xs">
                Since 1986
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-8 leading-tight">
              A Legacy of <br /> <span className="italic text-gray-500">Halal Excellence</span>
            </h2>
            <p className="text-gray-400 leading-8 mb-6 font-light">
              Established in 1986, Naan Inn is one of Kobe&apos;s most enduring and
              trusted Halal establishments. We have served guests from around the
              world, building a reputation for authenticity and warmth that spans
              generations.
            </p>
            <p className="text-gray-400 leading-8 mb-8 font-light">
              In a simple, casual dining room with tables of all sizes, we serve
              Pakistani classics like curry and biryani using halal ingredients.
            </p>

            <div className="mt-8 border-l-2 border-[#D4AF37] pl-6">
              <p className="text-white font-serif text-lg italic tracking-wide">
                &quot;Where the ancient spice of the Silk Road meets the modern spirit of Kobe.&quot;
              </p>
            </div>

            <div className="mt-10 bg-black/30 border border-white/10 p-6">
              <p className="text-gray-300 text-sm leading-7">
                大小テーブル席が並ぶシンプルでカジュアルな佇まいの店内で、カレーやビリヤニなどのパキスタン料理を提供する。ハラール食材を使用。
              </p>
            </div>
          </motion.div>

          {/* Image Composite */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={IMAGES.interior}
              alt="Restaurant Interior"
              className="w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />

            <div className="absolute -bottom-10 -left-10 bg-[#1A1A1A] p-8 max-w-xs shadow-2xl border border-white/5 hidden md:block">
              <p className="font-serif text-white text-2xl mb-2">&quot;Halal Certified&quot;</p>
              <p className="text-gray-500 text-xs uppercase tracking-widest">
                Muslim Professional Japan Assc.
              </p>
              <div className="flex gap-1 text-[#D4AF37] mt-3">
                <Star size={14} fill="#D4AF37" />
                <Star size={14} fill="#D4AF37" />
                <Star size={14} fill="#D4AF37" />
                <Star size={14} fill="#D4AF37" />
                <Star size={14} fill="#D4AF37" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Background Text */}
      <div className="absolute top-0 right-0 font-serif text-[20rem] text-white/[0.02] leading-none select-none pointer-events-none">
        KOBE
      </div>
    </section>
  );
};

// 4. MENU PREVIEW
const MenuSection = () => {
  const lunchMenu = [
    {
      title: "Friday Halal Lunch Buffet",
      price: "¥1,000–2,000",
      desc: "On Fridays, lunch is served as a Halal buffet (Muslim guests).",
      image: IMAGES.buffet,
    },
    {
      title: "Chicken Biryani & Pakora",
      price: "¥1,000–2,000",
      desc: "A classic combo featured in Tabelog photos.",
      image: IMAGES.lunchSet,
    },
    {
      title: "Curry & Naan",
      price: "¥1,000–2,000",
      desc: "Comforting curry with fresh naan.",
      image: IMAGES.curry,
    },
  ];

  const dinnerMenu = [
    {
      title: "Curry Trio Plate",
      price: "¥1,000–2,000",
      desc: "A three-curry selection (as seen on Tabelog).",
      image: IMAGES.lunchSet,
    },
    {
      title: "Masala (3 Types)",
      price: "¥1,000–2,000",
      desc: "Bold masala varieties highlighted in Tabelog photos.",
      image: IMAGES.tandoori,
    },
    {
      title: "Vegetarian Options",
      price: "Ask in-store",
      desc: "Vegetarian dishes are available.",
      image: IMAGES.palak,
    },
    {
      title: "Wine & Cocktails",
      price: "Ask in-store",
      desc: "Wine and cocktails are available.",
      image: IMAGES.interior,
    },
  ];

  return (
    <section id="menu" className="py-24 bg-[#0A0A0A] relative border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#D4AF37] uppercase tracking-widest text-xs">Menu Highlights</span>
          <h2 className="font-serif text-4xl text-white mt-4">From the Kitchen</h2>
          <p className="text-gray-500 text-sm mt-4 max-w-2xl mx-auto font-light">
            Highlights based on the restaurant&apos;s public listing and photos. For the latest menu and pricing,
            please check Tabelog.
          </p>
        </div>

        {/* LUNCH */}
        <div className="mb-24">
          <h3 className="text-[#D4AF37] font-serif text-2xl mb-12 text-center border-b border-white/10 pb-4 inline-block w-full max-w-md mx-auto block">
            Lunch Specials
          </h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {lunchMenu.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-[#111] border border-white/5 overflow-hidden group"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-baseline mb-4">
                    <h4 className="text-white font-serif text-lg group-hover:text-[#D4AF37] transition-colors">
                      {item.title}
                    </h4>
                    <span className="text-[#D4AF37] font-serif">{item.price}</span>
                  </div>
                  <p className="text-gray-400 text-sm font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* DINNER */}
        <div>
          <h3 className="text-[#D4AF37] font-serif text-2xl mb-12 text-center border-b border-white/10 pb-4 inline-block w-full max-w-md mx-auto block">
            Dinner Highlights
          </h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {dinnerMenu.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                className="group flex flex-col md:flex-row bg-[#111] border border-white/5 overflow-hidden h-full md:h-48"
              >
                <div className="md:w-1/3 overflow-hidden h-48 md:h-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                </div>
                <div className="md:w-2/3 p-6 flex flex-col justify-center">
                  <div className="flex justify-between items-baseline mb-3">
                    <h3 className="text-white font-serif text-xl group-hover:text-[#D4AF37] transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-[#D4AF37] font-serif whitespace-nowrap ml-4">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm font-light">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center mt-20">
          <a
            href="https://tabelog.com/en/hyogo/A2801/A280101/28000464/dtlmenu/photo/"
            target="_blank"
            rel="noreferrer"
            className="inline-block border border-white/20 text-white px-10 py-4 uppercase tracking-[0.2em] text-xs hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all duration-300"
          >
            View Menu Photos (Tabelog)
          </a>
        </div>
      </div>
    </section>
  );
};

// 5. GALLERY SCROLL
const Gallery = () => {
  return (
    <section id="gallery" className="py-24 bg-black">
      <div className="container mx-auto px-6 mb-12 flex justify-between items-end">
        <div>
          <span className="text-[#D4AF37] uppercase tracking-widest text-xs">
            Visual Journey
          </span>
          <h2 className="font-serif text-4xl text-white mt-4">The Atmosphere</h2>
        </div>
        <div className="hidden md:flex gap-2 text-white/50">
          <span className="text-xs tracking-widest">SCROLL TO EXPLORE</span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[80vh] md:h-[600px] p-4">
        <motion.div
          whileHover={{ scale: 0.98 }}
          className="md:col-span-2 relative overflow-hidden group h-full"
        >
          <img
            src={IMAGES.food1}
            alt="Spices"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <span className="text-white font-serif text-2xl tracking-widest uppercase">
              Spices
            </span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 0.98 }}
          className="md:col-span-1 relative overflow-hidden group h-full"
        >
          <img
            src={IMAGES.kobe}
            alt="Views"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <span className="text-white font-serif text-lg tracking-widest uppercase">
              Views
            </span>
          </div>
        </motion.div>

        <div className="md:col-span-1 flex flex-col gap-4 h-full">
          <motion.div whileHover={{ scale: 0.98 }} className="relative overflow-hidden group flex-1">
            <img
              src={IMAGES.food2}
              alt="Cuisine"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </motion.div>
          <motion.div whileHover={{ scale: 0.98 }} className="relative overflow-hidden group flex-1">
            <img
              src={IMAGES.wagyu}
              alt="Wagyu"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// 6. RESERVATION FORM
const Reservation = () => {
  return (
    <section id="reservations" className="bg-[#111] relative border-t border-[#D4AF37]/20">
      <div className="grid md:grid-cols-2 min-h-[600px]">
        {/* Left Side - Image */}
        <div className="relative hidden md:block">
          <img
            src={IMAGES.reservation}
            alt="Reserved Table"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-[#111]"></div>
          <div className="absolute bottom-12 left-12 p-6 bg-black/80 border-l-2 border-[#D4AF37]">
            <h3 className="text-white font-serif text-2xl mb-2">Private Dining</h3>
            <p className="text-gray-400 text-sm">
              Experience exclusive service in our private rooms.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex flex-col justify-center p-12 md:p-24 bg-[#0F0F0F]">
          <div className="mb-12">
            <h2 className="font-serif text-4xl text-white mb-4">Secure Your Table</h2>
            <p className="text-gray-400 font-light">Join us for a meal near Sannomiya Station.</p>
          </div>

          <form className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[#D4AF37] text-xs uppercase tracking-widest">
                  Date
                </label>
                <div className="flex items-center border-b border-white/20 pb-2">
                  <Calendar size={18} className="text-gray-500 mr-3" />
                  <input
                    type="date"
                    className="bg-transparent text-white w-full outline-none font-serif"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[#D4AF37] text-xs uppercase tracking-widest">
                  Guests
                </label>
                <select className="bg-transparent text-white w-full border-b border-white/20 pb-2 outline-none font-serif">
                  <option className="bg-black">2 Guests</option>
                  <option className="bg-black">4 Guests</option>
                  <option className="bg-black">6+ (Private Room)</option>
                </select>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-[#D4AF37] text-xs uppercase tracking-widest">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your Full Name"
                  className="bg-transparent text-white w-full border-b border-white/20 pb-2 outline-none font-serif placeholder-gray-700"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[#D4AF37] text-xs uppercase tracking-widest">
                  Contact
                </label>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="bg-transparent text-white w-full border-b border-white/20 pb-2 outline-none font-serif placeholder-gray-700"
                />
              </div>
            </div>

            <button className="w-full bg-[#D4AF37] text-black py-4 uppercase tracking-[0.3em] font-bold text-sm hover:bg-white transition-colors mt-8">
              Confirm Booking
            </button>
            <p className="text-xs text-gray-600 mt-4">
              Prefer booking online?{" "}
              <a
                className="text-gray-300 hover:text-white underline underline-offset-2"
                href="https://tabelog.com/en/hyogo/A2801/A280101/28000464/"
                target="_blank"
                rel="noreferrer"
              >
                Reserve via Tabelog
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

// 7. FOOTER
const Footer = () => {
  return (
    <footer className="bg-black pt-24 pb-12 border-t border-white/10 text-center md:text-left">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <h3 className="font-serif text-2xl text-white tracking-widest">NAAN INN</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Pakistani &amp; Indian curry in Kobe&apos;s Chuo Ward, a short walk from Sannomiya Station.
            </p>
            <div className="flex justify-center md:justify-start gap-4 text-gray-400">
              <Instagram size={20} className="hover:text-[#D4AF37] cursor-pointer" />
              <Facebook size={20} className="hover:text-[#D4AF37] cursor-pointer" />
              <Twitter size={20} className="hover:text-[#D4AF37] cursor-pointer" />
            </div>
          </div>

          <div>
            <h4 className="text-[#D4AF37] uppercase text-xs tracking-widest mb-6">Contact</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-center justify-center md:justify-start gap-3">
                <MapPin size={16} /> 〒650-0003 兵庫県神戸市中央区山本通３丁目１−２ 谷口ビル 1Ｆ
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Phone size={16} /> 078-242-8771
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Mail size={16} />
                <a
                  href="mailto:info@naan.jp"
                  className="hover:text-white underline underline-offset-2"
                >
                  info@naan.jp
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <ExternalLink size={16} />
                <a
                  href="https://tabelog.com/en/hyogo/A2801/A280101/28000464/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white underline underline-offset-2"
                >
                  Tabelog listing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#D4AF37] uppercase text-xs tracking-widest mb-6">Hours</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex justify-between max-w-[200px] mx-auto md:mx-0">
                <span>Daily</span> <span>11:30 - 22:00</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#D4AF37] uppercase text-xs tracking-widest mb-6">Notes</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>1 人あたりの料金: ￥1,000～2,000</li>
              <li>ハラール食材を使用</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
            <p>&copy; 2024 Naan Inn Kobe. All Rights Reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">
                Privacy
              </a>
              <a href="#" className="hover:text-white">
                Terms
              </a>
              <a href="#" className="hover:text-white">
                Credits
              </a>
            </div>
          </div>
          <p className="mt-4 text-[10px] text-gray-600">
            Hero video:{" "}
            <a
              href="https://commons.wikimedia.org/wiki/File:Jalebi_being_prepared,_Bangalore.webm"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white underline underline-offset-2"
            >
              Jalebi being prepared, Bangalore
            </a>{" "}
            by{" "}
            <a
              href="https://commons.wikimedia.org/wiki/User:Psubhashish"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white underline underline-offset-2"
            >
              Subhashish Panigrahi
            </a>{" "}
            (CC BY-SA 3.0).
          </p>
        </div>
      </div>
    </footer>
  );
};

// MAIN APP COMPONENT
const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate luxury loading state
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full bg-black flex flex-col items-center justify-center z-50 fixed top-0 left-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="font-serif text-4xl text-[#D4AF37] tracking-[0.5em] mb-4">
            NAAN INN
          </h1>
          <div className="h-[1px] w-32 bg-white/20 mx-auto overflow-hidden">
            <motion.div
              className="h-full bg-[#D4AF37]"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-gray-200 selection:bg-[#D4AF37] selection:text-black font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Lato:wght@300;400;700&display=swap');
        .font-serif { font-family: 'Cinzel', serif; }
        .font-sans { font-family: 'Lato', sans-serif; }
      `}</style>

      <Navbar />
      <Hero />
      <Story />
      <MenuSection />
      <Gallery />
      <Reservation />
      <Footer />
    </div>
  );
};

export default App;
