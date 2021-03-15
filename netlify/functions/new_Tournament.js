let firebase = require('./firebase')

exports.handler = async function(event) {
    let db = firebase.firestore()
    let body = JSON.parse(event.body)
    console.log(body)
    let userId = body.userId
    // let tournamentName = body.tournamentName

    console.log(`user id is ${userId}`)
    console.log(`tournamentName is ${tournamentName}`)

    let tournament = {
        userId: userId, 
        tournamentName: tournamentName, 
        created: firebase.firestore.FieldValue.serverTimestamp()
    }
  
    let docRef = await db.collection('All Tournaments').add(tournament)
  

    // post.id = docRef.id

    return {
        statusCode: 200,
        body: JSON.stringify(tournament)
      }

}