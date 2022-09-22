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
            /**
             * temp ([{name, percent}])
             * only hours spent on every language of last year is required (in percent)
             * only languages ahaving time spent percentage greaer than 0.5 is chosen
             */
            res => {
                let temp = new Array();
                res.data.data.languages.forEach(l => {
                    if (l.percent > 0.5) {
                        temp.push({ name: l.name, percent: l.percent });
                    }
                });
                return temp;
            }
        );
    data.sort((a, b) => b.percent - a.percent);
    data.splice(10);

    /**
     * since percentage of time spent on top 10 languages will not add up to 100%
     * hence the percentages of time spent on each language should be adjusted like wise
     */
    const tp = data.reduce((p, c) => p + c.percent, 0);
    data.forEach(l => {
        l.percent = parseFloat(((l.percent / tp) * 100).toFixed(2));
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

export const aboutDataStore = {
    about: [
        `Hello ! I am Pritam Halder, a graduate student of Computer Science (Honors) and currently persuing Masters of Science in the same.`,

        `I'm a Kolkata based aspiring software engineer who specializes in building and designing fullstack products leading projects from research to implementation.`,

        `What's going on, you ask ? I am learning Go and its design principles with gRPC framework and GraphQL technologies.
        You can ask me about Go, ReactJs, NextJs, NodeJs, ExpressJs, MongoDB, JavaScript,
        TypeScript, GraphQL, Linux Customizations (Ricing) and just about life.`,

        `Outside my field of study, I have interests in drawing, digital painting, reading, coding, programming, illustrations, linux ricing, virtual machines, cars, gaming and lots more.
        These little things keeps me motivated in my life.`,
    ],

    softSkills: [
        `Efficient in working and adapting to new locations and with new teams.`,
        `Love for teaching and helping new teammates makes me confident with my skills.`,
        `Try to provide a good work culture helping in mutual understanding in a colaborative environment.`,
        `Posses open-mindedness and respect everyones opinion so as to it doesn't harms anyone.`,
        `Believe in consistency over bursts of inspirations and motivations.`,
        `Love to have a growth mindset and keep upgrading & adapting myself to new technologies.`,
    ],

    interests: [
        'Painting',
        'Digital Painting',
        'Programming',
        'Gaming Enthusiast',
        'Music',
        'Cars',
        'Linux Ricing',
        'Reading Novels',
        'Reading Research Papers',
        'Hackathons',
        'Server Geek',
        'Virtual Machines',
        'Wallpapers Hoarder',
        'Video Editing',
    ],

    education: [
        {
            symbol: '森',
            type: 'Post Graduation',
            domain: 'Master of Science - Computer Science',
            name: 'WEST BENGAL STATE UNIVERSITY',
            board: 'West Bengal State University (WBSU)',
            periods: [{ time: 'September 2021 - Ongoing', location: 'WBSU, Barasat, West Bengal' }],
            graduation: 'August 2023',
            subject: 'Computer Science',
            score: 'TBD',
        },

        {
            symbol: '海',
            type: 'Graduation',
            domain: 'Bachelor of Science - Computer Science (Honors)',
            name: 'ACHARYA PRAFULLA CHANDRA COLLEGE',
            board: 'West Bengal State University (WBSU)',
            periods: [{ time: 'August 2018 - August 2021', location: 'APC College, Madhyamgram, West Bengal' }],
            graduation: 'August 2021',
            subject: 'Computer Science (Honors)',
            score: '8.83 CGPA',
        },

        {
            symbol: '定',
            type: 'School',
            domain: 'Primary, Secondary & Senior Secondary',
            name: 'KENDRIYA VIDYALAYA',
            board: 'Central Board of Secondary Education (CBSE)',
            periods: [
                { time: 'April 2005 - March 2008', location: 'KV Mathura Cantonment, UP' },
                { time: 'April 2008 - March 2010', location: 'KV (Air Force Station) Naliya, Gujarat' },
                { time: 'April 2010 - March 2018', location: 'KV (Air Force Station) Barrackpore, West Bengal' },
            ],
            graduation: 'May 2018',
            subject: 'Physics - Chemistry - Mathematics - Computer Science',
            score: '72.3%',
        },
    ],
};
