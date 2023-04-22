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
                console.log(e);
                yield sleep(3000);
            }
        }
    });
}
function screenshot() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Starting puppeteer pull...');
        // const browser = await puppeteer.launch({ headless: false });
        const browser = yield puppeteer.launch();
        try {
            console.log('Pulling latest');
            const page = yield browser.newPage();
            // config - screen resolution, dimensions
            yield page.setViewport({ width: 800, height: 480 });
            // config - URL
            yield connectToHost(page);
            console.log('Host is up - smile!');
            yield page.waitForSelector('.done-weather');
            yield page.waitForSelector('.done-zvv');
            yield page.waitForSelector('.done-entsorgung');
            // config - path to store image
            yield page.screenshot({
                path: '/tmp/screenshot.png'
            });
            // page.close();
            setTimeout(screenshot, 10000);
        }
        catch (e) {
            console.log(`Error: ${e}`);
        }
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    screenshot();
}))();
