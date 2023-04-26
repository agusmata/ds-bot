const desc = "-join  \n \n  Hace que el bot ingrese al canal del usuario";
module.exports={
    name: '',
    description: desc,
    desc(){
        return desc;
    },
    execute(message,args){
        var channel = message.member.voice.channel;
    }
}