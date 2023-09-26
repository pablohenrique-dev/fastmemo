export function sanitizeName(name: string) {
  return name.toLocaleLowerCase().replace(/\s+/g, "-");
}

export function decodeSpecialString(specialString: string): string {
  try {
    const decodedString = decodeURIComponent(specialString);
    return decodedString.replace(/-/g, " ");
  } catch (error) {
    console.error("Erro ao decodificar a string:", error);
    return specialString;
  }
}

export function firstLetterCapitalized(name: string) {
  const firstLetter = name[0];
  const restLetters = name.slice(1);
  return firstLetter.toLocaleUpperCase() + restLetters;
}

export function limitString(text: string, limit: number = 30) {
  if (text.length >= limit) {
    return text.slice(0, limit) + "...";
  }
  return text;
}
