import * as puppeteer from 'puppeteer';
import { Page } from 'puppeteer';

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

async function screenshot() {
    // const browser = await puppeteer.launch({ headless: false });
    const browser = await puppeteer.launch();

    try {
        console.log('Pulling latest');

        const page = await browser.newPage();

        // config - screen resolution, dimensions
        await page.setViewport({ width: 800, height: 480 });
        // config - URL
        await connectToHost(page);
        console.log('Cheese!');

        await page.waitForSelector('.done-weather');
        await page.waitForSelector('.done-zvv');
        await page.waitForSelector('.done-entsorgung');

        // config - path to store image
        await page.screenshot({
            path: '/tmp/screenshot.png'
        });

        setTimeout(screenshot, 30000);
    } catch (e) {
        console.log(`Error: ${e}`);
    }
}

(async () => {
    screenshot();
})();