    importScripts(
      'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js'
    )
    importScripts(
      'https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js'
    )
    firebase.initializeApp({"apiKey":"AIzaSyASLsajyl77BcauaLFOCWJvt5JtHSdrys0","authDomain":"pushnotitification-6131a.firebaseapp.com","projectId":"pushnotitification-6131a","storageBucket":"pushnotitification-6131a.appspot.com","messagingSenderId":"930295071583","appId":"1:930295071583:web:46a62e0345f67323b96cea","measurementId":""})

    // Retrieve an instance of Firebase Messaging so that it can handle background
    // messages.
    const messaging = firebase.messaging()

    true
    