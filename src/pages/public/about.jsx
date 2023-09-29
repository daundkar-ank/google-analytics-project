import React from "react"
import { Divider, Grid, Typography } from "@mui/material"
import Head from "next/head"

function About() {
  return (
    <React.Fragment>
      <Head>
        <title>About Us</title>
      </Head>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3">About Us</Typography>
          <Divider />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default About
