/**
 * main.js – Portfolio site interactivity
 *
 * Keep this file focused on page behavior.
 * Card loading and rendering belongs in cards.js.
 */

// ── Navigation ──────────────────────────────────────────────────────────────

const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links") || document.querySelector(".nav");

navToggle?.addEventListener("click", () => {
  navLinks?.classList.toggle("open");
});

// Close menu when a link is clicked (mobile)
navLinks?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

// Highlight active nav link on scroll
const sections = document.querySelectorAll("section[id]");

function updateActiveLink() {
  const scrollY = window.scrollY;

  sections.forEach(section => {
    const top = section.offsetTop - 100;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute("id");
    const link = navLinks?.querySelector(`a[href="#${id}"]`);

    if (scrollY >= top && scrollY < bottom) {
      link?.classList.add("active");
    } else {
      link?.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", updateActiveLink, { passive: true });
updateActiveLink();

// ── Contact form ─────────────────────────────────────────────────────────────

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm?.addEventListener("submit", event => {
  event.preventDefault();

  // Placeholder: wire up a real backend before going live.
  formStatus.textContent = "Form submission is not yet configured. Please email directly at hello@aidevelopments.dev.";
  formStatus.className = "form-status success";
  contactForm.reset();

  setTimeout(() => {
    formStatus.textContent = "";
    formStatus.className = "form-status";
  }, 6000);
});
