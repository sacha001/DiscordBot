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
		console.log(champName);
		console.log(lane);
		getBuild(champName, lane, message);
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

function getBuild(champName, lane, message){
	var result;
	
	var Crawler = require("crawler");
	var c = new Crawler({
	    maxConnections : 10,
	    // This will be called for each crawled page
	    callback : function (error, res, done) {
	        if(error){
	        	console.log(error);
	        }else{
	         var $ = res.$;
	         if($(".champion-stats-header-info__image").length != 0){
		         message.channel.send("Build with highest win rate for "+ champName + "(" +'http:///na.op.gg/champion/'+champName+'/statistics/'+lane+')');
		       	 var spells = $(".l-champion-statistics-content__main > table:first-child > tbody").eq(0).find("tr");
		       	 
		       	 var highest = 0;
		       	 var bestSpells;
		       	 spells.each((i) => {
		       		 var winrate = spells.eq(i).find("td").eq(2).find("strong").html();        
		       		 winrate = Number(winrate.substring(0, winrate.indexOf("%")));
		       		 if(winrate > highest){
		       			 highest = winrate;
		       			 bestSpells = spells.eq(i);
		       		 }
		       	 });
		       	 result = "Summoner spells: ";
		       	 var img = bestSpells.find("img").eq(0).attr("src");
		       	 if(img.substring(img.indexOf("Summoner") + 8, img.indexOf(".png")) == 'Dot'){
		       		 result += 'Ignite';
		       	 } else {
		       		 result += img.substring(img.indexOf("Summoner") + 8, img.indexOf(".png"));
		       	 }
				 img = bestSpells.find("img").eq(1).attr("src");
				 if(img.substring(img.indexOf("Summoner") + 8, img.indexOf(".png")) == 'Dot'){
					 result += ", Ignite";
				 } else {
					 result += ", " + img.substring(img.indexOf("Summoner") + 8, img.indexOf(".png"));
				 }
				 
				 var skills = $(".l-champion-statistics-content__main > table:first-child > tbody").eq(1).find("tr > td > ul");
				 result += "\nSkills: " + skills.find("span").eq(0).html();
				 result += " -> " + skills.find("span").eq(1).html();
				 result += " -> " + skills.find("span").eq(2).html();
				 
				 var startingItems = $(".champion-overview__table").eq(1).find("tbody > tr");
				 var itemWinrate = ($(".champion-overview__table").eq(1).find(".champion-overview__stats--win > strong"));
				 var option1 = itemWinrate.eq(0).html();
				 var option2 = itemWinrate.eq(1).html();
				 var startingItem;
				 
				 result += "\nStarting Items: "
				 if(Number(option1.substring(0, option1.indexOf("%"))) > Number(option2.substring(0, option2.indexOf("%")))){
					 result += "\nhttp:" + startingItems.eq(0).find("td").eq(0).find("ul").eq(0).find("li").eq(0).find("img").attr("src");
					 if(startingItems.eq(0).find("td").eq(0).find("ul").eq(0).find("li").eq(2).find("img").attr("src") != undefined){
						 result += "\nhttp:" + startingItems.eq(0).find("td").eq(0).find("ul").eq(0).find("li").eq(2).find("img").attr("src");
					 }	 
				 } else {
					 result += "\nhttp:" + startingItems.eq(1).find("td").eq(0).find("ul").eq(0).find("li").eq(0).find("img").attr("src");
					 if(startingItems.eq(1).find("td").eq(0).find("ul").eq(0).find("li").eq(2).find("img").attr("src") != undefined){
						 result += "\nhttp:" + startingItems.eq(1).find("td").eq(0).find("ul").eq(0).find("li").eq(2).find("img").attr("src");
					 } 
				}
				 message.channel.send(result);
				 result = "";
				 highest = 0;
				 result += "Build: "
			     var build;
				 for(var i = 2; i < 7; i++){
					 var winrate = itemWinrate.eq(i).html();
					 winrate = Number(winrate.substring(0, winrate.indexOf("%")));
					 if(winrate > highest){
						 highest = winrate;
						 build = "";
						 build += "\nhttp:" + startingItems.eq(i).find("td").eq(0).find("ul").eq(0).find("li").eq(0).find("img").attr("src");
						 build += "\nhttp:" + startingItems.eq(i).find("td").eq(0).find("ul").eq(0).find("li").eq(2).find("img").attr("src");
						 build += "\nhttp:" + startingItems.eq(i).find("td").eq(0).find("ul").eq(0).find("li").eq(4).find("img").attr("src");
						 if(startingItems.eq(i).find("td").eq(0).find("ul").eq(0).find("li").eq(6).find("img").attr("src") != undefined){
							 build += "\nhttp:" + startingItems.eq(i).find("td").eq(0).find("ul").eq(0).find("li").eq(6).find("img").attr("src");
						 }
					 }
				 }
				 result += build;
				 message.channel.send(result);
				 result = "";
				 result += "Boots: ";
				 highest = 0;
				 for(var i = 7; i < 10; i++){
					 var winrate = itemWinrate.eq(i).html();
					 winrate = Number(winrate.substring(0, winrate.indexOf("%")));
					 if(winrate > highest){
						 highest = winrate;
						 build = "";
						 build += "\nhttp:" + startingItems.eq(i).find("td").eq(0).find("ul").eq(0).find("li").eq(0).find("img").attr("src");
					 } 
				 }
				 result += build;
				 message.channel.send(result);
	         } else {
	        	message.channel.send("I couldn't find a build for that champion/position :(");
	        }
	        done();
	    }
	  }
	});

	// Queue just one URL, with default callback
	c.queue('http://na.op.gg/champion/'+champName+'/statistics/'+lane);
}