// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    initializeGlowEffect();
});

// Initialize dashboard components
function initializeDashboard() {
    // Initialize models menu with placeholder data
    fetchModels();
}

// Dynamic glow effect for the dashboard title
function initializeGlowEffect() {
    const title = document.querySelector('.dashboard-title');
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

// Function to fetch and display models
async function fetchModels() {
    try {
        console.log('Fetching models...');
        
        // Placeholder model data
        const models = [
            { name: 'Example Model 1', email: 'model1@example.com' },
            { name: 'Example Model 2', email: 'model2@example.com' },
            { name: 'Example Model 3', email: 'model3@example.com' }
        ];
        
        const modelsMenu = document.getElementById('modelsMenu');
        if (!modelsMenu) {
            console.error('Models menu element not found');
            return;
        }
        
        modelsMenu.innerHTML = ''; // Clear loading placeholders
        
        models.forEach(model => {
            const button = document.createElement('button');
            button.className = 'glass-panel hover:opacity-80 transition-all transform hover:scale-105 p-4 text-left';
            button.innerHTML = `
                <div class="font-semibold">${model.name || 'Unnamed'}</div>
                <div class="text-sm opacity-75">${model.email || 'No email'}</div>
            `;
            
            button.addEventListener('click', () => {
                console.log('Selected model:', model);
            });
            
            modelsMenu.appendChild(button);
        });
    } catch (error) {
        console.error('Error creating model buttons:', error);
        const modelsMenu = document.getElementById('modelsMenu');
        if (modelsMenu) {
            modelsMenu.innerHTML = '<div class="col-span-full text-red-500">Error loading models: ' + error.message + '</div>';
        }
    }
}