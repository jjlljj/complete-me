const { expect } = require('chai')
const Node = require('../scripts/Node.js')

describe('Node', ()=> {

  it('should be testable', ()=> {
    expect(true).to.be.true
  })

  it('should not be a complete word by default', ()=> {
    let node = new Node()
    expect(node.isWord).to.be.false
  })

  it('should be able to take data', ()=> {
    let node = new Node('f')
    expect(node.data).to.equal('f')
  })

  it('should be able to link to other nodes', ()=> {
    let node = new Node('f')
    node.next.g = new Node('g')

    expect(node.next.g.data).to.equal('g')
  })

  describe('getAllChildren', ()=> {

    it('should be a function', ()=> {
      let node = new Node('f')

      expect(node.getAllChildren).to.be.instanceOf(Function)
    })

    it('should return a child word of the node', ()=> {
      let node = new Node('f')
      node.next.g = new Node('g')
      expect(node.getAllChildren('')).to.deep.equal([])
      node.next.g.isWord = true

      expect(node.getAllChildren('')).to.deep.equal([{string: 'g', selectCount: 0}])
    })

    it('should return multiple child words of the node', ()=> {
      let node = new Node('f')
      node.next.g = new Node('g')
      node.next.g.isWord = true
      node.next.h = new Node('h')
      node.next.h.isWord = true

      expect(node.getAllChildren('')).to.deep.equal([{string: 'g', selectCount: 0}, {string: 'h', selectCount: 0}])
    })

    it('should concatinate nodes by trie path with the argument', ()=> {
      let node = new Node('c')
      node.next.b = new Node('b')
      node.next.b.next.a = new Node('a')
      node.next.b.next.a.next.d = new Node('d')
      node.next.b.next.a.next.d.isWord = true
      node.next.b.next.a.next.g = new Node('g')
      node.next.b.next.a.next.g.isWord = true

      expect(node.getAllChildren('a')).to.deep.equal([{string: 'abad', selectCount: 0}, {string: 'abag', selectCount: 0}])

    })
  })

})

