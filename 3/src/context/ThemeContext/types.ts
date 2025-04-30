export type Theme = 'white' | 'dark';

export type ThemeContextData = {
    theme: Theme;
    setTheme: (...args: any[]) => void;
};
