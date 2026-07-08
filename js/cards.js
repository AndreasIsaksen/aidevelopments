/**
 * cards.js – Loads JSON data and renders portfolio cards.
 *
 * General cards are loaded from data/<dataName>.json.
 * Project cards are loaded once from data/projects.json and split by status.
 */

(() => {
  const cardSections = [
    { dataName: "about", containerId: "about-grid" },
    { dataName: "skills", containerId: "skills-grid" },
    { dataName: "docs", containerId: "docs-grid" }
  ];

  const projectSections = [
    {
      status: "ongoing",
      containerId: "projects-grid",
      emptyMessage: "No ongoing projects listed yet."
    },
    {
      status: "completed",
      containerId: "projects-grid-completed",
      emptyMessage: "No completed projects listed yet."
    }
  ];

  document.addEventListener("DOMContentLoaded", () => {
    loadCards().catch(error => {
      console.error("Failed to load cards:", error);
    });
  });

  async function loadCards() {
    await Promise.all([
      loadGeneralCardSections(),
      loadProjectCards()
    ]);
  }

  async function loadGeneralCardSections() {
    await Promise.all(
      cardSections.map(section => renderCardsFromJson(section.dataName, section.containerId))
    );
  }

  async function loadProjectCards() {
    const grids = projectSections
      .map(section => document.getElementById(section.containerId))
      .filter(Boolean);

    if (grids.length === 0) return;

    try {
      const projects = await loadJsonData("projects");
      const visibleProjects = projects.filter(project => !isHidden(project));

      projectSections.forEach(section => {
        const filteredProjects = visibleProjects.filter(project =>
          normalizeProjectStatus(project.status) === section.status
        );

        renderCards(filteredProjects, section.containerId, section.emptyMessage);
      });
    } catch (error) {
      console.error("Failed to render project cards:", error);

      projectSections.forEach(section => {
        const container = document.getElementById(section.containerId);
        if (container) {
          container.innerHTML = `<p class="error-msg">Could not load project cards.</p>`;
        }
      });
    }
  }

  async function renderCardsFromJson(dataName, containerId) {
    const container = document.getElementById(containerId);

    if (!container) {
      console.warn(`Container #${containerId} was not found.`);
      return;
    }

    try {
      const items = await loadJsonData(dataName);
      renderCards(items, containerId);
    } catch (error) {
      console.error(`Failed to render cards for ${dataName}:`, error);
      container.innerHTML = `<p class="error-msg">Could not load ${dataName} cards.</p>`;
    }
  }

  async function loadJsonData(dataName) {
    const path = `data/${dataName}.json`;
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`Could not load ${path}. HTTP ${response.status}`);
    }

    const items = await response.json();

    if (!Array.isArray(items)) {
      throw new Error(`${path} must contain a JSON array.`);
    }

    return items;
  }

  function renderCards(items, containerId, emptyMessage = "No items listed yet.") {
    const container = document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = "";

    if (!items || items.length === 0) {
      const empty = document.createElement("p");
      empty.className = "empty-msg";
      empty.textContent = emptyMessage;
      container.appendChild(empty);
      return;
    }

    items.forEach(item => {
      container.appendChild(createCard(item));
    });
  }

  function createCard(item) {
    const card = document.createElement("article");
    card.className = isFeatured(item) ? "card featured" : "card";

    const header = document.createElement("div");
    header.className = "project-card-header";

    const title = document.createElement("h3");
    title.className = "project-card-title";
    title.textContent = item.title || "Untitled";
    header.appendChild(title);

    const badges = createBadges(item);
    if (badges) {
      header.appendChild(badges);
    }

    card.appendChild(header);

    if (item.grade) {
      const grade = document.createElement("p");
      grade.className = "card-grade";
      grade.textContent = `Grade: ${item.grade}`;
      card.appendChild(grade);
    }

    appendParagraph(card, item.description);
    appendParagraph(card, item.description2);

    if (item.link) {
      const link = document.createElement("a");
      link.href = item.link;
      link.textContent = item.linkText || getDefaultLinkText(item);
      link.className = "card-link";
      card.appendChild(link);
    }

    if (Array.isArray(item.tags) && item.tags.length > 0) {
      const tagsWrapper = document.createElement("div");
      tagsWrapper.className = "tags";

      item.tags.forEach(tagText => {
        tagsWrapper.appendChild(createTag(tagText));
      });

      card.appendChild(tagsWrapper);
    }

    return card;
  }

  function appendParagraph(card, text) {
    if (!text) return;

    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    card.appendChild(paragraph);
  }

  function createBadges(item) {
    const featured = isFeatured(item);
    const hasStatus = Boolean(item.status);

    if (!featured && !hasStatus) return null;

    const badges = document.createElement("div");
    badges.className = "project-card-badges";

    if (featured) {
      const featuredBadge = document.createElement("span");
      featuredBadge.className = "project-featured-badge";
      featuredBadge.textContent = "★ Featured";
      badges.appendChild(featuredBadge);
    }

    if (hasStatus) {
      const status = normalizeProjectStatus(item.status);
      const statusBadge = document.createElement("span");

      statusBadge.className = `project-status-badge ${status}`;
      statusBadge.textContent = status === "completed" ? "Completed" : "Ongoing";

      badges.appendChild(statusBadge);
    }

    return badges;
  }

  function createTag(tagText) {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = tagText;
    return tag;
  }

  function normalizeProjectStatus(status) {
    const normalized = String(status || "ongoing").trim().toLowerCase();

    if (["completed", "complete", "done", "finished"].includes(normalized)) {
      return "completed";
    }

    return "ongoing";
  }

  function isFeatured(item) {
    return item.featured === true || item.featured === 1 || item.featured === "1" || item.featured === "true";
  }

  function isHidden(item) {
    const normalized = String(item.hidden ?? 0).trim().toLowerCase();
    return normalized === "1" || normalized === "true" || normalized === "yes";
  }

  function getDefaultLinkText(item) {
    return item.status ? "View Project →" : "View Documents →";
  }
})();
