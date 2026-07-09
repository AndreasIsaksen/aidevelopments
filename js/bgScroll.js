function updateScrollBackground() {
	const root = document.documentElement;

	const scrollTop = window.scrollY;
	const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

	if (scrollHeight <= 0) {
		root.style.setProperty("--scroll-bg-opacity", "0.05");
		return;
	}

	const scrollProgress = scrollTop / scrollHeight;

	const minOpacity = 0.05;
	const maxOpacity = 0.80;

	const opacity = minOpacity + scrollProgress * (maxOpacity - minOpacity);

	root.style.setProperty("--scroll-bg-opacity", opacity.toFixed(3));
}

window.addEventListener("scroll", updateScrollBackground);
window.addEventListener("resize", updateScrollBackground);
document.addEventListener("DOMContentLoaded", updateScrollBackground);