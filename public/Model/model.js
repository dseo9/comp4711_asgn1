var alphabets = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var wordList = ["tattoo","electricity","school","homework","hello","world","chicken","pizza","apple","microsoft"];
var definitionList = ["a form of body modification where a design is made by inserting ink",
                      "is the set of physical phenomena associated with the presence and motion of electric charge",
                      "an institution for educating children",
                      "schoolwork assigned to be done outside the classroom",
                      "used to express a greeting",
                      "the earth or globe, considered as a planet",
                      "the flesh of the chicken",
                      "a flat, open-faced baked pie of Italian origin",
                      "the usually round, red or yellow, edible fruit of a small tree",
                      "computer software company, founded 1975"];

//Guessing word
var randomNum = Math.floor(Math.random() * wordList.length);
var generateWord = wordList[randomNum];
var guessWord = generateWord.split(''); //Splits the word into characters
var wordSize = guessWord.length;
var wordSize2 = wordSize;
var storeId = new Array(wordSize);

//Definition
var wordDefinition = definitionList[randomNum].toString();
var getDef = document.createTextNode(wordDefinition);

//User guess limit
var defaultGuessLimit = 7;

//User score
var defaultScore = 0;

//Popup message
var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];
var popupMsg = document.getElementById("popup_msg");

//Reset button
var resetBtn = document.createElement("button");
var btnText = document.createTextNode("Play Again?");

//Get elements for user sign up and log in
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPS');
const btnLogin = document.getElementById("btnLogin");
const btnSignup = document.getElementById('btnSignup')
const btnLogout = document.getElementById("btnLogout");

//Grab the element that has the id and replace content to letter
function replace(letter, id) {
    document.getElementById(id).innerHTML = letter;
}

function checkGuess(alphaId) {
    if (guessWord.includes(alphaId)) {
        for(i=0; i < wordSize; i++) {
            var temp = storeId[i];
            var tester = alphaId+i;
            if (temp == tester) {
                replace(alphaId, temp);
                wordSize2--;
                defaultScore++;
                updateUserData(firebase.auth().currentUser.uid, defaultScore);
            }
        }
        document.getElementById("points").innerHTML = defaultScore;
    } else {
        defaultGuessLimit--;
        defaultScore--;
        updateUserData(firebase.auth().currentUser.uid, defaultScore);

        document.getElementById("numOfGuess").innerHTML = defaultGuessLimit;
        document.getElementById("points").innerHTML = defaultScore;

        if (defaultGuessLimit == 0) {
            lose();
        }
    }
    document.getElementById(alphaId).disabled = true;
    document.getElementById(alphaId).style.backgroundColor = "grey";
    document.getElementById(alphaId).style.color = "grey";

    if (wordSize2 == 0) {
        win();
    }
}

//Displays the limit
document.getElementById("numOfGuess").innerHTML = defaultGuessLimit;

//Displays the user's score
document.getElementById("points").innerHTML = defaultScore;

//Display message and confirm if user wants to play again
function win() {
    window.setInterval(function() {
      modal.style.display = "block";
      popupMsg.innerHTML = "Congratulations! You guessed the word!";

      // When the user clicks on <span> (x), close the modal
      span.onclick = function() {
            reset();

      }

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        reset();
      }
    },100);
}

//Display message and confirm if user wants to play again
function lose() {
    window.setInterval(function() {
      modal.style.display = "block";
      console.log("modal");
      popupMsg.innerHTML = "You lost! You used up all your guess!";

      // When the user clicks on <span> (x), close the modal
      span.onclick = function() {
        reset();
      }

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        reset();
      }
    }, 100);
}
