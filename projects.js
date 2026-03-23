/* ═══════════════════════════════════════════════
   TH STUDIO — All Projects Page · JS
   ═══════════════════════════════════════════════ */

// ─── State ────────────────────────────────────────────

let currentLang   = 'en';
let currentFilter = 'all';

// ─── Translations ─────────────────────────────────────

const translations = {
  en: {
    page_title:           'Th Studio — All Projects · Medellín',
    page_desc:            'Browse the full project portfolio of Th Studio — an interior design and art direction studio based in Medellín.',
    projects_label:       'Portfolio',
    projects_title:       'Every space<br>we\'ve shaped.',
    filter_all:           'All',
    filter_residential:   'Residential',
    filter_commercial:    'Commercial',
    projects_empty:       'No projects in this category yet.',
    comparison_after:     'After',
    comparison_before:    'Before',
    comparison_drag:      'Drag to compare',
    comparison_handle_aria: 'Drag to compare before and after',
    comparison_slider_aria: 'Before and after comparison slider',
    carousel_prev_aria:   'Previous image',
    carousel_next_aria:   'Next image',
    meta_location:        'Location',
    meta_area:            'Area',
    logo_sub:             'Art Direction & Curation',
    nav_work:             'Work',
    nav_philosophy:       'Philosophy',
    nav_about:            'About',
    nav_services:         'Services',
    nav_cta:              'Get in touch',
    footer_copy:          '© 2026 Th Studio. All rights reserved.',
  },
  es: {
    page_title:           'Th Studio — Todos los Proyectos · Medellín',
    page_desc:            'Explora el portafolio completo de Th Studio — un estudio de diseño de interiores y dirección de arte con base en Medellín.',
    projects_label:       'Portafolio',
    projects_title:       'Cada espacio<br>que hemos moldeado.',
    filter_all:           'Todo',
    filter_residential:   'Residencial',
    filter_commercial:    'Comercial',
    projects_empty:       'Aún no hay proyectos en esta categoría.',
    comparison_after:     'Después',
    comparison_before:    'Antes',
    comparison_drag:      'Arrastra para comparar',
    comparison_handle_aria: 'Arrastra para comparar antes y después',
    comparison_slider_aria: 'Deslizador de comparación antes y después',
    carousel_prev_aria:   'Imagen anterior',
    carousel_next_aria:   'Imagen siguiente',
    meta_location:        'Ubicación',
    meta_area:            'Área',
    logo_sub:             'Dirección de Arte y Curaduría',
    nav_work:             'Trabajo',
    nav_philosophy:       'Filosofía',
    nav_about:            'Nosotros',
    nav_services:         'Servicios',
    nav_cta:              'Contáctanos',
    footer_copy:          '© 2026 Th Studio. Todos los derechos reservados.',
  },
};

// ─── i18n ─────────────────────────────────────────────

function applyTranslations(lang) {
  const t = translations[lang];
  if (!t) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  document.title = t.page_title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', t.page_desc);
  document.documentElement.lang = lang;
}

// ─── Visual type resolver ─────────────────────────────

function resolveVisualType(project) {
  const images = project.images || [];
  const hasBefore = images.some(i => i.tag === 'before');
  const hasAfter  = images.some(i => i.tag === 'after');
  if (hasBefore && hasAfter) return 'comparison';
  if (images.length > 1)     return 'carousel';
  return 'single';
}

// ─── HTML escaping ────────────────────────────────────

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─── Build visual HTML ────────────────────────────────

