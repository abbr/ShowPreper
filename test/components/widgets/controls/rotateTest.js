import getAppWrapper from 'helpers/fullRenderHelper'

describe('widgets > controls > rotate', () => {
  let appWrapper
  beforeEach(() => {
    appWrapper = getAppWrapper('App')
  })

  it('should rotate about 90° cw along z axis', () => {
    let domComponent = $('.sp-operating-table .sp-ot-slide .sp-component:first')
    expect(
      domComponent.find('.sp-edit-ctrls .rotate-z span:first').text()
    ).to.equal('0')
    appWrapper
      .find('.sp-operating-table .sp-ot-slide .sp-component')
      .first()
      .simulate('mousedown')
    appWrapper
      .find('.sp-operating-table .sp-ot-slide .sp-component')
      .first()
      .simulate('mouseup')
    let clientRect = domComponent[0].getBoundingClientRect()
    appWrapper
      .find('.sp-operating-table .sp-ot-slide .sp-component')
      .first()
      .find('.sp-edit-ctrls .rotate-z svg')
      .simulate('mousedown', {
        clientX: clientRect.left + clientRect.width,
        clientY: clientRect.top + clientRect.height / 2,
        buttons: 1
      })
    let event = new MouseEvent('mousemove', {
      clientX: clientRect.left + clientRect.width / 2,
      clientY: clientRect.top + clientRect.height
    })
    document.dispatchEvent(event)
    event = new MouseEvent('mouseup', {
      clientX: clientRect.left + clientRect.width / 2,
      clientY: clientRect.top + clientRect.height
    })
    document.dispatchEvent(event)
    expect(
      Math.abs(
        90 -
          parseInt(
            domComponent.find('.sp-edit-ctrls .rotate-z span:first').text()
          )
      )
    ).to.be.below(2)
  })
})
