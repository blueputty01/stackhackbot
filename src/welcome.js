module.exports = (args) => {
    const client = args.client;
    client.on('guildMemberAdd', async (member) => {
        const channel = await client.channels.cache.find(channel => (channel.name === 'welcome' && channel.type !== 'category'));

        const greetings = [
            "Welcome",
            "Hey",
            "Welcome aboard",
            "Nice to meet you",
            "How do you do",
            "How you doin",
            "Hi",
            "Hello",
            "Nice to see you",
            "It’s great to see you",
            "Good to see you",
            "What’s up",
            "Sup",
            "Ahoy",
            "What's, poppin'"
        ]

        const greeting = greetings[Math.floor(Math.random() * greetings.length)];
        const message = `${greeting}, <@${member.id}>! \n` +
            "It's a pleasure to have you here.";
        channel.send(message);
        
        channel.send("What's your first name? This will be your name on the server.");
    });
}