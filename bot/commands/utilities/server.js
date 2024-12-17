import { SlashCommandBuilder } from 'discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.'),
	async execute(interaction) {
		try {
			await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
		} catch (error) {
			console.error('Error in server command:', error);
			await interaction.reply({ 
				content: 'There was an error executing this command!', 
				ephemeral: true 
			});
		}
	},
};