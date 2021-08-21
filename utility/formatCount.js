export default (number) => {
    let format;
    if (number >= 1000) format = (number / 1000).toFixed(1) + 'K';
    else if (number >= 1000000) format = (number / 1000000).toFixed(1) + 'M';
    else if (number >= 1000000000) format = (number / 1000000000).toFixed(1) + 'B';
    else format = number;
    return format;
};
