export function commaSeparatedStringToArray(str: string) {
    if (str === '') {
        return []
    }
    return str.split(',')
}