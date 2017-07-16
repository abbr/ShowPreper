'use strict'
import _ from 'lodash'
import DefaultDeck from 'sources/default.spj'
const _spDefaultFileNm = 'default.spj'
const _spDefaultDeck = '_defaultDeck'
const DEFAULT_SLIDE_SIZE = { width: 640, height: 480 }

let Deck = function(fn, props) {
  var savedDeckObj
  var _fn = fn || _spDefaultFileNm
  if (typeof Storage !== 'undefined') {
    try {
      savedDeckObj = JSON.parse(localStorage.getItem(_fn))
    } catch (ex) {}
  }
  let deckObj = props || savedDeckObj || _.cloneDeep(DefaultDeck)
  _.assign(this, deckObj)
  Object.defineProperty(this, 'undoStack', {
    enumerable: false,
    value: {
      stack: [],
      current: -1
    }
  })
  Object.defineProperty(this, '_fn', {
    enumerable: false,
    value: _fn
  })
  if (deckObj !== savedDeckObj) {
    this.save()
  }
  this.markUndo('')
}

Deck.prototype.getActiveSlide = function() {
  return this.getSlides()[this.activeSlide || 0]
}

Deck.prototype.activateSlide = function(i) {
  this.activeSlide = i
}

Deck.prototype.delete = function() {
  try {
    localStorage.removeItem(this._fn)
    if (localStorage.getItem(_spDefaultDeck) === this._fn) {
      localStorage.removeItem(_spDefaultDeck)
    }
  } catch (e) {}
}

Deck.prototype.save = function() {
  if (typeof Storage !== 'undefined') {
    localStorage.setItem(_spDefaultDeck, this._fn)
    localStorage.setItem(this._fn, JSON.stringify(this))
  }
}

Deck.prototype.markUndo = function(desc) {
  this.undoStack.stack.splice(
    ++this.undoStack.current,
    this.undoStack.stack.length,
    {
      desc: desc,
      deck: _.cloneDeep(this)
    }
  )
}

Deck.prototype.undo = function() {
  this.undoStack.current > 0 &&
    _.assign(
      this,
      _.cloneDeep(this.undoStack.stack[--this.undoStack.current].deck)
    )
}

Deck.prototype.redo = function() {
  this.undoStack.current + 1 < this.undoStack.stack.length &&
    _.assign(
      this,
      _.cloneDeep(this.undoStack.stack[++this.undoStack.current].deck)
    )
}
Deck.prototype.getSlides = function() {
  return this.components.filter((e, i, a) => e.type === 'Slide')
}
Deck.prototype.getSlideBoundingBox = function(e) {
  let nCols = Math.ceil(Math.sqrt(this.getSlides().length))
  // assume square grid layout
  let slideWidth = e.width || this.slideWidth || DEFAULT_SLIDE_SIZE.width
  let slideHeight = e.height || this.slideHeight || DEFAULT_SLIDE_SIZE.height
  let slideMargin = Math.min(slideWidth, slideHeight) * 0.1
  let i = this.getSlides().indexOf(e)
  let row = Math.floor(i / nCols)
  let col = i % nCols
  let left = e.x || (slideWidth + slideMargin) * col
  let right = left + slideWidth
  let top = e.y || (slideHeight + slideMargin) * row
  let bottom = top + slideHeight
  return { top: top, right: right, bottom: bottom, left: left }
}

Deck.prototype.getDefaultDeckBoundingBox = function() {
  return this.getSlides().reduce((pv, e) => {
    let bb = this.getSlideBoundingBox(e)
    pv = pv || {
      top: bb.top,
      right: bb.right,
      bottom: bb.bottom,
      left: bb.left
    }
    return {
      top: Math.min(bb.top, pv.top),
      right: Math.max(bb.right, pv.right),
      bottom: Math.max(bb.bottom, pv.bottom),
      left: Math.min(bb.left, pv.left)
    }
  }, null)
}
exports.Deck = Deck
exports.getDefaultDeck = function() {
  let _fn = _spDefaultFileNm
  if (typeof Storage !== 'undefined') {
    _fn = localStorage.getItem(_spDefaultDeck) || _spDefaultFileNm
  }
  let args = [null, _fn]
  return new (Function.prototype.bind.apply(
    Deck,
    args.concat(Array.from(arguments))
  ))()
}
