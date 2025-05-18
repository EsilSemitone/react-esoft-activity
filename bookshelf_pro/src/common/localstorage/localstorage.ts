export const saveItem = (key: string, item: string | null) => {
    const parse_item = item ? item : '';
    localStorage.setItem(key, parse_item);
};

export const getItem = <T extends string = string>(key: string): T | null => {
    const item = localStorage.getItem(key);

    if (!item) {
        return null;
    }
    return item as T;
};
