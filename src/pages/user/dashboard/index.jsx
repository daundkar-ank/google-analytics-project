import PrimaryHeader from "@local/components/primaryHeader"
import { Grid } from "@mui/material"
import Head from "next/head"
import React, { useEffect } from "react"
import { getServerSideProps } from "@local/server/dashboard.server"
import { trackDashboardPage } from "@local/models/google-analytics-events"

function Dashboard() {
  useEffect(() => {
    trackDashboardPage()
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Grid container>
        <PrimaryHeader title="Dashboard" />
      </Grid>
    </React.Fragment>
  )
}

export default Dashboard

export { getServerSideProps }
