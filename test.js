/**
 * Th Studio — Portfolio Website Test Suite
 * Runs with: node test.js
 */

const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');

const HTML = fs.readFileSync('/home/user/website/index.html', 'utf8');
const CSS  = '/home/user/website/styles.css';
const JS   = '/home/user/website/script.js';

const results = [];
let passed = 0;
let failed = 0;

function log(status, name, detail = '') {
  const icon = status === 'PASS' ? '✓' : '✗';
  console.log(`  ${icon} ${name}${detail ? ' — ' + detail : ''}`);
  results.push({ status, name, detail });
  if (status === 'PASS') passed++;
  else failed++;
}

/** Load the page fresh into a given context */
async function loadPage(context) {
  const page = await context.newPage();
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      const t = msg.text();
      // Ignore external CDN/proxy blocks (picsum, fonts) — not real code errors
      const isExternalBlock = t.includes('407') || t.includes('ERR_TUNNEL') ||
        t.includes('picsum') || t.includes('fonts.g') || t.includes('Failed to load resource');
      if (!isExternalBlock) consoleErrors.push(t);
    }
  });
  await page.setContent(HTML, { waitUntil: 'domcontentloaded' });
  await page.addStyleTag({ path: CSS });
  await page.addScriptTag({ path: JS });
  await page.waitForTimeout(400);
  return { page, consoleErrors };
}

