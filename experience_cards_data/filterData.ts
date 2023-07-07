/** Filter options shown as buttons. The order is respected. */

export interface FilterDataType {
  // Case sensitive and should be human readable.
  displayText: string
  // Should be camelcase with no spaces.
  tagId: string
}

export const filterData: FilterDataType[] = [
  { displayText: "Python", tagId: "python" },
  { displayText: "Cyber security", tagId: "security" },
  { displayText: "Cloud", tagId: "database" },
  { displayText: "Interests", tagId: "interests" },
  { displayText: "IoT", tagId: "iot" },
]
