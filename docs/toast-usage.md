# Toast Notification System

The portfolio website includes a toast notification system built with Material
UI.  This document explains how to use it in your components.

## Basic Usage

To display toast notifications in your components, use the
`useToastNotification` hook:

```tsx
import { useToastNotification } from "../hooks/useToastNotification"

const MyComponent = () => {
  const toast = useToastNotification()

  const handleButtonClick = () => {
    // Display a success toast
    toast.success("Operation completed successfully!")
  }

  return <button onClick={handleButtonClick}>Show Toast</button>
}
```

## Available Toast Types

The hook provides four pre-configured methods:

- `toast.success(message)` - Displays a success message with a green background
- `toast.info(message)` - Displays an informational message with a blue background
- `toast.warning(message)` - Displays a warning message with an orange/yellow background
- `toast.error(message)` - Displays an error message with a red background

## Advanced Usage

If you need more control over the toast, you can use the `useToast` hook directly:

```tsx
import { useToast } from "../contexts/toastContext"

const MyComponent = () => {
  const { showToast, hideToast } = useToast()

  const handleButtonClick = () => {
    showToast("Custom message", "success") // Second parameter is the severity
  }

  return <button onClick={handleButtonClick}>Show Toast</button>
}
```

## Customizing Toast Appearance

The `Toast` component in `components/Toast.tsx` can be customized by modifying
the props:

```tsx
// In pages/_app.tsx or any other parent component
<Toast
  autoHideDuration={3000} // Duration in milliseconds
  anchorOrigin={{ vertical: "top", horizontal: "right" }}
  variant="outlined" // 'filled', 'outlined', or 'standard'
  elevation={2} // Shadow elevation
/>
```

## Implementation Details

The toast system consists of three main parts:

1. `ToastContext` - Manages the state of toast notifications
2. `Toast` component - Renders the actual toast UI
3. `useToastNotification` hook - Provides a simplified API for showing toasts

All toast notifications will auto-hide after 6 seconds by default, but this can
be customized.
