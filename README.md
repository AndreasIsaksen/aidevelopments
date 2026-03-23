# aidevelopments.dev

Personal portfolio site for [aidevelopments.dev](https://aidevelopments.dev).
A static HTML/CSS/JS site showcasing projects, achievements, published thesis papers, and references.

## Project structure

```
portfolio-site/
├── index.html          # Main page (hero, about, projects, achievements, publications, references, contact)
├── css/
│   └── style.css       # Dark-themed responsive stylesheet
├── js/
│   └── main.js         # Navigation, project card rendering, contact form
├── assets/
│   ├── images/         # Photos and banners
│   └── icons/          # SVG icons / favicons
└── data/
    └── projects.json   # Project metadata loaded at runtime
```

## Running locally

Open `portfolio-site/index.html` directly in a browser, **or** serve it with any static file server:

```bash
# Python 3
cd portfolio-site
python -m http.server 8080
# then visit http://localhost:8080
```

## Customisation

| What to update | Where |
|---|---|
| Personal bio & skills | `index.html` – `#about` section |
| Stats (projects, years) | `index.html` – `.about-stats` |
| Project cards | `data/projects.json` |
| Achievements | `index.html` – `#achievements` section |
| Publications | `index.html` – `#publications` section |
| References | `index.html` – `#references` section |
| Contact links / email | `index.html` – `#contact` section |
| Contact form backend | `js/main.js` – `contactForm` submit handler |
| Colour scheme / fonts | `css/style.css` – `:root` CSS variables |
