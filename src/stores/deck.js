'use strict'

let Deck = function () {
  let slide = {
    components: [{
      "type": "TextBox",
      "x": 100,
      "y":50,
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
