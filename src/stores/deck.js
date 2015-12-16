'use strict'
exports.getDefaultDeck = function(){
  let slide = {
    components: [],
    active: true
  }
  let slides = []
  slides.push(slide)
  return {
    slides: slides
  }
}

exports.getActiveSlideIdx = function(deck){
  deck.findIndex(e => e.active)
}
