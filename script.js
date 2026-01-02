// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// FAQ Accordion Functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };

        // Here you would typically send the data to a server
        // For now, we'll just show an alert
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Add scroll effect to header
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    }
    
    lastScroll = currentScroll;
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .faq-item, .about-text');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Hero Background Image Rotation
(function(){
    function initHeroRotation() {
        const imgs = document.querySelectorAll(".bg-tile img");
        
        if (imgs.length === 0) {
            return; // Exit if no images found
        }

        // Build pool from actual image sources in the HTML
        const pool = Array.from(imgs).map(img => img.src);
        
        // Remove duplicates
        const uniquePool = [...new Set(pool)];

        // Preload all images
        uniquePool.forEach(src => { 
            const i = new Image(); 
            i.src = src; 
        });

        function rotate(){
            if (imgs.length === 0 || uniquePool.length === 0) return;
            
            const img = imgs[Math.floor(Math.random() * imgs.length)];
            const next = uniquePool[Math.floor(Math.random() * uniquePool.length)];

            // Don't rotate if it's the same image
            if (img.src === next) return;

            img.style.transition = "opacity 400ms ease";
            img.style.opacity = "0";

            setTimeout(() => {
                img.src = next;
                img.style.opacity = "1";
            }, 420);
        }

        // Start rotation after a short delay
        setTimeout(() => {
            setInterval(rotate, 1400); // slow + elegant
        }, 1000);
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeroRotation);
    } else {
        initHeroRotation();
    }
})();

// Services Toggle Functionality
(function() {
    const schoolsBtn = document.getElementById('schools-btn');
    const schoolsContent = document.getElementById('schools-content');
    
    if (schoolsBtn && schoolsContent) {
        schoolsBtn.addEventListener('click', function() {
            const isHidden = schoolsContent.style.display === 'none' || schoolsContent.classList.contains('hidden');
            
            if (isHidden) {
                // Show content
                schoolsContent.classList.remove('hidden');
                schoolsContent.style.display = 'grid';
                // Trigger reflow for animation
                void schoolsContent.offsetHeight;
                schoolsContent.style.opacity = '1';
                schoolsContent.style.maxHeight = schoolsContent.scrollHeight + 'px';
                schoolsBtn.classList.add('active');
            } else {
                // Hide content
                schoolsContent.style.maxHeight = schoolsContent.scrollHeight + 'px';
                // Trigger reflow
                void schoolsContent.offsetHeight;
                schoolsContent.style.opacity = '0';
                schoolsContent.style.maxHeight = '0px';
                setTimeout(() => {
                    schoolsContent.style.display = 'none';
                    schoolsContent.classList.add('hidden');
                }, 400);
                schoolsBtn.classList.remove('active');
            }
        });
    }
})();

