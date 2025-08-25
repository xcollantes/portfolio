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
  }
}
```
