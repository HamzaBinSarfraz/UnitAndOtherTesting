'use strict'
const puppeteer = require('puppeteer');
const { generateText, generateAndTest } = require('./util');

test('should output name and age', () => {
    const text = generateText('Max', 25);
    expect(text).toBe('Max (25 years old)');
});

test('should output data-less text', () => {
    const text = generateText('', null);
    expect(text).toBe(' (null years old)');
});


test('should pass for valid input', () => {
    const text = generateAndTest('Max', 25);
    expect(text).toBe('Max (25 years old)');
})

test('browser testing with some element and unint test', async () => {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 80,
        args: ['--window-size=1920, 1080']
    });
    const page = await browser.newPage();
    await page.goto('file:///home/john/Desktop/js-testing-introduction/index.html');

    await page.click('input#name');
    await page.type('input#name', 'Dude');
    await page.click('input#age');
    await page.type('input#age', '29');
    await page.click('#btnAddUser');
    const finalText = await page.$eval('.user-item', el => el.textContent);
    expect(finalText).toBe('Dude (29 years old)');
})
