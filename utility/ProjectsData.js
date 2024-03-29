import axios from 'axios';

import { formatCount } from '.';

// GQL Query : "Projects" and "Open Source Contributions" from CMS
const PROJECTDATA = `
    query GetData {
        projects {
            id
            aid
            name
            description
            technologies
            links
        },
        openSourceContributions {
            id
            name
            description
            technologies
            links
        }
    }
`;

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
    const data = await axios.post(process.env.CMS, { query: PROJECTDATA }).then(res => res.data.data);
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
