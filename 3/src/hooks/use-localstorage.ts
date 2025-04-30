import { useEffect, useState } from 'react';

export const useLocalStorage = <T extends string = string>(key: string) => {
    const [item, setItem] = useState<T | null>(() => {
        return (localStorage.getItem(key) as T) || null;
    });

    useEffect(() => {
        if (item) {
            localStorage.setItem(key, item);
        }
    }, [item, key]);

    return [item, setItem] as const;
};
