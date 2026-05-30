document.addEventListener("DOMContentLoaded", function () {
  // Contact form submission
  const contactForm = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const submitSpinner = document.getElementById("submitSpinner");
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Disable submit button and show spinner
    submitBtn.disabled = true;
    submitSpinner.classList.remove("hidden");

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };
    try {
      const response = await fetch("contact.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      // Create notification
      const notification = document.createElement("div");
      notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
        result.success ? "bg-green-500" : "bg-red-500"
      } text-white transform transition-all duration-500 translate-x-full`;
      notification.innerHTML = `
              <div class="flex items-center">
                  <i class="${
                    result.success
                      ? "ri-checkbox-circle-line"
                      : "ri-error-warning-line"
                  } text-xl mr-2"></i>
                  <span>${result.message}</span>
              </div>
          `;
      document.body.appendChild(notification);
      // Animate notification
      setTimeout(() => {
        notification.style.transform = "translateX(0)";
      }, 100);
      // Remove notification after 5 seconds
      setTimeout(() => {
        notification.style.transform = "translateX(full)";
        setTimeout(() => {
          notification.remove();
        }, 500);
      }, 5000);
      if (result.success) {
        contactForm.reset();
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // Re-enable submit button and hide spinner
      submitBtn.disabled = false;
      submitSpinner.classList.add("hidden");
    }
  });
  // Scroll animation observer
  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );
  // Add animation classes and observe elements
  document.querySelectorAll("section").forEach((section) => {
    section.classList.add("scroll-fade-up");
    scrollObserver.observe(section);
  });
  document.querySelectorAll(".grid").forEach((grid) => {
    grid.classList.add("scroll-stagger-children");
    scrollObserver.observe(grid);
  });
  document.querySelectorAll(".card-highlight").forEach((card) => {
    card.classList.add("scroll-scale-up");
    scrollObserver.observe(card);
  });
  document.querySelectorAll(".skill-tag").forEach((tag) => {
    tag.classList.add("scroll-fade-in");
    scrollObserver.observe(tag);
  });
  // Create cursor glow effect
  const cursorGlow = document.createElement("div");
  cursorGlow.className = "cursor-glow";
  document.body.appendChild(cursorGlow);
  // Update cursor glow position
  document.addEventListener("mousemove", (e) => {
    cursorGlow.style.left = e.clientX + "px";
    cursorGlow.style.top = e.clientY + "px";
    // Parallax effect for floating elements
    const floatingElements = document.querySelectorAll(".floating-element");
    floatingElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / 30;
      const deltaY = (e.clientY - centerY) / 30;
      element.style.transform = `perspective(1000px) rotateX(${-deltaY}deg) rotateY(${deltaX}deg)`;
    });
  });
  // Add depth effect to cards
  const cards = document.querySelectorAll(".card-highlight");
  cards.forEach((card) => {
    card.classList.add("floating-element");
    const depthLayer = document.createElement("div");
    depthLayer.className = "depth-layer";
    card.appendChild(depthLayer);
  });
  // Create interactive background particles
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "0";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  let particles = [];
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
      const colors = [
        "rgba(255, 255, 255, ",
        "rgba(147, 51, 234, ",
        "rgba(100, 149, 237, ",
      ];
      this.color =
        colors[Math.floor(Math.random() * colors.length)] +
        (Math.random() * 0.7 + 0.3) +
        ")";
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
      if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  function createParticles() {
    for (let i = 0; i < 100; i++) {
      particles.push(new Particle());
    }
  }
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });
    requestAnimationFrame(animateParticles);
  }
  createParticles();
  animateParticles();
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });
  // Interactive background stars effect
  let lastX = 0;
  let lastY = 0;
  let throttleTimer;
  const createStar = (x, y) => {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    document.body.appendChild(star);
    setTimeout(() => {
      star.remove();
    }, 1500);
  };
  const throttle = (callback, limit) => {
    if (!throttleTimer) {
      throttleTimer = setTimeout(() => {
        callback();
        throttleTimer = null;
      }, limit);
    }
  };
  document.addEventListener("mousemove", (e) => {
    throttle(() => {
      const deltaX = Math.abs(e.clientX - lastX);
      const deltaY = Math.abs(e.clientY - lastY);
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      if (distance > 5) {
        for (let i = 0; i < 3; i++) {
          const offsetX = (Math.random() - 0.5) * 20;
          const offsetY = (Math.random() - 0.5) * 20;
          createStar(e.clientX + offsetX, e.clientY + offsetY);
        }
        lastX = e.clientX;
        lastY = e.clientY;
      }
    }, 50);
  });
});