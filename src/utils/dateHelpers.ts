// Date helper functions for study streak tracking

export const getTodayString = (): string => {
  return new Date().toDateString();
};

export const getYesterdayString = (): string => {
  return new Date(Date.now() - 86400000).toDateString();
};

export const isToday = (dateString: string): boolean => {
  return dateString === getTodayString();
};

export const isYesterday = (dateString: string): boolean => {
  return dateString === getYesterdayString();
};

export const isSameDate = (date1: string, date2: string): boolean => {
  return date1 === date2;
};
