export type TimeUnitType = 'Ms' | 'Second' | 'Minute' | 'Hour' | 'Day';

export const TIME_UNIT: Record<`unitOf${TimeUnitType}`, Record<`as${TimeUnitType}`, number>> = {
  unitOfMs: {
    asMs: 1,
    asSecond: 1000,
    asMinute: 60 * 1000,
    asHour: 60 * 60 * 1000,
    asDay: 24 * 60 * 60 * 1000,
  },
  unitOfSecond: {
    asMs: 1 / 1000,
    asSecond: 1,
    asMinute: 60,
    asHour: 60 * 60,
    asDay: 24 * 60 * 60,
  },
  unitOfMinute: {
    asMs: 1 / (60 * 1000),
    asSecond: 1 / 60,
    asMinute: 1,
    asHour: 60,
    asDay: 24 * 60,
  },
  unitOfHour: {
    asMs: 1 / (60 * 60 * 1000),
    asSecond: 1 / (60 * 60),
    asMinute: 1 / 60,
    asHour: 1,
    asDay: 24,
  },
  unitOfDay: {
    asMs: 1 / (24 * 60 * 60 * 1000),
    asSecond: 1 / (24 * 60 * 60),
    asMinute: 1 / (24 * 60),
    asHour: 1 / 24,
    asDay: 1,
  },
};
