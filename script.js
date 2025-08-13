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

// Gallery data - will be populated dynamically from Gallery folder
let galleryData = [];

// Function to load gallery images from Gallery folder
async function loadGalleryImages() {
    try {
        // Look for images named image1, image2, etc. up to image10
        const galleryImages = [];
        for (let i = 1; i <= 10; i++) {
            galleryImages.push(`./assets/gallery/image${i}.jpeg`);
        }
        
        let loadedImages = [];
        let totalAttempts = 0;
        
        // Try to load each image with multiple extensions
        const extensions = ['jpeg', 'jpg', 'png', 'webp'];
        
        galleryImages.forEach((baseSrc, index) => {
            const baseName = baseSrc.replace('.jpeg', '');
            let imageLoaded = false;
            
            extensions.forEach(ext => {
                if (imageLoaded) return; // Skip if already loaded
                
                const src = `${baseName}.${ext}`;
                const img = new Image();
                
                img.onload = () => {
                    if (!imageLoaded) {
                        loadedImages.push({
                            id: loadedImages.length + 1,
                            title: `Nail Art ${loadedImages.length + 1}`,
                            description: 'Beautiful nail art design',
                            image: src,
                            category: 'nail-art'
                        });
                        imageLoaded = true;
                        console.log(`Successfully loaded gallery image: ${src}`);
                    }
                    totalAttempts++;
                    checkIfDone();
                };
                
                img.onerror = () => {
                    console.log(`Failed to load gallery image: ${src}`);
                    totalAttempts++;
                    checkIfDone();
                };
                
                img.src = src;
            });
        });
        
        function checkIfDone() {
            if (totalAttempts >= galleryImages.length * extensions.length) {
                
                
                if (loadedImages.length > 0) {
                    // Use loaded gallery images
                    galleryData = loadedImages;
                    populateGallery();
                    
                } else {
                    // Fallback to original images
                    galleryData = [
                        {
                            id: 1,
                            title: 'Gel Nail Art',
                            description: 'Beautiful pink gel nails with floral design',
                            image: './assets/sample nail 2.jpg',
                            category: 'gel'
                        },
                        {
                            id: 2,
                            title: 'Acrylic Extensions',
                            description: 'Long acrylic nails with ombre effect',
                            image: './assets/sample nail 2.jpg',
                            category: 'acrylic'
                        }
                    ];
                    populateGallery();
                    
                }
            }
        }
        
    } catch (error) {
        
    }
}

