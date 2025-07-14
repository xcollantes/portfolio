import { useToast } from '../contexts/toastContext';

/**
 * A hook to simplify using toast notifications throughout the application.
 * Provides pre-configured methods for each toast type.
 */
export const useToastNotification = () => {
  const { showToast } = useToast();

  return {
    /**
     * Show a success toast notification.
     * @param message The message to display in the toast.
     */
    success: (message: string) => showToast(message, 'success'),

    /**
     * Show an info toast notification.
     * @param message The message to display in the toast.
     */
    info: (message: string) => showToast(message, 'info'),

    /**
     * Show a warning toast notification.
     * @param message The message to display in the toast.
     */
    warning: (message: string) => showToast(message, 'warning'),

    /**
     * Show an error toast notification.
     * @param message The message to display in the toast.
     */
    error: (message: string) => showToast(message, 'error'),
  };
};