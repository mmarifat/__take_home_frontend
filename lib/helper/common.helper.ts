export function JsonParseHelper(file: any): any {
    return JSON.parse(JSON.stringify(file))
}
