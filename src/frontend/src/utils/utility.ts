type Fn = (...args: any[]) => void;

export function debounce<FN extends Fn>(fn: FN, time: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<FN>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fn(...args);
    }, time);
  };
  debounced.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
    }
  };
  return debounced;
}

export function getUUID() {
  return typeof crypto?.randomUUID === 'function'
    ? crypto.randomUUID()
    : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
}
