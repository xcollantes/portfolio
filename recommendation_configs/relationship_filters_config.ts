/** Filter options for recommendations based on relationship types. */

export interface RelationshipFilterConfigType {
  // Case sensitive and should be human readable.
  displayText: string
  // Should be camelcase with no spaces.
  tagId: string
  // Keywords to match in relationship text (case-insensitive)
  matchKeywords: string[]
}

// List of relationship filters based on semantic analysis of relationship descriptions.
export const relationshipFilterConfig: RelationshipFilterConfigType[] = [
  {
    displayText: "Mentors",
    tagId: "mentors",
    matchKeywords: ["mentor", "mentored", "taught", "teacher"]
  },
  {
    displayText: "Managers",
    tagId: "managers",
    matchKeywords: ["managed", "director", "senior", "manager", "manager of"]
  },
  {
    displayText: "Colleagues",
    tagId: "colleagues",
    matchKeywords: ["worked with", "same team", "colleague", "colleagues"]
  },
  {
    displayText: "Clients",
    tagId: "clients",
    matchKeywords: ["client", "stakeholder", "customer"]
  },
]

/**
 * Determines which filter categories a recommendation belongs to based on its relationship text.
 *
 * @param relationship - The relationship text from the recommendation
 * @returns Array of tagIds that match the relationship text
 */
export function getMatchingRelationshipFilters(relationship: string): string[] {
  const lowerRelationship = relationship.toLowerCase()
  const matchingFilters: string[] = []

  relationshipFilterConfig.forEach((filter) => {
    const hasMatch = filter.matchKeywords.some(keyword =>
      lowerRelationship.includes(keyword.toLowerCase())
    )
    if (hasMatch) {
      matchingFilters.push(filter.tagId)
    }
  })

  return matchingFilters
}