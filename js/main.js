/**
 * main.js – Portfolio site interactivity
 *
 * Keep this file focused on page behavior.
 * Card loading and rendering belongs in cards.js.
 */

// ── Navigation ──────────────────────────────────────────────────────────────

const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links") || document.querySelector(".nav");

function getNavigationToggleLabel(open) {
  const label = open ? "Close navigation menu" : "Open navigation menu";
  return window.portfolioI18n?.translate(label) || label;
}

navToggle?.addEventListener("click", () => {
  const open = navLinks?.classList.toggle("open") ?? false;
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", getNavigationToggleLabel(open));
  siteHeader?.classList.toggle("menu-open", open);
});

// Close menu when a link is clicked (mobile)
navLinks?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", getNavigationToggleLabel(false));
    siteHeader?.classList.remove("menu-open");
  });
});

document.addEventListener("keydown", event => {
  if (window.portfolioModal?.getActive()) return;
  if (event.key !== "Escape" || !navLinks?.classList.contains("open")) return;
  navLinks.classList.remove("open");
  siteHeader?.classList.remove("menu-open");
  navToggle?.setAttribute("aria-expanded", "false");
  navToggle?.setAttribute("aria-label", getNavigationToggleLabel(false));
  navToggle?.focus();
});

document.addEventListener("portfolio:language-changed", () => {
  navToggle?.setAttribute(
    "aria-label",
    getNavigationToggleLabel(navLinks?.classList.contains("open") ?? false)
  );
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

// The index renders several sections asynchronously. When arriving from a
// sub-page with a hash, align the requested section again after that content
// has settled so its final position matches same-page navigation.
function getHashTarget() {
  if (!window.location.hash) return null;

  try {
    return document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
  } catch (error) {
    console.warn("Could not decode navigation target:", error);
    return null;
  }
}

function alignHashTarget() {
  const target = getHashTarget();
  target?.scrollIntoView({ behavior: "instant", block: "start" });
}

function scheduleHashTargetAlignment() {
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(alignHashTarget);
  });
}

document.addEventListener("DOMContentLoaded", scheduleHashTargetAlignment);
document.addEventListener("portfolio:content-rendered", scheduleHashTargetAlignment);
window.addEventListener("load", scheduleHashTargetAlignment);
window.addEventListener("hashchange", scheduleHashTargetAlignment);

// Hide the header while scrolling down on small screens and reveal it on the
// first meaningful upward movement. Desktop layouts always keep it visible.
const siteHeader = document.querySelector(".site-header");
const mobileHeaderQuery = window.matchMedia("(max-width: 768px)");
const headerScrollThreshold = 8;
let previousHeaderScrollY = Math.max(window.scrollY, 0);
let headerScrollFramePending = false;

function setHeaderHidden(hidden) {
  siteHeader?.classList.toggle("header-hidden", hidden && mobileHeaderQuery.matches);
}

function updateHeaderVisibility() {
  headerScrollFramePending = false;

  if (!siteHeader) return;

  const currentScrollY = Math.max(window.scrollY, 0);

  if (siteHeader.classList.contains("menu-open")) {
    setHeaderHidden(false);
    previousHeaderScrollY = currentScrollY;
    return;
  }

  if (!mobileHeaderQuery.matches || currentScrollY <= siteHeader.offsetHeight) {
    setHeaderHidden(false);
    previousHeaderScrollY = currentScrollY;
    return;
  }

  const scrollDelta = currentScrollY - previousHeaderScrollY;

  if (Math.abs(scrollDelta) < headerScrollThreshold) return;

  setHeaderHidden(scrollDelta > 0);
  previousHeaderScrollY = currentScrollY;
}

function requestHeaderVisibilityUpdate() {
  if (headerScrollFramePending) return;

  headerScrollFramePending = true;
  window.requestAnimationFrame(updateHeaderVisibility);
}

function resetHeaderVisibility() {
  previousHeaderScrollY = Math.max(window.scrollY, 0);
  setHeaderHidden(false);
}

window.addEventListener("scroll", requestHeaderVisibilityUpdate, { passive: true });
if (typeof mobileHeaderQuery.addEventListener === "function") {
  mobileHeaderQuery.addEventListener("change", resetHeaderVisibility);
} else {
  mobileHeaderQuery.addListener(resetHeaderVisibility);
}
siteHeader?.addEventListener("focusin", () => setHeaderHidden(false));
resetHeaderVisibility();

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
