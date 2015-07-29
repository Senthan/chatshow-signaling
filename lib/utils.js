var url     = require('url');
var request = require('request');

var config  = require('../lib/config');

function checkPremiumUser(email, callback) {
  var options = {
    uri: url.resolve(config.get('BACKEND_URL'), '/user/get-by-email'),
    method: 'POST',
    json: { "email": email }
  };
  request(options, function (error, response, body) {
    if (body.user) {
      var user = body.user;
      var activeUntil = user.active_until;
      var timestamp = new Date().getTime() / 1000;
      activeUntil = new Date(activeUntil).getTime() / 1000;
      callback(timestamp < activeUntil);
    } else {
      callback(false);
    }
  });
}

module.exports = {
  checkPremiumUser: checkPremiumUser
};
