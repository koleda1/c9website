document.addEventListener('DOMContentLoaded', () => {
    // Handle navigation visibility on scroll
    const nav = document.querySelector('nav');
    let lastScrollY = window.scrollY;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScrollY = window.scrollY;
                
                // Show/hide navigation based on scroll direction
                if (currentScrollY > lastScrollY) {
                    // Scrolling down
                    nav.classList.add('scrolled');
                    nav.classList.remove('visible');
                } else {
                    // Scrolling up
                    nav.classList.remove('scrolled');
                    nav.classList.add('visible');
                }

                lastScrollY = currentScrollY;
                ticking = false;
            });

            ticking = true;
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your form submission logic here
            alert('Thank you for your interest! We will contact you soon.');
            form.reset();
        });
    }
});
