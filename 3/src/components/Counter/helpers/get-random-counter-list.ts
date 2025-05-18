import { ICounterListItem } from '../interfaces/counter-list-item';

export function getRandomCounterList(num: number): ICounterListItem[] {
    if (num <= 0) {
        return [];
    }

    const result: ICounterListItem[] = [];
    for (let i = 0; i < num; i++) {
        const id = Math.random().toString();
        result.push({ id, title: `Карточка №${id}` });
    }

    return result;
}
