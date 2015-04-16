describe('ItemCtrl with inline mock', function() {
  var ctrl, mockService;

  beforeEach(module('notesApp1'));
  beforeEach(module(function($provide) {
    mockService = {
      list: function() {
        return [{id: 1, label: 'Mock'}];
      }
    };
    $provide.value('ItemService', mockService);
  }));
  beforeEach(inject(function($controller) {
    ctrl = $controller('ItemCtrl');
  }));

  it('should load mocked out items', function() {
    expect(ctrl.items).toEqual([{id: 1, label: 'Mock'}]);
  });
});
