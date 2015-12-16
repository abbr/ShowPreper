'use strict'
exports.getDefaultDeck = function () {
  let slide = {
    components: [],
    active: true
  }
  let slides = []
  slides.push(slide)
  return {
    deck: {
      slides: slides,
      config: {
        slideWidth: 900,
        slideHeight: 700
      }
    }
  }
}

exports.getActiveSlideIdx = function (deck) {
  deck.findIndex(e => e.active)
}
