'use strict';
const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());
const progress = document.getElementById('scrollProgress');
const updateProgress = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.width = (max > 0 ? Math.min(100,window.scrollY / max * 100) : 0) + '%';
};
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reducedMotion && 'IntersectionObserver' in window) {
  const targets = document.querySelectorAll('.section-head, .about-grid, .skill-card, .project-card, .focus-list > div, .process-grid article, .contact');
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }, {threshold: .09});
  targets.forEach((el, i) => {el.classList.add('reveal'); el.style.transitionDelay = `${Math.min(i % 4 * 80, 240)}ms`; observer.observe(el);});
}
