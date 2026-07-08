/**
 * front.js – Generic card rendering from JSON files.
 *
 * Data files are loaded from: data/<dataName>.json
 * Example: renderCardsFromJson("about", "about-grid") loads data/about.json
 */

const cardSections = [
	{ dataName: "about", containerId: "about-grid" },
	{ dataName: "skills", containerId: "skills-grid" },
	{ dataName: "projects", containerId: "projects-grid" },
	{ dataName: "docs", containerId: "docs-grid" }
];

function createTag(tagText) {
	const tag = document.createElement("span");
	tag.className = "tag";
	tag.textContent = tagText;
	return tag;
}

function createCard(item) {
	const card = document.createElement("article");
	card.className = "card";

	const title = document.createElement("h3");
	title.textContent = item.title;
	card.appendChild(title);

	if (item.grade) {
		const grade = document.createElement("p");
		grade.textContent = `Grade: ${item.grade}`;
		grade.className = "card-grade";
		card.appendChild(grade);
	}

	if (item.link) {
		const link = document.createElement("a");
		link.href = item.link;
		link.textContent = item.linkText || "View Documents →";
		link.className = "card-link";
		card.appendChild(link);
	}

	if (item.description) {
		const description = document.createElement("p");
		description.textContent = item.description;
		card.appendChild(description);
	}

	if (item.description2) {
		const description2 = document.createElement("p");
		description2.textContent = item.description2;
		card.appendChild(description2);
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

async function loadJsonData(dataName) {
	const response = await fetch(`data/${dataName}.json`);

	if (!response.ok) {
		throw new Error(`Could not load data/${dataName}.json. HTTP ${response.status}`);
	}

	const items = await response.json();

	if (!Array.isArray(items)) {
		throw new Error(`data/${dataName}.json must contain a JSON array.`);
	}

	return items;
}

async function renderCardsFromJson(dataName, containerId) {
	const container = document.getElementById(containerId);

	if (!container) {
		console.warn(`Container #${containerId} was not found.`);
		return;
	}

	try {
		const items = await loadJsonData(dataName);
		container.innerHTML = "";

		items.forEach(item => {
			container.appendChild(createCard(item));
		});
	} catch (error) {
		console.error(`Failed to render cards for ${dataName}:`, error);
		container.innerHTML = `<p class="error-msg">Could not load ${dataName} cards.</p>`;
	}
}

function renderAllCardSections() {
	cardSections.forEach(section => {
		renderCardsFromJson(section.dataName, section.containerId);
	});
}

document.addEventListener("DOMContentLoaded", renderAllCardSections);
