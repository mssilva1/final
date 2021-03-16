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

          let tournamentsQuery = await db.collection(`All Tournaments`)
                                      .where ('userId', '==', user.uid)
                                      .get()
          let numberOfTournaments = tournamentsQuery.size
          console.log(numberOfTournaments)
          let tournaments = tournamentsQuery.docs
          console.log(tournaments)
          let tournamentsList = []
          for (let i=0; i<tournaments.length; i++) {
            let tournament = tournaments[i].data()                     
            tournamentsList.push({
              tournament: tournament.tournamentName,
            })
            document.querySelector('#selector').insertAdjacentHTML("beforeend", `
                                                                <option>${tournament.tournamentName}</option> 
                                                                    `)
           }
           console.log(tournamentsList)
          
           document.querySelector("#selector").value = ""

            var changedText = document.querySelector("#changed")
            function listQ(){
                changedText.textContent = this.value;
            }
            document.querySelector("#selector").onchange = listQ
            
            document.querySelector('#selector').addEventListener('click', async function(event) {
              let current = document.querySelector("#selector").value
              let response = await fetch(`/.netlify/functions/getTournament`, {
                method:'POST', 
                body: JSON.stringify({
                  userId: user.uid,
                  tournamentName: current,
                })
              }) 
              let draw = await response.json()
                renderTournament4(draw)
              })


            async function renderTournament4(draw) {
            let tournamentName = draw[0]
            let drawFirst = draw[1]
            let drawSecond = draw[2]
            let drawThird = draw[3]
            let drawFourth = draw[4]
    
                document.querySelector('.tournaments').innerHTML=`
                <div class="m-16 container bg-white text-center mx-auto">
                    <h1 class="inline-block px-4 py-2 rounded-xl text-2xl bg-clip-text text-black text-center font-bold">
                    <span class="tournamentName">${tournamentName}</span>
                    </h1>
                    
                    <div class="border-4 border-gray-900 p-4 my-4 text-left firstRound">
                        <div class="flex">
                        <div class="w-1/2 text-center">
                            <h2 class="text-xl py-1">1st Match</h2>
                            <button class="m-4 w-1/2 shadow bg-gray-200 hover:bg-gray-500 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded" type="button" id="drawFirstButton">
                            ${drawFirst}
                            </button>
                            <h2 class="text-xl pl-16">vs.</h2>
                            <button class="drawSecondButton m-4 w-1/2 shadow bg-gray-200 hover:bg-gray-500 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded" type="button">
                            ${drawSecond}
                            </button>
                        </div>
            
                        <div class="w-1/2 text-center">
                            <h2 class="text-2xl py-1">Final</h2>
                            <button class="m-4 mt-16 w-1/2 shadow bg-gray-200 hover:bg-gray-500 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded" type="button">
                            Winner 1
                            </button>
                        </div>
            
                        <div class="w-1/2 text-center">
                        <h2 class="text-2xl py-1">Champion!</h2>
                        <button class="m-4 mt-48 w-1/2 shadow bg-gray-200 hover:bg-gray-500 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded" type="button">
                        Champion
                        </button>
                        </div>
                        </div>
            
                        <div class="flex">
                        <div class="w-1/2 text-center">
                            <h2 class="text-xl py-1">2nd Match</h2>
                            <button class="drawThirdButton m-4 w-1/2 shadow bg-gray-200 hover:bg-gray-500 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded" type="button">
                            ${drawThird}
                            </button>
                            <h2 class="text-xl pl-16">vs.</h2>
                            <button class="drawFourthButton m-4 w-1/2 shadow bg-gray-200 hover:bg-gray-500 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded" type="button">
                            ${drawFourth}
                            </button>
                        </div>
            
                        <div class="w-1/2 text-center">
                            <h2 class="text-2xl py-1"> </h2>
                            <button class="m-4 mt-16 w-1/2 shadow bg-gray-200 hover:bg-gray-500 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded" type="button">
                            Winner 2
                            </button>
                        </div>
            
                        <div class="w-1/2 text-center">
                        <h2 class="text-2xl py-1"> </h2>
                        <button class="m-4 mt-48 w-1/2 shadow bg-gray-800 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded" type="button">
                        Results
                        </button>
                        </div>
                        </div>
                    </div>
                    </div>  
                    `
            }
    
           document.querySelector('#drawFirstButton').addEventListener('click', async function(event) {
             event.preventDefault()
             console.log(`${drawFirst} just won a match`)
             let currentUserId = firebase.auth().currentUser.uid
             let response = await fetch('/.netlify/functions/winnerButton',{
               method: 'POST',
               body: JSON.stringify({
                 winner: drawFirst,
               })
             })
         
             if (response.ok) {
               document.querySelector(`.drawFirstButton`).classList.add('opacity-40')
             }
           })





    } else {document.location.href = 'index.html'}
})

//<input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-player${i}-email" type="text" placeholder="email">