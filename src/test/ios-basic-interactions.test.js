const webdriverio = require('webdriverio');
const iosOptions = require('../helpers/caps').iosOptions;
const app = require('../helpers/apps').iosTestApp;
const assert = require('chai').assert;

iosOptions.capabilities.app = app;

describe('Basic IOS interactions', function () {
  let client;

  beforeEach(async function () {
    client = await webdriverio.remote(iosOptions);
    // let status = await client.status();
    // console.log("12345: ",status)
  });

  afterEach(async function () {
    await client.deleteSession();
  });



  it('should send keys to inputs first', async function () {
    // const elementId = await client.findElement('accessibility id', 'IntegerA');
    let elementId = await client.findElement("xpath", '//XCUIElementTypeTextField[@name="IntegerA"]');
    console.log('test.findElement by xpath: ',elementId)
    const length = 2
    const inputvalue = 'Hello World!'.repeat(length);
    client.elementSendKeys(elementId.ELEMENT, inputvalue);

    const elementValue = await client.findElement('accessibility id', 'IntegerA');
    await client.getElementAttribute(elementValue.ELEMENT, 'value').then((attr) => {
      assert.equal(attr, inputvalue);
    });
  });

  it('should send keys to inputs sec', async function () {
    const elementId = await client.findElement('accessibility id', 'IntegerB');
    client.elementSendKeys(elementId.ELEMENT, '2');

    const elementValue = await client.findElement('accessibility id', 'IntegerB');
    await client.getElementAttribute(elementValue.ELEMENT, 'value').then((attr) => {
      assert.equal(attr, '2');
    });
  });

  it('add string number', async function () {
    const elementId1 = await client.findElement('accessibility id', 'IntegerA');
    client.elementSendKeys(elementId1.ELEMENT, '1');
    console.log('第1个值是：',elementId1)

    const elementId2 = await client.findElement('accessibility id', 'IntegerB');
    client.elementSendKeys(elementId2.ELEMENT, '1');
    console.log('第2个值是：',elementId2)

    const element = await client.findElement('accessibility id', 'ComputeSumButton');
    await client.elementClick(element.ELEMENT);

    const answerValue = await client.findElement('accessibility id', 'Answer');
    await client.getElementAttribute(answerValue.ELEMENT, 'value').then((attr) => {
      console.log('答案是：',attr)
      assert.equal(attr, '2');
    });
  });

   it('should click a button that opens an alert', async function () {
    const element = await client.findElement('accessibility id', 'show alert');
    await client.elementClick(element.ELEMENT);
    assert.equal(await client.getAlertText(), 'Cool title\nthis alert is so cool.');
  });
});
