const frisby = require('frisby');

it('should be a teapot', function () {
  // Return the Frisby.js Spec in the 'it()' (just like a promise)
  return frisby.get('http://httpbin.org/status/418')
    .expect('status', 418);
});