## Installation

__note__ this is part of a college research project so should not be used in production

If you are feeling adventurous it can be installed using `npm install docd-parser`. It was developed to work with module loaders such as Webpack or Browserify.

```
var DocdParser = require('docd-parser');

var parser = new DocdParser();

var html = parser.parse('# Hello world');

console.log(html); // <h1>Hello world</h1>

```

---


_Markdown_ is a descriptive markup language with a plain text formatting syntax designed so that it can be compiled into HTML using a compiler. Since _Markdown_ compiles from one high-level language to another (HTML), several phases of the compilation process are not needed.

The key components of a __Markdown compiler__ are :

• __Lexical analysis__ - This phase in a markdown compiler uses regular expressions to scan and identify a set of valid block-level tokens based on the CommonMark speci cation.

• __Syntax analysis__ - Tokens are then parsed for inline-level Markdown components, this phase will generate a tree representation of the mark- down source  le.

• __Code generation__ - The only phase in the back-end of a Markdown compiler is the code generator, which will traverse every node in the tree representation and output valid HTML based on the node type.


----

## [DocParser class](https://github.com/httpete-ire/docd-parser/blob/master/lib/docdparser.js)

![DocdParser class](http://i.imgur.com/NdMGeiX.png)

The __DocdParser__ class is composed of three main classes, __Lexer__, __Parser__ and the __Render__ class. Its main purpose is to abstract the implementation details of parsing Markdown.

### [Lexer class](https://github.com/httpete-ire/docd-parser/blob/master/lib/lexer.js)

The __Lexer class__ is responsible for converting a stream of characters into a set of tokens. It has two properties, tokens and rules. The rules property is a set of Regular expressions for matching a sequence of block level components in Markdown.

_Lexer input_

```
### hello world
```

_Lexer output_

```
{ type: 'heading', depth: 3, value: 'hello world'}
```

### [Parser class](https://github.com/httpete-ire/docd-parser/blob/master/lib/parser.js)

The __Paser class__ is responsible for converting a list of valid tokens into a tree representation known as an abstract syntax tree (AST). Similar to the __Lexer__ it also contains a set of rules, but this time for matching a sequence of inline Markdown components.

_Parser input_
```
{ type: 'heading', depth: 3, value: 'hello world'}
```

_Parser output_

```
{
  type: 'Document',
  children: [ {
    type: 'Heading',
    parent: [Circular],
    children:
      [{
        type: 'Text',
        children: [],
        parent: [Circular],
        value: 'hello world'
      }],
    }],
  parent: null
  } 
}
```

### [Render class](https://github.com/httpete-ire/docd-parser/blob/master/lib/renderer.js)

The __Render class__ is responsible for converting an AST into valid HTML. This is done by traversing the child nodes of the AST and calling a render function on each node. The render function will return HTML based on the node type.

_Render input_

```
{
  type: 'Document',
  children: [ {
    type: 'Heading',
    parent: [Circular],
    children:
      [{
        type: 'Text',
        children: [],
        parent: [Circular],
        value: 'hello world'
      }],
    }],
  parent: null
  } 
}
```

_Render output_

```
<h1>hello world</h1>
```

---

### Sequence Diagram

![Sequence Diagram](http://i.imgur.com/CYdZnmGr.png)

The image above shows a sequence diagram for the render method of the __DocdParser__ class. The _tokenize_ method is called on the __Lexer__ which will convert the Markdown input to a set of tokens. These tokens are then passed to the __Parser__ which will create the AST. The AST is finally passed to the __Render__ object which will traverse the nodes and convert them into valid HTML, once this phase has complete it will return the HTML output.
