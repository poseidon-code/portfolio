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

// EXPORTED variable SYMBOLS ([character])
// an array of Japanese Kanji single characters to use as background for '/projects' components
// prettier-ignore
export const SYMBOLS = ['出','長','前','道','意','和','定','思','民','明','高','雨','気','森','東','青','海','宮','命','聖'];
