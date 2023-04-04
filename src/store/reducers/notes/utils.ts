import { Note } from 'models/note';

export function sortByDataCreate(notes: Note[]) {
    return notes.sort(
        (a, b) =>
            new Date(b.date_create).getTime() -
            new Date(a.date_create).getTime()
    );
}

export const cacheManager = <T>(path: string) => {
    function isCacheValid(cache: string | null): cache is string {
        if (cache === null || cache === 'undefined') {
            return false;
        }
        return true;
    }
    function getCache(): T {
        const cache = localStorage.getItem(path);
        return isCacheValid(cache) ? JSON.parse(cache) : [];
    }
    function setCache(notes: T) {
        return localStorage.setItem(path, JSON.stringify(notes || []));
    }
    return {
        getCache,
        setCache
    };
};
