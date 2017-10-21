import getAppWrapper from 'helpers/fullRenderHelper'

describe('styler > quick', () => {
  let appWrapper
  beforeEach(() => {
    appWrapper = getAppWrapper('App')
  })

  it('should change style when hover mouse over palette #1', () => {
    let otSlide = $('.sp-operating-table .sp-ot-slide')
    const originalStyle = otSlide.css('background').slice(0)
    let palette1Dom = $(
      '.sp-navbar-style #sp-quick-styler > .sp-palette[title="palette 1"]'
    )
    let palette1 = appWrapper.find(
      '.sp-navbar-style #sp-quick-styler > .sp-palette[title="palette 1"]'
    )
    palette1.simulate('mouseover')
    expect(otSlide.css('background')).to.equal(palette1Dom.css('background'))
    palette1.simulate('mouseleave')
    expect(otSlide.css('background')).to.equal(originalStyle)
  })
})
