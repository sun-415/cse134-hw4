document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;         // <html>
  const toggle = document.querySelector("theme-toggle");
  if (!toggle) return;

  // Show the toggle (it was hidden by .no-js)
  toggle.classList.remove("no-js");

  const themeButtons = toggle.querySelectorAll("[data-theme-btn]");

  function setTheme(theme) {
    if (!theme) return;

    root.setAttribute("data-theme", theme);
    localStorage.setItem("site-theme", theme);

    // highlight the active button
    themeButtons.forEach((btn) => {
      const isActive = btn.dataset.themeBtn === theme;
      btn.classList.toggle("active-theme", isActive);
    });
  }

  // On page load: use saved theme or system preference (fallback to light)
  const storedTheme = localStorage.getItem("site-theme");
  if (storedTheme) {
    setTheme(storedTheme);
  } else {
    const prefersDark = window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }

  // Wire all theme buttons (light, dark, forest, etc.)
  themeButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const theme = btn.dataset.themeBtn;
      setTheme(theme);
    });
  });
});
