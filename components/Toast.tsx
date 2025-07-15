/** Toast component using Sonner. */

import { AlertColor } from '@mui/material';
import { useEffect, useRef } from 'react';
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

  // Track the last toast message to prevent duplicates
  const lastToastRef = useRef<{ message: string; severity: AlertColor; timestamp: number } | null>(null);

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
      const currentToast = {
        message: toast.message,
        severity: toast.severity,
        timestamp: Date.now()
      };

      // Check if this is the same toast as the last one (within 100ms to prevent duplicates)
      const isDuplicate = lastToastRef.current &&
        lastToastRef.current.message === currentToast.message &&
        lastToastRef.current.severity === currentToast.severity &&
        (currentToast.timestamp - lastToastRef.current.timestamp) < 100;

      if (!isDuplicate) {
        const toastType = mapSeverityToType(toast.severity);

        // Store reference to this toast
        lastToastRef.current = currentToast;

        // Show the Sonner toast
        sonnerToast[toastType](toast.message, {
          duration: autoHideDuration,
          onDismiss: hideToast,
        });

        // Immediately reset the context state to prevent re-rendering issues
        hideToast();
      }
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