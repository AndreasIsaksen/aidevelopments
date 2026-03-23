/**
 * main.js – Portfolio site interactivity
 */

// ── Navigation ──────────────────────────────────────────────────────────────

const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');

navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked (mobile)
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// Highlight active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
  const scrollY = window.scrollY;
  sections.forEach(section => {
    const top    = section.offsetTop - 100;
    const bottom = top + section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = navLinks?.querySelector(`a[href="#${id}"]`);

    if (scrollY >= top && scrollY < bottom) {
      link?.classList.add('active');
    } else {
      link?.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();

// ── Projects ─────────────────────────────────────────────────────────────────

async function loadProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  try {
    const response = await fetch('data/projects.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const projects = await response.json();
    grid.innerHTML = projects.map(project => buildProjectCard(project)).join('');
  } catch (err) {
    grid.innerHTML = `<p class="error-msg">Could not load projects. Please try again later.</p>`;
    console.error('Failed to load projects:', err);
  }
}

function buildProjectCard(project) {
  const tagsHtml = project.tags
    .map(tag => `<span class="project-tag">${escapeHtml(tag)}</span>`)
    .join('');

  const featuredBadge = project.featured
    ? `<span class="project-featured-badge">★ Featured</span>`
    : '';

  return `
    <article class="project-card${project.featured ? ' featured' : ''}">
      <div class="project-card-header">
        <h3 class="project-card-title">${escapeHtml(project.title)}</h3>
        ${featuredBadge}
      </div>
      <p class="project-card-description">${escapeHtml(project.description)}</p>
      <div class="project-tags">${tagsHtml}</div>
      <a class="project-card-link" href="${escapeHtml(project.link)}" target="_blank" rel="noopener noreferrer">
        View Project →
      </a>
    </article>
  `;
}

// ── Contact form ─────────────────────────────────────────────────────────────

const contactForm = document.getElementById('contact-form');
const formStatus  = document.getElementById('form-status');

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();

  // Placeholder: wire up a real backend (e.g. Formspree, EmailJS) before going live.
  formStatus.textContent = 'Form submission is not yet configured. Please email directly at hello@aidevelopments.dev.';
  formStatus.className   = 'form-status success';
  contactForm.reset();

  setTimeout(() => {
    formStatus.textContent = '';
    formStatus.className   = 'form-status';
  }, 6000);
});

// ── Utilities ────────────────────────────────────────────────────────────────

function escapeHtml(str) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(str).replace(/[&<>"']/g, ch => map[ch]);
}

// ── Init ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  loadProjects();
});
