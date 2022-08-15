// Programoi Erzen Krasniqi

// Librat dhe te dhënat e tyre Ardonis Byqmeti

// Check if the user is logged in
firebase.auth().onAuthStateChanged(function (e) { e ? (email = e.email, uid = e.uid) : location.replace("../login.html") });
const db = firebase.firestore();


// Get a reference to the database service

function time_ago(time) {

  switch (typeof time) {
    case 'number':
      break;
    case 'string':
      time = +new Date(time);
      break;
    case 'object':
      if (time.constructor === Date) time = time.getTime();
      break;
    default:
      time = +new Date();
  }
  var time_formats = [
    [60, 'seconds', 1], // 60
    [120, '1 minute ago', '1 minute from now'], // 60*2
    [3600, 'minutes', 60], // 60*60, 60
    [7200, '1 hour ago', '1 hour from now'], // 60*60*2
    [86400, 'hours', 3600], // 60*60*24, 60*60
    [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
    [604800, 'days', 86400], // 60*60*24*7, 60*60*24
    [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
    [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
    [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
    [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
    [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
    [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
    [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
  ];
  var seconds = (+new Date() - time) / 1000,
    token = 'ago',
    list_choice = 1;

  if (seconds == 0) {
    return 'Just now'
  }
  if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = 'from now';
    list_choice = 2;
  }
  var i = 0,
    format;
  while (format = time_formats[i++])
    if (seconds < format[0]) {
      if (typeof format[2] == 'string')
        return format[list_choice];
      else
        return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
    }
  return time;
}


function removeTags(str) {
    if (str === null || str === "") return false;
    else str = str.toString();
    return str.replace(/(<([^>]+)>)/gi, "");
}


function addBook() {

    let bname = document.getElementById("bookname").value;
    let bdesc = "" + document.getElementById("bookdesc").value + "";
    let bauthor = document.getElementById("bookauthor").value;
    let bimage = document.getElementById("bookimage").value;
    bdesc = bdesc.replace(/["']/g, "");
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


        let keyA = `${t.getMilliseconds() + bname + Math.floor((Math.random() * 1000) + 1)}`;
        keyA = keyA.replace(/\s/g, '')

        firebase.database().ref('books/' + keyA).set({
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


db.collection("books").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        let name = doc.data().owner;
        let email = doc.data().uEmail;
        let bname = doc.data().bookName;
        let bauthor = doc.data().bookAuthor;
        let bdecs = doc.data().bookDescription;
        let bimage = doc.data().bookImageURL;
        let ms = doc.data().ms;
        let time = doc.data().time;
        let key = doc.id;

        addBookToUL(name, email, bname, bauthor, bdecs, bimage, ms, time, key);
    });
});


function addBookToUL(name, email, bname, bauthor, bdecs, bimage, btime, bt, key){
    let ul = document.getElementById("ul");
    let li = document.createElement("li");

    let att1 = document.createAttribute("class");
    let att2 = document.createAttribute("id");

    att1.value = "list";
    att2.value = key;

    li.setAttributeNode(att1);
    li.setAttributeNode(att2);

    li.innerHTML = `<b>${bname}</b>      - by ${name} (${email}) - ${time_ago(btime)} <button onclick="openMenu('${name}','${email}','${bname}', '${bauthor}', '${bdecs}}', '${bimage}', '${btime}', '${bt}', '${key}')">Details</button>`;

    ul.appendChild(li);
}

function openMenu(name, email, bname, bauthor, bdecs, bimage, btime, bt, key){

    document.getElementById("page").classList.add("hidden");
    document.getElementById("details").classList.remove("hidden");
    document.getElementById("name").innerText = name;
    document.getElementById("email").innerText = email;
    document.getElementById("ms").innerText = time_ago(Number(btime));
    document.getElementById("time").innerText = bt;
    document.getElementById("bookName").innerText = bname;
    document.getElementById("bookAuthor").innerText = bauthor;
    document.getElementById("bookDesc").innerText = bdecs;
    document.getElementById("bookImage").innerHTML = `<img src="${bimage}" alt="${bname}" width="320px height="auto">`;
    document.getElementById("bookKey").innerText = key;

    let div = document.getElementById("details");

    document.getElementById('but1').setAttribute( "onclick", `approveBook('${name}', '${email}', '${bname}', '${bdecs}', '${bauthor}', '${bimage}', '${key}')`);
    document.getElementById('but2').setAttribute( "onclick", `denyBook('${name}', '${email}', '${key}')` );


}

function closeMenu(){
    document.getElementById("page").classList.remove("hidden");
    document.getElementById("details").classList.add("hidden");
}

function approveBook(name, email, bname, bdesc, bauthor, bimage, key){

    firebase.database().ref('books/' + key).set({
            sender: name + "(" + email + ")",
            bookname: bname,
            bookdesc: bdesc,
            bookauthor: bauthor,
            bookimage: bimage,
            time: new Date().getTime(),
            likes: 0
        }).then(() => {
            sendEmailApproved(name, email);
            document.getElementById(key).remove();
        }).catch((error) => {
            console.log("Fatal error!");
        });
        document.getElementById(key).remove();
        db.collection("books").doc(key).delete().then(() => {
            console.log("Book successfully approved!");
            document.getElementById(key).remove();
            closeMenu();
            }).catch((error) => {
            //console.error("Error removing document: ", error);
        });
        closeMenu();


}

function denyBook(name, email, book){
    db.collection("books").doc(book).delete().then(() => {
    console.log("Book successfully deleted!");
    document.getElementById(book).remove();
    closeMenu();
    sendEmailDenied(name, email);
    }).catch((error) => {
    //console.error("Error removing document: ", error);
    });
}

function sendEmailApproved(name, email){
    // code fragment
var data = {
    service_id: 'service_7tbarne',
    template_id: 'template_nel4r0b',
    user_id: 'zXv52AQuXbJYllpKH'
};
 
$.ajax('https://api.emailjs.com/api/v1.0/email/send', {
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json'
}).done(function() {
    console.log('Your mail is sent!');
}).fail(function(error) {
    console.log('Oops... ' + JSON.stringify(error));
});
// code fragment

}


function sendEmailDenied(name, email){
    // code fragment
var data = {
    service_id: 'service_7tbarne',
    template_id: 'template_pn5g0vp',
    user_id: 'zXv52AQuXbJYllpKH'
};
 
$.ajax('https://api.emailjs.com/api/v1.0/email/send', {
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json'
}).done(function() {
    console.log('Your mail is sent!');
}).fail(function(error) {
    console.log('Oops... ' + JSON.stringify(error));
});
// code fragment
}