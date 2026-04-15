document.addEventListener('DOMContentLoaded', () => {

    // 1. Navigation Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const navOverlay = document.getElementById('nav-overlay');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        menuBtn.classList.toggle('active');
        navOverlay.classList.toggle('open');
        
        // Prevent body scroll when menu is open
        if (navOverlay.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    menuBtn.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navOverlay.classList.contains('open')) {
                toggleMenu();
            }
        });
    });


    // 2. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Add 'active' class when element comes into view
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Optional: Stop observing once animated
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Elements to observe
    const elementsToAnim = [
        ...document.querySelectorAll('.animate-up'),
        ...document.querySelectorAll('.reveal-left'),
        ...document.querySelectorAll('.reveal-right'),
        ...document.querySelectorAll('.reveal-bottom'),
        ...document.querySelectorAll('.reveal-fade')
    ];

    elementsToAnim.forEach(el => {
        observer.observe(el);
    });

    // 3. Trigger initial hero entry animations right away
    setTimeout(() => {
        const heroAnims = document.querySelectorAll('#hero .animate-up');
        heroAnims.forEach(el => {
            el.classList.add('active');
        });
    }, 100);

    // 4. Horizontal Scroll Enhancements (Optional: Mouse wheel scroll translation)
    const horizontalContainer = document.querySelector('.horizontal-scroll-container');
    if (horizontalContainer && window.innerWidth > 1024) {
        horizontalContainer.addEventListener('wheel', (evt) => {
            // Prevent default vertical scroll ONLY if the container can still scroll horizontally
            const maxScrollLeft = horizontalContainer.scrollWidth - horizontalContainer.clientWidth;
            
            if (
                (evt.deltaY > 0 && horizontalContainer.scrollLeft < maxScrollLeft) || 
                (evt.deltaY < 0 && horizontalContainer.scrollLeft > 0)
            ) {
                evt.preventDefault();
                horizontalContainer.scrollLeft += evt.deltaY;
            }
        });
    }
});
