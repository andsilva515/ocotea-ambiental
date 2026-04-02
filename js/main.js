(function () {
  const dropdowns = document.querySelectorAll(".dropdown");

  function closeAll() {
    dropdowns.forEach((d) => {
      d.classList.remove("open");
      const btn = d.querySelector("button");
      if (btn) btn.setAttribute("aria-expanded", "false");
    });
  }

  // garante tudo fechado ao carregar
  closeAll();

  dropdowns.forEach((d) => {
    const btn = d.querySelector("button");

    btn?.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const willOpen = !d.classList.contains("open");

      closeAll();

      if (willOpen) {
        d.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  // clicar fora fecha tudo
  document.addEventListener("click", () => closeAll());

  // ESC fecha
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAll();
  });

  // clicar em links do dropdown fecha tudo
  document.querySelectorAll(".dropdown-panel a").forEach((link) => {
    link.addEventListener("click", () => closeAll());
  });

  // ===== Categorias colapsáveis no menu Serviços =====
  const serviceCategories = document.querySelectorAll(".dropdown-services-panel .svc-cat");

  serviceCategories.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation(); // não fecha o dropdown principal

      const panel = btn.nextElementSibling;
      const isOpen = btn.getAttribute("aria-expanded") === "true";

      // fecha todas
      serviceCategories.forEach((b) => {
        b.setAttribute("aria-expanded", "false");
        const p = b.nextElementSibling;
        if (p && p.classList.contains("svc-items")) {
          p.hidden = true;
        }
      });

      // abre a atual
      if (!isOpen) {
        btn.setAttribute("aria-expanded", "true");
        if (panel && panel.classList.contains("svc-items")) {
          panel.hidden = false;
        }
      }
    });
  });
})();
