const showOnPx = 100;
const backToTopButton = document.querySelector(".back-to-top");
const pageProgressBar = document.querySelector(".progress-bar");

const scrollContainer = () => {
  return document.documentElement || document.body;
};

const goToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

document.addEventListener("scroll", () => {
  const container = scrollContainer();

  const maxScroll = container.scrollHeight - container.clientHeight;
  const scrolledPercentage = maxScroll > 0
    ? (container.scrollTop / maxScroll) * 100
    : 0;

  if (pageProgressBar) {
    pageProgressBar.style.width = `${scrolledPercentage}%`;
  }

  if (backToTopButton) {
    if (container.scrollTop > showOnPx) {
      backToTopButton.classList.remove("hidden");
    } else {
      backToTopButton.classList.add("hidden");
    }
  }
});

if (backToTopButton) {
  backToTopButton.addEventListener("click", goToTop);
}