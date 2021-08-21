import formatCount from './formatCount';

export default async () => {
    const hours = await fetch('https://wakatime.com/api/v1/users/poseidoncode/all_time_since_today', {
        method: 'GET',
        headers: {
            Authorization: `Basic ${Buffer.from(process.env.WAKATIME_API_KEY).toString('base64')}`,
        },
    })
        .then((res) => res.json())
        .then((data) => data.data.total_seconds);

    const visitors = await fetch('https://api.countapi.xyz/hit/pritamh.netlify.app')
        .then((res) => res.json())
        .then((data) => data.value);

    const repos = await fetch('https://api.github.com/users/poseidon-code')
        .then((res) => res.json())
        .then((data) => data.public_repos);

    const data = {
        hours: formatCount((hours / 3600).toFixed(1)),
        visitors: formatCount(visitors),
        repos: formatCount(repos),
        frameworks: formatCount(16),
    };

    return data;
};
