const { Configuration, OpenAIApi } = require("openai");

module.exports = {
    name: 'question',
    description: "Responds to a given question with a ChatGPT generated answer",
    async execute(client, message, args) {

        const configuration = new Configuration({
            apiKey: client.credentials.openAiKey
        });

        const openai = new OpenAIApi(configuration);
        try {
            const completion = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: args.join(" "),
                max_tokens: 1000,
            });

            reponse = completion.data.choices[0].text.trim()
            if (reponse && reponse.length <= 2000) {
                message.channel.send(`${message.author} ${completion.data.choices[0].text}`);
            } else {
                message.channel.send(`${message.author} Question response is invalid.`);
            }
        } catch (e) {
            console.log(e)
            message.channel.send(`${message.author} failed to get reply`);
        }
    }
}