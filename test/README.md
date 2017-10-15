to debug test, run

```sh
./node_modules/.bin/karma start --no-single-run --browsers Chrome
```
then click debug and press F12 to launch Chrome Developer Tools

to run test in ci mode, run

```sh
npm run test:watch
```
Tests runs in headless Chromium downloaded by Puppeteer. 