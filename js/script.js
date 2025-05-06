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

    // Mobile menu functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling for survey
    if (document.getElementById("housing-search-form")) {
        document.getElementById("housing-search-form").addEventListener("submit", function(e) {
            e.preventDefault();
            
            // Show loading indicator if it exists
            const loadingIndicator = document.getElementById("loading-indicator");
            if (loadingIndicator) {
                loadingIndicator.style.display = "block";
            }
            
            // Helper to get multiple checkbox values
            const getCheckedValues = (name) => {
                return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(el => el.value);
            };

            // Get "other" text value if it exists
            const getOtherText = (id) => {
                const element = document.getElementById(id);
                return element ? element.value || "" : "";
            };

            // Create data object
            const formData = {
                university: document.getElementById("university").value,
                studentType: document.getElementById("student-type").value,
                budget: document.getElementById("budget").value,
                hostelFind: getCheckedValues("hostel-find").concat(getOtherText("q1-other-text")),
                difficulties: getCheckedValues("difficulties").concat(getOtherText("q2-other-text")),
                challenges: getCheckedValues("challenges").concat(getOtherText("q3-other-text")),
                useApp: document.querySelector('input[name="use-app"]:checked')?.value || "",
                appFeatures: getCheckedValues("app-features").concat(getOtherText("q5-other-text")),
                email: document.getElementById("notify-email").value,
                phone: document.getElementById("phone").value
            };

            console.log("Submitting form data:", formData);

            // Method 1: Using standard form submission (avoids CORS issues)
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = 'https://script.google.com/macros/s/AKfycbw3pFhWZUVthJYRse9tXAG_Dutk4O4divF8OJq-9NncPMxB6MfVNzX35rlFifFUeIfrnQ/exec';
            form.target = '_blank'; // Opens response in new tab, prevents page navigation
            form.style.display = 'none';

            // Add data as hidden fields
            for (const key in formData) {
                if (formData.hasOwnProperty(key)) {
                    const value = Array.isArray(formData[key]) ? formData[key].join(', ') : formData[key];
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = key;
                    input.value = value;
                    form.appendChild(input);
                }
            }

            // Append form to body and submit
            document.body.appendChild(form);
            
            try {
                form.submit();
                console.log("Form submitted successfully");
                
                // Hide loading indicator
                if (loadingIndicator) {
                    loadingIndicator.style.display = "none";
                }
                
                // Show success message
                alert("Thanks! Your response has been recorded.");
                
                // Reset form
                document.getElementById("housing-search-form").reset();
            } catch (error) {
                console.error("Error submitting form:", error);
                
                // Hide loading indicator
                if (loadingIndicator) {
                    loadingIndicator.style.display = "none";
                }
                
                alert("There was an error submitting the form. Please try again.");
            }
            
            // Clean up the temporary form
            setTimeout(() => {
                document.body.removeChild(form);
            }, 500);
        });

        // Handle "Other" checkbox toggles to show/hide text inputs
        document.querySelectorAll('input[type="checkbox"][value="Other"]').forEach(checkbox => {
            const questionNumber = checkbox.name.match(/\d+/)?.[0] || "";
            const otherTextId = `q${questionNumber}-other-text`;
            const otherTextField = document.getElementById(otherTextId);
            
            if (otherTextField) {
                // Initial state
                otherTextField.style.display = checkbox.checked ? 'block' : 'none';
                
                // Toggle on checkbox change
                checkbox.addEventListener('change', function() {
                    otherTextField.style.display = this.checked ? 'block' : 'none';
                });
            }
        });
    }

    // Countdown timer functionality for countdown page
    const countdownElement = document.getElementById('countdown-timer');
    if (countdownElement) {
        // Set the launch date (e.g., June 1, 2025)
        const launchDate = new Date('June 1, 2025 00:00:00').getTime();
        
        // Update the countdown every second
        const countdownTimer = setInterval(function() {
            const now = new Date().getTime();
            const distance = launchDate - now;
            
            // Calculate days, hours, minutes, seconds
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Display the countdown
            countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
            
            // If the countdown is over
            if (distance < 0) {
                clearInterval(countdownTimer);
                countdownElement.innerHTML = "Dwello is Live!";
            }
        }, 1000);
    }
    
    // Add animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            const position = element.getBoundingClientRect();
            if (position.top < window.innerHeight * 0.8) {
                element.classList.add('animated');
            }
        });
    };
    
    // Run once on page load and then on scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
});
