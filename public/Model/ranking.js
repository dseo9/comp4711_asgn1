rankings = document.getElementById("rankingBoard");

//get database data as json 
function getData(){
    var jsonObj={};
    const data = firebase.database().ref().child('users/');
  
    data.on('value',snap => {
      jsonObj = JSON.stringify(snap.val(),null,2);
      jsonObj = JSON.parse(jsonObj);
      console.log(jsonObj);
    //   rankings.innerHTML = jsonObj;
    

      var array = [];

      for (var key in jsonObj) {
          array.push(jsonObj[key]);
        
      }
      array.sort(function(a, b){
          return b.score - a.score;
      });
      
      var rank = 1;
      for (var i = 0; i < array.length; i++) {
        if (i > 0 && array[i].score < array[i - 1].score) {
            rank++;
        }
          array[i].rank = rank;
      }
      
      console.log(array);
    
    
    });
  }

  getData();