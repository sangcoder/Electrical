import $ from 'jquery'
import './ConvertHeight'
// import 'jquery-match-height'
const FixHeight = (($) => {
  const NAME = 'fixheight'
  const DATA_KEY = `bs.${NAME}`
  const EVENT_KEY = `.${DATA_KEY}`
  const DATA_API_KEY = '.data-api'
  const Event = {
    LOAD_DATA_API: `load${EVENT_KEY}${DATA_API_KEY}`,
    CLICK_DATA_API: `click${EVENT_KEY}${DATA_API_KEY}`
  }
  const Default = {
    item: '.height-item',
    item2: '.height-item-v2'
  }

  const Selector = {
    DATA_MODULE: `[data-module="${NAME}"]`
  }

  class FixHeight {
    constructor (element, config) {
      this._element = $(element)
      this._config = this._getConfig(config)
      this.onResizeWindow()

      $(window).resize(this.onResizeWindow.bind(this))
    }
    // public api
    static get Default () {
      return Default
    }

    onResizeWindow () {
      this.equalHeight()
    }
    equalHeight () {
      let $items = this._element.find(this._config.item2)
      $items.convertHeight()
      // this._element.find(this._config.item).matchHeight({
      //   byRow: true,
      //   property: 'height',
      //   target: null,
      //   remove: false
      // })
    }

    _getConfig (config) {
      config = $.extend({}, Default, config)
      return config
    }
    static _jQueryInterface (config) {
      return this.each(function () {
        const $element = $(this)
        const _config = $.extend({},
          Default,
          $element.data(),
          typeof config === 'object' && config
        )
        let data = $element.data(DATA_KEY)
        if (true) { // eslint-disable-line
          data = new FixHeight(this, _config)
          $element.data(DATA_KEY, data)
        }
      })
    }
  }

  /**
   * Data Api implement
   */
  $(window).on(Event.LOAD_DATA_API, () => {
    FixHeight._jQueryInterface.call($(Selector.DATA_MODULE))
  })

  /**
   * jQuery
   */
  $.fn[NAME] = FixHeight._jQueryInterface
  $.fn[NAME].Constructor = FixHeight

  return FixHeight
})($)

export default FixHeight
