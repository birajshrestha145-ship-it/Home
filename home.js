// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');

    if (searchInput && searchButton) {
        function performSearch() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            if (searchTerm === '') {
                alert('Please enter a search term');
                return;
            }
            
            // Redirect to services.html with search query parameter
            window.location.href = `services.html?search=${encodeURIComponent(searchTerm)}`;
        }

        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    // Banner Carousel functionality
    const bannerSlides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.dot');
    const bannerCarousel = document.querySelector('.banner-carousel');

    if (bannerSlides.length > 0 && bannerCarousel) {
        let currentSlide = 0;

        function updateCarousel() {
            // Calculate translation - move the carousel to show the current slide
            const translateValue = -currentSlide * 100; // 100% per slide
            bannerCarousel.style.transform = `translateX(${translateValue}%)`;
            
            // Update dots
            dots.forEach((dot, index) => {
                if (index === currentSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        const prevBtn = document.querySelector('.carousel-btn.prev');
        const nextBtn = document.querySelector('.carousel-btn.next');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + bannerSlides.length) % bannerSlides.length;
                updateCarousel();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % bannerSlides.length;
                updateCarousel();
            });
        }

        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateCarousel();
            });
        });

        // Initialize carousel
        updateCarousel();
    }
});

