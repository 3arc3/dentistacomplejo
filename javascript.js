(() => {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       SPLASH SCREEN
    ========================= */
    const splash = document.getElementById("splash");
    const counter = document.getElementById("counter");

    if (splash && counter) {
      let value = 0;

      const timer = setInterval(() => {
        value++;

        counter.textContent = String(value);

        if (value >= 100) {
          clearInterval(timer);

          setTimeout(() => {
            splash.classList.add("done");

            setTimeout(() => {
              splash.remove();
            }, 900);

          }, 200);
        }
      }, 20);
    }


    /* =========================
       MENÚ MÓVIL
    ========================= */
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobileMenu");

    if (hamburger && mobileMenu) {

      const backdrop =
        mobileMenu.querySelector(".menu-backdrop");

      const links =
        mobileMenu.querySelectorAll("a");

      function openMenu() {
        hamburger.classList.add("open");
        hamburger.setAttribute("aria-expanded", "true");

        mobileMenu.classList.add("open");
        mobileMenu.setAttribute("aria-hidden", "false");

        document.body.classList.add("no-scroll");
      }

      function closeMenu() {
        hamburger.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");

        mobileMenu.classList.remove("open");
        mobileMenu.setAttribute("aria-hidden", "true");

        document.body.classList.remove("no-scroll");
      }

      hamburger.addEventListener("click", () => {

        if (hamburger.classList.contains("open")) {
          closeMenu();
        } else {
          openMenu();
        }

      });

      if (backdrop) {
        backdrop.addEventListener("click", closeMenu);
      }

      links.forEach((link) => {
        link.addEventListener("click", closeMenu);
      });

      document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
          closeMenu();
        }

      });
    }


    /* =========================
       ANIMACIONES REVEAL
    ========================= */
    const revealItems =
      document.querySelectorAll(".reveal");

    if (!revealItems.length) {
      return;
    }

    if ("IntersectionObserver" in window) {

      const observer =
        new IntersectionObserver(
          (entries) => {

            entries.forEach((entry) => {

              if (!entry.isIntersecting) {
                return;
              }

              const section =
                entry.target.closest(".section");

              let siblings = [entry.target];

              if (section) {
                siblings =
                  Array.from(
                    section.querySelectorAll(".reveal")
                  );
              }

              const index =
                Math.max(
                  0,
                  siblings.indexOf(entry.target)
                );

              entry.target.style.transitionDelay =
                `${index * 120}ms`;

              entry.target.classList.add("visible");

              observer.unobserve(entry.target);

            });

          },
          {
            threshold: 0.15
          }
        );

      revealItems.forEach((element) => {
        observer.observe(element);
      });

    } else {

      revealItems.forEach((element) => {
        element.classList.add("visible");
      });

    }

  });

})();
