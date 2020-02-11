

//
// Rock Paper Scissor Mechanics
//

//how does this communicate with firebase



// Function to increase move count

  //Listener for when move variable changes
 
  //player 1 chooses rock paper or scissor
  function playerOneThrow() {
    $(".details").text("Player 1, choose your throw");
    $(".p1-hands").on("click", playerOneChooseHand);
  }
  
  function playerOneChooseHand() {
    $(".p1-hands").off()
    let hand = $(this).attr("data-value");
    console.log("Player 1 chose" + hand);

  //player 2 chooses rock paper or scissor after player 1 has chosen
  function playerTwoThrow() {
    
  
  function playerTwoChooseHand() {
  
  //function to evaluate if same cards or opponent cards
  
      .once("value")  //unclear on once function, i want it to run JUST ONCE, hopefully that is what it does
      .then(function(throwRoShamBo) {
          console.log("Displaying throws node once for match evaluation")
          
  
//   Listens for change in results, triggered by setting outcome and results above
  
            //Bring game back to p1throw point
            // $(".details").prepend("The result was: " + resultRoShamBo.val() + "<br><br>");
           
        //  (ties + " ties")
        //   (p1wins + " p1wins")
        //  (p2wins + " p2wins") 
            // Update results on page 
            // database.ref('/results/gameresult').on("value",function(roShamBo){


        //totally hit a wall with this assignment I'm having difficulty overall with this assignment.  Will complete it by next week if not sooner.


