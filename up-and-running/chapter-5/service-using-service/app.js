'use strict';

angular.module('notesApp', [])
  .service('ItemService', [function(){
    var items = [
      {id: 1, label: 'Item 1'},
      {id: 2, label: 'Item 2'}
    ];
    this.list = function() {
      return items;
    };
    this.add = function(item) {
      items.push(item);
    };
  }])
  .controller('MainCtrl', [function(){
    var that = this;
    that.tab = 'first';
    that.open = function(tab) {
      that.tab = tab;
    };
  }])
  .controller('SubCtrl', ['ItemService', function(ItemService){
    var that = this;
    that.list = function() {
      return ItemService.list();
    };

    that.add = function() {
      var id = that.list().length + 1;
      ItemService.add({
        id: id,
        label: 'Item ' + id
      });
    };
  }]);
