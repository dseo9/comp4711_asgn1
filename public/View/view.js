//Display the alphabets array as buttons and assign them with id
for (var i = 0; i < alphabets.length; i++) {
      var buttons = document.createElement("button");
      var labels = document.createTextNode(alphabets[i]);
      buttons.appendChild(labels);
      document.getElementById("alphaButtons").appendChild(buttons);
      //Assign id to each button
      var char = (i+10).toString(36); //THIS PART
      buttons.id = char;
      buttons.onclick = function() {checkGuess(this.id);}
  }
  
  //Display the guessing word as buttons without labels
  for (i = 0; i < wordSize; i++) {
        var inputBox = document.createElement("button");
        inputBox.className = "btn btn-secondary"
        inputBox.disabled = 'true';
        inputBox.id = guessWord[i]+i;
        storeId[i] = inputBox.id;
        document.getElementById("guessingWord").appendChild(inputBox);
  }
  
  //Displays the reset button
  resetBtn.appendChild(btnText);
  document.getElementById("resetButton").appendChild(resetBtn);
  resetBtn.onclick = function() {
        reset();
        //when user win saves score and its uid in database
        writeUserData(firebase.auth().currentUser.uid, defaultScore);
      };
  
  //Displays the word's definition
  document.getElementById("guessingWordDefinition").appendChild(getDef);
  
  
  