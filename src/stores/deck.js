'use strict'
import _ from 'lodash'
const _spDefaultFileNm = 'default.json'
import 'babel-polyfill'
import SampleDeck from "sources/sample.json"
const DEFAULT_SLIDE_SIZE = {width: 640, height: 480}

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
    _.assign(this, SampleDeck)
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

Deck.prototype.getSlideBondingBox = function () {
  return this.slides.reduce((pv, e, i, a) => {
    let silidWidth = this.slideWidth || DEFAULT_SLIDE_SIZE.width
    let slideHeight = this.slideHeight || DEFAULT_SLIDE_SIZE.height
    let slideMargin = Math.min(silidWidth, slideHeight) * 0.1
    let left = e.x || (silidWidth + slideMargin) * i
    let right = left + slideWidth
    let top = e.y || (silidHeight + slideMargin) * i
    let bottom = top + slideHeight
    return {
      top: Math.min(top, pv.top)
      , right: Math.max(right, pv.right)
      , bottom: Math.max(bottom, pv.bottom)
      , left: Math.min(left, pv.left)
    }
  }, {})
}

exports.getDefaultDeck = function () {
  return new Deck()
}
