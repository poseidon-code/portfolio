import formatCount from './formatCount';
import { gql } from '@apollo/client';
import client from '../apollo';

const PROJECTDATA = gql`
    query GetData {
        projects {
            id
            name
            description
            technologies
            links
        }
        openSourceContributions {
            id
            name
            description
            technologies
            links
        }
    }
`;

const get_projects = async () => {
    const { data } = await client.query({
        query: PROJECTDATA,
    });

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

const get = async () => {
    const repos = await get_githubrepos();
    const projects = await get_projects();

    return {
        projectdata: projects,
        githubdata: repos,
        // githubstats: ,
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
    const { projectdata, githubdata } = await get();

    return {
        projects: projectdata.projects,
        opensourcecontributions: projectdata.openSourceContributions,
        repos: githubdata,
    };
};
