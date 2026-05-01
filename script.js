// COMPLETE WORKING JAVASCRIPT
        gsap.registerPlugin(ScrollTrigger);
        
        // Elements
        const loader = document.getElementById('loader');
        const navbar = document.getElementById('navbar');
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        const bookingModal = document.getElementById('bookingModal');
        const bookingForm = document.getElementById('bookingForm');
        const bookBtns = document.querySelectorAll('.book-btn');
        const closeBtn = document.querySelector('.close');

        // Loader
        window.addEventListener('load', () => {
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }, 500);
            }, 2000);
        });

        // Navbar
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });

        // Mobile Menu
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', e => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                target?.scrollIntoView({ behavior: 'smooth' });
            });
        });

        // Booking Modal
        bookBtns.forEach(btn => {
            btn.addEventListener('click', e => {
                e.preventDefault();
                bookingModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });

        closeBtn.addEventListener('click', () => {
            bookingModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        window.addEventListener('click', e => {
            if (e.target === bookingModal) {
                bookingModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Booking Form
        bookingForm.addEventListener('submit', e => {
            e.preventDefault();
            const btn = bookingForm.querySelector('button[type="submit"]');
            const text = btn.textContent;
            btn.textContent = 'Booked! 🎉';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.textContent = text;
                btn.disabled = false;
                bookingModal.style.display = 'none';
                document.body.style.overflow = 'auto';
                bookingForm.reset();
                alert('✅ Appointment booked! We will call to confirm.');
            }, 2000);
        });

        // Service Cards Click
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('click', () => {
                const service = card.dataset.service;
                bookBtns[0].click();
                setTimeout(() => {
                    const select = bookingForm.querySelector('select');
                    if (select && service) select.value = service;
                }, 300);
            });
        });

        // GSAP Animations
        gsap.from('.hero-title', {duration: 1.2, y: 80, opacity: 0, ease: 'power3.out'});
        gsap.from('.hero-subtitle', {duration: 1, y: 50, opacity: 0, delay: 0.3});
        gsap.from('.hero-buttons .btn', {duration: 0.8, y: 50, opacity: 0, delay: 0.6, stagger: 0.2});

        // Services Animation
        gsap.set('.service-card', {y: 60, opacity: 0, scale: 0.9});
        ScrollTrigger.create({
            trigger: '.services',
            start: 'top 80%',
            onEnter: () => {
                gsap.to('.service-card', {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'back.out(1.7)'
                });
            }
        });

        // Other Animations
        ['.feature', '.testimonial-card', '.gallery-item'].forEach(selector => {
            gsap.utils.toArray(selector).forEach((el, i) => {
                gsap.from(el, {
                    scrollTrigger: {trigger: el, start: 'top 85%'},
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    delay: i * 0.1
                });
            });
        });