/**
 * Compares two arrays to see if one array contains the same elements, as determined using the
 * "Same Value Zero" strategy used by the built-in Map type, as the other array, in any order.
 *
 * Repeated elements in one array must be similarly repeated in the other array in order for the
 * given arrays to be considered "equal".
 */
export function arraysContainSameElementsInAnyOrder(
  array1: Readonly<unknown[]>,
  array2: Readonly<unknown[]>,
): boolean {
  if (array1 === array2) {
    return true;
  }
  if (array1.length !== array2.length) {
    return false;
  }

  const array1ElementCounts = new Map<unknown, number>();
  for (const element of array1) {
    const incrementedCount = (array1ElementCounts.get(element) ?? 0) + 1;
    array1ElementCounts.set(element, incrementedCount);
  }

  for (const element of array2) {
    const array1ElementCount = array1ElementCounts.get(element);
    if (array1ElementCount === undefined) {
      return false;
    }

    const decrementedArray1ElementCount = array1ElementCount - 1;
    if (decrementedArray1ElementCount === 0) {
      array1ElementCounts.delete(element);
    } else {
      array1ElementCounts.set(element, decrementedArray1ElementCount);
    }
  }

  if (array1ElementCounts.size > 0) {
    throw new Error(
      `internal error c2zbhapkfq: array1ElementCounts.size !== 0: ${array1ElementCounts.size}`,
    );
  }

  return true;
}
