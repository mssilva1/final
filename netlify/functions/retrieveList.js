
let firebase = require('./firebase')

exports.handler = async function(event) {
  let db = firebase.firestore()                                                              
  let body = JSON.parse(event.body)                                                                
  console.log(body)
          let tournamentsQuery = await db.collection(`All Tournaments`)
                                      .where ('userId', '==', body.userId)
                                      .get()
          let numberOfTournaments = tournamentsQuery.size
          console.log(numberOfTournaments)
          let tournaments = tournamentsQuery.docs
          console.log(tournaments)
          let tournamentsList = []
          
          for (let i=0; i<tournaments.length; i++) {
            let tournament = tournaments[i].data()                     
            tournamentsList.push({
              tournamentName: tournament.tournamentName
            })
           }
   
    console.log(tournamentsList)

  return {
    statusCode: 200,
    body: JSON.stringify(tournamentsList)
  }
}
