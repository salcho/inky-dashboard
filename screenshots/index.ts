import * as puppeteer from 'puppeteer';
import { Page } from 'puppeteer';
import { createCanvas, loadImage } from 'canvas';

const sleep = (millis: number) => new Promise(r => setTimeout(r, millis));

// poll every 3 seconds until host is up
async function connectToHost(page: Page) {
    while (true) {
        try {
            await page.goto('http://localhost:4200/');
            return;
        } catch (e) {
            await sleep(3000);
        }
    }
}

async function screenshot(debug: boolean) {
    let browser;
    if (debug) {
        browser = await puppeteer.launch({ headless: false });
    } else {
        browser = await puppeteer.launch();
    }

    try {
        console.log('Pulling latest');

        const page = await browser.newPage();

        // config - screen resolution, dimensions
        await page.setViewport({ width: 800, height: 480 });
        // config - URL
        await connectToHost(page);

        await page.waitForSelector('.done-weather');
        await page.waitForSelector('.done-zvv');
        await page.waitForSelector('.done-entsorgung');

        await sleep(3000);

        console.log('Cheese!');
        // config - path to store image
        await page.screenshot({
            // type: 'jpeg',
            omitBackground: true,
            path: '/tmp/screenshot.png',
            clip: {
                x: 0,
                y: 0,
                width: 800,
                height: 480,
            }
        });

        // turn the PNG into a data URL so we can upload it anywhere
        const img = await loadImage('/tmp/screenshot.png');
        const canvas = createCanvas(img.width, img.height);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(img, 0, 0);

        const dataUrl = canvas.toDataURL('image/png');

        console.log(dataUrl);

        if (!debug) {
            browser.close();
        }

        console.log('Done!');
    } catch (e) {
        console.log(`Error: ${e}`);
    }
}

(async () => {
    const arg = process.argv.slice(2);
    await screenshot(arg.length > 0 && arg[0] === '--debug');
})();