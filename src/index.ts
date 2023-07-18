import puppeteer from 'puppeteer';
import { CalcProfileParams, calcProfileScore } from './calcs/calcProfileScore';

const user = 'Kami';

(async () => {
    const browser = await puppeteer.launch({
        headless: 'new',
        executablePath: '/usr/bin/google-chrome',
    });
    const page = await browser.newPage();

    await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
    );

    await page.goto(
        `https://www.leagueofgraphs.com/summoner/br/${user}#championsData-all`,
        {
            waitUntil: 'domcontentloaded',
        }
    );

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    const searchProfileRole = '#profileRoles .content td';

    const searchElo = '.leagueTier';
    const eloPlayer = await page.waitForSelector(searchElo);
    const elo = await eloPlayer?.evaluate(
        (el) => (el as HTMLElement).innerText
    );
    const tier = elo?.split(' ')[0];
    console.log(tier);

    const profilePlayer = await page.waitForSelector(searchProfileRole);

    const lane = await profilePlayer?.evaluate((el) => el.innerText);

    console.log(lane);
    profilePlayer?.click();

    const search2GraphSpider = '#graphDD5';

    await page.waitForNavigation({
        waitUntil: 'domcontentloaded',
    });

    const selectTeamfightParticipation = '#graphDD21';
    const teamfightParticipationField = await page.waitForSelector(
        selectTeamfightParticipation
    );

    const textTeamfightParticipation =
        await teamfightParticipationField?.evaluate(
            (element) => (element as HTMLElement).innerText
        );
    const replaceTextTeamfightParticipation =
        textTeamfightParticipation?.replace('%', '');

    const teamfightParticipation = parseFloat(
        replaceTextTeamfightParticipation
            ? replaceTextTeamfightParticipation
            : '0'
    );

    const selectGraphType = '#choiceContainerLinkspiderChartgraphDD6';
    const selectGraphField = await page.waitForSelector(selectGraphType);

    await selectGraphField?.evaluate((element) =>
        (element as HTMLElement).click()
    );

    const graph = await page.waitForSelector(search2GraphSpider);

    const text = await graph?.evaluate(
        (element) => (element as HTMLElement).innerText
    );

    console.log('text : ', text);

    const textInfos = text;

    const textSplited = textInfos?.split('\t')[0];
    const textSplitedT = textSplited ? textSplited.trim() : '';
    const textSplitedN = textSplitedT?.split('\n');

    const valuesObject = {
        lane,
        tier,
        teamfightParticipation,
    };

    for (const stat of textSplitedN) {
        const matchesValues = stat.match(/\((.*?)\)/);
        // console.log(matchesValues.input, matchesValues[1]);

        const keyText = matchesValues?.input
            ? matchesValues.input.split(' ')
            : [];
        const key = keyText ? keyText.shift() : '';
        Object.assign(valuesObject, {
            [key as string]: parseFloat(
                matchesValues && matchesValues[1]
                    ? (matchesValues[1]
                          .replace('%', '')
                          .replace(',', '') as string)
                    : ''
            ),
        });
        // console.log(valuesObject);
    }

    await page.close();

    const currentUrl = page.url();

    const pageVision = await browser.newPage();

    const urlVision = `${currentUrl}#visionData`;

    await pageVision.goto(urlVision, {
        waitUntil: 'domcontentloaded',
    });

    const searchVisionField = '.full-progress-bar.wgblue';

    const visionField = await pageVision.waitForSelector(searchVisionField);

    const textVision = await visionField?.evaluate(
        (element) => (element.nextSibling as HTMLElement).innerText
    );

    Object.assign(valuesObject, {
        vision: parseFloat(textVision ? textVision : '0'),
    });

    calcProfileScore(valuesObject as CalcProfileParams);
})();
