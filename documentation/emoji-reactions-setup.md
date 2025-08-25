# Emoji Reactions System Setup

This guide explains how to set up and use the Firestore-based emoji reaction system for blog articles.

## Overview

The emoji reaction system allows users to react to blog articles with predefined emojis. Reactions are stored in Firestore and displayed in real-time with counts.

## Features

- **6 Predefined Emojis**: 👍 (Like), ❤️ (Love), 😄 (Funny), 🤔 (Thoughtful), 🔥 (Fire), 🎉 (Celebrate)
- **Anonymous Tracking**: Uses session storage for anonymous user identification
- **Real-time Updates**: Reactions update immediately after user interaction
- **Duplicate Prevention**: Users can only react once per emoji per article
- **Responsive Design**: Works on mobile and desktop
- **Blog Mode Integration**: Shows on all article pages

## Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Follow the setup wizard
4. Enable Firestore Database in production mode

### 2. Configure Firestore Security Rules

Set up the following Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to article reactions
    match /articleReactions/{articleId} {
      allow read: if true;
      allow write: if request.auth != null || isValidAnonymousWrite();
    }
    
    // Allow write access to user reactions for tracking
    match /userReactions/{reactionId} {
      allow read, write: if true;
    }
    
    function isValidAnonymousWrite() {
      return request.resource.data.keys().hasAll(['articleId', 'reactions', 'totalReactions', 'lastUpdated']);
    }
  }
}
```

### 3. Get Firebase Configuration

1. Go to Project Settings > General
2. Scroll down to "Your apps" section
3. Click "Web" icon to create a web app
4. Copy the config object values

### 4. Create Service Account (for Admin SDK)

1. Go to Project Settings > Service Accounts
2. Click "Generate new private key"
3. Save the JSON file securely
4. Extract the required fields for environment variables

## Environment Variables

Add these variables to your `.env.local` file:

```env
# Firebase Client SDK (Public)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef

# Firebase Admin SDK (Private)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xyz@your_project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_private_key_here\n-----END PRIVATE KEY-----"
```

## Firestore Data Structure

### Collections

#### `articleReactions`
Stores reaction counts for each article:

```typescript
{
  articleId: string,           // e.g., "rag-langchain"
  reactions: {
    '👍': number,             // Count of like reactions
    '❤️': number,             // Count of love reactions  
    '😄': number,             // Count of funny reactions
    '🤔': number,             // Count of thoughtful reactions
    '🔥': number,             // Count of fire reactions
    '🎉': number              // Count of celebrate reactions
  },
  totalReactions: number,      // Sum of all reactions
  lastUpdated: Timestamp       // When last updated
}
```

#### `userReactions`
Tracks individual user reactions to prevent duplicates:

```typescript
{
  articleId: string,           // e.g., "rag-langchain"
  userId: string,              // Anonymous session ID or auth user ID
  emoji: string,               // e.g., "👍"
  timestamp: Timestamp         // When reaction was added
}
```

## API Routes

### `GET /api/reactions/[articleId]`
Get reaction counts for an article.

**Response:**
```json
{
  "articleId": "rag-langchain",
  "reactions": {
    "👍": 5,
    "❤️": 3,
    "😄": 1,
    "🤔": 2,
    "🔥": 8,
    "🎉": 0
  },
  "totalReactions": 19,
  "lastUpdated": "2024-01-15T10:30:00Z"
}
```

### `POST /api/reactions/add`
Add a new reaction.

**Request Body:**
```json
{
  "articleId": "rag-langchain",
  "emoji": "👍",
  "userId": "anon_abc123_1642234567890"
}
```

**Response:**
```json
{
  "success": true,
  "reactions": { /* updated counts */ },
  "totalReactions": 20
}
```

### `GET /api/reactions/user/[articleId]?userId={userId}`
Get user's reactions for an article.

**Response:**
```json
{
  "articleId": "rag-langchain",
  "userId": "anon_abc123_1642234567890",
  "reactions": ["👍", "🔥"]
}
```

## Component Usage

### Basic Usage

```tsx
import EmojiReactions from '../components/EmojiReactions'

function ArticlePage({ articleId }) {
  return (
    <div>
      {/* Article content */}
      
      <EmojiReactions 
        articleId={articleId}
        showInBlogMode={true}
      />
    </div>
  )
}
```

### Props

- `articleId: string` - Unique identifier for the article
- `showInBlogMode?: boolean` - Whether to show in blog mode (default: true)

## User Experience

### Anonymous Users
- Automatically assigned a session-based user ID
- Can react once per emoji per article
- Reactions persist for the browser session
- No authentication required

### Interaction Flow
1. User clicks an emoji button
2. System checks if user already reacted with that emoji
3. If not, reaction is recorded in Firestore
4. UI updates with new count
5. Button becomes disabled/highlighted for that emoji

### Visual Feedback
- Buttons show current count next to emoji
- Reacted buttons are highlighted and disabled
- Hover effects for better interactivity
- Tooltip shows emoji label on hover
- Total reaction count displayed below buttons

## Testing

### Manual Testing
1. Navigate to any blog article
2. Scroll to the bottom to see emoji reactions
3. Click different emojis and verify counts increase
4. Refresh page and verify reactions persist
5. Try clicking same emoji again (should be disabled)

### Development Testing
```bash
# Start development server
npm run dev

# Open article page
# http://localhost:3000/articles/your-article-id

# Check browser console for any errors
# Verify Firestore operations in Firebase Console
```

## Troubleshooting

### Common Issues

1. **Reactions not saving**
   - Check Firebase configuration
   - Verify Firestore security rules
   - Check browser console for errors

2. **Environment variables not working**
   - Ensure variables start with `NEXT_PUBLIC_` for client-side
   - Restart development server after adding variables
   - Check `.env.local` file formatting

3. **CORS errors**
   - Verify Firebase domain configuration
   - Check if localhost is in authorized domains

4. **Authentication errors**
   - Verify service account key format
   - Check private key has proper line breaks (`\n`)

## Performance Considerations

- Reactions load asynchronously to not block article rendering
- Skeleton loading states while fetching data
- Optimistic updates for better user experience
- Firestore indexes automatically created for queries

## Future Enhancements

- Admin dashboard for reaction analytics
- Reaction trends and popular articles
- Integration with authentication system
- Email notifications for high engagement
- Reaction-based article recommendations