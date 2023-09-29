import React from "react"
import { Box, Button, Grid } from "@mui/material"
import { useStyles } from "./commonLayoutStyles"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useRouter } from "next/router"

function CommonLayout({ children }) {
  const styles = useStyles()
  const router = useRouter()

  const goBack = () => {
    router.back()
  }

  return (
    <Box sx={styles.main}>
      <Grid container>
        {router.pathname !== "/" && (
          <Grid item xs={12}>
            <Button onClick={goBack} startIcon={<ArrowBackIcon />}>
              Back
            </Button>
          </Grid>
        )}
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
    </Box>
  )
}

export default CommonLayout
