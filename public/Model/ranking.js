rankings = document.getElementById("rankingBoard");

//get database data as json 
function getUserName(){
    var jsonObj={};
    const data = firebase.database().ref().child('users/');
  
    data.on('value',snap => {
      jsonObj = JSON.stringify(snap.val(),null,2);
    //   jsonObj = JSON.parse(jsonObj);
      console.log(jsonObj);
      rankings.innerHTML = jsonObj;
    });
  }

  getUserName();