// load test modules
var chai = require('chai');
var expect = chai.expect;
var Renderer = require('./../lib/renderer.js');

describe('renderer class', function() {
  'use strict';

  var renderer;

  beforeEach(function() {
    renderer = new Renderer();
  });

  it('should parse a text node', function() {
    var input = {
      type: 'text',
      value: 'hello world'
    };
    var result = renderer._renderText(input);
    expect(result).to.equal('hello world');
  });

});
