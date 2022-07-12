export const LANGUAGES = ['ko', 'en', 'zh', 'ja', 'ru', 'fr', 'es', 'de'] as const;

export type Language = typeof LANGUAGES[number];
