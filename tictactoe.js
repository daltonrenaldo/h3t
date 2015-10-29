if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.Board.helpers({
    rows: function () {
      return h3t.board.grid;
    }
  });

  Template.Board.events({
    "click td": function (event, template) {
      console.log(event.target);
      console.log(this);
      var $td = $(event.target);

      var cell = {row: $td.data("row"), col: $td.data("col")}
      console.log("cell", cell);
      h3t.handleClick(cell);
    },
  });


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
