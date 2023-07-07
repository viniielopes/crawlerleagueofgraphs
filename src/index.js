const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.goto('https://www.leagueofgraphs.com/summoner/br/VEEEEEEEEEERMEES#championsData-all');

  // Set screen size
  await page.setViewport({width: 1080, height: 1024});


  const searchProfileRole = '#profileRoles .content td';

    const profilePlayer  = await page.$(searchProfileRole);

    profilePlayer.click()

    const searchGraphSpider = '#graphDD3';
    await page.waitForNavigation()

    const graph = await page.waitForSelector('#graphDD3')
    const text = await graph.evaluate((element)=>element.innerText)
    const graphSpider = await page.evaluate(()=>{
        return document.querySelector('#graphDD3')
    })

    console.log(
        text,
    )

  // Print the full title

})();
