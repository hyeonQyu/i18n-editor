export const ALERT_TYPES = ['success', 'info', 'warning', 'error'] as const;

export type AlertType = typeof ALERT_TYPES[number];
