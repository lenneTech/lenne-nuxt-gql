
export type KeysFromObject<T> = {
    [K in keyof T]: T[K] extends object ? { [P in K]: Array<KeysFromObject<T[K]>> } : K;
}[keyof T];

export type KeysArray<T> = Array<KeysFromObject<T>>