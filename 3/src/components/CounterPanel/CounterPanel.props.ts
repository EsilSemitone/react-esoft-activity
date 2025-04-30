import { HTMLAttributes } from 'react';

export interface ICounterPanelProps extends HTMLAttributes<HTMLElement> {
    increment: () => void;
    decrement: () => void;
}
