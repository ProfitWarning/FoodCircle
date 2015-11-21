'use strict';

describe('Directive: xsEnvClass', function () {

  // load the directive's module
  beforeEach(module('foodCircle'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<xs-env-class></xs-env-class>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the xsEnvClass directive');
  }));
});
