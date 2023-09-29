import React from "react"
import { Box, Button, Container, Typography, Grid } from "@mui/material"
import { useIsLoggedIn } from "@local/hooks/state"
import { useRouter } from "next/router"
import Image from "next/image"

function Custom404() {
  const navigate = useRouter()
  const isLoggedIn = useIsLoggedIn()

  const backToHome = () => {
    const route = isLoggedIn ? "/user/dashboard" : "/"
    navigate.replace(route)
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh"
      }}>
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Image
              src={"/images/backgrounds/error-404.png"}
              loading="lazy"
              alt=""
              width={400}
              height={350}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h1">404</Typography>
            <Typography variant="subtitle">The page you’re looking for, doesn’t exist.</Typography>
            <br />
            <br />
            <Button variant="contained" size="large" onClick={backToHome}>
              Back Home
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Custom404
