'use strict';

describe('Service: SailsResourceService', function () {

  // load the service's module
  beforeEach(module('foodCircle'));

  // instantiate service
  var SailsResourceService;
  beforeEach(inject(function (_SailsResourceService_) {
    SailsResourceService = _SailsResourceService_;
  }));

  it('should do something', function () {
    expect(!!SailsResourceService).toBe(true);
  });

});
