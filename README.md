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

### Optional card image carousel

Cards rendered from the JSON files in `data/` can include an image carousel. Add a
`carousel` object only to the cards that should display one:

```json
{
  "title": "What's my drive?",
  "description": "Card text goes here.",
  "carousel": {
    "enabled": true,
    "duration": 20,
    "curveSegments": 12,
    "images": [
      {
        "src": "assets/img/about/family.jpg",
        "alt": "A descriptive alternative text",
        "caption": "An optional caption"
      },
      {
        "src": "assets/img/about/hobby.jpg",
        "alt": "A second descriptive alternative text"
      }
    ]
  }
}
```

Each rectangular image is divided into narrow vertical segments and wrapped
around a 3D cylinder, which rotates automatically in a continuous loop.
`curveSegments` controls the smoothness of the bend from 8 to 24 and defaults to
12. `duration` is the number of seconds per complete revolution and must be at
least `4`; it defaults to five seconds per image with a minimum cycle of 20
seconds. `enabled` defaults to `true` and can be set to `false` to temporarily
hide a configured carousel. `caption` is optional. Cards without a `carousel`
object are rendered exactly as before.
