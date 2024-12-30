
import { ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandNumberOption, SlashCommandStringOption } from "discord.js";

const getRandomInt = (max: number) => Math.floor(Math.random() * max);
  

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Rolls Dices Like In Dungenons And Dragons!')
        .addNumberOption((option: SlashCommandNumberOption) => 
            option.setName('dices')
                .setDescription('amount of dice to throw')
                .setRequired(true))
        .addNumberOption((option: SlashCommandNumberOption) => 
            option.setName('faces')
                .setDescription('amount of faces a dice has')
                .setRequired(true)),
    async execute(interaction: ChatInputCommandInteraction) {
        const dices = interaction.options.getNumber("dices", true)
        const faces = interaction.options.getNumber("faces", true)
        let results = [];
        for(let throwed_amount=0; throwed_amount < dices; throwed_amount++) results.push(getRandomInt(faces) + 1)
        const sum = results.reduce((accumulator: number, currentValue: number) => accumulator + currentValue,0);
        let roll_info_text = "You threw " + dices + " dices with "+ faces +" faces each and ...\n"
        let roll_result_text = results.map((result: number) => ".. rolled a "+result+"!").join("\n") + "\nThat makes you roll a "+sum+"!"
        interaction.reply(roll_info_text+roll_result_text)
    },
};