import getAppWrapper from 'helpers/fullRenderHelper'

describe('widgets > primitives > textBox', () => {
  let appWrapper
  beforeEach(() => {
    appWrapper = getAppWrapper('App')
  })

  it('should display ckeditor when double-click; hide when blur', function(done) {
    this.timeout(5000)
    expect($('.cke').length).to.equal(0)
    expect(
      $('.sp-operating-table .sp-component .sp-widget .cke_editable_inline')
        .length
    ).to.equal(0)
    appWrapper
      .find('.sp-operating-table .sp-widget').last()
      .childAt(0)
      .simulate('doubleclick')
    setTimeout(() => {
      expect(
        $('.sp-operating-table .sp-component .sp-widget .cke_editable_inline')
          .length
      ).to.equal(1)
      let ele = $(
        '.sp-operating-table .sp-component .sp-widget .cke_editable_inline'
      )[0]
      let title = ele.title
      let editorInstNm = title.substr(title.indexOf(',') + 1).trim()
      expect($('#cke_' + editorInstNm).length).to.equal(1)
      ele.blur()
      setTimeout(() => {
        expect($('#cke_' + editorInstNm).length).to.equal(0)
        expect(
          $('.sp-operating-table .sp-component .sp-widget .cke_editable_inline')
            .length
        ).to.equal(0)
        done()
      }, 500)
    }, 3000)
  })
})