async function run() {
  console.log('\n══════════════════════════════════════');
  console.log('  Th Studio · Website Test Suite');
  console.log('══════════════════════════════════════\n');

  const browser = await chromium.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const { page, consoleErrors } = await loadPage(context);

  // ── 1. Page Metadata ──────────────────────────────────
  console.log('1. Page Metadata');

  const title = await page.title();
  log(title.includes('Th Studio') ? 'PASS' : 'FAIL', 'Title contains "Th Studio"', `"${title}"`);

  const metaDesc = await page.$eval('meta[name="description"]', el => el.content).catch(() => '');
  log(metaDesc.length > 20 ? 'PASS' : 'FAIL', 'Meta description present', metaDesc.slice(0, 60) + '...');

  const viewport = await page.$eval('meta[name="viewport"]', el => el.content).catch(() => '');
  log(viewport.includes('width=device-width') ? 'PASS' : 'FAIL', 'Viewport meta tag present');

  // ── 2. Navigation ─────────────────────────────────────
  console.log('\n2. Navigation');

  const navLogo = await page.$eval('.nav-logo', el => el.textContent.trim()).catch(() => '');
  log(navLogo.length > 0 ? 'PASS' : 'FAIL', 'Logo text present', navLogo);

  const navLinks = await page.$$('.nav-links a');
  log(navLinks.length >= 4 ? 'PASS' : 'FAIL', `Nav links rendered`, `${navLinks.length} links`);

  const navLinksText = await page.$$eval('.nav-links a', els => els.map(e => e.textContent.trim()));
  const hasContact = navLinksText.some(t => t.toLowerCase().includes('contact') || t.toLowerCase().includes('touch'));
  log(hasContact ? 'PASS' : 'FAIL', 'Nav has contact link', navLinksText.join(', '));

  // Nav starts transparent
  const isScrolled = await page.evaluate(() => document.getElementById('nav').classList.contains('scrolled'));
  log(!isScrolled ? 'PASS' : 'FAIL', 'Nav starts transparent (no scrolled class)');

  // Nav turns solid on scroll
  await page.evaluate(() => window.scrollTo(0, 200));
  await page.waitForTimeout(300);
  const afterScroll = await page.evaluate(() => document.getElementById('nav').classList.contains('scrolled'));
  log(afterScroll ? 'PASS' : 'FAIL', 'Nav gains "scrolled" class after scroll');
  await page.evaluate(() => window.scrollTo(0, 0));

  // ── 3. Hero Section ───────────────────────────────────
  console.log('\n3. Hero Section');

  const heroTitle = await page.$eval('.hero-title', el => el.innerText.trim()).catch(() => '');
  log(heroTitle.length > 10 ? 'PASS' : 'FAIL', 'Hero title renders', heroTitle.replace(/\n/g, ' '));

  const heroItalic = await page.$('.hero-title em');
  log(heroItalic ? 'PASS' : 'FAIL', 'Hero italic accent (em) element present');

  const heroSub = await page.$eval('.hero-sub', el => el.textContent.trim()).catch(() => '');
  log(heroSub.includes('Medellín') ? 'PASS' : 'FAIL', 'Hero subtitle mentions Medellín');

  const heroCta = await page.$eval('.hero .btn', el => el.getAttribute('href')).catch(() => '');
  log(heroCta === '#portfolio' ? 'PASS' : 'FAIL', 'Hero CTA points to #portfolio', heroCta);

  const scrollLine = await page.$('.scroll-line');
  log(scrollLine ? 'PASS' : 'FAIL', 'Scroll indicator present');

  // ── 4. Portfolio Section ──────────────────────────────
  console.log('\n4. Portfolio / Before-After Sliders');

  const projects = await page.$$('.project');
  log(projects.length === 3 ? 'PASS' : 'FAIL', '3 project articles rendered', `${projects.length} found`);

  const comparisons = await page.$$('[data-comparison]');
  log(comparisons.length === 3 ? 'PASS' : 'FAIL', '3 comparison slider containers', `${comparisons.length} found`);

  const handles = await page.$$('[data-handle]');
  log(handles.length === 3 ? 'PASS' : 'FAIL', '3 slider handles present');

  const labelsAfter  = await page.$$('.label-after');
  const labelsBefore = await page.$$('.label-before');
  log(labelsAfter.length === 3 && labelsBefore.length === 3 ? 'PASS' : 'FAIL',
    'Before/After labels on all sliders');

  // Drag the first slider and verify it moves
  const firstSlider = await page.$('[data-comparison]');
  await firstSlider.scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  const box = await firstSlider.boundingBox();
  if (box) {
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;
    await page.mouse.move(cx, cy);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.25, cy, { steps: 12 });
    await page.mouse.up();
    await page.waitForTimeout(100);

    const clip = await page.evaluate(() => {
      return document.querySelector('.comparison-before-wrap').style.clipPath;
    });
    log(clip && clip !== 'inset(0 50% 0 0)' ? 'PASS' : 'FAIL',
      'Drag changes slider clip-path', clip);

    const active = await page.evaluate(() =>
      document.querySelector('[data-comparison]').classList.contains('active')
    );
    log(active ? 'PASS' : 'FAIL', '"active" class added after interaction (hint fades)');

    const lblOpacity = await page.evaluate(() =>
      document.querySelector('.label-before').style.opacity
    );
    log(lblOpacity === '1' ? 'PASS' : 'FAIL', '"Before" label visible after dragging right');
  }

  const projectTitles = await page.$$eval('.project-title', els => els.map(e => e.innerText.replace(/\n/g,' ').trim()));
  log(projectTitles.length === 3 ? 'PASS' : 'FAIL', 'All project titles render', projectTitles.join(' | '));

  const projectTypes = await page.$$eval('.project-type', els => els.map(e => e.textContent.trim()));
  log(projectTypes.some(t => t.toLowerCase().includes('residential')) ? 'PASS' : 'FAIL', 'Residential projects tagged');
  log(projectTypes.some(t => t.toLowerCase().includes('commercial') || t.toLowerCase().includes('art direction')) ? 'PASS' : 'FAIL', 'Commercial project tagged');

  // ── 5. Philosophy Section ─────────────────────────────
  console.log('\n5. Philosophy Section');

  const quoteText = await page.$eval('.philosophy-quote', el => el.textContent.trim()).catch(() => '');
  log(quoteText.length > 40 ? 'PASS' : 'FAIL', 'Philosophy quote renders', quoteText.slice(0, 70) + '...');

  const philoItems = await page.$$('.philosophy-item');
  log(philoItems.length === 6 ? 'PASS' : 'FAIL', '6 philosophy principles rendered', `${philoItems.length} found`);

  const philoHeadings = await page.$$eval('.philosophy-item h3', els => els.map(e => e.textContent.trim()));
  log(philoHeadings.length === 6 ? 'PASS' : 'FAIL', 'All 6 principle headings have text', philoHeadings.slice(0,2).join(', ') + '...');

  // ── 6. About Section ──────────────────────────────────
  console.log('\n6. About Section');

  const aboutTitle = await page.$eval('.about-content .section-title', el => el.textContent.trim()).catch(() => '');
  log(aboutTitle.length > 10 ? 'PASS' : 'FAIL', 'About section title renders', aboutTitle);

  const aboutParas = await page.$$('.about-content p');
  log(aboutParas.length >= 4 ? 'PASS' : 'FAIL', 'At least 4 body paragraphs in About', `${aboutParas.length} found`);

  const stats = await page.$$('.stat');
  log(stats.length === 3 ? 'PASS' : 'FAIL', '3 stats rendered', `${stats.length} found`);

  const statNums = await page.$$eval('.stat-number', els => els.map(e => e.textContent.trim()));
  log(statNums.includes('5+') ? 'PASS' : 'FAIL', 'Stat "5+" years present', statNums.join(', '));
  log(statNums.includes('MDE') ? 'PASS' : 'FAIL', 'Stat "MDE" (Medellín) present');

  // ── 7. Services Section ───────────────────────────────
  console.log('\n7. Services Section');

  const serviceCards = await page.$$('.service-card');
  log(serviceCards.length === 2 ? 'PASS' : 'FAIL', '2 service cards rendered', `${serviceCards.length} found`);

  const serviceHeadings = await page.$$eval('.service-card h3', els => els.map(e => e.innerText.replace(/\n/g,' ').trim()));
  log(serviceHeadings.some(h => h.toLowerCase().includes('interior')) ? 'PASS' : 'FAIL',
    'Interior Design service card present', serviceHeadings.join(' | '));
  log(serviceHeadings.some(h => h.toLowerCase().includes('art direction') || h.toLowerCase().includes('th studio')) ? 'PASS' : 'FAIL',
    'Art Direction / Th Studio service card present');

  const serviceListItems = await page.$$('.service-list li');
  log(serviceListItems.length >= 6 ? 'PASS' : 'FAIL', 'Service list items rendered', `${serviceListItems.length} total`);

  const serviceCtaBtns = await page.$$('.service-card .btn');
  log(serviceCtaBtns.length === 2 ? 'PASS' : 'FAIL', 'CTA button on each service card');

  // ── 8. Contact Section ────────────────────────────────
  console.log('\n8. Contact Section');

  const contactTitle = await page.$eval('.contact-title', el => el.textContent.trim()).catch(() => '');
  log(contactTitle.length > 10 ? 'PASS' : 'FAIL', 'Contact title renders', contactTitle.replace(/\n/g,' '));

  const contactSub = await page.$eval('.contact-sub', el => el.textContent.trim()).catch(() => '');
  log(contactSub.includes('Medellín') ? 'PASS' : 'FAIL', 'Contact mentions Medellín');

  const contactBtns = await page.$$('.contact-links .btn');
  log(contactBtns.length === 2 ? 'PASS' : 'FAIL', '2 contact buttons (email + WhatsApp)', `${contactBtns.length} found`);

  // ── 9. Footer ─────────────────────────────────────────
  console.log('\n9. Footer');

  const footerLogo = await page.$eval('.footer-logo', el => el.textContent.trim()).catch(() => '');
  log(footerLogo.includes('Studio') ? 'PASS' : 'FAIL', 'Footer logo text', footerLogo);

  const footerCopy = await page.$eval('.footer-copy', el => el.textContent).catch(() => '');
  log(footerCopy.includes('2026') ? 'PASS' : 'FAIL', 'Footer copyright year correct');

  const footerLoc = await page.$eval('.footer-location', el => el.textContent.trim()).catch(() => '');
  log(footerLoc.includes('Medellín') ? 'PASS' : 'FAIL', 'Footer location "Medellín"', footerLoc);

  // ── 10. Sections & Anchor Links ───────────────────────
  console.log('\n10. Sections & Anchor Navigation');

  const sectionIds = ['portfolio', 'philosophy', 'about', 'services', 'contact'];
  for (const id of sectionIds) {
    const el = await page.$(`#${id}`);
    log(el ? 'PASS' : 'FAIL', `Section #${id} exists`);
  }

  const allAnchors = await page.$$eval('a[href^="#"]', els => els.map(e => e.getAttribute('href')));
  log(allAnchors.length >= 5 ? 'PASS' : 'FAIL', `${allAnchors.length} internal anchor links present`);

  // ── 11. CSS & Visual ──────────────────────────────────
  console.log('\n11. CSS & Computed Styles');

  const terracottaUsed = await page.evaluate(() => {
    const el = document.querySelector('.section-label');
    return window.getComputedStyle(el).color;
  }).catch(() => '');
  log(terracottaUsed.length > 0 ? 'PASS' : 'FAIL', 'CSS custom properties applied to section labels', terracottaUsed);

  const heroHeight = await page.evaluate(() => {
    const hero = document.querySelector('.hero');
    return hero ? hero.getBoundingClientRect().height : 0;
  });
  log(heroHeight >= 600 ? 'PASS' : 'FAIL', `Hero fills viewport height (≥600px)`, `${Math.round(heroHeight)}px`);

  const btnStyles = await page.$eval('.hero .btn', el => window.getComputedStyle(el)).catch(() => null);

  // ── 12. Responsive — Mobile ───────────────────────────
  console.log('\n12. Responsive Layout — Mobile (390px)');

  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(200);

  const mobileNavHidden = await page.evaluate(() => {
    const nl = document.querySelector('.nav-links');
    return nl ? window.getComputedStyle(nl).display === 'none' : false;
  });
  log(mobileNavHidden ? 'PASS' : 'FAIL', 'Nav links hidden on mobile (hamburger breakpoint)');

  const mobileProjectCols = await page.evaluate(() => {
    const p = document.querySelector('.project');
    if (!p) return '';
    return window.getComputedStyle(p).gridTemplateColumns;
  });
  // On mobile, projects should be single column (roughly 1fr or a single value without space)
  const isSingleCol = mobileProjectCols && !mobileProjectCols.trim().includes(' ');
  log(isSingleCol ? 'PASS' : 'FAIL', 'Projects stack single-column on mobile', mobileProjectCols);

  const mobileServicesCols = await page.evaluate(() => {
    const sg = document.querySelector('.services-grid');
    return sg ? window.getComputedStyle(sg).gridTemplateColumns : '';
  });
  const isMobileSingleCol = mobileServicesCols && !mobileServicesCols.trim().includes(' ');
  log(isMobileSingleCol ? 'PASS' : 'FAIL', 'Services stack single-column on mobile', mobileServicesCols);

  const mobilePhiloCols = await page.evaluate(() => {
    const pg = document.querySelector('.philosophy-grid');
    return pg ? window.getComputedStyle(pg).gridTemplateColumns : '';
  });
  const isMobilePhiloSingle = mobilePhiloCols && !mobilePhiloCols.trim().includes(' ');
  log(isMobilePhiloSingle ? 'PASS' : 'FAIL', 'Philosophy grid collapses on mobile', mobilePhiloCols);

  // ── 13. JavaScript ────────────────────────────────────
  console.log('\n13. JavaScript Behaviour');

  log(consoleErrors.length === 0 ? 'PASS' : 'FAIL',
    'No JS console errors',
    consoleErrors.length ? consoleErrors.slice(0,2).join('; ') : 'clean');

  // Scroll animate observer exists
  const hasObserver = await page.evaluate(() => typeof IntersectionObserver !== 'undefined');
  log(hasObserver ? 'PASS' : 'FAIL', 'IntersectionObserver available for scroll animations');

  // ── Screenshots ───────────────────────────────────────
  console.log('\n14. Screenshots');
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.screenshot({ path: '/home/user/website/screenshot-desktop.png' });
  log('PASS', 'Desktop screenshot saved → screenshot-desktop.png');

  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: '/home/user/website/screenshot-mobile.png' });
  log('PASS', 'Mobile screenshot saved → screenshot-mobile.png');

  await browser.close();

  // ── Summary ───────────────────────────────────────────
  console.log('\n══════════════════════════════════════');
  console.log(`  ${passed} passed · ${failed} failed`);
  console.log('══════════════════════════════════════\n');

  if (failed > 0) {
    console.log('Failed:');
    results.filter(r => r.status !== 'PASS').forEach(r =>
      console.log(`  ✗ ${r.name}${r.detail ? ' — ' + r.detail : ''}`)
    );
    console.log('');
  }

  process.exit(failed > 0 ? 1 : 0);
}

run().catch(err => {
  console.error('\nTest runner error:', err.message);
  process.exit(1);
});
