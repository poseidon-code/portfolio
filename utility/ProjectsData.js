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

const get = async () => {
    const { data } = await client.query({
        query: PROJECTDATA,
    });

    const githubrepos = await fetch('https://api.github.com/users/poseidon-code/repos', {
        method: 'GET',
        'Content-Type': 'application/json',
    }).then((res) => res.json());

    const repos = githubrepos.map((g) => {
        return {
            name: g.name,
            url: g.html_url,
            stars: formatCount(g.stargazers_count),
            forks: formatCount(g.forks_count),
        };
    });

    return {
        projectdata: data,
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
