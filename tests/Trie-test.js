const { expect } = require('chai')
const Trie = require('../scripts/Trie.js')
const Node = require('../scripts/Node.js')
const fs = require('fs');
const text = "/usr/share/dict/words"
const dictionary = fs.readFileSync(text).toString().trim().split('\n')



describe('Trie', ()=> {

  it('should be testable', ()=> {
    expect(true).to.be.true
  })

  it('should have a counter which is 0 by default', ()=> {
    let completeMe = new Trie()
    expect(completeMe.counter).to.equal(0)
  })

  it('should have a root which is a node', ()=> {
    let completeMe = new Trie()
    expect(completeMe.root).to.be.instanceof(Node)
  })

  describe('Insert', ()=> {
    it('should have an insert method', ()=> {
      let completeMe = new Trie()
      completeMe.insert('h')
      
      expect(completeMe.root.next.h.data).to.equal('h')
    })

    it('should return null if a string is not passed in', ()=> {
      let completeMe = new Trie()
      expect(completeMe.insert()).to.be.null
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

      expect(completeMe.suggest()).to.equal(null)
    })

    it('should return a completion for a string based on an inserted word', ()=> {
      let completeMe = new Trie()
      completeMe.insert('pizza')
      expect(completeMe.suggest('piz')).to.deep.equal(['pizza'])
    })

    it('should return an array of multiple possible completions', ()=> {
      let completeMe = new Trie()
      completeMe.insert('pizza')
      completeMe.insert('pinocchio')
      completeMe.insert('pizzaz')
      completeMe.insert('pittance')

      expect(completeMe.suggest('pi')).to.deep.equal(['pizza', 'pizzaz', 'pinocchio', 'pittance'])
    })

    it('should be able to discern completions from irrelevant strings', ()=> {
      let completeMe = new Trie()
      completeMe.insert('pizza')
      completeMe.insert('pinocchio')
      completeMe.insert('pizzaz')
      completeMe.insert('pittance')
      completeMe.insert('hoth')
      completeMe.insert('hatchet')
      completeMe.insert('helmet')
      completeMe.insert('hat')
      completeMe.insert('dog')

      expect(completeMe.suggest()).to.be.null
      expect(completeMe.suggest('pizz')).to.deep.equal(['pizza', 'pizzaz'])
      expect(completeMe.suggest('h')).to.deep.equal(['hoth', 'hat', 'hatchet', 'helmet'])
      expect(completeMe.suggest('hat')).to.deep.equal(['hat', 'hatchet'])
      expect(completeMe.suggest('hel')).to.deep.equal(['helmet'])
      expect(completeMe.suggest('d')).to.deep.equal(['dog'])
    })

    it('should be able to suggst completions from the dictionary', ()=> {
      let completeMe = new Trie()
      completeMe.populate(dictionary)
      expect(completeMe.suggest('piz')).to.deep.equal([ 'pize', 'pizza', 'pizzeria', 'pizzicato', 'pizzle' ])
      expect(completeMe.suggest('zamb')).to.deep.equal([ 'zambo', 'zamboorak' ])
    })

    it('should return selected completions first', ()=> {
      let completeMe = new Trie()
      completeMe.insert('pizza')
      completeMe.insert('pinocchio')
      completeMe.insert('pizzaz')
      completeMe.insert('pittance')
      completeMe.insert('hoth')
      completeMe.insert('hatchet')
      completeMe.insert('helmet')
      completeMe.insert('hat')
      completeMe.insert('dog')

      expect(completeMe.suggest('p')).to.deep.equal(['pizza', 'pizzaz', 'pinocchio', 'pittance'])
      expect(completeMe.suggest('h')).to.deep.equal(['hoth', 'hat', 'hatchet', 'helmet'])

      completeMe.select('helmet')
      completeMe.select('pittance')

      expect(completeMe.suggest('p')).to.deep.equal(['pittance', 'pizza', 'pizzaz', 'pinocchio'])
      expect(completeMe.suggest('h')).to.deep.equal(['helmet', 'hoth', 'hat', 'hatchet'])

      completeMe.select('hatchet')
      expect(completeMe.suggest('h')).to.deep.equal(['hatchet', 'helmet', 'hoth', 'hat'])
    })

  })

  describe('Populate', ()=> {

    it('should be able to insert an array of words into the trie', ()=> {
      let completeMe = new Trie()
      let array = ['woof', 'dog', 'hoth']
      completeMe.populate(array)
      expect(completeMe.count).to.equal(3)
    })

    it('should be able to insert words from the dictionary into the trie', ()=> {
      let completeMe = new Trie()
      completeMe.populate(dictionary)
      expect(completeMe.count).to.equal(235886)
    })

  })

  describe('Select', ()=> {

    it('should select a string', ()=> {
      let completeMe = new Trie()
      completeMe.insert('hat')
      completeMe.select('hat')
      expect(completeMe.root.next.h.next.a.next.t.selectCount).to.equal(1)
    })

    it('should return selected completions first', ()=> {
      let completeMe = new Trie()
      completeMe.insert('pizza')
      completeMe.insert('pinocchio')
      completeMe.insert('pizzaz')
      completeMe.insert('pittance')
      completeMe.insert('hoth')
      completeMe.insert('hatchet')
      completeMe.insert('helmet')
      completeMe.insert('hat')
      completeMe.insert('dog')

      expect(completeMe.suggest('p')).to.deep.equal(['pizza', 'pizzaz', 'pinocchio', 'pittance'])
      expect(completeMe.suggest('h')).to.deep.equal(['hoth', 'hat', 'hatchet', 'helmet'])

      completeMe.select('helmet')
      completeMe.select('pittance')

      expect(completeMe.suggest('p')).to.deep.equal(['pittance', 'pizza', 'pizzaz', 'pinocchio'])
      expect(completeMe.suggest('h')).to.deep.equal(['helmet', 'hoth', 'hat', 'hatchet'])

      completeMe.select('hatchet')
      expect(completeMe.suggest('h')).to.deep.equal(['hatchet', 'helmet', 'hoth', 'hat'])
    })

  })

  describe('Delete', ()=> {

    it('should find a given string in the trie', ()=> {
      let completeMe = new Trie()
      completeMe.insert("try")
      completeMe.insert("tree")

      expect(completeMe.delete("tree")).to.equal("tree")

    })

    it('should remove the given string as a word', ()=> {
      let completeMe = new Trie()
      completeMe.insert("try")
      completeMe.insert("tree")

      expect(completeMe.count).to.equal(2)

      completeMe.delete("tree")

      expect(completeMe.count).to.equal(1)
      expect(completeMe.suggest('tr')).to.deep.equal(['try'])
    })

    it('should delete any solo nodes of the string remaining in the trie...', ()=> {

      let completeMe = new Trie()
      completeMe.insert("try")
      completeMe.insert("tree")

      expect(completeMe.count).to.equal(2)

      completeMe.delete("tree")

      expect(completeMe.count).to.equal(1)
      // expect(completeMe.root.next.t.next.r.next.e).to.deep.equal(null)

    })

  })

})
