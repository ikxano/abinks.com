document.addEventListener('DOMContentLoaded', function() {
    console.log('Document loaded');
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you shortly.');
            contactForm.reset();
        });
    }

    // Survey form submission
    const surveyForm = document.getElementById('product-survey');
    const thankYouSection = document.getElementById('thank-you');
    
    if (surveyForm && thankYouSection) {
        surveyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Normally, you would send the form data to a server here
            console.log('Survey submitted');
            
            // Hide form and show thank you message
            surveyForm.style.display = 'none';
            document.querySelector('.survey-form').style.display = 'none';
            document.querySelector('.survey-intro').style.display = 'none';
            thankYouSection.style.display = 'block';
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80; // Account for fixed header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
