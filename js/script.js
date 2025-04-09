document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle the housing search form submission
    const housingSearchForm = document.getElementById('housing-search-form');
    if (housingSearchForm) {
        housingSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const university = document.getElementById('university').value;
            const email = document.getElementById('email').value;
            const moveDate = document.getElementById('move-date').value;
            
            // Here you would typically send this data to your server
            // For demonstration, we'll just show an alert
            
            alert(`Thank you! We'll send housing options near ${university} to ${email} soon.`);
            
            // Optional: Clear form or redirect
            // housingSearchForm.reset();
            // window.location.href = '/thank-you';
        });
    }

    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Here you would send this to your newsletter service
            
            alert(`Thank you for subscribing to our housing updates with ${email}!`);
            
            // Reset the form
            newsletterForm.reset();
        });
    }
    
    // Additional interactive features could be added here
    // For example, form validation, image sliders, etc.
});
