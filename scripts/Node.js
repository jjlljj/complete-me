class Node {
  constructor(letter = null) {
    this.next = {}
    this.isWord = false
    this.data = letter
  }

  getAllChildren(string) {
    let container = []
    let nextKeys = Object.keys(this.next)

    if(!this) return []

    if(this.isWord) {
      container.push(string)
    }

    nextKeys.forEach(key => {
      let child = this.next[key]
      container = [ ...container, ...child.getAllChildren(string + key)]
    });

    return container
  }

}

module.exports = Node;