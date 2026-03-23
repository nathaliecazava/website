/* ═══════════════════════════════════════════════
   TH STUDIO — Portfolio Website · JS
   ═══════════════════════════════════════════════ */

// ─── Nav: transparent → solid on scroll ───────────────

const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ─── Hero background subtle pan ───────────────────────

const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  // Trigger the scale-down transition after load
  requestAnimationFrame(() => {
    setTimeout(() => heroBg.classList.add('loaded'), 80);
  });
}

// ─── Scroll-in animations ──────────────────────────────

const animateObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings slightly
        const siblings = entry.target.parentElement
          ? [...entry.target.parentElement.querySelectorAll('[data-animate]')]
          : [];
        const idx = siblings.indexOf(entry.target);
        const delay = idx * 80;

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        animateObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

document.querySelectorAll('[data-animate]').forEach(el => {
  animateObserver.observe(el);
});

// ─── Before / After Comparison Sliders ────────────────

document.querySelectorAll('[data-comparison]').forEach(container => {
  const beforeWrap  = container.querySelector('.comparison-before-wrap');
  const handle      = container.querySelector('[data-handle]');
  const labelBefore = container.querySelector('.label-before');
  const hint        = container.querySelector('.comparison-hint');

  let isDragging    = false;
  let hasInteracted = false;

  /** Move the slider to a given clientX position */
  function setPosition(clientX) {
    const rect = container.getBoundingClientRect();
    const rawPct = (clientX - rect.left) / rect.width * 100;
    const pct = Math.max(3, Math.min(97, rawPct));

    beforeWrap.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    handle.style.left = `${pct}%`;

    // Show/hide "Before" label based on how much is exposed
    if (labelBefore) {
      labelBefore.style.opacity = pct > 12 ? '1' : '0';
    }

    if (!hasInteracted) {
      hasInteracted = true;
      container.classList.add('active');
    }
  }

  // ── Mouse events ──
  const startDrag = (e) => {
    isDragging = true;
    setPosition(e.clientX);
    e.preventDefault();
  };

  handle.addEventListener('mousedown', startDrag);
  container.addEventListener('mousedown', startDrag);

  document.addEventListener('mouseup', () => { isDragging = false; });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) setPosition(e.clientX);
  });

  // ── Touch events ──
  handle.addEventListener('touchstart', (e) => {
    isDragging = true;
    setPosition(e.touches[0].clientX);
    e.preventDefault();
  }, { passive: false });

  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    setPosition(e.touches[0].clientX);
  }, { passive: true });

  document.addEventListener('touchend', () => { isDragging = false; });

  document.addEventListener('touchmove', (e) => {
    if (isDragging) setPosition(e.touches[0].clientX);
  }, { passive: true });

  // ── Keyboard accessibility ──
  container.setAttribute('tabindex', '0');
  container.setAttribute('role', 'slider');
  container.setAttribute('aria-label', 'Before and after comparison slider');
  container.setAttribute('aria-valuenow', '50');
  container.setAttribute('aria-valuemin', '0');
  container.setAttribute('aria-valuemax', '100');

  container.addEventListener('keydown', (e) => {
    const rect  = container.getBoundingClientRect();
    const curPct = parseFloat(handle.style.left) || 50;

    if (e.key === 'ArrowLeft')  setPosition(rect.left + (curPct - 5)  / 100 * rect.width);
    if (e.key === 'ArrowRight') setPosition(rect.left + (curPct + 5)  / 100 * rect.width);
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') e.preventDefault();
  });

  // Set initial handle position to 50%
  handle.style.left = '50%';
});

// ─── Smooth active nav link highlighting ──────────────

const sections = document.querySelectorAll('section[id], footer');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => sectionObserver.observe(s));

// ─── i18n: Translations ────────────────────────────────

