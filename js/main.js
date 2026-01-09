(function () {
  const dropdowns = document.querySelectorAll(".dropdown");
  dropdowns.forEach(d => {
    const btn = d.querySelector("button");
    btn?.addEventListener("click", (e) => {
      e.preventDefault();
      dropdowns.forEach(x => x !== d && x.classList.remove("open"));
      d.classList.toggle("open");
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown")) {
      dropdowns.forEach(d => d.classList.remove("open"));
    }
  });
})();
