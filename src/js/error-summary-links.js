(function () {
  document.addEventListener("click", event => {
    const link = event.target.closest && event.target.closest(".error-summary a[href^='#']");
    if (!link) return;

    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#")) return;

    const id = href.slice(1);
    const target = document.getElementById(id);
    if (!target) return;

    target.focus();

    if (typeof target.setSelectionRange === "function" && typeof target.value === "string") {
      try {
        const end = target.value.length;
        target.setSelectionRange(end, end);
      } catch (e) {}
    }
  });
})();
