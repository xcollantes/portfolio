import { Box, Stack, Typography } from "@mui/material"

export default function Fonts() {
  return (
    <>
      <Typography variant="h1" fontFamily={"Permanent Marker"}>
        Xavier Collantes
      </Typography>
      <Typography variant="subtitle1" fontFamily={"Quicksand"}>
        Software Engineer
      </Typography>

      <Typography variant="h1" fontFamily={"Koulen"} paddingTop={20}>
        Xavier Collantes
      </Typography>
      <Typography variant="subtitle1" fontFamily={"Quicksand"}>
        Software Engineer
      </Typography>

      <Typography variant="h2" fontFamily={"Outfit"} paddingTop={20}>
        Project Header H2
      </Typography>
      <Typography variant="subtitle2" fontFamily={"Outfit"}>
        Creating a project subtitle2
      </Typography>

      <Typography variant="h3" fontFamily={"Outfit"}>
        Header H3
      </Typography>

      <Typography variant="h4" fontFamily={"Outfit"}>
        Header H4
      </Typography>

      <Stack spacing={3} sx={{ py: 3 }}>
        {/* <Typography variant="body1" fontFamily={"Outfit"}>
          Crazy? I was crazy once they put me in a rubber room. Crazy? I was
          crazy once they put me in a rubber room. Crazy? I was crazy once they
          put me in a rubber room. Crazy? I was crazy once they put me in a
          rubber room. Crazy? I was crazy once they put me in a rubber room.
          Crazy? I was crazy once they put me in a rubber room. Crazy? I was
          crazy once they put me in a rubber room. Crazy? I was crazy once they
          put me in a rubber room. Crazy? I was crazy once they put me in a
          rubber room. Crazy? I was crazy once they put me in a rubber room.
        </Typography> */}
        <Typography variant="body1" fontFamily={"Outfit"}>
          Crazy? I was crazy once they put me in a rubber room. Crazy? I was
          crazy once they put me in a rubber room. Crazy? I was crazy once they
          put me in a rubber room. Crazy? I was crazy once they put me in a
          rubber room. Crazy? I was crazy once they put me in a rubber room.
          Crazy? I was crazy once they put me in a rubber room. Crazy? I was
          crazy once they put me in a rubber room. Crazy? I was crazy once they
          put me in a rubber room. Crazy? I was crazy once they put me in a
          rubber room. Crazy? I was crazy once they put me in a rubber room.
        </Typography>
        {/* <Typography variant="body1" fontFamily={"DM Sans"}>
          Crazy? I was crazy once they put me in a rubber room. Crazy? I was
          crazy once they put me in a rubber room. Crazy? I was crazy once they
          put me in a rubber room. Crazy? I was crazy once they put me in a
          rubber room. Crazy? I was crazy once they put me in a rubber room.
          Crazy? I was crazy once they put me in a rubber room. Crazy? I was
          crazy once they put me in a rubber room. Crazy? I was crazy once they
          put me in a rubber room. Crazy? I was crazy once they put me in a
          rubber room. Crazy? I was crazy once they put me in a rubber room.
        </Typography> */}
      </Stack>
    </>
  )
}

// font-family: 'Koulen' strong and professional
// font-family: 'Permanent Marker' fun
// font-family: 'Tilt Warp'
// font-family: 'Hanuman'

// font-family: 'Quicksand'

// font-family: 'Plus Jakarta Sans', sans-serif;

// font-family: 'Kumbh Sans', sans-serif;
// font-family: 'Outfit', sans-serif;
