const imageDocuments = {
	Basic_Programming_Java: [
		{
			title: "Class Inheritance Diagram: Universe 1",
			description: "Simplified class inheritance diagram for the 3'rd assignment.",
			image: "../assets/data/Programming_2/3.png",
			thumbnail: "../assets/thumbnails/Programming_2/uml1.png"
		},
        {
			title: "Class Inheritance Diagram: Universe 2",
			description: "Simplified class inheritance diagram for the 4'th assignment.",
			image: "../assets/data/Programming_2/4.png",
			thumbnail: "../assets/thumbnails/Programming_2/uml2.png"
		},
	],
	Software_Engineering_and_Testing: [
		{
			title: "EER Diagram: Group Project Database Design",
			description: "EER diagram illustrating the database design for the group project in the Software Engineering and Testing course.",
			image: "../assets/data/Software_Engineering_and_Testing/1.png",
			thumbnail: "../assets/thumbnails/Software_Engineering_and_Testing/3.png"
		}
	]
};


function createImageCard(imageItem) {
	const card = document.createElement("article");
	card.className = "image-card";
	card.tabIndex = 0;
	card.setAttribute("role", "button");
	card.setAttribute("aria-label", `Open ${imageItem.title}`);

	const preview = document.createElement("img");
	preview.src = imageItem.thumbnail || imageItem.image;
	preview.alt = imageItem.title;
	preview.className = "image-thumbnail";

	const content = document.createElement("div");
	content.className = "image-card-content";

	const title = document.createElement("h3");
	title.textContent = imageItem.title;

	const description = document.createElement("p");
	description.textContent = imageItem.description;

	content.appendChild(title);

	if (imageItem.description) {
		content.appendChild(description);
	}

	card.appendChild(preview);
	card.appendChild(content);

	card.addEventListener("click", () => {
		openImageViewer(imageItem, card);
	});
	card.addEventListener("keydown", event => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			openImageViewer(imageItem, card);
		}
	});

	return card;
}

function openImageViewer(imageItem, trigger = document.activeElement) {
	const viewerSection = document.getElementById("image-viewer-section");
	const viewer = document.getElementById("image-viewer");
	const viewerTitle = document.getElementById("image-viewer-title");
	const viewerDescription = document.getElementById("image-viewer-description");

	viewer.src = imageItem.image;
	viewer.alt = imageItem.title;
	viewer.classList.remove("zoomed");

	viewerTitle.textContent = imageItem.title;

	if (viewerDescription) {
		viewerDescription.textContent = imageItem.description || "";
	}

	window.portfolioModal?.open(viewerSection, trigger);
}

function closeImageViewer() {
	const viewerSection = document.getElementById("image-viewer-section");
	const viewer = document.getElementById("image-viewer");

	viewer.src = "";
	viewer.alt = "";
	viewer.classList.remove("zoomed");

	window.portfolioModal?.close(viewerSection);
}

function renderImageGrid() {
	const grid = document.getElementById("image-grid");

	if (!grid) {
		return;
	}

	const courseKey = grid.dataset.course;
	const images = imageDocuments[courseKey] || [];

	if (images.length === 0) {
		grid.innerHTML = "<p>No images have been added yet.</p>";
		return;
	}

	images.forEach(imageItem => {
		grid.appendChild(createImageCard(imageItem));
	});
}

document.addEventListener("DOMContentLoaded", () => {
	renderImageGrid();

	const closeButton = document.getElementById("close-image-viewer");
    const imageViewer = document.getElementById("image-viewer");


	if (closeButton) {
		closeButton.addEventListener("click", closeImageViewer);
	}

    if (imageViewer) {
		imageViewer.addEventListener("click", () => {
			imageViewer.classList.toggle("zoomed");
		});
	}
});
