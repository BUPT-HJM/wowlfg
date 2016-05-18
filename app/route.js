var express = require('express')
var router = express.Router()
var Wilddog = require('wilddog')

var ref = new Wilddog('https://lfg.wilddogio.com/')

router.get('/tips/:id', function(req, res, next) {
  var _id = req.params.id
  ref.child('tips').child(_id).once('value', function (snapshot) {
    var val = snapshot.val()
    if (val) {
      res.send(val)
    } else {
      res.send({
        status: 'error'
      })
    }
  })
})

module.exports = router;
