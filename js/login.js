// Programoi Erzen Krasniqi

// Needs optimizations




const inputs = document.querySelectorAll(".input");
function addcl() { let parent = this.parentNode.parentNode; parent.classList.add("focus"); }

function remcl() { let parent = this.parentNode.parentNode; if (this.value == "") { parent.classList.remove("focus"); } }
inputs.forEach(input => { input.addEventListener("focus", addcl); input.addEventListener("blur", remcl); });
firebase.auth().useDeviceLanguage();

let errorCodeStatus = false;

function login() {

    // Show that we are trying to login
    let time = new Date();
    localStorage.setItem("pswrd-changed-data-now", time.getTime());
    Swal.fire({ title: "Login in!", html: "This wont take a lot of time!", timer: 1e3, timerProgressBar: !0, onBeforeOpen: () => { Swal.showLoading(), timerInterval = setInterval(() => { Swal.getContent().querySelector("b").textContent = Swal.getTimerLeft() }, 100) }, onClose: () => { clearInterval(timerInterval) } }).then(e => { e.dismiss, Swal.DismissReason.timer });

    // Get the email and the password
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        localStorage.setItem("email", email);
        location.replace("./index.html");
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        Swal.fire(
            'Error',
            'Error: ' + errorMessage,
            'error'
        )

    });
}









/*
function register() {
    Swal.fire({ title: "Creating Account", html: "This wont take a lot of time!", timer: 1e3, timerProgressBar: !0, onBeforeOpen: () => { Swal.showLoading(), timerInterval = setInterval(() => { Swal.getContent().querySelector("b").textContent = Swal.getTimerLeft() }, 100) }, onClose: () => { clearInterval(timerInterval) } }).then(e => { e.dismiss, Swal.DismissReason.timer });
    // Get the email and the password
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        localStorage.setItem("new", "yes");
        location.replace("register");
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        Swal.fire(
            'Error',
            'Error: ' + errorMessage,
            'error'
        )
    });
}
*/





async function sendEmail() {
    const { value: email } = await Swal.fire({
        title: 'Password Reset',
        input: 'email',
        inputPlaceholder: 'Enter your email address'
    })
    if (email) {
        forgotPassword(email);
    }
}

function forgotPassword(email) {
    var auth = firebase.auth();
    var emailAddress = email;

    auth.sendPasswordResetEmail(emailAddress).then(function () {
        // Email sent.
    }).catch(function (error) {
        // An error happened.
        Swal.fire(
            'Error',
            'Error: ' + error.message,
            'error'
        )
    });
}

function signGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();

    // Sign in with google

    firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error.message);
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
}
