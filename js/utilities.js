const scrollSignal = document.querySelector(".scroll-signal");
function hideScroll() {
  const scrolled = window.scrollY;
  if (scrolled > 700) {
    scrollSignal.style.display = "none";
  } else {
    scrollSignal.style.display = "block";
  }
}
window.onscroll = hideScroll;
