// Programoi Erzen Krasniqi
const query = firebase.database().ref('ads/');
const db = firebase.firestore();


// Check if the user is logged in
firebase.auth().onAuthStateChanged(function (e) { e ? (email = e.email, uid = e.uid) : document.getElementById("logout-id").style.display = "none" });

function lookBook(name, description, author, image, key) {
    localStorage.setItem("name", name);
    localStorage.setItem("description", description);
    localStorage.setItem("author", author);
    localStorage.setItem("image", image);
    localStorage.setItem("key", key);
    location.href = "./info.html";
}

query.on("child_added", function (snapshot) {
    // Get the messages
    let bname = snapshot.val().name;
    let bdesc = snapshot.val().description;
    let bauthor = snapshot.val().author;
    let bimage = snapshot.val().image;
    let postKey = snapshot.key;
    let card = document.getElementById("card-button");

    let att1 = document.createAttribute("onclick");
    att1.value = `lookBook("${bname}", "${bdesc}", "${bauthor}", "${bimage}", "${postKey}")`;

    card.setAttributeNode(att1);

    document.getElementById("imgA").src = bimage;
    document.getElementById("card-title").innerText = bname;
    document.getElementById("card-text").innerText = bdesc;
});

query.on("child_changed", function (snapshot) {
    // Get the messages
    let bname = snapshot.val().name;
    let bdesc = snapshot.val().description;
    let bauthor = snapshot.val().author;
    let bimage = snapshot.val().image;
    let postKey = snapshot.key;

    document.getElementById("imgA").src = bimage;
    document.getElementById("card-title").innerText = bname;
    document.getElementById("card-text").innerText = bdesc;
});

function generateRandom(){
    const array = new Uint32Array(1);
    self.crypto.getRandomValues(array);

    for (const num of array) {
        return num;
    }
}

function addBook() {
        var t = new Date();
        let time = t.getDate() + " " + t.getMonth() + " " + t.getFullYear();
        let b = t.getTime();

        let uName = document.getElementById("name").value;
        let uEmail = document.getElementById("email").value;
        let bookName = document.getElementById("book_name").value;
        let bookAuthor = document.getElementById("book_author").value;
        let bookDescription = document.getElementById("book_description").value;
        let bookImageURL = document.getElementById("book_image_url").value;
        bookDescription = bookDescription.replace(/["']/g, "");

        if(uName == "" || uEmail == "" || bookName == "" || bookAuthor == "" || bookDescription == "" || bookImageURL == "") {
            return false;
        }

        let documentID = bookName + "-" + uName + "-" + generateRandom();
        documentID = documentID.replace(/ /g,"-");
        db.collection("books").doc(documentID).set({
            owner: uName,
            uEmail,
            time: time,
            ms: b,
            bookName,
            bookAuthor,
            bookDescription,
            bookImageURL
        }).then(() => {
            Swal.fire(
                'Adding Book!',
                'Libri juaj është shtuar, mirpo po pret verifikimin e administratorëve.',
                'success'
            );
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("book_name").value = "";
            document.getElementById("book_author").value = "";
            document.getElementById("book_description").value = "";
            document.getElementById("book_image_url").value = "";
        }).catch((error) => {
            Swal.fire(
                'Fatal error',
                'An error has occurred',
                'error'
            );
        });
}

function showVersion(){
        Swal.fire(
            'Biblioteka e qytetit!',
            'Biblioteka e qytetit po vepron ne versionin 2.0 Beta.',
            'info'
            );
}