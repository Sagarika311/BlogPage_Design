
/*        // Search functionality
        document.querySelector('.search-btn').addEventListener('click', function() {
            const searchInput = document.querySelector('.search-input');
            const query = searchInput.value.trim();
            if (query) {
                console.log('Searching for:', query);
                // In a real implementation, this would trigger a search
                alert(`Searching for: "${query}"`);
            }
        });

        // Enter key support for search
        document.querySelector('.search-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                document.querySelector('.search-btn').click();
            }
        });

        // Newsletter form submission
        document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;

            if (name && email) {
                alert('Thank you for subscribing! Welcome to our mindful community.');
                this.reset();
            }
        });

        // Smooth scroll effect for navigation links
        document.querySelectorAll('.nav a, .footer-links a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                console.log('Navigating to:', targetId);
            });
        });

        // Social sharing functionality
        document.querySelectorAll('.social-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const platform = this.classList[1]; // Gets the platform class (facebook, twitter, etc.)
                console.log(`Sharing to ${platform}`);
                alert(`Sharing to ${platform.charAt(0).toUpperCase() + platform.slice(1)}!`);
            });
        });

        // Animate cards on scroll (simple version)
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

        // Apply initial styles and observe elements
        document.querySelectorAll('.post-card, .sidebar-widget').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Favorite/Save functionality
document.querySelectorAll('.favorite-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.classList.toggle('saved');
        const icon = this.querySelector('i');
        if (this.classList.contains('saved')) {
            icon.classList.remove('far'); // outline icon
            icon.classList.add('fas');    // solid icon
            alert("Article saved to favorites!");
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            alert("Removed from favorites.");
        }
    });
});

*/