// Populate gallery
function populateGallery() {
    if (!galleryGrid) return;
    
    
    galleryGrid.innerHTML = '';
    
    galleryData.forEach((item, index) => {
        
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-id', item.id);
        galleryItem.setAttribute('data-title', item.title);
        galleryItem.setAttribute('data-description', item.description);
        galleryItem.setAttribute('data-image', item.image);
        
        galleryItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
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
                // Also add the CSS class for consistency
                if (entry.target.classList.contains('fade-in-up')) {
                    entry.target.classList.add('animate');
                }
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
            opacity: 0;
        }
        
        .gallery-item img[style*="display: none"] + .gallery-overlay {
            opacity: 1;
            background: linear-gradient(135deg, #ff7ba7, #d45579);
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
        
        /* Mobile responsive gallery overlay */
        @media (max-width: 768px) {
            .gallery-overlay {
                padding: 0.8rem;
                border-radius: 10px;
            }
            
            .gallery-overlay h3 {
                font-size: 1.2rem;
                margin-bottom: 0.3rem;
            }
            
            .gallery-overlay p {
                font-size: 0.9rem;
            }
        }
        
        @media (max-width: 480px) {
            .gallery-overlay {
                padding: 0.6rem;
                border-radius: 8px;
            }
            
            .gallery-overlay h3 {
                font-size: 1rem;
                margin-bottom: 0.2rem;
            }
            
            .gallery-overlay p {
                font-size: 0.8rem;
            }
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

// Function to load images from scroll folder
async function loadScrollImages() {
    try {
        const scrollContainer = document.querySelector('.scrolling-nails-container');
        if (!scrollContainer) return;
        
        // Clear existing content
        scrollContainer.innerHTML = '';
        
        // Look for images named image1, image2, etc. to image10
        const scrollImages = [];
        for (let i = 1; i <= 10; i++) {
            scrollImages.push(`./assets/scroll/image${i}.jpg`);
        }
        
        let loadedImages = [];
        let totalAttempts = 0;
        
        // Try to load each image with multiple extensions
        const extensions = ['jpeg', 'jpg', 'png', 'webp'];
        
        scrollImages.forEach((baseSrc, index) => {
            const baseName = baseSrc.replace('.jpg', '');
            let imageLoaded = false;
            
            extensions.forEach(ext => {
                if (imageLoaded) return; // Skip if already loaded
                
                const src = `${baseName}.${ext}`;
                const img = new Image();
                
                img.onload = () => {
                    if (!imageLoaded) {
                        loadedImages.push(src);
                        imageLoaded = true;
                        
                    }
                    totalAttempts++;
                    checkIfDone();
                };
                
                img.onerror = () => {
                    totalAttempts++;
                    checkIfDone();
                };
                
                img.src = src;
            });
        });
        
        function checkIfDone() {
            if (totalAttempts >= scrollImages.length * extensions.length) {
                
                
                if (loadedImages.length > 0) {
                    // Use loaded scroll images with no consecutive duplicates
                    const shuffledImages = [...loadedImages];
                    
                    // Create a sequence that prevents consecutive duplicates
                    const sequence = [];
                    for (let i = 0; i < 6; i++) { // Create 6 sets for smooth looping
                        // Shuffle the array for each set to ensure variety
                        const shuffled = [...shuffledImages].sort(() => Math.random() - 0.5);
                        sequence.push(...shuffled);
                    }
                    
                    sequence.forEach(src => {
                        const nailDiv = document.createElement('div');
                        nailDiv.className = 'scrolling-nail';
                        const img = document.createElement('img');
                        img.src = src;
                        img.alt = 'Nail Art Sample';
                        nailDiv.appendChild(img);
                        scrollContainer.appendChild(nailDiv);
                    });
                    
                } else {
                    // Fallback to original images
                    const fallbackImages = [
                        './assets/sample nail.jpg',
                        './assets/sample nail 2.jpg'
                    ];
                    
                    fallbackImages.forEach(src => {
                        for (let i = 0; i < 5; i++) {
                            const nailDiv = document.createElement('div');
                            nailDiv.className = 'scrolling-nail';
                            const img = document.createElement('img');
                            img.src = src;
                            img.alt = 'Nail Art Sample';
                            nailDiv.appendChild(img);
                            scrollContainer.appendChild(nailDiv);
                        }
                    });
                    
                }
            }
        }
        
    } catch (error) {
        
    }
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
    
    // Force scroll to top on mobile devices
    function forceScrollToTop() {
        // Multiple methods to ensure scroll to top works on all devices
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        // Force scroll after a short delay for mobile
        setTimeout(() => {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }, 100);
        
        // Additional mobile-specific scroll reset
        if (window.innerWidth <= 768) {
            setTimeout(() => {
                window.scrollTo(0, 0);
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
            }, 500);
        }
    }
    
    // Always scroll to top on page load - no hash navigation
    forceScrollToTop();
    
    // Initialize gallery
    loadGalleryImages();
    
    // Load scroll images
    loadScrollImages();
    
    // Setup animations
    setupAnimations();
    

    

    
    // Add CSS animations
    addCSSAnimations();
    
    // Create scroll to top button
    createScrollToTop();
    
    // Ensure scrolling animation starts properly
    ensureScrollingAnimation();
    
    // Load the mark image dynamically
    loadMarkImage();
    
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
                const href = link.getAttribute('href');
                
                // Check if this is a cross-page navigation (contains index.html)
                if (href.includes('index.html')) {
                    // Allow default navigation for cross-page links
                    return;
                }
                
                // For same-page navigation, prevent default and smooth scroll
                e.preventDefault();
                smoothScrollTo(href);
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
        scrollingContainer.style.animation = 'scrollNails 90s linear infinite';
        
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
            // Use same timing for both mobile and desktop
            const isMobile = window.innerWidth <= 768;
            const animationDuration = '90s';
            scrollingContainer.style.animation = `scrollNails ${animationDuration} linear infinite`;
        }, 100);
    }
}



    // Set current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    

    
    // Ensure page starts at top when loaded
    window.addEventListener('load', function() {
        // Always scroll to top on page load/reload
        forceScrollToTop();
    });
    
    // Also ensure page starts at top when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        // Scroll to top immediately when DOM is ready
        forceScrollToTop();
    });

    // Apply throttling to scroll events
    window.addEventListener('scroll', throttle(handleHeaderScroll, 16));
    
    // Load the mark image dynamically
    function loadMarkImage() {
        const container = document.getElementById('mark-image-container');
        if (container) {
            console.log('Loading mark image dynamically...');
            const img = document.createElement('img');
            img.src = './assets/mark.jpeg';
            img.alt = 'Mark';
            img.className = 'mark-photo';
            img.style.cssText = 'max-width: 100%; height: auto;';
            
            img.onload = function() {
                console.log('Mark image loaded successfully via JavaScript');
                container.innerHTML = '';
                container.appendChild(img);
            };
            
            img.onerror = function() {
                console.log('Mark image failed to load via JavaScript');
                container.innerHTML = '<p style="color: red;">Failed to load image</p>';
            };
        }
    }
    
    // Call loadMarkImage after a short delay to ensure DOM is ready
    setTimeout(loadMarkImage, 100);
    
    // Check animation support and add fallbacks
    function checkAnimationSupport() {
        const scrollingContainer = document.querySelector('.scrolling-nails-container');
        if (!scrollingContainer) return;
        
        // Force mobile fallback for better reliability
        const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            console.log('Mobile device detected, using CSS animation with fallback');
            
            // Try CSS animation first, but have JavaScript fallback ready
            const animationSupported = CSS.supports('animation', 'scrollNails 1s linear infinite');
            
            if (animationSupported) {
                // Use CSS animation but ensure it's running
                scrollingContainer.style.animationPlayState = 'running';
                scrollingContainer.style.webkitAnimationPlayState = 'running';
                
                // Monitor if animation stops working
                let lastTransform = '';
                const checkAnimation = setInterval(() => {
                    const currentTransform = scrollingContainer.style.transform;
                    if (currentTransform === lastTransform && currentTransform !== '') {
                        // Animation stopped, switch to JavaScript fallback
                        console.log('CSS animation stopped, switching to JavaScript fallback');
                        clearInterval(checkAnimation);
                        startJavaScriptScrolling();
                    }
                    lastTransform = currentTransform;
                }, 1000);
                
            } else {
                // CSS animation not supported, use JavaScript fallback
                startJavaScriptScrolling();
            }
            
            function startJavaScriptScrolling() {
                scrollingContainer.classList.add('no-animation');
                scrollingContainer.style.animation = 'none';
                scrollingContainer.style.webkitAnimation = 'none';
                
                let scrollPosition = 0;
                const scrollSpeed = 1;
                
                function mobileScroll() {
                    scrollPosition -= scrollSpeed;
                    if (scrollPosition <= -scrollingContainer.scrollWidth / 2) {
                        scrollPosition = 0;
                    }
                    scrollingContainer.style.transform = `translateX(${scrollPosition}px)`;
                    requestAnimationFrame(mobileScroll);
                }
                
                mobileScroll();
            }
            
        } else {
            // Desktop: Check if CSS animations are supported
            const animationSupported = CSS.supports('animation', 'scrollNails 1s linear infinite');
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            
            if (!animationSupported || prefersReducedMotion) {
                console.log('Animations not supported or reduced motion preferred, using fallback');
                scrollingContainer.classList.add('no-animation');
                
                // Create a simple manual scroll effect as fallback
                let scrollPosition = 0;
                const scrollSpeed = 1;
                
                function manualScroll() {
                    scrollPosition -= scrollSpeed;
                    if (scrollPosition <= -scrollingContainer.scrollWidth / 2) {
                        scrollPosition = 0;
                    }
                    scrollingContainer.style.transform = `translateX(${scrollPosition}px)`;
                    requestAnimationFrame(manualScroll);
                }
                
                manualScroll();
            } else {
                console.log('Animations supported, using CSS animation');
                // Ensure animation is running
                scrollingContainer.style.animationPlayState = 'running';
            }
        }
    }
    
    // Call animation support check
    setTimeout(checkAnimationSupport, 500);