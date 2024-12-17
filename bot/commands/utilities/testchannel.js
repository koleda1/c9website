import { SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('testchannel')
        .setDescription('Test if the bot can send messages to the notification channel'),
    async execute(interaction) {
        try {
            const channel = await interaction.client.channels.fetch(process.env.NOTIFICATION_CHANNEL_ID);
            
            if (!channel) {
                await interaction.reply({
                    content: '❌ Could not find the notification channel. Please check the channel ID.',
                    ephemeral: true
                });
                return;
            }

            await channel.send('🔔 Test message from bot!');
            await interaction.reply({
                content: '✅ Test message sent successfully!',
                ephemeral: true
            });
        } catch (error) {
            console.error('Error in testchannel command:', error);
            await interaction.reply({
                content: '❌ Error testing channel: ' + error.message,
                ephemeral: true
            });
        }
    },
}; 