import axios from 'axios';
import { formatCount } from '.';

import * as Icon from '../components/UI/Icons';

// GET (REST) "Hours Spent" from "wakatime.com"
// uses: Basic Authorization (with Wakatime API key converted to base64 string)
// requires: Wakatime Personal API key
const get_hours = async () => {
    const data = await axios
        .get('https://wakatime.com/api/v1/users/poseidoncode/all_time_since_today', {
            headers: {
                // Basic Authorization
                // uses JS Buffer.from().toString('base64') for conversion to base64 from Wakatime API key
                Authorization: `Basic ${Buffer.from(process.env.WAKATIME_API_KEY).toString('base64')}`,
            },
        })
        .then(
            res =>
                // only hours spent of all time is required (in seconds)
                res.data.data.total_seconds
        );

    return data;
};

// GET (REST) "Visitors" count from "api.countapi.xyz/hit"
// uses: Base URL, endpoints & routes of website to get times that endpoint was visited
// requires: Base URL & endpoints
const get_visitors = async () => {
    // Base URLs
    /**
     * as one's domain name could change as many times as he wants,
     * so to not loose any previous visit counts this array should include new domain as well as previous domains
     * (unless the owner wishes to remove previous counts)
     */
    const SITES = ['pritamh.netlify.app'];

    // Endpoints
    /**
     * it is required to have a base endpoint (i.e. '/') always
     * as many endpoints could be included, avoiding any dynamic endpoints
     */
    const ROUTES = ['/', '/projects', '/about', '/blog'];

    // getcount() gets the number of visits to a URL passed
    // params: URL (string)
    // returns: a resolved promise with number of visits for a URL passed
    const getcount = url => {
        return new Promise((resolve, reject) => {
            axios.get(url).then(res => {
                // "value" is the number of counts that URL was visited
                resolve(res.data.value);
            });
        });
    };

    // getcounts ([Promises])
    let getcounts = [];
    /**
     * looping over every possible endpoints for api.countapi.xyz/hit/{endpoints}
     * and appending Promises (after calling getcounts()) for every endpoints
     */
    SITES.forEach(s => {
        ROUTES.forEach(r => {
            // appends Promise for every URL endpoints to getcounts[]
            getcounts.push(getcount(`https://api.countapi.xyz/hit/${s}${r}`));
        });
    });

    // resolve all Promises inside getcount[]
    /**
     * resolves all the Promises inside getcounts[] and saves the resolved data in place
     * then from the array of resolved Promises (here, counts), looping and adding all numbers to get final count
     * returns: summation of all counts
     */
    const data = await Promise.all(getcounts).then(counts => {
        // sum of every number in the counts[]
        return counts.reduce((a, b) => a + b, 0);
    });

    return data;
};

// GET (REST) "Github Repos"
// uses: Github REST API to fetch number of pubil repositories of a user
// requires: Github username
const get_repos = async () => {
    // Github Username
    const USERNAME = 'poseidon-code';

    // fetches the number of public github repositories for a Github user
    const data = await axios.get(`https://api.github.com/users/${USERNAME}`).then(
        res =>
            // only count of public repositories for the user is required
            res.data.public_repos
    );

    return data;
};

// EXPORTED function to get all the data/stats for the Homepage ('/')
// returns: object containing counts for "Hours Spent", "Visitors", "Github Repos" and "Frameworks"
// formatCount() is used for rounding values and suffixing their respective acronyms
export const homeData = async () => {
    const hours = await get_hours(); // fetching "Hours Spent"
    const visitors = await get_visitors(); // fetching "Visitors"
    const repos = await get_repos(); // fetching "Github Repos"

    const data = {
        hours: formatCount((hours / 3600).toFixed(1)), // getting in Hours format
        visitors: formatCount(visitors), // formatting number
        repos: formatCount(repos), // formating number
        frameworks: formatCount(16), // setting & formating "Frameworks"
    };

    // returns: {hours, visitors, repos, frameworks}
    return data;
};

