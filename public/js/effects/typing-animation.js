class TypingAnimation {
    constructor(element, phrases, options = {}) {
        this.element = element;
        this.phrases = phrases;
        this.currentPhrase = 0;
        this.currentChar = 0;
        this.isDeleting = false;
        this.options = {
            typeSpeed: options.typeSpeed || 100,
            deleteSpeed: options.deleteSpeed || 50,
            pauseBeforeDelete: options.pauseBeforeDelete || 2000,
            pauseBeforeType: options.pauseBeforeType || 500
        };
    }

    type() {
        const currentPhrase = this.phrases[this.currentPhrase];
        
        if (this.isDeleting) {
            // Deleting text
            this.currentChar--;
            this.element.textContent = currentPhrase.substring(0, this.currentChar);
            
            if (this.currentChar === 0) {
                this.isDeleting = false;
                this.currentPhrase = (this.currentPhrase + 1) % this.phrases.length;
                setTimeout(() => this.type(), this.options.pauseBeforeType);
                return;
            }
            
            setTimeout(() => this.type(), this.options.deleteSpeed);
        } else {
            // Typing text
            this.currentChar++;
            this.element.textContent = currentPhrase.substring(0, this.currentChar);
            
            if (this.currentChar === currentPhrase.length) {
                this.isDeleting = true;
                setTimeout(() => this.type(), this.options.pauseBeforeDelete);
                return;
            }
            
            setTimeout(() => this.type(), this.options.typeSpeed);
        }
    }

    start() {
        this.type();
    }
}

// Initialize the typing animation when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.querySelector('.typing-text');
    const phrases = [
        'OnlyFans Career',
        'TikTok Growth',
        'Instagram Reels',
        'YouTube Channel',
        'Twitter Presence',
        'Social Media Empire'
    ];

    const animation = new TypingAnimation(typingElement, phrases, {
        typeSpeed: 100,        // Speed of typing (ms)
        deleteSpeed: 50,       // Speed of deleting (ms)
        pauseBeforeDelete: 2000, // Time to wait before deleting (ms)
        pauseBeforeType: 500   // Time to wait before typing next phrase (ms)
    });

    animation.start();
});
