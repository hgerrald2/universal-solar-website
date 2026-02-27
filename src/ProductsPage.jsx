import React, { useState, useEffect } from 'react'

// ─── Design tokens (sister brand of universalsolar.com) ──────────────────────
// Primary blue:   #1F2AA8  (hero, top bar, middle feature card, hero CTAs)
// Green accent:   #4CAF50  (nav button, arrows, icons)
// Green hover:    #388E3C
// Yellow accent:  #FFCF33  (left/right feature cards, product title bands, links)
// Footer bg:      #1a2a1a
// Nav text:       #333333
// Body text:      #555555
// Light bg:       #f9f9f9
// Font: Inter only, font-bold (700) for headings

const PHONE = '787-310-5555'
const PHONE_HREF = 'tel:7873105555'
const EMAIL = 'info@universalsolarpr.net'
const WHATSAPP = 'https://wa.me/17873105555?text=Hola%20quiero%20cotizaci%C3%B3n%20en%20Puerto%20Rico.%20Mi%20pueblo%20es%3A%20____'

// ─── Icons ───────────────────────────────────────────────────────────────────
const PhoneIcon = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
  </svg>
)

const EmailIcon = ({ className = 'w-4 h-4' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
  </svg>
)

const FacebookIcon = ({ className = 'w-4 h-4' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

const InstagramIcon = ({ className = 'w-4 h-4' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
)

const ShieldIcon = ({ className = 'w-7 h-7' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
  </svg>
)

const FlagIcon = ({ className = 'w-7 h-7' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M3 2.25a.75.75 0 01.75.75v.54l1.838-.46a9.75 9.75 0 016.725.738l.108.054a8.25 8.25 0 005.58.652l3.109-.732a.75.75 0 01.917.81 47.784 47.784 0 00.005 10.337.75.75 0 01-.574.812l-3.114.733a9.75 9.75 0 01-6.594-.77l-.108-.054a8.25 8.25 0 00-5.69-.625l-2.202.55V21a.75.75 0 01-1.5 0V3A.75.75 0 013 2.25z" clipRule="evenodd" />
  </svg>
)

const ChatIcon = ({ className = 'w-7 h-7' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
    <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
  </svg>
)

const ArrowRightIcon = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd" />
  </svg>
)

const WhatsAppIcon = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

// ─── Sunburst SVG Logo ────────────────────────────────────────────────────────
function SunburstLogo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="20" y1="2" x2="20" y2="9" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round" />
      <line x1="20" y1="31" x2="20" y2="38" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round" />
      <line x1="2" y1="20" x2="9" y2="20" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round" />
      <line x1="31" y1="20" x2="38" y2="20" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round" />
      <line x1="6.3" y1="6.3" x2="11.5" y2="11.5" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="28.5" y1="28.5" x2="33.7" y2="33.7" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="33.7" y1="6.3" x2="28.5" y2="11.5" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="11.5" y1="28.5" x2="6.3" y2="33.7" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="20" cy="20" r="9" fill="#4CAF50" />
      <circle cx="20" cy="20" r="5" fill="white" />
    </svg>
  )
}

// ─── Data ────────────────────────────────────────────────────────────────────
const CATEGORIAS = [
  {
    id: 'residencial',
    emoji: '☀️',
    img: '/images/cal_2.jpg',
    categoria: 'CALENTADORES SOLARES',
    nombre: 'Para el Hogar',
    subtitulo: 'Serie Blue Forest®',
    bono: true,
    descripcion: '7 modelos para todo tipo de hogar. Agua caliente gratis del sol, los 365 días del año, sin gastar un centavo en electricidad.',
    caracteristicas: [
      'Ahorra $70 – $180 mensual en tu factura de luz',
      'Modelos para 1-2 hasta 4-6 baños',
      'Certificado Energy Star® & SRCC OG-300',
      'Garantía de 5 años · Instalación incluida en PR',
      'Fabricado en Toa Baja, Puerto Rico desde 1965',
    ],
  },
  {
    id: 'comercial',
    emoji: '🏢',
    img: '/images/cal_2.jpg',
    categoria: 'CALENTADORES SOLARES',
    nombre: 'Comercial e Industrial',
    subtitulo: 'Alto volumen de agua caliente',
    bono: true,
    descripcion: 'Para restaurantes, hoteles, paradores, bases militares, centros de cuido y edificios comerciales con alta demanda.',
    caracteristicas: [
      'Alta capacidad para negocios y comercios',
      'Certificaciones federales Energy Star® & SRCC',
      'Servicio técnico especializado en toda PR',
      'Financiamiento disponible',
    ],
  },
  {
    id: 'piscinas',
    emoji: '🏊',
    img: '/images/cal_2.jpg',
    categoria: 'CALENTADOR DE PISCINAS',
    nombre: 'Heliocol®',
    subtitulo: 'Distribuidor oficial en PR',
    bono: true,
    descripcion: 'Mantén el agua de tu piscina templada todo el año, sin costo adicional de electricidad. Compatible con agua salada y con cloro.',
    caracteristicas: [
      '100% solar — cero gasto adicional de electricidad',
      'Compatible con piscinas de agua salada y cloro',
      'Sin mantenimiento requerido',
      'Instalación y soporte técnico incluido en PR',
    ],
  },
  {
    id: 'cisternas',
    emoji: '🛢️',
    img: '/images/cat1__.jpg',
    categoria: 'CISTERNAS DE AGUA',
    nombre: 'Acero Inoxidable 316',
    subtitulo: 'Fabricadas en Puerto Rico',
    bono: true,
    descripcion: 'Cisternas 100% libres de BPA, fabricadas en nuestra planta en Toa Baja. Las más resistentes del Caribe ante huracanes y salitre.',
    caracteristicas: [
      'Capacidades: 450, 600, 780 y 1,200 galones',
      'Acero inoxidable 316 — resiste salitre y corrosión',
      '100% libre de BPA y carcinógenos',
      'Sistema automatizado con bomba incluida',
    ],
  },
  {
    id: 'filtros',
    emoji: '💧',
    img: '/images/rainsoft-productline.jpg',
    categoria: 'FILTROS DE AGUA',
    nombre: 'RainSoft®',
    subtitulo: 'Purificación total del agua',
    bono: false,
    descripcion: 'Elimina cloro, químicos, virus, bacterias, plomo, sales minerales y sedimentos. Agua limpia y saludable para toda tu familia.',
    caracteristicas: [
      'Suavizadores de agua para todo el hogar',
      'Purificación por osmosis inversa',
      'Elimina: cloro, plomo, virus y bacterias',
      'Distribuidor exclusivo en Puerto Rico',
    ],
  },
  {
    id: 'aire',
    emoji: '🌬️',
    img: '/images/osm_.jpg',
    categoria: 'PURIFICADORES DE AIRE',
    nombre: 'ActivePure®',
    subtitulo: 'Tecnología de la NASA',
    bono: false,
    descripcion: 'La misma tecnología que usa la NASA para purificar el aire. Elimina virus, bacterias, moho, alérgenos y olores del ambiente.',
    caracteristicas: [
      'Tecnología aeroespacial certificada por la NASA',
      'Elimina virus, bacterias, alérgenos y moho',
      'Para hogares, oficinas y negocios',
      'Garantía de 5 años · Entrega gratis en PR',
    ],
  },
  {
    id: 'fotovoltaica',
    emoji: '⚡',
    img: '/images/planta-fotovoltaica.png',
    categoria: 'ENERGÍA SOLAR',
    nombre: 'Plantas Fotovoltaicas',
    subtitulo: 'Energía solar para tu hogar',
    badge: '⚡ Produce Tu Propia Energía',
    bono: true,
    descripcion: 'Sistemas fotovoltaicos completos para generar tu propia electricidad. Reduce o elimina tu factura de AEE. Instalación certificada en toda PR.',
    caracteristicas: [
      'Produce tu propia energía del sol',
      'Reduce o elimina tu factura de AEE',
      'Crédito federal del 30% disponible',
      'Instalación certificada en toda PR',
      'Monitoreo del sistema incluido',
    ],
  },
  {
    id: 'yeti',
    emoji: '🔋',
    img: '/images/yeti.png',
    categoria: 'BATERÍAS PORTÁTILES',
    nombre: 'Goal Zero Yeti®',
    subtitulo: 'Energía portátil cuando la necesitas',
    badge: '🔋 Distribuidor Oficial',
    bono: false,
    descripcion: 'Estaciones de energía portátil Goal Zero Yeti. Perfectas para emergencias, huracanes, salidas al aire libre y áreas sin electricidad.',
    caracteristicas: [
      'Modelos desde 200W hasta 6000W',
      'Carga con panel solar, toma o auto',
      'Silenciosa — sin humo ni motor',
      'Ideal para emergencias y huracanes',
      'Distribuidor oficial Goal Zero en PR',
    ],
  },
]

const CERTS = [
  { icon: '✅', title: 'Energy Star®', desc: 'Certificado Federal EPA' },
  { icon: '🏅', title: 'SRCC OG-300', desc: 'Solar Rating Corp.' },
  { icon: '🏛️', title: 'FHA Aprobado', desc: 'Dept. de Vivienda EE.UU.' },
  { icon: '🌿', title: 'EPA Certificado', desc: '100% libre de plomo' },
  { icon: '🌀', title: 'Resistencia Huracanes', desc: 'Cert. Federal #80-8043' },
  { icon: '🏆', title: 'Mejor Planta 2016', desc: 'Dept. Comercio EE.UU.' },
]

const MUNICIPIOS = [
  'Adjuntas', 'Aguada', 'Aguadilla', 'Aguas Buenas', 'Aibonito', 'Añasco',
  'Arecibo', 'Arroyo', 'Barceloneta', 'Barranquitas', 'Bayamón', 'Cabo Rojo',
  'Caguas', 'Camuy', 'Canóvanas', 'Carolina', 'Cataño', 'Cayey', 'Ceiba',
  'Ciales', 'Cidra', 'Coamo', 'Comerío', 'Corozal', 'Culebra', 'Dorado',
  'Fajardo', 'Florida', 'Guánica', 'Guayama', 'Guayanilla', 'Guaynabo',
  'Gurabo', 'Hatillo', 'Hormigueros', 'Humacao', 'Isabela', 'Jayuya',
  'Juana Díaz', 'Juncos', 'Lajas', 'Lares', 'Las Marías', 'Las Piedras',
  'Loíza', 'Luquillo', 'Manatí', 'Maricao', 'Maunabo', 'Mayagüez', 'Moca',
  'Morovis', 'Naguabo', 'Naranjito', 'Orocovis', 'Patillas', 'Peñuelas',
  'Ponce', 'Quebradillas', 'Rincón', 'Río Grande', 'Sabana Grande', 'Salinas',
  'San Germán', 'San Juan', 'San Lorenzo', 'San Sebastián', 'Santa Isabel',
  'Toa Alta', 'Toa Baja', 'Trujillo Alto', 'Utuado', 'Vega Alta', 'Vega Baja',
  'Vieques', 'Villalba', 'Yabucoa', 'Yauco',
]

// ─── 1. TopBar ────────────────────────────────────────────────────────────────
function TopBar() {
  return (
    <div style={{ backgroundColor: '#1F2AA8' }} className="py-2 px-4 text-white text-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-5">
          <a
            href={`mailto:${EMAIL}`}
            className="flex items-center gap-1.5 transition-colors hover:text-[#FFCF33]"
          >
            <EmailIcon className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="hidden sm:inline">{EMAIL}</span>
          </a>
          <a
            href={PHONE_HREF}
            className="flex items-center gap-1.5 transition-colors hover:text-[#FFCF33]"
          >
            <PhoneIcon className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{PHONE}</span>
          </a>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://www.facebook.com/universalsolarpr.net"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="transition-colors hover:text-[#FFCF33]"
          >
            <FacebookIcon className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://instagram.com/universalsolarpr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="transition-colors hover:text-[#FFCF33]"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  )
}

// ─── 2. Navbar ────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'Inicio', href: '/' },
  { label: 'Productos', href: '#productos' },
  { label: 'Baterías Yeti', href: '#productos' },
  { label: 'Equipo Comercial', href: '#productos' },
  { label: 'Bonos', href: '#bonos' },
  { label: 'Contáctenos', href: '#contacto' },
]

function Navbar({ scrolled, darkMode, toggleDarkMode }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header
      className={`transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}
      style={{ backgroundColor: darkMode ? '#111827' : '#ffffff' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img src="/images/logo_pr.png" alt="Universal Solar PR" className="h-12 w-auto object-contain" />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="text-sm font-medium transition-colors hover:text-[#4CAF50]" style={{ color: darkMode ? '#e5e7eb' : '#333333' }}>
                {l.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA + dark mode + mobile hamburger */}
          <div className="flex items-center gap-3">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors border"
              style={{
                backgroundColor: darkMode ? '#1F2AA8' : '#f3f4f6',
                borderColor: darkMode ? '#1F2AA8' : '#e5e7eb',
                color: darkMode ? '#FFCF33' : '#555555',
              }}
              aria-label="Toggle dark mode"
              title={darkMode ? 'Modo claro' : 'Modo oscuro'}
            >
              {darkMode
                ? <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/></svg>
                : <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd"/></svg>
              }
            </button>

            <a
              href={PHONE_HREF}
              className="hidden sm:inline-flex items-center gap-2 rounded-full font-semibold text-white text-sm px-5 py-2.5 transition-colors"
              style={{ backgroundColor: '#4CAF50' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#388E3C')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4CAF50')}
            >
              <PhoneIcon className="w-4 h-4" />
              <span>Llámenos</span>
            </a>
            {/* Hamburger — mobile only */}
            <button
              className="md:hidden flex flex-col items-center justify-center w-9 h-9 gap-1.5 rounded-lg"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Menu"
            >
              <span
                className="block w-5 h-0.5 rounded transition-all duration-300"
                style={{
                  backgroundColor: '#333333',
                  transform: mobileOpen ? 'translateY(8px) rotate(45deg)' : 'none',
                }}
              />
              <span
                className="block w-5 h-0.5 rounded transition-all duration-300"
                style={{
                  backgroundColor: '#333333',
                  opacity: mobileOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-5 h-0.5 rounded transition-all duration-300"
                style={{
                  backgroundColor: '#333333',
                  transform: mobileOpen ? 'translateY(-8px) rotate(-45deg)' : 'none',
                }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu drawer */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{ maxHeight: mobileOpen ? '400px' : '0' }}
      >
        <nav className="px-4 pb-5 pt-2 border-t space-y-1" style={{ borderColor: darkMode ? '#374151' : '#f3f4f6' }}>
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="block px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-gray-50"
              style={{ color: '#333333' }}
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <a
              href={PHONE_HREF}
              className="flex items-center justify-center gap-2 rounded-full font-semibold text-white py-3 text-sm"
              style={{ backgroundColor: '#4CAF50' }}
              onClick={() => setMobileOpen(false)}
            >
              <PhoneIcon className="w-4 h-4" /> {PHONE}
            </a>
            <a
              href={WHATSAPP}
              className="flex items-center justify-center gap-2 rounded-full font-semibold text-white py-3 text-sm"
              style={{ backgroundColor: '#25D366' }}
              onClick={() => setMobileOpen(false)}
            >
              <WhatsAppIcon className="w-4 h-4" /> WhatsApp
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}

// ─── 3. Hero ─────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-white px-4 overflow-hidden"
      style={{
        backgroundImage: 'url(/images/home01.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Blue tinted dark overlay — matches universalsolar.com hero */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(31,42,168,0.72)' }} />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto pt-28">
        {/* Eyebrow */}
        <p
          className="text-xs sm:text-sm font-bold tracking-[0.35em] uppercase mb-6"
          style={{ color: '#FFCF33' }}
        >
          60 Años Sirviendo a Puerto Rico
        </p>

        {/* H1 */}
        <h1 className="font-bold leading-tight mb-6">
          <span className="block text-4xl sm:text-6xl lg:text-7xl text-white mb-1">
            Bienvenidos a
          </span>
          <span className="block text-4xl sm:text-6xl lg:text-7xl text-white">
            Universal Solar PR
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: 'rgba(255,255,255,0.70)' }}>
          Fabricamos y distribuimos calentadores solares, tanques de agua y más aquí en Puerto Rico.
        </p>

        {/* Two CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a
            href="#productos"
            className="inline-flex items-center justify-center rounded-full font-semibold text-white px-8 py-3.5 text-base w-full sm:w-auto transition-colors"
            style={{ backgroundColor: '#1F2AA8' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0d1150')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1F2AA8')}
          >
            Ver Productos
          </a>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center justify-center rounded-full font-semibold text-white border-2 border-white px-8 py-3.5 text-base w-full sm:w-auto transition-colors hover:bg-white/10"
          >
            Contáctenos
          </a>
        </div>

        {/* Text links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-75"
            style={{ color: '#FFCF33' }}
          >
            Solicitar Cotización
            <ArrowRightIcon className="w-4 h-4" />
          </a>
          <a
            href={WHATSAPP}
            className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-75"
            style={{ color: '#25D366' }}
          >
            <WhatsAppIcon className="w-4 h-4" />
            Cotización por WhatsApp
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  )
}

// ─── 4. FeatureStrip ─────────────────────────────────────────────────────────
function FeatureStrip() {
  // Layout matches universalsolar.com exactly: YELLOW | BLUE | YELLOW
  const features = [
    {
      icon: <ShieldIcon className="w-7 h-7" />,
      title: 'Garantía Incluída',
      desc: 'Tu tranquilidad es nuestra prioridad. Garantía real y productos confiables, hechos para durar.',
      variant: 'yellow',
    },
    {
      icon: <FlagIcon className="w-7 h-7" />,
      title: 'Hecho 100% en Puerto Rico',
      desc: 'Cada producto refleja nuestro compromiso con la excelencia. Manufacturamos con materiales de la más alta calidad.',
      variant: 'blue',
    },
    {
      icon: <ChatIcon className="w-7 h-7" />,
      title: 'Servicio al Cliente Confiable',
      desc: 'Brindamos un servicio atento y confiable luego de la venta, disponible cuando más lo necesites.',
      variant: 'yellow',
    },
  ]

  const cardBg   = { yellow: '#FFCF33', blue: '#1F2AA8', white: '#ffffff' }
  const iconBg   = { yellow: '#1a2a1a', blue: '#ffffff',  white: '#4CAF50' }
  const iconClr  = { yellow: '#ffffff',  blue: '#1F2AA8', white: '#ffffff'  }
  const titleClr = { yellow: '#1a2a1a', blue: '#ffffff',  white: '#1a2a1a' }
  const descClr  = { yellow: '#1a2a1a', blue: 'rgba(255,255,255,0.85)', white: '#555555' }

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-2xl p-8 text-center"
            style={{
              backgroundColor: cardBg[f.variant],
              border: f.variant === 'white' ? '1px solid #e5e7eb' : 'none',
            }}
          >
            {/* Icon circle */}
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ backgroundColor: iconBg[f.variant], color: iconClr[f.variant] }}
            >
              {f.icon}
            </div>
            <h3 className="font-bold text-lg mb-3" style={{ color: titleClr[f.variant] }}>
              {f.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: descClr[f.variant] }}>
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── 5. Products Grid ────────────────────────────────────────────────────────
function ProductCard({ p }) {
  return (
    <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-[#4CAF50] hover:shadow-lg">
      {/* Product image */}
      <div className="overflow-hidden" style={{ height: '200px', backgroundColor: '#f0f0f0' }}>
        <img
          src={p.img}
          alt={p.nombre}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1">
        <div
          className="text-xs font-bold tracking-widest uppercase mb-2"
          style={{ color: '#4CAF50' }}
        >
          {p.categoria}
        </div>

        <h3 className="font-bold text-lg mb-2" style={{ color: '#333333' }}>
          {p.nombre}
        </h3>

        <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: '#555555' }}>
          {p.descripcion}
        </p>

        {/* $300 Bono badge */}
        {p.bono && (
          <div
            className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full mb-4 self-start"
            style={{ backgroundColor: '#FFCF33', color: '#1a2a1a' }}
          >
            $300 Bono incluido
          </div>
        )}

        {/* Call + WhatsApp buttons */}
        <div className="flex gap-2 mt-2">
          <a
            href={PHONE_HREF}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full font-semibold text-white text-xs py-2.5 transition-colors"
            style={{ backgroundColor: '#4CAF50' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#388E3C')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4CAF50')}
          >
            <PhoneIcon className="w-3.5 h-3.5" /> Llamar
          </a>
          <a
            href={WHATSAPP}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full font-semibold text-white text-xs py-2.5 transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#25D366' }}
          >
            <WhatsAppIcon className="w-3.5 h-3.5" /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}

function ProductsGrid({ dm = {} }) {
  return (
    <section id="productos" className="py-20 px-4" style={{ backgroundColor: dm.bgSubtle || '#f9f9f9' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div
            className="text-xs font-bold tracking-[0.35em] uppercase mb-3"
            style={{ color: '#4CAF50' }}
          >
            CATÁLOGO COMPLETO
          </div>
          <h2 className="font-bold text-4xl sm:text-5xl mb-4" style={{ color: '#333333' }}>
            Nuestros Productos
          </h2>
          <p className="max-w-xl mx-auto leading-relaxed text-gray-400">
            Soluciones de calidad para agua caliente, agua pura y aire limpio —
            respaldadas por 60 años de manufactura en Puerto Rico.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIAS.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 6. Marquee ──────────────────────────────────────────────────────────────
function MarqueeStrip() {
  const base =
    '60 AÑOS EN PUERTO RICO  ·  GARANTÍA INCLUIDA  ·  SERVICIO AL CLIENTE CONFIABLE  ·  INSTALACIÓN EN TODA PR  ·  FABRICADO LOCALMENTE  ·  '
  // Doubled so the seamless loop works (animate translateX -50%)
  const doubled = base + base

  return (
    <div className="overflow-hidden py-4" style={{ backgroundColor: '#FFCF33' }}>
      <div
        className="marquee-track font-bold uppercase text-sm tracking-widest"
        style={{ color: '#1a2a1a' }}
      >
        {doubled}
      </div>
    </div>
  )
}

// ─── 7. CTA Section ──────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      {/* Left: photo background + phone — matches universalsolar.com CTA */}
      <div
        className="relative px-10 py-16 flex flex-col items-center text-center md:items-start md:text-left overflow-hidden"
        style={{
          backgroundImage: 'url(/images/cta-image.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(26,42,26,0.78)' }} />
        <div className="relative z-10">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-6 text-white"
            style={{ backgroundColor: '#4CAF50' }}
          >
            <PhoneIcon className="w-8 h-8" />
          </div>
          <h2 className="font-bold text-3xl text-white mb-3">¿Listo para ahorrar?</h2>
          <p className="mb-6 leading-relaxed" style={{ color: 'rgba(255,255,255,0.70)' }}>
            Llama hoy y obtén tu cotización gratis
          </p>
          <a
            href={PHONE_HREF}
            className="font-bold text-3xl sm:text-4xl transition-opacity hover:opacity-80"
            style={{ color: '#FFCF33' }}
          >
            {PHONE}
          </a>
        </div>
      </div>

      {/* Right: yellow + $300 bono */}
      <div
        className="px-10 py-16 flex flex-col items-center text-center md:items-start md:text-left"
        style={{ backgroundColor: '#FFCF33' }}
      >
        <div className="font-bold text-7xl sm:text-8xl leading-none mb-2" style={{ color: '#1a2a1a' }}>
          $300
        </div>
        <div className="font-bold text-xl mb-3" style={{ color: '#1a2a1a' }}>
          Descuento en tu próxima compra
        </div>
        <p className="text-sm leading-relaxed mb-8" style={{ color: '#1a2a1a' }}>
          Aplica en calentadores solares, cisternas y más. Financiamiento disponible.
        </p>
        <a
          href={PHONE_HREF}
          className="inline-flex items-center gap-2 rounded-full font-semibold text-white px-7 py-3.5 transition-colors"
          style={{ backgroundColor: '#1a2a1a' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2d3a2d')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1a2a1a')}
        >
          <PhoneIcon className="w-4 h-4" />
          Llamar Ahora
        </a>
      </div>
    </section>
  )
}

// ─── 8. Certifications ───────────────────────────────────────────────────────
function Certifications({ dm = {} }) {
  return (
    <section className="py-16 px-4" style={{ backgroundColor: dm.bgSubtle || '#f5f5f5' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-bold text-3xl sm:text-4xl mb-3" style={{ color: '#333333' }}>
            Certificaciones
          </h2>
          <p className="text-sm" style={{ color: '#555555' }}>
            Aprobados por agencias federales y organismos internacionales de calidad
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CERTS.map((c) => (
            <div
              key={c.title}
              className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col items-center text-center hover:shadow-md transition-shadow"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-3 text-xl"
                style={{ backgroundColor: 'rgba(76,175,80,0.12)' }}
              >
                {c.icon}
              </div>
              <div className="font-bold text-sm mb-1" style={{ color: '#333333' }}>
                {c.title}
              </div>
              <div className="text-xs" style={{ color: '#555555' }}>
                {c.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 9. Service Areas ────────────────────────────────────────────────────────
function ServiceAreas({ dm = {} }) {
  return (
    <section className="py-16 px-4" style={{ backgroundColor: dm.bg || '#ffffff' }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div
            className="text-xs font-bold tracking-[0.35em] uppercase mb-3"
            style={{ color: '#4CAF50' }}
          >
            Cobertura
          </div>
          <h2 className="font-bold text-3xl sm:text-4xl mb-3" style={{ color: '#333333' }}>
            Toda Puerto Rico
          </h2>
          <p className="text-sm" style={{ color: '#555555' }}>
            Instalación y servicio técnico especializado en todos los municipios de la isla
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {MUNICIPIOS.map((m) => (
            <span
              key={m}
              className="px-3.5 py-1.5 bg-white border border-gray-200 text-sm rounded-full transition-colors cursor-default hover:border-[#4CAF50] hover:text-[#4CAF50]"
              style={{ color: '#555555' }}
            >
              {m}
            </span>
          ))}
          <span
            className="px-3.5 py-1.5 text-sm rounded-full font-semibold"
            style={{
              backgroundColor: 'rgba(76,175,80,0.08)',
              border: '1px solid rgba(76,175,80,0.3)',
              color: '#4CAF50',
            }}
          >
            + muchos más…
          </span>
        </div>
      </div>
    </section>
  )
}

// ─── 10. Footer ──────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ backgroundColor: '#1a2a1a' }}>
      {/* Top contact bar */}
      <div className="border-b py-5 px-4" style={{ borderColor: 'rgba(255,255,255,0.10)' }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-12">
          <div className="flex items-center gap-3" style={{ color: 'rgba(255,255,255,0.65)' }}>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#4CAF50' }}
            >
              <EmailIcon className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm">{EMAIL}</span>
          </div>
          <div className="flex items-center gap-3" style={{ color: 'rgba(255,255,255,0.65)' }}>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#4CAF50' }}
            >
              <PhoneIcon className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm">{PHONE}</span>
          </div>
          <div className="flex items-center gap-3" style={{ color: 'rgba(255,255,255,0.65)' }}>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm"
              style={{ backgroundColor: '#4CAF50' }}
            >
              📍
            </div>
            <span className="text-sm">Toa Baja, Puerto Rico</span>
          </div>
        </div>
      </div>

      {/* Main footer columns */}
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Col 1: Brand */}
          <div>
            <div className="mb-4">
              <img
                src="/images/logo-1_w.svg"
                alt="Universal Solar"
                className="h-12 w-auto object-contain"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Pioneros en la manufactura de calentadores solares y cisternas de agua en Puerto Rico.
              Más de 60 años de calidad, servicio y confianza.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/universalsolarpr.net"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
                style={{ backgroundColor: 'rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.65)' }}
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/universalsolarpr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
                style={{ backgroundColor: 'rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.65)' }}
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Menu */}
          <div>
            <h4
              className="font-bold text-xs tracking-[0.25em] uppercase mb-5"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              Menú
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Inicio', href: '/' },
                { label: 'Productos', href: '#productos' },
                { label: 'Certificaciones', href: '#certificaciones' },
                { label: 'Áreas de Servicio', href: '#servicios' },
                { label: 'Contacto', href: PHONE_HREF },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.45)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Products */}
          <div>
            <h4
              className="font-bold text-xs tracking-[0.25em] uppercase mb-5"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              Productos
            </h4>
            <ul className="space-y-3">
              {CATEGORIAS.map((c) => (
                <li key={c.id}>
                  <a
                    href={PHONE_HREF}
                    className="flex items-center gap-2 text-sm transition-colors hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.45)' }}
                  >
                    <span>{c.emoji}</span>
                    <span>{c.nombre}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-4 py-5" style={{ borderTop: '1px solid rgba(255,255,255,0.10)' }}>
        <div
          className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-xs"
          style={{ color: 'rgba(255,255,255,0.25)' }}
        >
          <p>© 2025 Universal Solar PR · Todos los derechos reservados · Fabricamos en Puerto Rico desde 1965 🇵🇷</p>
          <div className="flex items-center gap-4">
            <a href="/about" className="transition-colors hover:text-white">About</a>
            <a href="/privacy-policy" className="transition-colors hover:text-white">Privacy Policy</a>
            <a href="/sitemap" className="transition-colors hover:text-white">Sitemap</a>
          </div>
        </div>
        {/* Legal disclaimer */}
        <div className="border-t mt-4 pt-4" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <p className="max-w-7xl mx-auto text-center text-xs" style={{ color: 'rgba(255,255,255,0.18)' }}>
            Restricciones Aplican. Financiamiento Disponible en Calentadores Solares y Tanques de Agua.
          </p>
        </div>
      </div>
    </footer>
  )
}

// ─── CountUp helper ──────────────────────────────────────────────────────────
function CountUp({ end, suffix = '', duration = 1800 }) {
  const [count, setCount] = useState(0)
  const ref = React.useRef(null)
  const started = React.useRef(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const startTime = performance.now()
        const tick = (now) => {
          const elapsed = now - startTime
          const progress = Math.min(elapsed / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.round(eased * end))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [end, duration])
  return <span ref={ref}>{count}{suffix}</span>
}

// ─── 11. About Section ───────────────────────────────────────────────────────
function AboutSection({ dm = {} }) {
  return (
    <section id="nosotros" className="py-16 px-4" style={{ backgroundColor: dm.bgSubtle || '#f9f9f9' }}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img src="/images/home01.jpeg" alt="Universal Solar PR" className="w-full h-72 object-cover" />
        </div>
        <div>
          <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#1F2AA8' }}>
            QUIENES SOMOS
          </div>
          <h2 className="font-bold text-3xl sm:text-4xl mb-4" style={{ color: '#333333' }}>
            60 Anos de Experiencia en Puerto Rico
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: '#555555' }}>
            Universal Solar PR es una empresa con mas de 60 anos fabricando y distribuyendo
            calentadores solares, cisternas de agua y sistemas de purificacion en toda la isla.
          </p>
          <p className="text-base leading-relaxed mb-6" style={{ color: '#555555' }}>
            Somos distribuidores autorizados de RainSoft, Heliocol y ActivePure. Todo nuestro
            trabajo incluye instalacion y servicio tecnico especializado en todos los municipios
            de Puerto Rico.
          </p>
          <div className="flex flex-wrap gap-8">
            <div className="text-center">
              <div className="font-bold text-3xl" style={{ color: '#1F2AA8' }}>
                <CountUp end={60} suffix="+" />
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">Anos en PR</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-3xl" style={{ color: '#1F2AA8' }}>
                <CountUp end={78} />
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">Municipios</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-3xl" style={{ color: '#1F2AA8' }}>
                <CountUp end={500} suffix="+" />
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">Instalaciones</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── 12. Incentives Section ───────────────────────────────────────────────────
function IncentivesSection({ dm = {} }) {
  const incentivos = [
    {
      icon: '💡',
      title: 'Credito Federal 30%',
      desc: 'El gobierno federal ofrece un credito de hasta el 30% del costo total de tu sistema solar en tu declaracion de impuestos.',
    },
    {
      icon: '🏛️',
      title: 'Exencion de Propiedad',
      desc: 'En Puerto Rico, los sistemas de energia solar estan exentos del impuesto sobre la propiedad.',
    },
    {
      icon: '💳',
      title: 'Financiamiento Disponible',
      desc: 'Planes de financiamiento desde $500 de pronto. Cuotas mensuales bajas. Aprobacion rapida.',
    },
    {
      icon: '📋',
      title: 'Ley 114 de Puerto Rico',
      desc: 'La ley local permite deducciones adicionales en la planilla de PR para sistemas de energia renovable.',
    },
  ]

  return (
    <section id="bonos" className="py-16 px-4" style={{ backgroundColor: dm.bg || '#ffffff' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#1F2AA8' }}>
            AHORROS E INCENTIVOS
          </div>
          <h2 className="font-bold text-3xl sm:text-4xl mb-3" style={{ color: '#333333' }}>
            Usa Tu Incentivo Inteligentemente
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            El gobierno federal y el gobierno de Puerto Rico ofrecen incentivos significativos
            para quienes instalen sistemas de energia solar y agua.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {incentivos.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all"
              style={{ borderColor: '#e5e7eb' }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#1F2AA8')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-bold text-base mb-2" style={{ color: '#333333' }}>{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#666666' }}>{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="rounded-2xl p-8 text-center" style={{ backgroundColor: '#FFCF33' }}>
          <p className="font-bold text-lg mb-2" style={{ color: '#1a2a1a' }}>
            Quieres saber cuanto puedes ahorrar con estos incentivos?
          </p>
          <p className="text-sm mb-5" style={{ color: '#1a2a1a' }}>
            Llamanos o escribenos por WhatsApp — orientacion gratis, sin compromiso.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-white px-7 py-3 transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#1F2AA8' }}
            >
              <PhoneIcon className="w-4 h-4" /> Llamar ahora
            </a>
            <a
              href={WHATSAPP}
              className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-white px-7 py-3 transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#25D366' }}
            >
              <WhatsAppIcon className="w-4 h-4" /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── 13. Testimonials ────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: 'Carlos Rivera',
    location: 'San Juan, PR',
    stars: 5,
    text: 'Llevo 3 anos con mi calentador solar y ha sido la mejor inversion. Ahorro mas de $120 al mes en luz. El servicio de instalacion fue rapido y profesional.',
  },
  {
    name: 'Maria Lopez',
    location: 'Caguas, PR',
    stars: 5,
    text: 'Despues del huracan instale una cisterna de acero inoxidable. Nunca mas me quedo sin agua. La calidad es excelente y el equipo fue muy atento.',
  },
  {
    name: 'Jose Hernandez',
    location: 'Ponce, PR',
    stars: 5,
    text: 'El sistema RainSoft cambio la calidad del agua en mi casa. El agua sabe limpia, sin cloro. La familia esta muy contenta. 100% recomendado.',
  },
  {
    name: 'Ana Gonzalez',
    location: 'Bayamon, PR',
    stars: 5,
    text: 'Excelente empresa. Me ayudaron con el credito federal del 30% y con el financiamiento. El proceso fue sencillo y la instalacion impecable.',
  },
]

function StarIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="#FFCF33" className="w-4 h-4">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function TestimonialsSection({ dm = {} }) {
  return (
    <section className="py-16 px-4" style={{ backgroundColor: dm.bgSubtle || '#f9f9f9' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#1F2AA8' }}>
            TESTIMONIOS
          </div>
          <h2 className="font-bold text-3xl sm:text-4xl mb-3" style={{ color: '#333333' }}>
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Miles de familias y negocios en Puerto Rico confian en Universal Solar PR.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.stars }).map((_, i) => <StarIcon key={i} />)}
              </div>
              <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: '#555555' }}>
                "{t.text}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
                  style={{ backgroundColor: '#1F2AA8' }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-sm" style={{ color: '#333333' }}>{t.name}</div>
                  <div className="text-xs text-gray-400">{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 14. Contact Form ─────────────────────────────────────────────────────────
function ContactForm({ dm = {} }) {
  return (
    <section id="contacto" className="py-16 px-4" style={{ backgroundColor: dm.bgSubtle || '#f9f9f9' }}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#1F2AA8' }}>
            CONTACTO
          </div>
          <h2 className="font-bold text-3xl sm:text-4xl mb-3" style={{ color: '#333333' }}>
            Orientacion y Estimados Gratis
          </h2>
          <p className="text-gray-500 text-sm">
            Completa el formulario y te contactamos dentro de 24 horas. Sin compromiso.
          </p>
        </div>
        <form
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-5"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#333333' }}>
                Nombre *
              </label>
              <input
                type="text"
                required
                placeholder="Tu nombre completo"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none transition-colors"
                onFocus={(e) => (e.currentTarget.style.borderColor = '#1F2AA8')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#333333' }}>
                Telefono *
              </label>
              <input
                type="tel"
                required
                placeholder="787-000-0000"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none transition-colors"
                onFocus={(e) => (e.currentTarget.style.borderColor = '#1F2AA8')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: '#333333' }}>
              Email
            </label>
            <input
              type="email"
              placeholder="tu@email.com"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none transition-colors"
              onFocus={(e) => (e.currentTarget.style.borderColor = '#1F2AA8')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: '#333333' }}>
              Mensaje
            </label>
            <textarea
              rows={4}
              placeholder="En que producto estas interesado? Tienes alguna pregunta?"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none transition-colors resize-none"
              onFocus={(e) => (e.currentTarget.style.borderColor = '#1F2AA8')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
            />
          </div>
          <div className="flex items-start gap-3">
            <input type="checkbox" required id="privacy" className="mt-0.5 w-4 h-4 flex-shrink-0 accent-[#1F2AA8]" />
            <label htmlFor="privacy" className="text-xs leading-relaxed" style={{ color: '#555555' }}>
              He leído y acepto la{' '}
              <a href="/privacy-policy" className="underline" style={{ color: '#1F2AA8' }}>
                Privacy Policy
              </a>
              *
            </label>
          </div>
          <button
            type="submit"
            className="w-full rounded-full font-semibold text-white py-4 text-base transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#1F2AA8' }}
          >
            Enviar Mensaje
          </button>
          <p className="text-center text-xs text-gray-400">
            También puedes escribirnos directamente por{' '}
            <a href={WHATSAPP} className="font-semibold" style={{ color: '#25D366' }}>
              WhatsApp
            </a>
          </p>
        </form>
      </div>
    </section>
  )
}

// ─── 14. ROI Calculator ──────────────────────────────────────────────────────
function ROICalculator() {
  const [bill, setBill] = useState('')
  const monthly = parseFloat(bill) || 0
  const savings = Math.round(monthly * 0.75)
  const annual = savings * 12
  const tenYear = annual * 10

  return (
    <section className="py-16 px-4" style={{ background: 'linear-gradient(135deg, #0d1150 0%, #1F2AA8 100%)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#FFCF33' }}>
            CALCULADORA DE AHORROS
          </div>
          <h2 className="font-bold text-3xl sm:text-4xl text-white mb-3">
            Cuanto Puedes Ahorrar?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.70)' }} className="text-sm max-w-xl mx-auto">
            Ingresa tu factura mensual de la AEE y te mostramos cuanto ahorraras con energia solar.
          </p>
        </div>

        {/* Input */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-10">
          <div className="relative w-full sm:w-64">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-lg" style={{ color: '#555' }}>$</span>
            <input
              type="number"
              min="0"
              max="9999"
              value={bill}
              onChange={(e) => setBill(e.target.value)}
              placeholder="Ej: 250"
              className="w-full pl-8 pr-4 py-4 rounded-xl text-lg font-semibold outline-none border-2 border-transparent transition-colors"
              style={{ borderColor: bill ? '#FFCF33' : 'transparent' }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#FFCF33')}
              onBlur={(e) => (e.currentTarget.style.borderColor = bill ? '#FFCF33' : 'transparent')}
            />
          </div>
          <span className="text-white font-medium">por mes de factura AEE</span>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Ahorro Mensual', value: `$${savings.toLocaleString()}`, sub: 'estimado por mes' },
            { label: 'Ahorro Anual', value: `$${annual.toLocaleString()}`, sub: 'estimado por año' },
            { label: 'Ahorro en 10 Años', value: `$${tenYear.toLocaleString()}`, sub: 'retorno de inversion' },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl p-6 text-center" style={{ backgroundColor: 'rgba(255,255,255,0.10)' }}>
              <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'rgba(255,255,255,0.55)' }}>
                {item.label}
              </div>
              <div
                className="font-bold text-3xl sm:text-4xl mb-1 transition-all duration-300"
                style={{ color: monthly > 0 ? '#FFCF33' : 'rgba(255,255,255,0.25)' }}
              >
                {monthly > 0 ? item.value : '$—'}
              </div>
              <div className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{item.sub}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.60)' }}>
            * Estimado basado en un ahorro promedio del 75% de la factura mensual. Resultados reales pueden variar.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-white px-8 py-3.5 transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#4CAF50' }}
            >
              <PhoneIcon className="w-4 h-4" /> Quiero mi cotizacion gratis
            </a>
            <a
              href={WHATSAPP}
              className="inline-flex items-center justify-center gap-2 rounded-full font-semibold px-8 py-3.5 transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#FFCF33', color: '#1a2a1a' }}
            >
              <WhatsAppIcon className="w-4 h-4" /> Cotizacion por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── 15. FAQ Accordion ───────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'Cuanto tiempo tarda la instalacion?',
    a: 'La mayoria de las instalaciones residenciales se completan en 1-2 dias. Los sistemas comerciales pueden tomar de 3-5 dias dependiendo del tamano.',
  },
  {
    q: 'Que pasa con mis paneles durante un huracan?',
    a: 'Nuestros calentadores solares y cisternas son certificados para resistir vientos de huracan. Llevamos 60 anos instalando en Puerto Rico y nuestros productos han sobrevivido multiples huracanes, incluyendo Maria.',
  },
  {
    q: 'Cuanto me puedo ahorrar en mi factura de la AEE?',
    a: 'La mayoria de nuestros clientes reducen su factura de la AEE entre un 60% y 90% dependiendo del sistema. Un calentador solar solo puede reducir tu factura hasta un 40% ya que el calentamiento de agua representa ese porcentaje del consumo electrico.',
  },
  {
    q: 'Hay algun incentivo o credito del gobierno?',
    a: 'Si. El gobierno federal ofrece un credito del 30% del costo total del sistema en tu declaracion de impuestos. Puerto Rico tambien ofrece exencion de propiedad para sistemas solares. Te ayudamos con todo el papeleo.',
  },
  {
    q: 'Ofrecen financiamiento?',
    a: 'Si, tenemos planes de financiamiento disponibles con cuotas mensuales accesibles. Aprobacion rapida. Llama o escribenos por WhatsApp para conocer las opciones.',
  },
  {
    q: 'Donde instalan? Solo en ciertos pueblos?',
    a: 'Instalamos en los 78 municipios de Puerto Rico. Desde San Juan hasta Rincon, desde Ponce hasta Fajardo. Si estas en PR, llegamos a ti.',
  },
  {
    q: 'Que garantia tienen los productos?',
    a: 'Los calentadores solares tienen garantia de 5 anos. Las cisternas de acero inoxidable tienen garantia de por vida contra defectos de manufactura. Todos nuestros productos incluyen servicio tecnico post-venta.',
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="border-b cursor-pointer"
      style={{ borderColor: '#e5e7eb' }}
      onClick={() => setOpen((o) => !o)}
    >
      <div className="flex items-center justify-between py-5 gap-4">
        <span className="font-semibold text-sm sm:text-base" style={{ color: '#333333' }}>{q}</span>
        <span
          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold transition-transform duration-300"
          style={{
            backgroundColor: '#1F2AA8',
            transform: open ? 'rotate(45deg)' : 'none',
          }}
        >
          +
        </span>
      </div>
      <div
        className="overflow-hidden transition-all duration-300 text-sm leading-relaxed"
        style={{
          maxHeight: open ? '300px' : '0',
          color: '#555555',
          paddingBottom: open ? '16px' : '0',
        }}
      >
        {a}
      </div>
    </div>
  )
}

function FAQSection({ dm = {} }) {
  return (
    <section className="py-16 px-4" style={{ backgroundColor: dm.bg || '#ffffff' }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#1F2AA8' }}>
            PREGUNTAS FRECUENTES
          </div>
          <h2 className="font-bold text-3xl sm:text-4xl mb-3" style={{ color: '#333333' }}>
            Preguntas Frecuentes
          </h2>
          <p className="text-gray-500 text-sm">
            Respuestas a las dudas mas comunes sobre energia solar en Puerto Rico.
          </p>
        </div>
        <div className="divide-y" style={{ borderColor: '#e5e7eb' }}>
          {FAQS.map((f) => <FAQItem key={f.q} {...f} />)}
        </div>
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500 mb-4">Tienes otra pregunta? Escribenos directamente.</p>
          <a
            href={WHATSAPP}
            className="inline-flex items-center gap-2 rounded-full font-semibold text-white px-7 py-3 transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#25D366' }}
          >
            <WhatsAppIcon className="w-4 h-4" /> Preguntar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── 16. Sticky Mobile CTA ───────────────────────────────────────────────────
function StickyMobileCTA() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300"
      style={{ transform: visible ? 'translateY(0)' : 'translateY(100%)' }}
    >
      <div className="grid grid-cols-2 shadow-2xl">
        <a
          href={PHONE_HREF}
          className="flex items-center justify-center gap-2 py-4 font-bold text-white text-sm"
          style={{ backgroundColor: '#4CAF50' }}
        >
          <PhoneIcon className="w-5 h-5" /> Llamar
        </a>
        <a
          href={WHATSAPP}
          className="flex items-center justify-center gap-2 py-4 font-bold text-white text-sm"
          style={{ backgroundColor: '#25D366' }}
        >
          <WhatsAppIcon className="w-5 h-5" /> WhatsApp
        </a>
      </div>
    </div>
  )
}

// ─── 17. Quick Quote Form ────────────────────────────────────────────────────
const PRODUCT_OPTIONS = [
  'Calentador Solar',
  'Cisterna de Agua',
  'Planta Fotovoltaica',
  'Batería YETI',
  'Filtro RainSoft',
  'ActivePure',
  'Otro / No estoy seguro',
]

function QuickQuoteSection({ darkMode }) {
  const bg = darkMode ? '#111827' : '#1F2AA8'
  return (
    <section className="py-14 px-4" style={{ backgroundColor: bg }}>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left: copy */}
        <div className="reveal-section">
          <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#FFCF33' }}>
            COTIZACION GRATIS
          </div>
          <h2 className="font-bold text-3xl sm:text-4xl text-white mb-4 leading-tight">
            Obtén Tu Cotización en Menos de 24 Horas
          </h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.70)' }}>
            Sin compromiso. Sin costo. Nuestro equipo te contacta con precios exactos para tu hogar o negocio.
          </p>
          <div className="space-y-3">
            {['Respuesta en menos de 24 horas', 'Instalacion en toda Puerto Rico', 'Financiamiento disponible'].map(item => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#4CAF50' }}>
                  <svg viewBox="0 0 20 20" fill="white" className="w-3 h-3"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd"/></svg>
                </div>
                <span className="text-sm text-white">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <div className="bg-white rounded-2xl p-7 shadow-2xl reveal-section">
          <h3 className="font-bold text-lg mb-5" style={{ color: '#333333' }}>Completa el formulario</h3>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <input
              type="text" required placeholder="Tu nombre *"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none transition-colors min-h-[48px]"
              onFocus={(e) => (e.currentTarget.style.borderColor = '#1F2AA8')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
            />
            <input
              type="tel" required placeholder="Tu teléfono *"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none transition-colors min-h-[48px]"
              onFocus={(e) => (e.currentTarget.style.borderColor = '#1F2AA8')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
            />
            <select
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none transition-colors min-h-[48px] bg-white"
              style={{ color: '#555555' }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#1F2AA8')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
            >
              <option value="">Tu pueblo...</option>
              {MUNICIPIOS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            <select
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none transition-colors min-h-[48px] bg-white"
              style={{ color: '#555555' }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#1F2AA8')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
            >
              <option value="">Producto de interés...</option>
              {PRODUCT_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
            <button
              type="submit"
              className="w-full rounded-full font-semibold text-white py-4 text-base transition-opacity hover:opacity-90 min-h-[52px]"
              style={{ backgroundColor: '#1F2AA8' }}
            >
              Solicitar Cotización Gratis
            </button>
            <p className="text-center text-xs text-gray-400">
              O escríbenos por{' '}
              <a href={WHATSAPP} className="font-semibold" style={{ color: '#25D366' }}>WhatsApp</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

// ─── 18. How It Works ────────────────────────────────────────────────────────
function HowItWorksSection({ dm = {} }) {
  const steps = [
    {
      num: '01',
      title: 'Llamanos o Escríbenos',
      desc: 'Llama al 787-310-5555 o escríbenos por WhatsApp. Te atendemos en minutos y coordinamos una visita gratuita a tu hogar o negocio.',
      icon: <PhoneIcon className="w-8 h-8" />,
    },
    {
      num: '02',
      title: 'Evaluacion y Cotizacion Gratis',
      desc: 'Nuestro equipo visita tu propiedad, evalua tus necesidades y te entrega una cotizacion detallada sin compromiso, incluyendo incentivos disponibles.',
      icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M9 12h3.75L9 18.75V12zm0-6.75A.75.75 0 019.75 4.5h4.5a.75.75 0 010 1.5H9.75A.75.75 0 019 5.25zM9.75 3A2.25 2.25 0 007.5 5.25v13.5A2.25 2.25 0 009.75 21h4.5A2.25 2.25 0 0016.5 18.75V5.25A2.25 2.25 0 0014.25 3h-4.5z"/></svg>,
    },
    {
      num: '03',
      title: 'Instalacion y Ahorros',
      desc: 'Instalamos en 1-2 dias con nuestro equipo certificado. Desde el primer mes comienzas a ver el ahorro en tu factura de la AEE.',
      icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"/></svg>,
    },
  ]

  return (
    <section className="py-16 px-4" style={{ backgroundColor: dm.bgSubtle || '#f9f9f9' }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 reveal-section">
          <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#1F2AA8' }}>
            COMO FUNCIONA
          </div>
          <h2 className="font-bold text-3xl sm:text-4xl mb-3" style={{ color: '#333333' }}>
            Tan Facil Como 1, 2, 3
          </h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">
            Desde tu primera llamada hasta el primer mes de ahorros, te acompanamos en cada paso.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div key={s.num} className="relative reveal-section flex flex-col items-center text-center">
              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-10 left-[calc(50%+48px)] right-0 h-0.5 -translate-y-1/2"
                  style={{ backgroundColor: '#e5e7eb', right: '-50%' }}
                />
              )}
              {/* Icon circle */}
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-5 text-white relative z-10"
                style={{ backgroundColor: '#1F2AA8' }}
              >
                {s.icon}
                <span
                  className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: '#FFCF33', color: '#1a2a1a' }}
                >
                  {s.num.slice(1)}
                </span>
              </div>
              <h3 className="font-bold text-lg mb-3" style={{ color: '#333333' }}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#555555' }}>{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center reveal-section">
          <a
            href={WHATSAPP}
            className="inline-flex items-center gap-2 rounded-full font-semibold text-white px-8 py-4 text-base transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#25D366' }}
          >
            <WhatsAppIcon className="w-5 h-5" /> Comenzar ahora por WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── 18. Hurricane Resilience ─────────────────────────────────────────────────
function HurricaneSection() {
  const features = [
    { icon: '🌀', title: 'Resistencia Cat. 4+', desc: 'Nuestros calentadores y cisternas están certificados para resistir vientos de huracán de categoría 4 y superiores.' },
    { icon: '⚡', title: 'Energia Durante Apagones', desc: 'Las baterías YETI y sistemas fotovoltaicos con batería te dan electricidad cuando la AEE falla por días o semanas.' },
    { icon: '💧', title: 'Agua en Emergencias', desc: 'Las cisternas de acero inoxidable almacenan hasta 1,200 galones de agua limpia para ti y tu familia cuando más lo necesitas.' },
    { icon: '🔧', title: 'Servicio Post-Huracan', desc: 'Tenemos equipo disponible para inspección y reparación rápida después de cualquier evento atmosférico en toda PR.' },
  ]

  return (
    <section
      className="py-16 px-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0d1150 0%, #1F2AA8 60%, #1a3a1a 100%)' }}
    >
      {/* Subtle hurricane graphic */}
      <div
        className="absolute right-0 top-0 w-64 h-64 opacity-5 pointer-events-none"
        style={{ fontSize: '200px', lineHeight: 1 }}
      >
        🌀
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12 reveal-section">
          <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#FFCF33' }}>
            PREPARADO PARA PUERTO RICO
          </div>
          <h2 className="font-bold text-3xl sm:text-4xl text-white mb-3">
            Construido para Sobrevivir Huracanes
          </h2>
          <p className="text-sm max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.70)' }}>
            60 años instalando en Puerto Rico nos han enseñado a construir productos que resisten lo que venga.
            Nuestros sistemas sobrevivieron el Huracán María — y el próximo también.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl p-6 reveal-section"
              style={{ backgroundColor: 'rgba(255,255,255,0.10)' }}
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-white text-base mb-2">{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.70)' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 19. Scroll Reveal Hook ──────────────────────────────────────────────────
// Adds .revealed class to .reveal-section elements when they enter viewport
function ScrollRevealInit() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal-section')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return null
}

// ─── 20. WhatsApp Chat Widget ─────────────────────────────────────────────────
function WhatsAppWidget() {
  const [open, setOpen] = useState(false)
  return (
    <div className="fixed bottom-24 right-5 z-50 hidden md:flex flex-col items-end gap-3">
      {/* Chat bubble */}
      {open && (
        <div className="bg-white rounded-2xl shadow-2xl w-72 overflow-hidden border border-gray-100">
          <div className="px-4 py-3 flex items-center gap-3" style={{ backgroundColor: '#25D366' }}>
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <WhatsAppIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">Universal Solar PR</div>
              <div className="text-xs text-white/80">Respondemos en minutos</div>
            </div>
            <button onClick={() => setOpen(false)} className="ml-auto text-white/70 hover:text-white text-lg leading-none">×</button>
          </div>
          <div className="p-4">
            <div className="rounded-xl px-4 py-3 text-sm mb-4" style={{ backgroundColor: '#f0f0f0', color: '#333' }}>
              Hola 👋 Estamos aquí para ayudarte. Escríbenos tu consulta o pide tu cotización gratis.
            </div>
            <a
              href={WHATSAPP}
              className="block w-full text-center rounded-full font-semibold text-white py-3 text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#25D366' }}
              onClick={() => setOpen(false)}
            >
              Iniciar chat →
            </a>
          </div>
        </div>
      )}
      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl transition-transform hover:scale-110"
        style={{ backgroundColor: '#25D366' }}
        aria-label="WhatsApp chat"
      >
        {open
          ? <span className="text-xl font-bold">×</span>
          : <WhatsAppIcon className="w-7 h-7" />
        }
      </button>
    </div>
  )
}

// ─── 21. Floating Call Button ─────────────────────────────────────────────────
function FloatingCallButton() {
  return (
    <div className="fixed bottom-6 right-5 z-50">
      <span
        className="absolute -inset-1.5 rounded-full animate-ping opacity-25"
        style={{ backgroundColor: '#4CAF50' }}
      />
      <a
        href={PHONE_HREF}
        aria-label={`Llamar al ${PHONE}`}
        className="relative inline-flex items-center gap-2 rounded-full font-semibold text-white text-sm px-5 py-3.5 transition-colors"
        style={{ backgroundColor: '#4CAF50' }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#388E3C')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4CAF50')}
      >
        <PhoneIcon className="w-5 h-5" />
        <span className="hidden sm:inline whitespace-nowrap">{PHONE}</span>
        <span className="sm:hidden">Llamar</span>
      </a>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProductsPage() {
  const [scrolled, setScrolled] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 70)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const dm = {
    bg: darkMode ? '#111827' : '#ffffff',
    bgSubtle: darkMode ? '#1f2937' : '#f9f9f9',
    textPrimary: darkMode ? '#f9fafb' : '#333333',
    textBody: darkMode ? '#9ca3af' : '#555555',
    border: darkMode ? '#374151' : '#e5e7eb',
    cardBg: darkMode ? '#1f2937' : '#ffffff',
  }

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ fontFamily: 'Inter, sans-serif', color: dm.textBody, backgroundColor: dm.bgSubtle }}
    >
      {/* Fixed header: TopBar + Navbar stacked */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <TopBar />
        <Navbar scrolled={scrolled} darkMode={darkMode} toggleDarkMode={() => setDarkMode(d => !d)} />
      </div>

      {/* Hero fills viewport — internal padding clears the fixed header */}
      <Hero />
      <FeatureStrip />
      <QuickQuoteSection darkMode={darkMode} />
      <HowItWorksSection dm={dm} />
      <AboutSection dm={dm} />
      <ProductsGrid dm={dm} />
      <ROICalculator />
      <HurricaneSection />
      <MarqueeStrip />
      <CTASection />
      <IncentivesSection dm={dm} />
      <Certifications dm={dm} />
      <FAQSection dm={dm} />
      <ServiceAreas dm={dm} />
      <TestimonialsSection dm={dm} />
      <ContactForm dm={dm} />
      <Footer />

      <StickyMobileCTA />
      <WhatsAppWidget />
      <FloatingCallButton />
      <ScrollRevealInit />
    </div>
  )
}
