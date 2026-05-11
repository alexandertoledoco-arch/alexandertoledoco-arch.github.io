/* =========================================
   ROGER TOLEDO — SPA CORE (FINAL)
   Arquitectura limpia, sin parches
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const home = document.getElementById("home");
  const page = document.getElementById("page");
  const nav = document.querySelector(".nav");
  const navToggle = document.querySelector(".nav-toggle");

  /* =========================
     UTILIDADES
  ========================= */

  function closeMobileNav(){
    if(nav) nav.classList.remove("is-open");
  }

  function resetScroll(){
    window.scrollTo(0, 0);
  }

  function setActiveNav(pageName){
    document.querySelectorAll("[data-page]").forEach(link => {
      link.classList.toggle("active", link.dataset.page === pageName);
    });
  }

  /* =========================
     CARGA DE PÁGINAS (SPA REAL)
  ========================= */

  async function loadPage(pageName, pushState = true){

    // HOME
    if(pageName === "home" || pageName === ""){
      home.style.display = "block";
      page.classList.add("is-hidden");
      page.innerHTML = "";
      setActiveNav("home");
      if(pushState) history.pushState({ page: "home" }, "", "#");
      resetScroll();
      closeMobileNav();
      return;
    }

    // PAGES (ABOUT, ETC)
    try{
      const res = await fetch(`pages/${pageName}.html`);
      if(!res.ok) throw new Error("Page not found");

      const html = await res.text();

      home.style.display = "none";
      page.classList.remove("is-hidden");
      page.innerHTML = html;

      setActiveNav(pageName);
      if(pushState) history.pushState({ page: pageName }, "", `#${pageName}`);

      resetScroll();
      closeMobileNav();

    } catch(err){
      console.error(err);
      page.innerHTML = "<p style='padding:40px'>Página no disponible</p>";
    }
  }

  /* =========================
     NAVEGACIÓN
  ========================= */

  document.querySelectorAll("[data-page]").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const pageName = link.dataset.page;
      loadPage(pageName);
    });
  });

  /* =========================
     BOTÓN HOME (LOGO)
  ========================= */

  const brand = document.querySelector(".brand");
  if(brand){
    brand.addEventListener("click", e => {
      e.preventDefault();
      loadPage("home");
    });
  }

  /* =========================
     BACK / FORWARD
  ========================= */

  window.addEventListener("popstate", e => {
    const pageName = e.state?.page || location.hash.replace("#", "") || "home";
    loadPage(pageName, false);
  });

  /* =========================
     CARGA INICIAL
  ========================= */

  const initialPage = location.hash.replace("#", "") || "home";
  loadPage(initialPage, false);

  /* =========================
     MOBILE NAV
  ========================= */

  if(navToggle && nav){
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("is-open");
    });
  }

});
document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach(el => observer.observe(el));
});
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach(el => observer.observe(el));
});

