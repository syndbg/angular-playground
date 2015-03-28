'use strict';


function ItemService(optItems) {
  var items = optItems || [];
  this.list = function() {
    return items;
  };
  this.add = function(item) {
    items.push(item);
  };
}


angular.module('notesApp', [])
  .provider('ItemService', [function(){
    var hasDefaultItems = true;

    this.disableDefaultItems = function() {
        hasDefaultItems = false;
    };

    this.$get = [function() {
      var optItems = [];

      if (hasDefaultItems) {
        optItems = [
          {id: 1, label: 'Item 1'},
          {id: 2, lable: 'Item 2'}
        ];
      }
      return new ItemService(optItems);
    }];
  }])
  .config(['ItemServiceProvider', function(ItemServiceProvider) {
    var shouldHaveDefaults = false;

    if (!shouldHaveDefaults) {
      ItemServiceProvider.disableDefaultItems();
    }
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
      var id = ItemService.list().length + 1;
      ItemService.add({
        id: id,
        label: 'Item ' + id
      });
    };
  }])
  ;
