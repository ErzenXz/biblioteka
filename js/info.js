// Programoi Erzen Krasniqi

// Librat dhe te dhënat e tyre Ardonis Byqmeti

// Check if the user is logged in
firebase.auth().onAuthStateChanged(function (e) { e ? (email = e.email, uid = e.uid) : document.getElementById("logout-id").style.display = "none" });

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function updateText() {
    document.getElementById("title").innerText = capitalizeFirstLetter(localStorage.getItem("name"));
    document.getElementById("likeB").innerText = capitalizeFirstLetter(localStorage.getItem("author"));
    document.getElementById("desc").innerText = capitalizeFirstLetter(localStorage.getItem("description"));
    document.getElementById("img").src = capitalizeFirstLetter(localStorage.getItem("image"));
    document.getElementById("url").href = "#" + localStorage.getItem("key");
    //document.getElementById("url").click();
}

const key = localStorage.getItem("key");

const query = firebase.database().ref('comments/' + key).limitToLast(100);

const bannedwords = ["ahole", "anus", "ash0le", "ash0les", "asholes", "ass", "Ass Monkey", "Assface", "assh0le", "assh0lez", "asshole", "assholes", "assholz", "asswipe", "azzhole", "bassterds", "bastard", "bastards", "bastardz", "basterds", "basterdz", "Biatch", "bitch", "bitches", "Blow Job", "boffing", "butthole", "buttwipe", "c0ck", "c0cks", "c0k", "Carpet Muncher", "cawk", "cawks", "Clit", "cnts", "cntz", "cock", "cockhead", "cock-head", "cocks", "CockSucker", "cock-sucker", "crap", "cum", "cunt", "cunts", "cuntz", "dick", "dild0", "dild0s", "dildo", "dildos", "dilld0", "dilld0s", "dominatricks", "dominatrics", "dominatrix", "dyke", "enema", "f u c k", "f u c k e r", "fag", "fag1t", "faget", "fagg1t", "faggit", "faggot", "fagg0t", "fagit", "fags", "fagz", "faig", "faigs", "fart", "flipping the bird", "fuck", "fucker", "fuckin", "fucking", "fucks", "Fudge Packer", "fuk", "Fukah", "Fuken", "fuker", "Fukin", "Fukk", "Fukkah", "Fukken", "Fukker", "Fukkin", "g00k", "God-damned", "h00r", "h0ar", "h0re", "hells", "hoar", "hoor", "hoore", "jackoff", "jap", "japs", "jerk-off", "jisim", "jiss", "jizm", "jizz", "knob", "knobs", "knobz", "kunt", "kunts", "kuntz", "Lezzian", "Lipshits", "Lipshitz", "masochist", "masokist", "massterbait", "masstrbait", "masstrbate", "masterbaiter", "masterbate", "masterbates", "Motha Fucker", "Motha Fuker", "Motha Fukkah", "Motha Fukker", "Mother Fucker", "Mother Fukah", "Mother Fuker", "Mother Fukkah", "Mother Fukker", "mother-fucker", "Mutha Fucker", "Mutha Fukah", "Mutha Fuker", "Mutha Fukkah", "Mutha Fukker", "n1gr", "nastt", "nigger;", "nigur;", "niiger;", "niigr;", "orafis", "orgasim;", "orgasm", "orgasum", "oriface", "orifice", "orifiss", "packi", "packie", "packy", "paki", "pakie", "paky", "pecker", "peeenus", "peeenusss", "peenus", "peinus", "pen1s", "penas", "penis", "penis-breath", "penus", "penuus", "Phuc", "Phuck", "Phuk", "Phuker", "Phukker", "polac", "polack", "polak", "Poonani", "pr1c", "pr1ck", "pr1k", "pusse", "pussee", "pussy", "puuke", "puuker", "queer", "queers", "queerz", "qweers", "qweerz", "qweir", "recktum", "rectum", "retard", "sadist", "scank", "schlong", "screwing", "semen", "sex", "sexy", "Sh!t", "sh1t", "sh1ter", "sh1ts", "sh1tter", "sh1tz", "shit", "shits", "shitter", "Shitty", "Shity", "shitz", "Shyt", "Shyte", "Shytty", "Shyty", "skanck", "skank", "skankee", "skankey", "skanks", "Skanky", "slag", "slut", "sluts", "Slutty", "slutz", "son-of-a-bitch", "turd", "va1jina", "vag1na", "vagiina", "vagina", "vaj1na", "vajina", "vullva", "vulva", "w0p", "wh00r", "wh0re", "whore", "xrated", "xxx", "b!+ch", "bitch", "blowjob", "clit", "arschloch", "fuck", "shit", "ass", "asshole", "b!tch", "b17ch", "b1tch", "bastard", "bi+ch", "boiolas", "buceta", "c0ck", "cawk", "chink", "cipa", "clits", "cock", "cum", "cunt", "dildo", "dirsa", "ejakulate", "fatass", "fcuk", "fuk", "fux0r", "hoer", "hore", "jism", "kawk", "l3itch", "l3i+ch", "lesbian", "masturbate", "masterbat*", "masterbat3", "motherfucker", "s.o.b.", "mofo", "nazi", "nigga", "nigger", "nutsack", "phuck", "pimpis", "pusse", "pussy", "scrotum", "sh!t", "shemale", "shi+", "sh!+", "slut", "smut", "teets", "boobs", "b00bs", "teez", "testical", "testicle", "w00se", "jackoff", "wank", "whoar", "whore", "*damn", "*dyke", "*fuck*", "*shit*", "@$$", "amcik", "andskota", "arse*", "assrammer", "ayir", "bi7ch", "bitch*", "bollock*", "breasts", "butt-pirate", "cabron", "cazzo", "chraa", "chuj", "Cock*", "cunt*", "d4mn", "daygo", "dego", "dick*", "dike*", "dupa", "dziwka", "ejackulate", "Ekrem*", "Ekto", "enculer", "faen", "fag*", "fanculo", "fanny", "feces", "feg", "Felcher", "ficken", "fitt*", "Flikker", "foreskin", "Fotze", "Fu(*", "fuk*", "futkretzn", "gook", "guiena", "h0r", "h4x0r", "helvete", "hoer*", "honkey", "Huevon", "hui", "injun", "jizz", "kanker*", "kike", "klootzak", "kraut", "knulle", "kuk", "kuksuger", "Kurac", "kurwa", "kusi*", "kyrpa*", "lesbo", "mamhoon", "masturbat*", "merd*", "mibun", "monkleigh", "mouliewop", "muie", "mulkku", "muschi", "nazis", "nepesaurio", "nigger*", "orospu", "paska*", "perse", "picka", "pierdol*", "pillu*", "pimmel", "piss*", "pizda", "poontsee", "poop", "porn", "p0rn", "pr0n", "preteen", "pula", "pule", "puta", "puto", "qahbeh", "queef*", "rautenberg", "schaffer", "scheiss*", "schlampe", "schmuck", "screw", "sh!t*", "sharmuta", "sharmute", "shipal", "shiz", "skribz", "skurwysyn", "sphencter", "spic", "spierdalaj", "splooge", "suka", "b00b*", "testicle*", "twat", "vittu", "wank*", "wetback*", "wichser", "wop*", "yed", "zabourah", "pidhi", "pirdhu", "pidh", "pidhuc", "kari", "kar", "karuc", "piqk", "piqken", "muti", "mut", "pshurq", "shurr", "karlesh", "qirje", "gay", "bitch", "snitch", "qifsha", "gojore", "hanksh mutin", "mutin", "qifsha nanen", "qifsha motren", "qifsha familjen", "ta qifsha", "qifsha", "hanksh karin", "qifsha ropt", "seks", "sex", "porn", "xnxx", "x n x x", "x nxx", "pornhub", "kaka", "seksi", "qihemi", "qihem", "qifsha", "xvideos", ];

