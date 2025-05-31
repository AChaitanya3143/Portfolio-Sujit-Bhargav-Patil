// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenuToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.className = 'fas fa-times';
    } else {
        icon.className = 'fas fa-bars';
    }
});

// Close mobile menu when clicking on a link
navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        navLinks.classList.remove('active');
        mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
    }
});

// Fixed smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop; // Fixed: was getBoundingClientPosition
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // Simple form validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields.');
        return;
    }

    // Simulate form submission
    alert('This feature is coming soon! | I request you to Mail it from the links given below. Thank You 🙂');
    contactForm.reset();
});

// Enhanced animation observer with better skill bar animation
const observerOptions = {
    threshold: 0.2, // Increased threshold for better trigger
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add fade-in animation to the element
            entry.target.classList.add('fade-in-up');

            // Enhanced skill bar animation
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach((bar, index) => {
                const targetWidth = bar.getAttribute('data-width') || bar.style.width;
                bar.setAttribute('data-width', targetWidth); // Store original width
                bar.style.width = '0%';
                bar.style.transition = 'width 1.5s ease-out';

                // Stagger the animation for multiple bars
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, 300 + (index * 200));
            });

            // Animate timeline items with stagger effect
            if (entry.target.classList.contains('timeline-item')) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateX(-50px)';
                entry.target.style.transition = 'all 0.8s ease-out';

                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, 200);
            }

            // Animate project cards with stagger effect
            if (entry.target.classList.contains('project-card')) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(50px)';
                entry.target.style.transition = 'all 0.8s ease-out';

                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
            }

            // Stop observing this element after animation
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Initialize skill bars with data attributes
document.querySelectorAll('.skill-progress').forEach(bar => {
    const width = bar.style.width;
    bar.setAttribute('data-width', width);
    bar.style.width = '0%'; // Start with 0 width
});

// Observe all sections and elements for animation
document.querySelectorAll('section, .timeline-item, .project-card, .skill-category').forEach(el => {
    observer.observe(el);
});

// Enhanced navbar active link highlighting with proper scroll handling
let ticking = false;

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100; // Offset for header

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    // Update active nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateActiveNavLink);
        ticking = true;
    }
});

// Enhanced loading animation
window.addEventListener('load', () => {
    // Add loading class to body initially
    document.body.classList.add('loading');

    setTimeout(() => {
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');

        // Trigger initial animations for visible elements
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.classList.add('fade-in-up');
        }
    }, 300);
});

// Enhanced scroll-to-top functionality
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Show/hide scroll-to-top button with better performance
let scrollToTopBtn = null;

function handleScrollToTopButton() {
    if (window.pageYOffset > 300) {
        if (!scrollToTopBtn) {
            scrollToTopBtn = document.createElement('button');
            scrollToTopBtn.className = 'scroll-to-top';
            scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            scrollToTopBtn.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                background: var(--primary-color);
                color: white;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                font-size: 1.2rem;
                box-shadow: var(--shadow);
                transition: all 0.3s ease;
                z-index: 1000;
                opacity: 0;
                transform: translateY(100px);
            `;

            scrollToTopBtn.addEventListener('click', scrollToTop);
            scrollToTopBtn.addEventListener('mouseenter', () => {
                scrollToTopBtn.style.transform = 'translateY(-5px) scale(1.1)';
            });
            scrollToTopBtn.addEventListener('mouseleave', () => {
                scrollToTopBtn.style.transform = 'translateY(0) scale(1)';
            });

            document.body.appendChild(scrollToTopBtn);

            // Trigger animation
            setTimeout(() => {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.transform = 'translateY(0)';
            }, 100);
        }
    } else {
        if (scrollToTopBtn) {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.transform = 'translateY(100px)';
            setTimeout(() => {
                if (scrollToTopBtn && scrollToTopBtn.parentNode) {
                    scrollToTopBtn.parentNode.removeChild(scrollToTopBtn);
                    scrollToTopBtn = null;
                }
            }, 300);
        }
    }
}

// Throttled scroll handler for better performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(handleScrollToTopButton, 10);
});

// Add intersection observer for hero section animation
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('hero-animated');
        }
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
});

const phoneNumber = '+9987609401';
// Build the final tel: URL (strips anything that isn’t + or 0-9)
document.getElementById('phoneLink').href =
  'tel:' + phoneNumber.replace(/[^+\d]/g, '');

function openQRModal(imageSrc, title, subtitle) {
          const modal = document.getElementById('qrModal');
          const modalImage = document.getElementById('modalQRImage');
          const modalTitle = document.getElementById('modalTitle');
          const modalSubtitle = document.getElementById('modalSubtitle');
          modalImage.src = imageSrc;
          modalTitle.textContent = title;
          modalSubtitle.textContent = subtitle;
          modal.classList.add('show');
          document.body.style.overflow = 'hidden'; // Prevent background scrolling
      }
      function closeQRModal() {
          const modal = document.getElementById('qrModal');
          modal.classList.remove('show');
          document.body.style.overflow = 'auto'; // Restore scrolling
      }
      // Close modal with Escape key
      document.addEventListener('keydown', function(event) {
          if (event.key === 'Escape') {
              closeQRModal();
          }
      });
