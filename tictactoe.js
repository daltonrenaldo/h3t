if (Meteor.isClient) {
  Template.Board.helpers({
    rows: function () {
      return h3t.board.grid;
    },
    playerturn: function () {
      return h3t.playerTurn[0];
    },
    deviceType: function () {
      return Meteor.isCordova ? 'mobile' : 'desktop';
    }
  });

  Template.Board.events({
    "click td": function (event, template) {
      var $td = $(event.target);
      var cell = {row: $td.data("row"), col: $td.data("col")};

      h3t.handleClick(cell);
    },

    "dragstart .pawn": function (event, template) {
      console.log("dragstart");
      console.log(event.originalEvent);
      console.log($(event.originalEvent.target).addClass('moving'))
      // event.originalEvent.dataTransfer.setData("text", event.target.id);
    },

    "dragstop .pawn": function (event, template) {
      console.log("dragstop");
      $(event.originalEvent.target).removeClass('moving');
    },

    "dropover td": function (event, template) {
      console.log("dropover");
      event.originalEvent.preventDefault();
    },

    "drop td": function (event, template) {
      console.log("drop");
      var $piece = $('.pawn.moving');
      var $cell = $(event.target);

      console.log($piece, $cell);

      h3t.move($piece, $cell);
    }
  });


  Template.Board.onRendered(function () {
    $('td').droppable();
  });

  Template.pawn.onRendered(function () {
    $('.pawn').draggable({ revert: true });
  });

  Template.Board.onDestroyed(function () {
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
