// Programoi Erzen Krasniqi

// Librat dhe te dhënat e tyre Ardonis Byqmeti

function logout() {
    Swal.fire(
        'Logging out!',
        'You are logged out!',
        'success'
    );
    // Log out
    firebase.auth().signOut();
}