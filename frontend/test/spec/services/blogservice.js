'use strict';

describe('Service: BlogService', function () {

  // load the service's module
  beforeEach(module('foodCircle'));

  // instantiate service
  var BlogService;
  beforeEach(inject(function (_BlogService_) {
    BlogService = _BlogService_;
  }));

  it('should do something', function () {
    expect(!!BlogService).toBe(true);
  });

});
