const Discord = require("discord.js");
const token = require("./token.json");
const bdd = require("./bdd.json");
const fs = require("fs");

const bot = new Discord.Client();

//Allumage du bot ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
bot.on("ready", async () => {
    console.log("le bot est allumé")
    bot.user.setStatus("dnd");
    setTimeout(() => {
        bot.user.setActivity("Développement JavaScript");
    }, 100)
});
// fin allumage --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



// Message MP et sur le salon bienvenue à chaque nouveaux membres ------------------------------------------------------------------------------------------------------------------------------------------------------------
bot.on("guildMemberAdd", member => {
    if(bdd["message-bienvenue"]){
        bot.channels.cache.get('772826574617182230').send(bdd["message-bienvenue"]); // mettre member.user.username si l'on veut avoir le pseudo mais sans la mention dans le message
    }
    else{
        bot.channels.cache.get('772826574617182230').send("Bienvenue sur le serveur");
    }
    member.send(`Bienvenue sur le serveur de la meilleure classe de BTS de 2020 héhé ${member.user.username}!`);
    member.roles.add('772828378880540703');
})
// Fin message ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



// Commande clear ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
bot.on("message", message => {

    if(message.content.startsWith("/clear")){
    message.delete();
        if(message.member.hasPermission('MANAGE_MESSAGES')){

            let args = message.content.trim().split(/ +/g);

            if(args[1]){
                if(!isNaN(args[1]) && args[1] >= 1 && args[1] <= 99){

                    message.channel.bulkDelete(args[1])
                    message.channel.send(`Vous avez supprimé ${args[1]} message(s)`)

                }
                else{
                    message.channel.send(`Vous devez indiquer une valeur entre 1 et 99 !`)
                }
            }
            else{
                message.channel.send(`Vous devez rentrer un nombre entre 1 et 99 !`)
            }
        }
        else{
            message.channel.send(`Vous devez avoir un rôle spécial pour effacer ces messages !`)
        }
    }
// Fin commande clear --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



// Définition du message de bienvenue ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    if(message.content.startsWith("/mb")){
    message.delete();
        if(message.member.hasPermission("MANAGE_MESSAGES")){
            // /mb <le message>
            if(message.content.length > 5){
                message_bienvenue = message.content.slice(4)
                bdd["message-bienvenue"] = message_bienvenue
                Savebdd()
            }
        }
    }
// Fin définition message ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
})



function Savebdd() {
    fs.writeFile("./bdd.json", JSON.stringify(bdd, null, 4), (err) => {
        if (err) message.channel.send("Une erreur est survenue.");
    });
}


Savebdd();

bot.login(token.token);
