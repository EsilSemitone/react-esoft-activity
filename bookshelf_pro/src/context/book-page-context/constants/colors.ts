export const COLORS = {
    black: '#000000',
    white: '#ffffff',
    red: '#ff0000',
    blue: '#0000ff',
    green: '#008000',
} as const;

export type COLORS_KEYS = keyof typeof COLORS;
