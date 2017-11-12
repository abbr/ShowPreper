import getAppWrapper from 'helpers/fullRenderHelper'
import 'helpers/jquery.simulate.drag-sortable.js'

describe('slides > well', () => {
  let appWrapper
  beforeEach(() => {
    appWrapper = getAppWrapper('App')
  })

  it('should add a slide when clicking top insert slide button', () => {
    expect(appWrapper.state().deck.components.length).to.equal(4)
    appWrapper
      .find('.sp-well-slide-creator > .btn-success')
      .first()
      .simulate('click')
    expect(appWrapper.state().deck.components.length).to.equal(5)
  })
  it('should move the 1st slide to 3rd when performing DnD', done => {
    expect(appWrapper.state().deck.components[2].components.length).to.equal(0)
    $('.sp-well-slide-wrapper')
      .first()
      .simulateDragSortable({ move: 3 })
    setTimeout(() => {
      expect(
        appWrapper.state().deck.components[2].components[0].text
      ).to.contain('Welcome to ShowPreper')
      done()
    }, 10)
  })
})
