const webpageProjects = {
	Web_Development: [
		{
			title: "Web Development Final Project",
			description: "This is the final project for the Web Development course. It is a complete website built as part of the final exam project, showcasing various web development skills and techniques learned throughout the course.",
			page: "../assets/data/Web_Development/eksamen/index.html",
			thumbnail: "../assets/thumbnails/Web_Development/3.png"
		}
	]
};

function createWebpageCard(webpageItem) {
	const card = document.createElement("article");
	card.className = "webpage-card";

	const preview = document.createElement("img");
	preview.src = webpageItem.thumbnail;
	preview.alt = `${webpageItem.title} preview`;
	preview.className = "webpage-thumbnail";

	const content = document.createElement("div");
	content.className = "webpage-card-content";

	const title = document.createElement("h3");
	title.textContent = webpageItem.title;

	const description = document.createElement("p");
	description.textContent = webpageItem.description;

	const openLabel = document.createElement("span");
	openLabel.className = "webpage-open-label";
	openLabel.textContent = "Open webpage →";

	content.appendChild(title);

	if (webpageItem.description) {
		content.appendChild(description);
	}

	content.appendChild(openLabel);

	card.appendChild(preview);
	card.appendChild(content);

	card.addEventListener("click", () => {
		openWebpageViewer(webpageItem);
	});

	return card;
}

function openWebpageViewer(webpageItem) {
	const viewerSection = document.getElementById("webpage-viewer-section");
	const viewer = document.getElementById("webpage-viewer");
	const viewerTitle = document.getElementById("webpage-viewer-title");
	const viewerDescription = document.getElementById("webpage-viewer-description");

	viewer.src = webpageItem.page;
	viewerTitle.textContent = webpageItem.title;

	if (viewerDescription) {
		viewerDescription.textContent = webpageItem.description || "";
	}

	viewerSection.classList.remove("hidden");
	viewerSection.scrollIntoView({ behavior: "smooth" });
}

function closeWebpageViewer() {
	const viewerSection = document.getElementById("webpage-viewer-section");
	const viewer = document.getElementById("webpage-viewer");

	viewer.src = "";
	viewerSection.classList.add("hidden");
}

function renderWebpageGrid() {
	const grid = document.getElementById("webpage-grid");

	if (!grid) {
		return;
	}

	const courseKey = grid.dataset.course;
	const webpages = webpageProjects[courseKey] || [];

	if (webpages.length === 0) {
		grid.innerHTML = "<p>No webpage projects have been added yet.</p>";
		return;
	}

	webpages.forEach(webpageItem => {
		grid.appendChild(createWebpageCard(webpageItem));
	});
}

document.addEventListener("DOMContentLoaded", () => {
	renderWebpageGrid();

	const closeButton = document.getElementById("close-webpage-viewer");

	if (closeButton) {
		closeButton.addEventListener("click", closeWebpageViewer);
	}
});