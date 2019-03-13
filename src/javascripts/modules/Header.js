import $ from 'jquery'
const Header = (($) => {
  const NAME = 'header'
  const DATA_KEY = `bs.${NAME}`
  const EVENT_KEY = `.${DATA_KEY}`
  const DATA_API_KEY = '.data-api'
  const Event = {
    LOAD_DATA_API: `load${EVENT_KEY}${DATA_API_KEY}`,
    CLICK_DATA_API: `click${EVENT_KEY}${DATA_API_KEY}`
  }
  const Default = {
    scrollT: 0
  }
  const Selector = {
    DATA_MODULE: `[data-module="${NAME}"]`
  }

  class Header {
    constructor (element, config) {
      this._element = $(element)
      this._config = this._getConfig(config)
      $(window).resize(this.onResizeWindow.bind(this))
      this.scrollPinHeader()
    }
    // public api
    static get Default () {
      return Default
    }

    onResizeWindow () {
      this.settingPin()
    }

    settingPin () {
      let scrollTop = $(window).scrollTop()
      if (scrollTop > this._config.scrollT) {
        this._element.addClass('pin-header')
      } else {
        this._element.removeClass('pin-header')
      }
    }

    scrollPinHeader () {
      this.settingPin()
      $(window).scroll(() => {
        this.settingPin()
      })
    }
    _getConfig (config) {
      config = $.extend({}, Default, config)
      return config
    }
    static _jQueryInterface (config) {
      return this.each(function () {
        const $element = $(this)
        const _config = $.extend(
          {},
          Default,
          $element.data(),
          typeof config === 'object' && config
        )
        let data = $element.data(DATA_KEY)
        if (!data) {
          data = new Header(this, _config)
          $element.data(DATA_KEY, data)
        }
      })
    }
  }

  /**
   * Data Api implement
   */
  $(window).on(Event.LOAD_DATA_API, () => {
    Header._jQueryInterface.call($(Selector.DATA_MODULE))
  })

  /**
   * jQuery
   */
  $.fn[NAME] = Header._jQueryInterface
  $.fn[NAME].Constructor = Header

  return Header
})($)

export default Header
