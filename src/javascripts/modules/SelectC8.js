import $ from 'jquery'
const SelectC8 = (() => {
  const callSelectC8 = $('.select-c8')
  const dropdownSelectC8 = 'dropdown-select-c8'
  const arrow = '<span class="caret-c8 icomoon icon-chevron-down"></span>'

  const renderSelectToDropdown = () => {
    callSelectC8.each((index, element) => {
      if (!$(element).hasClass('select-done')) {
        let title = $(element).data('title')
        if (typeof title === 'undefined') {
          if ($(element).find(':selected').length) {
            title = $(element).find(':selected').text()
          } else {
            if ($(element).find('.selected').length) {
              title = $(element).find('.selected').text()
            } else {
              title = $(element).find('option').first().text()
            }
          }
        }
        $(element).parent().find('.dropdown').remove()
        $(element).parent().after()
              .append(`<div class='dropdown form-control ${dropdownSelectC8}'>
                <a class='dropdown-toggle form-control' href='#' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'><span class="filter-option">${title}</span>${arrow}</a>
                <div class='dropdown-menu'>
                <ul></ul>
                </div>
              </div>`)
        $(element).each((idx, elm) => {
          let tabIndex = 1
          let disabled = ''
          $(element).find('option', elm).each((id, el) => {
            if ($(el).prop('disabled')) {
              disabled = 'disabled'
            }
            $(element).parent().find('.dropdown ul').append('<li class="' + disabled + '" tabindex="' + tabIndex + '"> <a href="javascript:;" class="' + disabled + '">' + el.text + '</a></li>')
            tabIndex++
            disabled = ''
          })
        })

        let active = $(element).parents('.form-select-c8').find('.dropdown-select-c8 .filter-option').text()
        $(element).parents('.form-select-c8').find('.dropdown-menu li').each((id, el) => {
          if (active === $(el).find('a').text()) {
            $(el).addClass('selected')
          }
        })
        $(element).addClass('select-done')
      }
    })
  }

  const clickSelect = () => {
    $(document).on('click', '.dropdown-select-c8 li a', (e) => {
      const ele = e.currentTarget
      const index = $(ele).parents('li').index()
      let text = $(ele).text()
      $('.' + dropdownSelectC8).removeClass('focus')
      $(ele).parents('.form-control').find('.dropdown-toggle').addClass('active')
      $(ele).parents('ul').find('li').removeClass('focus')

      if ($(ele).parents('.form-select-c8').hasClass('multiselect')) {
        const dropParent = $(ele).parents('.form-select-c8')
        let val
        let string = ''
        if ($(ele).parent().hasClass('selected')) {
          $(ele).parent().removeClass('selected').addClass('not-hover')
          $(ele).parents('.form-select-c8').find('.select-c8 option').eq(index).removeAttr('selected')
          val = $(ele).parents('.form-select-c8').find('.select-c8 option').eq(index).val()
          if ($(ele).parents('ul').find('li.selected:not(.disabled)').length < 1) {
            string = $(ele).parents('ul').find('li.disabled a').text().trim() + ', '
            // string.slice(0, string.length - 2)
          }
        } else {
          $(ele).parent().addClass('selected').removeClass('not-hover')
        }

        $(ele).parents('ul').find('li.selected:not(.disabled)').each((index, el) => {
          let value = $(el).find('a').text().trim()
          string += value + ', '
        })

        if (!$(ele).parents('.dropdown-select-c8').hasClass('no-trigger-active')) {
          $(ele).parents('.dropdown-select-c8').find('.dropdown-toggle .filter-option').text(string.slice(0, string.length - 2))
        }
        dropParent.find('.select-c8 option').prop('selected', false)
        $.each(string.split(', '), (i, e) => {
          dropParent.find(".select-c8 option[value='" + e + "']").prop('selected', true)
          // console.log('index: ' + i + ' + name: ' + e)
        })
        // console.log('string: ' + string)
        dropParent.find('.select-c8').change()
        return false
      } else {
        if (!$(ele).parents('.dropdown-select-c8').hasClass('no-trigger-active')) {
          $(ele).parents('.dropdown-select-c8').find('.dropdown-toggle .filter-option').text(text)
        }
        $(ele).parents('ul').find('li').removeClass('selected')
        $(ele).parent().addClass('selected')

        const dropParent = $(ele).parents('.form-select-c8')

        $(ele).parents('.form-select-c8').find('.select-c8 option').removeAttr('selected').eq(index).attr('selected', 'selected')
        const val = $(ele).parents('.form-select-c8').find('.select-c8 option').removeAttr('selected').eq(index).attr('selected', 'selected').val()
        dropParent.find('.select-c8').val(val).change()
      }
    })
  }
  const hoverLiRemoveClass = () => {
    $('.' + dropdownSelectC8).find('li').hover(() => {
      $('.' + dropdownSelectC8).find('li').removeClass('not-hover').find('a').blur()
    }, function () {

    })
  }
  const focusSelect = () => {
    $('.' + dropdownSelectC8).keydown((e) => {
      const ele = e.currentTarget
      if (e.keyCode === 13) { // enter
        if ($(ele).find('li.focus').length && $(ele).find('li.focus.disabled').length === 0) {
          $(ele).find('li').removeClass('selected')
          $(ele).find('li.focus').addClass('selected').removeClass('focus').find('a').trigger('click')
          return false
        }
      }
      if (e.keyCode === 38) { // up
        let totalOption = $(ele).find('li').length
        let index = $(ele).find('li.focus').index()
        $(ele).addClass('focus')
        if ($(ele).find('li.focus').length < 1 || index === 0) {
          $(ele).find('li').removeClass('focus').eq(totalOption - 1).addClass('focus')
        } else {
          $(ele).find('li').removeClass('focus').eq(index).prev().addClass('focus')
        }
      }
      if (e.keyCode === 40) { // down
        let totalOption = $(ele).find('li').length
        let index = $(ele).find('li.focus').index()
        $(ele).addClass('focus')
        if ($(ele).find('li.focus').length < 1 || totalOption - 1 === index) {
          $(ele).find('li').removeClass('focus').first().addClass('focus')
        } else {
          $(ele).find('li').removeClass('focus').eq(index).next().addClass('focus')
        }
      }
      if (e.keyCode === 9) {
        $(this).find('li').removeClass('focus')
      }
    })
  }

  const closeSelect = () => {
    $('.' + dropdownSelectC8).on('hide.bs.dropdown', (e) => {
      $('.dropdown-select-c8, .dropdown-select-c8 li').removeClass('focus')
    })
  }

  const changeSelectC8 = () => {
    callSelectC8.change((e) => {
      callSelectC8.trigger('changeSelect')
    })
  }

  renderSelectToDropdown()
  clickSelect()
  // focusSelect()
  closeSelect()
  changeSelectC8()
  hoverLiRemoveClass()
  return {
    renderSelectToDropdown: renderSelectToDropdown,
    clickSelect: clickSelect,
    focusSelect: focusSelect,
    closeSelect: closeSelect,
    changeSelectC8: changeSelectC8
  }
})()
export default SelectC8

$(document).on('changeSelect', '.select-c8', function () {
  SelectC8.renderSelectToDropdown()
})
