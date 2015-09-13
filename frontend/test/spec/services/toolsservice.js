'use strict';

describe('Service: toolsService', function () {

  // load the service's module
  beforeEach(module('foodCircle'));

  // instantiate service
  var toolsService;
  beforeEach(inject(function (_toolsService_) {
    toolsService = _toolsService_;
  }));

  it('should do something', function () {
    expect(!!toolsService).toBe(true);
  });

});
