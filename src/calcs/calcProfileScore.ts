export type CalcProfileParams = {
    lane: string;
    Kill: number;
    Gold: number;
    Creeps: number;
    Kills: number;
    Damage: number;
    vision: number;
    tier: string;
    teamfightParticipation: number;
};

const calcProfileScore = ({
    lane,
    Kill,
    // Gold,
    Creeps,
    Kills,
    Damage,
    vision,
    tier,
    teamfightParticipation,
}: CalcProfileParams) => {
    const elo: {
        [key: string]: number;
    } = {
        Challenger: 1,
        GrandMaster: 0.9,
        Master: 0.9,
        Diamond: 0.8,
        Platinum: 0.6,
        Gold: 0.55,
        Silver: 0.45,
        Bronze: 0.3,
        Iron: 0.2,
    };
    const weightTier = elo[tier] || 1;

    let farmLaner = 0;
    let vi2 = 0;
    let partLane = 0;
    let danoTop = 0;
    let notaTop = 0;

    if (lane == 'Top') {
        const mediaTotalFarm = 9;
        const mediaVision = 1.2;
        const mediaParticipation = 0.5;
        const mediaDanoMin = 700;

        farmLaner = (Creeps / mediaTotalFarm) * 100;
        vi2 = (vision / mediaVision) * 100;
        partLane = Kill / mediaParticipation;
        danoTop = (Damage / mediaDanoMin) * 100;
        notaTop = (farmLaner + vi2 + partLane + danoTop) / 4;
    }

    if (lane == 'Jungler') {
        const mediaTotalFarm = 6;
        const mediaVision = 1.2;
        const mediaParticipation = 0.7;
        const mediaDanoMin = 650;

        farmLaner = (Creeps / mediaTotalFarm) * 100;
        vi2 = (vision / mediaVision) * 100;
        partLane = Kill / mediaParticipation;
        danoTop = (Damage / mediaDanoMin) * 100;
        notaTop = (farmLaner + vi2 + partLane + danoTop) / 4;
    }

    if (lane == 'Mid') {
        const mediaTotalFarm = 9;
        const mediaVision = 1.2;
        const mediaParticipation = 0.6;
        const mediaDanoMin = 900;

        farmLaner = (Creeps / mediaTotalFarm) * 100;
        vi2 = (vision / mediaVision) * 100;
        partLane = Kill / mediaParticipation;
        danoTop = (Damage / mediaDanoMin) * 100;
        notaTop = (farmLaner + vi2 + partLane + danoTop) / 4;
    }

    if (lane == 'AD Carry') {
        const mediaTotalFarm = 9;
        const mediaVision = 1.2;
        const mediaParticipation = 0.5;
        const mediaDanoMin = 1000;

        farmLaner = (Creeps / mediaTotalFarm) * 100;
        vi2 = (vision / mediaVision) * 100;
        partLane = Kill / mediaParticipation;
        danoTop = (Damage / mediaDanoMin) * 100;
        notaTop = (farmLaner + vi2 + partLane + danoTop) / 4;
    }

    if (lane == 'Support') {
        const mediaTotalFarm = 95;
        const mediaVision = 2.8;
        const mediaParticipation = 0.6;
        const mediaKillsAssistMin = 0.7;

        farmLaner = (teamfightParticipation / mediaTotalFarm) * 100;
        vi2 = (vision / mediaVision) * 100;
        partLane = Kill / mediaParticipation;
        danoTop = (Kills / mediaKillsAssistMin) * 100;
    }

    farmLaner = farmLaner > 100 ? 100 : farmLaner;
    vi2 = vi2 > 100 ? 100 : vi2;
    partLane = partLane > 100 ? 100 : partLane;
    danoTop = danoTop > 100 ? 100 : danoTop;

    notaTop = (farmLaner + vi2 + partLane + danoTop) / 4;

    if (lane !== 'Support') {
        console.log('Farm', farmLaner > 100 ? 100 : farmLaner.toFixed(0));
        console.log('Ward/min', vi2 > 100 ? 100 : vi2.toFixed(0));
        console.log('Participação', partLane > 100 ? 100 : partLane.toFixed(0));
        console.log('Dano/Min', danoTop > 100 ? 100 : danoTop.toFixed(0));
        console.log(
            'Nota total',
            notaTop > 100 ? 100 : (notaTop * weightTier).toFixed(0)
        );
    }

    if (lane === 'Support') {
        console.log(
            'Participação em TF',
            farmLaner > 100 ? 100 : farmLaner.toFixed(0)
        );
        console.log('Ward/min', vi2 > 100 ? 100 : vi2.toFixed(0));
        console.log(
            'Participação em kills',
            partLane > 100 ? 100 : partLane.toFixed(0)
        );
        console.log(
            'Kill-Assist/Min',
            danoTop > 100 ? 100 : danoTop.toFixed(0)
        );
        console.log(
            'Nota total',
            notaTop > 100 ? 100 : (notaTop * weightTier).toFixed(0)
        );
    }

    return {
        farmLaner: farmLaner > 100 ? 100 : farmLaner.toFixed(0),
        vi2: vi2 > 100 ? 100 : vi2.toFixed(0),
        partLane: partLane > 100 ? 100 : partLane.toFixed(0),
        danoTop: danoTop > 100 ? 100 : danoTop.toFixed(0),
        notaTop: notaTop > 100 ? 100 : (notaTop * weightTier).toFixed(0),
    };
};

export { calcProfileScore };
