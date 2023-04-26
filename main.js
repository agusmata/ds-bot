
const Discord = require('discord.js');
const {
	joinVoiceChannel,
	createAudioPlayer,
	createAudioResource,
	entersState,
	StreamType,
	AudioPlayerStatus,
	VoiceConnectionStatus,
    getVoiceConnection,
} =require('@discordjs/voice');

const listaIntents = new Discord.Intents();
listaIntents.add(
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    );
    console.log(listaIntents.bitfield);

//const client = new Discord.Client({Intents : listaIntents});
const client = new Discord.Client({ intents: listaIntents });

const prefix = '-';

const comandos = ['hola','help'];

const fs = require('fs');
client.commands = new Discord.Collection(); 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command =require(`./commands/${file}`);
    client.commands.set(command.name,command);

}

client.once('ready',() => {
    console.log('El bot chingón está de vuelta!');
});


const player = createAudioPlayer();
function playSong() {
	const resource = createAudioResource('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', {
		inputType: StreamType.Arbitrary,
	});

	player.play(resource);

	return entersState(player, AudioPlayerStatus.Playing, 5e3);
}

async function connectToChannel(channel) {
	const connection = joinVoiceChannel({
		channelId: channel.id,
		guildId: channel.guild.id,
		adapterCreator: createDiscordJSAdapter(channel),
	});

	try {
		await entersState(connection, VoiceConnectionStatus.Ready, 30e3);
		return connection;
	} catch (error) {
		connection.destroy();
		throw error;
	}
}




client.on('messageCreate',message=>{
    if(!message.content.startsWith(prefix)||message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLocaleLowerCase();

    try{
        if(command==='help') {client.commands.get('help').execute(message,args,Discord,client);}
        else if (command==='hola') client.commands.get('hola').execute(message,args);
        else if(command==='test'){
            /*
            joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            })
            let audio = createAudioPlayer();
            const resource = createAudioResource('./audio/nunca.mp3',{inputType:StreamType.Arbitrary});
            audio.play(resource);
            entersState(audio,AudioPlayerStatus.Playing,5e3);
            */
            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });
            /*const connection = getVoiceConnection(message.member.voice.channel.guild.id);
            const subscription = connection.subscribe(audioPlayer);
*/

        }else{
            console.log("No se encontro comando");
        }
        
    }catch(error){
        console.log(error);
    }
});



client.login('OTAwNDgxMTk4NDYyMjI2NDcz.YXB8dw.q4bPTww_GZh3R2T-JIzLhU2yhPc');
