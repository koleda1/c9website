document.addEventListener('DOMContentLoaded', function() {
    initializeGlowEffect();
    setupContactForm();
});

// Dynamic glow effect for the landing page title
function initializeGlowEffect() {
    const title = document.querySelector('.landing-title');
    if (!title) return;

    function updateGlow() {
        const now = new Date();
        const intensity = Math.sin(now.getTime() * 0.002) * 0.5 + 0.5; // Oscillates between 0 and 1
        const glowSize = 10 + (intensity * 20); // Glow size between 10px and 30px
        const glowOpacity = 0.5 + (intensity * 0.3); // Opacity between 0.5 and 0.8

        title.style.textShadow = `
            0 0 ${glowSize}px rgba(88, 101, 242, ${glowOpacity}),
            0 0 ${glowSize * 1.5}px rgba(88, 101, 242, ${glowOpacity * 0.8}),
            0 0 ${glowSize * 2}px rgba(88, 101, 242, ${glowOpacity * 0.6})
        `;
    }

    setInterval(updateGlow, 50);
}

// Setup contact form functionality
function setupContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        try {
            // For now, just log the form data
            console.log('Form submitted:', data);
            
            // Clear the form
            form.reset();
            
            // Show success message
            alert('Message sent successfully!');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error sending message. Please try again.');
        }
    });
}