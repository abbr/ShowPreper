'use strict'
import _ from 'lodash'
const _spDefaultFileNm = 'default.json'
import 'babel-polyfill'

let Deck = function () {
  var defaultDeckObj
  if (typeof(Storage) !== "undefined") {
    try {
      defaultDeckObj = JSON.parse(localStorage.getItem(_spDefaultFileNm))
    }
    catch (ex) {
    }
  }
  if (defaultDeckObj && typeof(defaultDeckObj) === 'object') {
    _.assign(this, defaultDeckObj)
  }
  else {
    let slide = {
      components: [{
        "type": "TextBox",
        "x": 100,
        "y": 50,
        "text": "<div style=\"font-family: Hammersmith One;font-size: 100pt\">ddd</div>"
      }, {
        "type": "TextBox",
        "scale": {
          "x": 2,
          "y": 2
        },
        "rotate": -0.785, // 45°counterclock-wise
        "text": "<div style=\"font-family: Hammersmith One;font-size: 50pt\">yyy</div>"
      }],
      active: true,
      selected: true,
      id: 0
    }
    let slides = []
    slides.push(slide)
    slide = {
      components: [],
      selected: false,
      id: 1
    }

    slides.push(slide)

    this.slides = slides
    this.nextId = 2
    this.slideWidth = 640
    this.slideHeight = 480
    this.save()
  }

  Object.defineProperty(this, "undoStack", {
    enumerable: false,
    value: {
      stack: [],
      current: -1
    }
  })
  this.markUndo('')
}

Deck.prototype.getSelectedSlideIdx = function () {
  return this.slides.findIndex((e, i, a) => e.selected === true)
}

Deck.prototype.getSelectedSlide = function () {
  return this.slides.find((e, i, a) => e.selected === true)
}

Deck.prototype.selectSlide = function (i) {
  this.slides[this.getSelectedSlideIdx()].selected = false
  this.slides[i].selected = true
}

Deck.prototype.save = function () {
  if (typeof(Storage) !== "undefined") {
    localStorage.setItem(_spDefaultFileNm, JSON.stringify(this))
  }
}

Deck.prototype.markUndo = function (desc) {
  this.undoStack.stack.splice(++this.undoStack.current, this.undoStack.stack.length, {
    desc: desc,
    deck: _.cloneDeep(this)
  })
}

Deck.prototype.undo = function () {
  (this.undoStack.current > 0) && _.assign(this, _.cloneDeep(this.undoStack.stack[--this.undoStack.current].deck))
}

Deck.prototype.redo = function () {
  ((this.undoStack.current + 1) < this.undoStack.stack.length) && _.assign(this, _.cloneDeep(this.undoStack.stack[++this.undoStack.current].deck))
}

exports.getDefaultDeck = function () {
  return {deck: new Deck()}
}
