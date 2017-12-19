/*
  A ping pong bot, whenever you send "ping", it replies "pong".
*/

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

// The token of your bot - https://discordapp.com/developers/applications/me
var token = process.argv[2];
var stop = false;
var stopTimeout = false;
const proBuilds = require('./proBuilds');
const bestBuilds = require('./leagueBuilds');

//let val = myModule.hello(); // val is "Hello"

// The ready event is vital, it means that your bot will only start reacting to
// information
// from Discord after ready is emitted
client.on('ready', () => {
  console.log('Captain teemo on duty!');
  
});

// Create an event listener for messages
client.on('message', message => {
	var commandString = message.content.substr(0,message.content.indexOf(' '));
	var nameString = message.content.substr(message.content.indexOf(' ')+1);
	
	if (message.content === '~league') {
	var i = 0;
	var u;
	var num = 0;
	  for(u in client.users.array()){
		var game = client.users.array()[u].presence.game;
		if(game != null){
			if(game.name == 'League of Legends'){
				num++;
			}
		}	
	}
    message.channel.send(num + ' noobs are playing league');
	}
	
//		if(commandString == '~timeout'){
//			var channel;
//			  for(c in client.channels.array()){
//				  if( client.channels.array()[c].id == '371018369220083733'){
//					  channel = client.channels.array()[c];
//				  }
//			  }
//			  for(g in client.guilds.array()){
//				  var guild = client.guilds.array()[g];
//				  for(m in guild.members.array()){
//					  if(guild.members.array()[m].user.username == nameString){
//						  currentChannel = guild.members.array()[m].voiceChannel;
//						  currentUser = guild.members.array()[m];
//					  }
//				  }
//			 }
//			  for(g in client.guilds.array()){
//				  var guild = client.guilds.array()[g];
//				  stopTimeout = false;
//				  var cunt;
//				  for(m in guild.members.array()){
//					  if(guild.members.array()[m].user.username == nameString){
//						  message.channel.send("That's gotta sting.");
//						  cunt = guild.members.array()[m];
//					  }
//						  var timeoutInterval = setInterval(move,
//							  1000);
//						  function move(){
//							  cunt.setVoiceChannel(channel);							  
//							  if(stopTimeout){
//								  clearInterval(timeoutInterval);
//								  currentUser.setVoiceChannel(currentChannel);
//							  }
//						  }
//						  
//						  }
//				  }
//		}
	
	if(commandString == '~moveAll'){
		var channel;
		var gameString;
		var channelString;
		if(nameString == 'league' || nameString == 'League' || nameString == 'lol'){
			channelString = 'League';
			channel = getChannelByName(channelString);
			gameString = 'League of Legends';
		} else if(nameString == 'csgo' || nameString == 'CSGO'){
			channelString = 'CSGO';
			channel = getChannelByName(channelString);
			gameString = 'Counter-Strike Global Offensive';
		} else if(nameString == 'pubg' || nameString == 'PUBG'){
			channelString = 'PUBG #1';
			channel = getChannelByName(channelString);
			gameString = "PLAYERUNKNOWN'S BATTLEGROUNDS";
		} else if(nameString == 'rocket league' || nameString == 'Rocket League'){
			channelString = 'Rocket League';
			channel = getChannelByName(channelString);
			gameString = "Rocket League";
		} else {
			gameString = null;
		}
		if(gameString != null){
			for(u in client.users.array()){
				var user = client.users.array()[u];
				if(user.presence.status == 'online' && (user.presence.game != undefined)){
					if(user.presence.game.name == gameString){
						getMemberByUsername(user.username).setVoiceChannel(channel);
					}
				}
			}
			message.channel.send('Moved players to '+ channelString);
		} else {
			message.channel.send("Sorry, I don't know that game :(");

		}
	}
	
	if(commandString == '~funride'){
		stop = false;
		var currentUser = getMemberByUsername(nameString);
		if(currentUser != undefined){
			message.channel.send('Swiftly!');
			var currentChannel = currentUser.voiceChannel;
			
			var interval = setInterval(move,1000);			
			var len = client.channels.array().length;
			var i = 0;
			function move(){
				if(i == len){
					i = 0;
				}
				var channel = client.channels.array()[i];
				currentUser.setVoiceChannel(channel);			 
				if(stop){
				  clearInterval(interval);
				  currentUser.setVoiceChannel(currentChannel);
				}
				i++;
			  }
		} else {
			message.channel.send('Sorry that name is not valid :(');
		}
	}
	
	if(message.content == '~stop funride'){
		message.channel.send('Yes, sir!');
		stop = true;
	}
	
//	if(message.content == '~stop timeout'){
//		message.channel.send('Yes, sir!');
//		stopTimeout = true;
//	}
	
	if(message.content == '~speak'){
		message.channel.send("Never underestimate the power of the scout's code", {
			 tts: true
			});
	}
	
	if(commandString == '~bestBuild'){
		var champName = nameString.substr(0,nameString.indexOf(' '));
		var lane = nameString.substr(nameString.indexOf(' ')+1);
		bestBuilds.getBuild(champName, lane, message);
	}
	
	if(commandString == '~proBuild'){
		var champName = nameString.substr(0,nameString.indexOf(' '));
		if(champName.length === 0){
			champName = nameString;
		}
		message.channel.send("Please wait a few seconds...");
		proBuilds.proBuild(champName,message);
	}
});

// Log our bot in
client.login(token);

function getMemberByDisplayname(displayNameIn){
	for(g in client.guilds.array()){
		for(m in client.guilds.array()[g].members.array()){
			if(client.guilds.array()[g].members.array()[m].displayName == displayNameIn){
				return client.guilds.array()[g].members.array()[m];
			}
		}
	}
}

function getMemberByUsername(usernameIn){
	for(g in client.guilds.array()){
		for(m in client.guilds.array()[g].members.array()){
			if(client.guilds.array()[g].members.array()[m].user.username == usernameIn){
				return client.guilds.array()[g].members.array()[m];
			}
		}
	}
}

function getConnectedMembers(){
	var arr = [];
	for(g in client.guilds.array()){
		for(m in client.guilds.array()[g].members.array()){
			if(client.guilds.array()[g].members.array()[m].user.presence.status == 'online'){
				arr.push(client.guilds.array()[g].members.array()[m]);
			}
		}
	}
	return arr;
}


function getChannelByName(channelNameIn){
	for(c in client.channels.array()){
		if(client.channels.array()[c].name == channelNameIn){
			return client.channels.array()[c];
		}
	}
}