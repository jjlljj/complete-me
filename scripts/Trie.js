const Node = require('./Node.js')

class Trie {
  constructor() {
    this.root = new Node();
    this.count = 0;
  }

  insert(string) {
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
    this.count ++
  }

  count() {
    //should return total library count
    return this.count
  }

  suggest(string) {
    let currentNode = this.root;
    let partial = string

    let completions = []

    while(partial.length >= 1) {
      let letter = partial.slice(0,1)
      partial = partial.slice(1, partial.length)
      currentNode = currentNode.next[letter]
    }

    return currentNode.getAllChildren(string)

  }

}

module.exports = Trie

