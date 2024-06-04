import axios from 'axios';

import { formatCount } from '.';

const projectDataStore = {
    projects: [
        {
            id: '6134dbf455bb422ff4fbc077',
            aid: 1,
            name: 'Portfolio',
            description:
                'This is my personal portfolio repository made with NextJs & Strapi. I am an aspiring software developer specialising in frontend and backend web technologies. I love to dabble with new and upcoming web technologies and provide solutions to real world problems.',
            technologies: ['NextJs', 'SASS', 'GraphQL'],
            links: {
                github: 'https://github.com/poseidon-code/portfolio',
                website: 'https://pritamh.netlify.app',
            },
        },
        {
            id: '63048c5c0da1640016347040',
            aid: 2,
            name: 'Identicon',
            description:
                'Cross-platform CLI program to generate identicons based on some string passed as arguments and save as a PNG image. Made with Go with Zero 3rd party dependencies.',
            technologies: ['Go'],
            links: {
                github: 'https://github.com/poseidon-code/identicon',
                website: 'https://pkg.go.dev/github.com/poseidon-code/godenticon',
            },
        },
        {
            id: '6134e71155bb422ff4fbc07e',
            aid: 3,
            name: 'ytmp3-dl',
            description:
                'Python command line script for multi-threaded download of high quality audio (in .mp3) from any YouTube video/audio link.',
            technologies: ['Python', 'YouTubeDL', 'FFmpeg'],
            links: {
                github: 'https://github.com/poseidon-code/ytmp3-dl',
            },
        },
        {
            id: '6134e07d55bb422ff4fbc079',
            aid: 4,
            name: 'Supacons',
            description:
                'Font Icons ripped from popular Font Awesome 6 icon pack including all Pro icons, available as hosted CSS & font files ! Made with NextJs.',
            technologies: ['NextJs', 'CSS3', 'SASS'],
            links: { github: 'https://github.com/poseidon-code/supacons', website: 'https://supacons.netlify.app/' },
        },
        {
            id: '6134e82955bb422ff4fbc07f',
            aid: 5,
            name: 'YouTube Viewbot',
            description:
                'A program to increase YouTube video views. Can also be used for running multiple instances of a website using different proxies. Made in Python using Selenium automation framework.',
            technologies: ['Python', 'Selenium'],
            links: {
                github: 'https://github.com/poseidon-code/youtube-viewbot',
            },
        },
        {
            id: '6134e1bc55bb422ff4fbc07a',
            aid: 6,
            name: 'Stories.io',
            description:
                'Website that uses Web Speech API to read a short story fetched from a database of many short stories using RESTful APIs. Made with ReactJs and TailwindCSS.',
            technologies: ['ReactJs', 'TailwindCSS', 'WebSpeechAPI'],
            links: { github: 'https://github.com/poseidon-code/stories.io', website: 'https://storiesio.netlify.app' },
        },
        {
            id: '6134e55555bb422ff4fbc07d',
            aid: 7,
            name: 'Short Stories API',
            description:
                'A public RESTful API server that sends a random short story. Made with JavaScript using ExpressJs & MongoDB and running on NodeJs.',
            technologies: ['Javascript', 'ExpressJs', 'MongoDB', 'NodeJs'],
            links: {
                github: 'https://github.com/poseidon-code/shortstories-api',
                website: 'https://shortstories-api.herokuapp.com',
            },
        },
        {
            id: '63048da70da1640016347041',
            aid: 8,
            name: 'NeetCode Solutions',
            description:
                "C++, Go, Python and Java Solutions for problems in NeetCode's important data structures & algorithms list.",
            technologies: ['C++', 'Go', 'Python', 'Java'],
            links: {
                github: 'https://github.com/poseidon-code/NeetCode-Solutions',
                website: 'https://neetcode.io',
            },
        },
        {
            id: '613f174fa7124b390cc51828',
            aid: 9,
            name: 'Interview Room Solutions',
            description:
                'InterviewRoom solutions, taken from all over the internet, and those are among the best complexity solutions by top coders from competitive programming field.',
            technologies: ['C++', 'Go', 'Python', 'Java'],
            links: {
                github: 'https://github.com/poseidon-code/InterviewRoom',
            },
        },
        {
            id: '6134dece55bb422ff4fbc078',
            aid: 10,
            name: 'Github Profile',
            description:
                'A Github README profile for visitors coming to my github account, to know about my passion and skills. Made with Markdown.',
            technologies: ['Markdown', 'GIFs'],
            links: { github: 'https://github.com/poseidon-code' },
        },
    ],

    openSourceContributions: [
        {
            id: '6134ec083f2c051a5402c865',
            name: 'Human Resource Management',
            description:
                'Hackathon 2020 (by HackerEarth) - 1st Runner Up\n' +
                'A website for companies to manage their human resource (employees). Functionalities include - login/registration portals, registering new employee, registering new admin, view statuses of all employees, request paid leaves from employee dashboard, managers can accept/reject leave requests, email based notification system for employees and many more. Made with vanilla HTML5, CSS3 Javascript and NodeJs.',
            technologies: ['Javascript', 'NodeJs', 'ExpressJs', 'MongoDB', 'EJS', 'CSS', 'PassportJs'],
            links: { github: 'https://github.com/jit48/Human-Resource-Management' },
        },
        {
            id: '6134ef733f2c051a5402c866',
            name: 'CoviConnect',
            description:
                'Hackathon 2021 - StackHack2.0 (by HackerEarth) - 4th Position.\n' +
                "A platform for volunteers, NGOs and general public to connect needy people with volunteers and NGOs for proper care of COVID patients. Volunteers can register themselves and create/delete/update updates to the public about available COVID services in their regions. They can also join a NGO by filling up an application. NGOs can register their own organsiations and post updates of adoption facilities for pets and children. NGOs can accept/reject volunteer applications which sends an email notification to volunteers' registered email. Made with ReactJs Javascript library.",
            technologies: ['ReactJs', 'SASS', 'REST API', 'MongoDB', 'ExpressJs', 'JWT'],
            links: {
                github: 'https://github.com/poseidon-code/CoviConnect',
                website: 'https://coviconnect.netlify.app',
            },
        },
    ],
};

