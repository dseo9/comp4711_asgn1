//Get elements
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPS');
const btnLogin = document.getElementById("btnLogin");
const btnSignup = document.getElementById('btnSignup')
const btnLogout = document.getElementById("btnLogout");

//Add login event
btnLogin.addEventListener('click', e => {
    //get email and ps
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //sign in
    const promise = auth.signInWithEmailAndPassword(email,pass);
    promise.catch(e => console.log(e.message));
});

//Add signup event
btnSignup.addEventListener('click', e => {
    //get email and ps
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //sign in
    const promise = auth.createUserWithEmailAndPassword(email,pass);
    promise.catch(e => console.log(e.message));
});

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
    } else {
        console.log("not logged in");
        btnLogout.classList.add('hide');
        btnLogin.classList.remove('hide');
        btnSignup.classList.remove('hide');
        txtEmail.style.display="block";
        txtPS.style.display="block";

    }
});