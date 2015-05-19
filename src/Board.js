// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // set boardSize to board.attributes.n
      var boardSize = this.attributes.n;
      // set foundPieces to 0
      var foundPieces = 0;
      // iterate over this board's rowIndex row (this.attributes[rowIndex])
      for (var i = 0; i < boardSize; i++) {
        var currentCell = this.attributes[rowIndex][i];
        // check if current cell has a piece
        // if currentPiece is a piece
        if (currentCell === 1) {
          // increase found pieces by 1
          foundPieces++;
          // if foundPieces is >= 2
          if (foundPieces === 2) {
            // return that there is a conflict
            return true;
          }
        }
      }
      // return that there isn't a conflict
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var boardSize = this.attributes.n;
      for(var i=0; i<boardSize; i++) {
        if(this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // set boardSize to board.attributes.n
      var boardSize = this.attributes.n;
      // set foundPieces to 0
      var foundPieces = 0;
      // iterate over this board's rowIndex row (this.attributes[rowIndex])
      for (var i = 0; i < boardSize; i++) {
        var currentCell = this.attributes[i][colIndex];
        // check if current cell has a piece
        // if currentPiece is a piece
        if (currentCell === 1) {
          // increase found pieces by 1
          foundPieces++;
          // if foundPieces is >= 2
          if (foundPieces === 2) {
            // return that there is a conflict
            return true;
          }
        }
      }
      // return that there isn't a conflict
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var boardSize = this.attributes.n;
      for(var i=0; i<boardSize; i++) {
        if(this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(m) {
      var boardSize = this.attributes.n;
      var foundPieces = 0;
      var j = m;
      for (var i = 0; i < boardSize; i++) {
        j++;
        // check if current is in bounds
        // if it isn't, continue
        if (j < 0) {
          continue;
        } else {
          // if it is, check if current cell is a piece
          var currentCell = this.attributes[i][j];
          if (currentCell === 1) {
            // increase found pieces by 1
            foundPieces++;
            // if foundPieces is >= 2
            if (foundPieces === 2) {
            // return that there is a conflict
            return true;
            }
          }
        }
      }
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var boardSize = this.attributes.n;
      for(var i=(boardSize*-1)+1; i<boardSize; i++) {
        if(this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(m) {
      var boardSize = this.attributes.n;
      var foundPieces = 0;
      var j = m;
      for (var i = 0; i < boardSize; i++) {
        j--;
        // check if current is in bounds
        // if it isn't, continue
        if (j > boardSize-1) {
          continue;
        } else {
          // if it is, check if current cell is a piece
          var currentCell = this.attributes[i][j];
          if (currentCell === 1) {
            // increase found pieces by 1
            foundPieces++;
            // if foundPieces is >= 2
            if (foundPieces === 2) {
            // return that there is a conflict
            return true;
            }
          }
        }
      }
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var boardSize = this.attributes.n;
      for(var i=(boardSize*2)-1; i>-1; i--) {
        if(this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
