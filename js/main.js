// ===================================
// Sun Stone Living Spaces - Main JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // Mobile Menu Toggle
    // ===================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = this.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
    
    // ===================================
    // Gallery Filter
    // ===================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const interiorGrid = document.getElementById('interiorGrid');
    const exteriorGrid = document.getElementById('exteriorGrid');
    const galleryWrapper = document.getElementById('galleryWrapper');
    
    // Function to filter gallery
    function filterGallery(filterValue) {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to the correct button
        const activeButton = document.querySelector(`[data-filter="${filterValue}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
        
        // Show/hide grids based on filter and adjust wrapper layout
        if (filterValue === 'all') {
            // Show both grids side by side
            if (galleryWrapper) galleryWrapper.style.gridTemplateColumns = '1fr 1fr';
            if (interiorGrid) interiorGrid.style.display = 'grid';
            if (exteriorGrid) exteriorGrid.style.display = 'grid';
        } else if (filterValue === 'indoor') {
            // Show only interior grid, full width
            if (galleryWrapper) galleryWrapper.style.gridTemplateColumns = '1fr';
            if (interiorGrid) interiorGrid.style.display = 'grid';
            if (exteriorGrid) exteriorGrid.style.display = 'none';
        } else if (filterValue === 'outdoor') {
            // Show only exterior grid, full width
            if (galleryWrapper) galleryWrapper.style.gridTemplateColumns = '1fr';
            if (interiorGrid) interiorGrid.style.display = 'none';
            if (exteriorGrid) exteriorGrid.style.display = 'grid';
        }
    }
    
    if (filterButtons.length > 0) {
        // Check for hash in URL on page load
        const hash = window.location.hash.substring(1); // Remove the # symbol
        if (hash && ['outdoor', 'indoor'].includes(hash)) {
            filterGallery(hash);
        }
        
        // Add click event listeners to filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filterValue = this.getAttribute('data-filter');
                filterGallery(filterValue);
            });
        });
    
    // ===================================
    // Gallery Lightbox
    // ===================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let currentImageIndex = 0;
    let visibleImages = [];
    
    // Function to get all visible gallery images
    function updateVisibleImages() {
        visibleImages = Array.from(document.querySelectorAll('.gallery-item'))
            .filter(item => {
                // Check if item is visible (either no inline style or not set to 'none')
                const display = window.getComputedStyle(item).display;
                return display !== 'none';
            })
            .map(item => ({
                src: item.querySelector('img').src,
                alt: item.querySelector('img').alt,
                title: item.querySelector('.gallery-info h3')?.textContent || '',
                description: item.querySelector('.gallery-info p')?.textContent || ''
            }));
    }
    
    // Function to open lightbox
    function openLightbox(index) {
        updateVisibleImages();
        currentImageIndex = index;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Use setTimeout to ensure the lightbox is fully rendered before showing image
        setTimeout(() => {
            showImage(currentImageIndex);
        }, 50);
    }
    
    // Function to show image
    function showImage(index) {
        if (visibleImages.length === 0) {
            console.log('No visible images found');
            return;
        }
        
        const image = visibleImages[index];
        console.log('Showing image:', image);
        
        if (!lightboxImg || !lightboxCaption) {
            console.error('Lightbox elements not found');
            return;
        }
        
        lightboxImg.src = image.src;
        lightboxImg.alt = image.alt;
        
        // Always show caption with title and description
        const captionHTML = `
            <h3>${image.title || 'Gallery Image'}</h3>
            <p>${image.description || 'No description available'}</p>
        `;
        console.log('Setting caption HTML:', captionHTML);
        lightboxCaption.innerHTML = captionHTML;
        lightboxCaption.style.display = 'block';
        
        // Force a reflow to ensure the caption renders
        lightboxCaption.offsetHeight;
    }
    
    // Function to close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Function to show next image
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
        showImage(currentImageIndex);
    }
    
    // Function to show previous image
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
        showImage(currentImageIndex);
    }
    
    // Add click event to all gallery images
    if (galleryItems.length > 0) {
        galleryItems.forEach((item, index) => {
            const img = item.querySelector('img');
            if (img) {
                img.style.cursor = 'pointer';
                img.addEventListener('click', function() {
                    // Get index among visible items only
                    updateVisibleImages();
                    const visibleIndex = visibleImages.findIndex(vi => vi.src === this.src);
                    if (visibleIndex !== -1) {
                        openLightbox(visibleIndex);
                    }
                });
            }
        });
    }
    
    // Close lightbox events
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    // Navigation events
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPrevImage);
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNextImage);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        }
    });
    }
    
    // ===================================
    // Contact Form Validation & Submission
    // ===================================
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                address: document.getElementById('address').value,
                timeline: document.getElementById('timeline').value,
                message: document.getElementById('message').value,
                newsletter: document.getElementById('newsletter').checked
            };
            
            // Basic validation
            if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.message) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Phone validation (basic)
            const phoneRegex = /^[\d\s\-\(\)]+$/;
            if (!phoneRegex.test(formData.phone)) {
                showFormMessage('Please enter a valid phone number.', 'error');
                return;
            }
            
            // Simulate form submission
            // In production, you would send this data to a server
            console.log('Form Data:', formData);
            
            // Show success message
            showFormMessage('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Scroll to message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }
    
    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
    
    // ===================================
    // Smooth Scroll for Anchor Links
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ===================================
    // Navbar Scroll Effect
    // ===================================
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow when scrolled
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
    
    // ===================================
    // Enhanced Scroll Animations
    // ===================================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const scrollObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add stagger effect
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Add animation classes to elements (but NOT gallery-item to avoid conflict)
    const fadeInElements = document.querySelectorAll('.service-card, .feature, .reason-card, .process-step');
    fadeInElements.forEach((el, index) => {
        el.classList.add('fade-in');
        scrollObserver.observe(el);
    });
    
    // Gallery items with alternating animations
    const galleryItemsForAnimation = document.querySelectorAll('.gallery-item');
    galleryItemsForAnimation.forEach((el, index) => {
        if (index % 2 === 0) {
            el.classList.add('fade-in-left');
        } else {
            el.classList.add('fade-in-right');
        }
        scrollObserver.observe(el);
    });
    
    // Service cards with scale animation
    const serviceCardsLarge = document.querySelectorAll('.service-card-large');
    serviceCardsLarge.forEach(el => {
        el.classList.add('scale-in');
        scrollObserver.observe(el);
    });
    
    // ===================================
    // Parallax Scrolling Effect
    // ===================================
    const parallaxElements = document.querySelectorAll('.hero, .page-header');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + scrolled;
            
            // Only apply parallax if element is in viewport
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const yPos = -(scrolled - elementTop) * 0.5;
                element.style.backgroundPosition = `center ${yPos}px`;
            }
        });
    });
    
    // ===================================
    // Form Input Focus Effects
    // ===================================
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
    
    // ===================================
    // Gallery Image Modal (Optional Enhancement)
    // ===================================
    const galleryImages = document.querySelectorAll('.gallery-image img');
    
    galleryImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            // Create modal overlay
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                cursor: pointer;
            `;
            
            // Create image element
            const modalImg = document.createElement('img');
            modalImg.src = this.src;
            modalImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                border-radius: 10px;
                box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
            `;
            
            modal.appendChild(modalImg);
            document.body.appendChild(modal);
            
            // Close modal on click
            modal.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
            
            // Close modal on ESC key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && document.body.contains(modal)) {
                    document.body.removeChild(modal);
                }
            });
        });
    });
    
    // ===================================
    // Phone Number Formatting
    // ===================================
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = '(' + value;
                } else if (value.length <= 6) {
                    value = '(' + value.slice(0, 3) + ') ' + value.slice(3);
                } else {
                    value = '(' + value.slice(0, 3) + ') ' + value.slice(3, 6) + '-' + value.slice(6, 10);
                }
            }
            e.target.value = value;
        });
    }
    
    console.log('Sun Stone Living Spaces - Website Loaded Successfully');
});

// Made with Bob

    // ===================================
    // Progress Bar on Scroll
    // ===================================
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
    
    // ===================================
    // Ripple Effect on Buttons
    // ===================================
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.classList.add('btn-ripple');
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // ===================================
    // Floating/Pulsing CTA Buttons
    // ===================================
    const ctaButtons = document.querySelectorAll('.btn-large, .hero-buttons .btn-primary');
    ctaButtons.forEach(btn => {
        btn.classList.add('btn-pulse');
    });
    
    // ===================================
    // Gradient Text Effect on Main Headings
    // ===================================
    const mainHeadings = document.querySelectorAll('.hero h1, .section-title');
    mainHeadings.forEach(heading => {
        heading.classList.add('gradient-text');
    });
    
    // ===================================
    // Particle Background for Hero Sections
    // ===================================
    function createParticles(container, count = 30) {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            particlesContainer.appendChild(particle);
        }
        
        container.appendChild(particlesContainer);
    }
    
    // Add particles to hero sections
    const heroSections = document.querySelectorAll('.hero');
    heroSections.forEach(hero => {
        createParticles(hero, 25);
    });
    
