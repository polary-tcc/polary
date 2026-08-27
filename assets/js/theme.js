(() => {
  const STORAGE_KEY = 'polary-theme';
  const root = document.documentElement;
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const isEnglish = root.lang.toLowerCase().startsWith('en');

  const labels = isEnglish
    ? { toDark: 'Switch to dark theme', toLight: 'Switch to light theme' }
    : { toDark: 'Ativar tema escuro', toLight: 'Ativar tema claro' };

  const readStored = () => {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      return value === 'light' || value === 'dark' ? value : null;
    } catch (_) {
      return null;
    }
  };

  const updateThemeColor = (theme) => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#071015' : '#f8faf9');
  };

  const updateButtons = (theme) => {
    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      const nextLabel = theme === 'dark' ? labels.toLight : labels.toDark;
      button.setAttribute('aria-label', nextLabel);
      button.setAttribute('title', nextLabel);
      button.setAttribute('aria-pressed', String(theme === 'dark'));
    });
  };

  const applyTheme = (theme, persist = false) => {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    updateThemeColor(theme);
    updateButtons(theme);
    if (persist) {
      try { localStorage.setItem(STORAGE_KEY, theme); } catch (_) {}
    }
    window.dispatchEvent(new CustomEvent('polary:themechange', { detail: { theme } }));
  };

  const initial = root.dataset.theme || readStored() || (media.matches ? 'dark' : 'light');
  applyTheme(initial);

  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true);
    });
  });

  media.addEventListener?.('change', (event) => {
    if (!readStored()) applyTheme(event.matches ? 'dark' : 'light');
  });
})();
