// Programoi Erzen Krasniqi


let log = console.log;

// Checks if the user is signed in

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
    } else {
        // No user is signed in
        // redirects the user to login page
        //location.replace('../');
        log("User is not logged in!")
    }
});
