import formatCount from './formatCount';

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
    const projects = await fetch('http://localhost:1337/graphql', {
        method: 'POST',
        body: JSON.stringify({ query: PROJECTDATA }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then((data) => data.data);

    return projects;
};

const get_githubrepos = async () => {
    const data = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        body: JSON.stringify({ query: GITHUBREPOS }),
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
    })
        .then((res) => res.json())
        .then((data) => data.data);

    data.user.repositories.nodes.sort((a, b) => {
        let ta = new Date(a.updatedAt).getTime();
        let tb = new Date(b.updatedAt).getTime();
        if (ta < tb) return 1;
        if (ta > tb) return -1;
        return 0;
    });

    const repos = data.user.repositories.nodes.map((r) => {
        return {
            name: r.name,
            url: r.url,
            stars: formatCount(r.stargazerCount),
            forks: formatCount(r.forkCount),
        };
    });

    return repos;
};

const get_githubstats = async () => {
    const data = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        body: JSON.stringify({ query: GITHUBSTATS }),
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
    })
        .then((res) => res.json())
        .then((data) => data.data);

    const total_repos = data.user.repositories.totalCount;
    const total_size = (data.user.repositories.totalDiskUsage / 1000).toFixed(1) + 'M';
    let total_forks = 0;
    let total_stars = 0;

    data.user.repositories.nodes.forEach((r) => {
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
    const data = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        body: JSON.stringify({ query: GITHUBLANGUAGES }),
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
    })
        .then((res) => res.json())
        .then((data) => data.data);

    let languages = [];
    data.user.repositories.nodes.forEach((r) => {
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
    const githubrepos = await get_githubrepos();
    const projects = await get_projects();
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
