/**
 * Loading overlay component.
 *
 * @param loading - Whether the loading overlay should be displayed.
 * @returns A loading overlay component.
 */

import { Backdrop, CircularProgress } from "@mui/material"

interface LoadingOverlayProps {
  loading: boolean
}

export const LoadingOverlay = ({ loading }: LoadingOverlayProps) => {
  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backdropFilter: 'blur(3px)'
      }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}