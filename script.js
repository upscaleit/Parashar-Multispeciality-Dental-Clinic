// Parashar Multispeciality Dental Clinic — interactions

(function () {
  "use strict";

  // ---- Mobile nav toggle ----
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.classList.toggle("open", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close menu after tapping a link (mobile)
    nav.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---- One orchestrated entrance: fade the hero in on load ----
  var hero = document.querySelector(".hero");
  if (hero) {
    hero.style.opacity = "0";
    hero.style.transform = "translateY(14px)";
    hero.style.transition = "opacity .7s ease, transform .7s ease";
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        hero.style.opacity = "1";
        hero.style.transform = "translateY(0)";
      });
    });
  }

  // ---- Reveal treatment cards / why-items / reviews as they enter view ----
  var revealTargets = document.querySelectorAll(
    ".treatment-card, .why-item, .review-card, .g-item"
  );

  if ("IntersectionObserver" in window && revealTargets.length) {
    revealTargets.forEach(function (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(16px)";
      el.style.transition = "opacity .5s ease, transform .5s ease";
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            var el = entry.target;
            setTimeout(function () {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }, (i % 4) * 70);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ---- Header shrink shadow on scroll ----
  var header = document.querySelector(".site-header");
  if (header) {
    var lastScroll = 0;
    window.addEventListener(
      "scroll",
      function () {
        var y = window.scrollY;
        if (y > 12 && lastScroll <= 12) {
          header.style.boxShadow = "0 8px 24px -16px rgba(12,82,89,.35)";
        } else if (y <= 12) {
          header.style.boxShadow = "none";
        }
        lastScroll = y;
      },
      { passive: true }
    );
  }
})();
