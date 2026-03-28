import { useEffect } from 'react';

export default function useScrollReveal(dep?: unknown) {
  useEffect(() => {
    const observe = (el: Element) => {
      el.classList.remove('visible');
      io.observe(el);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );

    const mo = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            if (node.classList.contains('reveal')) observe(node);
            node.querySelectorAll('.reveal').forEach(observe);
          }
        });
      });
    });

    document.querySelectorAll('.reveal').forEach(observe);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => { io.disconnect(); mo.disconnect(); };
  }, [dep]);
}
