import { useEffect, useMemo, useState } from 'react'

const PHONE = '51925717103'
const DEFAULT_MESSAGE = 'Hola Bogalvi, quiero consultar por los shorts deportivos.'

const products = [
  { name: 'Acero', file: 'short-acero.jpg', family: 'frios', color: '#294e66', contrast: 'Ribete negro' },
  { name: 'Amarillo neón', file: 'short-amarillo-neon.jpg', family: 'intensos', color: '#c6ee00', contrast: 'Ribete negro' },
  { name: 'Plomo intermedio', file: 'short-plomo-intermedio.jpg', family: 'neutros', color: '#72777e', contrast: 'Ribete negro' },
  { name: 'Plomo claro', file: 'short-plomo-claro.jpg', family: 'neutros', color: '#c8ccd0', contrast: 'Ribete negro' },
  { name: 'Vino', file: 'short-vino.jpg', family: 'intensos', color: '#7f1728', contrast: 'Ribete negro' },
  { name: 'Negro', file: 'short-negro.jpg', family: 'neutros', color: '#111214', contrast: 'Ribete vino' },
  { name: 'Cobalto', file: 'short-cobalto.jpg', family: 'frios', color: '#125276', contrast: 'Ribete negro' },
  { name: 'Blanco', file: 'short-blanco.jpg', family: 'neutros', color: '#f0f0ed', contrast: 'Ribete negro' },
  { name: 'Jade', file: 'short-jade.jpg', family: 'frios', color: '#00a398', contrast: 'Ribete negro' },
  { name: 'Verde militar', file: 'short-verde-militar.jpg', family: 'frios', color: '#46573a', contrast: 'Ribete negro' },
  { name: 'Azulino', file: 'short-azulino.jpg', family: 'intensos', color: '#1437be', contrast: 'Ribete negro' },
  { name: 'Azul', file: 'short-azul.jpg', family: 'frios', color: '#151b2c', contrast: 'Ribete negro' },
]

const filters = [
  { id: 'todos', label: 'Todos' },
  { id: 'neutros', label: 'Neutros' },
  { id: 'frios', label: 'Tonos fríos' },
  { id: 'intensos', label: 'Intensos' },
]

function Icon({ name, size = 20 }) {
  const paths = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
    close: <><path d="m6 6 12 12" /><path d="m18 6-12 12" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    whatsapp: <><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4A8 8 0 1 1 20 11.5Z" /><path d="M9 8.5c.5 2 2 3.5 4 4l1-1 2 1c.2 1.5-.7 2.5-2 2.5-3.8-.4-6.6-3.2-7-7 0-1.3 1-2.2 2.5-2l1 2-1.5.5Z" /></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></>,
    facebook: <path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v6h4v-6h3l1-4h-4V9c0-.6.4-1 1-1Z" />,
    spark: <><path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z" /><path d="m19 16 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z" /></>,
  }
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  )
}

