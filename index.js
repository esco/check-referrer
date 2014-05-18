module.exports = function(_rules, _redirect) {
  var rules;
  var blacklist = [];
  var whitelist = [];

  function parseRules(_rules) {
    var rules = _rules.split(',');

    if (_rules.search(/\+/) === -1 && _rules.search('-*,') === -1) {
      blacklist.push(/.*/);
    }

    rules.forEach(function(rule){
      if (rule.search(/\-/) === 0) {
        whitelist.push(new RegExp(rule.replace('-', '')));
      } else if (rule.search(/\+/) === 0) {
        blacklist.push(new RegExp(rule.replace('+', '')));
      }
    });
  }

  function redirect(res) {
    return res.redirect(_redirect);
  }

  function checkReferrer(req, res, next){
    var referrer;
    var blacklisted;
    var whitelisted;

    if (req.path === _redirect) {
      return next();
    }

    referrer = req.header('Referrer');

    if (!referrer) {
      return redirect(res);
    }

    whitelisted = whitelist.some(function(pattern){
      return pattern.test(referrer);
    });

    if (whitelisted) {
      return next();
    }

    blacklisted = blacklist.some(function(pattern){
      return pattern.test(referrer);
    });

    if (blacklisted) {
      return redirect(res);
    }

    next();
  }

  parseRules(_rules);
  return checkReferrer;
}