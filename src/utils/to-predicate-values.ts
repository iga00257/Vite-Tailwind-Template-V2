/* eslint-disable @typescript-eslint/no-explicit-any */
type Predicator = (value: any) => any;
type ObjectComparator = (value: any) => boolean;

interface Options {
  objectComparator?: ObjectComparator;
}

export default function toPredicateValues(
  data: any,
  predicator: Predicator,
  options: Options = {},
): any {
  const { objectComparator = (value: any) => typeof value === 'object' && value !== null } =
    options;

  if (Array.isArray(data)) {
    return data.map((item) => toPredicateValues(item, predicator, options));
  }

  if (objectComparator(data)) {
    return Object.keys(data).reduce(
      (acc, key) => ({
        ...acc,
        [key]: toPredicateValues(data[key], predicator, options),
      }),
      {},
    );
  }

  return predicator(data);
}
