const webdriverio = require('webdriverio');
const iosOptions = require('../helpers/caps').iosOptions;
const app = require('../helpers/apps').iosTestApp;
const assert = require('chai').assert;

iosOptions.capabilities.app = app;

describe('Basic IOS interactions', function () {
  let client;

  beforeEach(async function () {
    client = await webdriverio.remote(iosOptions);
  });

  afterEach(async function () {
    await client.deleteSession();
  });

   it('should scroll a button', async function () {
    const element = await client.findElement('xpath', '//XCUIElementTypeSlider[@name="AppElem"]');
    await client.touchScroll(100,0,element.ELEMENT);
  });
});
