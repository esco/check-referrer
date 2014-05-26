check-referrer
==============

middleware for routing requests based on referrer

```
npm install check-referrer
```

###checkReferrer

**Params**:
*   rules _String_

    list of routing rules
    * _-_ means exclude from redirect
    * _+_ means only exclude from redirect

*   redirect _String_

    route for redirect

req.fromAllowedReferrer will be set to true for whitelisted referrers

examples
========

By default, all requests are redirected.

To exclude urls from redirection use '-'

```javascript
// Only allow requests from example.com
var checkReferrer = require('check-referrer');
app.use(checkReferrer('-example.com', '/redirect-here'));

// req.fromAllowedReferrer will be set to true in all middleware that runs after
```

To redirect only specific urls while allowing all others, use '+'

```javascript
// Only redirect requests from example.com
var checkReferrer = require('check-referrer');
app.use(checkReferrer('+example.com', '/redirect-here'));
```

Seperate rules with a comma

```javascript
// Only allow requests from certain domains
var checkReferrer = require('check-referrer');
app.use(checkReferrer('-example.com,-mysite.com,-othersite.com', '/redirect-here'));
```

The rule doesn't have to be a url

```javascript
// Only allow visitors with a secret referrer key
var checkReferrer = require('check-referrer');
app.use(checkReferrer('-my_secret_key', '/redirect-here'));
```

caveats
=======
This is "security" by obscurity, similar to passwords. If somone knows your password, then its useless. Likewise, if the visitor knows which referrers are allowed, they can easily spoof their referrer.