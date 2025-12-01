type CharCount = {
    char: string
    count: number
}

/**
 * Counts how many times each non-whitespace character appears in a string.
 *
 * Assumptions:
 * - Case-sensitive: 'H' and 'h' are treated as a different character
 * - All whitespace (spaces, tabs, newlines) is ignored
 * - All non-whitespace characters (letters, digits, symbols) are counted
 *
 * Output format:
 *   "h:1, e:1, l:3, o:2, w:1, r:1, d:1"
 */
function countChar(text: string): string {
    const removedSpaces = text.replace(/\s/g, '')
    const result: CharCount[] = []

    for (const charOfTheString of removedSpaces) {
        const existing = result.find(entry => entry.char === charOfTheString)

        if (existing) {
            existing.count += 1
        } else {
            result.push({
                char: charOfTheString,
                count: 1
            })
        }
    }
    return result
        .map(elementOfResult => `${elementOfResult.char}: ${elementOfResult.count}`)
        .join(', ')
}
console.log(countChar('I think its time to go to bed'))