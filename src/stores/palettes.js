'use strict'
import _ from 'lodash'
import DefaultPalettes from 'sources/default_palettes.json'

const _spDefaultFileNm = 'palettes.json'
let Palettes = function () {
  let savedPalettes
  if (typeof(Storage) !== "undefined") {
    try {
      savedPalettes = JSON.parse(localStorage.getItem(_spDefaultFileNm))
    }
    catch (ex) {
    }
  }
  _.assign(this, savedPalettes || _.clone(DefaultPalettes))
}

Palettes.prototype.save = function () {
  if (typeof(Storage) !== "undefined") {
    localStorage.setItem(_spDefaultFileNm, JSON.stringify(this))
  }
}
export default Palettes
