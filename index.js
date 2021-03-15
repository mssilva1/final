firebase.auth().onAuthStateChanged(async function(user) {
  if (user) {
    // Signed in
    console.log('signed in')

    let db = firebase.firestore()
    db.collection('users').doc(user.uid).set({
    name: user.displayName,
    email: user.email
    })
    
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


    // 
    document.querySelector('.create').addEventListener('click', function(event) {
      document.location.href = 'newtournament.html'
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
