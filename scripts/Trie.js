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

  populate(array) {
    if (!array) return null
    array.forEach(word => {
      this.insert(word)
    })
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

  select(string) {
    // should set a given string as preferred and return it first in the array
  }

  delete(string) {
    // should find a word in the tree && set this.isWord to false
    // if its last characters are solo nodes(no children), it should delete those solo nodes
    // if nextKeys.length === 0 set parent next[letter] = null ???
  }

}

module.exports = Trie

