import $ from 'jquery'

const <%= ClassName %> = (($) => {
  const NAME = '<%= ModuleName %>'
  const DATA_KEY = `bs.${NAME}`
  const EVENT_KEY = `.${DATA_KEY}`
  const DATA_API_KEY = '.data-api'
  const Event = {
    LOAD_DATA_API: `load${EVENT_KEY}${DATA_API_KEY}`,
    CLICK_DATA_API: `click${EVENT_KEY}${DATA_API_KEY}`
  }
  const Default = {
  }
  const ClassName = { // eslint-disable-line
  }
  const Selector = {
    DATA_MODULE: `[data-module="${NAME}"]`
  }

  class <%= ClassName %> {
    constructor (element, config) {
      this._element = $(element)
      this._config = this._getConfig(config)
      this.nameFucition()
    }
    // public api
    static get Default () {
      return Default
    }

    // private api
    nameFucition () {

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
          data = new <%= ClassName %>(this, _config)
          $element.data(DATA_KEY, data)
        }
      })
    }
  }

  /**
   * Data Api implement
   */
  $(window).on(Event.LOAD_DATA_API, () => {
    <%= ClassName %>._jQueryInterface.call($(Selector.DATA_MODULE))
  })

  /**
   * jQuery
   */
  $.fn[NAME] = <%= ClassName %>._jQueryInterface
  $.fn[NAME].Constructor = <%= ClassName %>

  return <%= ClassName %>
})($)

export default <%= ClassName %>
