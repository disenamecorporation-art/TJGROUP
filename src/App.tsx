/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { 
  Scale, 
  Briefcase, 
  TrendingUp, 
  Shield, 
  Users, 
  Target, 
  Eye, 
  CheckCircle2, 
  ArrowRight, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin,
  Quote,
  Award,
  Zap,
  Lock,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

// --- Data ---

const CAROUSEL_SLIDES = [
  {
    id: 1,
    title: "Arquitectura",
    subtitle: "Empresarial",
    description: "Estructuramos el éxito de su organización con visión estratégica y rigor técnico.",
    image: "https://i.postimg.cc/8cX6rjyg/wall2.jpg",
    accent: "Estrategia"
  },
  {
    id: 2,
    title: "Blindaje",
    subtitle: "Jurídico",
    description: "Protección legal integral para asegurar la continuidad y el cumplimiento de su negocio.",
    image: "https://i.postimg.cc/NjzNCbpw/wall4.jpg",
    accent: "Protección"
  },
  {
    id: 3,
    title: "Optimización",
    subtitle: "Financiera",
    description: "Análisis de datos y planificación para maximizar la rentabilidad y el crecimiento.",
    image: "https://i.postimg.cc/YqJ4KcZx/wall3.jpg",
    accent: "Rentabilidad"
  }
];

const SERVICES = [
  {
    id: "legal",
    title: "Área Legal",
    icon: <Scale size={40} />,
    description: "Protección jurídica y cumplimiento normativo para blindar su operación.",
    items: [
      "Asesoría jurídica integral",
      "Redacción y revisión de contratos",
      "Gestión Seniat / Sundde",
      "Registro de Marcas y Patentes",
      "Derecho Sucesoral y Civil",
      "Cumplimiento Normativo (Compliance)"
    ]
  },
  {
    id: "corporate",
    title: "Área Corporativa",
    icon: <Briefcase size={40} />,
    description: "Estructuración y optimización de procesos para una gestión de alto nivel.",
    items: [
      "Gobierno Corporativo",
      "Auditoría de Procesos",
      "Definición y Seguimiento de KPIs",
      "Gestión del Cambio Organizacional",
      "Fusiones y Adquisiciones",
      "Estructuración de Empresas"
    ]
  },
  {
    id: "financial",
    title: "Área Financiera",
    icon: <TrendingUp size={40} />,
    description: "Análisis estratégico y planificación para maximizar la rentabilidad.",
    items: [
      "Proyectos de Inversión",
      "Estudios de Factibilidad Económica",
      "Estudios de mercados",
      "Valoración de Negocios",
      "Optimización de Estructura de Costos",
      "Planificación Fiscal Estratégica"
    ]
  }
];

const VALUES = [
  { name: "Ética", icon: <Shield size={28} />, desc: "Integridad inquebrantable en cada acción." },
  { name: "Responsabilidad", icon: <CheckCircle2 size={28} />, desc: "Compromiso total con los resultados." },
  { name: "Confidencialidad", icon: <Lock size={28} />, desc: "Resguardo absoluto de su información." },
  { name: "Eficiencia", icon: <Zap size={28} />, desc: "Optimización máxima de recursos." },
  { name: "Conocimiento", icon: <Search size={28} />, desc: "Análisis situacional de alto nivel." },
];

// --- Components ---

const ContactForm = ({ isModal = false, onClose }: { isModal?: boolean, onClose?: () => void }) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `Hola TJ Group, mi nombre es ${formData.name}. Mi correo es ${formData.email}. Mensaje: ${formData.message || "Me gustaría solicitar una consultoría."}`;
    const whatsappUrl = `https://wa.me/584149499634?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, "_blank");
    if (onClose) onClose();
  };

  return (
    <div className={`${isModal ? "" : "bg-soft-bg p-12 md:p-16 border border-neutral-gray/10"}`}>
      <form className="space-y-10" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-gray/40">Nombre</label>
          <input 
            required
            type="text" 
            className="w-full bg-transparent border-b border-neutral-gray/20 py-4 focus:border-primary outline-none transition-all font-serif text-2xl" 
            placeholder="Ej. Alejandro Magno"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-gray/40">Email</label>
          <input 
            required
            type="email" 
            className="w-full bg-transparent border-b border-neutral-gray/20 py-4 focus:border-primary outline-none transition-all font-serif text-2xl" 
            placeholder="alejandro@empresa.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-gray/40">Mensaje (Opcional)</label>
          <textarea 
            className="w-full bg-transparent border-b border-neutral-gray/20 py-4 focus:border-primary outline-none transition-all font-serif text-xl resize-none" 
            placeholder="¿En qué podemos ayudarle?"
            rows={2}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
        </div>
        <button type="submit" className="w-full py-6 bg-primary text-white font-black uppercase tracking-[0.4em] text-[10px] hover:bg-secondary transition-all shadow-2xl shadow-primary/20 active:scale-95">
          Enviar Mensaje
        </button>
      </form>
    </div>
  );
};

const ContactModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white z-[101] p-12 md:p-16 rounded-[2rem] shadow-2xl overflow-hidden"
          >
            <button onClick={onClose} className="absolute top-8 right-8 text-primary hover:rotate-90 transition-transform">
              <X size={32} />
            </button>
            <h3 className="text-4xl font-serif text-primary mb-2">Solicitar Consultoría</h3>
            <p className="text-neutral-gray font-light mb-12">Complete el formulario y un especialista se pondrá en contacto con usted vía WhatsApp.</p>
            <ContactForm isModal onClose={onClose} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Navbar = ({ onOpenContact }: { onOpenContact: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "glass py-1" : "bg-transparent py-4"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative"
        >
          <img 
            src="https://i.postimg.cc/sf0gp9g5/logoweb.png" 
            alt="TJ Group Logo" 
            className={`transition-all duration-500 ${scrolled ? "h-12" : "h-20"} w-auto`} 
            referrerPolicy="no-referrer" 
          />
        </motion.div>

        <div className="hidden md:flex items-center gap-10">
          {["Inicio", "Nosotros", "Servicios", "Valores", "Contacto"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-gray hover:text-primary transition-all relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <button 
            onClick={onOpenContact}
            className="px-6 py-2.5 bg-primary text-white text-[9px] font-black uppercase tracking-[0.2em] hover:bg-secondary transition-all shadow-xl shadow-primary/20 active:scale-95"
          >
            Consultoría
          </button>
        </div>

        <button className="md:hidden text-primary p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[60] p-12 flex flex-col justify-center gap-8 md:hidden"
          >
            <button className="absolute top-6 right-6 text-primary" onClick={() => setIsOpen(false)}>
              <X size={40} />
            </button>
            {["Inicio", "Nosotros", "Servicios", "Valores", "Contacto"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-4xl font-serif text-primary hover:italic transition-all"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  const prev = () => setCurrent((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);

  return (
    <section id="inicio" className="relative h-screen w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Background Image with Parallax-like scale */}
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "linear" }}
            className="absolute inset-0"
          >
            <img 
              src={CAROUSEL_SLIDES[current].image} 
              alt={CAROUSEL_SLIDES[current].title}
              className="w-full h-full object-cover grayscale-[0.5] brightness-[0.4]"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-7xl mx-auto px-6 w-full">
              <div className="max-w-4xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="flex items-center gap-4 mb-6"
                >
                  <div className="h-px w-12 bg-secondary" />
                  <span className="text-secondary text-[10px] font-black uppercase tracking-[0.5em]">
                    {CAROUSEL_SLIDES[current].accent}
                  </span>
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="text-4xl md:text-[6vw] font-serif text-white leading-[0.85] mb-8 tracking-tighter"
                >
                  {CAROUSEL_SLIDES[current].title} <br />
                  <span className="italic text-secondary font-light">{CAROUSEL_SLIDES[current].subtitle}</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="text-white/60 text-xl md:text-2xl max-w-xl mb-12 font-light leading-relaxed"
                >
                  {CAROUSEL_SLIDES[current].description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.8 }}
                  className="flex flex-wrap gap-6"
                >
                  <a 
                    href="#servicios"
                    className="px-10 py-5 bg-primary text-white font-black uppercase tracking-[0.2em] text-[10px] hover:bg-secondary transition-all flex items-center gap-4 shadow-2xl shadow-primary/20"
                  >
                    Nuestros Servicios <ArrowRight size={16} />
                  </a>
                  <a 
                    href="#nosotros"
                    className="px-10 py-5 border border-white/20 text-white font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-black transition-all"
                  >
                    Sobre Nosotros
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute bottom-12 right-12 flex items-center gap-4 z-20">
        <button 
          onClick={prev}
          className="w-16 h-16 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all rounded-full"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={next}
          className="w-16 h-16 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all rounded-full"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-12 left-12 flex items-center gap-6 z-20">
        {CAROUSEL_SLIDES.map((_, i) => (
          <button 
            key={i}
            onClick={() => setCurrent(i)}
            className="group flex items-center gap-3"
          >
            <span className={`text-[10px] font-black transition-all ${current === i ? "text-white" : "text-white/30"}`}>
              0{i + 1}
            </span>
            <div className={`h-0.5 transition-all duration-500 ${current === i ? "w-12 bg-secondary" : "w-6 bg-white/10 group-hover:w-12 group-hover:bg-white/30"}`} />
          </button>
        ))}
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="nosotros" className="py-40 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <motion.div 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -50 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <h2 className="text-neutral-gray font-black uppercase tracking-[0.6em] text-[10px] mb-8">Identidad & Propósito</h2>
            <h3 className="text-5xl md:text-8xl font-serif text-primary leading-[0.9] mb-12 tracking-tighter">
              Aliados en su <br /> <span className="italic text-secondary">Evolución</span>
            </h3>
            <p className="text-neutral-gray text-xl leading-relaxed font-light mb-12">
              En TJ Group, fusionamos el rigor técnico con una visión humana para construir organizaciones resilientes y preparadas para el futuro.
            </p>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-soft-bg flex items-center justify-center rounded-full text-primary">
                <Award size={32} />
              </div>
              <div>
                <span className="block text-primary font-serif text-2xl italic">Excelencia</span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-gray">Certificada por Resultados</span>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              className="bento-card bg-soft-bg border border-neutral-gray/10 p-12"
            >
              <Target size={32} className="text-primary mb-8" />
              <h4 className="text-3xl font-serif text-primary mb-4">Misión</h4>
              <p className="text-neutral-gray text-lg leading-relaxed font-light">
                Impulsar el crecimiento sostenible de nuestros clientes mediante un acompañamiento integral en las áreas legal, financiera, organizacional y humana, transformando sus capacidades en fortalezas competitivas.
              </p>
            </motion.div>

            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bento-card bg-soft-bg border border-neutral-gray/10 p-12"
            >
              <Eye size={32} className="text-primary mb-8" />
              <h4 className="text-3xl font-serif text-primary mb-4">Visión</h4>
              <p className="text-neutral-gray text-lg leading-relaxed font-light">
                Ser el aliado estratégico global para crear organizaciones humanas, eficientes y preparadas para el mañana.
              </p>
            </motion.div>

            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-2 bento-card bg-white border border-neutral-gray/10 p-12 flex flex-col md:flex-row gap-12 items-center"
            >
              <div className="flex-1">
                <Users size={32} className="text-primary mb-8" />
                <h4 className="text-3xl font-serif text-primary mb-4">Equipo Multidisciplinario</h4>
                <p className="text-neutral-gray text-lg leading-relaxed font-light">
                  Abogados, Economistas, Contadores e Ingenieros trabajando en sincronía para su éxito.
                </p>
              </div>
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-16 h-16 rounded-full border-4 border-white bg-soft-bg overflow-hidden shadow-xl">
                    <img src={`https://i.pravatar.cc/150?u=tjgroup_team_${i}`} alt="Expert" className="w-full h-full object-cover grayscale" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PromoBanners = () => {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden rounded-[2rem] shadow-2xl border border-gray-100">
          {/* Left Banner - Digital Library Style */}
          <div className="bg-white p-12 md:p-16 relative flex flex-col justify-center min-h-[500px] group">
            <div className="absolute top-8 right-8 flex items-center gap-2">
              <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                <CheckCircle2 size={16} className="text-secondary" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-primary/40">Compromiso TJ Group</span>
            </div>
            
            <div className="relative z-10 max-w-sm">
              <motion.h3 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-4xl md:text-5xl font-sans font-bold text-black mb-4 tracking-tight"
              >
                Nuestros servicios
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-gray-500 text-lg mb-10 font-light"
              >
                Consultoría legal y financiera especializada
              </motion.p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const el = document.getElementById('servicios');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-10 py-4 bg-secondary text-white rounded-xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-primary transition-all shadow-xl shadow-secondary/20"
              >
                Ver servicios
              </motion.button>
            </div>
            
            {/* 3D Icon Graphic */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center">
              <div className="relative">
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-dashed border-primary/10 rounded-full scale-150"
                />
                <div className="relative z-10 w-48 h-48 rounded-full border-4 border-soft-bg p-8 overflow-hidden bg-white flex items-center justify-center shadow-[0_0_50px_rgba(6,78,59,0.05)]">
                  <motion.div
                    animate={{ 
                      y: [0, 15, 0],
                      rotate: [0, -5, 5, 0]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Briefcase size={120} className="text-primary drop-shadow-[0_10px_10px_rgba(0,0,0,0.1)]" />
                  </motion.div>
                </div>
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-xl">
                  <Scale size={24} className="text-white" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-secondary rounded-full flex items-center justify-center shadow-xl">
                  <TrendingUp size={24} className="text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Banner - Protection Style */}
          <div className="bg-primary p-12 md:p-16 relative flex flex-col justify-center min-h-[500px] text-white overflow-hidden group">
            {/* Background Shield Pattern */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 opacity-10">
              <Shield size={600} strokeWidth={0.5} />
            </div>

            <div className="relative z-10 max-w-sm">
              <motion.h3 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-4xl md:text-5xl font-sans font-bold mb-4 tracking-tight"
              >
                Contáctanos ahora
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-white/70 text-lg mb-10 font-light"
              >
                Estamos listos para ayudarte con tus necesidades legales y financieras
              </motion.p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const el = document.getElementById('contacto');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-10 py-4 bg-white text-primary rounded-xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-secondary hover:text-white transition-all shadow-2xl"
              >
                Contáctanos
              </motion.button>
            </div>

            {/* Icon Graphic */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center">
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-dashed border-secondary/30 rounded-full scale-150"
                />
                <div className="relative z-10 w-48 h-48 rounded-full border-4 border-secondary/50 p-8 overflow-hidden bg-primary flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.3)]">
                  <motion.div
                    animate={{ 
                      y: [0, -15, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Users size={120} className="text-secondary drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]" />
                  </motion.div>
                </div>
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-secondary rounded-full flex items-center justify-center shadow-xl">
                  <ShieldCheck size={24} className="text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-xl">
                  <Lock size={24} className="text-white" />
                </div>
              </div>
            </div>

            <p className="absolute bottom-8 left-12 md:left-16 text-[9px] font-black uppercase tracking-widest text-white/30 italic">
              *Consultas iniciales disponibles para clientes nuevos
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="servicios" className="py-40 bg-soft-bg relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32 items-end">
          <div className="lg:col-span-8">
            <h2 className="text-neutral-gray font-black uppercase tracking-[0.6em] text-[10px] mb-8">Especialidades</h2>
            <h3 className="text-6xl md:text-[100px] font-serif text-primary leading-[0.9] tracking-tighter">
              Servicios de <br /> <span className="italic text-secondary">Precisión</span>
            </h3>
          </div>
          <div className="lg:col-span-4">
            <p className="text-neutral-gray text-xl font-light leading-relaxed border-l-2 border-primary/20 pl-8">
              Soluciones a medida diseñadas para blindar y potenciar cada área crítica de su empresa.
            </p>
            <button 
              onClick={() => {
                const whatsappMessage = "Hola TJ Group, me gustaría solicitar información sobre sus servicios de precisión.";
                window.open(`https://wa.me/584149499634?text=${encodeURIComponent(whatsappMessage)}`, "_blank");
              }}
              className="mt-8 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-primary hover:text-secondary transition-colors group"
            >
              Hablar con un experto <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-white p-12 border border-neutral-gray/5 hover:border-primary/20 transition-all duration-700 group"
            >
              <div className="w-20 h-20 bg-soft-bg text-primary flex items-center justify-center rounded-2xl mb-10 group-hover:bg-primary group-hover:text-white transition-all duration-700">
                {service.icon}
              </div>
              <h4 className="text-4xl font-serif text-primary mb-6">{service.title}</h4>
              <p className="text-neutral-gray font-light leading-relaxed mb-10">{service.description}</p>
              
              <ul className="space-y-4">
                {service.items.map((item, idx) => (
                  <li key={item} className="flex items-center gap-4 text-sm font-bold text-neutral-gray/60 group-hover:text-neutral-gray transition-colors">
                    <div className="w-1.5 h-1.5 bg-primary/20 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Essence = () => {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Quote className="absolute -top-12 -left-4 text-secondary/10 w-24 h-24 -z-10" />
          <h2 className="text-3xl md:text-5xl font-serif text-primary leading-tight italic">
            "Somos un equipo multidisciplinario de profesionales enfocados en brindar su experiencia y conocimiento en asesoría y consultoría corporativa, en las áreas financiera, legal, y organizacional"
          </h2>
          <div className="mt-12 flex justify-center items-center gap-4">
            <div className="h-px w-12 bg-secondary/30" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-gray/40">Nuestra Esencia</span>
            <div className="h-px w-12 bg-secondary/30" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Values = () => {
  return (
    <section id="valores" className="py-32 bg-secondary border-y border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-white font-serif text-5xl md:text-7xl mb-8">Nuestros Valores</h2>
          <div className="h-px w-20 bg-white/20 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-16">
          {VALUES.map((value, i) => (
            <motion.div
              key={value.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="w-20 h-20 border border-white/20 flex items-center justify-center rounded-full mx-auto mb-8 group-hover:bg-white group-hover:text-secondary transition-all duration-700 text-white">
                {value.icon}
              </div>
              <h5 className="text-white font-serif text-xl mb-2">{value.name}</h5>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white/70 transition-colors">
                {value.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contacto" className="py-40 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="text-neutral-gray font-black uppercase tracking-[0.6em] text-[10px] mb-8">Contacto</h2>
            <h3 className="text-5xl md:text-8xl font-serif text-primary leading-[0.9] mb-12 tracking-tighter">
              Inicie su <br /> <span className="italic text-secondary">Transformación</span>
            </h3>
            <div className="space-y-8">
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-soft-bg flex items-center justify-center rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <Phone size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-light text-neutral-gray">+58 241-8241278</span>
                    <span className="text-xl font-light text-neutral-gray">+58 414-9499634</span>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-soft-bg flex items-center justify-center rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <Mail size={20} />
                  </div>
                  <span className="text-xl font-light text-neutral-gray">contacto@tjgroup.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-soft-bg p-12 md:p-16 border border-neutral-gray/10">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-24 bg-primary relative overflow-hidden">
      {/* Animated background patterns */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-24 -left-24 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          rotate: [90, 0, 90]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-16 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://i.postimg.cc/sf0gp9g5/logoweb.png" 
              alt="TJ Group Logo" 
              className="h-20 w-auto brightness-0 invert opacity-80 hover:opacity-100 transition-opacity cursor-pointer" 
              referrerPolicy="no-referrer" 
            />
          </motion.div>

          <div className="flex flex-wrap justify-center gap-12">
            {["Inicio", "Nosotros", "Servicios", "Valores", "Contacto"].map((item, i) => (
              <motion.a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, color: "#116743" }}
                className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-secondary transition-all"
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center pt-12 border-t border-white/5"
        >
          <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20 leading-loose">
            © {new Date().getFullYear()} TJ Group Strategy & Consulting. <br />
            <span className="text-white/40">Está pagina web fue Desarrollada y Diseñada por </span>
            <a href="https://instagram.com/legaint.ve" target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary transition-colors underline underline-offset-4">
              Legaint Corporation
            </a>
          </p>
          
          <div className="mt-8 flex justify-center gap-6">
            {/* Social placeholders with animations */}
            {[1, 2, 3].map(i => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.2, rotate: 15 }}
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/20 hover:text-secondary hover:border-secondary transition-all cursor-pointer"
              >
                <div className="w-1 h-1 bg-current rounded-full" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="selection:bg-primary selection:text-white scroll-smooth font-sans text-neutral-gray">
      <Navbar onOpenContact={() => setIsContactOpen(true)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <main>
        <HeroCarousel />
        <About />
        <PromoBanners />
        <Services />
        <Essence />
        <Values />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
