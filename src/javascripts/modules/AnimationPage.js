import $ from 'jquery'
import {
  TimelineMax, // eslint-disable-line
  TweenMax
} from 'gsap'
import 'animation.gsap'
import ScrollMagic from 'scrollmagic/scrollmagic/minified/ScrollMagic.min'
import 'scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js'
var controller = new ScrollMagic.Controller({ // eslint-disable-line
  refreshInterval: 0
})

const AnimationPage = (() => {
  const callAnimation = () => {
    let speed = 0.4
    let hWindow = $(window).height()
    let offetH = -(hWindow / 2)
    let $bannerHome = $('.mod-banner-home')
    if ($bannerHome.length) {
      $bannerHome.each(function () {
        let currentStrong = this
        let _this = $(this)
        let tl2 = new TimelineMax({
          onComplete: function () {
            tl2.kill()
            $bannerHome.find('.square-1').css('left', '')
          }
        })
        let tl3 = new TimelineMax({
          onComplete: function () {
            tl3.kill()
          }
        })
        tl2.staggerFrom(_this.find('.col-img-c-bg'), 0.7, {delay: 0.5, x: -100, opacity: 0, ease: Power2.easeOut}, 0.2, 0.2)
        tl2.staggerFrom(_this.find('.col-img-c-text'), 0.7, {delay: 0.5, x: 100, opacity: 0, ease: Power2.easeOut}, 0.2, 0.2)
        tl3.staggerFrom(_this.find('.square-1.v-animation'), speed, {delay: 0.1, right: 0, ease: Power2.easeOut}, 0.2, 0.2)
        var scene = new ScrollMagic.Scene({ // eslint-disable-line
          triggerElement: currentStrong,
          offset: offetH
        }).setTween(tl2)
          .addTo(controller)
        var scene2 = new ScrollMagic.Scene({ // eslint-disable-line
          triggerElement: currentStrong
        }).setTween(tl3)
          .addTo(controller)
      })
    }
  }
  callAnimation()
})()
export default AnimationPage
