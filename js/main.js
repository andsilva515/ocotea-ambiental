document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".dropdown.open").forEach(d => d.classList.remove("open"));
});

(function () {
  const dropdowns = document.querySelectorAll(".dropdown");

  function closeAll() {
    dropdowns.forEach((d) => {
      d.classList.remove("open");
      const btn = d.querySelector("button");
      if (btn) btn.setAttribute("aria-expanded", "false");
    });
  }

  dropdowns.forEach((d) => {
    const btn = d.querySelector("button");

    btn?.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const willOpen = !d.classList.contains("open");

      // fecha os outros
      closeAll();

      // abre o atual se necessário
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
})();
