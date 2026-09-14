import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  const fonts = await page.evaluate(() => {
    const getFont = (selector) => {
      const el = document.querySelector(selector);
      return el ? window.getComputedStyle(el).fontFamily : 'not found';
    };
    
    return {
      aboutEyebrow: getFont('[data-about-subtitle]'),
      contactEyebrow: getFont('[data-header="subtitle"]'),
      worksEyebrow: getFont('#work span.font-mono')
    };
  });
  
  console.log(JSON.stringify(fonts, null, 2));
  await browser.close();
})();
