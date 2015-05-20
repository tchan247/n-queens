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
  for(var i=0; i<n; i++) {
    for(var j=0; j<n; j++) {
      var currentCell = currentBoard.attributes[i][j];
      currentBoard.togglePiece(i,j);

      if(currentBoard.hasAnyRooksConflicts()){
        currentBoard.togglePiece(i,j);
      } else {
        rookCount++;
        if(rookCount === n) {
          solution = currentBoard.rows();
          console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
          return solution;
        }
      }

    }
  }
};

// tree structure
var Tree = function(value){
  var newTree = {};
  newTree.value = value;
  for(var key in treeMethods){
    newTree[key] = treeMethods[key];
  }

  newTree.children = [];

  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value){
  var tree = Tree(value);
  this.children.push(tree);
  return tree;
};

treeMethods.contains = function(target){
  var contains = false;

  var inner = function(tree){
    if(tree.value === target){
      contains = true;
    }

    var children = tree.children;

    if(!children){
      return ;
    }

    for(var i=0; i<children.length; i++) {
      inner(children[i]);
    }
  }
  // debugger;
  inner(this);

  return contains;
};

var makeTree = function(n) {
  var currentTree = Tree(new Board({n:n}));
  var makeChildren = function(x, current) {
    if(x > 0) {
      for(var i=0; i<n; i++){
        current.addChild(current.value);
        makeChildren(x-1, current.children[j]);
      }
        // current.children[i].value.togglePiece(i, current.children.length-1);
      // for (var j = 0; j < n; j++) {
      // current.value.togglePiece(depth, current.children.length-1);
      // }
    }
  }
  makeChildren(n, currentTree, 0);
  console.log(currentTree);

  return currentTree;

}

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var curBoard = new Board({n:n});

  var solve = function(x) {
    if (x+1 === n) {
      solutionCount++;
      return;
    }
    for (var i = 0; i < n; i++) {
      curBoard.togglePiece(x, i);
      if (!curBoard.hasAnyRooksConflicts()) {
        solve(x+1);
      }
      curBoard.togglePiece(x, i);

    }
  };
  // var tempSolution = function(n) {
  //   if (n === 0) {
  //     return 1;
  //   }
  //   return n*=tempSolution(n-1);
  // }
  solve(0);
  // solutionCount = tempSolution(n);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
//   var solution;
//   var size = {n:n};
//   var currentBoard = new Board(size);
//   if (n===0) {
//     return currentBoard.rows();
//   }
//   var rookCount = 0;
//   for(var i=0; i<n; i++) {
//     for(var j=0; j<n; j++) {
//       var currentCell = currentBoard.attributes[i][j];
//       currentBoard.attributes[i][j] = 1;
//       if(currentBoard.hasAnyQueensConflicts()){
//         currentBoard.attributes[i][j] = 0;
//       } else {
//         rookCount++;
//         if(rookCount === n) {
//           solution = currentBoard.rows();
//           console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
//           return solution;
//         }
//       }
//     }
//   }
  var solutionCount = 0;
  var solution;
  var curBoard = new Board({n:n});
  var solve = function(x) {
    if (x === n) {
      solutionCount++;
      solution = [];
      for (var j = 0; j < curBoard.get('n'); j++) {
        solution.push(curBoard.get(j).slice());
      }
      return;
    }
    for (var i = 0; i < n; i++) {
      curBoard.togglePiece(x, i);
      if (!curBoard.hasAnyQueensConflicts()) {
        solve(x+1);
      }
      curBoard.togglePiece(x, i);
    }
  };
  solve(0);
  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solution || curBoard.rows();
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var curBoard = new Board({n:n});
  var solve = function(x) {
    if (x === n) {
      solutionCount++;
      return;
    }
    for (var i = 0; i < n; i++) {
      curBoard.togglePiece(x, i);
      if (!curBoard.hasAnyQueensConflicts()) {
        solve(x+1);
      }
      curBoard.togglePiece(x, i);
    }
  };
  solve(0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


