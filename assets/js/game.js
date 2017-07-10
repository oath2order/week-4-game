//character object array
  var characterArr = [

  {
    "id": 0,
    "name": "Rey",
    "HP": 200,
    "power": 6,
    "counter": 10,
    "picsource": "assets/images/rey.jpg"
  },
  {
    "id": 1,
    "name": "Finn",
    "HP": 160,
    "power": 10,
    "counter": 15,
    "picsource": "assets/images/finn.png"
  },
  {
    "id": 2,
    "name": "Poe Dameron",
    "HP": 180,
    "power": 12,
    "counter": 5,
    "picsource": "assets/images/poe.png"
  },
  {
    "id": 3,
    "name": "Kylo Ren",
    "HP": 120,
    "power": 10,
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

//writes HTML dynamically from character array
function charGen(i){
  var codestring = "";
  codestring = "<div class='col-sm-2' id='" + i + "'><div class='name'>" + characterArr[i].name +
  "</div><img class='faceimg' src='" + characterArr[i].picsource +
  "' width='128' height='128'><div class='hp'>" + characterArr[i].HP + "</div></div>";
  return codestring;
}

$(".col-sm-2").click(function(){
  var x = this.id;
  
  moveChar(x, "#player_row");


});


function moveChar(x, row){
  var moveobject = $("#" + x).detach();
  $(row).append(moveobject);
}