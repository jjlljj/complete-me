class Node {
  constructor(letter = null) {
    this.next = {}
    this.isWord = false
    this.data = letter
  }

}

module.exports = Node;