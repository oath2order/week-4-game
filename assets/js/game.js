//character object array
  var characterArr = [

  {
    "id": 0,
    "name": "Rey",
    "HP": 200,
    "baseHP": 200,    
    "power": 6,
    "basepower": 6,    
    "counter": 5,
    "picsource": "assets/images/rey.jpg"
  },
  {
    "id": 1,
    "name": "Finn",
    "HP": 160,
    "baseHP": 160,     
    "power": 10,
    "basepower": 10,    
    "counter": 15,
    "picsource": "assets/images/finn.png"
  },
  {
    "id": 2,
    "name": "Poe Dameron",
    "HP": 140,
    "baseHP": 140,     
    "power": 12,
    "basepower": 12,
    "counter": 10,
    "picsource": "assets/images/poe.png"
  },
  {
    "id": 3,
    "name": "Kylo Ren",
    "HP": 120,
    "baseHP": 120,     
    "power": 10,
    "basepower": 10,
    "counter": 25,
    "picsource": "assets/images/kylo-ren.jpg"
  }
]
//initializes the screen
var charRow = document.getElementById("character_row");
var gamestate = 0;
$.each(characterArr, function(i){
  $(charRow).append(charGen(i))
});
gameplay();
//writes HTML dynamically from character array
function charGen(i){
  var codestring = "";
  codestring = "<div class='col-sm-2' id='" + i + "'><p class='name'>" + characterArr[i].name +
  "</p><img class='faceimg' src='" + characterArr[i].picsource +
  "' width='128' height='128'><p class='hp'>" + characterArr[i].HP + "</p></div>";
  return codestring;
}

//Handles attack button 
$("#attackbutton").click(function(){
    if(gamestate === 2){
    attack();
    }
});

function attack(){

  var atkId = $( "#player_row > div.col-sm-2" ).attr( "id");
  var defId = $( "#defender_row > div.col-sm-2" ).attr( "id");
  console.log(characterArr[atkId].power);
  characterArr[defId].HP = (characterArr[defId].HP - characterArr[atkId].power);
  characterArr[atkId].HP = (characterArr[atkId].HP - characterArr[defId].counter);
  characterArr[atkId].power = (characterArr[atkId].power + characterArr[atkId].basepower);
  $( "#defender_row > div.col-sm-2 > .hp" ).html(characterArr[defId].HP);
  $( "#player_row > div.col-sm-2 > .hp" ).html(characterArr[atkId].HP);
  $( "#result1").html(characterArr[atkId].name + " attacked "+ characterArr[defId].name + " for " + characterArr[atkId].power + " damage!")
  $( "#result2").html(characterArr[defId].name + " counters for "+ characterArr[defId].counter + " damage!")
  if(characterArr[atkId].HP <= 0){
    $("#instructions").html("YOU HAVE LOST. PRESS THE RESET BUTTON TO TRY AGAIN.")
    $( "#result2").html(" ")
    $( "#result2").html(" ")
    gamestate = 99;
  }
  else if(characterArr[defId].HP <= 0){
    $("#" + defId).remove();
    gamestate = 1;
    $("#instructions").html("SELECT YOUR ENEMY")
    $("#enemy_row").toggle();
  }
}

function gameplay(){
//handles responsiveness for clicking on character
  $(".col-sm-2").click(function(){
    var x = this.id;
  	switch(gamestate){
    case 0:
      if( $("#" + x).hasClass("no-touchy") == false){
        moveChar(x, "#player_row");
        $("#" + x).addClass("no-touchy");
        for (i = 0; i < characterArr.length; i++){
          if(i != x){
            moveChar(i, "#enemy_row");
          }
        }
      }
      gamestate = 1;
      $("#instructions").html("SELECT YOUR ENEMY")
      break;
    case 1:
      if( $("#" + x).hasClass("no-touchy") == false){
        moveChar(x, "#defender_row");
        $("#" + x).addClass("no-touchy");
        $("#enemy_row").toggle();
        gamestate = 2;
        $("#instructions").html("FIGHT!")
      }
      break;    
    } 
  });
} 
function moveChar(x, row){
  var moveobject = $("#" + x).detach();
  $(row).append(moveobject);
}

$("#resetbutton").click(function(){
  for (i = 0; i < characterArr.length; i++) {
    characterArr[i].HP = characterArr[i].baseHP;
    characterArr[i].power = characterArr[i].basepower;
  }
  gamestate = 0;
  $("#player_row").empty();
  $("#enemy_row").empty();
  $("#defender_row").empty();
  $.each(characterArr, function(i){
    $(charRow).append(charGen(i))
  });
  $("#enemy_row").show();
  gameplay();
});