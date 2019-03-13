import $ from 'jquery'
const ConvertHeight = (($) => {
  $.fn.convertHeight = function () {
    return this.each(function () {
      let element = $(this)
      $(element).innerHeight('auto')
      let itemss = $(element)
      let innerHeights = itemss.map(function () {
        return $(this).innerHeight()
      })
      let maxHeight = Math.max(...innerHeights)
      element.innerHeight(maxHeight)
    })
  }
})($)
export default ConvertHeight
