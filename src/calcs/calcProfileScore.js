const calcProfileScore = ({
    lane,
    Kill,
    Gold,
    Creeps,
    Kills,
    Damage,
    vision,
}) => {
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
        const mediaTotalFarm = 2;
        const mediaVision = 3;
        const mediaParticipation = 0.5;
        const mediaDanoMin = 300;

        farmLaner = (Creeps / mediaTotalFarm) * 100;
        vi2 = (vision / mediaVision) * 100;
        partLane = Kill / mediaParticipation;
        danoTop = (Damage / mediaDanoMin) * 100;
        notaTop = (farmLaner + vi2 + partLane + danoTop) / 4;
    }
    // return {
    //     farmLaner: farmLaner > 100 ? 100 : farmLaner,
    //     vi2: vi2 > 100 ? 100 : vi2,
    //     partLane: partLane > 100 ? 100 : partLane,
    //     danoTop: danoTop > 100 ? 100 : danoTop,
    //     notaTop: notaTop > 100 ? 100 : notaTop,
    // };

    console.log('Farm', parseInt(farmLaner > 100 ? 100 : farmLaner));
    console.log('Ward/min', parseInt(vi2 > 100 ? 100 : vi2));
    console.log('Participação', parseInt(partLane > 100 ? 100 : partLane));
    console.log('Dano/Min', parseInt(danoTop > 100 ? 100 : danoTop));
    console.log('Nota total', parseInt(notaTop > 100 ? 100 : notaTop));
};

module.exports = calcProfileScore;