let chat;

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





function createText(message, key, time) {
    let ul = document.querySelector("#ulist");
    let li = document.createElement('li');

    let messageSecure = removeTags(message);

    let text = `${messageSecure} <br> <span class="time">${time_ago(time)}</span>`;
    li.innerHTML = text;

    let attribute1 = document.createAttribute('id');
    let attribute2 = document.createAttribute('class');
    attribute1.value = `message-id-${key}`;
    attribute2.value = "message-class animate__bounceIn";
    li.setAttributeNode(attribute1);
    li.setAttributeNode(attribute2);

    ul.appendChild(li);
}

let browserName;

function fnBrowserDetect(){
                 
         let userAgent = navigator.userAgent;
      
         if(userAgent.match(/chrome|chromium|crios/i)){
             browserName = "Chrome";
           }else if(userAgent.match(/firefox|fxios/i)){
             browserName = "Firefox";
           }  else if(userAgent.match(/safari/i)){
             browserName = "Safari";
           }else if(userAgent.match(/opr\//i)){
             browserName = "Opera";
           } else if(userAgent.match(/edg/i)){
             browserName = "Edge";
           }else{
             browserName="No browser detection";
           }
         
        return browserName + " browser";
  }

browserName = fnBrowserDetect();




function sendMessage() {

    let message = document.getElementById('message').value;
    let name = message.toLowerCase();
    message = removeTags(message);

    if (message == "") {
        return false;
    }

    let time = new Date();
    
    const arrayBad = bannedwords.length;

        for (let i = 0; i < arrayBad; i++) {
            if (bannedwords[i] == name) {
                message = message.replace(new RegExp(bannedwords[i], "g"), "****");
                if(browserName == "Safari"){
                    return false;
                }
            }
        }
        for (let i = 0; i < arrayBad; i++) {
            if (name.includes(bannedwords[i])) {
                message = message.replace(new RegExp(bannedwords[i], "g"), "****");
                if(browserName == "Safari"){
                    alert("You are using banned words, please remove them.")
                    return false;
                }
            }
        }

    firebase.database().ref("comments/" + key).push().set({
        message: message,
        time: time.getTime(),
        key: key
    });

    document.getElementById('message').value = "";
    disableChat();
    setTimeout(() => { enableChat(); }, 5000);
}


function scrollWin() {
    window.scrollTo(300, 5000);
}
query.on("child_added", function (snapshot) {
    // Get the messages
    let message = snapshot.val().message;
    let postKey = snapshot.key;
    let timeSent = snapshot.val().time;

    createText(message, postKey, timeSent);
    $('#ulist').animate({ scrollTop: $('#ulist').prop("scrollHeight") }, 0);

});


function enableChat() {
    chat = true;
    document.getElementById('btn-send').disabled = false;
    document.getElementById('btn-send').style.cursor = "pointer";
}

function disableChat() {
    chat = false;
    document.getElementById('btn-send').disabled = true;
    document.getElementById('btn-send').style.cursor = "not-allowed";
}

