import $ from 'jquery'
const UserAgent = (() => {
  const $html = $('html')
  const checkDevice = () => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      $html.addClass('touch')
    } else {
      $html.addClass('no-touch')
    }
  }
  const checkIeVersion = (version) => {
    let val = false
    switch (version) {
      case 7:
        val = /MSIE 7/.test(navigator.userAgent)
        break
      case 8:
        val = /MSIE 8/.test(navigator.userAgent)
        break
      case 9:
        val = /MSIE 9/.test(navigator.userAgent)
        break
      case 10:
        val = /MSIE 10/.test(navigator.userAgent)
        break
      case 11:
        val = /rv:11/.test(navigator.userAgent)
        break
    }
    return val
  }
  const browserDetection = () => {
    let isExplorer = (navigator.userAgent.indexOf('MSIE') || navigator.userAgent.indexOf('rv:15')) > -1
    let isFirefox = navigator.userAgent.indexOf('Firefox') > -1
    let isSafari = navigator.userAgent.indexOf('Safari') > -1
    let isChrome = navigator.userAgent.indexOf('Chrome') > -1
    let isOpera = navigator.userAgent.indexOf('OPR') > -1
    if (isExplorer || document.documentMode) {
      $html.addClass('ie')
    }
    if (isFirefox) {
      $html.addClass('firefox')
    }
    if (isChrome && isSafari && !isOpera) {
      $html.addClass('chrome')
    }
    if (!isChrome && isSafari) {
      $html.addClass('safari')
    }
    if (checkIeVersion(8)) {
      $html.addClass('ie8')
    }
    if (checkIeVersion(9)) {
      $html.addClass('ie9')
    }
    if (checkIeVersion(10)) {
      $html.addClass('ie10')
    }
    if (checkIeVersion(11) || checkIeVersion(12)) {
      $html.addClass('ie11')
    }
    if (/Edge/.test(navigator.userAgent)) {
      $html.addClass('edge')
    }
  }
  const formJs = () => {
    const formGroup = '.form-group-v2'
    const formControl = '.form-control'
    const activeFocus = 'active-focus'
    $(formGroup).on('focus', formControl, (e) => {
      const ele = e.currentTarget
      $(formControl).each((index, el) => {
        if ($(el).val().length < 1) {
          $(el).parents(formGroup).removeClass(activeFocus)
        }
      })
      $(ele).parents(formGroup).addClass(activeFocus)
    })
    $(formGroup).on('change', formControl, (e) => {
      const ele = e.currentTarget
      $(formControl).each((index, el) => {
        if ($(el).val().length < 1) {
          $(el).parents(formGroup).removeClass(activeFocus)
        }
      })
      $(ele).parents(formGroup).addClass(activeFocus)
    })

    $(formControl).each((index, el) => {
      if ($(el).val().length) {
        $(el).parents(formGroup).addClass(formGroup)
      }
    })

    // $('.form-group-v2 .bootstrap-select.form-control').click((e) => {
    //   const ele = e.currentTarget
    //   $(ele).parents(formGroup).addClass(formGroup)
    // })

    $(document).click((e) => {
      const ele = e.target
      if (!$(ele).is('.form-group-v2 .form-control, .form-group-v2 .form-control*')) {
        $(formControl).each((index, el) => {
          if ($(el).val().length < 1) {
            $(el).parents(formGroup).removeClass(activeFocus)
          }
        })
      }
    })
  }
  const blazyload = () => {
    $('[data-src]').Lazy({
      beforeLoad: (element) => {
        console.log('start loading ' + element.prop('tagName'))
      },
      afterLoad: (element) => {
        $(element).addClass('b-loaded')
      }
    })
  }
  const convertSvg = () => {
    jQuery('.img-av img').each(function () {
      var $img = jQuery(this)
      var imgID = $img.attr('id')
      var imgClass = $img.attr('class')
      var imgURL = $img.attr('src')
      jQuery.get(imgURL, function (data) {
          // Get the SVG tag, ignore the rest
        var $svg = jQuery(data).find('svg')
        // Add replaced image's ID to the new SVG
        if (typeof imgID !== 'undefined') {
          $svg = $svg.attr('id', imgID)
        }
        // Add replaced image's classes to the new SVG
        if (typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', imgClass + ' replaced-svg')
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a')

        // Check if the viewport is set, else we gonna set it if we can.
        if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
          $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
        }
        // Replace image with new SVG
        $img.replaceWith($svg)
      }, 'xml')
    })
  }
  checkDevice()
  browserDetection()
  blazyload()
  formJs()
  convertSvg()
})()
export default UserAgent
