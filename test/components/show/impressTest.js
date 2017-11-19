import getAppWrapper from 'helpers/fullRenderHelper'
describe('show > impress', () => {
  let appWrapper
  beforeEach(() => {
    appWrapper = getAppWrapper('Impress')
  })
  afterEach(() => {
    $('body').removeAttr('style')
    $('body').removeAttr('class')
  })

  it('should populate window.deck global variable', () => {
    let deck
    let deckStr = $('#app script')[0].innerHTML // var deck = ...
    eval(deckStr.substr(deckStr.indexOf('deck'))) // deck = ...
    expect(deck.components instanceof Object).to.equal(true)
  })

  it('should have 5 initial views', () => {
    expect(appWrapper.find('#impress').props().children.length).to.equal(5)
    expect($('body').attr('class')).to.contain('impress-on-step-1')
    expect(
      $('#step-1')
        .attr('class')
        .split(' ')
    ).to.include('active')
  })

  it('should move to 2nd step when press right key', () => {
    let event = new KeyboardEvent('keyup', {
      key: 'ArrowRight'
    })
    document.dispatchEvent(event)
    expect($('body').attr('class')).to.contain('impress-on-step-2')
    expect(
      $('#step-2')
        .attr('class')
        .split(' ')
    ).to.include('active')
  })
})
