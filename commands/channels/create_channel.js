const { SlashCommandBuilder, Interaction, ChannelType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create_channel')
        .setDescription('creates a new channel')
        .addStringOption(option =>
            option.setName('channel-name')
                .setDescription('The name of the channel')
                .setRequired(true)
        ),
    //create jsdocs for the execute function

    /**
     * 
     * @param {Interaction<CacheType>} interaction 
     * @returns 
     */
    async execute(interaction) {
        // check if member has a role that allows them to request a channel
        if (!interaction.member.roles.cache.some(role => role.name === 'Survivor')) {
            return interaction.reply({ content: 'You do not have permission to request a channel.', ephemeral: true });
        }

        console.log("creating channel 🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌")
        // create channel under category "Travaux D'équipe"
        const member = interaction.member;
        const category = interaction.guild.channels.cache.find(channel => (channel.name === "Travaux D'équipe" || channel.id == "1237134950306938900") && channel.type === ChannelType.GuildCategory);
        if (!category) {
            interaction.guild.channels.cache.forEach(channel => {
                console.log(channel.name, channel.type)
                console.log(channel.name === "Travaux D'équipe", channel.type === ChannelType.GuildCategory)
            });
            return interaction.reply({ content: 'Could not find category.', ephemeral: true });
        }

        const channelName = interaction.options.get('channel-name').value;
        const createdChannel = await interaction.guild.channels.create({
            name: channelName,
            nsfw: false,
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: [PermissionFlagsBits.ViewChannel],
                },
                {
                    id: interaction.member.id,
                    allow: [PermissionFlagsBits.ViewChannel],
                }
            ],
            type: ChannelType.GuildText,
            parent: category,
        });

        console.log("channel created🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌")
        // add the member who requested the channel to the channel
        // await createdChannel.permissionOverwrites.create(member, {
        //     VIEW_CHANNEL: true,
        //     SEND_MESSAGES: true,
        //     READ_MESSAGE_HISTORY: true,
        // });

        return interaction.reply({ content: `Channel ${createdChannel} created.`, ephemeral: true });
    },
};
