/** Toast context. */

import { AlertColor } from '@mui/material';
import { createContext, ReactNode, useContext, useState } from 'react';

type ToastType = {
  message: string;
  severity: AlertColor;
  open: boolean;
};

interface ToastContextType {
  toast: ToastType;
  showToast: (message: string, severity?: AlertColor) => void;
  hideToast: () => void;
}

const defaultToast: ToastType = {
  message: '',
  severity: 'info',
  open: false,
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastType>(defaultToast);

  const showToast = (message: string, severity: AlertColor = 'info') => {
    setToast({
      message,
      severity,
      open: true,
    });
  };

  const hideToast = () => {
    setToast((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <ToastContext.Provider value={{ toast, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};