import Vue from 'vue'

function responsibility (value) {
  var result = ['输出', '治疗', '防御']
  return result[value - 1]
}

import {profession, activity, class_data, version} from './data'

function professionFilter (value) {
  var array = profession.concat()
  if (Array.isArray(value)) {
    var result = value.map(function (item, index) {
      return array[item]
    })
    return result.join()
  }
}

function activityType (value) {
  return activity[value]
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

function get_version (value) {
  for (var i = 0; i < version.length; i++) {
    if (value === version[i].type) {
      return version[i].val
    }
  }
  return null
}

Vue.filter('responsibility', function (value) {
  return responsibility(value)
})

Vue.filter('profession', function (value) {
  return professionFilter(value)
})

Vue.filter('class', function (value) {
  return get_class(value)
})

Vue.filter('contact', function (value) {
  return contactType(value)
})

Vue.filter('date', function (value) {
  return date(value)
})

Vue.filter('activity', function (value) {
  return activityType(value)
})

Vue.filter('version', function (value) {
  return get_version(value)
})
