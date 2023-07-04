export const capitalizeWords = (str: string): string => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("-");
};

export const underlineSpaces = (str: string): string => {
  return str.toLowerCase().replaceAll(" ", "_");
};

export const hyphenSpaces = (str: string): string => {
  return str.toLowerCase().replaceAll(" ", "-");
};
