// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize models menu with placeholder data
    fetchModels();
});

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
            console.log('Creating button for model:', model);
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
