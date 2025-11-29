import { useEffect, useState, useRef } from 'react'
import './sales.css'

function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [style, setStyle] = useState('')
  const [size, setSize] = useState('')
  const [message, setMessage] = useState('')
  const about3Ref = useRef<HTMLElement | null>(null)
  
  const banner = {
    src: 'https://scontent.fcgh17-1.fna.fbcdn.net/v/t39.30808-6/467899361_122185852214139259_7113001220361271665_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeFV4DuJTqsphyD9z2c5baEf-JuYBtWX5C74m5gG1ZfkLjKiMU2mvt0Cm5AcD2Bs0Do&_nc_ohc=ecFTelqk_Z4Q7kNvwGZQSC3&_nc_oc=AdmPnWHYPoDQ7cKohko7UEtvWQUztUxdDC1W1L3ovb3ivFyJqyC0he4ma3Z8cruW0L65ts51pMDOptsMoiZUowHl&_nc_zt=23&_nc_ht=scontent.fcgh17-1.fna&_nc_gid=JATmuRwnRbamaVgg88k0qQ&oh=00_AfhMjXZAeolvqO0rjpBOpZLFrcsETx48TWZ7gVZQys5n2Q&oe=69302BC8',
    html:
      '',
  }
  const photoModules = import.meta.glob('../img/*.{png,jpg,jpeg}', { eager: true }) as Record<string, any>
  const portfolioImages = Object.keys(photoModules)
    .sort()
    .map((k) => photoModules[k]?.default || photoModules[k])
    .filter(Boolean)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [sending, setSending] = useState(false)
  const [clickedIndex, setClickedIndex] = useState<number | null>(null)
  const formatDate = (d: Date) => {
    const dd = String(d.getDate()).padStart(2, '0')
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const yyyy = d.getFullYear()
    return `${dd}/${mm}/${yyyy}`
  }
  const imageDetails = portfolioImages.map((src, i) => ({
    technique: ['Autoral', 'Fineline', 'Realismo'][i % 3],
    date: formatDate(new Date()),
  }))
  
  
  const openLightbox = (i: number) => {
    setLightboxIndex(i)
    setLightboxOpen(true)
  }
  const closeLightbox = () => setLightboxOpen(false)
  const nextImage = () => setLightboxIndex((i) => (i + 1) % portfolioImages.length)
  const prevImage = () => setLightboxIndex((i) => (i - 1 + portfolioImages.length) % portfolioImages.length)
  
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!lightboxOpen) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxOpen])

  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.animate-right'))
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement
        if (entry.isIntersecting) el.classList.add('in-view')
        else el.classList.remove('in-view')
      })
    }, { threshold: 0.15 })
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const imgs = Array.from(document.querySelectorAll('.photo-reveal'))
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement
        if (entry.isIntersecting) el.classList.add('in-view')
        else el.classList.remove('in-view')
      })
    }, { threshold: 0.12 })
    imgs.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [portfolioImages])
  

  const handleQuote = () => {
    const text = encodeURIComponent(
      `Olá, meu nome é ${name}\nEmail: ${email}\nEstilo: ${style}\nTamanho: ${size}\nDescrição: ${message}`
    )
    const phone = '55 11 97792-8692'
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank')
  }

  

  

  

  


  return (
    <div className="page">
      <header className="header">
        <div className="container header-inner">
          <a className="brand" href="#">
            <img src="https://scontent.fcgh17-1.fna.fbcdn.net/v/t39.30808-6/467899361_122185852214139259_7113001220361271665_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeFV4DuJTqsphyD9z2c5baEf-JuYBtWX5C74m5gG1ZfkLjKiMU2mvt0Cm5AcD2Bs0Do&_nc_ohc=ecFTelqk_Z4Q7kNvwGZQSC3&_nc_oc=AdmPnWHYPoDQ7cKohko7UEtvWQUztUxdDC1W1L3ovb3ivFyJqyC0he4ma3Z8cruW0L65ts51pMDOptsMoiZUowHl&_nc_zt=23&_nc_ht=scontent.fcgh17-1.fna&_nc_gid=kVASszTrrNLLL2nRYAYg9g&oh=00_AfjEksE7uYEBxGxwqJ8Eo4z1vDZwKNCgorzpP4WmuX5awg&oe=69302BC8" alt="ANIBALC TATTOO" />
          </a>
          <div className="header-right">
            <div className="social">
              <a className="social-link" href="https://www.facebook.com/profile.php?id=61554177795938&locale=pt_BR" target="_blank" rel="noreferrer" aria-label="Facebook">
                <img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/facebook.svg" alt="Facebook" />
              </a>
              <a className="social-link" href="https://www.instagram.com/anibalc_tattoo/" target="_blank" rel="noreferrer" aria-label="Instagram">
                <img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/instagram.svg" alt="Instagram" />
              </a>
              <a className="social-link" href="https://api.whatsapp.com/message/IUBJK5DZ3WCYI1?autoload=1&app_absent=0&utm_source=ig" target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/whatsapp.svg" alt="WhatsApp" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="banner">
        <div className="banner-static">
          <img src={banner.src} alt="Banner" />
          <div className="banner-overlay">
            {banner.html && (
              <div className="banner-content" dangerouslySetInnerHTML={{ __html: banner.html }} />
            )}
          </div>
        </div>
      </section>

      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-text">
            <div className="hero-actions">
              <a className="btn primary" href="#contato">Solicitar orçamento</a>
              <a className="btn" href="#portfolio">Ver portfólio</a>
            </div>
          </div>
          <div className="hero-media" />
        </div>
      </section>


      <section id="servicos" className="section">
        <div className="container">
          <h2>Serviços</h2>
          <div className="grid">
            <div className="card">
              <h3>Autoral</h3>
              <p>Projetos exclusivos criados sob medida.</p>
            </div>
            <div className="card">
              <h3>Fineline</h3>
              <p>Traços finos e minimalistas com precisão.</p>
            </div>
            <div className="card">
              <h3>Realismo</h3>
              <p>Sombras e detalhes para resultados impactantes.</p>
            </div>
            <div className="card">
              <h3>Cover-up</h3>
              <p>Reinterpretação de tatuagens antigas.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="sobre" className="section animate-right">
        <div className="container">
          <div className="split">
            <div className="split-media">
              <img src="https://placehold.co/720x540/png?text=Studio" alt="Studio" />
            </div>
            <div className="split-text">
              <h1>Sobre o estúdio</h1>
              <p>
                Tatuagens autorais com foco em fineline e realismo. Atendimento por hora, 
                consultoria de design e acompanhamento pós-procedimento.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="sobre-2" className="section animate-right">
        <div className="container">
          <div className="split">
            <div className="split-text">
              <h1>Nosso processo</h1>
              <p>
                Do briefing ao desenho final, cada etapa é feita com atenção aos detalhes 
                para garantir um resultado fiel à sua ideia.
              </p>
            </div>
            <div className="split-media">
              <img src="https://scontent.fcgh17-1.fna.fbcdn.net/v/t39.30808-6/468825187_122186797094139259_2090432336952634909_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEGn6HkvdRtRAfrdnwSXOV4jnOdgRMJROuOc52BEwlE62DIKJqUEvxFDYicuyzmnb0&_nc_ohc=mSLicQplodAQ7kNvwGiWI1A&_nc_oc=AdnZJDm9nzqYzChwfzTG2-brsOEGYpUw9QrW6Htqb6mC37vFeCIQx0oGx9qpX0gom-uV0RnXpJ1CU7q02x99L5de&_nc_zt=23&_nc_ht=scontent.fcgh17-1.fna&_nc_gid=oxQOp_AERlUtfd7KTbm0xQ&oh=00_AfjdJ_X631B64yVm9Zj2tUMHAqhXJHciFACbSzYY_tviDQ&oe=69305DB5" alt="Arte" />
            </div>
          </div>
        </div>
      </section>

      <section ref={about3Ref} id="sobre-3" className="section animate-right">
        <div className="container">
          <div className="split">
            <div className="split-media">
              <img src="https://scontent.fcgh17-1.fna.fbcdn.net/v/t39.30808-6/569155118_4231495950397174_2353492016235550740_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHNfZgWuTA56q0edlUCRvnRJdQCH39JCoEl1AIff0kKgU0uvXCG2b-6_w4y4E3L8_s&_nc_ohc=znTqPt8ldjIQ7kNvwF_bBcp&_nc_oc=AdkfUuFobB74jYhHivshtiOi9fej5VQCqGvX9xG5Nrx5a1isaJ6Kfb-wsupSK1JFZAQWeGSzP_gWUZhjSthGChGQ&_nc_zt=23&_nc_ht=scontent.fcgh17-1.fna&_nc_gid=H34TeGK-N1geykNa9TYGVg&oh=00_AfhjJczdkfe7zZJxQgUEXEfUXfcJ8YmCwtYRAjkuRzoXoA&oe=69304DE1" alt="Anibal" />
            </div>
            <div className="split-text">
              <h1>Sobre min</h1>
              <p>
                Conversamos sobre referências, estilo e posicionamento para alinhar expectativas e criar o melhor desenho.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio" className="section alt">
        <div className="container">
          <h2>Portfólio</h2>
          <div className="masonry">
            {portfolioImages.map((src, i) => (
              <img
                key={src}
                className="photo-reveal"
                style={{ ['--delay' as any]: `${i * 120}ms` }}
                src={src}
                alt="Tatuagem"
                onClick={() => setClickedIndex(i)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Depoimentos</h2>
          <div className="testimonials">
            <figure>
              <div className="avatar">
                <img src="https://placehold.co/80x80/png?text=C" alt="Foto de Camila" />
                <figcaption>Camila</figcaption>
              </div>
              <blockquote>
                Experiência incrível, desde o orçamento até o pós-cuidados.
              </blockquote>
            </figure>
            <figure>
              <div className="avatar">
                <img src="https://placehold.co/80x80/png?text=R" alt="Foto de Rodrigo" />
                <figcaption>Rodrigo</figcaption>
              </div>
              <blockquote>
                Profissionalismo e arte impecável. Voltarei em breve.
              </blockquote>
            </figure>
            <figure>
              <div className="avatar">
                <img src="https://placehold.co/80x80/png?text=A" alt="Foto de Ana" />
                <figcaption>Ana</figcaption>
              </div>
              <blockquote>
                Meu cover-up ficou perfeito. Resultado acima do esperado.
              </blockquote>
            </figure>
          </div>
        </div>
      </section>

      <section id="contato" className="section alt">
        <div className="container">
          <h2>Solicite um orçamento</h2>
          <form
            className="quote-form"
            onSubmit={(e) => {
              e.preventDefault()
              setSending(true)
              handleQuote()
              setTimeout(() => setSending(false), 1200)
            }}
          >
            <div className="form-grid">
              <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} required />
              <input type="text" placeholder="Estilo desejado" value={style} onChange={(e) => setStyle(e.target.value)} />
              <input type="text" placeholder="Tamanho aproximado" value={size} onChange={(e) => setSize(e.target.value)} />
            </div>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <textarea
              placeholder="Descreva sua ideia"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
            />
            <button className={`btn primary full ${sending ? 'sending' : ''}`} type="submit">
              <svg className="icon tattoo" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M2 20l10-10 4 4-10 10H2v-4Zm12-12 2-2 4 4-2 2-4-4Z"/>
              </svg>
              Enviar pelo WhatsApp
            </button>
          </form>
          <p className="disclaimer">
            Os valores variam conforme tamanho, complexidade e posicionamento.
            Envie sua ideia para receber uma estimativa.
          </p>
        </div>
      </section>

      {lightboxOpen && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <img src={portfolioImages[lightboxIndex]} alt="Tatuagem" />
            <button className="control-btn close-btn" aria-label="Fechar" onClick={closeLightbox}>×</button>
            <div className="lightbox-controls">
              <button className="control-btn" aria-label="Anterior" onClick={prevImage}>‹</button>
              <button className="control-btn" aria-label="Próximo" onClick={nextImage}>›</button>
            </div>
          </div>
        </div>
      )}
      {clickedIndex !== null && (
        <span className="photo-clicked" onClick={() => setClickedIndex(null)}>
          <span className="photo-box" onClick={(e) => e.stopPropagation()}>
            <div className="photo-image">
              <img src={portfolioImages[clickedIndex]} alt="Tatuagem" />
              <button
                className="photo-arrow left"
                aria-label="Anterior"
                onClick={(e) => { e.stopPropagation(); setClickedIndex((idx) => idx === null ? 0 : (idx - 1 + portfolioImages.length) % portfolioImages.length) }}
              >
                ‹
              </button>
              <button
                className="photo-arrow right"
                aria-label="Próximo"
                onClick={(e) => { e.stopPropagation(); setClickedIndex((idx) => idx === null ? 0 : (idx + 1) % portfolioImages.length) }}
              >
                ›
              </button>
            </div>
            <div className="photo-info">
              <h3>Detalhes</h3>
              <p><strong>Arte:</strong> {imageDetails[clickedIndex].technique}</p>
              <p><strong>Data:</strong> {imageDetails[clickedIndex].date}</p>
              <p>Descrição breve da inspiração e técnica aplicada.</p>
              <div className="photo-actions">
                <button className="btn" onClick={() => setClickedIndex(null)}>Fechar</button>
                <button className="btn primary" onClick={() => { setLightboxIndex(clickedIndex); setLightboxOpen(true); setClickedIndex(null) }}>Ver imagem</button>
              </div>
            </div>
          </span>
        </span>
      )}
      <footer className="footer">
        <div className="container footer-inner">
          <span>© {new Date().getFullYear()} Tatto Studio</span>
          <span>Rua Exemplo, 123 — Sua Cidade</span>
          <div className="social">
            <a className="social-link" href="https://facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook">
              <img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/facebook.svg" alt="Facebook" />
            </a>
            <a className="social-link" href="https://instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
              <img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/instagram.svg" alt="Instagram" />
            </a>
            <a className="social-link" href="https://wa.me/5511977928692" target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/whatsapp.svg" alt="WhatsApp" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
