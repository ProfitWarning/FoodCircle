'use strict';

describe('Controller: EventeditCtrl', function () {

  // load the controller's module
  beforeEach(module('foodCircle'));

  var EventeditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EventeditCtrl = $controller('EventeditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EventeditCtrl.awesomeThings.length).toBe(3);
  });
});
