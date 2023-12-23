export const capitalizerFirstLetter = (value: string): string => {
  if (!value) return "";
  return `${value.charAt(0).toLocaleUpperCase()}${value.slice(1)}`;
};
