/** Filter options shown as buttons. The order is respected. */

export interface FilterDataConfigType {
  // Case sensitive and should be human readable.
  displayText: string
  // Should be camelcase with no spaces.
  tagId: string
}

// List of filters turned on.
export const filterDataConfig: FilterDataConfigType[] = [
  { displayText: "Python", tagId: "python" },
  { displayText: "Cyber security", tagId: "security" },
  { displayText: "Cloud", tagId: "database" },
  { displayText: "Interests", tagId: "interests" },
  { displayText: "IoT", tagId: "iot" },
]
