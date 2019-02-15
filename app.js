const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.login(token);

const fs = require('fs');

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commandes').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
    const command = require(`./commandes/${file}`);


    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}
    
client.on('ready', () => {
    client.user.setStatus('available') // Can be 'available', 'idle', 'dnd', or 'invisible'
    client.user.setPresence({   //here, we set the bot's game status
        game: {
            name: `prefix = ` + prefix,
            type: 0
        }
    });
});
    console.log('Ready!');


client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase(); 
    // down there, are the command files links

    if (command === 'ping') {
        client.commands.get('ping').execute(message, args);
    }

    else if (command === 'say') {
        client.commands.get('say').execute(message, args);
    }

    else if (command === 'play') {
        client.commands.get('play').execute(message, args);
    }

    else if (command === 'leave') {
    client.commands.get('leave').execute(message, args);
    }

    if (command === 'help') {
        client.commands.get('help').execute(message, args);
    }

    // other commands...



});
