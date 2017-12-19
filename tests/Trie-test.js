const { expect } = require('chai')
const Trie = require('../scripts/Trie.js')
const Node = require('../scripts/Node.js')


describe('Trie', ()=> {

  it('should be testable', ()=> {
    expect(true).to.be.true
  })

  describe('Insert', ()=> {
    it('should have an insert method', ()=> {
      let completeMe = new Trie()
      completeMe.insert('h')
      
      expect(completeMe.root.next.h.data).to.equal('h')
    })

    it('should return null if a string is not passed in', ()=> {
      let completeMe = new Trie()
      expect(completeMe.insert()).to.equal(null)
    })

    it('should insert letters of a string as subsequent nodes in the trie', ()=> {
      let completeMe = new Trie()
      completeMe.insert("hello")
      
      expect(completeMe.root.next.h.data).to.equal('h')
      expect(completeMe.root.next.h.next.e.data).to.equal('e')
      expect(completeMe.root.next.h.next.e.next.l.data).to.equal('l')
    })

    it('should insert the entire string', ()=> {
      let completeMe = new Trie()
      completeMe.insert("hello")

      expect(completeMe.root.next.h.data).to.equal('h')
      expect(completeMe.root.next.h.next.e.data).to.equal('e')
      expect(completeMe.root.next.h.next.e.next.l.data).to.equal('l')
      expect(completeMe.root.next.h.next.e.next.l.next.l.data).to.equal('l')
      expect(completeMe.root.next.h.next.e.next.l.next.l.next.o.data).to.equal('o')
    })

    it('should be able to insert a second string', ()=> {
      let completeMe = new Trie()
      completeMe.insert("hello")
      completeMe.insert("tree")

      expect(completeMe.root.next.h.data).to.equal('h')
      expect(completeMe.root.next.h.next.e.data).to.equal('e')
      expect(completeMe.root.next.t.data).to.equal('t')
      expect(completeMe.root.next.t.next.r.data).to.equal('r')
    })

    it('should be a said to be word at the end of the trie string', ()=>{
      let completeMe = new Trie()
      completeMe.insert("tree")
      
      expect(completeMe.root.next.t.next.r.next.e.isWord).to.be.false
      expect(completeMe.root.next.t.next.r.next.e.next.e.isWord).to.be.true
    })
  })

  describe('Count', ()=> {
    it('should return zero by default', ()=> {
      let completeMe = new Trie()

      expect(completeMe.count).to.equal(0)
    })

    it('should return the number of words inserted into trie', ()=> {
      let completeMe = new Trie()
      expect(completeMe.count).to.equal(0)
      completeMe.insert("hello")
      completeMe.insert("tree")
      expect(completeMe.count).to.equal(2)
      completeMe.insert("woof")
      completeMe.insert("dog")
      completeMe.insert("hoth")
      expect(completeMe.count).to.equal(5)
    })
  })

  describe('Suggest', ()=> {
    it('should return null if no string is entered', ()=> {
      let completeMe = new Trie()
    })
  })



})



//phase1
// var completion = new Trie()

// completion.insert("pizza")

// completion.count()
// => 1

// completion.insert('apple')

// completion.count()
// => 2

//phase2
// completion.suggest("piz")
// => ["pizza"]

// completion.insert("pizzeria")

// completion.suggest("piz")
// => ["pizza", "pizzeria"]

// completion.suggest('a')
// => ["apple"]

//phase3
// import dictionary
// const text = "/usr/share/dict/words"
// const dictionary = fs.readFileSync(text).toString().trim().split('\n')

// const completion = new Trie()

// completion.populate(dictionary)

// completion.count()
// => 235886

// completion.suggest("piz")
// => ["pize", "pizza", "pizzeria", "pizzicato", "pizzle"]

