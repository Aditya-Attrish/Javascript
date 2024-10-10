//Gobal variables
const scoreDiv = document.getElementById("score");
const gridContainer = document.getElementById('game-container');
const restartButton = document.getElementById('restart-button');
let startX, startY, endX, endY;
let score = 0, width = 4;
let board = [];

// Random Number generate function
function generate() {
        const randomNumber = Math.floor(Math.random() * board.length)
        if (board[randomNumber].innerHTML === "") {
            board[randomNumber].innerHTML = 2;
            checkGameOver();
        } else generate();
}

//Choose colors
function colors(){
	for(let i = 0;i<16; i++){
	if (board[i].innerHTML === "") board[i].style.backgroundColor = "#afa192"
    else if (board[i].innerHTML === "2") board[i].style.backgroundColor = "#eee4da"
    else if (board[i].innerHTML === "4") board[i].style.backgroundColor = "#ede0c8"
    else if (board[i].innerHTML === "8") board[i].style.backgroundColor = "#f2b179"
    else if (board[i].innerHTML === "16") board[i].style.backgroundColor = "#ffcea4"
    else if (board[i].innerHTML === "32") board[i].style.backgroundColor = "#e8c064"
    else if (board[i].innerHTML === "64") board[i].style.backgroundColor = "#ffab6e"
    else if (board[i].innerHTML === "128") board[i].style.backgroundColor = "#fd9982"
    else if (board[i].innerHTML === "256") board[i].style.backgroundColor = "#ead79c"
    else if (board[i].innerHTML === "512") board[i].style.backgroundColor = "#76daff"
    else if (board[i].innerHTML === "1024") board[i].style.backgroundColor = "#beeaa5"
     else if (board[i].innerHTML === "2048") board[i].style.backgroundColor = "#d7d4f0"
	}
}

// restart game 
function restartGame() {
        
    if(board.length === 0){
	    for (let i = 0; i < 16; i++) {
		      const tile = document.createElement('div');
		      tile.classList.add('tile');
		      tile.innerHTML = "";
    	      gridContainer.appendChild(tile);
    	      board.push(tile);
	    }
    }
    else{
    	for (let i = 0; i < 16; i++)
    		board[i].innerHTML = "";
    	let info = document.getElementById("info");
    	info.classList.remove("active");
    }
    
    gridContainer.addEventListener('touchstart', handleTouchStart);
	gridContainer.addEventListener('touchend', handleTouchEnd);
	
    score = 0;
    scoreDiv.innerHTML = `Score: ${score}`;
    generate();
    generate();
    colors();
}

// Define Move functions
function combine(arr){
	for (let i = 0; i < arr.length-1; i++) {
		if (arr[i] === arr[i+1]) {
			let TotalCombined = parseInt(arr[i]) * 2;
			arr[i] = `${TotalCombined}`;
			arr[i+1] = "";
			score += TotalCombined;
			scoreDiv.innerHTML = `Score: ${score}`;
		}
	}
	return arr.filter(num => num)
}

// Move tiles to the left direction
function leftMove(){
	for (let i = 0; i < 16; i += 4) {
            let totalOne = board[i].innerHTML
            let totalTwo = board[i + 1].innerHTML
            let totalThree = board[i + 2].innerHTML
            let totalFour = board[i + 3].innerHTML
            let row = [totalOne, totalTwo, totalThree, totalFour]

            let filteredRow = row.filter(num => num)
            
            // combine same elements
            if (filteredRow.length > 1) 
            	filteredRow = combine(filteredRow);
            	
            let missing = 4 - filteredRow.length
            
            if(missing > 0  && missing < 4){
                let empty_string = Array(missing).fill("")
                let newRow = filteredRow.concat(empty_string)
               
                board[i].innerHTML = newRow[0];
                board[i + 1].innerHTML = newRow[1]
                board[i + 2].innerHTML = newRow[2]
                board[i + 3].innerHTML = newRow[3]
            }
    }
}