const translations = {
  en: {
    logo_sub:            'Art Direction & Curation',
    nav_work:            'Work',
    nav_philosophy:      'Philosophy',
    nav_about:           'About',
    nav_services:        'Services',
    nav_cta:             'Get in touch',
    hero_eyebrow:        'Interior Design & Art Direction · Medellín, Colombia',
    hero_title:          'Every space<br>has a story.<br><em>We write it.</em>',
    hero_sub:            'An interior design and art direction studio based in Medellín. We design residential spaces with soul and commercial environments with narrative — always grounded in research, always built to last.',
    hero_cta:            'View our work',
    hero_scroll:         'Scroll',
    portfolio_label:     'Selected Work',
    portfolio_title:     'Spaces designed<br>with intent.',
    portfolio_sub:       'A curated selection of residential transformations and commercial environments — each one built on research, driven by concept, and delivered with craft.',
    proj1_num:           'Project 01',
    proj1_type:          'Residential · Full Renovation',
    proj1_desc:          'A conventional apartment stripped back and rebuilt as an industrial sanctuary for a young family. Exposed ceiling cassettes, pipe-mounted lighting, and a cement accent wall give the living room raw edge, while a mosaic-tiled kitchen and an elevated bedroom platform keep the space grounded in craft.',
    proj2_num:           'Project 02',
    proj2_type:          'Residential · Advisory',
    proj2_desc:          'A focused intervention in a duplex apartment — two moves that changed how the space feels. The living room window system was re-engineered to reverse its opening direction, dissolving the boundary between balcony and living room into a single fluid zone. Across the full 44 m², a warm SPC wood-finish floor replaced the original, installed click-over-click with no demolition.',
    proj3_num:           'Project 03',
    proj3_type:          'Residential · Interior Design',
    proj3_desc:          'A warm Nordic-tropical palette transforms a compact apartment into a slow-living retreat. Royal blue anchors the bedroom — wall, closet, zócalo — while a hand-applied reboque finish in walnut gives the living room\'s main wall a quiet depth. Peach tones soften transitions at corridors and bathroom doors. Hamaca hooks on the balcón wall are the final punctuation: this is a home designed for staying, not just passing through.',
    meta_location:       'Location',
    meta_area:           'Area',
    meta_scope:          'Scope',
    meta_style:          'Style',
    proj1_val_style:     'Industrial · Eclectic',
    proj1_val_scope:     'Full Renovation',
    proj2_val_scope:     'Advisory — Window System + Flooring',
    proj3_val_scope:     'Design + Execution — Living Room, Bedroom, Kitchen',
    comparison_after:    'After',
    comparison_before:   'Before',
    comparison_drag:     'Drag to compare',
    comparison_handle_aria: 'Drag to compare before and after',
    comparison_slider_aria: 'Before and after comparison slider',
    philosophy_label:    'Design Philosophy',
    philosophy_quote:    '"We don\'t start with finishes — we start with questions. Every project begins with understanding how the client actually lives, works, or gathers. That insight drives every decision that follows."',
    phil1_title:         'Order as creative freedom',
    phil1_body:          'Methodology isn\'t a constraint — it\'s what makes genuine creativity possible. Every project follows a defined process, every phase has its deliverables, every decision has its foundation. Without structure, there is no consistency; without consistency, there is no quality.',
    phil2_title:         'Question what\'s established',
    phil2_body:          'If something has always been done a certain way, that\'s precisely the reason to ask whether there\'s a better approach. We build original methods grounded in proven frameworks — not convention for convention\'s sake.',
    phil3_title:         'The person before the space',
    phil3_body:          'For residential clients, we deliberately avoid reference photos at the start. Instead, we ask about sensory preferences and daily habits — building the concept from who the person is, not what they\'ve seen elsewhere.',
    phil4_title:         'Behavior informs design',
    phil4_body:          'Design doesn\'t exist in a vacuum. Understanding how people live, how habits are shifting, and what that means for spaces and experiences is the foundation of every concept we develop — residential or commercial.',
    phil5_title:         'Medellín as creative foundation',
    phil5_body:          'Medellín is not just where we work — it\'s part of how we think. The city\'s texture, color, and creative energy appear in the work, even when the brief doesn\'t explicitly ask for it. Proud, without making it a cliché.',
    phil6_title:         'Transparency builds trust',
    phil6_body:          'Clients who understand the process trust it. We\'re transparent about budgets, trade-offs, and timelines. Our responsibility is to inform clearly and honestly; the final decision always belongs to the client.',
    about_label:         'About the Studio',
    about_title:         'Spaces built on research,<br>driven by story.',
    about_p1:            'Th Studio is an interior design and art direction practice based in Medellín. We work across two distinct lines: residential spaces designed around how people actually live, and commercial environments built on narrative strategy for the hospitality sector.',
    about_p2:            'With over five years of practice in interior design and art direction, the studio combines immersive client discovery, research-backed concept development, and a rigorous project methodology to deliver results that are both visually striking and deeply functional.',
    about_p3:            'On the residential side, we work with two profiles: clients who want a space that genuinely reflects who they are — personal, layered, livable — and clients who prioritize visual impact above all else. Both deserve the same craft. What changes is the process.',
    about_p4:            'For commercial and hospitality projects, we build narrative universes from ethnographic research, where every decision — space, identity, menu, music, experience — flows from a central concept rooted in the real people behind the project.',
    stat1_label:         'Years of<br>practice',
    stat2_label:         'Service<br>lines',
    stat3_label:         'Based in<br>Medellín',
    services_label:      'Services',
    services_title:      'Two lines.<br>One standard.',
    svc1_tag:            '01 — Residential',
    svc1_title:          'Interior Design<br>&amp; Renovation',
    svc1_sub:            'Spaces designed around how you live',
    svc1_body:           'From full architectural renovations to design advisory, we work with homeowners in Medellín who want spaces that feel genuinely theirs — not trend-driven, not generic. Every project starts with understanding, not assumptions.',
    svc1_li1:            'Design advisory — new look without structural changes',
    svc1_li2:            'Full design + renovation with architectural modifications',
    svc1_li3:            'Custom furniture, lighting & material specification',
    svc1_li4:            'Construction execution management',
    svc_cta:             'Start a conversation',
    svc2_tag:            '02 — Commercial',
    svc2_title:          'Art Direction<br>&amp; Th Studio',
    svc2_sub:            'Narrative environments for hospitality',
    svc2_body:           'For restaurants, boutique hotels, and commercial spaces that want more than aesthetics — a concept that differentiates, and a story their audience remembers. Built from real listening, not mood boards borrowed from elsewhere.',
    svc2_li1:            'Ethnographic insight capture — founders, team & investors',
    svc2_li2:            'Narrative concept development',
    svc2_li3:            'Creative direction across space, identity & experience',
    svc2_li4:            'Strategic roadmap for all brand touchpoints',
    contact_label:       'Get in Touch',
    contact_title:       'Let\'s turn your<br>space into a story.',
    contact_sub:         'Based in Medellín, working across Colombia. Every project begins with a conversation — no commitment required.',
    contact_email:       'Send an email',
    contact_whatsapp:    'WhatsApp',
    footer_copy:         '© 2026 Th Studio. All rights reserved.',
    portfolio_view_all:  'View all projects',
    page_title:          'Th Studio — Interior Design & Art Direction · Medellín',
    page_desc:           'An interior design and art direction studio based in Medellín. We design residential spaces with soul and commercial environments with narrative.',
  },
  es: {
    logo_sub:            'Dirección de Arte y Curaduría',
    nav_work:            'Trabajo',
    nav_philosophy:      'Filosofía',
    nav_about:           'Nosotros',
    nav_services:        'Servicios',
    nav_cta:             'Contáctanos',
    hero_eyebrow:        'Diseño de Interiores & Dirección de Arte · Medellín, Colombia',
    hero_title:          'Todo espacio<br>tiene una historia.<br><em>Nosotros la escribimos.</em>',
    hero_sub:            'Un estudio de diseño de interiores y dirección de arte con base en Medellín. Diseñamos espacios residenciales con alma y ambientes comerciales con narrativa — siempre fundamentados en la investigación, siempre construidos para durar.',
    hero_cta:            'Ver nuestro trabajo',
    hero_scroll:         'Bajar',
    portfolio_label:     'Trabajo Selecto',
    portfolio_title:     'Espacios diseñados<br>con intención.',
    portfolio_sub:       'Una selección curada de transformaciones residenciales y ambientes comerciales — cada uno construido sobre investigación, guiado por un concepto y entregado con oficio.',
    proj1_num:           'Proyecto 01',
    proj1_type:          'Residencial · Renovación Completa',
    proj1_desc:          'Un apartamento convencional desmontado y reconstruido como santuario industrial para una familia joven. Casetes de techo expuestos, iluminación sobre tuberías y un muro de cemento le dan al salón un carácter crudo, mientras que la cocina con mosaico y la plataforma elevada del dormitorio anclan el espacio en el oficio.',
    proj2_num:           'Proyecto 02',
    proj2_type:          'Residencial · Asesoría',
    proj2_desc:          'Una intervención precisa en un apartamento dúplex — dos decisiones que cambiaron la percepción del espacio. El sistema de ventanas del salón fue reingeniado para invertir su dirección de apertura, disolviendo el límite entre balcón y sala en una sola zona fluida. En los 44 m² completos, un piso SPC de acabado en madera cálida reemplazó el original, instalado clic sobre clic sin demolición.',
    proj3_num:           'Proyecto 03',
    proj3_type:          'Residencial · Diseño de Interiores',
    proj3_desc:          'Una paleta nórdico-tropical transforma un apartamento compacto en un refugio para la vida lenta. El azul real ancla la habitación — pared, closet, zócalo — mientras que un reboque aplicado a mano en nogal le da a la pared principal de la sala una profundidad tranquila. Los tonos durazno suavizan las transiciones en pasillos y puertas del baño. Los ganchos de hamaca en la pared del balcón son la puntuación final: un hogar diseñado para quedarse, no solo para pasar.',
    meta_location:       'Ubicación',
    meta_area:           'Área',
    meta_scope:          'Alcance',
    meta_style:          'Estilo',
    proj1_val_style:     'Industrial · Ecléctico',
    proj1_val_scope:     'Renovación Completa',
    proj2_val_scope:     'Asesoría — Sistema de Ventanas + Pisos',
    proj3_val_scope:     'Diseño + Ejecución — Sala, Habitación, Cocina',
    comparison_after:    'Después',
    comparison_before:   'Antes',
    comparison_drag:     'Arrastra para comparar',
    comparison_handle_aria: 'Arrastra para comparar antes y después',
    comparison_slider_aria: 'Deslizador de comparación antes y después',
    philosophy_label:    'Filosofía de Diseño',
    philosophy_quote:    '"No empezamos con los acabados — empezamos con preguntas. Cada proyecto comienza con entender cómo el cliente realmente vive, trabaja o se reúne. Esa comprensión guía cada decisión que sigue."',
    phil1_title:         'El orden como libertad creativa',
    phil1_body:          'La metodología no es una restricción — es lo que hace posible la creatividad genuina. Cada proyecto sigue un proceso definido, cada fase tiene sus entregables, cada decisión tiene su fundamento. Sin estructura no hay consistencia; sin consistencia no hay calidad.',
    phil2_title:         'Cuestionar lo establecido',
    phil2_body:          'Si algo siempre se ha hecho de cierta manera, esa es precisamente la razón para preguntarse si hay una mejor forma. Construimos métodos originales basados en marcos probados — no convención por convención.',
    phil3_title:         'La persona antes que el espacio',
    phil3_body:          'Para clientes residenciales, evitamos deliberadamente las fotos de referencia al inicio. En cambio, preguntamos sobre preferencias sensoriales y hábitos diarios — construyendo el concepto a partir de quién es la persona, no de lo que ha visto en otros lugares.',
    phil4_title:         'El comportamiento informa el diseño',
    phil4_body:          'El diseño no existe en el vacío. Entender cómo vive la gente, cómo están cambiando los hábitos y qué significa eso para los espacios y experiencias es la base de cada concepto que desarrollamos — residencial o comercial.',
    phil5_title:         'Medellín como base creativa',
    phil5_body:          'Medellín no es solo donde trabajamos — es parte de cómo pensamos. La textura, el color y la energía creativa de la ciudad aparecen en el trabajo, incluso cuando el encargo no lo pide explícitamente. Con orgullo, sin convertirlo en un cliché.',
    phil6_title:         'La transparencia genera confianza',
    phil6_body:          'Los clientes que entienden el proceso confían en él. Somos transparentes con los presupuestos, los compromisos y los plazos. Nuestra responsabilidad es informar con claridad y honestidad; la decisión final siempre le pertenece al cliente.',
    about_label:         'Sobre el Estudio',
    about_title:         'Espacios construidos con investigación,<br>impulsados por la historia.',
    about_p1:            'Th Studio es un estudio de diseño de interiores y dirección de arte con base en Medellín. Trabajamos en dos líneas distintas: espacios residenciales diseñados en torno a cómo las personas realmente viven, y ambientes comerciales construidos sobre estrategia narrativa para el sector de la hospitalidad.',
    about_p2:            'Con más de cinco años de práctica en diseño de interiores y dirección de arte, el estudio combina un descubrimiento profundo del cliente, desarrollo de concepto basado en investigación y una metodología de proyecto rigurosa para entregar resultados que son tanto visualmente impactantes como profundamente funcionales.',
    about_p3:            'En el ámbito residencial, trabajamos con dos perfiles: clientes que quieren un espacio que los represente genuinamente — personal, con capas, habitable — y clientes que priorizan el impacto visual sobre todo lo demás. Ambos merecen el mismo nivel de oficio. Lo que cambia es el proceso.',
    about_p4:            'Para proyectos comerciales y de hospitalidad, construimos universos narrativos a partir de investigación etnográfica, donde cada decisión — espacio, identidad, menú, música, experiencia — fluye de un concepto central arraigado en las personas reales detrás del proyecto.',
    stat1_label:         'Años de<br>práctica',
    stat2_label:         'Líneas de<br>servicio',
    stat3_label:         'Con sede en<br>Medellín',
    services_label:      'Servicios',
    services_title:      'Dos líneas.<br>Un estándar.',
    svc1_tag:            '01 — Residencial',
    svc1_title:          'Diseño de Interiores<br>y Renovación',
    svc1_sub:            'Espacios diseñados para tu forma de vivir',
    svc1_body:           'Desde renovaciones arquitectónicas completas hasta asesoría de diseño, trabajamos con propietarios en Medellín que quieren espacios que se sientan genuinamente suyos — no orientados por tendencias, no genéricos. Cada proyecto comienza con comprensión, no con suposiciones.',
    svc1_li1:            'Asesoría de diseño — nueva imagen sin cambios estructurales',
    svc1_li2:            'Diseño completo + renovación con modificaciones arquitectónicas',
    svc1_li3:            'Mobiliario personalizado, iluminación y especificación de materiales',
    svc1_li4:            'Gestión de ejecución de obra',
    svc_cta:             'Iniciar una conversación',
    svc2_tag:            '02 — Comercial',
    svc2_title:          'Dirección de Arte<br>y Th Studio',
    svc2_sub:            'Ambientes narrativos para la hospitalidad',
    svc2_body:           'Para restaurantes, hoteles boutique y espacios comerciales que quieren más que estética — un concepto que diferencia y una historia que su audiencia recuerda. Construido desde la escucha real, no de tableros de inspiración tomados de otro lugar.',
    svc2_li1:            'Captura de insights etnográficos — fundadores, equipo e inversores',
    svc2_li2:            'Desarrollo de concepto narrativo',
    svc2_li3:            'Dirección creativa de espacio, identidad y experiencia',
    svc2_li4:            'Hoja de ruta estratégica para todos los puntos de marca',
    contact_label:       'Contáctanos',
    contact_title:       'Convirtamos tu<br>espacio en una historia.',
    contact_sub:         'Con sede en Medellín, trabajando en toda Colombia. Cada proyecto comienza con una conversación — sin compromiso.',
    contact_email:       'Enviar un correo',
    contact_whatsapp:    'WhatsApp',
    footer_copy:         '© 2026 Th Studio. Todos los derechos reservados.',
    portfolio_view_all:  'Ver todos los proyectos',
    page_title:          'Th Studio — Diseño de Interiores & Dirección de Arte · Medellín',
    page_desc:           'Un estudio de diseño de interiores y dirección de arte con base en Medellín. Diseñamos espacios residenciales con alma y ambientes comerciales con narrativa.',
  }
};

