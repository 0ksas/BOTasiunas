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
                max_tokens: 200,
            });
            message.channel.send(completion.data.choices[0].text);
        } catch (e) {
            message.channel.send("Failed to get reply");
        }
    }
}