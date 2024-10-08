const btnOpen = document.querySelector("#btnOpen");
const btnClose = document.querySelector("#btnClose");
const media = window.matchMedia("(max-width: 800px)");
const navMenuContainer = document.querySelector(".nav_menu-container");
const main = document.querySelector("main");
const navLink = document.querySelectorAll(".nav_link-container");
const sectionLink = document.querySelectorAll(".section-link");
const navContainer = document.querySelector(".nav_container");
const scrollWatcher = document.createElement("div");
const sticking = document.querySelector(".sticking");

// ****** nav bar logic ********
scrollWatcher.setAttribute("data-scroll-watcher", "");
navContainer.before(scrollWatcher);

const navObserver = new IntersectionObserver((entries) => {
  navContainer.classList.toggle("sticking", !entries[0].isIntersecting);
});

navObserver.observe(scrollWatcher);

// hide menu and change to inert for mobile menu

function setupNav(e) {
  if (e.matches) {
    navMenuContainer.setAttribute("inert", "");
    navMenuContainer.style.transition = "none";

    btnOpen.addEventListener("click", openMobileMenu);
    btnClose.addEventListener("click", closeMobileMenu);

    navLink.forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });
  } else {
    closeMobileMenu();
    navMenuContainer.removeAttribute("inert");
    navMenuContainer.style.transition = "";

    btnOpen.removeEventListener("click", openMobileMenu);
    btnClose.removeEventListener("click", closeMobileMenu);

    navLink.forEach((link) => {
      link.removeEventListener("click", closeMobileMenu);
    });
  }
}

// handle mobile menu

function openMobileMenu() {
  btnOpen.setAttribute("aria-expanded", "true");
  navMenuContainer.removeAttribute("inert");
  navMenuContainer.removeAttribute("style");
  main.setAttribute("inert", "");
}

function closeMobileMenu() {
  btnOpen.setAttribute("aria-expanded", "false");
  navMenuContainer.setAttribute("inert", "");
  main.removeAttribute("inert");

  setTimeout(() => {
    navMenuContainer.style.transition = "none";
  }, 500);
}

setupNav(media);

media.addEventListener("change", function (e) {
  setupNav(e);
});


var formElement = document.getElementById("form_container");
var buttonElement = document.getElementById("form_button");
formElement.addEventListener("botpoison-challenge-start", function () {
  buttonElement.setAttribute("disabled", "disabled");
});
formElement.addEventListener("botpoison-challenge-success", function () {
  buttonElement.removeAttribute("disabled");
});
formElement.addEventListener("botpoison-challenge-error", function () {
  buttonElement.removeAttribute("disabled");
});

// Swiper JS

new Swiper('.mini-project-card_wrapper', {
  // Optional parameters
  // direction: 'vertical',
  slidesPerView: 1,
  loop: true,
  spaceBetween: 30,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
    768: {
      slidesPerView: 2
    }
  }
});