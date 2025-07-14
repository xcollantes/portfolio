/** Toast component using Sonner. */

import { AlertColor } from '@mui/material';
import { useEffect } from 'react';
import { toast as sonnerToast, Toaster } from 'sonner';
import { useToast } from '../contexts/toastContext';

interface ToastProps {
  autoHideDuration?: number;
  anchorOrigin?: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
  variant?: 'filled' | 'outlined' | 'standard';
  elevation?: number;
}

export const Toast = ({
  autoHideDuration = 5000,
  anchorOrigin = { vertical: 'bottom', horizontal: 'right' },
  variant = 'filled',
  elevation = 6,
}: ToastProps) => {
  const { toast, hideToast } = useToast();

  // Map MUI severity to Sonner toast type
  const mapSeverityToType = (severity: AlertColor) => {
    switch (severity) {
      case 'success': return 'success';
      case 'error': return 'error';
      case 'warning': return 'warning';
      case 'info':
      default:
        return 'info';
    }
  };

  // Show Sonner toast when toast context changes
  useEffect(() => {
    if (toast.open && toast.message) {
      const toastType = mapSeverityToType(toast.severity);

      // Use the appropriate Sonner toast type
      sonnerToast[toastType](toast.message, {
        duration: autoHideDuration,
        onDismiss: hideToast,
      });
    }
  }, [toast, autoHideDuration, hideToast]);

  // Map MUI position to Sonner position
  const position = `${anchorOrigin.vertical}-${anchorOrigin.horizontal}`;

  return (
    <Toaster
      position={position as any}
      richColors={variant === 'filled'}
      closeButton={true}
      theme="light"
    />
  );
};