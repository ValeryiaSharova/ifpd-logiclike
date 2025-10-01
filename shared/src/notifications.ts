export enum NOTIFICATIONS {}

export const NOTIFICATION_TYPES = ['security', 'system'] as const;
export type NotificationType = (typeof NOTIFICATION_TYPES)[number];

export const NOTIFICATION_TO_TYPE: Record<NOTIFICATIONS, NotificationType> = {};
