madtimber.com
=============

madtimber.com website

#### Mail Setup
You'll need a file named `mail-config.js` in the same folder as `app.js` with the contents:
```
module.exports = {
    service: 'Gmail',  // or whatever service you're using
    auth: {
        user: '<your email>',
        pass: '<your password>'
    }
};
```


