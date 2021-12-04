import axios from 'axios';

// GQL Query : "Work Experiences" from CMS
const WORKEXPERIENCE = `
    query GetData {
        workExperiences {
            field
            type
            description
            company
        }
    }
`;

// GQL Query : "Achievements" from CMS
const EVENTS = `
    query GetData {
        achievements {
            achievement,
            period
        }
    }
`;

// GET (REST) "Hours Spent on every Language" from "wakatime.com" (in percent)
// uses: Basic Authorization (with Wakatime API key converted to base64 string)
// requires: Wakatime Personal API key
const get_wakatimestats = async () => {
    let data = await axios
        .get('https://wakatime.com/api/v1/users/current/stats/last_year', {
            headers: {
                // Basic Authorization
                // uses JS Buffer.from().toString('base64') for conversion to base64 from Wakatime API key
                Authorization: `Basic ${Buffer.from(process.env.WAKATIME_API_KEY).toString('base64')}`,
            },
        })
        .then(
            // only hours spent on every language of last year is required (in percent)
            res => res.data.data.languages
        );

    // filter those languages whose percentage of time spent is over 0.5%
    data = data.filter(l => l.percent > 0.5);

    // map to get only the language name (l.name) and percentage of time spent on that language (l.percent)
    data = data.map(l => ({ name: l.name, percent: l.percent }));

    // sort language stats in descending order of percentage of time spent
    data.sort((a, b) => {
        if (a.percent < b.percent) return 1;
        if (a.percent > b.percent) return -1;
        return 0;
    });

    return data;
};

// GET (GQL) "Work Experiences" from CMS
const get_workexperiences = async () => {
    const data = await axios
        .post(process.env.CMS, { query: WORKEXPERIENCE })
        .then(res => res.data.data.workExperiences);

    return data;
};

// GET (GQL) "Achievements" from CMS
const get_events = async () => {
    const data = await axios.post(process.env.CMS, { query: EVENTS }).then(res => res.data.data.achievements);

    let periodic_data = {};
    data.forEach(d => {
        const period = new Date(d.period);
        let M = period.getMonth();
        let MM = period.toLocaleString('default', { month: 'long' });
        let Y = period.getFullYear();
        let key = `${Y}-${M}-${MM}`;

        if (periodic_data[key] === undefined) {
            periodic_data[key] = new Array();
            periodic_data[key].push(d.achievement);
        } else {
            periodic_data[key].push(d.achievement);
        }
    });

    return periodic_data;
};

// EXPORTED function to get all the data/stats for the About page ('/about')
// returns: object containing Wakatime Language stats
export const aboutData = async () => {
    const wakatimestats = await get_wakatimestats(); //fetching Wakatime Language stats
    const workexperiences = await get_workexperiences(); // fetching Work Experiences
    const events = await get_events(); // fetching Events

    // returns {stats, works, events}
    return {
        stats: wakatimestats,
        works: workexperiences,
        events: events,
    };
};
