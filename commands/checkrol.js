const desc = "verifica si el usuario tiene un rol determinado";
module.exports={
    name: 'getrol',
    description: desc,
    
    execute(message,args){
        if(message.member.roles.cache.has('765081734319964160')){
            message.channel.send("Tienes el rol asd!");
        }else{
            message.channel.send("ah sos re puto");
        }
    },
    desc(){
        return desc;
    }

}