//Controller: Connects the view and model

//Resets the game
function reset() {
    location.reload();
}

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
                localStorage.setItem("saveScore", defaultScore);
            }
        }
        document.getElementById("points").innerHTML = defaultScore;
    } else {
        defaultGuessLimit--;
        defaultScore--;
        localStorage.setItem("saveScore", defaultScore);
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
