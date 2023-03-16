const { SlashCommandBuilder, EmbedBuilder, REST } = require("discord.js");
const { clientId, token } = require("../config.json");

let queue = [];
const rest = new REST({ version: "10" }).setToken(token);
module.exports = {
	data: new SlashCommandBuilder()
		.setName("lastcommit")
		.setDescription("Get when the last commit on the github account was."),

	async execute(interaction) {
		let rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
		console.log(interaction);

		data = await (
			await fetch(
				`https://api.github.com/repos/FCSRobotics/YAGSL/branches/main`,
				{
					headers: {
						"User-Agent": "CharlesHurst",
					},
				}
			)
		).json();

		// The whole response has been received. Print out the result.
		console.log(JSON.stringify(data));

		let date = new Date(data.commit.commit.committer.date);
		let relativeTime = Date.now() - date.getTime();
		await interaction.reply(
			rtf.format(-relativeTime / 1000 / 60 / 60, "hours")
		);
	},
};

function httpGet(theUrl) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", theUrl, false); // false for synchronous request
	xmlHttp.send(null);
	return xmlHttp.responseText;
}
