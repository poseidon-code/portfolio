// EXPORTED function to convert a number to their respective nearby roundings & suffixing with acronyms
// params: number (number)
// returns: formated string with rounded & suffixed number
export const formatCount = number =>
    Intl.NumberFormat('en-US', {
        style: 'decimal',
        notation: 'compact',
        roundingMode: 'ceil',
        compactDisplay: 'short',
        maximumSignificantDigits: 2,
    }).format(number);
