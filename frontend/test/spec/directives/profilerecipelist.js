'use strict';

describe('Directive: profileRecipeList', function () {

  // load the directive's module
  beforeEach(module('foodCircle'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<profile-recipe-list></profile-recipe-list>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the profileRecipeList directive');
  }));
});
