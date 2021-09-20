import formatCount from './formatCount';

const get_hours = async () => {
    const data = await fetch('https://wakatime.com/api/v1/users/poseidoncode/all_time_since_today', {
        method: 'GET',
        headers: {
            Authorization: `Basic ${Buffer.from(process.env.WAKATIME_API_KEY).toString('base64')}`,
        },
    })
        .then((res) => res.json())
        .then((data) => data.data.total_seconds);

    return data;
};

const get_visitors = async () => {
    const home = await fetch('https://api.countapi.xyz/hit/pritamh.netlify.app')
        .then((res) => res.json())
        .then((data) => data.value);
    const projects = await fetch('https://api.countapi.xyz/hit/pritamh.netlify.app/projects')
        .then((res) => res.json())
        .then((data) => data.value);
    const about = await fetch('https://api.countapi.xyz/hit/pritamh.netlify.app/about')
        .then((res) => res.json())
        .then((data) => data.value);
    return home + projects + about;
};

const get_repos = async () => {
    const data = await fetch('https://api.github.com/users/poseidon-code')
        .then((res) => res.json())
        .then((data) => data.public_repos);
    return data;
};

export const homeData = async () => {
    const hours = await get_hours();
    const visitors = await get_visitors();
    const repos = await get_repos();

    const data = {
        hours: formatCount((hours / 3600).toFixed(1)),
        visitors: formatCount(visitors),
        repos: formatCount(repos),
        frameworks: formatCount(16),
    };

    return data;
};
