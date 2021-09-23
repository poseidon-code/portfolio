// EXPORTED function to convert a number to their respective nearby roundings & suffixing with acronyms
// params: number (number)
// returns: formated string with rounded & suffixed number
export const formatCount = (number) => {
    let format;

    // formatting number >=1000 -> "1.0K" (Thousand)
    if (number >= 1000) format = (number / 1000).toFixed(1) + 'K';
    // formatting number >=1000000 -> "1.0M" (Million)
    else if (number >= 1000000) format = (number / 1000000).toFixed(1) + 'M';
    // formatting number >=1000000000 -> "1.0B" (Billion)
    else if (number >= 1000000000) format = (number / 1000000000).toFixed(1) + 'B';
    // no formatting, convert number to string
    else format = number + '';

    return format;
};
