angular.module('notesApp', [])
  .controller('MainCtrl', [function(){
    var that = this;
    that.tab = 'first';

    that.open = function(tab) {
      that.tab = tab;
    };
  }])
  .controller('SubCtrl', [function(){
    var that = this;
    that.list = [
      {id: 1, label: 'Item 1'},
      {id: 2, label: 'Item 2'}
    ];
    that.add = function() {
      var id = that.list.length + 1;
      that.list.push({
        id: id,
        label: 'Item ' + id
      });
    };
  }]);
