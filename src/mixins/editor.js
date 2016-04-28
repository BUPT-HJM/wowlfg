function debounce (callback, delay) {
  var timer = null
  return function () {
    var context = this
    var args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      callback.apply(context, args)
    }, delay)
  }
}
function Editor (config) {
  var conf = config || {}
  if (!(this instanceof Editor)) {
    return new Editor(config)
  }
  this.target = conf.target
}
Editor.prototype.init = function () {
  var target = this.target
  var self = this
  target.on('input change', function () {
    self.responsive()
  })
  var resize = debounce(function () {
    self.responsive()
  }, 250)
  $(window).on('resize', resize)
}
Editor.prototype.responsive = function () {
  var target = this.target
  target.css({
    height: 'auto'
  })
  target.innerHeight(target[0].scrollHeight)
}
export default Editor
