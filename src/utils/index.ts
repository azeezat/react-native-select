import { TSectionList } from 'src/types/index.types';

/**
 * Extract property from array
 */
export const extractPropertyFromArray = (arr: any, property: string) => {
  let extractedValue = arr.map((item: any) => item[property]);

  return extractedValue;
};

export const getMaxLengthOfSectionListProperty = (
  sectionList: TSectionList,
  property: 'title' | 'data'
) => {
  let maxLength = 0;

  sectionList.forEach((obj) => {
    if (obj[property]?.length > maxLength) {
      maxLength = obj.data.length;
    }
  });

  return maxLength;
};
