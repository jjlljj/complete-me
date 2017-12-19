const Node = require('./Node.js')

class Trie {
  constructor() {
    this.root = new Node();
    this.counter = 0;
  }

  get count() {
    return this.counter
  }

  insert(string) {
    if (!string) return null
    let currentNode = this.root
    while(string.length >= 1) {
      let letter = string.slice(0,1)
      string = string.slice(1, string.length)
      if (!currentNode.next[letter]){
        currentNode.next[letter] = new Node(letter);
      }
      currentNode = currentNode.next[letter]
    }
    currentNode.isWord = true
    this.counter ++
  }

  suggest(string) {
    if(!string) return null
    let currentNode = this.root;
    let partial = string

    while(partial.length > 0) {
      currentNode = currentNode.next[partial[0]]
      partial = partial.slice(1, partial.length)
    }

    return currentNode.getAllChildren(string)
  }

}

module.exports = Trie

