// Loader fade out after page loads
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
  }, 1500);
});

// Light/Dark Mode Toggle
const toggle = document.getElementById("mode-toggle");
toggle.addEventListener("click", () => {
  const html = document.documentElement;
  const current = html.getAttribute("data-theme");
  const newTheme = current === "light" ? "dark" : "light";
  html.setAttribute("data-theme", newTheme);
  
  // Update icon
  const icon = toggle.querySelector("i");
  icon.className = newTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
  
  // Save theme preference
  localStorage.setItem("theme", newTheme);
});

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
  const icon = toggle.querySelector("i");
  icon.classNavvvme = savedTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
}

// Mobile Navigation
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

// Back to Top Button
const backToTopButton = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Smooth scrolling for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth"
      });
    }
  });
});

// Form submission
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Form validation
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    
    if (!name || !email || !message) {
      alert("Please fill in all fields");
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }
    
    alert("Thank you for your message! We'll get back to you soon.");
    contactForm.reset();
  });
}

// Stats counter animation
function animateValue(id, start, end, duration) {
  const obj = document.getElementById(id);
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    obj.innerHTML = value + (id === "stat3" ? "%" : "+");
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Animate stats when in view
const statsSection = document.getElementById("stats");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateValue("stat1", 0, 1500, 2000);
      animateValue("stat2", 0, 850, 2000);
      animateValue("stat3", 0, 98, 2000);
      observer.unobserve(statsSection);
    }
  });
}, { threshold: 0.5 });

observer.observe(statsSection);

// Testimonial slider
let currentSlide = 0;
const slides = document.querySelectorAll(".testimonial-slide");
const dots = document.querySelectorAll(".testimonial-nav button");

function showSlide(n) {
  slides.forEach(slide => slide.classList.remove("active"));
  dots.forEach(dot => dot.classList.remove("active"));
  
  currentSlide = (n + slides.length) % slides.length;
  
  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
  });
});

// Auto slide testimonials
setInterval(() => {
  showSlide(currentSlide + 1);
}, 5000);

// Animation on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll(".feature-card, .section-title, .stats-image, .contact-form");
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementPosition < windowHeight - 100) {
      element.style.opacity = "1";
      element.style.transform = "translate(0)";
    }
  });
};

// Set initial state for animation
document.querySelectorAll(".feature-card, .section-title, .stats-image, .contact-form").forEach(element => {
  element.style.opacity = "0";
  element.style.transform = "translateY(30px)";
  element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
});

window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", animateOnScroll);

window.addEventListener("scroll")