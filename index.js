btncolors = ["red","blue","green","yellow"]
gamepattern = [];
userpattern = [];
started = false;
function newSequence(){
  var r = Math.trunc(Math.random()*4);
  var rc = btncolors[r];
  gamepattern.push(rc);
  m = gamepattern.length;
  $("h1").text("level "+m);
  $("."+rc).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio=new Audio("simon songs/"+rc+".mp3");
  audio.play();

}
$(".btn").click(function(){
  var user = this.innerHTML;
  var audio=new Audio("simon songs/"+user+".mp3");
  audio.play();
  userpattern.push(user);
  animatePress(user);
  checkAnswer(userpattern.length - 1);
});

function animatePress(current){
  $("."+current).addClass("pressed");
  setTimeout(function () {
    $("." + current).removeClass("pressed");
  }, 100);
}
$(document).keydown(function(){

  if (!started){
  newSequence();
  started = true;
}
});

function checkAnswer(ll){
  if (userpattern[ll]==gamepattern[ll]){
    console.log("success");
    if(userpattern.length == gamepattern.length) {
      userpattern = [];
      setTimeout(function () {
        newSequence();
      }, 1000);
    }
  }
  else{
    console.log("wrong");
    var audio=new Audio("simon songs/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },100);
    $("h1").text("Game Over, Press Any Key to Restart");
    started= false;
    gamepattern=[];
    userpattern=[];
  }

}
