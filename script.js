// Scroll-triggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        } else {
            // Remove animation class when element is out of view
            entry.target.classList.remove('animate');
        }
    });
}, observerOptions);

// DOM Elements - will be initialized after DOM loads
let header, navToggle, navMenu, navLinks, contactForm, lightbox, lightboxImg, lightboxCaption, lightboxClose, galleryGrid;

// Header scroll behavior
let lastScrollTop = 0;
let scrollThreshold = 50;
let isHeaderHidden = false;

function handleHeaderScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDelta = scrollTop - lastScrollTop;
    
    // Only trigger if we've scrolled enough
    if (Math.abs(scrollDelta) < 5) return;
    
    if (scrollTop > scrollThreshold) {
        if (scrollDelta > 0 && !isHeaderHidden) {
            // Scrolling down - hide header
            header.classList.add('header-hidden');
            isHeaderHidden = true;
        } else if (scrollDelta < 0 && isHeaderHidden) {
            // Scrolling up - show header
            header.classList.remove('header-hidden');
            isHeaderHidden = false;
        }
    } else {
        // Near top - always show header
        if (isHeaderHidden) {
            header.classList.remove('header-hidden');
            isHeaderHidden = false;
        }
    }
    
    lastScrollTop = scrollTop;
}

// Mobile menu toggle
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
}

// Close mobile menu when clicking on a link
function closeMobileMenu() {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
}

// Smooth scrolling for navigation links
function smoothScrollTo(targetId) {
    const target = document.querySelector(targetId);
    if (target) {
        const headerHeight = header.offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Gallery data - sample nail art images
const galleryData = [
    {
        id: 1,
        title: 'Gel Nail Art',
        description: 'Beautiful pink gel nails with floral design',
        image: './assets/sample nail.jpg',
        category: 'gel'
    },
    {
        id: 2,
        title: 'Acrylic Extensions',
        description: 'Long acrylic nails with ombre effect',
        image: './assets/sample nail 2.jpg',
        category: 'acrylic'
    },
    {
        id: 3,
        title: 'French Manicure',
        description: 'Classic French manicure with white tips',
        image: './assets/sample nail.jpg',
        category: 'manicure'
    },
    {
        id: 4,
        title: 'Nail Art Design',
        description: 'Colorful geometric nail art pattern',
        image: './assets/sample nail 2.jpg',
        category: 'art'
    },
    {
        id: 5,
        title: 'Gel Polish',
        description: 'Shimmering gel polish in rose gold',
        image: './assets/sample nail.jpg',
        category: 'gel'
    },
    {
        id: 6,
        title: '3D Nail Art',
        description: '3D flower decorations on acrylic nails',
        image: './assets/sample nail 2.jpg',
        category: 'acrylic'
    }
];

// Populate gallery
function populateGallery() {
    if (!galleryGrid) return;
    
    galleryGrid.innerHTML = '';
    
    galleryData.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-id', item.id);
        galleryItem.setAttribute('data-title', item.title);
        galleryItem.setAttribute('data-description', item.description);
        galleryItem.setAttribute('data-image', item.image);
        
        galleryItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="gallery-overlay">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;
        
        galleryItem.addEventListener('click', () => openLightbox(item));
        galleryGrid.appendChild(galleryItem);
    });
}

