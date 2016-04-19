import ref from '../ref'
function Auth () {
  this.auth = ref.getAuth()
}
Auth.prototype.done = function (callback) {
  if (this.auth) {
    callback()
  }
  return this
}
Auth.prototype.fail = function (callback) {
  if (!this.auth) {
    callback()
  }
  return this
}
export default new Auth()
