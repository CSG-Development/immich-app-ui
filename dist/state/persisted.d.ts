type PersistedBaseOptions<T> = {
    read: (key: string) => T | undefined;
    write: (key: string, value: T) => void;
};
declare class PersistedBase<T> {
    #private;
    get current(): T;
    set current(value: T);
    constructor(key: string, defaultValue: T, options: PersistedBaseOptions<T>);
}
type PersistedLocalStorageOptions<T> = {
    serializer?: {
        stringify(value: T): string;
        parse(text: string): T;
    };
    valid?: (value: T | unknown) => value is T;
    upgrade?: 'merge' | ((value: T) => T);
};
export declare class PersistedLocalStorage<T> extends PersistedBase<T> {
    constructor(key: string, defaultValue: T, options?: PersistedLocalStorageOptions<T>);
}
export {};
