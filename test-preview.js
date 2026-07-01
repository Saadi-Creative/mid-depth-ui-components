const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
  page.on('requestfailed', req => console.log('REQ FAILED:', req.url(), req.failure().errorText));

  console.log("Navigating to http://localhost:3000/preview/02");
  await page.goto('http://localhost:3000/preview/02', { waitUntil: 'networkidle0' });
  
  const content = await page.content();
  console.log("Body length:", content.length);
  
  await browser.close();
})();
