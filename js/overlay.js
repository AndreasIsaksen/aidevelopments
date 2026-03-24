function createOverlay() {
	
    const overlay = document.createElement("div");
	overlay.className = "overlay";

	const content = document.createElement("div");
	content.className = "overlay-content";
    
    var logo = document.createElement("img");
    logo.src = "assets/logo/AID.png";
    logo.alt = "AID Logo";
    logo.className = "img";

	const title = document.createElement("h2");
	title.textContent = "⚠️ Under Construction";

	const text = document.createElement("p");
	text.textContent = "This site is currently being developed. Some features may not work yet.";

	const button = document.createElement("button");
	button.textContent = "Enter site";

	button.addEventListener("click", () => {
		overlay.remove();
	});

    content.appendChild(logo);
	content.appendChild(title);
	content.appendChild(text);
	content.appendChild(button);
	overlay.appendChild(content);

	document.body.appendChild(overlay);
	
	button.addEventListener("click", () => {
			overlay.classList.add("fade-out");
			setTimeout(() => overlay.remove(), 300);
		});
}

// Run on load
createOverlay();