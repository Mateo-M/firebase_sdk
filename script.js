let config = {
    apiKey: "AIzaSyA0iXg6gn4hUNcvZUzsfiBs6XOOVO8lI7E",
    authDomain: "the-walking-dead-bbaea.firebaseapp.com",
    databaseURL: "https://the-walking-dead-bbaea.firebaseio.com",
    projectId: "the-walking-dead-bbaea",
    storageBucket: "",
    messagingSenderId: "1010422210886"
};
firebase.initializeApp(config);

let database = firebase.database().ref();

const uiConfig = {
    signInSuccessUrl: 'http://localhost:8080/list.html',
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: 'http://localhost:8080/cgu' // conditions générales d'utilisation
};

// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

let id;

function initApp() {

    firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
            // All datas
            // User is signed in.
            const displayName = user.displayName;
            const email = user.email;
            const emailVerified = user.emailVerified;
            const photoURL = user.photoURL;
            const uid = user.uid;
            id = user.uid;
            const phoneNumber = user.phoneNumber;
            const providerData = user.providerData;


            // retour de l'utilisateur après authentification
            user.getIdToken().then((accessToken) => {
                document.getElementById('sign-in-status').textContent = 'Signed in';
                document.getElementById('sign-in').textContent = 'Sign out';
                document.getElementById('account-details').textContent = JSON.stringify({
                    displayName: displayName,
                    email: email,
                    emailVerified: emailVerified,
                    phoneNumber: phoneNumber,
                    photoURL: photoURL,
                    uid: uid,
                    accessToken: accessToken,
                    providerData: providerData
                }, null, '  ');
            });

        } else {

            // Gestion de la deconnexion
            document.getElementById('sign-in-status').textContent = 'Signed out';
            document.getElementById('sign-in').textContent = 'Sign in';
            document.getElementById('account-details').textContent = 'null';
        }
    }, (error) => { // gestion de erreur de connexion
        console.error(error);
    });
}
initApp();

database.on("value", function (snapshot) {
    let list = document.getElementById('listPerso');
    list.innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
        let key = childSnapshot.key;
        let perso = childSnapshot.val();
        if (id == perso.id || perso.id == null) {
            let listPerso = document.createElement("li");
            listPerso.textContent = perso.name;
            list.appendChild(listPerso);
        }
    });
});

document.getElementById('addPersonnage').onclick = function addPerso(name) {
    let input = document.getElementById("getPersonnage");
    if (!input.value || input.value == "") {
        return;
    }
    let list = firebase.database().ref();
    let newItem = list.push();
    newItem.set({
        name: input.value,
        id: id
    });
}