// GQL Query : Publicly Owned Repositories from Github
const GITHUBREPOS = `
    query GetGithubRepos {
        user(login: "poseidon-code") {
            repositories(privacy: PUBLIC, first: 100, ownerAffiliations: OWNER) {
                nodes {
                    name
                    pushedAt
                    url
                    forkCount
                    stargazerCount
                }
            }
        }
    }
`;

// GQL Query : Some Repositories Stats from Github
const GITHUBSTATS = `
    query GetGithubStats {
        user(login: "poseidon-code") {
            repositories(first: 100) {
                totalCount
                totalDiskUsage
                nodes {
                    forkCount
                    stargazerCount
                }
            }
        }
    }
`;

// GQL Query : Programming Languages used in every repositories from Github
const GITHUBLANGUAGES = `
    query GetLanguages {
        user(login: "poseidon-code") {
            repositories(first: 100) {
                nodes {
                    languages(first: 100) {
                        nodes {
                            name
                            color
                        }
                    }
                }
            }
        }
    }
`;

// GET (GQL) "Projects" and "Open Source Contributions" from CMS
const get_projects = async () => {
    const data = projectDataStore;
    data.projects.sort((a, b) => a.aid - b.aid);

    return data;
};

// GET (GQL) Publicly owned Github repositories
// uses: Bearer Token Authorization
// requires: Github Personal Acess token with "repo" access
const get_githubrepos = async () => {
    const data = await axios
        .post(
            'https://api.github.com/graphql',
            { query: GITHUBREPOS },
            { headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } }
        )
        .then(
            res =>
                // only array of all repositories is required
                res.data.data.user.repositories.nodes
        );

    // sort repositories according to the time it was last updated in descending order
    // using "pushedAt" property of every repository object
    // i.e.: shows recently updated first
    data.sort((a, b) => {
        let ta = new Date(a.pushedAt).getTime();
        let tb = new Date(b.pushedAt).getTime();
        return tb - ta;
    });

    // repos ([{name, url, stars, forks}])
    // reformat every repository object with new property names
    const repos = data.map(r => ({
        name: r.name,
        url: r.url,
        stars: formatCount(r.stargazerCount), // formatting total number of stars
        forks: formatCount(r.forkCount), // formatting total number of forkers
    }));

    return repos;
};

