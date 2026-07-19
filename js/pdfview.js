function getPdfDocuments() {
	return window.pdfDocuments || {};
}

function getPdfPath(documentItem) {
	return documentItem.pdf || documentItem.pdfPath || documentItem.file || "";
}

function getPdfThumbnail(documentItem) {
	return documentItem.thumbnail || documentItem.thumbnailPath || "";
}

function createPdfCard(documentItem, variant = "default") {
	const isReference = variant === "reference";
	const card = document.createElement("article");
	card.className = "pdf-card";

	if (isReference) {
		card.classList.add("reference-card");
	} else {
		card.tabIndex = 0;
		card.setAttribute("role", "button");
		card.setAttribute("aria-label", `Open ${documentItem.title}`);
	}

	const preview = document.createElement("img");
	preview.src = getPdfThumbnail(documentItem);
	preview.alt = documentItem.thumbnailAlt || `${documentItem.title} front page`;
	preview.className = "pdf-thumbnail";

	const content = document.createElement("div");
	content.className = "pdf-card-content";

	const title = document.createElement("h3");
	title.textContent = documentItem.title;

	const description = document.createElement("p");
	description.textContent = documentItem.description || "";

	content.appendChild(title);

	if (documentItem.description) {
		content.appendChild(description);
	}

	if (isReference) {
		const referenceButton = document.createElement("button");
		referenceButton.type = "button";
		referenceButton.className = "reference-preview-button";
		referenceButton.textContent = "Show Refrence";
		referenceButton.setAttribute("aria-label", `Show reference for ${documentItem.title}`);
		referenceButton.addEventListener("click", () => {
			openPdfViewer(documentItem);
		});
		content.appendChild(referenceButton);
	} else {
		const openLabel = document.createElement("span");
		openLabel.className = "card-link";
		openLabel.textContent = "Open preview →";
		content.appendChild(openLabel);
	}

	card.appendChild(preview);
	card.appendChild(content);

	if (!isReference) {
		card.addEventListener("click", () => {
			openPdfViewer(documentItem);
		});

		card.addEventListener("keydown", event => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				openPdfViewer(documentItem);
			}
		});
	}

	return card;
}

function openPdfViewer(documentItem) {
	const viewerSection = document.getElementById("pdf-viewer-section");
	const viewer = document.getElementById("pdf-viewer");
	const viewerTitle = document.getElementById("pdf-viewer-title");
	const pdfPath = getPdfPath(documentItem);

	if (!viewerSection || !viewer || !viewerTitle || !pdfPath) {
		return;
	}

	viewer.src = pdfPath;
	viewerTitle.textContent = documentItem.title;

	viewerSection.classList.remove("hidden");
	viewerSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function closePdfViewer() {
	const viewerSection = document.getElementById("pdf-viewer-section");
	const viewer = document.getElementById("pdf-viewer");

	if (viewer) {
		viewer.src = "";
	}

	viewerSection?.classList.add("hidden");
}

function renderPdfGrid(grid) {
	const courseKey = grid.dataset.course;
	const variant = grid.dataset.cardVariant || "default";
	const documents = getPdfDocuments()[courseKey] || [];

	grid.replaceChildren();

	if (documents.length === 0) {
		const emptyMessage = document.createElement("p");
		emptyMessage.className = "empty-msg";
		emptyMessage.textContent = "No documents have been added yet.";
		grid.appendChild(emptyMessage);
		return;
	}

	documents.forEach(documentItem => {
		grid.appendChild(createPdfCard(documentItem, variant));
	});
}

function initPdfViewer() {
	const grids = [
		document.getElementById("pdf-grid"),
		document.getElementById("reference-grid")
	].filter(Boolean);

	grids.forEach(renderPdfGrid);

	const closeButton = document.getElementById("close-pdf-viewer");

	if (closeButton) {
		closeButton.addEventListener("click", closePdfViewer);
	}
}

document.addEventListener("DOMContentLoaded", initPdfViewer);