const ARROW_ICON_L = `<svg width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true"><path d="M6 1L1 6l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const ARROW_ICON_R = `<svg width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true"><path d="M1 1l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const SLIDER_ICON  = `<svg width="20" height="10" viewBox="0 0 20 10" fill="none" aria-hidden="true"><path d="M1 5h18M5 1L1 5l4 4M15 1l4 4-4 4" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

function buildComparisonHTML(project, t) {
  const after  = project.images.find(i => i.tag === 'after');
  const before = project.images.find(i => i.tag === 'before');
  return `
    <div class="comparison-wrap" data-comparison>
      <img src="${esc(after.src)}"  alt="${esc(project.title)}" class="img-after">
      <div class="comparison-before-wrap">
        <img src="${esc(before.src)}" alt="${esc(project.title)}">
      </div>
      <span class="comparison-label label-after">${esc(t.comparison_after)}</span>
      <span class="comparison-label label-before">${esc(t.comparison_before)}</span>
      <div class="comparison-handle" data-handle>
        <div class="handle-btn" aria-label="${esc(t.comparison_handle_aria)}">
          ${SLIDER_ICON}
        </div>
      </div>
      <div class="comparison-hint" aria-hidden="true">${esc(t.comparison_drag)}</div>
    </div>`;
}

function buildCarouselHTML(project, t) {
  const images = project.images;
  const slides = images.map(img => {
    const tagLabel = img.tag ? esc(t[`comparison_${img.tag}`] || img.tag) : '';
    return `
      <div class="carousel-slide" data-tag="${img.tag || ''}">
        <img src="${esc(img.src)}" alt="${esc(project.title)}" loading="lazy">
        ${tagLabel ? `<span class="carousel-badge">${tagLabel}</span>` : ''}
      </div>`;
  }).join('');

  const dots = images.map((_, i) =>
    `<button class="carousel-dot${i === 0 ? ' active' : ''}" aria-label="Image ${i + 1}"></button>`
  ).join('');

  return `
    <div class="pcard-carousel" data-carousel>
      <div class="carousel-track">${slides}</div>
      <button class="carousel-btn carousel-prev" aria-label="${esc(t.carousel_prev_aria)}">${ARROW_ICON_L}</button>
      <button class="carousel-btn carousel-next" aria-label="${esc(t.carousel_next_aria)}">${ARROW_ICON_R}</button>
      <div class="carousel-dots" aria-hidden="true">${dots}</div>
    </div>`;
}

function buildSingleHTML(project) {
  const img = project.images[0];
  if (!img) return '';
  return `<img src="${esc(img.src)}" alt="${esc(project.title)}" class="pcard-single-img" loading="lazy">`;
}

// ─── Build card HTML ──────────────────────────────────

function buildCardHTML(project) {
  const t    = translations[currentLang];
  const lang = currentLang;
  const type = resolveVisualType(project);

  let visualHTML = '';
  if (type === 'comparison') visualHTML = buildComparisonHTML(project, t);
  else if (type === 'carousel') visualHTML = buildCarouselHTML(project, t);
  else visualHTML = buildSingleHTML(project);

  const typeText  = lang === 'es' ? project.typeEs  : project.typeEn;
  const descText  = lang === 'es' ? project.descEs  : project.descEn;
  const scopeLabel = lang === 'es' ? project.scopeLabelEs : project.scopeLabelEn;
  const scopeValue = lang === 'es' ? project.scopeEs : project.scopeEn;
  const locationLabel = t.meta_location;
  const areaLabel     = t.meta_area;

  const metaItems = [
    `<div class="pcard-meta-item">
       <p class="pcard-meta-label">${locationLabel}</p>
       <p class="pcard-meta-value">${esc(project.location)}</p>
     </div>`,
    project.area
      ? `<div class="pcard-meta-item">
           <p class="pcard-meta-label">${areaLabel}</p>
           <p class="pcard-meta-value">${esc(project.area)}</p>
         </div>`
      : '',
    `<div class="pcard-meta-item">
       <p class="pcard-meta-label">${esc(scopeLabel)}</p>
       <p class="pcard-meta-value">${esc(scopeValue)}</p>
     </div>`,
  ].join('');

  return `
    <article class="pcard" data-animate data-category="${esc(project.category)}" data-id="${esc(project.id)}">
      <div class="pcard-visual">${visualHTML}</div>
      <div class="pcard-info">
        <p class="pcard-type">${esc(typeText)}</p>
        <h3 class="pcard-title">${esc(project.title)}</h3>
        <p class="pcard-desc">${esc(descText)}</p>
        <div class="pcard-meta">${metaItems}</div>
      </div>
    </article>`;
}

// ─── Render grid ──────────────────────────────────────

function renderGrid(filter) {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const validFilters = ['all', 'residential', 'commercial'];
  const safeFilter = validFilters.includes(filter) ? filter : 'all';
  const t = translations[currentLang];

  const visible = safeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === safeFilter);

  if (visible.length === 0) {
    grid.innerHTML = `<p class="projects-empty">${esc(t.projects_empty)}</p>`;
    return;
  }

  grid.innerHTML = visible.map(buildCardHTML).join('');

  // Initialise interactive widgets
  grid.querySelectorAll('[data-comparison]').forEach(initComparison);
  grid.querySelectorAll('[data-carousel]').forEach(initCarousel);

  // Scroll-in animations for new cards
  grid.querySelectorAll('[data-animate]').forEach(el => animateObserver.observe(el));
}

// ─── Comparison slider (same logic as script.js) ──────

function initComparison(container) {
  const beforeWrap  = container.querySelector('.comparison-before-wrap');
  const handle      = container.querySelector('[data-handle]');
  const labelBefore = container.querySelector('.label-before');
  const t           = translations[currentLang];

  let isDragging    = false;
  let hasInteracted = false;

  container.setAttribute('tabindex', '0');
  container.setAttribute('role', 'slider');
  container.setAttribute('aria-label', t.comparison_slider_aria);
  container.setAttribute('aria-valuenow', '50');
  container.setAttribute('aria-valuemin', '0');
  container.setAttribute('aria-valuemax', '100');

  function setPosition(clientX) {
    if (!container.isConnected) return;
    const rect   = container.getBoundingClientRect();
    const pct    = Math.max(3, Math.min(97, (clientX - rect.left) / rect.width * 100));
    beforeWrap.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    handle.style.left = `${pct}%`;
    if (labelBefore) labelBefore.style.opacity = pct > 12 ? '1' : '0';
    if (!hasInteracted) { hasInteracted = true; container.classList.add('active'); }
    container.setAttribute('aria-valuenow', Math.round(pct));
  }

  const startDrag = (e) => { isDragging = true; setPosition(e.clientX); e.preventDefault(); };
  handle.addEventListener('mousedown', startDrag);
  container.addEventListener('mousedown', startDrag);

  document.addEventListener('mouseup', () => { isDragging = false; });
  document.addEventListener('mousemove', (e) => { if (isDragging) setPosition(e.clientX); });

  handle.addEventListener('touchstart', (e) => {
    isDragging = true; setPosition(e.touches[0].clientX); e.preventDefault();
  }, { passive: false });
  container.addEventListener('touchstart', (e) => {
    isDragging = true; setPosition(e.touches[0].clientX);
  }, { passive: true });
  document.addEventListener('touchend', () => { isDragging = false; });
  document.addEventListener('touchmove', (e) => {
    if (isDragging) setPosition(e.touches[0].clientX);
  }, { passive: true });

  container.addEventListener('keydown', (e) => {
    const rect   = container.getBoundingClientRect();
    const curPct = parseFloat(handle.style.left) || 50;
    if (e.key === 'ArrowLeft')  setPosition(rect.left + (curPct - 5) / 100 * rect.width);
    if (e.key === 'ArrowRight') setPosition(rect.left + (curPct + 5) / 100 * rect.width);
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') e.preventDefault();
  });

  handle.style.left = '50%';
}

// ─── Carousel ─────────────────────────────────────────

function initCarousel(container) {
  const track  = container.querySelector('.carousel-track');
  const slides = [...container.querySelectorAll('.carousel-slide')];
  const dots   = [...container.querySelectorAll('.carousel-dot')];
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

  // Touch swipe
  container.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  container.addEventListener('touchend', (e) => {
    if (!container.isConnected) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) goTo(current + (dx > 0 ? -1 : 1));
  });

  goTo(0);
}

// ─── Scroll-in animation observer ────────────────────

const animateObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const siblings = entry.target.parentElement
        ? [...entry.target.parentElement.querySelectorAll('[data-animate]')]
        : [];
      const delay = siblings.indexOf(entry.target) * 80;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      animateObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
);

// ─── Filter ───────────────────────────────────────────

function syncFilterButtons(filter) {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
}

function applyFilter(filter, pushState = true) {
  const validFilters = ['all', 'residential', 'commercial'];
  const safeFilter = validFilters.includes(filter) ? filter : 'all';
  currentFilter = safeFilter;

  if (pushState) {
    const url = new URL(location.href);
    if (safeFilter === 'all') {
      url.searchParams.delete('filter');
    } else {
      url.searchParams.set('filter', safeFilter);
    }
    history.pushState({ filter: safeFilter }, '', url);
  }

  syncFilterButtons(safeFilter);

  // Fade out → swap → fade in
  const grid = document.getElementById('projects-grid');
  if (grid) {
    grid.classList.add('grid-fading');
    setTimeout(() => {
      renderGrid(safeFilter);
      grid.classList.remove('grid-fading');
    }, 150);
  }
}

// ─── Init ─────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {

  // Nav scroll
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Language from localStorage
  let saved = 'en';
  try { saved = localStorage.getItem('th-lang') || 'en'; } catch (e) {}
  currentLang = saved;

  // Filter from URL
  const params = new URLSearchParams(location.search);
  const urlFilter = params.get('filter');
  const validFilters = ['all', 'residential', 'commercial'];
  currentFilter = validFilters.includes(urlFilter) ? urlFilter : 'all';

  // Apply static translations & render
  applyTranslations(currentLang);
  syncFilterButtons(currentFilter);
  renderGrid(currentFilter);

  // Lang switcher
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(b => b.classList.toggle('active', b.dataset.lang === currentLang));
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      currentLang = lang;
      langBtns.forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
      document.documentElement.lang = lang;
      try { localStorage.setItem('th-lang', lang); } catch (e) {}
      applyTranslations(lang);
      renderGrid(currentFilter);  // re-render with new language
    });
  });

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
  });

  // Back/forward navigation
  window.addEventListener('popstate', (e) => {
    const filter = e.state?.filter
      ?? new URLSearchParams(location.search).get('filter')
      ?? 'all';
    currentFilter = filter;
    syncFilterButtons(filter);
    const grid = document.getElementById('projects-grid');
    if (grid) renderGrid(filter);
  });

});
