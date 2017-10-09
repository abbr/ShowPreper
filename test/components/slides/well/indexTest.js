import { appWrapper } from 'helpers/fullRenderHelper'

describe('slides > well', () => {
  it('should add a slide when clicking top insert slide button', () => {
    expect(appWrapper.state().deck.getActiveSlide().components.length).to.equal(
      1
    )
    expect(appWrapper.state().deck.components.length).to.equal(4)
    appWrapper
      .find(
        '.sp-well-slide-creator > .btn-success'
      )
      .first().simulate('click')
    expect(appWrapper.state().deck.components.length).to.equal(5)
  })
})
