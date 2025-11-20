// ===========================
// Particle Background Animation
// ===========================
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 100;

// Particle class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen edges
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = `rgba(0, 217, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize particles
function initParticles() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

// Animate particles
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw connections between nearby particles
    for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i + 1; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                ctx.strokeStyle = `rgba(0, 217, 255, ${0.1 * (1 - distance / 100)})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
    }
    
    // Update and draw particles
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    
    requestAnimationFrame(animateParticles);
}

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// Start particle animation
initParticles();
animateParticles();

// ===========================
// Navigation Functionality
// ===========================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll to sections
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Typewriter Effect
// ===========================
const typewriterElement = document.getElementById('typewriter');
const typewriterText = "I build intelligent applications, automation systems, and robust backends using Python, Java, FastAPI, Node.js, SQL, and MongoDB.";
let charIndex = 0;

function typeWriter() {
    if (charIndex < typewriterText.length) {
        typewriterElement.textContent = typewriterText.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeWriter, 30);
    }
}

// Start typewriter effect after page load
window.addEventListener('load', () => {
    setTimeout(() => {
        typewriterElement.textContent = '';
        typeWriter();
    }, 1000);
});

// ===========================
// Scroll Animations
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe all sections
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    section.classList.add('animate-on-scroll');
    observer.observe(section);
});

// Observe cards and elements
const animatedElements = document.querySelectorAll(
    '.info-card, .skill-category, .project-card, .experience-card, .achievement-card, .education-card'
);
animatedElements.forEach(element => {
    element.classList.add('animate-on-scroll');
    observer.observe(element);
});

// ===========================
// Active Navigation Link
// ===========================
function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ===========================
// Form Submission Handler
// ===========================
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;
    
    // Simple validation
    if (name && email && message) {
        alert(`Thank you, ${name}! Your message has been received. I'll get back to you soon at ${email}.`);
        contactForm.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// ===========================
// Parallax Effect for Hero Section
// ===========================
const heroVisual = document.querySelector('.hero-visual');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (heroVisual) {
        heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ===========================
// Skill Chip Interactions
// ===========================
const skillChips = document.querySelectorAll('.skill-chip');

skillChips.forEach(chip => {
    chip.addEventListener('mouseenter', function() {
        // Add a subtle rotation on hover
        this.style.transform = 'translateY(-5px) scale(1.05) rotate(2deg)';
    });
    
    chip.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
    });
});

// ===========================
// Project Card Tilt Effect
// ===========================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===========================
// Mouse Cursor Trail Effect (Optional)
// ===========================
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Create custom cursor elements (optional enhancement)
function createCursorEffect() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #00d9ff;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX - 10 + 'px';
        cursor.style.top = cursorY - 10 + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
}

// Uncomment to enable custom cursor (only on desktop)
// if (window.innerWidth > 768) {
//     createCursorEffect();
// }

// ===========================
// Performance Optimization
// ===========================
// Reduce particle count on mobile devices
if (window.innerWidth < 768) {
    const mobileParticleCount = 50;
    particlesArray = particlesArray.slice(0, mobileParticleCount);
}

// ===========================
// Loading Animation
// ===========================
window.addEventListener('load', () => {
    // Remove any loading screen if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
    
    // Trigger initial animations
    document.body.classList.add('loaded');
});

// ===========================
// Accessibility: Keyboard Navigation
// ===========================
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===========================
// Dark Mode Toggle (Future Enhancement)
// ===========================
// This is a placeholder for future dark mode functionality
// The site is already in dark mode by default

// ===========================
// Console Message
// ===========================
console.log('%c👋 Hello! Welcome to my portfolio!', 'color: #00d9ff; font-size: 20px; font-weight: bold;');
console.log('%c🚀 Built with passion using HTML, CSS, and JavaScript', 'color: #a855f7; font-size: 14px;');
console.log('%c💼 Looking for internship opportunities in Backend Development & AI/ML', 'color: #14b8a6; font-size: 14px;');
console.log('%c📧 Contact: hcchavda2886@gmail.com', 'color: #00d9ff; font-size: 14px;');