const { SlashCommandBuilder, Interaction, ChannelType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove_teammate')
        .setDescription('removes a teammate to a channel')
        // add multiple users as command options
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to add to the channel')
                .setRequired(true)
        ),

    /**
     * @param {Interaction<CacheType>} interaction 
     * @returns 
     */
    async execute(interaction) {
        // check if channel is under category "Travaux D'équipe"
        const channel = interaction.channel;
        if (!channel || !channel.parent || channel.parent.name !== "Travaux D'équipe") {
            return interaction.reply({ content: 'This command can only be used in a channel under the "Travaux D\'équipe" category.', ephemeral: true });
        }

        // check if member has a role that allows them to add a teammate
        if (!interaction.member.roles.cache.some(role => role.name === 'Survivor')) {
            return interaction.reply({ content: 'You do not have permission to add a teammate to this channel.', ephemeral: true });
        }

        const user = interaction.options.get('user').user;
        const member = interaction.guild.members.cache.get(user.id);
        if (!member) {
            return interaction.reply({ content: 'Could not find member.', ephemeral: true });
        }

        if (![...channel.permissionOverwrites.cache.keys()].includes(member.id)) {
            return interaction.reply({ content: 'This member is not in the channel.', ephemeral: true });
        }

        await channel.permissionOverwrites.delete(member, {
            ViewChannel: true,
            SendMessages: true,
            ReadMessageHistory: true,
        });

        return interaction.reply({ content: `Added ${member} to the channel.`, ephemeral: true });


    },
};
