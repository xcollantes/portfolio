/**
 * Dependency free way to group by an array.
 *
 * https://github.com/xcollantes/portfolio/issues/74
 */
export default function groupBy(array: any[], groupByKey: string) {
  return array.reduce((accumulator: any, current: any) => {
    const value = current[groupByKey]

    // If value doesn't exist, create new object entry with empty array
    if (!accumulator[value]) {
      accumulator[value] = []
    }

    accumulator[value].push(current)

    return accumulator
  }, {})
}
