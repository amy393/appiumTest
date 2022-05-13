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

   it('should click a button that opens an alert', async function () {
    const element = await client.findElement('accessibility id', 'show alert');
    await client.elementClick(element.ELEMENT);
    assert.equal(await client.getAlertText(), 'Cool title\nthis alert is so cool.');
  });
});
