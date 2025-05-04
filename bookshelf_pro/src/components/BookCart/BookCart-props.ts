import { HTMLAttributes } from 'react';

export interface IBookCartProps extends HTMLAttributes<HTMLElement> {
    uuid: string;
    name: string;
    author: string;
}
