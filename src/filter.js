function responsibility (value) {
  var result = ['输出', '治疗', '防御']
  return result[value - 1]
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
function class_data () {
  var array = [
    {
      'name': '战士',
      'type': [1, 3],
      'color': '#C79C6E'
    },
    {
      'name': '圣骑士',
      'type': [1, 2, 3],
      'color': '#F58CBA'
    },
    {
      'name': '死亡骑士',
      'type': [1, 3],
      'color': '#C41F3B'
    },
    {
      'name': '猎人',
      'type': [1],
      'color': '#ABD473'
    },
    {
      'name': '萨满',
      'type': [1, 2],
      'color': '#0070DE'
    },
    {
      'name': '德鲁伊',
      'type': [1, 2, 3],
      'color': '#FF7D0A'
    },
    {
      'name': '盗贼',
      'type': [1],
      'color': '#FFF569'
    },
    {
      'name': '武僧',
      'type': [1, 2, 3],
      'color': '#00FF96'
    },
    {
      'name': '法师',
      'type': [1],
      'color': '#69CCF0'
    },
    {
      'name': '牧师',
      'type': [1, 2],
      'color': '#FFFFFF'
    },
    {
      'name': '术士',
      'type': [1],
      'color': '#9482C9'
    }
  ]
  return array
}
function get_class (value) {
  var class_array = class_data().map(function (currentValue) {
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
    classArray: class_data(),
    contactType: contactType,
    date: date
  }
}

export default filter
