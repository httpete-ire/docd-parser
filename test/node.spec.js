// load test modules
var chai = require('chai');
var expect = chai.expect;

var Node = require('./../lib/node');

describe('node class', function() {
  'use strict';

  var node;

  beforeEach(function() {
    node = new Node('heading', 'test value');
  });

  it('should be an instance of the node class', function() {
    expect(node).to.be.instanceof(Node);
  });

  it('an instance should have properties', function() {
    expect(node.type).to.equal('heading');
    expect(node.value).to.equal('test value');
    expect(node.children.length).to.equal(0);
    expect(node.parent).to.be.equal(null);
  });

  it('check to see if node has any children nodes', function() {
    expect(node.hasChildren()).to.equal(false);
  });

  it('add a child node', function() {
    var newNode = new Node('string', 'child node');

    node.addChild(newNode);

    expect(node.hasChildren()).to.equal(true);

    expect(newNode.parent).to.equal(node);
  });

});
