const puppeteer = require('puppeteer');
const calcProfileScore = require('./calcs/calcProfileScore');

const user = 'ehdhkwnjd 21';

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(
        `https://www.leagueofgraphs.com/summoner/br/${user}#championsData-all`
    );

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    const searchProfileRole = '#profileRoles .content td';

    const profilePlayer = await page.$(searchProfileRole);

    const lane = await profilePlayer.evaluate((el) => el.innerText);

    console.log(lane);
    profilePlayer.click();

    const searchGraphSpider = '#graphDD3';
    const search2GraphSpider = '#graphDD5';

    await page.waitForNavigation();

    const selectGraphType = '#choiceContainerLinkspiderChartgraphDD6';
    const selectGraphField = await page.waitForSelector(selectGraphType);

    await selectGraphField.evaluate((element) => element.click());
    // await selectGraphField.click();

    const graph = await page.waitForSelector(searchGraphSpider);

    const graph2 = await page.waitForSelector(search2GraphSpider);

    const text = await graph.evaluate((element) => element.innerText);
    const text2 = await graph2.evaluate((element) => element.innerText);

    console.log(text, text2);

    const textInfos = text ? text : text2;

    const textsplitedT = textInfos.split('\t')[0].trim();
    const textSplitedN = textsplitedT.split('\n');

    const valuesObject = {
        lane,
    };

    for (const stat of textSplitedN) {
        const matchesValues = stat.match(/\((.*?)\)/);
        // console.log(matchesValues.input, matchesValues[1]);

        const keyText = matchesValues.input.split(' ');
        const key = keyText.shift();
        Object.assign(valuesObject, {
            [key]: parseFloat(matchesValues[1].replace('%', '')),
        });
        // console.log(valuesObject);
    }

    await page.close();

    const currentUrl = page.url();

    const pageVision = await browser.newPage();

    const urlVision = `${currentUrl}#visionData`;

    await pageVision.goto(urlVision);

    const searchVisionField = '.full-progress-bar.wgblue';

    const visionField = await pageVision.waitForSelector(searchVisionField);

    const textVision = await visionField.evaluate(
        (element) => element.nextSibling.innerText
    );

    Object.assign(valuesObject, { vision: parseFloat(textVision) });
    console.log(valuesObject);
    calcProfileScore(valuesObject);
})();
