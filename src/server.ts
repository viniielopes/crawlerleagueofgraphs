require('dotenv').config();
import express from 'express';
import qs from 'qs';
import { scrapSummonerInfos } from './index';
import cors from 'cors';

type GetSummonerInfoQuery = {
    search: string;
};

const app = express();

const PORT = process.env.PORT;

app.use(cors());

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
    console.log('retornei o', infos);
});

app.get('/teste', (_, res) => {
    res.send('deu bom ta rodando');
});

app.listen(PORT, () => console.log(`rodou na ${PORT}`));