// Lightbox functionality
function openLightbox(item) {
    if (lightbox && lightboxImg && lightboxCaption) {
        lightboxImg.src = item.image;
        lightboxImg.alt = item.title;
        lightboxCaption.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        `;
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Contact form handling
function handleContactForm(event) {
    event.preventDefault();
    
    const formData = new FormData(contactForm);
    const formObject = {};
    
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 3000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Intersection Observer for animations
function setupAnimations() {
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
    const animateElements = document.querySelectorAll('.service-card, .testimonial-card, .stat, .hours-day, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Scroll to top functionality
function createScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #ff7ba7, #d45579);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(255, 107, 157, 0.3);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Add CSS animations
function addCSSAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .gallery-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 123, 167, 0.35);
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: all 0.3s ease;
            color: white;
            text-align: center;
            padding: 1rem;
            border-radius: 15px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 8px 32px rgba(255, 123, 167, 0.15);
        }
        
        .gallery-item:hover .gallery-overlay {
            opacity: 1;
        }
        
        .gallery-overlay h3 {
            margin-bottom: 0.5rem;
            font-size: 1.5rem;
            color: #ffffff;
            font-weight: 600;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .gallery-overlay p {
            font-size: 1.1rem;
            color: #ffffff;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }
        
        .notification-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
    `;
    document.head.appendChild(style);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize DOM elements
    header = document.getElementById('header');
    navToggle = document.getElementById('nav-toggle');
    navMenu = document.getElementById('nav-menu');
    navLinks = document.querySelectorAll('.nav-link');
    contactForm = document.getElementById('contact-form');
    lightbox = document.getElementById('lightbox');
    lightboxImg = document.getElementById('lightbox-img');
    lightboxCaption = document.getElementById('lightbox-caption');
    lightboxClose = document.getElementById('lightbox-close');
    galleryGrid = document.getElementById('gallery-grid');



    // Setup scroll-triggered animations
    const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .scale-in');
    animatedElements.forEach(el => observer.observe(el));
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Clear any hash from URL
    if (window.location.hash) {
        history.replaceState(null, null, window.location.pathname);
    }
    
    // Initialize gallery
    populateGallery();
    
    // Setup animations
    setupAnimations();
    
    // Add CSS animations
    addCSSAnimations();
    
    // Create scroll to top button
    createScrollToTop();
    
    // Ensure scrolling animation starts properly
    ensureScrollingAnimation();
    
    // Event listeners
    if (header) {
        window.addEventListener('scroll', handleHeaderScroll);
    }
    
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }
    
    if (navLinks && navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                smoothScrollTo(targetId);
                closeMobileMenu();
            });
        });
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Lightbox close functionality
    if (lightboxClose) {
        lightboxClose.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeLightbox();
        });
    }
    
    // Close lightbox when clicking outside
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            // Close if clicking on the lightbox background
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && lightbox.style.display === 'block') {
            closeLightbox();
        }
    });
    
    // Smooth scroll for hero scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = aboutSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
    
    // Add hover effects for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add form validation
    if (contactForm) {
        const formInputs = contactForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    input.style.borderColor = '#ff6b6b';
                } else {
                    input.style.borderColor = '#e0e0e0';
                }
            });
            
            input.addEventListener('input', () => {
                if (input.value.trim()) {
                    input.style.borderColor = '#e0e0e0';
                }
            });
        });
    }
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Add counter animation for stats
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                
                let currentValue = 0;
                const increment = numericValue / 50;
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= numericValue) {
                        target.textContent = finalValue;
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(currentValue) + finalValue.replace(/\d+/, '');
                    }
                }, 30);
                
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Ensure scrolling animation starts properly
function ensureScrollingAnimation() {
    const scrollingContainer = document.querySelector('.scrolling-nails-container');
    if (scrollingContainer) {
        // Force a reflow to ensure animation starts
        scrollingContainer.style.animation = 'none';
        scrollingContainer.offsetHeight; // Trigger reflow
        scrollingContainer.style.animation = 'scrollNails 40s linear infinite';
        
        // Also ensure images are loaded and prioritized
        const images = scrollingContainer.querySelectorAll('img');
        images.forEach(img => {
            // Force image to load
            if (img.src) {
                const newImg = new Image();
                newImg.onload = () => {
                    img.style.opacity = '1';
                    img.style.visibility = 'visible';
                };
                newImg.onerror = () => {
                    console.log('Image failed to load:', img.src);
                    img.style.opacity = '0';
                };
                newImg.src = img.src;
            }
            
            // Ensure image is visible
            img.style.opacity = '1';
            img.style.visibility = 'visible';
            img.style.zIndex = '2';
        });
        
        // Force animation restart after a short delay
        setTimeout(() => {
            scrollingContainer.style.animation = 'none';
            scrollingContainer.offsetHeight;
            scrollingContainer.style.animation = 'scrollNails 40s linear infinite';
        }, 100);
    }
}

// Ensure page starts at top when loaded
window.addEventListener('load', function() {
    // Force scroll to top
    window.scrollTo(0, 0);
    
    // Clear any hash from URL
    if (window.location.hash) {
        history.replaceState(null, null, window.location.pathname);
    }
});

    // Apply throttling to scroll events
    window.addEventListener('scroll', throttle(handleHeaderScroll, 16));
    
 