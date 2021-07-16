


// CACHED DOM NODES

const resetButton = document.getElementById("reset-button");
const allSquares = document.getElementsByClassName("square");
const statusBanner = document.getElementById("status-banner");
let arrOfSquares = [];

 // use for loop to cache all Square nodes. 
for (let row = 0; row < 3; row++){
    for (let col = 0; col < 3; col++)
    {
        let nextSquare = document.getElementById("r" + row + "c" + col);
        console.log(nextSquare);
        arrOfSquares.push(nextSquare);
    }
}

// GLOBAL VARS
let turn = 1;

let grid = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

// FUNCTIONS

const squareClicked = (event) => {


     if (turn % 2 == 1)
     {
         gridValue = 1;
         currentMarker = "X"
         statusBanner.innerText= "O's Turn";
     }
     else{
         gridValue = -1;
         currentMarker = "O";
         statusBanner.innerText ="X's Turn";
     }

    let squareIdString  = "" + event.target.id;
    event.target.innerText = "" + currentMarker;
    // disable the "clicked" square(so it's not clickable anymore.)
    event.target.style.pointerEvents = 'none';
    
    let row = squareIdString.charAt(1);
    let col = squareIdString.charAt(3);

    console.log("row: " + row + " col: " + col);
    grid[row][col] = currentMarker;

    //check for win
    
    xWin = checkForWin(grid, 3); // 3 consecutive x values
    // update board
    
    //check for win
    oWin = checkForWin(grid, -3);// 3 consecutive y values
    turn++;

    if (xWin)
    {
        console.log("X wins!");
    }
    if (oWin)
    {
        console.log("O wins!");
    }
    if  (turn >= 9)
    {
        console.log("Doh! Cat's Game!");
    }  

}

// fill in x's and o's on web page.
for (let row = 0; row < grid.length; row++)
{
    for (let col = 0; col < grid[row].length; col++)
    {
        
        
        //console.log ("row: " + row + " col: " + col + " " + grid[row][col]);
        if (grid[row][col] == 1)
        {
            let currentSquare = document.getElementById ("r" + row + "c" + col);
            currentSquare.innerText = "X";
            

            // set property so can't be clicked again
        }

        if (grid[row][col] == -1)
        {
            let currentSquare = document.getElementById ("r" + row + "c" + col);
            currentSquare.innerText = "0";
            // set property so can't be clicked again
            
        }

       
    }
    
}


// GAME LOGIC

const getSumArr = (arr) => {
    let sum = 0;
    for (let i = 0; i < arr.length; i++)
    {
        sum += arr[i];
    }
    return sum;
}

const makeArrColumn = (grid, colNum) =>
{
    let arr = [];
    for (row = 0; row < grid.length; row++)
    arr.push(grid[row][colNum]);

    return arr;
}

console.log (makeArrColumn(grid, 0));
console.log (makeArrColumn(grid, 1));
console.log (makeArrColumn(grid, 2));

const checkForWin = (grid, target) => {

    // check rows for sum equaling target
    let numRows = grid.length;
    
    for (let row = 0; row < numRows; row++)
    {
        let rowSum = getSumArr(grid[row]);
        if (rowSum === target){
            return true;
        }
    }
    // Check columns for sum equaling target
    let numCols = grid[0].length;
    for (let col = 0; col < numCols; col++)
    {
        let colArr = makeArrColumn(grid, col);
        colSum = getSumArr(colArr);

       if (colSum === target){
            return true;
        }
    }

    // check diagonals

    // top left to bottom right
    let topLeftDiag = [];
    for (let i = 0; i < grid.length; i++)
    {
        topLeftDiag.push(grid[i][i]);
    }
    if (getSumArr(topLeftDiag) === target)
    {
        return true;
    }

    // top right to bottom left
    let topRightDiag = [];
        for (let row = 0; row < grid.length; row++)
        {
            topRightDiag.push(grid[row][grid.length - 1 - row]);
        }
        console.log (topRightDiag);
        if (getSumArr(topRightDiag) === target)
        {
            return true;
        }

        /*
            ALL POSSIBLE WINS HAVE BEEN CHECKED
        */
        return false; 

}

 



// EVENT LISTENERS
for ( let square of arrOfSquares)
{
    square.addEventListener('click', squareClicked );
}
