import { createContext } from 'react';
import { ThemeContextData } from './types';

export const ThemeContext = createContext<ThemeContextData>({
    theme: 'white',
    setTheme: () => undefined,
});
