import fs from 'node:fs';
import path from 'node:path';
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Discord client with necessary intents
const client = new Client({ 
    intents: [GatewayIntentBits.Guilds] 
});

// Initialize commands collection
client.commands = new Collection();

// Set up paths for commands and events
const BASE_DIR = path.resolve(__dirname, '..');  // Go up to src directory
const COMMANDS_DIR = path.join(BASE_DIR, 'commands');
const EVENTS_DIR = path.join(BASE_DIR, 'events');

// Load commands from subdirectories
try {
    const commandFolders = fs.readdirSync(COMMANDS_DIR);

    for (const folder of commandFolders) {
        const commandsPath = path.join(COMMANDS_DIR, folder);
        
        // Skip if not a directory
        if (!fs.statSync(commandsPath).isDirectory()) continue;
        
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const { default: command } = await import(`file://${filePath}`);
            
            // Validate command structure
            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
                console.log(`Loaded command: ${command.data.name}`);
            } else {
                console.warn(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }
} catch (error) {
    console.error('Error loading commands:', error);
}

// Load event handlers
try {
    const eventFiles = fs.readdirSync(EVENTS_DIR).filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
        const filePath = path.join(EVENTS_DIR, file);
        const { default: event } = await import(`file://${filePath}`);
        
        // Load cron events along with regular events
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
        
        // Log the type of event being loaded
        const eventType = file === 'cronEvents.js' ? 'cron event' : 'event';
        console.log(`Loaded ${eventType}: ${event.name}`);
    }
} catch (error) {
    console.error('Error loading events:', error);
}

// Error handling for unhandled rejections
process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

// Bot login with error handling
client.login(process.env.DISCORD_TOKEN)
    .then(() => console.log('Bot logged in successfully.'))
    .catch(err => {
        console.error('Failed to log in:', err);
        process.exit(1);
    });