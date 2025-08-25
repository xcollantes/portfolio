# Firestore Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Article reactions - allow public read/write with validation
    match /articleReactions/{articleId} {
      // Reads are allowed unconditionally.
      allow read: if true;
      allow write: if isValidReactionWrite();
      allow create: if isValidReactionCreate();
    }

    // User metrics - allow write/create only, no public reads
    match /userMetrics/{document=**} {
      // Allow writes and creates but no public reads
      allow write, create: if true;
      allow read: if false;
    }

    // Newsletter signups - allow read/write for signups document only
    match /newsletter/signups {
      // Allow read and write operations on the signups document
      allow read, write: if isValidNewsletterSignupOperation();
      allow create: if isValidNewsletterSignupCreate();
    }

    // Validation function for reaction create
    function isValidReactionCreate() {
      let data = request.resource.data;

      // Must ONLY have required fields.
      return data.keys().hasAll(['articleId', 'deprecatedReactions', 'reactions', 'lastUpdated'])
        // ArticleId must be a non-empty string
        && data.articleId is string && data.articleId.size() > 0
    }

    // Validation function for reaction writes
    function isValidReactionWrite() {
      let data = request.resource.data;

      // Must ONLY have required fields.
      return data.keys().hasAll(['reactions', 'lastUpdated'])
    }

    // Validation function for newsletter signups document operations
    function isValidNewsletterSignupOperation() {
      let data = request.resource.data;

      // Must have emails array and lastUpdated timestamp
      return data.keys().hasAll(['emails', 'lastUpdated'])
        // Emails must be an array
        && data.emails is list
        // LastUpdated must be a timestamp
        && data.lastUpdated is timestamp
    }

    // Validation function for newsletter signups document creation
    function isValidNewsletterSignupCreate() {
      let data = request.resource.data;

      // Must have required fields for document creation
      return data.keys().hasAll(['emails', 'createdAt', 'lastUpdated'])
        // Emails must be an array
        && data.emails is list
        // CreatedAt must be a timestamp
        && data.createdAt is timestamp
        // LastUpdated must be a timestamp
        && data.lastUpdated is timestamp
    }
  }
}
```
