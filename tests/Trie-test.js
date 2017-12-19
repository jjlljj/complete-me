const { expect } = require('chai')
const Trie = require('../scripts/Trie.js')
const Node = require('../scripts/Node.js')


describe.only('Trie', ()=> {

  it('should be testable', ()=> {
    expect(true).to.equal(true)
  })

  it('should have a method named insert', ()=> {
    let completeMe = new Trie()
    completeMe.insert("hello")
    completeMe.insert("how")
    completeMe.insert("hill")
    completeMe.insert("hoth")
    
    console.log(completeMe.suggest(''))

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

