import { SlashCommandBuilder } from 'discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.'),
	async execute(interaction) {
		try {
			await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
		} catch (error) {
			console.error('Error in user command:', error);
			await interaction.reply({ 
				content: 'There was an error executing this command!', 
				ephemeral: true 
			});
		}
	},
};