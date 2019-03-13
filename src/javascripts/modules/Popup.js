import $ from 'jquery'
// import select from './SelectC8'
const Popup = (() => {
  const $html = $('html')
  const $modPop = '.mod-popup'
  // const $modPopStatic = '.mod-popup-static'
  const $ClosePopup = '.popup-is-close'
  const $openPopup = '.popup-is-open'
  let closeContent = '<span class="icomoon icon-cancel"></span>'
  let contentInner = '<div class="popup-inner"><h3>The requested content cannot be loaded. <br> Please try again later.</h3></div>'
  let widthContent = 'container'
  let widthContentTmp = widthContent
  let iframe = ''
  let gallarySlider
  let initialSlideTMp = 0
  const renderPopup = () => {
    let html = '<div class="mod-popup popup-show">' +
      '<div class="popup-container ps-as">' +
      '<div class="popup-content ' + widthContent + '">' +
      ' <div class="mask-pop-overlay"></div>' +
      '</div>' +
      '</div>' +
      '</div>'
    $(document.body).append(html)
  }

  const openPopupGallery = () => {
    $html.on('click', $openPopup, (e) => {
      const ele = e.currentTarget
      let cloneTmp = ''
      $(ele).addClass('is-click')
      let htmlClass = $(ele).data('htmlclass')
      let tmpContent = $(ele).data('id')
      let tmpPopup = $(ele).data('popup')
      let tmpWidthContent = $(tmpContent).data('content')
      if ($(tmpContent).hasClass('mod-popup-static')) {
        $(tmpContent).addClass('popup-static')
      } else {
        if (typeof tmpWidthContent !== 'undefined' || tmpWidthContent === '') {
          widthContent = tmpWidthContent
        }
        // popup video
        if (tmpPopup === 'video') {
          let srcVideo = $(ele).attr('href')
          iframe = '<div class="popup-inner popup-video "><div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="' + srcVideo + '" frameborder="0"></iframe></div></div>'
          renderPopup()
          let $popupContent = $($modPop).find('.popup-content')
          $popupContent.append(iframe)
          $popupContent.find('.popup-inner').append('<a href="javascript:;" class="popup-is-close">' + closeContent + '</a>')
        } else if (tmpPopup === 'garally') {
          // popup garally
          cloneTmp = $(tmpContent).find('.popup-inner').clone()
          renderPopup()
          let $popupContent = $($modPop).find('.popup-content')
          if ($(tmpContent).length) {
            $popupContent.append(cloneTmp)
            gallarySlider = $($modPop).find('.gallary-silder')
            callSliderGallery()
          } else {
            $popupContent.addClass('no-element').append(contentInner)
          }
          $popupContent.find('.popup-inner').append('<a href="javascript:;" class="popup-is-close">' + closeContent + '</a>')
        } else {
          // popup content
          cloneTmp = $(tmpContent).find('.popup-inner').clone()
          renderPopup()
          let $popupContent = $($modPop).find('.popup-content')
          if ($(tmpContent).length) {
            $popupContent.append(cloneTmp)
          } else {
            $popupContent.addClass('no-element').append(contentInner)
          }
          $popupContent.find('.popup-inner').append('<a href="javascript:;" class="popup-is-close">' + closeContent + '</a>')
        }
      }
      if ($(tmpContent).hasClass('popup-static')) {
        $(tmpContent).addClass('popup-show')
      } else {
        $($modPop).addClass('popup-show')
      }
      $html.addClass(htmlClass).addClass('popup-open')

      setTimeout(() => {
        $html.addClass('popup-animation')
      }, 100)
      // callBack()
      return false
    })
  }

  const clickClosePopup = () => {
    $html.on('click', $ClosePopup, (e) => {
      closePopup()
    })
  }

  const closePopup = () => {
    let classHtml = $html.find('.is-click').data('htmlclass')
    $html.removeClass('popup-open popup-animation ' + classHtml)
    if ($html.find('.popup-show').hasClass('popup-static')) {
      $html.find('.popup-static').removeClass('popup-show')
    } else {
      $($modPop).remove()
    }
    $html.find('.is-click').removeClass('is-click')
    widthContent = widthContentTmp
  }

  const clickOutSite = () => {
    $html.on('click', '.mask-pop-overlay', (e) => {
      closePopup()
    })
  }

  const callSliderGallery = () => {
    gallarySlider.slick({
      dots: false,
      infinite: true,
      speed: 500,
      rows: 0,
      slidesToShow: 1,
      adaptiveHeight: true,
      // variableWidth: true,
      slide: '.gallary-item',
      initialSlide: initialSlideTMp,
      prevArrow: '<button type="button" class="slick-prev arrows"><span class="icomoon h1 icon-chevron-left"></span></button>',
      nextArrow: '<button type="button" class="slick-next arrows"><span class="icomoon h1 icon-chevron-right"></span></button>'
    })
    // this.slider[0].slick.refresh()
  }

  openPopupGallery()
  closePopup()
  clickOutSite()
  clickClosePopup()

  return {
    renderPopup: renderPopup,
    openPopupGallery: openPopupGallery,
    clickClosePopup: clickClosePopup,
    closePopup: closePopup,
    clickOutSite: clickOutSite,
    callSliderGallery: callSliderGallery
  }
})()
export default Popup
