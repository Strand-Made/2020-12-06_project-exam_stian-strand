function mobileNav() {
  const burger = document.querySelector(".burger-menu");
  const nav = document.querySelector(".main-nav-ul");
  burger.addEventListener("click", function () {
    nav.classList.toggle("mobile-nav-active");
  });

  burger.classList.toggle("toggle");
}
mobileNav();
