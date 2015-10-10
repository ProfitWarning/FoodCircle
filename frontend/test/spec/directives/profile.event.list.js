'use strict';

describe('Directive: profile.event.list', function () {

  // load the directive's module
  beforeEach(module('foodCircle'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<profile.event.list></profile.event.list>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the profile.event.list directive');
  }));
});
