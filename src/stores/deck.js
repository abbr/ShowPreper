'use strict'

let Deck = function () {
  let slide = {
    components: [{
      "type": "TextBox",
      "x": 100,
      "y":50,
      "text": "<font face=\"Hammersmith One\" color=\"#000000\">ddd</font>"
    }, {
      "type": "TextBox",
      "text": "<font face=\"Hammersmith One\" color=\"#000000\">yyy</font>"
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
  this.slideWidth = 900
  this.slideHeight = 700
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

exports.getDefaultDeck = function () {
  return {deck: new Deck()}
}
