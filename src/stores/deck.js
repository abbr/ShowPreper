'use strict'
import _ from 'lodash'
const _spDefaultFileNm = 'default.json'
import 'babel-polyfill'

let Deck = function () {
  var defaultDeckObj
  if (typeof(Storage) !== "undefined") {
    try{
      defaultDeckObj = JSON.parse(localStorage.getItem(_spDefaultFileNm))
    }
    catch(ex){}
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

Deck.prototype.save = function(){
  if (typeof(Storage) !== "undefined") {
    localStorage.setItem(_spDefaultFileNm,JSON.stringify(this))
  }
}

exports.getDefaultDeck = function () {
  return {deck: new Deck()}
}
