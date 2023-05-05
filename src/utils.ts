/**
 * The function transforms an array into a Zeus syntax object.
 */
export function transformToZeusSyntax<T>(array: T) {
    const result = {};
    zeusSyntaxRecursive(array, result);
    return result;
}

/**
 * The function recursively converts an array of strings and objects into a nested object structure.
 */
function zeusSyntaxRecursive(array: any, object: any) {
    for (const item of array) {
        if (typeof item === 'string') {
            object[item] = true;
            continue;
        }

        if (typeof item === 'object') {
            const key = Object.keys(item)[0];
            object[key] = {};
            zeusSyntaxRecursive(item[key], object[key])
            continue;
        }
    }

    return object;
}