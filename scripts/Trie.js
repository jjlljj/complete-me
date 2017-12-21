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
    if (!currentNode.isWord) { currentNode.isWord = true
    this.counter ++ }
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

    return this.selectHelper(currentNode.getAllChildren(string))

  }

  selectHelper(array){
    let sorted = array.sort((a, b) => {
      return b.selectCount - a.selectCount
    })
    return sorted.map(item => item.string)
  }

  select(string) {
    let currentNode = this.root;
    let partial = string
    while(partial.length > 0) {
      currentNode = currentNode.next[partial[0]]
      partial = partial.slice(1, partial.length)
    }
    currentNode.selectCount++
  }

  delete(string) {
    if (!string) return null
    let currentNode = this.root;
    let partial = string

    while(partial.length > 0 ) {
      currentNode = currentNode.next[partial[0]]
      partial = partial.slice(1, partial.length)
    }

    if (currentNode.isWord){
      currentNode.isWord = false;
      this.counter --
      return string
    }
  }

}

module.exports = Trie

