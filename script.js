const navToggle = document.querySelector(".nav-toggle");
const menu = document.querySelector(".menu");
const navLinks = document.querySelectorAll(".menu a");
const sections = document.querySelectorAll("main section");
const revealItems = document.querySelectorAll(".reveal");
const tiltCards = document.querySelectorAll(".tilt");
const mediaFrames = document.querySelectorAll(".media-frame");

if (navToggle && menu) {
  navToggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (menu.classList.contains("open")) {
      menu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute("id");
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    });
  },
  {
    rootMargin: "-45% 0px -45% 0px",
    threshold: 0.01
  }
);

sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 6;
    const rotateX = ((y / rect.height) - 0.5) * -6;
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

mediaFrames.forEach((frame) => {
  frame.addEventListener("mousemove", (event) => {
    if (window.innerWidth < 900) return;
    const rect = frame.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    frame.style.transform = `translateY(-2px) rotateX(${(0.5 - y) * 3}deg) rotateY(${(x - 0.5) * 3}deg)`;
  });

  frame.addEventListener("mouseleave", () => {
    frame.style.transform = "";
  });
});

