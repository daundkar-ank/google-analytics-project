import React from "react"
import { Divider, Grid, Typography } from "@mui/material"
import Head from "next/head"

function PrivacyPolicy() {
  return (
    <React.Fragment>
      <Head>
        <title>Privacy Policy</title>
      </Head>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3">Privacy Policy</Typography>
          <Divider />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default PrivacyPolicy
