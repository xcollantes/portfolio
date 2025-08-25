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

    // Newsletter subscriptions - allow create only, no public reads
    match /newsletter/{subscriptionId} {
      // Allow creation of new subscriptions but no public reads
      allow create: if isValidNewsletterSubscription();
      allow read: if false;
      allow write: if false;
      allow delete: if false;
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

    // Validation function for newsletter subscription creation
    function isValidNewsletterSubscription() {
      let data = request.resource.data;

      // Must have required fields and valid email format
      return data.keys().hasAll(['email', 'subscribedAt', 'source', 'active'])
        // Email must be a non-empty string with basic email format
        && data.email is string && data.email.size() > 0 && data.email.matches('.*@.*\\..*')
        // SubscribedAt must be a timestamp
        && data.subscribedAt is timestamp
        // Source must be a non-empty string
        && data.source is string && data.source.size() > 0
        // Active must be a boolean
        && data.active is bool
    }
  }
}
```
