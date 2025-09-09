// Scroll Animation: Reveal elements when they enter viewport
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".anim-scroll");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
});
