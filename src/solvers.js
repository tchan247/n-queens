/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution;
  var size = {n:n};
  var currentBoard = new Board(size);
  var rookCount = 0;
  var rRooks = function(j) {
    if (rookCount < n) {
      for (var i = 0; i < n; i++) {
        var curCell = currentBoard.attributes[i][j];
        // check current cell
        // if current cell is 0
        if (curCell === 0) {
          //add piece to current cell
          currentBoard.togglePiece(i,j);
          //check current column & row for conflicts
          if (currentBoard.hasRowConflictAt(i) || currentBoard.hasColConflictAt(j)) {
            //if either check is true, toggle piece off
            currentBoard.togglePiece(i,j);
          } else {
            //if both checks false
            //increase rook count by one
            rookCount++;
              // if rook count === n
            if (rookCount === n) {
                // solution = board
              solution = currentBoard.rows();
            }
          }
        }

      }
      rRooks(j+1);
    }
  }
  rRooks(0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
