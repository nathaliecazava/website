/**
 * TH Studio — Project Data
 * ─────────────────────────────────────────────────────────────────
 * Add new projects by inserting a new object into the PROJECTS array.
 *
 * FIELDS
 * ──────
 * id          Unique slug. Used as HTML id, keep URL-safe (no spaces).
 * category    'residential' | 'commercial'
 * title       Project name. Not translated — it's a proper noun.
 * typeEn/Es   Short type label shown beneath the title.
 * descEn/Es   One-paragraph description.
 * location    City / neighbourhood. Same in both languages.
 * area        Floor area string, e.g. '90 m²'. Omit or set null if N/A.
 * scopeLabelEn/Es  Label for the third meta field ('Scope', 'Type', etc.)
 * scopeEn/Es  Value for that meta field.
 *
 * IMAGES
 * ──────
 * Each entry in `images` is { src, tag } where:
 *   src   Full URL (or relative path) to the image.
 *   tag   'before' | 'after' | null
 *
 * Display logic:
 *   • Has exactly one 'before' AND one 'after' → comparison slider
 *   • Two or more images, no matched pair         → gallery carousel
 *   • Anything else (single image, or only befores/afters) → single image
 *
 * ADDING A PROJECT
 * ────────────────
 * 1. Copy one of the blocks below.
 * 2. Fill in all fields.
 * 3. Add your images to the images array.
 * 4. Save. The site rebuilds automatically on the next page load.
 */

