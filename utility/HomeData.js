import axios from 'axios';
import { formatCount } from './formatCount';

// GET (REST) "Hours Spent" from "wakatime.com"
// uses: Basic Authorization (with Wakatime API key converted to base64 string)
// requires: Wakatime Personal API key
const get_hours = async () => {
    const data = await axios
        .get('https://wakatime.com/api/v1/users/poseidoncode/all_time_since_today', {
            headers: {
                // Basic Authorization
                // uses JS Buffer.from().toString('base64') for conversion to base64 from Wakatime API key
                Authorization: `Basic ${Buffer.from(process.env.WAKATIME_API_KEY).toString('base64')}`,
            },
        })
        .then(
            (res) =>
                // only hours spent of all time is required (in seconds)
                res.data.data.total_seconds
        );

    return data;
};

// GET (REST) "Visitors" count from "api.countapi.xyz/hit"
// uses: Base URL, endpoints & routes of website to get times that endpoint was visited
// requires: Base URL & endpoints
const get_visitors = async () => {
    // Base URLs
    /**
     * as one's domain name could change as many times as he wants,
     * so to not loose any previous visit counts this array should include new domain as well as previous domains
     * (unless the owner wishes to remove previous counts)
     */
    const SITES = ['pritamh.netlify.app'];
    // Endpoints
    /**
     * it is required to have a base endpoint (i.e. '/') always
     * as many endpoints could be included, avoiding any dynamic endpoints
     */
    const ROUTES = ['/', '/projects', '/about', '/blog'];

    // getcount() gets the number of visits to a URL passed
    // params: URL (string)
    // returns: a resolved promise with number of visits for a URL passed
    const getcount = (url) => {
        return new Promise((resolve, reject) => {
            axios.get(url).then((res) => {
                // "value" is the number of counts that URL was visited
                resolve(res.data.value);
            });
        });
    };

    // getcounts ([Promises])
    let getcounts = [];
    /**
     * looping over every possible endpoints for api.countapi.xyz/hit/{endpoints}
     * and appending Promises (after calling getcounts()) for every endpoints
     */
    SITES.forEach((s) => {
        ROUTES.forEach((r) => {
            // appends Promise for every URL endpoints to getcounts[]
            getcounts.push(getcount(`https://api.countapi.xyz/hit/${s}${r}`));
        });
    });

    // resolve all Promises inside getcount[]
    /**
     * resolves all the Promises inside getcounts[] and saves the resolved data in place
     * then from the array of resolved Promises (here, counts), looping and adding all numbers to get final count
     * returns: summation of all counts
     */
    const data = await Promise.all(getcounts).then((counts) => {
        // sum of every count in the counts[]
        return counts.reduce((a, b) => a + b, 0);
    });

    return data;
};

// GET (REST) "Github Repos"
// uses: Github REST API to fetch number of pubil repositories of a user
// requires: Github username
const get_repos = async () => {
    // Github Username
    const USERNAME = 'poseidon-code';

    // fetches the number of public github repositories for a Github user
    const data = await axios.get(`https://api.github.com/users/${USERNAME}`).then(
        (res) =>
            // only count of public repositories for the user is required
            res.data.public_repos
    );

    return data;
};

// EXPORTED function to get all the data/stats for the Homepage ('/')
// returns: object containing counts for "Hours Spent", "Visitors", "Github Repos" and "Frameworks"
// formatCount() is used for rounding values and suffixing their respective acronyms
export const homeData = async () => {
    const hours = await get_hours(); // fetching "Hours Spent"
    const visitors = await get_visitors(); // fetching "Visitors"
    const repos = await get_repos(); // fetching "Github Repos"

    const data = {
        hours: formatCount((hours / 3600).toFixed(1)), // getting in Hours format
        visitors: formatCount(visitors), // formatting number
        repos: formatCount(repos), // formating number
        frameworks: formatCount(16), // setting & formating "Frameworks"
    };

    // returns: {hours, visitors, repos, frameworks}
    return data;
};
