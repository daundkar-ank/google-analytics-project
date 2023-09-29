import * as React from "react"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import { Typography, useMediaQuery } from "@mui/material"
import { useStyles } from "./publicLayoutStyles"
import { useRouter } from "next/router"
import { useIsLoggedIn } from "@local/hooks/state"

export default function PublicLayout({ children }) {
  const router = useRouter()
  const tabResolution = useMediaQuery("(max-width:768px")
  const hdTabResolution = useMediaQuery("(max-width:1200px)")
  const isLoggedIn = useIsLoggedIn()

  const styles = useStyles()

  React.useEffect(() => {
    if (isLoggedIn) {
      router.replace("/user/dashboard")
    }
  }, [isLoggedIn, router])

  const handleRouting = () => {
    router.push("/")
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid sx={{ flexWrap: "nowrap" }} container spacing={2}>
        {!tabResolution ? (
          <Grid item xs={5}>
            <Box sx={styles.imageContainer}>
              <Typography
                onClick={handleRouting}
                sx={styles.title}
                variant={hdTabResolution ? "h5" : "h3"}>
                {process.env.NEXT_PUBLIC_APP_NAME}
              </Typography>
              <Typography sx={styles.subtitle} variant={hdTabResolution ? "h5" : "h3"}>
                {router.pathname === "/auth/forgot-password"
                  ? "Can't recollect your password?"
                  : "Happy to see you back on portal!"}
              </Typography>
              {router.pathname === "/auth/forgot-password" ? (
                <Typography sx={styles.tagline} variant="subtitle">
                  We have got you covered! Enter your registered Email and then check your mail for
                  the Password Reset Link.
                </Typography>
              ) : null}
            </Box>
          </Grid>
        ) : null}
        <Grid item xs={tabResolution ? 12 : 7}>
          {children}
        </Grid>
      </Grid>
    </Box>
  )
}
