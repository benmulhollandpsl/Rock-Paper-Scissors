

//
// Rock Paper Scissor Mechanics
//

//initialize firebase here




// Function to increase move count

  //Listener for when move variable changes
  database.ref("/moves").on("value", function(roShamBo) {
    console.log("changed move" + roShamBo.val().move);
    
    if (roShambo.val().move === 1) {
      playerOneThrow(roShamBo.val().move);
    }
    if (roShambo.val().move === 2) {
      playerTwoThrow(roShambo.val().move);
    }
    if (roShambo.val().move === 3) {
        console.log("Move is 3, evaluating match")
      evaluateMatch();
      database.ref("/results/gameresult").remove()
      console.log("removed the results node")
    }
  });
  //player 1 chooses rock paper or scissor
  function playerOneThrow() {
    $(".details").text("Player 1, choose your throw");
    $(".p1-hands").on("click", playerOneChooseHand);
  }
  
  function playerOneChooseHand() {
    $(".p1-hands").off()
    let hand = $(this).attr("data-value");
    console.log("Player 1 chose" + hand);
    progressMove(2);
    database.ref("/throws/p1throw").child("/throwVal").set(hand);
  }
  //player 2 chooses rock paper or scissor after player 1 has chosen
  function playerTwoThrow() {
    $(".details").text("Player 1 has thrown, player 2, choose your throw");
    $(".p2-hands").on("click", playerTwoChooseHand);
  }
  
  function playerTwoChooseHand() {
    $(".p2-hands").off()
    progressMove(3);
    console.log("Player 2 hand clicked");
    let hand = $(this).attr("data-value");
    console.log("Player 2 chose" + hand);
    database.ref("/throws/p2throw").child("/throwVal").set(hand);
  }
  //function to evaluate if same cards or opponent cards
  function evaluateMatch() {
      database.ref("/throws/")
      .once("value")  //unclear on once function, i want it to run JUST ONCE, hopefully that is what it does
      .then(function(throwRoShamBo) {
          console.log("Displaying throws node once for match evaluation")
          console.log(throwRoShamBo.val())
              let p1throw = throwRoShamBo.val().p1throw.throwVal;
              let p2throw = throwRoShamBo.val().p2throw.throwVal;
              if (p1throw === p2throw){
                  database.ref('/end-of-game').child("/outcome").set("tie")//need to set parent child and results
              } else if(p1throw === "rock"){
                  if(p2throw === "paper"){
                  database.ref('/end-of-game').child("/outcome").set("p2 wins")
                  } else if(p2throw === "scissors")
                  database.ref('/end-of-game').child("/outcome").set("p1 wins")
              } else if (p1throw === "paper"){
                  if(p2throw === "rock"){
                  database.ref('/end-of-game').child("/outcome").set("p1 wins")
                  } else if (p2throw === "scissors"){
                  database.ref('/end-of-game').child("/outcome").set("p2 wins")
                  }
              } else if(p1throw === "scissors"){
                  if(p2throw === "paper"){
                  database.ref('/end-of-game').child("/outcome").set("p1 wins")
                  } else if (p2throw === "rock"){
                   database.ref('/end-of-game').child("/outcome").set("p2 wins")
                  }
              }
          });
      }
  
//   Listens for change in results, triggered by setting outcome and results above
  database.ref('/end-of-game').on("child_added",function(resultRoShamBo){
      console.log("Displaying results node because a child was added", resultRoShamBo.val())
      database.ref("/throws/").once("value").then(function(throwRoShamBo) {
            console.log("Displaying the throws node just once since a child was added to the game results node")
          console.log(throwRoShamBo.val()) 
            if(resultRoShamBo.val() === "tie"){
                ties++
            } else if (resultRoShamBo.val() === "p1 wins"){
                p1wins++
                p2losses++
            } else if(resultRoShamBo.val() === "p2 wins"){
                p2wins++
                p1losses++
            }
            database.ref("/moves").child("/move").set(1); //Bring game back to p1throw point
            $(".details").prepend("The result was: " + resultRoShamBo.val() + "<br><br>");
            $(".details").prepend(" Player 1 chose " + throwRoShamBo.val().p1throw.throwVal + " and player 2 chose " + throwsnap.val().p2throw.throwVal + "<br><br>");
            database.ref("/throws").remove()
            console.log(ties + " ties")
            console.log(p1wins + " p1wins")
            console.log(p2wins + " p2wins") 
            // Update results on page 
            database.ref('/results/gameresult').on("value",function(roShamBo){
              console.log("Updating screen for both because game result has changed")
              $("#p1-wins").text(p1wins);
              $("#p2-wins").text(p2wins);
              $("#p1-losses").text(p1losses);
              $("#p2-losses").text(p2losses);
              $(".ties").text(ties);
          });
      });
  });



  //need to get this to show up as a visual game, this code above is from a few searches on stack overflow combined and trimmed a bit.  I don't know if it actually works yet
  // getting graphics now for ro sham and of course the bo.
  