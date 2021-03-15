firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {
        // Signed in
        console.log('signed in')
        let db = firebase.firestore()
        document.querySelector('.sign-in-or-sign-out').innerHTML = `
            <div class="absolute top-0 rigth-10 w-1/8 flex">  
            <svg class="h-10 w-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="pink">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
            <div class="w-1/2 p-4 mx-auto">
            <a class="text-center text-white mt-4 px-4 py-2 rounded">Signed in as ${user.displayName}</a>
            </div>
            <button class="text-pink-500 underline sign-out">Sign Out</button>
            </div>
            `
        document.querySelector('.sign-out').addEventListener('click', function(event) {
            console.log('sign out clicked')
            firebase.auth().signOut()
            document.location.href = 'index.html'
          })

          document.querySelector('#gridsize').addEventListener('click', function (event){
                let numberOfPlayers = document.querySelector('#grid-n-players').value 
                console.log(`please enter data for ${numberOfPlayers} players`)
                document.querySelector('.firstPlayersData').innerHTML = ``
                document.querySelector('.secondPlayersData').innerHTML = ``
                for (let i=1; i<=numberOfPlayers; i++) {
                    if(i<=4) {
                        document.querySelector('.firstPlayersData').insertAdjacentHTML("beforeend", `
                            <div class="w-full flex-wrap md:w-1/4 px-3 mb-6 md:mb-0">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-player${i}">
                                Player ${i}  
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-player${i}-name" type="text" placeholder="Name">
                            </div> 
                            `)
                    } if (i>4 && i<=8){
                        document.querySelector('.secondPlayersData').insertAdjacentHTML("beforeend", `
                            <div class="w-full flex-wrap md:w-1/4 px-3 mb-6 md:mb-0">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-player${i}">
                                Player ${i}  
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-player${i}-name" type="text" placeholder="Name">
                            </div> 
                            `)
                    }
                }
            })
        
              
      document.querySelector('#create-form').addEventListener('click', async function (event){
        console.log('form was created')

        let tournamentName = document.querySelector('#grid-name').value   
        let sport = document.querySelector('#grid-sport').value      
        let numberOfPlayers = document.querySelector('#grid-n-players').value 
        let method = document.querySelector('#grid-method').value 
        let listOfPlayers =[]
        if(document.querySelector('#grid-player1-name')) {
          let player1Name = document.querySelector('#grid-player1-name').value
          listOfPlayers.push(player1Name)}
        if(document.querySelector('#grid-player2-name')) {
          let player2Name = document.querySelector('#grid-player2-name').value
          listOfPlayers.push(player2Name)}
        if(document.querySelector('#grid-player3-name')) {
          let player3Name = document.querySelector('#grid-player3-name').value
          listOfPlayers.push(player3Name)}
        if(document.querySelector('#grid-player4-name')) {
          let player4Name = document.querySelector('#grid-player4-name').value
          listOfPlayers.push(player4Name)}
        if(document.querySelector('#grid-player5-name')) {
          let player5Name = document.querySelector('#grid-player5-name').value
          listOfPlayers.push(player5Name)}
        if(document.querySelector('#grid-player6-name')) {
          let player6Name = document.querySelector('#grid-player6-name').value
          listOfPlayers.push(player6Name)}
        if(document.querySelector('#grid-player7-name')) {
          let player7Name = document.querySelector('#grid-player7-name').value
          listOfPlayers.push(player7Name)}
        if(document.querySelector('#grid-player8-name')) {
          let player8Name = document.querySelector('#grid-player8-name').value
          listOfPlayers.push(player8Name)}
        console.log(listOfPlayers)
       
       var list = [0,1,2,3];
       list = list.sort(function() {
         return Math.random() - 0.5})

       let drawFirst = listOfPlayers[list[0]]
       let drawSecond = listOfPlayers[list[1]]
       let drawThird = listOfPlayers[list[2]]
       let drawFourth = listOfPlayers[list[3]]
       let newDraw = [drawFirst, drawSecond, drawThird, drawFourth]
       console.log(newDraw)

       let response = await fetch(`/.netlify/functions/new_Tournament`, {
        method:'POST', 
        body: JSON.stringify({
          userId: user.uid,
          tournamentName: tournamentName,
          drawFirst: drawFirst,
          drawSecond: drawSecond,
          drawThird: drawThird,
          drawFourth: drawFourth
        })
      })

      //  await db.collection(`All Tournaments`).doc(`${tournamentName}`).set({userId: user.uid, tournamentName: tournamentName, created: firebase.firestore.FieldValue.serverTimestamp()})
      // await db.collection(`${tournamentName}-${user.uid}`).doc(`Players`).set({drawFirst, drawSecond, drawThird, drawFourth})
      // await db.collection(`${tournamentName}-${user.uid}`).doc(`Match1-${drawFirst} vs. ${drawSecond}`).set({})
      // await db.collection(`${tournamentName}-${user.uid}`).doc(`Match2-${drawThird} vs. ${drawFourth}`).set({})
      document.location.href = 'tournament.html'
      })




      document.querySelector('#cancel-form').addEventListener('click', function (event){
        console.log('form was canceled')
        document.location.href = 'index.html'

      })

    } else {document.location.href = 'index.html'}
})

//<input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-player${i}-email" type="text" placeholder="email">