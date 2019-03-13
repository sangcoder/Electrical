import $ from 'jquery'

const ModResidental = (($) => {
  const NAME = 'mod-residental'
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

  class ModResidental {
    constructor (element, config) {
      this._element = $(element)
      this._config = this._getConfig(config)
      this.nameFucition()
      this.sliderResidental()
    }
    // public api
    static get Default () {
      return Default
    }

    // private api
    nameFucition () {

    }

    sliderResidental () {
      $('.resindental-slide').slick({
        rows: 0,
        dots: true,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: '<div class="slick-prev"><span class="icomoon icon-chevron-left"></span></div>',
        nextArrow: '<div class="slick-next"><span class="icomoon icon-chevron-right"></span></div>',
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
          data = new ModResidental(this, _config)
          $element.data(DATA_KEY, data)
        }
      })
    }
  }

  /**
   * Data Api implement
   */
  $(window).on(Event.LOAD_DATA_API, () => {
    ModResidental._jQueryInterface.call($(Selector.DATA_MODULE))
  })

  /**
   * jQuery
   */
  $.fn[NAME] = ModResidental._jQueryInterface
  $.fn[NAME].Constructor = ModResidental

  return ModResidental
})($)

export default ModResidental
