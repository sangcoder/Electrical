import $ from 'jquery'

const Counter = (($) => {
  const NAME = 'counter'
  const DATA_KEY = `bs.${NAME}`
  const EVENT_KEY = `.${DATA_KEY}`
  const DATA_API_KEY = '.data-api'
  const Event = {
    LOAD_DATA_API: `load${EVENT_KEY}${DATA_API_KEY}`,
    CLICK_DATA_API: `click${EVENT_KEY}${DATA_API_KEY}`
  }
  const Default = {
    initValue: 0,
    step: 1
  }
  const ClassName = { // eslint-disable-line
  }
  const Selector = {
    DATA_MODULE: `[data-module="${NAME}"]`,
    INCREASE: '.increase',
    DECREASE: '.decrease',
    CURRENT_VALUE: '.counterValue'
  }

  class Counter {
    constructor (element, config) {
      this._element = $(element)
      this._config = this._getConfig(config)
      this._currentValue = this._config.initValue
      this._updateDocument()
      this._addEventListener()
    }
    // public api
    static get Default () {
      return Default
    }
    increase () {
      this._currentValue = this._currentValue + this._config.step
      this._updateDocument()
    }
    decrease () {
      this._currentValue = this._currentValue - this._config.step
      this._updateDocument()
    }
    // private api
    _addEventListener () {
      $(this._element).on('click', Selector.INCREASE, this.increase.bind(this))
      $(this._element).on('click', Selector.DECREASE, this.decrease.bind(this))
    }
    _getConfig (config) {
      config = $.extend({}, Default, config)
      return config
    }
    _updateDocument () {
      $(Selector.CURRENT_VALUE, this._element).html(this._currentValue)
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
          data = new Counter(this, _config)
          $element.data(DATA_KEY, data)
        }
      })
    }
  }
  /**
   * Data Api implement
   */
  // $(document).on(Event.CLICK_DATA_API, Selector.DATA_MODULE, (event) => {
  //   console.log(Event.CLICK_DATA_API)
  //   // Counter._jQueryInterface.call($(this), event)
  // })

  // (function () {
  //   console.log('counter loaded')
  //   Counter._jQueryInterface.call($(Selector.DATA_MODULE))
  //   // $(Selector.DATA_MODULE).each(function () {
  //   //   const $counter = $(this)
  //   //   console.log('$counter.data():', $counter.data())
  //   //   Counter._jQueryInterface.call($counter, $counter.data())
  //   // })
  // }())
  $(window).on(Event.LOAD_DATA_API, () => {
    console.log('counter loaded')
    Counter._jQueryInterface.call($(Selector.DATA_MODULE))
  })

  /**
   * jQuery
   */
  $.fn[NAME] = Counter._jQueryInterface
  $.fn[NAME].Constructor = Counter

  return Counter
})($)

export default Counter
