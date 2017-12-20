class Node {
  constructor(letter = null) {
    this.next = {}
    this.isWord = false
    this.data = letter
    this.selectCount = 0
  }

  getAllChildren(string) {
    if(!this) return []


    let container = []
    let nextKeys = Object.keys(this.next)

    if(this.isWord) {
      container.push({string: string, selectCount: this.selectCount})
    }

    nextKeys.forEach(key => { 
      container = [ ...container, ...this.next[key].getAllChildren(string + key)]
    });

    return container
  }

}

module.exports = Node;