// GET (GQL) Github repositories stats
// uses: Bearer Token Authorization
// requires: Github Personal Acess token with "repo" access
const get_githubstats = async () => {
    const data = await axios
        .post(
            'https://api.github.com/graphql',
            { query: GITHUBSTATS },
            { headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } }
        )
        .then(
            res =>
                // only repositories is required
                res.data.data.user.repositories
        );

    const total_repos = data.totalCount; // total number of repositories (private + public)
    const total_size = (data.totalDiskUsage / 1000).toFixed(1) + 'M'; // total disk usage formatted to 'Megabytes (M)'
    let total_forks = 0;
    let total_stars = 0;

    // looping and counting total number of forkers and stars for every repository
    data.nodes.forEach(r => {
        total_forks += r.forkCount;
        total_stars += r.stargazerCount;
    });

    // stats ({forks, size, stars, repos})
    const stats = {
        size: total_size,
        forks: formatCount(total_forks), // formatting total number of forkers
        stars: formatCount(total_stars), // formatting total number of stars
        repos: formatCount(total_repos), // formatting total number of repositories
    };

    return stats;
};

// GET (GQL) Programming languages used in every Github repositories
// uses: Bearer Token Authorization
// requires: Github Personal Acess token with "repo" access
const get_languages = async () => {
    const data = await axios
        .post(
            'https://api.github.com/graphql',
            { query: GITHUBLANGUAGES },
            { headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } }
        )
        .then(
            res =>
                // only array of all repositories is required
                res.data.data.user.repositories.nodes
        );

    /**
     * languages ([string])
     * looping over all languages used in a single repository for every repositories and
     * appending "name" of that programming language to languages[]
     */
    let languages = new Array();
    data.forEach(r => {
        r.languages.nodes.forEach(l => {
            languages.push(l.name);
        });
    });

    /**
     * languages_used_count ({name: count, ...})
     * counts the duplicate programming languages "name" inside languages[]
     * and creates an Object with {<name> : <number of time that name occurred>, ...}
     * i.e.: counts - what languages are used & how many times they are used, throughout github repositories (languages[])
     */
    const languages_used_count = languages.reduce((p, c) => (p[c] ? ++p[c] : (p[c] = 1), p), {});

    /**
     * languages_array ([{language, percentage}])
     * counts the percentage of a unique language being used
     * to the overall languages used (languages.length) throughout all repositories
     */
    let languages_array = new Array();
    for (let l in languages_used_count) {
        const p = parseFloat(((languages_used_count[l] / languages.length) * 100).toFixed(2));
        languages_array.push({ language: l, percentage: p });
    }
    languages_array.sort((a, b) => b.percentage - a.percentage);
    languages_array.splice(10);

    /**
     * since percentage of top 10 languages will not add up to 100%
     * hence the percentages of each language should be adjusted like wise
     */
    const tp = languages_array.reduce((p, c) => p + c.percentage, 0);
    languages_array.forEach(l => {
        l.percentage = parseFloat(((l.percentage / tp) * 100).toFixed(2));
    });

    return languages_array;
};

// EXPORTED function to get all the data/stats for the Projects page ('/projects')
// returns: object containing Projects & Open Source Contributions data & Github repositories stats
export const projectData = async () => {
    const projects = await get_projects(); // fetching Projects & Open Source Contributions
    const githubrepos = await get_githubrepos(); // fetching Publicly Owned Github Repositories
    const githubstats = await get_githubstats(); // fetching Github Repositories stats
    const languages = await get_languages(); // fetching Programming Languages used throughout Github repositories

    // returns: {projects, osc, repos, stats, languages}
    return {
        projects: projects.projects,
        osc: projects.openSourceContributions,
        repos: githubrepos,
        stats: githubstats,
        languages: languages,
    };
};
