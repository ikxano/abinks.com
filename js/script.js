document.addEventListener('DOMContentLoaded', function() {
    // Video sequence player setup - removed promotion_video.mp4 and dwello_reservation.mp4
    const videoSources = [
        'videos/dwello_intro.mp4'
        // Removed 'videos/promotion_video.mp4' and 'videos/dwello_reservation.mp4'
    ];

    let currentVideoIndex = 0;
    const mainVideoPlayer = document.getElementById('main-video-player');

    // Function to play the next video in sequence
    function playNextVideo() {
        if (currentVideoIndex < videoSources.length - 1) {
            currentVideoIndex++;
        } else {
            currentVideoIndex = 0; // Loop back to first video
        }
        
        mainVideoPlayer.src = videoSources[currentVideoIndex];
        mainVideoPlayer.play();
    }

    // Event listener for when a video ends
    if (mainVideoPlayer) {
        mainVideoPlayer.addEventListener('ended', playNextVideo);
    }

    // Smooth scrolling for anchor links with better performance
    const smoothScroll = (targetId) => {
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
    };
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScroll(this.getAttribute('href'));
        });
    });

    // Handle the housing search form submission with improved UX
    const housingSearchForm = document.getElementById('housing-search-form');
    if (housingSearchForm) {
        housingSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const university = document.getElementById('university').value;
            const email = document.getElementById('email').value;
            const moveDate = document.getElementById('move-date').value;
            
            // Simple validation
            if (!university || !email || !moveDate) {
                alert('Please fill out all fields to find your perfect housing match!');
                return;
            }
            
            // Disable submit button to prevent double submissions
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Finding matches...';
            }
            
            // Simulate API call with timeout
            setTimeout(() => {
                alert(`Great news! We'll send housing options near ${university} to ${email} soon.`);
                
                // Re-enable button
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Find Housing Now';
                }
                
                // Optional: Reset form or redirect
                // housingSearchForm.reset();
                // window.location.href = '/thank-you';
            }, 1000);
        });
    }

    // Newsletter subscription with improved feedback
    const newsletterForm = document.querySelector('.newsletter form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (!email) {
                alert('Please enter your email to subscribe.');
                return;
            }
            
            const submitBtn = this.querySelector('button');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Subscribing...';
            }
            
            // Simulate API call
            setTimeout(() => {
                alert(`Thank you for subscribing to Dwello housing updates with ${email}!`);
                
                // Reset form and button
                newsletterForm.reset();
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Subscribe';
                }
            }, 800);
        });
    }
});
