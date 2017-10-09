import { appWrapper } from 'helpers/fullRenderHelper'

describe('Header', () => {
  it('should add a text widget when clicking insert object button', () => {
    expect(appWrapper.state().deck.getActiveSlide().components.length).to.equal(
      1
    )
    appWrapper
      .find(
        '.sp-main-container .navbar .container-fluid #sp-navbar-collapse-1 .navbar-left button'
      )
      .first()
      .simulate('click')
    expect(appWrapper.state().deck.getActiveSlide().components.length).to.equal(
      2
    )
    expect(
      appWrapper.state().deck.getActiveSlide().components[1].selected
    ).to.equal(true)
    expect(appWrapper.state().deck.getActiveSlide().components[1].x).to.equal(0)
    expect(appWrapper.state().deck.getActiveSlide().components[1].y).to.equal(0)
  })
})
