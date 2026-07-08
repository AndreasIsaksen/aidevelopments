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
  const ongoingGrid = document.getElementById('projects-grid');
  const completedGrid = document.getElementById('projects-grid-completed');

  if (!ongoingGrid && !completedGrid) return;

  try {
    const response = await fetch('data/projects.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const projects = await response.json();

    const ongoingProjects = projects.filter(project => normalizeProjectStatus(project.status) === 'ongoing');
    const completedProjects = projects.filter(project => normalizeProjectStatus(project.status) === 'completed');

    renderProjectCards(ongoingGrid, ongoingProjects, 'No ongoing projects listed yet.');
    renderProjectCards(completedGrid, completedProjects, 'No completed projects listed yet.');
  } catch (err) {
    const errorMessage = `<p class="error-msg">Could not load projects. Please try again later.</p>`;

    if (ongoingGrid) ongoingGrid.innerHTML = errorMessage;
    if (completedGrid) completedGrid.innerHTML = errorMessage;

    console.error('Failed to load projects:', err);
  }
}

function renderProjectCards(grid, projects, emptyMessage) {
  if (!grid) return;

  grid.innerHTML = projects.length
    ? projects.map(project => buildProjectCard(project)).join('')
    : `<p class="empty-msg">${emptyMessage}</p>`;
}

function normalizeProjectStatus(status) {
  const normalized = String(status || 'ongoing').trim().toLowerCase();
  return normalized === 'completed' ? 'completed' : 'ongoing';
}

function buildProjectCard(project) {
  let tagsHtml = "";

  for (let i = 0; i < project.tags.length; i++) {
    tagsHtml += `<span class="tag">${escapeHtml(project.tags[i])}</span>`;
  }

  const featuredBadge = project.featured
    ? `<span class="project-featured-badge">★ Featured</span>`
    : "";

  const status = normalizeProjectStatus(project.status);
  const statusLabel = status === 'completed' ? 'Completed' : 'Ongoing';

  return `
    <article class="card${project.featured ? " featured" : ""}">
      <div class="project-card-header">
        <h3 class="project-card-title">${escapeHtml(project.title)}</h3>
        <div class="project-card-badges">
          ${featuredBadge}
          <span class="project-status-badge ${status}">${escapeHtml(statusLabel)}</span>
        </div>
      </div>

      <p>${escapeHtml(project.description)}</p>

      <div class="tags">
        ${tagsHtml}
      </div>
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
