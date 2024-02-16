export const dotNotationExtractor = (object: any, dotNotation: string) => {
  const split = dotNotation.split('.');

  const reduce = split.reduce((parte, currentValue) => {
    if (parte) {
      return parte[currentValue];
    }
    return null;
  }, object);
  return reduce;
};
