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
    console.log('scrollElement is : ',element)
    // await client.touchScroll(100,0,element.ELEMENT); 控件没有实现这个方法
    // browser.touchDown(x, y)
    let rect = await client.getElementAttribute(element.ELEMENT, 'rect');
    // console.log('rect is : ',rect.x,' type is ',typeof rect)
    let rectJson = JSON.parse(rect);
    // console.log('rectJson is : ',rectJson.x,' type is ',typeof rectJson.x)
    let startX = rectJson.x + (rectJson.width/2);
    let startY = rectJson.y + (rectJson.height/2);
    let desX = startX+(rectJson.width/4*1);
    let desY = startY;
    // console.log('desX is : ',desX,' desY is : ',desY," type is: ",typeof desX)
    // await client.touchDown(rectJson.x,rectJson.y);
    // // browser.touchMove(x, y)
    // await client.touchMove(desX,desY);
    // // browser.touchUp(x, y)
    // await client.touchUp(desX,desY);
    let touchActionParams = [
      { action: 'press', x: startX, y: startY },
      { action: 'moveTo', x: desX, y: desY },
      { action:'wait', ms: 1000 },
      'release'
     ]
    // console.log('touchActionParams is : ',touchActionParams)
    await client.touchAction(touchActionParams);
    })
})
