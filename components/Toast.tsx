/** Toast component. */

import { Alert, Slide, SlideProps, Snackbar, Theme, useTheme } from '@mui/material';
import React from 'react';
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

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

export const Toast = ({
  autoHideDuration = 5000,
  anchorOrigin = { vertical: 'bottom', horizontal: 'right' },
  variant = 'filled',
  elevation = 6,
}: ToastProps) => {
  const { toast, hideToast } = useToast();
  const theme: Theme = useTheme();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return; // Don't close on random clickaway
    hideToast();
  };

  // Prevent touch events from propagating to background
  const handleTouch = (event: React.TouchEvent) => {
    event.stopPropagation();
  };

  return (
    <Snackbar
      open={toast.open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
      TransitionComponent={SlideTransition}
      TransitionProps={{
        onExited: () => hideToast(),
      }}
      action={<div />} /* Empty div required for swipe functionality */
      disableWindowBlurListener
      sx={{
        maxWidth: 'sm',
        zIndex: 9999, // Ensure toast appears at the very front
        '& .MuiSnackbarContent-root': {
          minWidth: '250px',
          touchAction: 'none', // Prevent default touch actions
        },
      }}
    >
      <Alert
        onClose={handleClose}
        severity={toast.severity}
        variant={variant}
        elevation={elevation}
        onClick={() => hideToast()}
        onTouchStart={handleTouch}
        onTouchMove={handleTouch}
        onTouchEnd={handleTouch}
        sx={{
          width: '100%',
          boxShadow: theme.shadows[elevation],
          cursor: 'pointer',
          touchAction: 'pan-x', // Allow horizontal swiping only
          WebkitUserSelect: 'none',
          userSelect: 'none',
        }}
      >
        {toast.message}
      </Alert>
    </Snackbar>
  );
};