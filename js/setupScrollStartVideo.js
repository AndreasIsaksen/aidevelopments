function setupScrollStartVideo() {
	const videoSection = document.querySelector(".video-section");
	const video = document.querySelector(".project-video");

	if (!videoSection || !video) return;

	let hasStarted = false;

	video.pause();

	const startVideoFromBeginning = () => {
		video.currentTime = 0;

		video.play().catch(error => {
			console.warn("Video playback was blocked by the browser:", error);
		});
	};

	const observer = new IntersectionObserver(entries => {
		const entry = entries[0];

		if (entry.isIntersecting && !hasStarted) {
			hasStarted = true;
			startVideoFromBeginning();
			observer.unobserve(videoSection);
		}
	}, {
		threshold: 0.35
	});

	observer.observe(videoSection);
}

document.addEventListener("DOMContentLoaded", setupScrollStartVideo);