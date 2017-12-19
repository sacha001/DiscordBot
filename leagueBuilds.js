module.exports ={
getBuild: function(champName, lane, message){
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
}