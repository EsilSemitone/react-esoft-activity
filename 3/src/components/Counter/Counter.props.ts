import { HTMLAttributes } from 'react';

export interface ICounterProps extends HTMLAttributes<HTMLElement> {
    increment: () => void
    decrement: () => void
}
