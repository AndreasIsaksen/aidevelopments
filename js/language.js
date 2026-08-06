/**
 * Lightweight client-side localisation for the portfolio.
 * English remains the source language; Norwegian translations are applied to
 * both the static page and cards that are rendered asynchronously.
 */
(() => {
  const STORAGE_KEY = "portfolio-language";
  const supportedLanguages = new Set(["en", "nb"]);
  const norwegian = {
    "Primary navigation": "Hovednavigasjon",
    "Language": "Språk",
    "About": "Om meg",
    "Experience": "Erfaring",
    "Skills": "Ferdigheter",
    "Projects": "Prosjekter",
    "Documentation": "Dokumentasjon",
    "Contact": "Kontakt",
    "Back to Top": "Til toppen",
    "Software • Data • Machine Learning": "Programvare • Data • Maskinlæring",
    "Building practical technical solutions with a focus on systems, data, and real-world use.": "Praktiske løsninger med fokus på systemer, data og bruk i den virkelige verden.",
    "I’m Andreas Isaksen, a Bachelor of Informatics graduate specialized in machine learning, with experience in IT operations, software development, databases, and technical problem solving. I build practical software and data-driven solutions with a focus on structure, usability, and real-world value.": "Mitt navn er Andreas Isaksen og er en utvikler med bachelor i informatikk, med spesialisering i maskinlæring og erfaring innen IT-drift, programvareutvikling, databaser og teknisk problemløsning. Jeg utvikler praktisk programvare og datadrevne løsninger med fokus på struktur, brukervennlighet og reell nytteverdi.",
    "Education": "Utdanning",
    "Contact me": "Kontakt meg",
    "Ongoing Projects": "Pågående prosjekter",
    "Completed Projects": "Fullførte prosjekter",
    "Work Experience": "Arbeidserfaring",
    "About Me": "Om meg",
    "School Reports and Documentation": "Skolerapporter og dokumentasjon",
    "My studies in Informatics is from": "Jeg har studert informatikk ved",
    "in Norway, and thereby a lot of the work is documented in Norwegian. Eventual requests for translations can be requested": "i Norge, og mye av arbeidet er derfor dokumentert på norsk. Forespørsler om oversettelser kan sendes",
    "here": "her",
    "Got a project regarding software development, data analysis, ML, or technical work?": "Har du et prosjekt innen programvareutvikling, dataanalyse, maskinlæring eller annet teknisk arbeid?",
    "Message Me": "Send meg en melding",
    "View profile": "Vis profil",
    "Document preview": "Dokumentvisning",
    "Close preview": "Lukk visning",
    "PDF preview": "PDF-visning",
    "Send an enquiry": "Send en forespørsel",
    "Close form": "Lukk skjema",
    "Name": "Navn",
    "Phone": "Telefon",
    "Mail": "E-post",
    "Company": "Bedrift",
    "Topic": "Emne",
    "Message": "Melding",
    "required": "obligatorisk",
    "optional": "valgfritt",
    "required, maximum 50 characters": "obligatorisk, maks 50 tegn",
    "required, 20–500 characters": "obligatorisk, 20–500 tegn",
    "0 / 500 characters": "0 / 500 tegn",
    "Send message": "Send melding",
    "Who am I?": "Hvem er jeg?",
    "IT professional with experience in IT operations at companies including IBM, Visma, Datametrix, and Atea. Bachelor's degree in Computer Science with a specialization in Machine Learning, graduated in Spring 2026.": "IT-fagperson med erfaring fra IT-drift i blant annet IBM, Visma, Datametrix og Atea. Fullførte våren 2026 en bachelor i informatikk med spesialisering i maskinlæring.",
    "What's my drive?": "Hva motiverer meg?",
    "Family life with my partner, three children, and our dog are the reasons I get up in the morning to give it all I've got. I also have a strong interest in technology and programming and regularly spend time exploring new technical topics.": "Familielivet med samboeren min, tre barn og hunden vår er grunnen til at jeg står opp om morgenen og gir alt. Jeg har også en sterk interesse for teknologi og programmering og bruker jevnlig tid på å utforske nye tekniske temaer.",
    "Summary of spare time activities": "Kort om fritidsinteressene mine",
    "In recent years, my interests have shifted from gaming, fantasy literature, and music toward developing technological solutions and reading professional literature on IT and programming. I have built a personal library of technical books that I continue to use for ongoing learning beyond my studies": "De siste årene har interessene mine flyttet seg fra spill, fantasylitteratur og musikk til utvikling av teknologiske løsninger og faglitteratur om IT og programmering. Jeg har bygget opp et personlig bibliotek med tekniske bøker som jeg fortsatt bruker til læring utover studiene.",
    "My passion for technology and programming is fueled by the constant evolution of the field, which offers endless opportunities for learning and growth. I enjoy the challenge of solving complex problems and creating innovative solutions that can make a real difference in people's lives. Whether it's developing software, analyzing data, or exploring new technologies, I am always eager to expand my knowledge and skills in the world of technology.": "Lidenskapen min for teknologi og programmering drives av den stadige utviklingen i fagfeltet, som gir uendelige muligheter for læring og vekst. Jeg liker utfordringen med å løse komplekse problemer og skape innovative løsninger som kan gjøre en reell forskjell. Enten det gjelder programvareutvikling, dataanalyse eller ny teknologi, ønsker jeg alltid å utvide kunnskapen og ferdighetene mine.",
    "Programming": "Programmering",
    "Experience with a wide range of programming languages and technologies, with focus on backend development, data processing, and machine learning.": "Erfaring med et bredt utvalg programmeringsspråk og teknologier, med fokus på backendutvikling, databehandling og maskinlæring.",
    "ML: Training, Tuning, Analysis": "ML: trening, finjustering og analyse",
    "Practical experience with machine learning model training, hyperparameter tuning, and analysis of results in various projects.": "Praktisk erfaring med trening av maskinlæringsmodeller, justering av hyperparametere og analyse av resultater i ulike prosjekter.",
    "Computer Vision & Image Analysis": "Datasyn og bildeanalyse",
    "Research and development work in computer vision, image processing, and practical applications of these technologies.": "Forsknings- og utviklingsarbeid innen datasyn, bildebehandling og praktisk bruk av disse teknologiene.",
    "Systems & Infrastructure": "Systemer og infrastruktur",
    "Background from IT operations and production environments with focus on reliability and technical flow.": "Bakgrunn fra IT-drift og produksjonsmiljøer med fokus på stabilitet og teknisk flyt.",
    "Software Development": "Programvareutvikling",
    "Experience with software development projects involving agile methodologies, structured design, and technical implementation.": "Erfaring fra programvareprosjekter med smidige metoder, strukturert design og teknisk implementering.",
    "Web Design": "Webdesign",
    "Design and development of websites with focus on clean structure, responsive design, and technical implementation.": "Design og utvikling av nettsider med fokus på ryddig struktur, responsivt design og teknisk implementering.",
    "Strong focus on structured technical documentation, reporting, diagrams, and academic project work, as well as business documentation.": "Sterkt fokus på strukturert teknisk dokumentasjon, rapportering, diagrammer, akademisk prosjektarbeid og forretningsdokumentasjon.",
    "Grades and Credits": "Karakterer og studiepoeng",
    "Official transcript of grades from my studies.": "Offisiell karakterutskrift fra studiene mine.",
    "Bachelor Thesis": "Bacheloroppgave",
    "A .NET web application case project with Seal Engineering AS for importing PDF and Excel order documentation, extracting structured values, and supporting compliance assessment between customer and internal requirements.": "Et .NET-nettapplikasjonsprosjekt med Seal Engineering AS for import av ordre­dokumentasjon i PDF og Excel, uttrekk av strukturerte verdier og samsvarsvurdering mellom kundekrav og interne krav.",
    "Image Analysis": "Bildeanalyse",
    "Deep learning project comparing custom CNN and MobileNetV2 models for flower image classification using preprocessing, augmentation, and model evaluation workflows.": "Dyplæringsprosjekt som sammenligner en egen CNN-modell med MobileNetV2 for klassifisering av blomsterbilder ved hjelp av forbehandling, datautvidelse og modellevaluering.",
    "Frameworks and .NET": "Rammeverk og .NET",
    "Development of TaskyFy, a reusable .NET scheduling library with builder-based job definitions, timed and event triggers, priority handling, and supporting documentation.": "Utvikling av TaskyFy, et gjenbrukbart .NET-bibliotek for planlegging med builder-baserte jobbdefinisjoner, tids- og hendelsesutløsere, prioritetshåndtering og tilhørende dokumentasjon.",
    "Big Data: Storage and Processing": "Stordata: lagring og behandling",
    "Group project focused on distributed data storage and processing workflows using big data tooling, Docker-based infrastructure, notebooks, and analytical reporting.": "Gruppeprosjekt om distribuert datalagring og behandlingsflyt med stordataverktøy, Docker-basert infrastruktur, notebooks og analytisk rapportering.",
    "Database Systems": "Databasesystemer",
    "Course work focused on relational database design, SQL querying, normalization, and structured data modelling through practical database assignments and projects.": "Kursarbeid om relasjonell databasedesign, SQL-spørringer, normalisering og strukturert datamodellering gjennom praktiske oppgaver og prosjekter.",
    "Introduction to Computer Security": "Introduksjon til datasikkerhet",
    "Course work covering core security concepts, risk awareness, vulnerabilities, defensive measures, and practical reasoning about secure digital systems.": "Kursarbeid som dekker grunnleggende sikkerhetskonsepter, risikoforståelse, sårbarheter, beskyttelsestiltak og praktisk vurdering av sikre digitale systemer.",
    "Programming 2 (basic Java)": "Programmering 2 (grunnleggende Java)",
    "Java programming course work covering object-oriented design, classes, collections, control flow, and practical application development exercises.": "Kursarbeid i Java som dekker objektorientert design, klasser, samlinger, kontrollflyt og praktiske utviklingsoppgaver.",
    "Web Development": "Webutvikling",
    "Web development course work focused on building structured, responsive websites with HTML, CSS, JavaScript, and user-oriented page design.": "Kursarbeid i webutvikling med fokus på strukturerte, responsive nettsider med HTML, CSS, JavaScript og brukerorientert design.",
    "Computer Networks": "Datanettverk",
    "Networking course work covering network design, addressing, routing concepts, and practical Cisco Packet Tracer-based configuration exercises.": "Kursarbeid i nettverk som dekker nettverksdesign, adressering, ruting og praktiske konfigurasjonsoppgaver i Cisco Packet Tracer.",
    "Introduction to Operating Systems": "Introduksjon til operativsystemer",
    "Operating systems course work covering processes, memory, file systems, concurrency, and low-level programming concepts through practical C-based assignments.": "Kursarbeid i operativsystemer som dekker prosesser, minne, filsystemer, samtidighet og lavnivåprogrammering gjennom praktiske oppgaver i C.",
    "Practical Machine Learning": "Praktisk maskinlæring",
    "Machine learning course work exploring supervised learning, clustering, model training, evaluation, and data-driven experimentation in Python and Jupyter.": "Kursarbeid i maskinlæring med veiledet læring, klynging, modelltrening, evaluering og datadrevne eksperimenter i Python og Jupyter.",
    "Programming 1 (basic Python)": "Programmering 1 (grunnleggende Python)",
    "Introductory Python course work covering programming fundamentals, control flow, data structures, functions, and practical problem-solving exercises.": "Introduksjonskurs i Python som dekker grunnleggende programmering, kontrollflyt, datastrukturer, funksjoner og praktisk problemløsning.",
    "Software Engineering and Testing": "Programvareutvikling og testing",
    "Group project focused on developing and testing a web-based system while applying software engineering practices, documentation, and quality assurance workflows.": "Gruppeprosjekt med utvikling og testing av et nettbasert system ved bruk av programvaremetodikk, dokumentasjon og kvalitetssikring.",
    "Statistics and Statistical Programming": "Statistikk og statistisk programmering",
    "Course work combining statistical theory and programming for data analysis, probability, inference, visualization, and practical statistical problem solving.": "Kursarbeid som kombinerer statistisk teori og programmering for dataanalyse, sannsynlighet, inferens, visualisering og praktisk problemløsning.",
    "Algorithms and Data Structures": "Algoritmer og datastrukturer",
    "Course work covering algorithmic thinking, data structures, complexity, recursion, sorting, searching, and implementation-focused problem solving.": "Kursarbeid som dekker algoritmisk tenkning, datastrukturer, kompleksitet, rekursjon, sortering, søk og implementasjonsrettet problemløsning.",
    "Introduction to Digital Product Design": "Introduksjon til digital produktdesign",
    "Product design course work focused on user testing, prototyping, design documentation, and iterative development of a user-oriented digital concept.": "Kursarbeid i produktdesign med fokus på brukertesting, prototyping, designdokumentasjon og iterativ utvikling av et brukerorientert digitalt konsept.",
    "Calculus": "Kalkulus",
    "Mathematics course work covering functions, limits, differentiation, integration, and analytical problem solving for technical studies.": "Matematikkurs som dekker funksjoner, grenser, derivasjon, integrasjon og analytisk problemløsning for tekniske studier.",
    "Discrete Mathematics": "Diskret matematikk",
    "Mathematics course work covering logic, sets, relations, combinatorics, graphs, proofs, and discrete structures used in computer science.": "Matematikkurs som dekker logikk, mengder, relasjoner, kombinatorikk, grafer, bevis og diskrete strukturer brukt i informatikk.",
    "Workflow Automation & Process Optimization": "Arbeidsflytautomatisering og prosessoptimalisering",
    "Summer internship project focused on automating and optimizing business workflows, by implementing LLM oriented solutions to streamline processes, reduce manual effort, and enhance overall efficiency. The project involved analyzing existing workflows, identifying bottlenecks, and designing automated solutions that leverage LLM capabilities to improve productivity and decision-making.": "Sommerpraksis med fokus på automatisering og optimalisering av arbeidsprosesser ved hjelp av LLM-baserte løsninger. Prosjektet omfattet analyse av eksisterende arbeidsflyt, identifisering av flaskehalser og utforming av automatiserte løsninger for bedre produktivitet og beslutningsstøtte.",
    "(Bachelor's Thesis) Data Extractor & Context Parser for Product Orders": "(Bacheloroppgave) Datauttrekk og kontekstanalyse for produktordrer",
    "A deterministic data extractor that parses unstructured product order descriptions into structured class objects using a combination of regex and personalized filtering rules. The system is designed to handle a wide variety of input formats and extract key information per the clients specifications. The project also includes a context parser that identifies and extracts relevant contextual information from the input data, such as product categories, quantities, and special instructions. The system is built in a .Net environment and is designed to be easily integrated into existing order processing workflows.": "Et deterministisk datauttrekk som tolker ustrukturerte produktordrer til strukturerte klasseobjekter ved hjelp av regulære uttrykk og tilpassede filtreringsregler. Systemet håndterer ulike inndataformater og trekker ut informasjon etter kundens spesifikasjoner. Prosjektet omfatter også kontekstanalyse av blant annet produktkategorier, antall og spesielle instrukser, og er utviklet i .NET for enkel integrasjon i eksisterende ordreprosesser.",
    "(Course Project) Object Detection": "(Kursprosjekt) Objektgjenkjenning",
    "Image analytics course project exploring object detection through computer vision and machine learning. The project focuses on preparing image data, applying detection techniques, training and evaluating models, and analyzing detection performance on a selected dataset.": "Kursprosjekt i bildeanalyse som utforsker objektgjenkjenning med datasyn og maskinlæring. Prosjektet omfatter klargjøring av bildedata, bruk av deteksjonsmetoder, trening og evaluering av modeller samt analyse av ytelse på et valgt datasett.",
    "Machine Learning Work": "Arbeid med maskinlæring",
    "Practical experimentation with machine learning concepts, model training, and data-oriented workflows.": "Praktiske eksperimenter med maskinlæringskonsepter, modelltrening og dataorienterte arbeidsflyter.",
    "Image Analysis & Computer Vision": "Bildeanalyse og datasyn",
    "Research and development work in image processing, computer vision algorithms, and practical applications.": "Forsknings- og utviklingsarbeid innen bildebehandling, datasynsalgoritmer og praktiske anvendelser.",
    "System Development Projects": "Systemutviklingsprosjekter",
    "Development work involving backend logic, databases, structured models, and technical implementations.": "Utviklingsarbeid med backendlogikk, databaser, strukturerte modeller og tekniske implementasjoner.",
    "Web Design & Development": "Webdesign og -utvikling",
    "Grade:": "Karakter:",
    "No ongoing projects listed yet.": "Ingen pågående prosjekter er publisert ennå.",
    "No completed projects listed yet.": "Ingen fullførte prosjekter er publisert ennå.",
    "No items listed yet.": "Ingen elementer er publisert ennå.",
    "Could not load project cards.": "Kunne ikke laste prosjektkort.",
    "Untitled": "Uten tittel",
    "View Project": "Vis prosjekt",
    "View Documents": "Vis dokumenter",
    "★ Featured": "★ Fremhevet",
    "Completed": "Fullført",
    "Ongoing": "Pågående",
    "Show Refrence": "Vis referanse",
    "Open preview →": "Åpne visning →",
    "No documents have been added yet.": "Ingen dokumenter er lagt til ennå.",
    "Enter your name using letters and spaces only.": "Skriv inn navnet ditt med bare bokstaver og mellomrom.",
    "Enter a valid email address.": "Skriv inn en gyldig e-postadresse.",
    "Enter a topic.": "Skriv inn et emne.",
    "Enter a message.": "Skriv inn en melding.",
    "The message must contain at least 20 characters.": "Meldingen må inneholde minst 20 tegn."
  };

  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();
  let currentLanguage = getInitialLanguage();
  let observer;
  let transitionInProgress = false;

  function getInitialLanguage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (supportedLanguages.has(stored)) return stored;
    } catch (_) {
      // Storage may be unavailable in privacy modes; English is a safe default.
    }
    return "en";
  }

  function translateTextNode(node) {
    if (!originalText.has(node)) originalText.set(node, node.nodeValue);
    const source = originalText.get(node);
    const trimmed = source.trim();
    if (!trimmed) return;
    const lookupKey = trimmed.replace(/\s+/g, " ");
    const translated = currentLanguage === "nb" ? norwegian[lookupKey] : null;
    node.nodeValue = translated
      ? `${source.match(/^\s*/)[0]}${translated}${source.match(/\s*$/)[0]}`
      : source;
  }

  function translateAttributes(element) {
    const attributes = ["aria-label", "title", "placeholder"];
    if (!originalAttributes.has(element)) originalAttributes.set(element, {});
    const source = originalAttributes.get(element);

    attributes.forEach(name => {
      if (!element.hasAttribute(name) && !(name in source)) return;
      if (!(name in source)) source[name] = element.getAttribute(name);
      const value = source[name];
      if (value === null) return;
      element.setAttribute(name, currentLanguage === "nb" && norwegian[value] ? norwegian[value] : value);
    });
  }

  function translateTree(root = document.body) {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE) translateTextNode(root);
    if (root.nodeType === Node.ELEMENT_NODE) translateAttributes(root);

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeType === Node.TEXT_NODE) translateTextNode(node);
      else translateAttributes(node);
    }
  }

  function updateControls() {
    document.documentElement.lang = currentLanguage;
    document.querySelectorAll("[data-language]").forEach(control => {
      control.checked = control.dataset.language === currentLanguage;
    });
  }

  function setLanguage(language) {
    if (!supportedLanguages.has(language)) return;
    currentLanguage = language;
    try { localStorage.setItem(STORAGE_KEY, language); } catch (_) {}
    if (observer) observer.disconnect();
    translateTree();
    updateControls();
    observer?.observe(document.body, { childList: true, subtree: true });
    document.dispatchEvent(new CustomEvent("portfolio:language-changed", { detail: { language } }));
  }

  async function transitionToLanguage(language) {
    if (!supportedLanguages.has(language) || language === currentLanguage || transitionInProgress) {
      updateControls();
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setLanguage(language);
      return;
    }

    transitionInProgress = true;
    document.body.classList.add("language-transitioning");
    await new Promise(resolve => window.setTimeout(resolve, 170));
    setLanguage(language);
    await new Promise(resolve => window.requestAnimationFrame(() => window.requestAnimationFrame(resolve)));
    document.body.classList.remove("language-transitioning");
    window.setTimeout(() => { transitionInProgress = false; }, 170);
  }

  function initialize() {
    document.querySelectorAll("[data-language]").forEach(control => {
      control.addEventListener("change", () => {
        if (control.checked) transitionToLanguage(control.dataset.language);
      });
    });

    observer = new MutationObserver(mutations => {
      observer.disconnect();
      mutations.forEach(mutation => mutation.addedNodes.forEach(translateTree));
      observer.observe(document.body, { childList: true, subtree: true });
    });

    setLanguage(currentLanguage);
  }

  window.portfolioI18n = {
    getLanguage: () => currentLanguage,
    setLanguage,
    translate: value => currentLanguage === "nb" ? (norwegian[value] || value) : value
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
