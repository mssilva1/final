firebase.auth().onAuthStateChanged(async function(user) {
  if (user) {
    // Signed in
    console.log('signed in')

    let db = firebase.firestore()
    db.collection('users').doc(user.uid).set({
    name: user.displayName,
    email: user.email
    })
    
    document.querySelector('.signuser').insertAdjacentHTML("beforeend",`
    <div class="relative top-0 rigth-0 w-1/8">  
      <svg class="mx-auto h-10 w-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="pink">
        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
      </svg>
      <div class="md:w-1/8">
      <a class="text-white mt-4 rounded">Signed in as ${user.displayName}</a>
    </div>
      <button class="text-pink-500 underline sign-out">Sign Out</button>
    </div>`)

    document.querySelector('.sign-in-or-sign-out').innerHTML = `
    <div class="md:flex content-center mx-4">
      <button class="create p-12 w-1/2 mx-4 text-black font-bold text-xl text-center border-purple-400 border-4 bg-white">Create a New Tournament</button>
      <button class="past p-12 w-1/2 mx-4 text-black font-bold text-xl text-center border-purple-400 border-4 bg-white">See past Tournaments</button>
    </div>
    `
    document.querySelector('.sign-out').addEventListener('click', function(event) {
      console.log('sign out clicked')
      firebase.auth().signOut()
      document.location.href = 'index.html'
    })


    // 
    document.querySelector('.create').addEventListener('click', function(event) {
      document.location.href = 'newtournament.html'
    })

    document.querySelector('.past').addEventListener('click', function(event) {
      document.location.href = 'tournament.html'
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
