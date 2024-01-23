export interface RecommendationType {
  // Recommendation giver; full name.
  name: string
  // LinkedIn headline of recommendation giver, usually job title.
  headline: string
  // Recommendation giver relationship to me; "Worked directly with", "Mentored".
  relationship: string
  // Date the recommendation was given on LinkedIn.
  dateCreated: Date | string
  // Path to profile image saved locally.
  //
  // Must be relative to the repository.
  // Example: recommendations/profile_pics/siobhan.jpeg
  profileImagePath: string
  // Full URL to LinkedIn profile.
  //
  // Example: `https://www.linkedin.com/in/jaypinnamaneni`
  linkedInLink: string
  // Preview text of full recommendation used on cards.
  //
  // Include highlights or a short blurb quoting full text.
  // Keep at about 250 characters.
  previewText: string
  // The full recommendation text copy and pasted from LinkedIn.
  //
  // Use the `|` for retaining the newline breaks in YAML file.
  fullRec: string
  // Set to true if show recommendation on slideshow in preview.
  // By default is true.
  showInSlides?: boolean
}
