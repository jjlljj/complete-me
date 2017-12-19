const { expect } = require('chai')
const Node = require('../scripts/Node.js')

describe('Node', ()=> {

  it('should be testable', ()=> {
    expect(true).to.equal(true)
  })

  it('should be testable', ()=> {
    let node = new Node()

    console.log(node)
  })

})

