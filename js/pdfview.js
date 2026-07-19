function getPdfDocuments() {
	return window.pdfDocuments || {};
}

function getPdfPath(documentItem) {
	return documentItem.pdf || documentItem.pdfPath || documentItem.file || "";
}

function getPdfThumbnail(documentItem) {
	return documentItem.thumbnail || documentItem.thumbnailPath || "";
}

let activeReferenceCard = null;
let activeReferenceTrigger = null;
let referenceViewerClosing = false;

function isReferenceOverlay(viewerSection) {
	return viewerSection?.classList.contains("reference-preview-overlay");
}

function cancelReferenceAnimations(viewerSection, dialog) {
	[viewerSection, dialog].forEach(element => {
		element?.getAnimations?.().forEach(animation => animation.cancel());
	});
}

function getExpansionTransform(dialog, originCard) {
	if (!dialog || !originCard?.isConnected) return "scale(0.92)";

	const dialogBounds = dialog.getBoundingClientRect();
	const originBounds = originCard.getBoundingClientRect();
	const translateX = (originBounds.left + (originBounds.width / 2))
		- (dialogBounds.left + (dialogBounds.width / 2));
	const translateY = (originBounds.top + (originBounds.height / 2))
		- (dialogBounds.top + (dialogBounds.height / 2));
	const scaleX = Math.max(0.08, originBounds.width / dialogBounds.width);
	const scaleY = Math.max(0.08, originBounds.height / dialogBounds.height);

	return `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;
}

function openReferenceOverlay(viewerSection, originCard, trigger) {
	const dialog = document.getElementById("reference-preview-dialog");
	const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	cancelReferenceAnimations(viewerSection, dialog);
	activeReferenceCard = originCard;
	activeReferenceTrigger = trigger;
	referenceViewerClosing = false;
	document.body.classList.add("reference-preview-open");
	viewerSection.classList.remove("hidden");
	viewerSection.setAttribute("aria-hidden", "false");

	window.requestAnimationFrame(() => {
		if (!dialog) return;

		dialog.focus({ preventScroll: true });

		if (prefersReducedMotion || typeof dialog.animate !== "function") return;

		viewerSection.animate(
			[{ opacity: 0 }, { opacity: 1 }],
			{ duration: 260, easing: "ease-out" }
		);
		dialog.animate(
			[
				{ transform: getExpansionTransform(dialog, originCard), opacity: 0.55 },
				{ transform: "translate(0, 0) scale(1, 1)", opacity: 1 }
			],
			{ duration: 360, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" }
		);
	});
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
			openPdfViewer(documentItem, card, referenceButton);
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

function openPdfViewer(documentItem, originCard = null, trigger = null) {
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

	if (isReferenceOverlay(viewerSection)) {
		openReferenceOverlay(viewerSection, originCard, trigger);
	} else {
		viewerSection.scrollIntoView({ behavior: "smooth", block: "start" });
	}
}

async function closeReferenceOverlay(viewerSection, viewer) {
	if (referenceViewerClosing || viewerSection.classList.contains("hidden")) return;

	referenceViewerClosing = true;
	const dialog = document.getElementById("reference-preview-dialog");
	const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	if (!prefersReducedMotion && dialog && typeof dialog.animate === "function") {
		cancelReferenceAnimations(viewerSection, dialog);

		const overlayAnimation = viewerSection.animate(
			[{ opacity: 1 }, { opacity: 0 }],
			{ duration: 280, easing: "ease-in" }
		);
		const dialogAnimation = dialog.animate(
			[
				{ transform: "translate(0, 0) scale(1, 1)", opacity: 1 },
				{ transform: getExpansionTransform(dialog, activeReferenceCard), opacity: 0.4 }
			],
			{ duration: 280, easing: "cubic-bezier(0.4, 0, 1, 1)" }
		);

		await Promise.all([
			overlayAnimation.finished.catch(() => undefined),
			dialogAnimation.finished.catch(() => undefined)
		]);
	}

	viewer.removeAttribute("src");
	viewerSection.classList.add("hidden");
	cancelReferenceAnimations(viewerSection, dialog);
	viewerSection.setAttribute("aria-hidden", "true");
	document.body.classList.remove("reference-preview-open");
	activeReferenceTrigger?.focus({ preventScroll: true });
	activeReferenceCard = null;
	activeReferenceTrigger = null;
	referenceViewerClosing = false;
}

function closePdfViewer() {
	const viewerSection = document.getElementById("pdf-viewer-section");
	const viewer = document.getElementById("pdf-viewer");

	if (!viewerSection || !viewer) return;

	if (isReferenceOverlay(viewerSection)) {
		closeReferenceOverlay(viewerSection, viewer);
		return;
	}

	viewer.removeAttribute("src");
	viewerSection.classList.add("hidden");
}

function handleReferenceOverlayKeydown(event) {
	const viewerSection = document.getElementById("pdf-viewer-section");
	if (!isReferenceOverlay(viewerSection) || viewerSection.classList.contains("hidden")) return;

	if (event.key === "Escape") {
		event.preventDefault();
		closePdfViewer();
		return;
	}

	if (event.key !== "Tab") return;

	const dialog = document.getElementById("reference-preview-dialog");
	const focusableElements = dialog
		? Array.from(dialog.querySelectorAll("button:not([disabled]), iframe, [href], [tabindex]:not([tabindex='-1'])"))
		: [];

	if (focusableElements.length === 0) {
		event.preventDefault();
		dialog?.focus();
		return;
	}

	const firstElement = focusableElements[0];
	const lastElement = focusableElements[focusableElements.length - 1];

	if (event.shiftKey && document.activeElement === firstElement) {
		event.preventDefault();
		lastElement.focus();
	} else if (!event.shiftKey && document.activeElement === lastElement) {
		event.preventDefault();
		firstElement.focus();
	}
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

	const viewerSection = document.getElementById("pdf-viewer-section");
	if (isReferenceOverlay(viewerSection)) {
		viewerSection.addEventListener("click", event => {
			if (event.target === viewerSection) closePdfViewer();
		});
		document.addEventListener("keydown", handleReferenceOverlayKeydown);
	}
}

document.addEventListener("DOMContentLoaded", initPdfViewer);
