
      // Scroll reveal
      const revealEls = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .stagger",
      );
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.15 },
      );
      revealEls.forEach((el) => io.observe(el));

      // Scroll progress bar
      const progressBar = document.getElementById("scrollProgress");
      function updateProgress() {
        const h = document.documentElement;
        const scrolled = h.scrollTop;
        const max = h.scrollHeight - h.clientHeight;
        progressBar.style.width = (max > 0 ? (scrolled / max) * 100 : 0) + "%";
      }
      document.addEventListener("scroll", updateProgress, { passive: true });
      updateProgress();

      // Subtle parallax on hero portrait
      const heroPortrait = document.querySelector(".hero-portrait");
      function updateParallax() {
        if (!heroPortrait) return;
        const y = window.scrollY;
        if (y < window.innerHeight) {
          heroPortrait.style.transform = `translateY(${y * 0.08}px)`;
        }
      }
      document.addEventListener("scroll", updateParallax, { passive: true });

      // FAQ accordion
      document.querySelectorAll(".faq-item").forEach((item) => {
        const q = item.querySelector(".faq-q"),
          a = item.querySelector(".faq-a");
        q.addEventListener("click", () => {
          const isOpen = item.classList.contains("open");
          document.querySelectorAll(".faq-item.open").forEach((o) => {
            o.classList.remove("open");
            o.querySelector(".faq-a").style.maxHeight = null;
          });
          if (!isOpen) {
            item.classList.add("open");
            a.style.maxHeight = a.scrollHeight + "px";
          }
        });
      });

      // Theme toggle (persisted) — light is the default
      const rootEl = document.documentElement;
      const themeBtn = document.getElementById("themeToggle");
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark") {
        rootEl.setAttribute("data-theme", "dark");
      }
      themeBtn.addEventListener("click", () => {
        const isDark = rootEl.getAttribute("data-theme") === "dark";
        if (isDark) {
          rootEl.removeAttribute("data-theme");
          localStorage.setItem("theme", "light");
        } else {
          rootEl.setAttribute("data-theme", "dark");
          localStorage.setItem("theme", "dark");
        }
      });

      // Live clock badge
      function tick() {
        const now = new Date();
        const h = String(now.getHours()).padStart(2, "0");
        const m = String(now.getMinutes()).padStart(2, "0");
        document.getElementById("clock").textContent = `${h}:${m}`;
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        document.getElementById("daylabel").textContent =
          `${days[now.getDay()]} ${now.getDate()}/${now.getMonth() + 1}`;
      }
      tick();
      setInterval(tick, 15000);
      if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});