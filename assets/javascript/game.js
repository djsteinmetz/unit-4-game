/* Declaring object variables */
var scoreToMatch;
var playerScore;

// starting with a capital letter says "hey, I'm creating a new generic object that I can use in other places" This object's value = this's passed value - template, generic crux
function Crux (value) {
    this.value = value;
}

/* var horcurxes = ["cruxLocket", "cruxNagini", "cruxDiadem", "cruxCup"] */
var cruxLocket = new Crux();
var cruxNagini = new Crux();
var cruxDiadem = new Crux();
var cruxCup = new Crux();

//funky objects - defined an object 

/* Declaring starting variables */
var wins = 0;
var losses = 0;
var pauseGame = false;

$(document).ready(function() {
    resetAndStart();

    $(".horcruxImage").on("click", function() {

        addPower($(this).attr("id"));

        if (playerScore === scoreToMatch) {
            pauseGame = true;
            $("#playerScore").html("0");
            wins++;
            winModal.style.display = "block";
            resetAndStart();
        }
        else if (playerScore > scoreToMatch) {
            pauseGame = true;
            $("#playerScore").html("0");
            losses++
            loseModal.style.display = "block";
            resetAndStart();
        }

    });
});

/* Primary Game Logic Function */
function resetAndStart() {
    pauseGame = false;
    playerScore = 0;
    scoreToMatch = Math.floor(Math.random() * 102 + 19); 
    // console.log(scoreToMatch);

    var powersArr = [];

    cruxLocket.power = getRandomPower(powersArr);
    cruxNagini.power = getRandomPower(powersArr);
    cruxDiadem.power = getRandomPower(powersArr);
    cruxCup.power = getRandomPower(powersArr);

    // console.log("Locket: " + cruxLocket.power);
    // console.log("Nagini: " + cruxNagini.power);
    // console.log("Diadem: " + cruxDiadem.power);
    // console.log("Cup: " + cruxCup.power);

    // Display values
    $("#scoreDisplay").html(scoreToMatch);
    $("#wins").html(wins);
    $("#losses").html(losses);
}

// creating a unique random number
// store random gen numbers in a temporary array (within the resetAndStart()) Everytime game is restarted, the random powers clear out
// pa - is a local variable that lets the function know you are passing it something
// inside the function - a nickname for the powers array is uesd
// do while will execute minimum of 1 time, and will execute until "something" is met
// (pa.inclues(power)); - searching the array for a unique power number 
// generic and reusable 
// anything you pass in parenthesis, you are handing the function an envelope of goodies.
function getRandomPower(pa) {
    var power;
    // Loop until a unique power value is generated
    do {
        power = Math.floor(Math.random() * 12)+1;
    } while(pa.includes(power));
    pa.push(power);
    return power;
}

function addPower(Crux) {
    switch(Crux) {
        case "cruxLocket":
            playerScore += cruxLocket.power;
            break;
        case "cruxNagini":
            playerScore += cruxNagini.power;
            break;
        case "cruxDiadem":
            playerScore += cruxDiadem.power;
            break;
        case "cruxCup":
            playerScore += cruxCup.power;
            break;
    }
    // Display new power accumulation
    $("#playerScore").html(playerScore);
}
// Get the WIN modal
var winModal = document.getElementById('winModal');
// Get the LOSE modal
var loseModal = document.getElementById('loseModal');
// Get the <span> element that closes the modal
var winSpan = document.getElementsByClassName("winClose")[0];
// Get the <span> element that closes the modal
var loseSpan = document.getElementsByClassName("loseClose")[0];

// When the user clicks on <span> (x), close the win & lose modals
winSpan.onclick = function() {
    winModal.style.display = "none";
}

loseSpan.onclick = function() {
    loseModal.style.display = "none";
}

// When the user clicks anywhere outside of the win or lose modals, close them
window.onclick = function(event) {
    if (event.target == winModal) {
        winModal.style.display = "none";
    }
    else if (event.target == loseModal) {
        loseModal.style.display = "none";
    }
}