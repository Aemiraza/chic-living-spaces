document.addEventListener('DOMContentLoaded', () => {
    
    // Header Scroll Effect
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Parallax Effect for Hero Background
    const parallaxBg = document.querySelector('.parallax-bg');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (parallaxBg) {
            // Adjust the multiplier to control the intensity of the parallax
            parallaxBg.style.transform = `translateY(${scrolled * 0.4}px)`;
        }
    });

    // Intersection Observer for scroll animations (Fade in up/Fade in)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once it has animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up');
    animatedElements.forEach(el => observer.observe(el));
    
    // Prevent form submission on newsletter (since it's a demo)
    const form = document.querySelector('.newsletter-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = 'Subscribed!';
            btn.style.backgroundColor = '#839788'; // Change to primary green color
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = ''; // Reset
                form.reset();
            }, 3000);
        });
    }

    // Blog Category Filtering logic
    const categoryLinks = document.querySelectorAll('.category-links a');
    const blogItems = document.querySelectorAll('.blog-item');

    if (categoryLinks.length > 0 && blogItems.length > 0) {
        categoryLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all links
                categoryLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                link.classList.add('active');
                
                const filterValue = link.getAttribute('data-filter');
                
                blogItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = ''; // Reset to default layout display
                    } else if (item.getAttribute('data-category') === filterValue) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

});
