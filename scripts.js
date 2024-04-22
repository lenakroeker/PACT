window.onload = function () {
  // Header Toggle

  const nav = document.querySelector(".nav");
  const hamburger = document.querySelector(".hamburger");
  // Function to toggle nav display
  function toggleNav() {
    if (nav.style.display === "block") {
      nav.style.display = "none";
    } else {
      nav.style.display = "block";
    }
  }

  // Initial toggle based on screen width
  if (window.innerWidth < 868) {
    nav.style.display = "none";
    hamburger.style.display = "block";
  } else {
    nav.style.display = "block";
    hamburger.style.display = "none";
  }

  // Toggle nav on hamburger click
  hamburger.addEventListener("click", toggleNav);
  if (window.innerWidth < 868) {
    nav.addEventListener("click", toggleNav);
  }

  // Toggle nav on window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth < 868) {
      nav.style.display = "none";
      hamburger.style.display = "block";
    } else {
      nav.style.display = "block";
      hamburger.style.display = "none";
    }
  });
  // Header Toggle End
  // Header Background Opacity

  const headerContainer = document.querySelector(".headerContainer");

  function handleHeaderOpacity() {
    const scrollPosition = window.scrollY;
    const opacity = Math.min(scrollPosition / 800, 1);
    headerContainer.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
  }

  window.addEventListener("scroll", handleHeaderOpacity);
  handleHeaderOpacity();

  // Header Background Opacity End
  // Mega Menu

  const shopNavItem = document.querySelector(".shop");
  const megaMenu = document.querySelector(".megaMenu");

  function toggleMegaMenu() {
    megaMenu.classList.toggle("visible");
    shopNavItem.classList.toggle("nav-item-active");
  }

  shopNavItem.addEventListener("click", toggleMegaMenu);
  megaMenu.addEventListener("click", toggleMegaMenu);

  // End Mega Menu
  // Hero Carousel

  const carousel = document.getElementById("carousel");
  const slides = carousel.getElementsByClassName("slide");
  const slideTexts = carousel.getElementsByClassName("slideText");
  const dotsContainer = document.getElementById("selectorDots");
  let slideIndex = 0;
  let timer;

  function showSlide(n) {
    slideIndex = (n + slides.length) % slides.length;
    Array.from(slides).forEach((slide) => (slide.style.display = "none"));
    Array.from(slideTexts).forEach((text) =>
      text.classList.remove("fade-in-hero")
    );
    slides[slideIndex].style.display = "block";
    slideTexts[slideIndex].classList.add("fade-in-hero");
    const dots = dotsContainer.getElementsByClassName("dot");
    Array.from(dots).forEach((dot) => dot.classList.remove("active"));
    dots[slideIndex].classList.add("active");
  }

  function nextSlide() {
    showSlide(slideIndex + 1);
  }

  function prevSlide() {
    showSlide(slideIndex - 1);
  }

  function setupCarousel() {
    Array.from(slides).forEach((slide, index) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      dot.addEventListener("click", () => showSlide(index));
      dotsContainer.appendChild(dot);
    });
    showSlide(0);
    timer = setInterval(nextSlide, 5000);
    carousel.addEventListener("mouseenter", () => clearInterval(timer));
    carousel.addEventListener(
      "mouseleave",
      () => (timer = setInterval(nextSlide, 5000))
    );
  }

  setupCarousel();

  // hero carousel end
  // Product Carousel
  const prevBtnProduct = document.getElementById("prevProduct");
  const nextBtnProduct = document.getElementById("nextProduct");
  const productGallery = document.querySelector(".productGallery");

  function handleProductCarouselScroll() {
    updateButtonOpacities();
  }

  function scrollLeftByCardWidth() {
    const cardWidth = productGallery
      .querySelector(".productCard")
      .getBoundingClientRect().width;
    productGallery.scrollLeft -= cardWidth;
  }

  function scrollRightByCardWidth() {
    const cardWidth = productGallery
      .querySelector(".productCard")
      .getBoundingClientRect().width;
    productGallery.scrollLeft += cardWidth;
  }

  function updateButtonOpacities() {
    prevBtnProduct.style.opacity = productGallery.scrollLeft === 0 ? 0.3 : 1;
    nextBtnProduct.style.opacity =
      productGallery.scrollWidth - productGallery.scrollLeft <=
      productGallery.clientWidth + 1
        ? 0.3
        : 1;
  }

  productGallery.addEventListener("scroll", handleProductCarouselScroll);
  prevBtnProduct.addEventListener("click", scrollLeftByCardWidth);
  nextBtnProduct.addEventListener("click", scrollRightByCardWidth);
  updateButtonOpacities();

  // Product Carousel End
  // title fade in on viewport enter

  const sectionTitles = document.querySelectorAll(".sectionTitle");
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: "0px", threshold: 0.5 }
  );
  sectionTitles.forEach((sectionTitle) => observer.observe(sectionTitle));
};
