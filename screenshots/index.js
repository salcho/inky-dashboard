"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer = __importStar(require("puppeteer"));
const canvas_1 = require("canvas");
const sleep = (millis) => new Promise(r => setTimeout(r, millis));
// poll every 3 seconds until host is up
function connectToHost(page) {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            try {
                yield page.goto('http://localhost:4200/');
                return;
            }
            catch (e) {
                yield sleep(3000);
            }
        }
    });
}
function screenshot(debug) {
    return __awaiter(this, void 0, void 0, function* () {
        let browser;
        if (debug) {
            browser = yield puppeteer.launch({ headless: false });
        }
        else {
            browser = yield puppeteer.launch();
        }
        try {
            console.log('Pulling latest');
            const page = yield browser.newPage();
            // config - screen resolution, dimensions
            yield page.setViewport({ width: 800, height: 480 });
            // config - URL
            yield connectToHost(page);
            yield page.waitForSelector('.done-weather');
            yield page.waitForSelector('.done-zvv');
            yield page.waitForSelector('.done-entsorgung');
            yield sleep(3000);
            console.log('Cheese!');
            // config - path to store image
            yield page.screenshot({
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
            const img = yield (0, canvas_1.loadImage)('/tmp/screenshot.png');
            const canvas = (0, canvas_1.createCanvas)(img.width, img.height);
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const dataUrl = canvas.toDataURL('image/png');
            console.log(dataUrl);
            if (!debug) {
                browser.close();
            }
            console.log('Done!');
        }
        catch (e) {
            console.log(`Error: ${e}`);
        }
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    const arg = process.argv.slice(2);
    yield screenshot(arg.length > 0 && arg[0] === '--debug');
}))();
