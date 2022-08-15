// Programoi Erzen Krasniqi



const query = firebase.database().ref('books/').orderByChild("bookname");

// Check if the user is logged in
firebase.auth().onAuthStateChanged(function (e) { e ? (email = e.email, uid = e.uid) : document.getElementById("logout-id").style.display = "none" });

// Show the books when the user loads the page -- Also updates and adds new books

let items = 8;

let others = [];
let searchIndex = [];

function doDynamic(){
    items = items + 4;
    query.limitToLast(1 * items).on('child_added', function (snap) {
    // Get the messages
    let bname = snap.val().bookname;
    let bdesc = snap.val().bookdesc;
    let bauthor = snap.val().bookauthor;
    let bimage = snap.val().bookimage;
    let postKey = snap.key;

    if(others.includes(postKey)){
        return false;
    }

    others.push(postKey);
    createBook(bname, bdesc, bauthor, bimage, postKey);    
    })
}

const worker = new Worker('./js/query.js');

function startQuery(){
    //worker.postMessage("hey");
}


query.on("child_added", function (snap) {
    let bname = snap.val().bookname;
    let bdesc = snap.val().bookdesc;
    let bauthor = snap.val().bookauthor;
    let bimage = snap.val().bookimage;
    let postKey = snap.key;

    bname = bname.toString().toLowerCase();

    let data = {
        "book_name": bname,
        "book_description": bdesc,
        "book_author": bauthor,
        "book_image_url": bimage,
        "book_key": postKey
    };
    searchIndex.push(data);
});


query.limitToFirst(items).on("child_added", function (snapshot) {
    // Get the messages
    let bname = snapshot.val().bookname;
    let bdesc = snapshot.val().bookdesc;
    let bauthor = snapshot.val().bookauthor;
    let bimage = snapshot.val().bookimage;
    let postKey = snapshot.key;
    others.push(postKey);
    createBook(bname, bdesc, bauthor, bimage, postKey);
});


function lookBook(name, description, author, image, key) {
    localStorage.setItem("name", name);
    localStorage.setItem("description", description);
    localStorage.setItem("author", author);
    localStorage.setItem("image", image);
    localStorage.setItem("key", key);
    location.href = "./info.html";
}

function createBook(name, description, author, image, key) {

    let mainD = document.getElementById("myProducts");

    let div = document.createElement("div");
    let divClass1 = document.createAttribute("class");
    let divID = document.createAttribute("id");
    divClass1.value = "col-md-3 cardD";
    divID.value = `uuid-${key}-0`;
    div.setAttributeNode(divClass1);
    div.setAttributeNode(divID);

    mainD.appendChild(div);

    let div2 = document.createElement("div");
    let divClass2 = document.createAttribute("class");
    divClass2.value = "card";
    let style1 = document.createAttribute("style");
    style1.value = "width: 18rem;";
    div2.setAttributeNode(divClass2);
    div2.setAttributeNode(style1);

    div.appendChild(div2);

    let img = document.createElement("img");
    let imgSrc = document.createAttribute("src");
    let imgClass = document.createAttribute("class");
    let imgAlt = document.createAttribute("alt");
    imgSrc.value = image;
    imgClass.value = "card-img-top imageA";
    imgAlt.value = name;
    img.setAttributeNode(imgSrc);
    img.setAttributeNode(imgClass);
    img.setAttributeNode(imgAlt);

    div2.appendChild(img);

    let div3 = document.createElement("div");
    let divClass3 = document.createAttribute("class");
    divClass3.value = "card-body";
    div3.setAttributeNode(divClass3);

    div2.appendChild(div3);

    let h5 = document.createElement("h5");
    let h5Class = document.createAttribute("class");
    let h5Title = document.createAttribute("title");
    h5Class.value = "card-title";
    h5Title.value = name;
    h5.innerText = name;
    h5.setAttributeNode(h5Class);
    h5.setAttributeNode(h5Title);

    let p1 = document.createElement("p");
    let p1Class = document.createAttribute("class");
    p1Class.value = "card.text minimize";
    p1.innerText = description;
    p1.setAttributeNode(p1Class);

    let a1 = document.createElement("a");
    let aHref = document.createAttribute("href");
    let aClass = document.createAttribute("class");
    let onClickA = document.createAttribute("onclick");
    aHref.value = "#loading-book-info";
    aClass.value = "btn btn-primary";
    onClickA.value = `lookBook("${name}", "${description}", "${author}", "${image}", "${key}")`;
    a1.innerText = "Shiko";
    a1.setAttributeNode(aHref);
    a1.setAttributeNode(aClass);
    a1.setAttributeNode(onClickA);

    div3.appendChild(h5);
    div3.appendChild(p1);
    div3.appendChild(a1);


    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            let a3 = document.createElement("a");
            let a3Href = document.createAttribute("href");
            let a3Class = document.createAttribute("class");
            let onClickA3 = document.createAttribute("onclick");
            a3Href.value = `#promoting-${key}`;
            a3Class.value = "btn btn-success deleteB";
            onClickA3.value = `promoteBook("${name}", "${description}", "${author}", "${image}", "${key}")`;
            a3.innerText = "Promote";
            a3.setAttributeNode(a3Href);
            a3.setAttributeNode(a3Class);
            a3.setAttributeNode(onClickA3);
            div3.appendChild(a3);

            let a2 = document.createElement("a");
            let a2Href = document.createAttribute("href");
            let a2Class = document.createAttribute("class");
            let onClickA2 = document.createAttribute("onclick");
            a2Href.value = `#deleting-${key}`;
            a2Class.value = "btn btn-danger deleteB";
            onClickA2.value = `deletebook("${key}")`;
            a2.innerText = "Delete";
            a2.setAttributeNode(a2Href);
            a2.setAttributeNode(a2Class);
            a2.setAttributeNode(onClickA2);
            div3.appendChild(a2);
        } else {
            // No user is signed in.
        }
    });

}

