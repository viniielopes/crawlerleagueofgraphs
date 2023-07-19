import express from 'express';
import qs from 'qs';
import { scrapSummonerInfos } from './index';

type GetSummonerInfoQuery = {
    search: string;
};

const app = express();

app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
    console.log(req.query);
    console.log(qs.parse(req.query as GetSummonerInfoQuery));
    // const { search } = req.query;
    const query = qs.parse(req.query as GetSummonerInfoQuery);
    console.log(query);
    const infos = await scrapSummonerInfos(
        (query as GetSummonerInfoQuery).search
    );
    res.send(JSON.stringify(infos));
});

app.listen(3000, () => console.log('rodou na 3000'));
