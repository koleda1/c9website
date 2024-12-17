import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the public directory
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/styles', express.static(path.join(__dirname, 'public/styles')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Routes
app.get('/', (req, res) => {
    console.log('Serving landing page');
    res.sendFile(path.join(__dirname, 'public', 'landing.html'));
});

app.get('/admin', (req, res) => {
    console.log('Serving admin dashboard');
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Handle 404s
app.use((req, res) => {
    console.log('404 for', req.url);
    res.status(404).send('Page not found');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});