function whatsappUrl(message = DEFAULT_MESSAGE) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState('todos')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [headerCompact, setHeaderCompact] = useState(false)

  const visibleProducts = useMemo(
    () => (filter === 'todos' ? products : products.filter((product) => product.family === filter)),
    [filter],
  )

  useEffect(() => {
    const updateHeader = () => setHeaderCompact(window.scrollY > 24)
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => window.removeEventListener('scroll', updateHeader)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.12 },
    )
    document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [filter])

  useEffect(() => {
    document.body.classList.toggle('no-scroll', Boolean(selectedProduct) || menuOpen)
    const closeWithEscape = (event) => {
      if (event.key === 'Escape') {
        setSelectedProduct(null)
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', closeWithEscape)
    return () => {
      document.body.classList.remove('no-scroll')
      window.removeEventListener('keydown', closeWithEscape)
    }
  }, [selectedProduct, menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className={`site-header ${headerCompact ? 'is-compact' : ''}`}>
        <a className="wordmark" href="#inicio" aria-label="Bogalvi, ir al inicio">BOGALVI<span>.</span></a>
        <nav className="desktop-nav" aria-label="Navegación principal">
          <a href="#coleccion">Colección</a>
          <a href="#diseno">El short</a>
          <a href="#precios">Precios</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <a className="header-cta" href={whatsappUrl()} target="_blank" rel="noreferrer">
          Pedir por WhatsApp <Icon name="arrow" size={17} />
        </a>
        <button className="menu-button" type="button" aria-label="Abrir menú" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>
          <Icon name="menu" size={24} />
        </button>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <button type="button" className="mobile-menu-close" aria-label="Cerrar menú" onClick={closeMenu}><Icon name="close" size={26} /></button>
        <a className="mobile-wordmark" href="#inicio" onClick={closeMenu}>BOGALVI<span>.</span></a>
        <nav aria-label="Navegación móvil">
          <a href="#coleccion" onClick={closeMenu}>Colección <span>01</span></a>
          <a href="#diseno" onClick={closeMenu}>El short <span>02</span></a>
          <a href="#precios" onClick={closeMenu}>Precios <span>03</span></a>
          <a href="#contacto" onClick={closeMenu}>Contacto <span>04</span></a>
        </nav>
        <a className="button button-accent" href={whatsappUrl()} target="_blank" rel="noreferrer">Hablar con Bogalvi</a>
      </div>

      <main id="contenido">
        <section className="hero" id="inicio">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Sportswear design · Lima, Perú</p>
            <h1>Entrena fuerte.<br /><em>Muévete libre.</em></h1>
            <p className="hero-lead">Shorts deportivos de confección propia, pensados para acompañar cada repetición con comodidad, ajuste y estilo.</p>
            <div className="hero-actions">
              <a className="button button-accent" href="#coleccion">Explorar colores <Icon name="arrow" size={19} /></a>
              <a className="text-link" href={whatsappUrl()} target="_blank" rel="noreferrer">Consultar disponibilidad <Icon name="arrow" size={17} /></a>
            </div>
            <div className="hero-stats" aria-label="Información destacada">
              <div><strong>12</strong><span>colores</span></div>
              <div><strong>S/25</strong><span>por unidad</span></div>
              <div><strong>Mayor<br />y menor</strong><span>venta directa</span></div>
            </div>
          </div>
          <div className="hero-visual" aria-label="Modelo vistiendo un short deportivo Bogalvi">
            <div className="hero-image-wrap">
              <img src="/images/hero-bogalvi.jpg" alt="Short deportivo Bogalvi azul en uso" width="1874" height="2048" fetchPriority="high" />
            </div>
            <div className="hero-badge"><Icon name="spark" size={22} /><span>Diseñado para<br /><strong>cada movimiento</strong></span></div>
            <div className="hero-number" aria-hidden="true">01</div>
          </div>
        </section>

        <div className="ticker" aria-hidden="true">
          <div><span>Confección propia</span><b>•</b><span>Shorts de entrenamiento</span><b>•</b><span>12 colores</span><b>•</b><span>Venta mayorista y minorista</span><b>•</b><span>Confección propia</span><b>•</b><span>Shorts de entrenamiento</span></div>
        </div>

        <section className="collection section" id="coleccion">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow"><span /> La colección</p>
              <h2>Un color para<br />cada ritmo.</h2>
            </div>
            <p>Del entrenamiento diario a tus sesiones más intensas. Elige el tono que va contigo y consulta tallas disponibles por WhatsApp.</p>
          </div>

          <div className="filter-row" role="group" aria-label="Filtrar colores" data-reveal>
            {filters.map((item) => (
              <button key={item.id} type="button" className={filter === item.id ? 'is-active' : ''} aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>
                {item.label}
              </button>
            ))}
            <span className="result-count" aria-live="polite">{visibleProducts.length} colores</span>
          </div>

          <div className="product-grid">
            {visibleProducts.map((product, index) => (
              <article className="product-card" key={product.name} data-reveal style={{ '--delay': `${(index % 4) * 55}ms` }}>
                <button type="button" className="product-image" onClick={() => setSelectedProduct(product)} aria-label={`Ver short color ${product.name}`}>
                  <img src={`/images/${product.file}`} alt={`Short deportivo Bogalvi color ${product.name}`} width="2048" height="2048" loading="lazy" decoding="async" />
                  <span className="product-view">Vista rápida <Icon name="arrow" size={16} /></span>
                </button>
                <div className="product-info">
                  <div>
                    <p>Short deportivo</p>
                    <h3>{product.name}</h3>
                  </div>
                  <div className="color-dot" style={{ '--swatch': product.color }} title={product.name} />
                  <strong>S/25</strong>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="design-section section" id="diseno">
          <div className="design-image" data-reveal>
            <img src="/images/lifestyle-bogalvi.jpg" alt="Short Bogalvi negro con ribete contrastado" width="1877" height="2048" loading="lazy" decoding="async" />
            <span className="vertical-copy">BOGALVI SPORTSWEAR DESIGN</span>
          </div>
          <div className="design-copy" data-reveal>
            <p className="eyebrow"><span /> Hecho para entrenar</p>
            <h2>Lo esencial,<br /><em>bien resuelto.</em></h2>
            <p className="design-intro">Una silueta limpia que se adapta a tu rutina. Sin exceso. Sin distracciones. Solo libertad para moverte.</p>
            <ul className="feature-list">
              <li><span>01</span><div><strong>Cintura elástica</strong><p>Ajuste cómodo que acompaña el movimiento.</p></div></li>
              <li><span>02</span><div><strong>Cordón regulable</strong><p>Control seguro durante toda la sesión.</p></div></li>
              <li><span>03</span><div><strong>Bolsillos laterales</strong><p>Practicidad dentro y fuera del gimnasio.</p></div></li>
              <li><span>04</span><div><strong>Detalle contrastado</strong><p>Un acabado reconocible en cada color.</p></div></li>
            </ul>
            <a className="text-link dark" href={whatsappUrl('Hola Bogalvi, quiero consultar tallas y colores disponibles.')} target="_blank" rel="noreferrer">Consultar tallas disponibles <Icon name="arrow" size={17} /></a>
          </div>
        </section>

        <section className="pricing section" id="precios">
          <div className="pricing-heading" data-reveal>
            <div><p className="eyebrow light"><span /> Precios por volumen</p><h2>Más prendas.<br /><em>Mejor precio.</em></h2></div>
            <p>Combina colores y tallas dentro de tu pedido. El tramo se calcula por la cantidad total de prendas.</p>
          </div>
          <div className="price-cards" data-reveal>
            <article><span>Personal</span><strong>S/25<small>/unidad</small></strong><p>De 1 a 2 prendas</p></article>
            <article className="featured"><span>Equipo</span><strong>S/20<small>/unidad</small></strong><p>De 3 a 5 prendas</p><b>Más elegido</b></article>
            <article><span>Mayorista</span><strong>S/18<small>/unidad</small></strong><p>Desde 6 prendas</p></article>
          </div>
          <p className="price-note">Precios referenciales sujetos a disponibilidad. Confirma tu pedido directamente con nuestro equipo.</p>
        </section>

        <section className="wholesale section" data-reveal>
          <div className="wholesale-media">
            <img src="/images/coleccion-bogalvi.jpg" alt="Colección de shorts Bogalvi en distintos colores" width="2048" height="1536" loading="lazy" decoding="async" />
          </div>
          <div className="wholesale-copy">
            <span className="wholesale-index">/ MAYORISTAS</span>
            <h2>Tu selección.<br />A tu manera.</h2>
            <p>Arma un pedido combinando colores y tallas. Te ayudamos a revisar disponibilidad y coordinar la entrega de forma directa.</p>
            <a className="button button-dark" href={whatsappUrl('Hola Bogalvi, quiero armar un pedido mayorista y consultar disponibilidad.')} target="_blank" rel="noreferrer">Armar pedido mayorista <Icon name="arrow" size={19} /></a>
          </div>
        </section>

        <section className="contact section" id="contacto">
          <div className="contact-copy" data-reveal>
            <p className="eyebrow"><span /> Atención directa</p>
            <h2><span className="question-open" aria-hidden="true">¿</span><span className="sr-only">¿</span>Listo para elegir<br />tu próximo short?</h2>
            <p>Escríbenos y recibe ayuda para encontrar color, talla y cantidad.</p>
          </div>
          <div className="contact-actions" data-reveal>
            <a href={whatsappUrl()} target="_blank" rel="noreferrer"><Icon name="whatsapp" size={30} /><span><small>WhatsApp</small>+51 925 717 103</span><Icon name="arrow" size={22} /></a>
            <a href="https://www.facebook.com/BogalviModa" target="_blank" rel="noreferrer"><Icon name="facebook" size={30} /><span><small>Facebook</small>Bogalvi Confecciones</span><Icon name="arrow" size={22} /></a>
            <a href="https://www.instagram.com/bogalvimoda" target="_blank" rel="noreferrer"><Icon name="instagram" size={30} /><span><small>Instagram</small>@bogalvimoda</span><Icon name="arrow" size={22} /></a>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-top">
          <a className="footer-wordmark" href="#inicio">BOGALVI<span>.</span></a>
          <p>Sportswear design<br />Lima, Perú</p>
          <nav aria-label="Enlaces de pie de página"><a href="#coleccion">Colección</a><a href="#precios">Precios</a><a href="#contacto">Contacto</a></nav>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Bogalvi Confecciones</span><span>Diseñado para moverte.</span></div>
      </footer>

      <a className="floating-whatsapp" href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="Escribir a Bogalvi por WhatsApp"><Icon name="whatsapp" size={25} /><span>WhatsApp</span></a>

      {selectedProduct && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setSelectedProduct(null)}>
          <div className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-modal-title">
            <button className="modal-close" type="button" aria-label="Cerrar vista rápida" onClick={() => setSelectedProduct(null)}><Icon name="close" size={25} /></button>
            <div className="modal-image"><img src={`/images/${selectedProduct.file}`} alt={`Short deportivo Bogalvi color ${selectedProduct.name}`} /></div>
            <div className="modal-copy">
              <p className="eyebrow"><span /> Short deportivo</p>
              <h2 id="product-modal-title">{selectedProduct.name}</h2>
              <p className="modal-price">S/25 <span>por unidad</span></p>
              <ul><li><Icon name="check" size={18} /> Cintura elástica</li><li><Icon name="check" size={18} /> Cordón regulable</li><li><Icon name="check" size={18} /> {selectedProduct.contrast}</li></ul>
              <a className="button button-accent" href={whatsappUrl(`Hola Bogalvi, quiero consultar el short color ${selectedProduct.name}.`)} target="_blank" rel="noreferrer">Consultar este color <Icon name="arrow" size={19} /></a>
              <small>Pregunta por tallas y stock disponibles.</small>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App