export const homeDataStore = {
    introduction:
        'I am an aspiring software developer specialising in frontend and backend web technologies. I love to dabble with new and upcoming web technologies and provide solutions to real world problems. Currently, I am learning Go and its design principles with gRPC framework and GraphQL technologies.',

    projects: [
        {
            name: 'Portfolio',
            github: 'https://github.com/poseidon-code/portfolio',
            deploy: 'https://pritamh.netlify.app',
            description:
                'Personal portfolio website designed from scratch using NextJs and Strapi headless CMS to showcase my skills and projects for potential clients.',
            tech: ['NextJs', 'Strapi', 'SASS'],
        },
        {
            name: 'Identicon',
            github: 'https://github.com/poseidon-code/identicon',
            deploy: 'https://pkg.go.dev/github.com/poseidon-code/godenticon',
            description:
                'Cross-platform CLI program to generate identicons based on some string passed as argument and save as a PNG image. Basically, an unique image generator from hashes.',
            tech: ['Go'],
        },
        {
            name: 'ytmp3-dl',
            github: 'https://github.com/poseidon-code/ytmp3-dl',
            description:
                'A python script that uses yt-dlp to download the audio from any YouTube video/audio link concurrently and converts it to .mp3 format of high quality.',
            tech: ['Python', 'yt-dlp', 'FFmpeg'],
        },
        {
            name: 'Supacons',
            github: 'https://github.com/poseidon-code/supacons',
            deploy: 'https://supacons.netlify.app',
            description: 'Font Icons ripped from popular Font Awesome 6 icon pack, including all Pro icons.',
            tech: ['NextJs', 'CSS3'],
        },
        {
            name: 'Stories.io',
            github: 'https://github.com/poseidon-code/stories.io',
            deploy: 'https://storiesio.netlify.app',
            description: 'A short story telling webapp using WebSpeechAPI narration voices from the browser.',
            tech: ['ReactJs', 'SASS', 'WebSpeechAPI'],
        },
    ],

    skills: [
        'Python',
        'Golang',
        'JavaScript',
        'C/C++',
        'JAVA',
        'NextJs',
        'ReactJs',
        'NodeJs',
        'MongoDB',
        'MySQL',
        'Tensorflow',
        'Keras',
        'TypeScript',
        'Data Structures',
        'Algorithms',
        'GraphQL',
        'Express',
        'Selenium',
        'Redux',
        'Fullstack Web Development',
        'MERN Stack',
        'Git & Github',
        'NGINX',
        'Docker',
        'HTML5',
        'CSS3',
        'SASS',
    ],

    technologies: [
        { technology: 'ReactJs', text: 'Frontend JavaScript Library', icon: <Icon.ReactJs /> },
        { technology: 'NextJs', text: 'ReactJs Framework', icon: <Icon.NextJs /> },
        { technology: 'NodeJs', text: 'JavaScript Runtime', icon: <Icon.NodeJs /> },
        { technology: 'NGINX', text: 'JavaScript Web Server', icon: <Icon.Nginx /> },
        { technology: 'Docker', text: 'Containerization Platform', icon: <Icon.Docker /> },
        { technology: 'GraphQL', text: 'Data Query Language', icon: <Icon.GraphQL /> },
        { technology: 'MongoDB', text: 'NoSQL Database', icon: <Icon.MongoDB /> },
        { technology: 'MySQL', text: 'SQL Database', icon: <Icon.MySQL /> },
        { technology: 'Tensorflow', text: 'ML Framework', icon: <Icon.Tensorflow /> },
        { technology: 'Keras', text: 'ML Framework', icon: <Icon.Keras /> },
        { technology: 'Selenium', text: 'Automation Framework', icon: <Icon.Selenium /> },
        { technology: 'Redux', text: 'JavaScript State Manager', icon: <Icon.Redux /> },
        { technology: 'Firebase', text: 'Cloud Service Provider', icon: <Icon.Firebase /> },
        // { technology: 'AWS', text: 'Cloud Service Provider', icon: <Icon.Aws /> },
        // { technology: 'Azure', text: 'Cloud Service Provider', icon: <Icon.Azure /> },
        // { technology: 'Google Cloud Platform', text: 'Cloud Service Provider', icon: <Icon.GCP /> },
        { technology: 'Adobe After Effects', text: 'Motion Graphics Software', icon: <Icon.Ae /> },
        { technology: 'Adobe Photoshop', text: 'Image Manipulation Software', icon: <Icon.Ps /> },
        { technology: 'Bootstrap 5', text: 'CSS Framework', icon: <Icon.Bootstrap /> },
        { technology: 'Figma', text: 'UI/UX Prototyping Platform', icon: <Icon.Figma /> },
        { technology: 'Git & Github', text: 'Version Control', icon: <Icon.Git /> },
    ],

    about: [
        `I am a self taught developer. I have started my developer journey during early pandemic (2019), learning JavaScript, ReactJs and Python from online courses. 
        I am glad that I did that because it taught me programming that really affects and makes the real world of the internet.`,

        `I am currently a University student under Masters of Science in Computer Science in final year.
        I am passionate about all the modern web technologies and aspiring to be a software developer and a software designer.`,

        `Outside my field of study, I have interests in drawing, digital painting, reading, coding, programming, illustrations, linux ricing, virtual machines, cars, gaming and lots more.
        These little things keeps me motivated in my life.`,

        `Goal of my life is to do the job I love, which is programming, coding & designing softwares; because in that moment I would be at my best, always :)`,
    ],
};
