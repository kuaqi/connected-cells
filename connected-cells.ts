// Program to find the largest region in the boolean 2D matrix.

class ConnectedCells {
    public readonly row: number;
    public readonly column: number;
    constructor (n: number, m: number) {
        this.row = n;
        this.column = m;
    }
}

let cells = new ConnectedCells(4, 4);
var givenMatrix = [
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 0],
    [1, 0, 0, 0],
];

// Safety-check to prevent index from going off the array boundaries
function isValid(givenMatrix: any[][], row: any, column: any, visitedArray: boolean[][]) {
    if (row >= 0 && row < cells.row && column >= 0 && column < cells.column ) {
        if (givenMatrix[row][column] == 1 && !visitedArray[row][column]) {
            return true;
        }
    }
    return false;
}

// Depth First Search
function runDfs(givenMatrix: any[][], row: any, column: any, visitedArray: boolean[][], count: number) {
    var rowPositions = [ -1, -1, -1, 0, 0, 1, 1, 1 ];
    var columnPositions = [ -1, 0, 1, -1, 1, -1, 0, 1 ];

    visitedArray[row][column] = true;   // Mark this cell as visited

    // Recursive method on a current targeted cell and will recursively repeat for its 8 surrounding cells
    for (let i = 0; i < 8; i++) {
        if (isValid(givenMatrix, row + rowPositions[ i ], column + columnPositions [ i ], visitedArray)) {
            count++;
            count = runDfs(givenMatrix, row + rowPositions[ i ], column + columnPositions [ i ], visitedArray, count);
        }
    }
    return count;
}

// Discover and add up all the valid connected cells
function calculateLargestRegion(givenMatrix: any[][]) {
    var visitedArray = new Array(cells.row);

    // Initialization of new array for the purpose of marking cells that has been visited before
    for (let i = 0; i < cells.row; i++) {
        visitedArray[ i ] = new Array(cells.column);
        // Initially mark all the multi-dimensional arrays with value 'false'
        for (let j = 0; j < cells.column; j++) {
            visitedArray[ i ][ j ] = false;
        }
    }

    let count = 0;
    let result = Number.MIN_VALUE;


    for (let i = 0; i < cells.row; i++) {
        for (let j = 0; j < cells.column; j++) {
            if (givenMatrix[ i ][ j ] == 1 && !visitedArray[ i ][ j ]) {
                count = 1;
                count = runDfs(givenMatrix, i, j, visitedArray, count);
                result = Math.max(result, count);
            }
        }
    }
    return result;
}

console.log("Starting the Connected Cells program. Given the sample input: ");
console.log("n = " + `${cells.row}` + "\nm = " + `${cells.column}`);
for (let array of givenMatrix) { console.log(array); }
console.log("Largest region: " + calculateLargestRegion(givenMatrix));
