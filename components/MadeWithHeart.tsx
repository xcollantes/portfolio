import { Box, Typography } from "@mui/material";

export default function MadeWithHeart({ pt }: { pt?: number }) {

  return (
    <Box
      sx={{
        pt: pt || 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="caption"
        sx={{
          fontSize: "0.75rem",
          color: "text.primary",
        }}
      >
        Made with ❤️ by Xavier
      </Typography>
    </Box>
  )
}