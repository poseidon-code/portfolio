import axios from 'axios';

const get_wakatimestats = async () => {
    let data = await axios
        .get('https://wakatime.com/api/v1/users/current/stats/last_year', {
            headers: {
                Authorization: `Basic ${Buffer.from(process.env.WAKATIME_API_KEY).toString('base64')}`,
            },
        })
        .then(res => res.data.data.languages);

    data = data.filter(l => l.percent > 0.5);
    data = data.map(l => ({ name: l.name, percent: l.percent }));
    data.sort((a, b) => {
        if (a.percent < b.percent) return 1;
        if (a.percent > b.percent) return -1;
        return 0;
    });

    return data;
};

export const aboutData = async () => {
    const wakatimestats = await get_wakatimestats();

    return {
        stats: wakatimestats,
    };
};
