if (Meteor.isClient) {
  Template.registerHelper("playerturn", function () {
      return h3t.playerTurn[0];
    }
  );

  Template.Board.helpers({
    rows: function () {
      return h3t.board.grid;
    },
    deviceType: function () {
      return Meteor.isCordova ? 'mobile' : 'desktop';
    }
  });

  Template.cell.helpers({
    lineClass: function (type, row, col) {
      var boardSize = h3t.board.size - 1;

      if (type == 'diagonal')
        console.log(type, row + ' ' + col);
      var css_class = "";

      switch (type) {
        case 'vertical':
          if (row < boardSize) {
            css_class = "bottom-mid";
          }
        break;

        case 'horizontal':
          if (col < boardSize) {
            css_class = "left-mid";
          }
        break;

        case 'diagonal':
          if (row == col) {
            if (row < boardSize / 2) {
              css_class = "bottom-right";
            } else if (row >= boardSize / 2) {
              css_class = "top-left";
            }
          } else {
            if (row < boardSize / 2 && col == boardSize - row) {
              css_class = "bottom-left";
            } else if (col <= boardSize / 2 && row == boardSize - col) {
              css_class = "top-right";
            }
          }
        break;
      }

      return css_class;
    }
  });

  Template.Board.events({
    "click .cell": function (event, template) {
      var $td = $(event.target);
      var cell = {row: $td.data("row"), col: $td.data("col")};

      h3t.handleClick(cell);
    },

    "dragstart .pawn": function (event, template) {
      $(event.originalEvent.target).addClass('moving');
    },

    "dragstop .pawn": function (event, template) {
      $(event.originalEvent.target).removeClass('moving');
    },

    "dropover .cell": function (event, template) {
      event.originalEvent.preventDefault();
    },

    "drop .cell": function (event, template) {
      var $piece = $('.pawn.moving');
      var $cell = $(event.target);

      console.log($piece, $cell);

      h3t.move($piece, $cell);
    }
  });


  Template.Board.onRendered(function () {
    $('.cell').droppable();
    Tracker.autorun(function(){
      console.log("someone won", h3t.someoneWon);
      if (h3t.someoneWon) {
        alert('you won');
        h3t.reset();
      }
    });
  });

  Template.pawn.onRendered(function () {
    // TODO: should this logic really be here?
    $('.pawn').draggable({ revert: true});
    // disable every pawn from being draggable
    $('.pawn').draggable( "disable" );
    // enable only the current player's turn
    $('.cell[data-player='+ h3t.playerTurn[1] + '] .pawn').draggable('enable');
  });

  Template.Board.onDestroyed(function () {
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
