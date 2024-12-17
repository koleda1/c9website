import { REST, Routes } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure paths
const BASE_DIR = path.resolve(__dirname, '..', '..');  // Go up to project root
const ENV_PATH = path.join(BASE_DIR, '.env');
const COMMANDS_DIR = path.join(BASE_DIR, 'src', 'commands');

// Load environment variables
const result = dotenv.config({ path: ENV_PATH });
if (result.error) {
	console.error('Error loading .env file:', result.error);
	process.exit(1);
}

// Validate required environment variables
const REQUIRED_ENV_VARS = ['APPLICATION_ID', 'GUILD_ID', 'DISCORD_TOKEN'];
const missingVars = REQUIRED_ENV_VARS.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
	console.error('Missing required environment variables:', missingVars.join(', '));
	process.exit(1);
}

// Initialize commands array
const commands = [];

// Verify commands directory exists
if (!fs.existsSync(COMMANDS_DIR)) {
	console.error(`Commands directory not found at: ${COMMANDS_DIR}`);
	process.exit(1);
}

// Load commands
try {
	const commandFolders = fs.readdirSync(COMMANDS_DIR);

	for (const folder of commandFolders) {
		const folderPath = path.join(COMMANDS_DIR, folder);
		
		// Skip if not a directory
		if (!fs.statSync(folderPath).isDirectory()) continue;

		const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

		for (const file of commandFiles) {
			const filePath = path.join(folderPath, file);
			try {
				const { default: command } = await import(`file://${filePath}`);
				
				if ('data' in command && 'execute' in command) {
					commands.push(command.data.toJSON());
					console.log(`Loaded command: ${command.data.name}`);
				} else {
					console.warn(`[WARNING] The command at ${filePath} is missing required properties.`);
				}
			} catch (error) {
				console.error(`[ERROR] Failed to load command at ${filePath}:`, error);
			}
		}
	}
} catch (error) {
	console.error('Error while loading commands:', error);
	process.exit(1);
}

// Initialize REST client
const rest = new REST().setToken(process.env.DISCORD_TOKEN);

// Deploy commands
try {
	if (commands.length === 0) {
		console.warn('No commands found to deploy.');
		process.exit(0);
	}

	console.log(`Started deploying ${commands.length} application (/) commands...`);

	const data = await rest.put(
		Routes.applicationGuildCommands(
			process.env.APPLICATION_ID,
			process.env.GUILD_ID
		),
		{ body: commands }
	);

	console.log(`Successfully deployed ${data.length} application (/) commands.`);
} catch (error) {
	console.error('Error while deploying commands:', error);
	process.exit(1);
}