// ─── i18n: Apply translations ─────────────────────────

function applyTranslations(lang) {
  const t = translations[lang];
  if (!t) return;

  // Text content elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });

  // HTML content elements (headings with <br>, <em>, &amp; etc.)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  // Page title & meta description
  document.title = t.page_title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', t.page_desc);

  // HTML lang attribute
  document.documentElement.lang = lang;

  // Comparison slider ARIA labels (set by JS, must be updated here)
  document.querySelectorAll('[data-comparison]').forEach(container => {
    container.setAttribute('aria-label', t.comparison_slider_aria);
  });
  document.querySelectorAll('.handle-btn[aria-label]').forEach(btn => {
    btn.setAttribute('aria-label', t.comparison_handle_aria);
  });
}

// ─── i18n: Language switcher ──────────────────────────

const langBtns = document.querySelectorAll('.lang-btn');

langBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.lang;
    applyTranslations(lang);
    langBtns.forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
    try { localStorage.setItem('th-lang', lang); } catch (e) {}
  });
});

// ─── i18n: Initialise from saved preference ───────────

(function initLang() {
  let saved = 'en';
  try { saved = localStorage.getItem('th-lang') || 'en'; } catch (e) {}
  applyTranslations(saved);
  langBtns.forEach(b => b.classList.toggle('active', b.dataset.lang === saved));
})();

// ─── Hero carousels ────────────────────────────────────

function initCarousel(container) {
  const track = container.querySelector('.carousel-track');
  const slides = [...container.querySelectorAll('.carousel-slide')];
  const dots = [...container.querySelectorAll('.carousel-dot')];
  const prevBtn = container.querySelector('.carousel-prev');
  const nextBtn = container.querySelector('.carousel-next');
  if (slides.length <= 1) { prevBtn?.remove(); nextBtn?.remove(); return; }
  let current = 0;
  let touchStartX = 0;
  function goTo(n) {
    current = ((n % slides.length) + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }
  prevBtn?.addEventListener('click', (e) => { e.stopPropagation(); goTo(current - 1); });
  nextBtn?.addEventListener('click', (e) => { e.stopPropagation(); goTo(current + 1); });
  dots.forEach((d, i) => d.addEventListener('click', (e) => { e.stopPropagation(); goTo(i); }));
  container.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  container.addEventListener('touchend', (e) => {
    if (!container.isConnected) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) goTo(current + (dx > 0 ? -1 : 1));
  });
  goTo(0);
}

document.querySelectorAll('[data-carousel]').forEach(initCarousel);
