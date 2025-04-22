import { HTMLAttributes } from 'react';

export interface IGreetingProps extends HTMLAttributes<HTMLElement> {
    name: string;
}
