/* Tiny synchronous script prevents a wrong-theme flash before CSS paints. */
(() => {
  let saved;
  try { saved = localStorage.getItem('polary-theme'); } catch (_) { /* Storage may be unavailable. */ }
  const theme = ['light', 'dark'].includes(saved) ? saved : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.dataset.theme = theme;
})();