function deletebook(key) {

    Swal.fire({
        title: 'Are you sure you want to delete?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Delete'
    }).then((result) => {
        if (result.isConfirmed) {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    firebase.database().ref("books/").child(key).remove();
                } else {
                    return false;
                }
            });
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: "The book (" + key + ") was deleted.",
                showConfirmButton: false,
                timer: 1500
            })
        }
    })
}

function promoteBook(name, description, author, image, key) {
    const database = firebase.database().ref();

    let t = new Date();
    // Get the data
    let likes = 0;
    let sender = "Admin";
    let time = t.getDay() + "/" + t.getMonth() + "/" + t.getFullYear();
    data = { author, description, image, likes, name, sender, time }
    database.child("ads/-MsVkD5VMlCr50aBprPG").update(data);
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: "Libri (" + name + ") sapo u promovua!",
        showConfirmButton: false,
        timer: 7500
    })
}

firebase.database().ref("books/").on("child_removed", function (snapshot) {
    setTimeout(() => {
        document.getElementById(`uuid-${snapshot.key}-0`).style.transition = "all 0.3s ease-in-out";
        document.getElementById(`uuid-${snapshot.key}-0`).style.opacity = "0.8";
    }, 150);
    setTimeout(() => {
        document.getElementById(`uuid-${snapshot.key}-0`).style.opacity = "0.5";
    }, 350);
    setTimeout(() => {
        document.getElementById(`uuid-${snapshot.key}-0`).style.opacity = "0.2";
    }, 550);
    setTimeout(() => {
        document.getElementById(`uuid-${snapshot.key}-0`).style.display = "none";
    }, 800);
});


function searchBook() {
    var input, filter, cards, cardContainer, title, i;
    input = document.getElementById("myFilter");
    filter = input.value.toUpperCase();
    cardContainer = document.getElementById("myProducts");
    cards = cardContainer.getElementsByClassName("col-md-3");
    for (i = 0; i < cards.length; i++) {
        title = cards[i].querySelector(".card-title");
        if (title.innerText.toUpperCase().indexOf(filter) > -1) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}


function searchQuery(text){
    let object = search(text);
    document.getElementById("searchRes").innerHTML = "";
    for(let i = 0; i < object.length; i++){
        if(object.length > 75){
            document.getElementById("searchRes").innerHTML = `
            <li onclick="lookBook('${object[i].book_name}','${object[i].book_description}','${object[i].book_author}','${object[i]. book_image_url}','${object[i].book_key}')"><img src="${object[i].book_image_url}" width="auto" height="50px" alt="${object[i].book_name}">${object[i].book_name}</li>
        `;
        }
        document.getElementById("searchRes").innerHTML += `
        <li onclick="lookBook('${object[i].book_name}','${object[i].book_description}','${object[i].book_author}','${object[i].book_image_url}','${object[i].book_key}')"><img src="${object[i].book_image_url}" width="auto" height="50px" alt="${object[i].book_name}" loading="lazy"> ${object[i].book_name}</li>

        `;
    }
}


function search(text){
    if(undefined === text || text === '' ) return false;

    text = text.toString().toLowerCase();

    return searchIndex.filter(product => {
        let flag;
        for(let prop in product){
            flag = false;
            flag = product[prop].toString().indexOf(text) > -1;
            if(flag)
            break;
        }

    return flag;
});
}