// Programoi Erzen Krasniqi
const query = firebase.database().ref('ads/');


// Check if the user is logged in
firebase.auth().onAuthStateChanged(function (e) { e ? (email = e.email, uid = e.uid) : document.getElementById("logout-id").style.display = "none" });


query.on("child_added", function (snapshot) {
    // Get the messages
    let bname = snapshot.val().name;
    let bdesc = snapshot.val().desc;
    let bauthor = snapshot.val().author;
    let bimage = snapshot.val().image;
    let postKey = snapshot.key;

    document.getElementById("imgA").src = bimage;
    document.getElementById("card-title").innerText = bname;
    document.getElementById("card-text").innerText = bdesc;
});
