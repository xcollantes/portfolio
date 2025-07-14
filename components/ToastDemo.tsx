/** Toast demo. */

import { Box, Button, Stack, Typography } from '@mui/material';
import { useToastNotification } from '../hooks/useToastNotification'

export const ToastDemo = () => {
  const toast = useToastNotification();

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Toast Notifications Demo
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button
          variant="contained"
          color="success"
          onClick={() => toast.success('Operation completed successfully!')}
        >
          Success Toast
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => toast.info('Here is some information.')}
        >
          Info Toast
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={() => toast.warning('Warning: This action might have consequences.')}
        >
          Warning Toast
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => toast.error('Error! Something went wrong.')}
        >
          Error Toast
        </Button>
      </Stack>
    </Box>
  );
};