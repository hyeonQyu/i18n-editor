export const LANGUAGES = ['ko', 'en'] as const;

export type Language = typeof LANGUAGES[number];
