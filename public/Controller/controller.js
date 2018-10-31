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
    promise.catch(e => console.log(e.message));
});

//Add sign up event
btnSignup.addEventListener('click', e => {
    //get email and ps
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //sign in
    const promise = auth.createUserWithEmailAndPassword(email,pass);
    promise.catch(e => console.log(e.message));    
});

//Add log out event
btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
    document.getElementById("txtEmail").value = "";
    document.getElementById("txtPS").value = "";
});

firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
        console.log(firebaseUser);
        btnLogout.classList.remove('hide');
        btnLogin.classList.add('hide');
        btnSignup.classList.add('hide');
        txtEmail.style.display="none";
        txtPS.style.display="none";

        writeUserData(firebaseUser.uid, txtEmail.value, defaultScore);

    } else {
        console.log("not logged in");
        btnLogout.classList.add('hide');
        btnLogin.classList.remove('hide');
        btnSignup.classList.remove('hide');
        txtEmail.style.display="block";
        txtPS.style.display="block";

    }
});

//Store new user's uid, email, and default score in firebase realtime database
function writeUserData(userId, email, score) {
    firebase.database().ref('users/' + userId).set({
      uid: userId,
      email: email,
      score : score
    });
  }


