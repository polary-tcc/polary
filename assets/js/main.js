(() => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const isEnglish = document.documentElement.lang
    .toLowerCase()
    .startsWith("en");
  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const navLinks = [
    ...document.querySelectorAll('.desktop-nav a, .mobile-nav a[href^="#"]'),
  ];

  const ui = isEnglish
    ? {
        openMenu: "Open menu",
        closeMenu: "Close menu",
        nameRequired: "Enter your name.",
        emailRequired: "Enter your email.",
        emailInvalid: "Enter a valid email address.",
        needRequired: "Select an option.",
        reviewFields: "Review the highlighted fields.",
        openingEmail: "Email prepared. If your email app opens, review and send it there. Otherwise use the direct email link.",
        projectSubject: "Polary project",
        bodyName: "Name",
        bodyCompany: "Company",
        bodyEmail: "Email",
        bodyWhatsapp: "WhatsApp",
        bodyNeed: "Need",
        bodyMessage: "Message",
        notProvided: "Not provided",
        noMessage: "No additional message.",
        plans: {
          presenca: "Presence",
          gestao: "Management",
          ecossistema: "Ecosystem",
        },
        proposalMessage: (plan) =>
          `Hello! I found Polary through the website and I'm interested in the ${plan} plan. I'd like to talk about my company's needs and request a proposal.`,
        diagnosisMessage:
          "Hello! I found Polary through the website and I'd like to talk to understand which solutions make sense for my company.",
      }
    : {
        openMenu: "Abrir menu",
        closeMenu: "Fechar menu",
        nameRequired: "Informe seu nome.",
        emailRequired: "Informe seu e-mail.",
        emailInvalid: "Informe um e-mail válido.",
        needRequired: "Selecione uma opção.",
        reviewFields: "Revise os campos destacados.",
        openingEmail: "E-mail preparado. Se o aplicativo abrir, revise e envie por lá. Caso contrário, use o link de contato direto.",
        projectSubject: "Projeto Polary",
        bodyName: "Nome",
        bodyCompany: "Empresa",
        bodyEmail: "E-mail",
        bodyWhatsapp: "WhatsApp",
        bodyNeed: "Necessidade",
        bodyMessage: "Mensagem",
        notProvided: "Não informado",
        noMessage: "Sem mensagem adicional.",
        plans: {
          presenca: "Presença",
          gestao: "Gestão",
          ecossistema: "Ecossistema",
        },
        proposalMessage: (plan) =>
          `Olá! Conheci a Polary pelo site e tenho interesse no plano ${plan}. Gostaria de conversar sobre as necessidades da minha empresa e solicitar uma proposta.`,
        diagnosisMessage:
          "Olá! Conheci a Polary pelo site e gostaria de conversar para entender quais soluções fazem sentido para a minha empresa.",
      };

  const setHeaderState = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  const closeMenu = ({ restoreFocus = false } = {}) => {
    if (!menuToggle || !mobileMenu) return;
    const wasOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", ui.openMenu);
    mobileMenu.hidden = true;
    document.body.classList.remove("menu-open");
    if (restoreFocus && wasOpen) menuToggle.focus();
  };

  menuToggle?.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    menuToggle.setAttribute(
      "aria-label",
      expanded ? ui.openMenu : ui.closeMenu,
    );
    mobileMenu.hidden = expanded;
    document.body.classList.toggle("menu-open", !expanded);
    if (!expanded) {
      requestAnimationFrame(() =>
        mobileMenu.querySelector("a, button")?.focus(),
      );
    }
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      menuToggle?.getAttribute("aria-expanded") === "true"
    ) {
      closeMenu({ restoreFocus: true });
    }
  });

  window.addEventListener(
    "resize",
    () => {
      if (
        window.innerWidth >= 1160 &&
        menuToggle?.getAttribute("aria-expanded") === "true"
      )
        closeMenu();
    },
    { passive: true },
  );

  // Keep native hash/history behavior. Only transfer focus and close the menu.
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = document.getElementById(link.hash.slice(1));
      if (!target) return;
      closeMenu();
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  });
  mobileMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => closeMenu());
  });
  document.addEventListener("click", (event) => {
    if (!header?.contains(event.target)) closeMenu();
  });
  header?.addEventListener("focusout", () => {
    requestAnimationFrame(() => {
      if (!header.contains(document.activeElement)) closeMenu();
    });
  });

  const observedSections = [...document.querySelectorAll("main section[id]")];
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => {
            const active = link.getAttribute("href") === `#${entry.target.id}`;
            link.classList.toggle("is-active", active);
            if (active) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
    );
    observedSections.forEach((section) => sectionObserver.observe(section));
  }

  // Content remains visible even if JavaScript or observers are unavailable.
  const track = (name, attributes = {}) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({event: "polary_interaction", interaction_name: name, ...attributes});
  };
  document.querySelectorAll(".faq-item button").forEach((button) => {
    const answer = document.getElementById(button.getAttribute("aria-controls"));
    if (answer) { answer.hidden = true; button.setAttribute("aria-expanded", "false"); }
  });

  document.querySelectorAll(".faq-item button").forEach((button) => {
    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      const answer = document.getElementById(
        button.getAttribute("aria-controls"),
      );
      if (!answer) return;

      document
        .querySelectorAll('.faq-item button[aria-expanded="true"]')
        .forEach((otherButton) => {
          if (otherButton === button) return;
          otherButton.setAttribute("aria-expanded", "false");
          const otherAnswer = document.getElementById(
            otherButton.getAttribute("aria-controls"),
          );
          if (otherAnswer) otherAnswer.hidden = true;
        });

      button.setAttribute("aria-expanded", String(!expanded));
      answer.hidden = expanded;
      if (!expanded) track("faq_open", {faq_id: answer.id});
    });
  });

  const form = document.getElementById("contact-form");
  if (form) {
    form.noValidate = true;
    form.querySelector('[type="submit"]').disabled = false;
  }
  let formStarted = false;
  form?.addEventListener("input", () => {
    if (!formStarted) { formStarted = true; track("form_start"); }
  });
  const status = document.getElementById("form-status");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const showFieldError = (field, message) => {
    const error = document.getElementById(`${field.id}-error`);
    field.setAttribute("aria-invalid", "true");
    if (error) error.textContent = message;
  };

  const clearErrors = () => {
    form
      ?.querySelectorAll('[aria-invalid="true"]')
      .forEach((field) => field.removeAttribute("aria-invalid"));
    form?.querySelectorAll(".field-error").forEach((error) => {
      error.textContent = "";
    });
    if (status) {
      status.textContent = "";
      status.className = "form-status";
    }
  };

  form?.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") !== "true") return;
      field.removeAttribute("aria-invalid");
      const error = document.getElementById(`${field.id}-error`);
      if (error) error.textContent = "";
      if (status) {
        status.textContent = "";
        status.className = "form-status";
      }
    });
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();

    const honeypot = form.elements.website?.value;
    if (honeypot) return;

    const name = form.elements.nome;
    const email = form.elements.email;
    const need = form.elements.necessidade;
    let valid = true;

    if (!name.value.trim()) {
      showFieldError(name, ui.nameRequired);
      valid = false;
    }
    if (!email.value.trim()) {
      showFieldError(email, ui.emailRequired);
      valid = false;
    } else if (!emailRegex.test(email.value.trim())) {
      showFieldError(email, ui.emailInvalid);
      valid = false;
    }
    if (!need.value) {
      showFieldError(need, ui.needRequired);
      valid = false;
    }

    if (!valid) {
      track("form_validation_error");
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      firstInvalid?.focus();
      if (status) {
        status.textContent = ui.reviewFields;
        status.classList.add("is-error");
      }
      return;
    }

    const needLabel =
      need.selectedOptions?.[0]?.textContent.trim() || need.value;
    const subject = `${ui.projectSubject} — ${needLabel}`;
    const body = [
      `${ui.bodyName}: ${name.value.trim()}`,
      `${ui.bodyCompany}: ${form.elements.empresa?.value.trim() || ui.notProvided}`,
      `${ui.bodyEmail}: ${email.value.trim()}`,
      `${ui.bodyWhatsapp}: ${form.elements.whatsapp?.value.trim() || ui.notProvided}`,
      `${ui.bodyNeed}: ${needLabel}`,
      "",
      `${ui.bodyMessage}:`,
      form.elements.mensagem.value.trim() || ui.noMessage,
    ].join("\n");

    const mailto = `mailto:contato@polary.com.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (status) {
      status.textContent = ui.openingEmail;
      status.classList.add("is-pending");
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({event: "polary_interaction", interaction_name: "email_client_open"});
    }
    window.location.href = mailto;
  });

  const collapsePanel = (panel) => {
    panel.hidden = true;
    panel.classList.remove("is-open");
  };
  const expandPanel = (panel) => {
    panel.hidden = false;
    panel.classList.add("is-open");
  };

  document.querySelectorAll(".plan-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.getElementById(
        button.getAttribute("aria-controls"),
      );
      if (!panel) return;
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      const labelClosed = button.querySelector(
        ".plan-toggle-label--closed",
      );
      const labelOpen = button.querySelector(".plan-toggle-label--open");
      if (labelClosed) labelClosed.hidden = !expanded;
      if (labelOpen) labelOpen.hidden = expanded;
      if (expanded) collapsePanel(panel);
      else expandPanel(panel);
    });
  });

  const compareToggle = document.querySelector(".compare-toggle");
  const comparePanel = document.getElementById("plan-compare-panel");
  if (compareToggle && comparePanel) {
    compareToggle.addEventListener("click", () => {
      const expanded = compareToggle.getAttribute("aria-expanded") === "true";
      compareToggle.setAttribute("aria-expanded", String(!expanded));
      if (expanded) collapsePanel(comparePanel);
      else expandPanel(comparePanel);
    });
  }

  const focusMessage = () => {
    window.setTimeout(() => {
      form?.elements.mensagem?.focus();
    }, prefersReducedMotion ? 0 : 480);
  };

  document.querySelectorAll("[data-plan-proposal]").forEach((link) => {
    link.addEventListener("click", () => {
      const planName = ui.plans[link.dataset.plan];
      if (form && planName) {
        if (!form.elements.mensagem.value.trim()) form.elements.mensagem.value = ui.proposalMessage(planName);
        focusMessage();
      }
    });
  });

  document.querySelectorAll("[data-plan-diagnosis]").forEach((link) => {
    link.addEventListener("click", () => {
      if (form) {
        if (!form.elements.mensagem.value.trim()) form.elements.mensagem.value = ui.diagnosisMessage;
        focusMessage();
      }
    });
  });

  const year = document.getElementById("current-year");
  if (year) year.textContent = new Date().getFullYear();

  document.querySelectorAll("[data-event]").forEach((element) => {
    element.addEventListener("click", () => {
      const eventName = element.dataset.event;
      window.dataLayer = window.dataLayer || [];
      const interaction = {
        event: "polary_interaction",
        interaction_name: eventName,
      };
      interaction.interaction_location = element.closest("section")?.id || (element.closest("header") ? "header" : "footer");
      if (element.dataset.plan) interaction.interaction_plan =
        element.dataset.plan;
      window.dataLayer.push(interaction);
    });
  });
})();
