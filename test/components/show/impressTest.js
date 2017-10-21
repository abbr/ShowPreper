import getAppWrapper from 'helpers/fullRenderHelper'
describe('show > impress', () => {
  let appWrapper
  beforeEach(() => {
    appWrapper = getAppWrapper('Impress')
  })

  it('should have 5 initial views', () => {
    expect(appWrapper.find('#impress').props().children.length).to.equal(5)
  })
})
