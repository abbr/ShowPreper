import getAppWrapper from 'helpers/fullRenderHelper'

describe('widgets > editableComponent', () => {
  let appWrapper
  beforeEach(() => {
    appWrapper = getAppWrapper('App')
  })

  it('should display edit controls when clicking a widget in ot', () => {
    expect(
      $(
        '.sp-operating-table .sp-ot-slide .sp-component:first .sp-edit-ctrls'
      ).css('visibility')
    ).to.equal('hidden')
    appWrapper
      .find('.sp-operating-table .sp-ot-slide .sp-component')
      .first()
      .simulate('mousedown')
    expect(
      $(
        '.sp-operating-table .sp-ot-slide .sp-component:first .sp-edit-ctrls'
      ).css('visibility')
    ).to.equal('visible')
  })
})
