'use strict';
(() => {
  const en = document.documentElement.lang.startsWith('en');
  const ui = en ? {
    open: 'Open menu', close: 'Close menu', dark: 'Switch to dark theme', light: 'Switch to light theme',
    required: 'Complete this field.', name: 'Enter a name with at least two characters.', email: 'Enter a valid email address.',
    long: 'This text exceeds the allowed length.', review: 'Review the highlighted fields.', subject: 'A project with Polary',
    ready: 'Message prepared. Review it below, then open your email app or copy the text. Nothing has been sent.',
    copied: 'Message copied. Paste it into your email app.', copyFailed: 'Copy this message and paste it into your email app:', message: 'Message', noMessage: 'No additional message.',
  } : {
    open: 'Abrir menu', close: 'Fechar menu', dark: 'Ativar tema escuro', light: 'Ativar tema claro',
    required: 'Preencha este campo.', name: 'Informe um nome com pelo menos dois caracteres.', email: 'Informe um e-mail válido.',
    long: 'O texto ultrapassa o limite permitido.', review: 'Revise os campos destacados.', subject: 'Um projeto com a Polary',
    ready: 'Mensagem preparada. Confira abaixo e escolha como enviar. Nada foi enviado.',
    copied: 'Mensagem copiada. Cole no seu aplicativo de e-mail.', copyFailed: 'Copie esta mensagem e cole no seu aplicativo de e-mail:', message: 'Mensagem', noMessage: 'Sem mensagem adicional.',
  };
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  const media = matchMedia('(prefers-color-scheme: dark)');
  const applyTheme = (theme, persist = false) => {
    root.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#0e141d' : '#fafaf8';
    themeButton?.setAttribute('aria-label', theme === 'dark' ? ui.light : ui.dark);
    themeButton?.setAttribute('aria-pressed', String(theme === 'dark'));
    if (persist) { try { localStorage.setItem('polary-theme', theme); } catch (_) { /* Session theme still works. */ } }
  };
  applyTheme(root.dataset.theme);
  if (themeButton) {
    themeButton.hidden = false;
    themeButton.addEventListener('click', () => applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true));
  }
  media.addEventListener('change', event => {
    let stored;
    try { stored = localStorage.getItem('polary-theme'); } catch (_) { /* Follow system preference. */ }
    if (!['light', 'dark'].includes(stored)) applyTheme(event.matches ? 'dark' : 'light');
  });
  // Non-modal disclosure navigation: native links, Escape, focus return and breakpoint reset.
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#mobile-menu');
  const header = document.querySelector('.site-header');
  const narrow = matchMedia('(max-width: 850px)');
  const close = (focus = false) => {
    const wasOpen = toggle?.getAttribute('aria-expanded') === 'true';
    if (toggle) { toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', ui.open); }
    if (menu) menu.hidden = true;
    if (focus && wasOpen) toggle.focus();
  };
  const syncMenu = () => { close(); if (toggle) toggle.hidden = !narrow.matches; };
  document.body.classList.add('js-ready');
  syncMenu();
  narrow.addEventListener('change', syncMenu);
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? ui.close : ui.open);
    menu.hidden = !open;
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') close(true); });
  document.addEventListener('click', event => { if (!header.contains(event.target)) close(); });
  header?.addEventListener('focusout', () => requestAnimationFrame(() => { if (!header.contains(document.activeElement)) close(); }));
  menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => close()));
  document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById(a.hash.slice(1));
    if (!target) return;
    target.setAttribute('tabindex', '-1');
    target.focus({preventScroll: true});
  }));
  // Preserve section awareness without a scroll listener on every frame.
  if ('IntersectionObserver' in window) {
    const nav = [...document.querySelectorAll('.primary-nav a, .mobile-nav a')];
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        nav.forEach(a => {
          if (a.getAttribute('href') === `#${entry.target.id}`) a.setAttribute('aria-current', 'location');
          else a.removeAttribute('aria-current');
        });
      }
    }, {rootMargin: '-15% 0px -65% 0px'});
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
  }
  // Generic events remain in memory; no form values, identity or network collector.
  const track = (name, location = '') => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({event: 'polary_interaction', interaction_name: name, interaction_location: location});
    if (window.dataLayer.length > 100) window.dataLayer.shift();
  };
  document.querySelectorAll('.button[href], .text-link[href]').forEach(a => a.addEventListener('click', () => track('cta_click', a.closest('section')?.id || 'navigation')));
  document.querySelectorAll('.faq-list details').forEach((item, index) => item.addEventListener('toggle', () => { if (item.open) track('faq_open', String(index + 1)); }));
  // Native buttons keep all three connections accessible by keyboard.
  document.querySelectorAll('[data-connection]').forEach(button => {
    button.addEventListener('click', () => {
      const board = button.closest('.direction-board');
      board.dataset.active = button.dataset.connection;
      board.querySelectorAll('[data-connection]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
      board.querySelector('#direction-explanation').textContent = button.dataset.description;
    });
  });
  const form = document.querySelector('#contact-form');
  if (!form) return;
  form.noValidate = true;
  form.querySelector('[type="submit"]').disabled = false;
  const status = document.querySelector('#form-status');
  const copy = form.querySelector('.copy-button');
  const preview = form.querySelector('#contact-preview');
  const fields = ['nome', 'email', 'necessidade', 'mensagem'].map(name => form.elements.namedItem(name));
  let body = '';
  let started = false;
  const clear = field => {
    field.removeAttribute('aria-invalid');
    document.getElementById(`${field.id}-error`).textContent = '';
  };
  form.addEventListener('input', event => {
    if (!started) { track('form_start', 'contato'); started = true; }
    if (fields.includes(event.target)) clear(event.target);
    status.textContent = ''; status.classList.remove('is-error');
    copy.hidden = true;
    preview.hidden = true;
  });
  document.querySelectorAll('[data-need]').forEach(a => a.addEventListener('click', () => {
    const mapping = [1, 3, 5];
    form.elements.necessidade.value = String(mapping[Number(a.dataset.need)]);
    clear(form.elements.necessidade);
    copy.hidden = true;
    preview.hidden = true;
  }));
  const validate = () => {
    let first;
    fields.forEach(field => {
      clear(field);
      const value = field.value.trim();
      let error = '';
      if (field.required && !value) error = ui.required;
      else if (field.name === 'nome' && value.length < 2) error = ui.name;
      else if (field.type === 'email' && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || field.validity.typeMismatch || /[\r\n]/.test(value))) error = ui.email;
      else if (field.maxLength > 0 && value.length > field.maxLength) error = ui.long;
      else if (field.name === 'necessidade' && !['1','2','3','4','5','6','7'].includes(value)) error = ui.required;
      if (error) {
        field.setAttribute('aria-invalid', 'true');
        document.getElementById(`${field.id}-error`).textContent = error;
        first ||= field;
      }
    });
    if (first) { first.focus(); status.textContent = ui.review; status.classList.add('is-error'); track('form_validation_error', 'contato'); }
    return !first;
  };
  form.addEventListener('submit', event => {
    event.preventDefault(); status.textContent = ''; status.classList.remove('is-error');
    if (!validate()) return;
    body = fields.map(field => {
      const label = form.querySelector(`label[for="${field.id}"]`).childNodes[0].textContent.trim();
      const value = field.tagName === 'SELECT' ? field.selectedOptions[0].textContent : (field.value.trim() || ui.noMessage);
      return `${label}: ${value}`;
    }).join('\n\n');
    const email = document.querySelector('.direct-contact a').getAttribute('href');
    copy.hidden = false;
    status.textContent = ui.ready;
    track('message_prepared', 'contato');
    preview.querySelector('[data-message-preview]').textContent = body;
    preview.querySelector('[data-email-open]').href = `${email}?subject=${encodeURIComponent(ui.subject)}&body=${encodeURIComponent(body)}`;
    preview.hidden = false;
  });
  preview.querySelector('[data-email-open]').addEventListener('click', () => track('email_client_open', 'contato'));
  copy.addEventListener('click', async () => {
    if (!validate()) return;
    try { await navigator.clipboard.writeText(body); status.textContent = ui.copied; }
    catch (_) { status.textContent = `${ui.copyFailed}\n\n${body}`; }
  });
})();
