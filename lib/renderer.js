'use strict';

/**
 * Renderer component of the markdown compiler. Will traverse the AST
 * and output valid HTML based on the node type eg 'Header', 'List' etc
 * @param {Object} opts
 */
function Renderer(opts) {
  this.options = opts || {};
}

Renderer.prototype = {

  constructor: Renderer,

  /**
   * traverse an AST and render HTML
   * @param  {Tree} ast AST to traverse and render
   * @return {String}     [description]
   */
  render: function(ast) {
    return this._renderNodes(ast.root);
  },

  /**
   * render a html string representation of an AST, if the rootNode has child
   * nodes these are traversed and the HTML is built. Otherwise render the rootNode itself
   * @param  {Node} rootNode AST node object
   * @return {String} string representation of a HMTL element
   */
  _renderNodes: function (rootNode) {
    var self = this;
    var output = '';

    if (rootNode.hasChildren()) {
      rootNode.children.forEach(function(childNode){
        output += self._renderNode(childNode);
      });
    } else {
      output += self._renderNode(rootNode);
    }

    return output;
  },

  /**
   * based on the node type, call a specific render function
   * @param  {Node} node AST node object
   * @return {String} string representation of a HMTL element
   */
  _renderNode: function(node) {
    var output = '';

    switch (node.type) {
      case 'text':
        output += this._renderText(node);
        break;
      case 'th':
        output += this._renderTableCell(node);
        break;
      case 'tr':
        output += this._renderTableCell(node);
        break;
      case 'td':
        output += this._renderTableCell(node);
        break;
      case 'table':
        output += this._renderTable(node);
        break;
      case 'strong':
        output += this._renderStrong(node);
        break;
      case 'link':
        output += this._renderLink(node);
        break;
      case 'paragraph':
        output += this._renderParagraph(node);
        break;
      case 'blockquote':
        output += this._renderBlockquote(node);
        break;
      case 'header':
        output += this._renderHeader(node);
        break;
      case 'codeBlock':
        output += this._renderCodeBlock(node);
        break;
      case 'em':
        output += this._renderEmphasis(node);
        break;
      case 'codeSpan':
        output += this._renderCodeSpan(node);
        break;
      case 'horizontal rule':
        output += this._renderHorizontalRule();
        break;
      case 'ordered list':
        output += this._renderList(node);
        break;
      case 'unordered list':
        output += this._renderList(node);
        break;
      case 'list item':
        output += this._renderListItem(node);
        break;
      default:
        output = '';
    }

    return output;
  },

  /**
   * return the string value of a node or if not set return an empty string
   * @param  {Node} node AST node object
   * @return {String} string value of node
   */
  _renderText: function(node) {
    return escape(node.value) || '';
  },

  /**
   * render a table element and its inner components ie 'thead', 'tbody' etc,
   * the table node will always have two children
   *  - [0] - table header
   *  - [1] - table body
   * these children can contain multiple components
   * @param  {Node} node AST node object
   * @return {String} string representation of a 'table' HTML element
   */
  _renderTable: function(node) {
    var table = '<table class="table table-striped">\n';
    table += this._renderTableCell(node.children[0]);
    table += this._renderTableCell(node.children[1]);
    table += '</table>\n';
    return table;
  },

  /**
   * return a table cell, can be 'thead', 'tbody', 'tr', 'th' or 'td'
   * @param  {Node} node AST node object
   * @return {String} string representation of a table cell
   */
  _renderTableCell: function(node) {
    return '<' + node.type + '>' + this._renderNodes(node) + '</' + node.type + '>\n';
  },

  /**
   * return a horizontal rule and
   * @return {String} string representation of a 'hr' HTML element
   */
  _renderHorizontalRule: function() {
    return '<hr />\n';
  },

  /**
   * return a paragraph element and render its inner value
   * @param  {Node} node AST node object
   * @return {String} string representation of a 'p' HTML element
   */
  _renderParagraph: function(node) {
    return '<p>' + this._renderNodes(node) + '</p>\n';
  },

  /**
   * return a strong element
   * @param  {Node} node AST node object
   * @return {String} string representation of a 'strong' HTML element
   */
  _renderStrong: function(node) {
    return '<strong>' + this._renderNodes(node) + '</strong>';
  },

  /**
   * return an anchor tag
   * @param  {Node} node AST node object
   * @return {String} string representation of an anchor HTML element
   */
  _renderLink: function(node) {
    return '<a href="' + node.href +'" title="' + node.title +'">' + this._renderNodes(node) + '</a>';
  },

  /**
   * return a blockquote element
   * @param  {Node} node AST node object
   * @return {String} string representation of a 'blockquote' HTML element
   */
  _renderBlockquote: function(node) {
    return '<blockquote>\n' + this._renderNodes(node) + '</blockquote>\n';
  },

  /**
   * return a header element
   * @param  {Node} node AST node object
   * @return {String} string representation of a 'header' HTML element
   */
  _renderHeader: function(node) {
    var headerType = 'h' + node.depth;
    return '<' + headerType + '>' + this._renderNodes(node) + '</' + headerType +'>\n';
  },

  /**
   * return a code block element
   * @param  {Node} node AST node object
   * @return {String} string representation of a 'code block' HTML element
   */
  _renderCodeBlock: function(node) {
    return '<pre><code>' + escape(node.value) + '</code></pre>\n';
  },

  /**
   * return a emphasis element
   * @param  {Node} node AST node object
   * @return {String} string representation of a 'emphasis' HTML element
   */
  _renderEmphasis: function(node) {
    return '<em>' + this._renderNodes(node) + '</em>';
  },

  /**
   * return a inline code span element
   * @param  {Node} node AST node object
   * @return {String} string representation of a 'code span' HTML element
   */
  _renderCodeSpan: function(node) {
    return '<code>' + escape(node.value) + '</code>';
  },

  /**
   * return either a 'ol' or 'ul' list
   * @param  {Node} node AST node object
   * @return {String} string representation of a 'list' HTML element
   */
  _renderList: function(node) {
    var listType = (node.type === 'ordered list') ? 'ol': 'ul';
    return '<' + listType +'>\n' + this._renderNodes(node) + '</' + listType+ '>\n';
  },

  /**
   * return a 'li' list item and render the nodes children nodes
   * @param  {Node} node AST node object
   * @return {String} string representation of a 'list item' HTML element
   */
  _renderListItem: function(node) {
    return '<li>' + this._renderNodes(node) + '</li>\n';
  }

};

/**
 * escape '<' and '>' to prevent style/script tag injection
 * @param  {String} value
 * @return {String}
 */
function escape(value) {
  return value
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

module.exports = Renderer;