function rightMove(){
	for (let i = 0; i < 16; i += 4) {
            let totalOne = board[i].innerHTML
            let totalTwo = board[i + 1].innerHTML
            let totalThree = board[i + 2].innerHTML
            let totalFour = board[i + 3].innerHTML
            let row = [totalOne, totalTwo, totalThree, totalFour]

            let filteredRow = row.filter(num => num)
            
            // combine same elements
            if (filteredRow.length > 1) {
            	filteredRow = combine(filteredRow);
            }
            let missing = 4 - filteredRow.length
            
            if(missing > 0  && missing < 4){
                let empty_string = Array(missing).fill("")
                let newRow = empty_string.concat(filteredRow);
               
                board[i].innerHTML = newRow[0];
                board[i + 1].innerHTML = newRow[1]
                board[i + 2].innerHTML = newRow[2]
                board[i + 3].innerHTML = newRow[3]
            }
    }
}

function upMove(){
	for (let i = 0; i < 4; i++) {
            let totalOne = board[i].innerHTML
            let totalTwo = board[i + width].innerHTML
            let totalThree = board[i + width * 2].innerHTML
            let totalFour = board[i + width * 3].innerHTML
            let column = [totalOne, totalTwo, totalThree,totalFour]

            let filteredColumn = column.filter(num => num)
            
            // combine same elements
            if (filteredColumn.length > 1) 
            	filteredColumn = combine(filteredColumn);
            	
            let missing = 4 - filteredColumn.length
            
        if(missing > 0 && missing < 4){
            let empty_string = Array(missing).fill("")
            let newColumn = filteredColumn.concat(empty_string);

            board[i].innerHTML = newColumn[0]
            board[i + width].innerHTML = newColumn[1]
            board[i + width * 2].innerHTML = newColumn[2]
            board[i + width * 3].innerHTML = newColumn[3]
        }
	}
}

function downMove(){
	for (let i = 0; i < 4; i++) {
            let totalOne = board[i].innerHTML
            let totalTwo = board[i + width].innerHTML
            let totalThree = board[i + width * 2].innerHTML
            let totalFour = board[i + width * 3].innerHTML
            let column = [totalOne, totalTwo, totalThree,totalFour]

            let filteredColumn = column.filter(num => num)
            
            // combine same elements
            if (filteredColumn.length > 1) 
            	filteredColumn = combine(filteredColumn);
            	
            let missing = 4 - filteredColumn.length
            
        if(missing > 0 && missing < 4){
            let empty_string = Array(missing).fill("")
            let newColumn = empty_string.concat(filteredColumn)

            board[i].innerHTML = newColumn[0]
            board[i + width].innerHTML = newColumn[1]
            board[i + width * 2].innerHTML = newColumn[2]
            board[i + width * 3].innerHTML = newColumn[3]
        }
    }
}

function destroay(str){
	gridContainer.removeEventListener("touchstart", handleTouchStart);
   	gridContainer.removeEventListener("touchend", handleTouchEnd);
	let info = document.getElementById("info");
	info.classList.add("active");
	let greet = document.getElementById("greet");
   	greet.innerHTML = str;
   	document.getElementById("restart").onclick = restartGame;
}

function checkGameOver(){
    for (let i = 0; i < board.length; i++) {
        if (board[i].innerHTML == 0) {
            return;
        }
    }
    destroay("😢 YOU LOST!")
}

function checkForWin() {
    for (let i = 0; i < board.length; i++) {
        if (board[i].innerHTML == 2048) {
        	destroay("🤗 YOU WIN!");
        	break;
        }
    }
}

//Define screen touch functions
function handleTouchStart(event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
}

// Handle touch end event
function handleTouchEnd(event) {
    endX = event.changedTouches[0].clientX;
    endY = event.changedTouches[0].clientY;
    
    // Call your logic functions based on swipe direction
    handleSwipe();
}

// Handle swipe direction
function handleSwipe() {
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
            // Swipe right
            rightMove();
           //     console.log('Swipe right');
        } else {
            // Swipe left
            leftMove();
            //    console.log('Swipe left');
        }
    } else {
        if (deltaY > 0) {
                // Swipe down
                downMove();
           // console.log('Swipe down');
        } else {
                // Swipe up
                upMove();
            //console.log('Swipe up');
        }
    }
    generate();
    colors();
    checkForWin();
}

// Main 
restartButton.addEventListener('click', restartGame);

// Start the game
restartGame();
// Initialize other necessary variables and call your logic functions here
