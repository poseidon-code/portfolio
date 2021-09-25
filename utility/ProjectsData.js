import axios from 'axios';
import { formatCount } from './formatCount';

const PROJECTDATA = `
    query GetData {
        projects {
            id
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

const GITHUBREPOS = `
    query GetGithubRepos {
        user(login: "poseidon-code") {
            repositories(privacy: PUBLIC, first: 100, ownerAffiliations: OWNER) {
                nodes {
                    name
                    updatedAt
                    url
                    forkCount
                    stargazerCount
                }
            }
        }
    }
`;

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

const get_projects = async () => {
    const data = await axios.post('http://localhost:1337/graphql', { query: PROJECTDATA }).then((res) => res.data.data);

    return data;
};

const get_githubrepos = async () => {
    const data = await axios
        .post(
            'https://api.github.com/graphql',
            { query: GITHUBREPOS },
            { headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } }
        )
        .then((res) => res.data.data.user.repositories.nodes);

    data.sort((a, b) => {
        let ta = new Date(a.updatedAt).getTime();
        let tb = new Date(b.updatedAt).getTime();
        if (ta < tb) return 1;
        if (ta > tb) return -1;
        return 0;
    });

    const repos = data.map((r) => ({
        name: r.name,
        url: r.url,
        stars: formatCount(r.stargazerCount),
        forks: formatCount(r.forkCount),
    }));

    return repos;
};

const get_githubstats = async () => {
    const data = await axios
        .post(
            'https://api.github.com/graphql',
            { query: GITHUBSTATS },
            { headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } }
        )
        .then((res) => res.data.data.user.repositories);

    const total_repos = data.totalCount;
    const total_size = (data.totalDiskUsage / 1000).toFixed(1) + 'M';
    let total_forks = 0;
    let total_stars = 0;

    data.nodes.forEach((r) => {
        total_forks += r.forkCount;
        total_stars += r.stargazerCount;
    });

    const stats = {
        forks: formatCount(total_forks),
        size: total_size,
        stars: formatCount(total_stars),
        repos: formatCount(total_repos),
    };

    return stats;
};

const get_languages = async () => {
    const data = await axios
        .post(
            'https://api.github.com/graphql',
            { query: GITHUBLANGUAGES },
            { headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } }
        )
        .then((res) => res.data.data.user.repositories.nodes);

    let languages = [];
    data.forEach((r) => {
        r.languages.nodes.forEach((l) => {
            languages.push(l.name);
        });
    });
    const languages_used_count = languages.reduce((p, c) => (p[c] ? ++p[c] : (p[c] = 1), p), {});

    let languages_map = new Map();
    languages.forEach((l) => {
        const percent = parseFloat(((languages_used_count[l] / languages.length) * 100).toFixed(2));
        languages_map.set(l, percent);
    });

    const stats = Object.fromEntries(languages_map.entries());

    return stats;
};

const get = async () => {
    const projects = await get_projects();
    const githubrepos = await get_githubrepos();
    const githubstats = await get_githubstats();
    const languages = await get_languages();

    return {
        projects: projects,
        githubrepos: githubrepos,
        githubstats: githubstats,
        languages: languages,
    };
};

export const SYMBOLS = [
    '出',
    '長',
    '前',
    '道',
    '意',
    '和',
    '定',
    '思',
    '民',
    '明',
    '高',
    '雨',
    '気',
    '森',
    '東',
    '青',
    '海',
    '宮',
    '命',
    '聖',
];

export const projectData = async () => {
    const { projects, githubrepos, githubstats, languages } = await get();

    return {
        projects: projects.projects,
        opensourcecontributions: projects.openSourceContributions,
        repos: githubrepos,
        stats: githubstats,
        languages: languages,
    };
};
