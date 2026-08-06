const webpageProjects = {
	Web_Development: [
		{
			title: "Web Development Final Project",
			description: "This is the final project for the Web Development course. It is a complete website built as part of the final exam project, showcasing various web development skills and techniques learned throughout the course.",
			page: "../assets/data/Web_Development/eksamen/index.html",
			thumbnail: "../assets/thumbnails/Web_Development/3.png"
		}
	],
	Practical_Machine_Learning: [
		{
			title: "Final Project",
			description: "A collumination of the final project for the Practical Machine Learning course, showcasing various machine learning techniques and analyses performed on different datasets.",
			page: "../assets/data/Practical_Machine_Learning/html/final.html",
			thumbnail: "../assets/thumbnails/Practical_Machine_Learning/final.png"
		},
		{
			title: "Course Assignment: Supervised Learning II",
			description: "Description and exploratory analysis of the 'Student Performance' dataset.",
			page: "../assets/data/Practical_Machine_Learning/html/1.html",
			thumbnail: "../assets/thumbnails/Practical_Machine_Learning/1_1.png"
		},
		{
			title: "Course Assignment: Supervised Learning II",
			description: "Student Performance Training Models.",
			page: "../assets/data/Practical_Machine_Learning/html/2.html",
			thumbnail: "../assets/thumbnails/Practical_Machine_Learning/1_2.png"
		},
		{
			title: "Course Assignment: Supervised Learning II",
			description: "Abalone Age Prediction Dataset Analysis.",
			page: "../assets/data/Practical_Machine_Learning/html/3.html",
			thumbnail: "../assets/thumbnails/Practical_Machine_Learning/3.png"
		},
		{
			title: "Course Assignment: Supervised Learning II",
			description: "Abalone Age Prediction Models.",
			page: "../assets/data/Practical_Machine_Learning/html/4.html",
			thumbnail: "../assets/thumbnails/Practical_Machine_Learning/4.png"
		},
		{
			title: "Course Assignment: Supervised Learning II",
			description: "Abalone Age Prediction Training and Tuning.",
			page: "../assets/data/Practical_Machine_Learning/html/4_1.html",
			thumbnail: "../assets/thumbnails/Practical_Machine_Learning/4_1.png"
		},{
			title: "Course Assignment: Clustering",
			description: "Clustering methods to group the data points based on their features.",
			page: "../assets/data/Practical_Machine_Learning/html/cluster.html",
			thumbnail: "../assets/thumbnails/Practical_Machine_Learning/cluster.png"
		},
	]
};

function createWebpageCard(webpageItem) {
	const card = document.createElement("article");
	card.className = "webpage-card";
	card.tabIndex = 0;
	card.setAttribute("role", "button");
	card.setAttribute("aria-label", `Open ${webpageItem.title}`);

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
		openWebpageViewer(webpageItem, card);
	});
	card.addEventListener("keydown", event => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			openWebpageViewer(webpageItem, card);
		}
	});

	return card;
}

function openWebpageViewer(webpageItem, trigger = document.activeElement) {
	const viewerSection = document.getElementById("webpage-viewer-section");
	const viewer = document.getElementById("webpage-viewer");
	const viewerTitle = document.getElementById("webpage-viewer-title");
	const viewerDescription = document.getElementById("webpage-viewer-description");

	viewer.src = webpageItem.page;
	viewerTitle.textContent = webpageItem.title;

	if (viewerDescription) {
		viewerDescription.textContent = webpageItem.description || "";
	}

	window.portfolioModal?.open(viewerSection, trigger);
}

function closeWebpageViewer() {
	const viewerSection = document.getElementById("webpage-viewer-section");
	const viewer = document.getElementById("webpage-viewer");

	viewer.src = "";
	window.portfolioModal?.close(viewerSection);
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
