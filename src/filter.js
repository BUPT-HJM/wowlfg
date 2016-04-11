function responsibility (value) {
  var result = ''
  switch (value) {
    case 1:
      result = '输出'
      break
    case 2:
      result = '治疗'
      break
    case 3:
      result = '防御'
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
  var class_array = class_data().map(function (currentValue, index) {
    return currentValue[index].name
  })
  return class_array[value]
}

var filter = function () {
  return {
    responsibility: responsibility,
    class: get_class,
    classArray: class_data()
  }
}

export default filter
