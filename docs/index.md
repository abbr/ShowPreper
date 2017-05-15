---
---

# About
WYSIWYG editor for [Impress.js]((https://github.com/impress/impress.js)) and [Bespoke.js](http://markdalgleish.com/projects/bespoke.js/).

# Online Access
For the impatient, full feature of ShowPreper can be accessed free [online](https://showpreper.herokuapp.com/).

# Installation

### Prerequisites

* node@>=4.2.4
* npm@>=3.5.3

### Development
```
git clone https://github.com/abbr/ShowPreper.git
cd ShowPreper
npm install
node .
```

### Production
```
git clone https://github.com/abbr/ShowPreper.git
cd ShowPreper
npm install
npm run dist
```
Then deploy `/dist` folder to a web server such as Nginx. ShowPreper runs fully on client-side so there is no minimum server requirements other than serving static files.

# Acknowledgements
ShowPreper is built on many FOSS components. Special thanks go to

* [Strut](http://strut.io/) for inspiration. In many ways ShowPreper can be considered as a re-write of Strut.
* [Impress.js](https://github.com/impress/impress.js) and [Bespoke.js](http://markdalgleish.com/projects/bespoke.js/) for rendering.
* [React](https://facebook.github.io/react/) as application platform.
* [Heroku](https://dashboard.heroku.com/) for free hosting.

# License
The MIT License (MIT)

Copyright (c) 2017 @abbr

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
