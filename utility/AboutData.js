import axios from 'axios';

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

// EXPORTED function to get all the data/stats for the About page ('/about')
// returns: object containing Wakatime Language stats
export const aboutData = async () => {
    const wakatimestats = await get_wakatimestats(); //fetching Wakatime Language stats

    // returns {stats}
    return {
        stats: wakatimestats,
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

    experiences: [
        {
            symbol: '明',
            name: 'HackCOVID 2.0',
            type: 'Hackathon',
            duration: 'May 2021 - July 2021',
            organisation: {
                name: 'HackerEarth',
                type: 'Remote',
            },
            link: {
                text: 'hackerearth.com/hackcovid2',
                url: 'https://www.hackerearth.com/challenges/hackathon/hackerearth-hackcovid-2/',
            },
            description:
                'An application that allows COVID19 affected individuals/families and their caregivers to easily avail themselves of multiple services/offerings by volunteers in their vicinity or across the country.',
            backend: {
                stack: ['JavaScript', 'NodeJs', 'Express', 'MongoDB', 'JWT', 'RazorPay'],
                work: [
                    'Designed the entire authentication system using JWT.',
                    'Implemented simple continuous deployment design which eased the team from deployment complexities, using Netlify and Heroku.',
                ],
            },
            frontend: {
                stack: ['JavaScript', 'ReactJs', 'SASS'],
                work: [
                    'Laid out the initial design of page routing and data flow through components making the team prepared for implementation.',
                    'Designed, fixed & ported website styles using SASS, providing a structured view helping with better readability.',
                ],
            },
        },

        {
            symbol: '命',
            name: 'cppsecrets.com',
            type: 'Internship',
            duration: 'October 2019 - December 2019',
            designation: {
                name: 'C++ Developer',
                type: 'Remote',
            },
            link: {
                text: 'cppsecrets.com/pritamhalder',
                url: 'https://cppsecrets.com/user/index.php?id=articles&uid=1377',
            },
            description:
                'Internship as a C++ developer, documenting and testing C++ Boost libraries. Organised and priortised work to complete assignments in a timely and efficient manner.',
            work: [
                'Documented & implemented C++ Boost libraries, more specifically Core libraries, adding to the largest documentation of C++ libraries.',
                'Accumulating over 4000+ views on all the articles present on the site authored by myself.',
            ],
        },
    ],

    achievements: [
        `Placed 2nd (2/1270) in StackHack 2.0 International Hackathon organised by HackerEarth.`,
        `Placed 5th (5/2818) in HackCOVID 2.0 International Hackathon organised by HackerEarth.`,
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
};
