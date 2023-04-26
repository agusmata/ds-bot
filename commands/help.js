const { MessageEmbed } = require('discord.js');

const desc = "-help <comando> \n \n Se obtiene detalles del comando indicado, si se deja en blanco muestra la lista de comandos disponibles";

module.exports={
    name: 'help',
    description: desc,
    execute(message,args, Discord,client){
        if(args[0]==null){

            const exampleEmbed = new MessageEmbed()
            .setColor('#ff00e0')
            .setTitle('Lista de comandos')
            .setDescription('Usa -help <comando> para más detalles')
            .addFields(
                { name: 'Comandos', value: 'help, hola, getrol' },
            )
            message.channel.send({ embeds: [exampleEmbed] });
        }else{
            try{
                const exampleEmbed = new MessageEmbed()
                .setColor('#ff00e0')
                .setTitle('Comando -'+args[0])
                .setDescription(client.commands.get(args[0]).desc())
            message.channel.send({ embeds: [exampleEmbed] });
            }catch{
                message.channel.send("No se encontraron comandos con el nombre: "+args[0] );
            }
        }
    

    },
    desc(){
        return desc;
    }
}