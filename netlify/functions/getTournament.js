
let firebase = require('./firebase')

exports.handler = async function(event) {
  let db = firebase.firestore()    
  let body = JSON.parse(event.body)                                                                
  console.log(body)
  let tournamentQuery = await db.collection('All Tournaments')
                                .where('tournamentName', '==', body.tournamentName)
                                .where('userId', '==', body.userId)
                                .get()
    
    let numberOfTournaments = tournamentQuery.size
    console.log(numberOfTournaments)
    let current = tournamentQuery.docs
    let players = current[0].data()
    console.log(players)

    let draw = [] 
  
    draw.push(players.drawFirst)
    draw.push(players.drawSecond)
    draw.push(players.drawThird)
    draw.push(players.drawFourth)                                 
   
    console.log(draw)

  return {
    statusCode: 200,
    body: JSON.stringify(draw)
  }
}

