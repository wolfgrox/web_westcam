const BRAND_NAME = "WestCam";
const WHATSAPP_NUMBER = "+5491171476048";
const COVERAGE = "AMBA, CABA y Zona Oeste";
const DEFAULT_WA_MESSAGE = "Hola WestCam, necesito...";

const nav = document.querySelector("[data-nav]");
const toggle = document.querySelector("[data-toggle]");
const closeBtn = document.querySelector("[data-close]");
const overlay = document.querySelector("[data-overlay]");
const header = document.querySelector("[data-header]");
const form = document.querySelector("[data-contact-form]");
const feedback = document.querySelector("[data-feedback]");
const year = document.querySelector("[data-year]");
const accordion = document.querySelector("[data-accordion]");

const openMenu = () => {
  nav.classList.add("active");
  overlay.classList.add("active");
  toggle.setAttribute("aria-expanded", "true");
  closeBtn.focus();
};

const closeMenu = () => {
  nav.classList.remove("active");
  overlay.classList.remove("active");
  toggle.setAttribute("aria-expanded", "false");
  toggle.focus();
};

toggle?.addEventListener("click", openMenu);
closeBtn?.addEventListener("click", closeMenu);
overlay?.addEventListener("click", closeMenu);

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && nav.classList.contains("active")) {
    closeMenu();
  }
});

nav?.addEventListener("click", (event) => {
  if (event.target.tagName === "A" && nav.classList.contains("active")) {
    closeMenu();
  }
});

const smoothLinks = document.querySelectorAll('a[href^="#"]');

smoothLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId.length <= 1) {
      return;
    }
    const target = document.querySelector(targetId);
    if (target) {
      event.preventDefault();
      const offset = header?.offsetHeight ?? 0;
      const top = target.getBoundingClientRect().top + window.scrollY - offset + 1;
      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  });
});

accordion?.addEventListener("toggle", (event) => {
  if (event.target.open) {
    accordion.querySelectorAll("details").forEach((item) => {
      if (item !== event.target) {
        item.removeAttribute("open");
      }
    });
  }
});

const isValidPhone = (value) => {
  const normalized = value.replace(/\s+/g, "");
  return /^(\+?\d{8,15})$/.test(normalized);
};

const buildMessage = ({ name, phone, service, zone, message }) => {
  return [
    DEFAULT_WA_MESSAGE,
    `Nombre: ${name}`,
    `Teléfono: ${phone}`,
    `Servicio: ${service}`,
    `Zona: ${zone}`,
    `Mensaje: ${message}`,
  ].join("\n");
};

const updateFeedback = (text, isError = false) => {
  if (!feedback) return;
  feedback.textContent = text;
  feedback.style.color = isError ? "#b42318" : "#0b4db3";
};

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = data.get("nombre").trim();
  const phone = data.get("telefono").trim();
  const service = data.get("servicio");
  const zone = data.get("zona");
  const message = data.get("mensaje").trim();

  if (!name || !phone || !service || !zone || !message) {
    updateFeedback("Completá todos los campos para poder enviarlo.", true);
    return;
  }

  if (!isValidPhone(phone)) {
    updateFeedback("Ingresá un teléfono válido con números y código de área.", true);
    return;
  }

  const fullMessage = buildMessage({
    name,
    phone,
    service,
    zone,
    message,
  });

  const encoded = encodeURIComponent(fullMessage);
  const link = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${encoded}`;
  updateFeedback("Listo. Te abrimos WhatsApp con el mensaje prearmado.");
  window.open(link, "_blank", "noopener");
  form.reset();
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

const animated = document.querySelectorAll(".card, .service-card, .testimonial-card, .map-placeholder");
animated.forEach((element) => {
  element.classList.add("fade-up");
  observer.observe(element);
});

year.textContent = new Date().getFullYear();
