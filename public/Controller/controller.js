//Resets the game
function reset() {
  location.reload();
}

//Add log in event
btnLogin.addEventListener('click', e => {
  //get email and ps
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();
  //sign in
  const promise = auth.signInWithEmailAndPassword(email,pass);
  //check validation
  promise.catch(e => emsg.innerHTML = e.message);
  promise.then(e => emsg.innerHTML = "");
  //set score to user's saved score
  // document.getElementById("points").innerHTML = firebase.auth().currentUser.score;    
});

//Add sign up event
btnSignup.addEventListener('click', e => {
  //get email and ps
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();
  //sign in
  const promise = auth.createUserWithEmailAndPassword(email,pass);
  //check validation
  promise.catch(e => emsg.innerHTML = e.message);
  promise.then(e => emsg.innerHTML = "");
  //set score to 0
  document.getElementById("points").innerHTML = 0;    
});

//Add log out event
btnLogout.addEventListener('click', e => {
  firebase.auth().signOut();
});

firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
      console.log(firebaseUser);
      btnLogout.classList.remove('hide');
      btnLogin.classList.add('hide');
      btnSignup.classList.add('hide');
      ranking.classList.remove('hide');
      txtEmail.style.display="none";
      txtPS.style.display="none";
      GameBoard.style.display="block";

      writeUserData(firebaseUser.uid, defaultScore);

  } else {
      console.log("not logged in");
      btnLogout.classList.add('hide');
      btnLogin.classList.remove('hide');
      btnSignup.classList.remove('hide');
      ranking.classList.add('hide');
      txtEmail.style.display="block";
      txtPS.style.display="block";
      GameBoard.style.display="none";
 
  }
});

//Store new user's uid, email, and default score in firebase realtime database
function writeUserData(userId, score) {
  firebase.database().ref('users/' + userId).set({
    uid: userId,
    score : score
  });
}

//Update current user's score in database
function updateUserData(userId, score) {
  firebase.database().ref('users/' + userId).set({
    uid: userId,
    score : score
  });
}
