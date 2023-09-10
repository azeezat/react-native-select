/**
 * Extract property from array
 */

export const extractPropertyFromArray = (arr: any, property: string) => {
  let extractedValue = arr?.map((item: any) => item[property]);

  return extractedValue;
};
