// load test modules
var chai = require('chai');
var expect = chai.expect;

var Tree = require('./../lib/tree.js');
var Node = require('./../lib/node');

describe('tree data structure', function() {
  'use strict';
  var tree;

  beforeEach(function() {
    tree = new Tree('Document');
  });

  it('should be an instance of Tree', function() {
    expect(tree).to.be.instanceOf(Tree);
  });

  it('the root node of the tree should have be the Document', function() {
    expect(tree.root.type).to.equal('Document');
  });

  it('traverse the tree', function() {
    var results = [];

    var newNode = new Node('Heading', '__this is the value__');
    newNode.children.push(new Node('Text', '__this is the value__'));
    tree.root.children.push(newNode);

    newNode = new Node('Strong', '__great__');
    newNode.children.push(new Node('Text', 'great'));
    tree.root.children.push(newNode);

    tree.traverse(function(node) {
      results.push(node.type);
    });

    expect(results[0]).to.equal('Document');
    expect(results[1]).to.equal('Heading');
    expect(results[2]).to.equal('Text');
    expect(results[3]).to.equal('Strong');
    expect(results[4]).to.equal('Text');
  });

  it('add a child node', function() {
    var node = new Node('Heading', 'value');
    tree.add(node);

    expect(tree.root.children.length).to.equal(1);
    expect(tree.root.children[0].type).to.equal('Heading');

    tree.add(new Node('Text', 'Value'), node);
    expect(node.children.length).to.equal(1);
    expect(node.children[0].type).to.equal('Text');
  });

});
