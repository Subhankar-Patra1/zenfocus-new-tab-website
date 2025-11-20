export const formatTime = (date: Date, useAmPm: boolean): string => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  let amPm = '';

  if (useAmPm) {
    amPm = hours >= 12 ? ' PM' : ' AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
  }

  const strHours = hours.toString().padStart(2, '0');
  const strMinutes = minutes.toString().padStart(2, '0');
  const strSeconds = seconds.toString().padStart(2, '0');

  return `${strHours}:${strMinutes}:${strSeconds}${useAmPm ? '' : ''}`;
};

export const getAmPmLabel = (date: Date): string => {
  return date.getHours() >= 12 ? 'PM' : 'AM';
};

export const formatDuration = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};