const PROJECTS = [

  /* ────────────────────────────────────────────
     01 · Arrecife
     Residential · Full Renovation
  ──────────────────────────────────────────── */
  {
    id: 'arrecife',
    category: 'residential',
    title: 'Arrecife',
    typeEn: 'Residential · Full Renovation',
    typeEs: 'Residencial · Renovación Completa',
    location: 'Medellín',
    area: null,
    scopeLabelEn: 'Scope',
    scopeLabelEs: 'Alcance',
    scopeEn: 'Full Renovation — Kitchen, Living, Bedroom, Bathroom',
    scopeEs: 'Renovación Completa — Cocina, Sala, Habitación, Baño',
    descEn: 'A conventional apartment stripped back and rebuilt as an industrial sanctuary for a young family. Exposed ceiling cassettes, pipe-mounted lighting, and a cement accent wall give the living room raw edge, while a mosaic-tiled kitchen and an elevated bedroom platform keep the space grounded in craft. Nothing decorative — everything structural.',
    descEs: 'Un apartamento convencional desmontado y reconstruido como santuario industrial para una familia joven. Los casetes de techo expuestos, la iluminación sobre tuberías y un muro de cemento como acento le dan al salón un carácter crudo, mientras que la cocina con mosaico y la plataforma elevada del dormitorio anclan el espacio en el oficio. Nada decorativo — todo estructural.',
    images: [
      { src: 'images/arrecife/Arrecife01.jpg', tag: null },
      { src: 'images/arrecife/Arrecife02.jpg', tag: null },
      { src: 'images/arrecife/Arrecife03.jpg', tag: null },
      { src: 'images/arrecife/Arrecife04.jpg', tag: null },
      { src: 'images/arrecife/Arrecife05.jpg', tag: null },
      { src: 'images/arrecife/Arrecife06.jpg', tag: null },
      { src: 'images/arrecife/Arrecife07.jpg', tag: null },
      { src: 'images/arrecife/Arrecife08.jpg', tag: null },
      { src: 'images/arrecife/Arrecife09.jpg', tag: null },
      { src: 'images/arrecife/Arrecife10.jpg', tag: null },
      { src: 'images/arrecife/Arrecife11.jpg', tag: null },
      { src: 'images/arrecife/Arrecife12.jpg', tag: null },
      { src: 'images/arrecife/Arrecife13.jpg', tag: null },
      { src: 'images/arrecife/Arrecife14.jpg', tag: null },
    ],
  },

  /* ────────────────────────────────────────────
     02 · Urban 1204
     Residential · Full Renovation
  ──────────────────────────────────────────── */
  {
    id: 'urban-1204',
    category: 'residential',
    title: 'Urban 1204',
    typeEn: 'Residential · Full Renovation',
    typeEs: 'Residencial · Renovación Completa',
    location: 'Medellín',
    area: null,
    scopeLabelEn: 'Scope',
    scopeLabelEs: 'Alcance',
    scopeEn: 'Full Renovation — Kitchen, Living, Bedrooms (×2), Bathroom, Terrace',
    scopeEs: 'Renovación Completa — Cocina, Sala, Habitaciones (×2), Baño, Terraza',
    descEn: 'A full-floor apartment redesigned around one idea: Medellín as both city and forest. Artisanal textures — graniplast walls, lime wash bedrooms, hand-laid wood bolillos with integrated lighting — create a layered warmth that reads contemporary but feels handmade. Green runs through every zone as the unifying thread.',
    descEs: 'Un apartamento de piso completo rediseñado alrededor de una sola idea: Medellín como ciudad y como bosque. Texturas artesanales — paredes de graniplasto, dormitorios en cal, bolillos de madera con iluminación integrada — crean una calidez en capas que se lee contemporánea pero se siente hecha a mano. El verde recorre cada zona como hilo unificador.',
    images: [
      { src: 'https://source.unsplash.com/XU_ODlSO9ac/1200x900', tag: 'after'  },
      { src: 'https://source.unsplash.com/vBBr-MOWhaY/1200x900', tag: 'before' },
    ],
  },

  /* ────────────────────────────────────────────
     03 · Cinnamon
     Residential · Full Renovation
  ──────────────────────────────────────────── */
  {
    id: 'cinnamon',
    category: 'residential',
    title: 'Cinnamon',
    typeEn: 'Residential · Full Renovation',
    typeEs: 'Residencial · Renovación Completa',
    location: 'Medellín',
    area: null,
    scopeLabelEn: 'Scope',
    scopeLabelEs: 'Alcance',
    scopeEn: 'Full Renovation — Kitchen, Living, Bedroom, Bathroom',
    scopeEs: 'Renovación Completa — Cocina, Sala, Habitación, Baño',
    descEn: 'A compact apartment given a clear identity through an unlikely pairing: bohemian warmth meets Bauhaus discipline. Honey tones, exposed brick, olive accents, and cement floors create an interior that feels organic and considered in equal measure — proof that a small footprint can carry a strong point of view.',
    descEs: 'Un apartamento compacto con una identidad clara a través de una pareja inesperada: calidez bohemia y disciplina Bauhaus. Tonos miel, ladrillo expuesto, acentos oliva y pisos de cemento crean un interior que se siente orgánico y reflexivo a partes iguales — prueba de que una huella pequeña puede sostener un punto de vista fuerte.',
    images: [
      { src: 'https://source.unsplash.com/KXr-fBrUFms/1200x900', tag: 'after'  },
      { src: 'https://source.unsplash.com/Tb4bUf6z9gI/1200x900', tag: 'before' },
    ],
  },

  /* ────────────────────────────────────────────
     04 · SETAI — Apt. 509
     Residential · Advisory
  ──────────────────────────────────────────── */
  {
    id: 'setai-509',
    category: 'residential',
    title: 'SETAI — Apt. 509',
    typeEn: 'Residential · Advisory',
    typeEs: 'Residencial · Asesoría',
    location: 'Edificio SETAI, Medellín',
    area: '44 m²',
    scopeLabelEn: 'Scope',
    scopeLabelEs: 'Alcance',
    scopeEn: 'Advisory — Window System + Flooring',
    scopeEs: 'Asesoría — Sistema de Ventanas + Pisos',
    descEn: 'A focused intervention in a duplex apartment — two moves that changed how the space feels. The living room window system was re-engineered to reverse its opening direction, dissolving the boundary between balcony and living room into a single fluid zone. Across the full 44 m², a warm SPC wood-finish floor replaced the original, installed click-over-click with no demolition.',
    descEs: 'Una intervención precisa en un apartamento dúplex — dos decisiones que cambiaron la percepción del espacio. El sistema de ventanas del salón fue reingeniado para invertir su dirección de apertura, disolviendo el límite entre balcón y sala en una sola zona fluida. En los 44 m² completos, un piso SPC de acabado en madera cálida reemplazó el original, instalado clic sobre clic sin demolición.',
    images: [
      { src: 'images/setai/Setai01.jpg', tag: null },
      { src: 'images/setai/Setai02.jpg', tag: null },
      { src: 'images/setai/Setai03.jpg', tag: null },
      { src: 'images/setai/Setai04.jpg', tag: null },
      { src: 'images/setai/Setai05.jpg', tag: null },
    ],
  },

  /* ────────────────────────────────────────────
     05 · Serie Calle 3
     Residential · Multi-Unit Design Program
  ──────────────────────────────────────────── */
  {
    id: 'serie-calle-3',
    category: 'residential',
    title: 'Serie Calle 3',
    typeEn: 'Residential · Multi-Unit Design Program',
    typeEs: 'Residencial · Programa Multi-Unidad',
    location: 'Edificio Calle 3, Medellín',
    area: null,
    scopeLabelEn: 'Scope',
    scopeLabelEs: 'Alcance',
    scopeEn: 'Full Renovation per unit — Kitchen, Living, Bedrooms, Bathroom',
    scopeEs: 'Renovación Completa por unidad — Cocina, Sala, Habitaciones, Baño',
    descEn: 'Four apartments in a single building — 302, 402, 502, 602 — each designed with its own palette and personality. The series demonstrates adaptability without formula: the same building, the same structure, four distinct homes. Repeat trust from building residents, with individually tailored proposals ranging from 23 to 34 pages.',
    descEs: 'Cuatro apartamentos en un mismo edificio — 302, 402, 502, 602 — cada uno diseñado con su propia paleta y personalidad. La serie demuestra adaptabilidad sin fórmula: el mismo edificio, la misma estructura, cuatro hogares distintos. Confianza reiterada de los residentes del edificio, con propuestas individualizadas de 23 a 34 páginas.',
    images: [
      { src: 'https://source.unsplash.com/xrnNNnq6djg/1200x900', tag: null },
      { src: 'https://source.unsplash.com/AEXgOReTzoM/1200x900', tag: null },
      { src: 'https://source.unsplash.com/XwgC9tsm7jU/1200x900', tag: null },
      { src: 'https://source.unsplash.com/oC10TUvjPaM/1200x900', tag: null },
    ],
  },

  /* ────────────────────────────────────────────
     06 · Aguas del Bosque — Apt 1026
     Residential · Full Renovation
  ──────────────────────────────────────────── */
  {
    id: 'aguas-del-bosque',
    category: 'residential',
    title: 'Aguas del Bosque',
    typeEn: 'Residential · Full Renovation',
    typeEs: 'Residencial · Renovación Completa',
    location: 'Aguas del Bosque, Medellín',
    area: null,
    scopeLabelEn: 'Scope',
    scopeLabelEs: 'Alcance',
    scopeEn: 'Full Renovation — Kitchen, Living, Bedrooms, Bathrooms, Lighting',
    scopeEs: 'Renovación Completa — Cocina, Sala, Habitaciones, Baños, Iluminación',
    descEn: 'A full apartment renovation anchored in a palette of walnut, Verde Guatemala stone, and brushed nickel. A project that demonstrates the studio\'s ability to work with high-specification materials and build a cohesive material language from structure to finish.',
    descEs: 'Una renovación completa de apartamento anclada en una paleta de nogal, piedra Verde Guatemala y níquel cepillado. Un proyecto que demuestra la capacidad del estudio para trabajar con materiales de alta especificación y construir un lenguaje material coherente desde la estructura hasta el acabado.',
    images: [
      { src: 'https://source.unsplash.com/iQlwxMGPS_I/1200x900', tag: 'after'  },
      { src: 'https://source.unsplash.com/mD2atAC5GxE/1200x900', tag: 'before' },
    ],
  },

  /* ────────────────────────────────────────────
     07 · Bella Terra — Casa 78
     Residential · Interior Redesign
  ──────────────────────────────────────────── */
  {
    id: 'bella-terra',
    category: 'residential',
    title: 'Bella Terra — Casa 78',
    typeEn: 'Residential · Interior Redesign',
    typeEs: 'Residencial · Rediseño de Interiores',
    location: 'Bella Terra, Medellín',
    area: null,
    scopeLabelEn: 'Scope',
    scopeLabelEs: 'Alcance',
    scopeEn: 'Kitchen, Dining, Living, Hall, Hallways, Master Bedroom',
    scopeEs: 'Cocina, Comedor, Sala, Hall, Pasillos, Habitación Principal',
    descEn: 'A first-floor residential intervention built around an earth-toned palette of walnut, warm beige, leather tan, and clay red. A four-phase design process fully documented in the studio\'s Notion workflow — from initial research through design development to material specification.',
    descEs: 'Una intervención residencial en primer piso construida alrededor de una paleta de tonos tierra: nogal, beige cálido, cuero tostado y rojo arcilla. Un proceso de diseño en cuatro fases completamente documentado en el flujo de trabajo Notion del estudio — desde la investigación inicial hasta el desarrollo del diseño y la especificación de materiales.',
    images: [
      { src: 'https://source.unsplash.com/oC10TUvjPaM/1200x900', tag: 'after'  },
      { src: 'https://source.unsplash.com/vBBr-MOWhaY/1200x900', tag: 'before' },
    ],
  },

  /* ────────────────────────────────────────────
     08 · Wei — Showroom & Taller
     Commercial · Showroom + Workshop
  ──────────────────────────────────────────── */
  {
    id: 'wei-showroom',
    category: 'commercial',
    title: 'Wei — Showroom & Taller',
    typeEn: 'Commercial · Showroom + Workshop',
    typeEs: 'Comercial · Showroom + Taller',
    location: 'Medellín',
    area: null,
    scopeLabelEn: 'Scope',
    scopeLabelEs: 'Alcance',
    scopeEn: 'Full Renovation — Retail, Creative Workshop, Logistics, Lighting',
    scopeEs: 'Renovación Completa — Retail, Taller Creativo, Logística, Iluminación',
    descEn: 'A hybrid space for a women\'s fashion brand that rejects the expected. Four zones — creative, commercial, design, and shipping — coexist in a single footprint, unified by a black-white-green palette with metal accents. The design translates the brand\'s ethos into operational architecture: from cutting tables with built-in storage to a reference-coded basket system handling 56+ units.',
    descEs: 'Un espacio híbrido para una marca de moda femenina que rechaza lo esperado. Cuatro zonas — creativa, comercial, diseño y envíos — coexisten en una sola huella, unificadas por una paleta negro-blanco-verde con acentos metálicos. El diseño traduce el espíritu de la marca en arquitectura operacional: desde mesas de corte con almacenamiento integrado hasta un sistema de canastas codificado para más de 56 unidades.',
    images: [
      { src: 'https://source.unsplash.com/1lg6Gn0-o54/1200x900', tag: 'after'  },
      { src: 'https://source.unsplash.com/DDfqajOfoCU/1200x900', tag: 'before' },
    ],
  },

  /* ────────────────────────────────────────────
     09 · Mompossina — Tienda & Taller
     Commercial · Retail + Workshop
  ──────────────────────────────────────────── */
  {
    id: 'mompossina',
    category: 'commercial',
    title: 'Mompossina — Tienda & Taller',
    typeEn: 'Commercial · Retail + Workshop',
    typeEs: 'Comercial · Tienda + Taller',
    location: 'Medellín',
    area: null,
    scopeLabelEn: 'Scope',
    scopeLabelEs: 'Alcance',
    scopeEn: 'Full Renovation — Retail, Creative Zone, Façade Design, Lighting',
    scopeEs: 'Renovación Completa — Retail, Zona Creativa, Diseño de Fachada, Iluminación',
    descEn: 'One of the earliest projects where space design was born from brand identity, not a functional brief. A philosophical text about energy and authenticity became the design driver for a fashion boutique built in lime wash, raw wood, and indoor plants. Includes façade design — storefront, wall signage, floor signage — demonstrating integrated thinking across interior and exterior.',
    descEs: 'Uno de los primeros proyectos donde el diseño del espacio nació de la identidad de marca, no de un encargo funcional. Un texto filosófico sobre energía y autenticidad se convirtió en el motor de diseño de una boutique de moda construida en cal, madera cruda y plantas de interior. Incluye diseño de fachada — vitrina, señalética mural, señalética de piso — demostrando pensamiento integrado entre interior y exterior.',
    images: [
      { src: 'https://source.unsplash.com/BZnJ20sEeao/1200x900', tag: 'after'  },
      { src: 'https://source.unsplash.com/th0Xp30Su5s/1200x900', tag: 'before' },
    ],
  },

  /* ────────────────────────────────────────────
     10 · Elentari — Showroom & Taller
     Commercial · Showroom + Workshop
  ──────────────────────────────────────────── */
  {
    id: 'elentari',
    category: 'commercial',
    title: 'Elentari — Showroom & Taller',
    typeEn: 'Commercial · Showroom + Workshop',
    typeEs: 'Comercial · Showroom + Taller',
    location: 'Medellín',
    area: null,
    scopeLabelEn: 'Scope',
    scopeLabelEs: 'Alcance',
    scopeEn: 'Full Renovation — Retail, Creative, Social Zones, Lighting',
    scopeEs: 'Renovación Completa — Retail, Zonas Creativas y Sociales, Iluminación',
    descEn: 'The studio\'s earliest project driven by philosophical inquiry rather than a design brief. Existential questions — about the universe, the body, water, and light — became the framework for material decisions. A minimal palette of lime wash, wood, black, and living plants creates a clean canvas where the brand\'s product takes center stage. A direct ancestor of the Th Studio methodology.',
    descEs: 'El primer proyecto del estudio impulsado por la indagación filosófica en lugar de un encargo de diseño. Preguntas existenciales — sobre el universo, el cuerpo, el agua y la luz — se convirtieron en el marco para las decisiones materiales. Una paleta mínima de cal, madera, negro y plantas vivas crea un lienzo limpio donde el producto de la marca es el protagonista. Un antepasado directo de la metodología Th Studio.',
    images: [
      { src: 'https://source.unsplash.com/4r9OKorlcTk/1200x900', tag: 'after'  },
      { src: 'https://source.unsplash.com/TN0YQNeGIz4/1200x900', tag: 'before' },
    ],
  },

  /* ────────────────────────────────────────────
     11 · Mercante — Mall La Fe
     Commercial · Retail Space
  ──────────────────────────────────────────── */
  {
    id: 'mercante',
    category: 'commercial',
    title: 'Mercante — Mall La Fe',
    typeEn: 'Commercial · Retail Space',
    typeEs: 'Comercial · Espacio de Retail',
    location: 'Mall La Fe, Medellín',
    area: null,
    scopeLabelEn: 'Scope',
    scopeLabelEs: 'Alcance',
    scopeEn: 'Retail Space, Lighting Design',
    scopeEs: 'Espacio de Retail, Diseño de Iluminación',
    descEn: 'A commercial project for a retail space in Mall La Fe that introduced brand interpretation as a design step — bridging the gap between business identity and spatial design. Industrial materials (lunar stone, cement, stainless steel) are balanced by wood warmth and textile softness. Marks the studio\'s evolution toward the conceptual work that now defines Th Studio.',
    descEs: 'Un proyecto comercial para un espacio de retail en Mall La Fe que introdujo la interpretación de marca como paso de diseño — tendiendo un puente entre la identidad empresarial y el diseño espacial. Los materiales industriales (piedra lunar, cemento, acero inoxidable) se equilibran con la calidez de la madera y la suavidad textil. Marca la evolución del estudio hacia el trabajo conceptual que ahora define a Th Studio.',
    images: [
      { src: 'https://source.unsplash.com/DCorP3hIl3k/1200x900', tag: 'after'  },
      { src: 'https://source.unsplash.com/usv3IxTPYxc/1200x900', tag: 'before' },
    ],
  },

  /* ────────────────────────────────────────────
     12 · Restaurante Quereme
     Hospitality · Art Direction
  ──────────────────────────────────────────── */
  {
    id: 'restaurante-quereme',
    category: 'commercial',
    title: 'Restaurante Quereme',
    typeEn: 'Hospitality · Art Direction',
    typeEs: 'Hospitalidad · Dirección de Arte',
    location: 'Medellín',
    area: null,
    scopeLabelEn: 'Scope',
    scopeLabelEs: 'Alcance',
    scopeEn: 'Full Art Direction — Narrative, Creative Direction, Interior, Experience',
    scopeEs: 'Dirección de Arte Completa — Narrativa, Dirección Creativa, Interior, Experiencia',
    descEn: 'The first formal project under Th Studio\'s art direction service line. A five-phase methodology — Hablar, Reinterpretar, Narrar, Curaduría, Habitar — drives every decision from initial research to spatial execution. The proposal itself is a portfolio artifact: it demonstrates the thinking, not just the output.',
    descEs: 'El primer proyecto formal bajo la línea de servicio de dirección de arte de Th Studio. Una metodología de cinco fases — Hablar, Reinterpretar, Narrar, Curaduría, Habitar — impulsa cada decisión desde la investigación inicial hasta la ejecución espacial. La propuesta en sí es un artefacto de portafolio: demuestra el pensamiento, no solo el resultado.',
    images: [
      { src: 'https://source.unsplash.com/Wzo_34cS5bA/1200x900', tag: 'after'  },
      { src: 'https://source.unsplash.com/tkfV4_59gxw/1200x900', tag: 'before' },
    ],
  },

];
