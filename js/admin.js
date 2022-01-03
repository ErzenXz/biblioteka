// Programoi Erzen Krasniqi

// Librat dhe te dhënat e tyre Ardonis Byqmeti

// Check if the user is logged in
firebase.auth().onAuthStateChanged(function (e) { e ? (email = e.email, uid = e.uid) : location.replace("../login.html") });


// Get a reference to the database service
function addBook() {

    let bname = document.getElementById("bookname").value;
    let bdesc = "" + document.getElementById("bookdesc").value + "";
    let bauthor = document.getElementById("bookauthor").value;
    let bimage = document.getElementById("bookimage").value;

    if (bname == "") {
        return false;
    } else if (bdesc == "") {
        return false;
    } else if (bauthor == "") {
        return false;
    } else if (bimage == "") {
        return false;
    } else {

        var t = new Date,
            r = t.getDate() + " " + t.getMonth() + " " + t.getFullYear();


        firebase.database().ref('books/' + t.getMilliseconds() + bname).set({
            sender: localStorage.getItem("email"),
            bookname: bname,
            bookdesc: bdesc,
            bookauthor: bauthor,
            bookimage: bimage,
            time: r,
            likes: 0
        });

        document.getElementById("bookname").value = "";
        document.getElementById("bookdesc").value = "";
        document.getElementById("bookauthor").value = "";
        document.getElementById("bookimage").value = "";
        swal.fire("Libri u shtua!");
    }

}


var bb;
/*
function removeBook() {
    var bookpath = document.getElementById("bookpath").value;
    bb = bookpath;

    firebase.database().ref("books/").child(bookpath).remove();
    document.getElementById("bookpath").value = "";
}
*/

// Now show that the message was deleted

firebase.database().ref("books/").on("child_removed", function (snapshot) {
    swal.fire("Libri u fshi!")
});