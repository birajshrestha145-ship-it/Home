// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Get filter elements
    const searchFilter = document.getElementById('search-filter');
    const categoryFilters = document.querySelectorAll('.category-filter');
    const priceFilters = document.querySelectorAll('input[name="price"]');
    const ratingFilters = document.querySelectorAll('input[name="rating"]');
    const clearBtn = document.querySelector('.btn-filter-clear');
    const serviceCards = document.querySelectorAll('.service-card');

    // Service data for filtering
    const servicesData = {
        'Plumbing Repair': { category: 'plumbing', price: 500, rating: 4.8 },
        'Electrician Work': { category: 'electrical', price: 600, rating: 4.9 },
        'Home Cleaning': { category: 'cleaning', price: 450, rating: 4.7 },
        'Carpentry': { category: 'carpentry', price: 550, rating: 4.6 }
    };

    function filterServices() {
        const searchTerm = searchFilter.value.toLowerCase();
        const selectedCategories = Array.from(categoryFilters)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
        const selectedPrice = Array.from(priceFilters).find(r => r.checked)?.value || 'all';
        const selectedRating = Array.from(ratingFilters).find(r => r.checked)?.value || 'all';

        serviceCards.forEach(card => {
            const title = card.querySelector('h3').textContent;
            const priceText = card.querySelector('.price').textContent;
            const price = parseInt(priceText.match(/\d+/)[0]);
            const ratingText = card.querySelector('.stars').textContent;
            const rating = parseFloat(ratingText.match(/[\d.]+/)[0]);
            const category = getCategory(title);

            let show = true;

            // Check search
            if (searchTerm && !title.toLowerCase().includes(searchTerm)) {
                show = false;
            }

            // Check category
            if (selectedCategories.length > 0 && !selectedCategories.includes(category)) {
                show = false;
            }

            // Check price
            if (selectedPrice !== 'all') {
                if (selectedPrice === '0-300' && price > 300) show = false;
                if (selectedPrice === '300-500' && (price < 300 || price > 500)) show = false;
                if (selectedPrice === '500-700' && (price < 500 || price > 700)) show = false;
                if (selectedPrice === '700+' && price < 700) show = false;
            }

            // Check rating
            if (selectedRating !== 'all') {
                if (selectedRating === '4.5' && rating < 4.5) show = false;
                if (selectedRating === '4.0' && rating < 4.0) show = false;
                if (selectedRating === '3.5' && rating < 3.5) show = false;
            }

            card.style.display = show ? 'block' : 'none';
        });
    }

    function getCategory(title) {
        const lower = title.toLowerCase();
        if (lower.includes('plumb')) return 'plumbing';
        if (lower.includes('electric') || lower.includes('electrical')) return 'electrical';
        if (lower.includes('clean')) return 'cleaning';
        if (lower.includes('carpent')) return 'carpentry';
        if (lower.includes('paint')) return 'painting';
        if (lower.includes('landscape')) return 'landscaping';
        return '';
    }

    // Add event listeners
    if (searchFilter) {
        searchFilter.addEventListener('input', filterServices);
    }

    categoryFilters.forEach(filter => {
        filter.addEventListener('change', filterServices);
    });

    priceFilters.forEach(filter => {
        filter.addEventListener('change', filterServices);
    });

    ratingFilters.forEach(filter => {
        filter.addEventListener('change', filterServices);
    });

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            searchFilter.value = '';
            categoryFilters.forEach(cb => cb.checked = false);
            priceFilters.forEach(r => r.checked = false);
            ratingFilters.forEach(r => r.checked = false);
            filterServices();
        });
    }

    // Check for query parameters
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get('search');
    const categoryQuery = params.get('category');
    
    if (searchQuery) {
        searchFilter.value = searchQuery;
        filterServices();
    }
    
    if (categoryQuery) {
        const categoryCheckbox = Array.from(categoryFilters).find(cb => cb.value === categoryQuery);
        if (categoryCheckbox) {
            categoryCheckbox.checked = true;
            filterServices();
        }
    }
});
