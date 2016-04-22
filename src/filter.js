function responsibility (value) {
  var result = ['输出', '治疗', '防御']
  return result[value - 1]
}
import {profession} from './data'
function professionFilter (value) {
  var array = profession.concat()
  if (Array.isArray(value)) {
    var result = value.map(function (item, index) {
      return array[index]
    })
    return result.join()
  } else {
    return profession[0]
  }
}
function contactType (value) {
  var result = ''
  switch (value) {
    case 'qq':
      result = 'QQ'
      break
    case 'wechat':
      result = '微信'
      break
    case 'battle':
      result = '战网ID'
      break
  }
  return result
}
import {class_data} from './data'

function get_class (value) {
  var class_array = class_data.map(function (currentValue) {
    return currentValue.name
  })
  return class_array[value]
}

function date (value) {
  var date = new Date(value)
  var leftpad = function (val) {
    if (val < 10) {
      return '0' + val
    }
    return val
  }
  return date.getFullYear() + '.' + leftpad(date.getMonth() + 1) + '.' + leftpad(date.getDate())
}

var filter = function () {
  return {
    responsibility: responsibility,
    class: get_class,
    classArray: class_data,
    contactType: contactType,
    date: date,
    professionFilter: professionFilter
  }
}

export default filter
