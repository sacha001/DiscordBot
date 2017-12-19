/**
 * 
 */
module.exports ={
proBuild :function(champName,message){
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: false });
nightmare
  .goto('http://www.probuilds.net/champions/details/'+champName)
  .scrollTo(1160,0)
  .evaluate(() => {
    const body = document.querySelector('body');

    return {
      height: body.scrollHeight,
      width: body.scrollWidth
    };
  })
  .then(function(dimensions) {
    return nightmare
      .viewport(dimensions.width, dimensions.height)
      .wait(1000)
      .screenshot('proBuild.png')
  })
  .then(function() {
    nightmare.end(function() {
    	message.channel.send("Pro builds for " + champName, {
		    file: "proBuild.png" 
		});
    	message.channel.send('http://www.probuilds.net/champions/details/'+champName);
      console.log(champName);
    });
 });
}
}
