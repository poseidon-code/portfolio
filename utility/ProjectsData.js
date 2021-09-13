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

    return {
        projectdata: data,
        // githubdata: ,
        // githubstats: ,
    };
};

export const SYMBOLS = ['出', '長', '前', '道', '意', '和', '定', '思', '民', '明', '高', '雨', '気', '森', '東', '青', '海', '宮', '命', '聖'];

export const projectData = async () => {
    const { projectdata } = await get();

    return {
        projects: projectdata.projects,
        opensourcecontributions: projectdata.openSourceContributions,
    };
};
