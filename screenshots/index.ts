import * as puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ args: ['--ignore-certificate-errors'] });
    const page = await browser.newPage();

    // config - host/URL
    await page.goto('http://localhost:4200/');


    await page.waitForSelector('.done-weather');
    await page.waitForSelector('.done-zvv');
    await page.waitForSelector('.done-entsorgung');

    // config - screen resolution, dimensions
    await page.setViewport({ width: 1080, height: 1024 });

    // config - path to store image
    await page.screenshot({
        path: '/tmp/screenshot.png'
    });

    console.log('done');

    await browser.close();
})();