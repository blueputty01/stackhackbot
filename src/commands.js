const classMessage = require('./classSelection');

module.exports = (client, Discord) => {
    classMessage(client, Discord);

    const PREFIX = "$";

    client.on('message', (message) => {
        // console.log(`[${message.author.tag}]: ${message.content}`);
        if (message.author.bot) return;
        if (message.content.startsWith(PREFIX)) {
            const [CMD_NAME, ...args] = message.content
                .trim()
                .substring(PREFIX.length)
                .split(/\s+/);

            try {
                commands[CMD_NAME]({ message: message, args: args });
            }
            catch (e) {
                if (e instanceof TypeError) {
                    console.log(e);
                    message.channel.send(`${message.author} I'm sorry. That's not a command I have.`)
                } else {
                    message.channel.send(`${message.author} I'm sorry. There was an error carrying out the command ${CMD_NAME}`);
                    console.log(e);
                }
            }
        }
    });

    const commands = function () {
        function nuke(obj) {
            const message = obj.message;
            if (!message.member.hasPermission('ADMINISTRATOR')) {
                message.channel.send('Missing permissions.')
            }

            message.channel.clone().then(channel => {
                channel.setPosition(message.channel.position)
                channel.send(`This channel has been cleared by ${message.member}`)
            })
            message.channel.delete()
        }

        function help(obj) {
            const channel = obj.message.channel;
            const help = new Discord.MessageEmbed()
                .setColor('#fc0303')
                .setTitle('Help: ')
                .setDescription('Administrator only commands: \n $clear: clears this channel \n\n All commands: \n$rules: displays the rules');

            channel.send(help);
        }

        function nithin(obj) {
            const message = obj.message;
            message.channel.send(`All hail the master mind`)
        }

        function csc() {
            classMessage.createMessage(client, Discord);
        }

        function rules(obj) {
            const channel = obj.message.channel;
            const help = new Discord.MessageEmbed()
                .setColor('#fc0303')
                .setTitle('Rules: ')
                .setDescription('\
                    1. Be respectful and constructive. \n \
                    2. We will not tolerate harassment of any kind. \n \
                    4. No spam (this includes tagging rules) \n \
                    5. The teachers have sole discretion to punish infractions. We will be as fair as possible. \n \
                    6. Have fun! \
                ');

            channel.send(help);
        }


        return {
            rules: rules,
            classSelection: csc,
            nithin: nithin,
            anish: nithin,
            help: help,
            clear: nuke
        }
    }();
}