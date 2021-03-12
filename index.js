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
    <div class="flex center">
    <svg class="w-10 h-10 mx-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
    </svg>
    <div class="text-white text-xl text-center w-2/3 bg-blue-500">Create a New Tournament</div>
    </div>
    `
    document.querySelector('.sign-out').addEventListener('click', function(event) {
      console.log('sign out clicked')
      firebase.auth().signOut()
      document.location.href = 'index.html'
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
