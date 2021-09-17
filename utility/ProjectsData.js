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

const GITHUBDATA = `
    query GithubData {

    }
`;

const GITHUBSTATS = `
    query GetGithubStats {
        user(login: "poseidon-code") {
            repositories(first: 100) {
                totalCount
                nodes {
                    forkCount
                    stargazerCount
                    diskUsage
                }
            }
        }
    }
`;

const GITHUBLANGUAGES = `
    query GetGihubLanguages {
        user(login: "poseidon-code") {
            repositories(first: 100) {
                nodes {
                    primaryLanguage {
                        name
                    }
                }
            }
        }
    }
`;

const get_projects = async () => {
    const data = await fetch('http://localhost:1337/graphql', {
        method: 'POST',
        body: JSON.stringify({ query: PROJECTDATA }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then((data) => data.data);

    return data;
};

const get_githubrepos = async () => {
    const githubrepos = await fetch('https://api.github.com/users/poseidon-code/repos', {
        method: 'GET',
        'Content-Type': 'application/json',
    }).then((res) => res.json());

    githubrepos.sort((a, b) => {
        let ta = new Date(a.updated_at).getTime();
        let tb = new Date(b.updated_at).getTime();
        if (ta < tb) return 1;
        if (ta > tb) return -1;
        return 0;
    });

    const repos = githubrepos.map((g) => {
        return {
            name: g.name,
            url: g.html_url,
            stars: formatCount(g.stargazers_count),
            forks: formatCount(g.forks_count),
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

    const total_repos = formatCount(data.user.repositories.totalCount);
    let total_forks = 0;
    let total_stars = 0;
    let total_size = 0;

    data.user.repositories.nodes.forEach((r) => {
        total_forks += r.forkCount;
        total_stars += r.stargazerCount;
        total_size += r.diskUsage;
    });

    return {
        forks: formatCount(total_forks),
        size: (total_size / 1000).toFixed(1) + 'M',
        stars: formatCount(total_stars),
        repos: formatCount(total_repos),
    };
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

    console.log(data);
};

const get = async () => {
    const repos = await get_githubrepos();
    const projects = await get_projects();
    const githubstats = await get_githubstats();
    const languages = await get_languages();

    return {
        projectdata: projects,
        githubdata: repos,
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
    const { projectdata, githubdata, githubstats, languages } = await get();

    return {
        projects: projectdata.projects,
        opensourcecontributions: projectdata.openSourceContributions,
        repos: githubdata,
        stats: githubstats,
        languages: languages,
    };
};
