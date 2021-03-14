firebase.auth().onAuthStateChanged(async function(user) {
  if (user) {
    // Signed in
    console.log('signed in')
    document.querySelector('.sign-in-or-sign-out').innerHTML = `
    <div class="absolute top-0 rigth-10 w-1/8 flex">  
      <svg class="h-10 w-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="pink">
        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
      </svg>
      <button class="text-pink-500 underline sign-out">Sign Out</button>
    </div>
    
    <div class="flex content-center mx-4">
      <button class="create p-12 w-1/2 mx-4 text-black font-bold text-xl text-center border-purple-400 border-4 bg-white">Create a New Tournament</button>
      <button class="past p-12 w-1/2 mx-4 text-black font-bold text-xl text-center border-purple-400 border-4 bg-white">See past Tournaments</button>
    </div>
    `
    document.querySelector('.sign-out').addEventListener('click', function(event) {
      console.log('sign out clicked')
      firebase.auth().signOut()
      document.location.href = 'index.html'
    })

    document.querySelector('.create').addEventListener('click', function(event) {
      document.querySelector('.sign-in-or-sign-out').innerHTML = `
        <div class="absolute top-0 rigth-10 w-1/8 flex">  
          <svg class="h-10 w-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="pink">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
          </svg>
          <button class="text-pink-500 underline sign-out">Sign Out</button>
        </div>

        <div class="bg-white max-l-lg p-2">
          <form class="w-full">
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-tournament-name">
                  Tournament Name
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-grey-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-name" type="text" placeholder="Tournament Name">
              </div>

              <div class="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-sport">
                  Sport or Activity
                </label>
                <div class="relative">
                  <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-sport">
                    <option>Soccer</option>
                    <option>Tennis</option>
                    <option>Basketball</option>
                    <option>Football</option>
                    <option>Board Game</option>
                    <option>Other</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
              
              <div class="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-number-players">
                  Number of Players / Teams
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-n-players" type="text" placeholder="4-8">
              </div>  
            
              <div class="w-full md:w-2/6 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-sport">
                  Assignment Method
                </label>
                <div class="relative">
                  <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-method">
                    <option>Random</option>
                    <option>Assigned by User</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full flex-wrap md:w-1/4 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-player1">
                  Player 1  
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-player1-name" type="text" placeholder="Name">
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-player1-email" type="text" placeholder="email">
              </div> 

              <div class="w-full flex-wrap md:w-1/4 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-player2">
                  Player 2 
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-player2-name" type="text" placeholder="Name">
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-player2-email" type="text" placeholder="email">
              </div>

              <div class="w-full flex-wrap md:w-1/4 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-player3">
                  Player 3  
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-player3-name" type="text" placeholder="Name">
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-player3-email" type="text" placeholder="email">
              </div>
            
              <div class="w-full flex-wrap md:w-1/4 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-player4">
                  Player 4 
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-player4-name" type="text" placeholder="Name">
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-player4-email" type="text" placeholder="email">
              </div>
            </div>
                
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full flex-wrap md:w-1/4 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-player5">
                  Player 5  
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-player5-name" type="text" placeholder="Name">
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-player5-email" type="text" placeholder="email">
              </div> 

              <div class="w-full flex-wrap md:w-1/4 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-player6">
                  Player 6 
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-player6-name" type="text" placeholder="Name">
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-player6-email" type="text" placeholder="email">
              </div>

              <div class="w-full flex-wrap md:w-1/4 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-player7">
                  Player 7  
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-player7-name" type="text" placeholder="Name">
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-player7-email" type="text" placeholder="email">
              </div>
          
              <div class="w-full flex-wrap md:w-1/4 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-player8">
                  Player 8 
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-player8-name" type="text" placeholder="Name">
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-player8-email" type="text" placeholder="email">
              </div>
            </div>

              <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" id="create-form" type="button">
                Create
              </button>

              <button class="shadow bg-gray-600 hover:bg-gray-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" id="cancel-form" type="button">
                Cancel
              </button>
       
          </form>
        </div>
      ` 

      document.querySelector('#create-form').addEventListener('click', function (event){
        console.log('form was created')

        let tournamentName = document.querySelector('#grid-name').value   
        let sport = document.querySelector('#grid-sport').value      
        let numberOfPlayers = document.querySelector('#grid-n-players').value 
        let method = document.querySelector('#grid-method').value 
        let player1Name = document.querySelector('#grid-player1-name').value 
        let player1Email = document.querySelector('#grid-player1-email').value 
        let player2Name = document.querySelector('#grid-player2-name').value 
        let player2Email = document.querySelector('#grid-player2-email').value 
        let player3Name = document.querySelector('#grid-player3-name').value 
        let player3Email = document.querySelector('#grid-player3-email').value 
        let player4Name = document.querySelector('#grid-player4-name').value 
        let player4Email = document.querySelector('#grid-player4-email').value 
        let player5Name = document.querySelector('#grid-player5-name').value 
        let player5Email = document.querySelector('#grid-player5-email').value 
        let player6Name = document.querySelector('#grid-player6-name').value 
        let player6Email = document.querySelector('#grid-player6-email').value 
        let player7Name = document.querySelector('#grid-player7-name').value 
        let player7Email = document.querySelector('#grid-player7-email').value 
        let player8Name = document.querySelector('#grid-player8-name').value 
        let player8Email = document.querySelector('#grid-player8-email').value 


       if (numberOfPlayers == 4 && method == "Random") {

       var list = [1,2,3,4];
       list = list.sort(function() {
         return Math.random() - 0.5})

       let drawFirst = `player${list[0]}Name`
       let drawSecond = `player${list[1]}Name`
       let drawThird = `player${list[2]}Name`
       let drawFourth = `player${list[3]}Name`
       console.log(drawFirst)
      
       document.querySelector('.sign-in-or-sign-out').innerHTML = `
       <div class="absolute top-0 rigth-10 w-1/8 flex">  
          <svg class="h-10 w-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="pink">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
          </svg>
          <button class="text-pink-500 underline sign-out">Sign Out</button>
        </div>   
       
       <div class="bg-white max-l-lg p-2">
            <form class="w-full">
              <div class=" -mx-3 mb-6">
               <div class="text-2xl text-black text-center font-bold my-3">${tournamentName}</div>
               
               <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-grey-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-t1" type="text" placeholder=${drawFirst}>
                </div>
                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-grey-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-t2" type="text" placeholder=${drawSecond }>
                </div>

                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-grey-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-t3" type="text" placeholder=${drawThird}>
                </div>
                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-grey-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-t4" type="text" placeholder=${drawFourth}>
                </div>
              </div>
            </form>
          </div>  
        `
      

      //  } else if (numberOfPlayers > 4 && method == "Random"){



      //  } else if (numberOfPlayers <= 4){


      //  } else {


       }
       
       

      })

      document.querySelector('#cancel-form').addEventListener('click', function (event){
        console.log('form was canceled')
      })

    })

 
    
  } else {
    // Signed out
    
    console.log('signed out')

    // Initializes FirebaseUI Auth
    let ui = new firebaseui.auth.AuthUI(firebase.auth())

    // FirebaseUI configuration
    let authUIConfig = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: 'index.html'
    }

    // Starts FirebaseUI Auth
    ui.start('.sign-in-or-sign-out', authUIConfig)
  }
})
