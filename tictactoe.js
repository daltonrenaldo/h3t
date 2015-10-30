if (Meteor.isClient) {
  Template.Board.helpers({
    rows: function () {
      return h3t.board.grid;
    }
  });

  Template.Board.events({
    "click td": function (event, template) {
      var $td = $(event.target);
      var cell = {row: $td.data("row"), col: $td.data("col")};

      h3t.handleClick(cell);
    },

    "dragstart .pawn": function (event, template) {
      event.originalEvent.dataTransfer.setData("text", event.target.id);
    },

    "dragover td": function (event, template) {
      event.originalEvent.preventDefault();
    },

    "drop td": function (event, template) {
      var data = event.originalEvent.dataTransfer.getData("text");
      var $piece = $("#"+data);
      var $cell = $(event.target);

      h3t.move($piece, $cell);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
