
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

      const timer = window.setInterval(() => {
        value += 1;
        counter.textContent = String(value);

        if (value >= 100) {
          window.clearInterval(timer);

          window.setTimeout(() => {
            splash.classList.add("done");

            window.setTimeout(() => {
              if (splash.parentNode) {
                splash.parentNode.removeChild(splash);
              }
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


      function setMenu(open) {

        hamburger.classList.toggle("open", open);

        hamburger.setAttribute(
          "aria-expanded",
          String(open)
        );

        mobileMenu.classList.toggle("open", open);

        mobileMenu.setAttribute(
          "aria-hidden",
          String(!open)
        );

        document.body.classList.toggle(
          "no-scroll",
          open
        );
      }


      hamburger.addEventListener("click", () => {

        const isOpen =
          hamburger.classList.contains("open");

        setMenu(!isOpen);

      });


      if (backdrop) {

        backdrop.addEventListener(
          "click",
          () => setMenu(false)
        );

      }


      links.forEach((link) => {

        link.addEventListener(
          "click",
          () => setMenu(false)
        );

      });


      document.addEventListener(
        "keydown",
        (event) => {

          if (event.key === "Escape") {
            setMenu(false);
          }

        }
      );

    }


    /* =========================
       ANIMACIONES REVEAL
    ========================= */

    const revealItems =
      document.querySelectorAll(".reveal");


    if (
      "IntersectionObserver" in window
    ) {

      const observer =
        new IntersectionObserver(
          (entries) => {

            entries.forEach((entry) => {

              if (!entry.isIntersecting) {
                return;
              }


              const section =
                entry.target.closest(".section");


              const siblings = section
                ? Array.from(
                    section.querySelectorAll(
                      ".reveal"
                    )
                  )
                : [entry.target];


              const index =
                Math.max(
                  0,
                  siblings.indexOf(
                    entry.target
                  )
                );


              entry.target.style.transitionDelay =
                `${index * 90}ms`;


              entry.target.classList.add(
                "visible"
              );


              observer.unobserve(
                entry.target
              );

            });

          },
          {
            threshold: 0.12
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


    /* =========================
       MOSAICO DE IMÁGENES
    ========================= */

    const mosaicGroups = [

      {
        selector: ".hero .masked-card",

        image:
          'url("https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_113640_ccf3cf97-d447-425b-a134-d7b09cc743fc.png&w=1280&q=85")'
      },

      {
        selector: ".gallery .masked-card",

        image:
          'url("https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_114219_414dfe80-f15c-4e25-bf52-b13721f4bd88.png&w=1280&q=85")'
      }

    ];


    function updateMosaic() {

      mosaicGroups.forEach(
        ({ selector, image }) => {

          const cards =
            document.querySelectorAll(
              selector
            );


          if (!cards.length) {
            return;
          }


          cards.forEach((card) => {

            card.style.backgroundImage =
              image;

            card.style.backgroundSize =
              "auto 100vh";

            card.style.backgroundRepeat =
              "no-repeat";


            const rect =
              card.getBoundingClientRect();


            const pageY =
              rect.top +
              window.scrollY;


            const pageX =
              rect.left +
              window.scrollX;


            card.style.backgroundPosition =
              `${-pageX}px ${-pageY}px`;

          });

        }
      );

    }


    /* =========================
       ACTUALIZAR AL CAMBIAR
       EL TAMAÑO DE LA VENTANA
    ========================= */

    let resizeTimer;


    function refreshMosaic() {

      window.clearTimeout(
        resizeTimer
      );


      resizeTimer =
        window.setTimeout(
          updateMosaic,
          50
        );

    }


    updateMosaic();


    window.addEventListener(
      "resize",
      refreshMosaic
    );


    window.addEventListener(
      "load",
      updateMosaic
    );

  });

})();
