(function () {
    'use strict';

    var root = document.documentElement;
    var $ = function (selector, scope) { return (scope || document).querySelector(selector); };
    var $$ = function (selector, scope) {
        return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
    };

    var THEME_KEY = 'polary:theme';
    var LANG_KEY = 'polary:lang';
    var ANALYTICS_KEY = 'polary:analytics';
    var THEME_COLORS = { dark: '#112033', light: '#f3f3f3' };
    var EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

    /* ---------- configuração ---------- */
    var DEFAULTS = {
        email: 'contato@polary.com.br',
        whatsapp: { number: '', message: { pt: '', en: '' } },
        form: { endpoint: '', accessKey: '' },
        responsePromise: { pt: '', en: '' },
        pricing: {
            from: { pt: '', en: '' },
            timeline: { pt: '', en: '' },
            fallback: {
                pt: 'Orçamento sob medida após o diagnóstico, sem compromisso.',
                en: 'Custom quote after the assessment, no commitment.'
            }
        },
        siteUrl: 'https://polary.com.br',
        caseSite: 'https://paulo-ramos.vercel.app/',
        caseImage: { src: '', alt: { pt: '', en: '' }, width: 1600, height: 1067 },
        caseResults: { pt: [], en: [] },
        testimonial: null,
        team: {
            gabriel: { name: 'Gabriel Sales Camargo', photo: '', linkedin: '', github: '', instagram: '' },
            leonardo: { name: 'Leonardo de Camargo Faria', photo: '', linkedin: '', github: '', instagram: '' }
        },
        instagram: '',
        cnpj: '',
        region: { pt: '', en: '' },
        hours: { pt: '', en: '' },
        analytics: { provider: '', domain: '' }
    };

    function mergeConfig(base, extra) {
        Object.keys(extra || {}).forEach(function (key) {
            var value = extra[key];
            if (
                value && typeof value === 'object' && !Array.isArray(value) &&
                base[key] && typeof base[key] === 'object' && !Array.isArray(base[key])
            ) {
                mergeConfig(base[key], value);
            } else if (value !== undefined) {
                base[key] = value;
            }
        });
        return base;
    }

    var config = mergeConfig(DEFAULTS, window.POLARY_CONFIG || {});
    var hasEndpoint = Boolean(String(config.form.endpoint || '').trim());

    /* ---------- dicionário ---------- */
    var I18N = {
        pt: {
            themeLight: 'Ativar tema claro',
            themeDark: 'Ativar tema escuro',
            openMenu: 'Abrir menu',
            closeMenu: 'Fechar menu',
            required: 'Preencha este campo.',
            emailInvalid: 'Use um e-mail válido.',
            consentRequired: 'Confirme o consentimento para continuar.',
            sendMailto: 'Enviar por e-mail',
            sendMessage: 'Enviar mensagem',
            sending: 'Enviando…',
            noteMailto: 'Este site não armazena seus dados. O envio abre seu aplicativo de e-mail com a mensagem pronta. Se nada abrir, use Copiar mensagem.',
            noteEndpoint: 'Seus dados são enviados ao serviço de formulário configurado e usados apenas para responder a este contato. Veja a Política de Privacidade.',
            successMailto: 'Abrindo seu aplicativo de e-mail com a mensagem pronta. Se nada abrir, use "Copiar mensagem".',
            successEndpoint: 'Mensagem enviada. Obrigado! Vamos responder pelo e-mail informado.',
            errorSubmit: function (email) {
                return 'Não foi possível enviar agora. Tente novamente ou use "Copiar mensagem" / ' + email + '.';
            },
            copied: 'Mensagem copiada.',
            copyFail: function (email) {
                return 'Não foi possível copiar. Escreva para ' + email + '.';
            },
            subject: 'Pedido de orçamento — ',
            nameLabel: 'Nome: ',
            emailLabel: 'E-mail: ',
            needLabel: 'Necessidade: ',
            whatsappAria: 'Falar com a Polary no WhatsApp (abre em nova aba)',
            teamLink: function (name, network) {
                return network + ' de ' + name + ' (abre em nova aba)';
            },
            cnpjLabel: 'CNPJ: ',
            fallbackBudget: 'Orçamento sob medida após o diagnóstico, sem compromisso.',
            budgetSummary: function (price, time) {
                var parts = [];
                if (price) parts.push('Investimento: ' + price + '.');
                if (time) parts.push('Prazo: ' + time + '.');
                return parts.join(' ');
            }
        },
        en: {
            themeLight: 'Switch to light theme',
            themeDark: 'Switch to dark theme',
            openMenu: 'Open menu',
            closeMenu: 'Close menu',
            required: 'Fill in this field.',
            emailInvalid: 'Use a valid email.',
            consentRequired: 'Please confirm your consent to continue.',
            sendMailto: 'Send by email',
            sendMessage: 'Send message',
            sending: 'Sending…',
            noteMailto: 'This site does not store your data. Sending opens your email app with the message ready. If nothing opens, use Copy message.',
            noteEndpoint: 'Your data is sent to the configured form service and used only to reply to this contact. See the Privacy Policy.',
            successMailto: 'Opening your email app with the message ready. If nothing opens, use "Copy message".',
            successEndpoint: 'Message sent. Thank you! We will reply to the email you provided.',
            errorSubmit: function (email) {
                return 'Could not send right now. Try again or use "Copy message" / ' + email + '.';
            },
            copied: 'Message copied.',
            copyFail: function (email) {
                return 'Could not copy. Write to ' + email + '.';
            },
            subject: 'Quote request — ',
            nameLabel: 'Name: ',
            emailLabel: 'Email: ',
            needLabel: 'Need: ',
            whatsappAria: 'Chat with Polary on WhatsApp (opens in a new tab)',
            teamLink: function (name, network) {
                return network + ' — ' + name + ' (opens in a new tab)';
            },
            cnpjLabel: 'Tax ID: ',
            fallbackBudget: 'Custom quote after the assessment, no commitment.',
            budgetSummary: function (price, time) {
                var parts = [];
                if (price) parts.push('Investment: ' + price + '.');
                if (time) parts.push('Timeline: ' + time + '.');
                return parts.join(' ');
            }
        }
    };

    var lang = /^en/i.test(root.lang) ? 'en' : 'pt';

    /* ---------- armazenamento seguro ---------- */
    function readStore(key) {
        try { return localStorage.getItem(key); } catch (error) { return null; }
    }

    function writeStore(key, value) {
        try { localStorage.setItem(key, value); } catch (error) { /* indisponível */ }
    }

    /* ---------- tema ---------- */
    var themeToggle = $('.theme-toggle');
    var metaThemeColor = $('meta[name="theme-color"]');

    function applyTheme(theme, persist) {
        root.dataset.theme = theme;
        if (metaThemeColor) metaThemeColor.setAttribute('content', THEME_COLORS[theme]);
        if (themeToggle) {
            themeToggle.setAttribute('aria-label', I18N[lang][theme === 'dark' ? 'themeLight' : 'themeDark']);
        }
        if (persist) writeStore(THEME_KEY, theme);
    }

    applyTheme(root.dataset.theme === 'light' ? 'light' : 'dark', false);

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true);
        });
    }

    var colorScheme = window.matchMedia('(prefers-color-scheme: light)');
    if (colorScheme.addEventListener) {
        colorScheme.addEventListener('change', function (event) {
            if (!readStore(THEME_KEY)) applyTheme(event.matches ? 'light' : 'dark', false);
        });
    }

    /* ---------- idioma ---------- */
    var titleEl = $('title');
    if (titleEl && titleEl.hasAttribute('data-en')) titleEl.dataset.pt = titleEl.textContent;

    var textEntries = $$('[data-en]').filter(function (element) {
        return element.tagName !== 'TITLE';
    }).map(function (element) {
        element.dataset.pt = element.innerHTML;
        return element;
    });

    var attrEntries = [];
    $$('*').forEach(function (element) {
        Array.prototype.forEach.call(element.attributes, function (attr) {
            if (attr.name.indexOf('data-en-') !== 0) return;
            var target = attr.name.slice(8);
            var camel = target.replace(/-([a-z])/g, function (_, letter) { return letter.toUpperCase(); });
            var enKey = 'en' + camel.charAt(0).toUpperCase() + camel.slice(1);
            var ptKey = 'pt' + camel.charAt(0).toUpperCase() + camel.slice(1);
            if (element.dataset[ptKey] === undefined) {
                element.dataset[ptKey] = element.getAttribute(target) || '';
            }
            attrEntries.push({ element: element, target: target, enKey: enKey, ptKey: ptKey });
        });
    });

    var menuBtn = $('.menu-btn');
    var mobilePanel = $('#mobile-menu');

    function syncMenuLabel() {
        if (!menuBtn) return;
        var open = menuBtn.getAttribute('aria-expanded') === 'true';
        menuBtn.setAttribute('aria-label', I18N[lang][open ? 'closeMenu' : 'openMenu']);
    }

    /* ---------- formulário: referências ---------- */
    var form = $('#quote-form');
    var status = $('#form-status');
    var copyBtn = $('#copy-message');
    var submitBtn = $('#form-submit');
    var honeypot = $('#gotcha');
    var messageInput = $('#message');
    var fields = {
        name: { input: $('#name'), error: $('#error-name') },
        email: { input: $('#email'), error: $('#error-email') },
        need: { input: $('#need'), error: $('#error-need') },
        consent: { input: $('#consent'), error: $('#error-consent') }
    };

    function setFieldError(field, invalid, message) {
        if (!field || !field.input || !field.error) return;
        field.error.textContent = invalid ? message : '';
        if (invalid) field.input.setAttribute('aria-invalid', 'true');
        else field.input.removeAttribute('aria-invalid');
    }

    function clearFieldErrors() {
        ['name', 'email', 'need', 'consent'].forEach(function (key) {
            setFieldError(fields[key], false, '');
        });
    }

    function selectedNeedText() {
        var select = fields.need.input;
        if (!select || select.selectedIndex < 0) return '';
        return select.options[select.selectedIndex].textContent.trim();
    }

    function buildMessage() {
        return [
            I18N[lang].nameLabel + (fields.name.input ? fields.name.input.value.trim() : ''),
            I18N[lang].emailLabel + (fields.email.input ? fields.email.input.value.trim() : ''),
            I18N[lang].needLabel + selectedNeedText()
        ].join('\n') + ((messageInput && messageInput.value.trim()) ? '\n\n' + messageInput.value.trim() : '');
    }

    function defaultNote() {
        return hasEndpoint ? I18N[lang].noteEndpoint : I18N[lang].noteMailto;
    }

    function submitLabel() {
        return hasEndpoint ? I18N[lang].sendMessage : I18N[lang].sendMailto;
    }

    function updateSubmitLabel() {
        if (!submitBtn || submitBtn.getAttribute('aria-busy') === 'true') return;
        submitBtn.textContent = submitLabel();
    }

    function setStatus(message, state) {
        if (!status) return;
        status.textContent = message || defaultNote();
        status.classList.toggle('is-success', state === 'success');
        status.classList.toggle('is-error', state === 'error');
    }

    function setLoading(loading) {
        if (!submitBtn) return;
        submitBtn.disabled = loading;
        submitBtn.setAttribute('aria-busy', String(loading));
        submitBtn.textContent = loading ? I18N[lang].sending : submitLabel();
    }

    /* ---------- whatsapp ---------- */
    function whatsappText() {
        var name = fields.name.input ? fields.name.input.value.trim() : '';
        var need = selectedNeedText();
        var custom = config.whatsapp.message && config.whatsapp.message[lang]
            ? config.whatsapp.message[lang].trim()
            : '';
        var parts = [custom || (lang === 'en' ? 'Hi, Polary!' : 'Olá, Polary!')];

        if (name) parts.push(lang === 'en' ? 'My name is ' + name + '.' : 'Meu nome é ' + name + '.');
        if (need) parts.push(lang === 'en' ? 'I need help with: ' + need + '.' : 'Preciso de: ' + need + '.');
        if (!name && !need && !custom) {
            parts.push(lang === 'en'
                ? 'I would like to talk about a project.'
                : 'Gostaria de conversar sobre um projeto.');
        }

        var extra = messageInput ? messageInput.value.trim() : '';
        if (extra) parts.push(extra);
        return parts.join(' ');
    }

    function whatsappUrl() {
        var digits = String(config.whatsapp.number || '').replace(/\D/g, '');
        if (digits.length < 10) return '';
        return 'https://wa.me/' + digits + '?text=' + encodeURIComponent(whatsappText());
    }

    function applyWhatsApp() {
        var url = whatsappUrl();
        $$('[data-wa-link]').forEach(function (link) {
            if (!url) {
                link.hidden = true;
                link.removeAttribute('href');
                return;
            }
            link.href = url;
            link.hidden = false;
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            link.setAttribute('aria-label', I18N[lang].whatsappAria);
        });
    }

    /* ---------- conteúdo dirigido pela configuração ---------- */
    function setText(selector, value) {
        $$(selector).forEach(function (element) {
            element.textContent = value || '';
        });
    }

    function getPricing() {
        var pricing = config.pricing || {};
        var price = pricing.from ? (pricing.from[lang] || '') : '';
        var time = pricing.timeline ? (pricing.timeline[lang] || '') : '';
        var fallback = pricing.fallback ? (pricing.fallback[lang] || '') : '';
        return { price: price, time: time, fallback: fallback || I18N[lang].fallbackBudget };
    }

    function applyBudget() {
        var pricing = getPricing();
        var priceValue = $('[data-budget-price]');
        var timeValue = $('[data-budget-time]');
        var fallback = $('[data-budget-fallback]');
        var priceItem = priceValue ? priceValue.closest('[data-budget-item]') : null;
        var timeItem = timeValue ? timeValue.closest('[data-budget-item]') : null;

        if (priceValue) priceValue.textContent = pricing.price;
        if (timeValue) timeValue.textContent = pricing.time;
        if (priceItem) priceItem.hidden = !pricing.price;
        if (timeItem) timeItem.hidden = !pricing.time;
        if (fallback) {
            fallback.textContent = pricing.fallback;
            fallback.hidden = Boolean(pricing.price || pricing.time);
        }

        var faqBudget = $('[data-faq-budget]');
        if (faqBudget) {
            faqBudget.textContent = (pricing.price || pricing.time)
                ? I18N[lang].budgetSummary(pricing.price, pricing.time)
                : pricing.fallback;
        }
    }

    function applyFooter() {
        var region = config.region ? (config.region[lang] || '') : '';
        var hours = config.hours ? (config.hours[lang] || '') : '';
        $$('[data-region]').forEach(function (element) {
            element.textContent = region;
            element.hidden = !region;
        });
        $$('[data-hours]').forEach(function (element) {
            element.textContent = hours;
            element.hidden = !hours;
        });

        var cnpjEl = $('[data-cnpj]');
        if (cnpjEl) {
            cnpjEl.textContent = config.cnpj ? I18N[lang].cnpjLabel + config.cnpj : '';
            cnpjEl.hidden = !config.cnpj;
        }

        $$('[data-ig-link]').forEach(function (link) {
            if (config.instagram) {
                link.href = config.instagram;
                link.hidden = false;
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            } else {
                link.hidden = true;
                link.removeAttribute('href');
            }
        });

        $$('[data-email-link]').forEach(function (link) {
            link.href = 'mailto:' + config.email;
            if (link.hasAttribute('data-email-text')) link.textContent = config.email;
        });

        if (form) {
            form.setAttribute('action', 'mailto:' + config.email);
        }
    }

    function applyResponsePromise() {
        var promise = config.responsePromise ? (config.responsePromise[lang] || '') : '';
        $$('[data-response-promise]').forEach(function (element) {
            element.textContent = promise;
            element.hidden = !promise;
        });
    }

    function applyCase() {
        $$('[data-case-link]').forEach(function (link) {
            if (config.caseSite) link.href = config.caseSite;
        });

        var image = $('.case__media img');
        if (image && config.caseImage && config.caseImage.src) {
            image.src = config.caseImage.src;
            if (config.caseImage.alt && config.caseImage.alt[lang]) image.alt = config.caseImage.alt[lang];
            if (config.caseImage.width) image.width = config.caseImage.width;
            if (config.caseImage.height) image.height = config.caseImage.height;
        }

        var results = config.caseResults ? (config.caseResults[lang] || []) : [];
        var list = $('[data-case-results]');
        if (list) {
            list.innerHTML = '';
            results.forEach(function (result) {
                var item = document.createElement('li');
                item.textContent = result;
                list.appendChild(item);
            });
            list.hidden = results.length === 0;
        }

        var testimonial = config.testimonial;
        var wrap = $('[data-testimonial]');
        if (wrap) {
            wrap.innerHTML = '';
            if (testimonial && testimonial.quote && testimonial.quote[lang]) {
                var figure = document.createElement('figure');
                var quote = document.createElement('blockquote');
                quote.textContent = '“' + testimonial.quote[lang] + '”';
                var caption = document.createElement('figcaption');
                var name = document.createElement('b');
                name.textContent = testimonial.name || '';
                caption.appendChild(name);
                if (testimonial.role) {
                    var role = document.createElement('span');
                    role.textContent = testimonial.role[lang] || testimonial.role.pt || '';
                    caption.appendChild(role);
                }
                figure.appendChild(quote);
                figure.appendChild(caption);
                wrap.appendChild(figure);
                wrap.hidden = false;
            } else {
                wrap.hidden = true;
            }
        }
    }

    function applyTeam() {
        $$('[data-person]').forEach(function (card) {
            var key = card.getAttribute('data-person');
            var person = (config.team && config.team[key]) || {};
            var avatar = $('.person__avatar', card);
            var monogram = $('.person__monogram', card);
            var image = avatar ? $('img', avatar) : null;

            if (avatar) {
                if (person.photo) {
                    if (!image) {
                        image = document.createElement('img');
                        image.loading = 'lazy';
                        image.decoding = 'async';
                        image.width = 112;
                        image.height = 112;
                        image.alt = '';
                        avatar.insertBefore(image, monogram);
                    }
                    image.onerror = function () {
                        avatar.classList.remove('has-photo');
                        image.remove();
                    };
                    image.src = person.photo;
                    avatar.classList.add('has-photo');
                } else {
                    avatar.classList.remove('has-photo');
                    if (image) image.remove();
                }
            }

            var links = $('[data-person-links]', card);
            if (!links) return;
            links.innerHTML = '';
            [['linkedin', 'LinkedIn'], ['github', 'GitHub'], ['instagram', 'Instagram']].forEach(function (network) {
                var url = person[network[0]];
                if (!url) return;
                var link = document.createElement('a');
                link.href = url;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.textContent = network[1];
                link.setAttribute('aria-label', I18N[lang].teamLink(person.name, network[1]));
                links.appendChild(link);
            });
            links.hidden = links.children.length === 0;
        });
    }

    function secureExternalLinks() {
        $$('a[target="_blank"]').forEach(function (link) {
            var rel = (link.getAttribute('rel') || '').split(/\s+/).filter(Boolean);
            ['noopener', 'noreferrer'].forEach(function (token) {
                if (rel.indexOf(token) === -1) rel.push(token);
            });
            link.setAttribute('rel', rel.join(' '));
        });
    }

    function applyConfigContent() {
        applyWhatsApp();
        applyBudget();
        applyFooter();
        applyResponsePromise();
        applyCase();
        applyTeam();
        secureExternalLinks();
    }

    /* ---------- analytics com consentimento ---------- */
    function loadAnalytics() {
        var analytics = config.analytics || {};
        if (analytics.provider === 'plausible' && analytics.domain) {
            if ($('script[data-polary-analytics]')) return;
            var plausible = document.createElement('script');
            plausible.defer = true;
            plausible.src = 'https://plausible.io/js/script.js';
            plausible.setAttribute('data-domain', analytics.domain);
            plausible.setAttribute('data-polary-analytics', '');
            document.head.appendChild(plausible);
        } else if (analytics.provider === 'ga' && analytics.domain) {
            if ($('script[data-polary-analytics]')) return;
            var id = analytics.domain.replace(/[^A-Za-z0-9-]/g, '');
            var gtag = document.createElement('script');
            gtag.async = true;
            gtag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
            gtag.setAttribute('data-polary-analytics', '');
            document.head.appendChild(gtag);
            var inline = document.createElement('script');
            inline.textContent = 'window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","' + id + '");';
            document.head.appendChild(inline);
        }
    }

    function initAnalytics() {
        var analytics = config.analytics || {};
        if (!analytics.provider || !analytics.domain) return;

        var decision = readStore(ANALYTICS_KEY);
        if (decision === 'accepted') {
            loadAnalytics();
            return;
        }
        if (decision === 'denied') return;

        var banner = $('#analytics-consent');
        if (!banner) return;
        banner.hidden = false;

        $$('[data-consent-accept]', banner).forEach(function (button) {
            button.addEventListener('click', function () {
                writeStore(ANALYTICS_KEY, 'accepted');
                banner.hidden = true;
                loadAnalytics();
            });
        });
        $$('[data-consent-decline]', banner).forEach(function (button) {
            button.addEventListener('click', function () {
                writeStore(ANALYTICS_KEY, 'denied');
                banner.hidden = true;
            });
        });
    }

    /* ---------- JSON-LD ---------- */
    function applyStructuredData() {
        var script = $('#org-jsonld');
        if (!script) return;
        var data;
        try { data = JSON.parse(script.textContent); } catch (error) { return; }

        var sameAs = [];
        if (config.instagram) sameAs.push(config.instagram);
        ['gabriel', 'leonardo'].forEach(function (key) {
            var person = config.team && config.team[key];
            if (!person) return;
            ['linkedin', 'github', 'instagram'].forEach(function (network) {
                if (person[network] && sameAs.indexOf(person[network]) === -1) sameAs.push(person[network]);
            });
        });
        data.sameAs = sameAs;
        if (config.cnpj) data.taxID = config.cnpj;
        script.textContent = JSON.stringify(data);
    }

    /* ---------- idioma: aplicar ---------- */
    function syncUrlLang() {
        try {
            if (window.location.protocol === 'file:') return;
            var url = new URL(window.location.href);
            if (lang === 'en') url.searchParams.set('lang', 'en');
            else url.searchParams.delete('lang');
            window.history.replaceState(null, '', url.toString());
        } catch (error) { /* histórico indisponível */ }
    }

    function applyLang(next, persist) {
        lang = next === 'en' ? 'en' : 'pt';
        root.lang = lang === 'pt' ? 'pt-BR' : 'en';

        textEntries.forEach(function (element) {
            element.innerHTML = element.dataset[lang] || element.dataset.pt;
        });

        attrEntries.forEach(function (entry) {
            var value = lang === 'en' ? entry.element.dataset[entry.enKey] : entry.element.dataset[entry.ptKey];
            if (value !== undefined) entry.element.setAttribute(entry.target, value);
        });

        if (titleEl) document.title = titleEl.dataset[lang] || titleEl.dataset.pt;

        var ogLocale = $('meta[property="og:locale"]');
        if (ogLocale) ogLocale.setAttribute('content', lang === 'pt' ? 'pt_BR' : 'en_US');
        var ogAlt = $('meta[property="og:locale:alternate"]');
        if (ogAlt) ogAlt.setAttribute('content', lang === 'pt' ? 'en_US' : 'pt_BR');

        var base = String(config.siteUrl || '').replace(/\/+$/, '');
        if (base) {
            var path = window.location.pathname.replace(/\/+$/, '');
            if (path === '/index.html') path = '';
            var pageUrl = base + (path === '' ? '/' : path) + (lang === 'en' ? '?lang=en' : '');
            var canonical = $('#canonical-link') || $('link[rel="canonical"]');
            if (canonical) canonical.href = pageUrl;
            var ogUrl = $('#og-url') || $('meta[property="og:url"]');
            if (ogUrl) ogUrl.setAttribute('content', pageUrl);
        }

        $$('[data-lang]').forEach(function (button) {
            button.setAttribute('aria-pressed', String(button.dataset.lang === lang));
        });

        applyTheme(root.dataset.theme === 'light' ? 'light' : 'dark', false);
        syncMenuLabel();
        clearFieldErrors();
        updateSubmitLabel();
        if (status) {
            status.classList.remove('is-success', 'is-error');
            status.textContent = defaultNote();
        }
        applyConfigContent();
        syncUrlLang();

        if (persist) writeStore(LANG_KEY, lang);
    }

    $$('[data-lang]').forEach(function (button) {
        button.addEventListener('click', function () {
            if (button.dataset.lang !== lang) applyLang(button.dataset.lang, true);
        });
    });

    /* ---------- menu mobile ---------- */
    function setMenu(open) {
        if (!menuBtn || !mobilePanel) return;
        mobilePanel.hidden = !open;
        menuBtn.setAttribute('aria-expanded', String(open));
        syncMenuLabel();
    }

    if (menuBtn && mobilePanel) {
        menuBtn.addEventListener('click', function () {
            setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
        });

        $$('a', mobilePanel).forEach(function (link) {
            link.addEventListener('click', function () { setMenu(false); });
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && !mobilePanel.hidden) {
                setMenu(false);
                menuBtn.focus();
            }
        });

        var desktop = window.matchMedia('(min-width: 981px)');
        if (desktop.addEventListener) {
            desktop.addEventListener('change', function (event) {
                if (event.matches) setMenu(false);
            });
        }
    }

    /* ---------- acordeão ---------- */
    $$('.accordion__trigger').forEach(function (trigger) {
        trigger.addEventListener('click', function () {
            var expanded = trigger.getAttribute('aria-expanded') === 'true';
            var panel = document.getElementById(trigger.getAttribute('aria-controls'));
            trigger.setAttribute('aria-expanded', String(!expanded));
            if (panel) panel.hidden = expanded;
        });
    });

    /* ---------- formulário: validação e envio ---------- */
    function validate(includeConsent) {
        if (!form) return false;
        var name = fields.name.input ? fields.name.input.value.trim() : '';
        var email = fields.email.input ? fields.email.input.value.trim() : '';
        var need = fields.need.input ? fields.need.input.value : '';
        var consent = fields.consent.input ? fields.consent.input.checked : false;

        setFieldError(fields.name, !name, I18N[lang].required);
        setFieldError(fields.email, !EMAIL_RE.test(email), email ? I18N[lang].emailInvalid : I18N[lang].required);
        setFieldError(fields.need, !need, I18N[lang].required);
        if (includeConsent) setFieldError(fields.consent, !consent, I18N[lang].consentRequired);

        var invalid = ['name', 'email', 'need'].map(function (key) { return fields[key]; });
        if (includeConsent) invalid.push(fields.consent);

        var firstInvalid = invalid.filter(function (field) {
            return field.input && field.input.getAttribute('aria-invalid') === 'true';
        })[0];

        if (firstInvalid) {
            firstInvalid.input.focus();
            return false;
        }
        return true;
    }

    if (form) {
        ['name', 'email', 'need'].forEach(function (key) {
            var field = fields[key];
            if (!field.input) return;
            field.input.addEventListener('input', function () {
                setFieldError(field, false, '');
                applyWhatsApp();
            });
            field.input.addEventListener('change', function () {
                setFieldError(field, false, '');
                applyWhatsApp();
            });
        });

        if (fields.consent.input) {
            fields.consent.input.addEventListener('change', function () {
                setFieldError(fields.consent, false, '');
            });
        }

        if (messageInput) {
            messageInput.addEventListener('input', applyWhatsApp);
            messageInput.addEventListener('change', applyWhatsApp);
        }

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            if (honeypot && honeypot.value.trim()) return;
            if (!validate(true)) return;

            if (!hasEndpoint || !window.fetch) {
                var subject = I18N[lang].subject + fields.name.input.value.trim();
                setStatus(I18N[lang].successMailto, 'success');
                window.location.href = 'mailto:' + config.email +
                    '?subject=' + encodeURIComponent(subject) +
                    '&body=' + encodeURIComponent(buildMessage());
                return;
            }

            var controller = typeof AbortController === 'function' ? new AbortController() : null;
            var timer = setTimeout(function () {
                if (controller) controller.abort();
            }, 15000);

            var payload = {
                name: fields.name.input.value.trim(),
                email: fields.email.input.value.trim(),
                need: selectedNeedText(),
                needValue: fields.need.input.value,
                message: messageInput ? messageInput.value.trim() : '',
                consent: true,
                page: window.location.href,
                _subject: I18N[lang].subject + fields.name.input.value.trim()
            };
            if (config.form.accessKey) payload.access_key = config.form.accessKey;

            setLoading(true);
            setStatus('', '');

            fetch(String(config.form.endpoint).trim(), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(payload),
                signal: controller ? controller.signal : undefined
            }).then(function (response) {
                return response.text().then(function (text) {
                    var data = {};
                    try { data = JSON.parse(text); } catch (error) { /* resposta sem JSON */ }
                    if (!response.ok || data.success === false) throw new Error('submit');
                    return data;
                });
            }).then(function () {
                clearTimeout(timer);
                setLoading(false);
                setStatus(I18N[lang].successEndpoint, 'success');
            }).catch(function () {
                clearTimeout(timer);
                setLoading(false);
                setStatus(I18N[lang].errorSubmit(config.email), 'error');
            });
        });
    }

    function copyText(text) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text).then(function () { return true; }, function () {
                return legacyCopy(text);
            });
        }
        return Promise.resolve(legacyCopy(text));
    }

    function legacyCopy(text) {
        try {
            var area = document.createElement('textarea');
            area.value = text;
            area.setAttribute('readonly', '');
            area.style.position = 'fixed';
            area.style.top = '-1000px';
            document.body.appendChild(area);
            area.select();
            var ok = document.execCommand('copy');
            document.body.removeChild(area);
            return ok;
        } catch (error) {
            return false;
        }
    }

    if (copyBtn) {
        copyBtn.addEventListener('click', function () {
            if (!validate(false)) return;
            copyText(buildMessage()).then(function (ok) {
                setStatus(ok ? I18N[lang].copied : I18N[lang].copyFail(config.email), ok ? 'success' : 'error');
            });
        });
    }

    /* ---------- pré-seleção da necessidade ---------- */
    $$('a[data-need]').forEach(function (link) {
        link.addEventListener('click', function () {
            var select = fields.need.input;
            if (!select) return;
            var value = link.getAttribute('data-need');
            var exists = Array.prototype.some.call(select.options, function (option) { return option.value === value; });
            if (!exists) return;
            select.value = value;
            setFieldError(fields.need, false, '');
            applyWhatsApp();
        });
    });

    /* ---------- reveal ---------- */
    var revealItems = $$('.reveal');
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    root.classList.add('reveal-ready');

    if (!('IntersectionObserver' in window) || reduceMotion) {
        revealItems.forEach(function (element) { element.classList.add('is-visible'); });
    } else {
        var revealObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        revealItems.forEach(function (element) {
            if (!element.classList.contains('is-visible')) revealObserver.observe(element);
        });
    }

    /* ---------- scrollspy ---------- */
    var navLinks = $$('.nav a[href^="#"], .mobile-panel a[href^="#"], .header__cta[href^="#"]');
    var sections = [];
    navLinks.forEach(function (link) {
        var section = document.getElementById(link.getAttribute('href').slice(1));
        if (section && sections.indexOf(section) === -1) sections.push(section);
    });

    if (sections.length) {
        var spyLast = 0;

        function updateSpy() {
            var line = window.innerHeight * 0.4;
            var current = null;

            sections.forEach(function (section) {
                if (section.getBoundingClientRect().top <= line) current = section;
            });

            var atBottom = window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - 2;
            if (atBottom) current = sections[sections.length - 1];

            var hash = current ? '#' + current.id : '';
            navLinks.forEach(function (link) {
                if (link.getAttribute('href') === hash) link.setAttribute('aria-current', 'true');
                else link.removeAttribute('aria-current');
            });
        }

        function requestSpy() {
            var now = Date.now();
            if (now - spyLast < 80) return;
            spyLast = now;
            updateSpy();
        }

        window.addEventListener('scroll', requestSpy, { passive: true });
        window.addEventListener('resize', requestSpy);
        updateSpy();
    }

    /* ---------- inicialização ---------- */
    applyStructuredData();
    applyLang(lang, false);
    initAnalytics();
})();
