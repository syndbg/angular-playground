describe('SimpleCtrl', function() {
  beforeEach(module('simpleCtrl2App'));

  var ctrl, $loc;
  beforeEach(inject(function($controller, $location) {
    ctrl = $controller('SimpleCtrl2');
    $loc = $location;
  }));

  it('should navigate to the home page', function() {
    $loc.path('/here');
    ctrl.navigate1();
    expect($loc.path()).toEqual('/home');
  });

  it('should navigate to the about page', function() {
    $loc.path('/about');
    ctrl.navigate2();
    expect($loc.path()).toEqual('/about');
  });
});
