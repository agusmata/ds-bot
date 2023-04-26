const desc = "Imprime un mensaje de saludo";
module.exports={
    name: 'hola',
    description: desc,
    execute(message,args){
        message.channel.send("Hola Mundo!!!");
    },
    desc(){
        return desc;
    }

}