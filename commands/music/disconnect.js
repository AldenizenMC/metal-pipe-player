const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
} = require("discord.js");
const { getVoiceConnection } = require("@discordjs/voice");

const config = require("../../config/config.json");

module.exports = {
    name: "disconnect",
    disabled: false, // is the command disabled?
    hasESub: false, // does the command has an external sub command?
    initialReply: false, // does command execute with an initial reply?
    developer: true, // is command developer only?
    global: false, // is the command global?
    data: new SlashCommandBuilder()
        .setName("disconnect")
        .setDescription("Disconnects from the vc"),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        const connection = getVoiceConnection(interaction.guildId);

        if (!connection) {
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: "Bot is not in a vc" })
                        .setColor(config.embeds.bad),
                ],
                ephemeral: true,
            });
        }

        if (
            !interaction.member.voice.channel ||
            interaction.member.voice.channel.id !==
                connection.joinConfig.channelId
        ) {
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({
                            name: "You need to be in the same vc as the bot to be able to use this command.",
                        })
                        .setColor(config.embeds.bad),
                ],
                ephemeral: true,
            });
        }

        connection.destroy();
        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: "Connection destroyed" })
                    .setColor(config.embeds.bad),
            ],
        });
    },
};
