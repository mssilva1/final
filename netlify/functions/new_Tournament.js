let firebase = require('./firebase')

exports.handler = async function(event) {
    let db = firebase.firestore()
    let body = JSON.parse(event.body)
    console.log(body)
    let userId = body.userId
    let tournamentName = body.tournamentName
    let drawFirst = body.drawFirst
    let drawSecond = body.drawSecond
    let drawThird = body.drawThird
    let drawFourth = body.drawFourth

    console.log(`user id is ${userId}`)
    console.log(`tournamentName is ${tournamentName}`)

    let tournament = {
        userId: userId, 
        tournamentName: tournamentName,
        drawFirst: drawFirst,
        drawSecond: drawSecond,
        drawThird: drawThird,
        drawFourth: drawFourth, 
        created: firebase.firestore.FieldValue.serverTimestamp()
    }
  
    let docRef = await db.collection('All Tournaments').add(tournament)
    tournament.id = docRef.id
    console.log(tournament.id)
    return {
        statusCode: 200,
        body: JSON.stringify(tournament)
      }

}