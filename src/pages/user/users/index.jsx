import React, { useEffect } from "react"
import { Button, Divider, Grid } from "@mui/material"
import Head from "next/head"
import { trackUserPage } from "@local/models/google-analytics-events"
import styles from "../../../styles/user.module.css"

function Users() {
  useEffect(() => {
    trackUserPage()
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>Users</title>
      </Head>
      <Grid item>
        <Grid container style={{ flexWrap: "wrap" }} justifyContent="space-between">
          <Grid item xs={8}>
            <h1>Users</h1>
          </Grid>
          <Grid item xs={4} className={styles.button_grid}>
            <Button className={styles.button}>+ Add Users</Button>
          </Grid>
        </Grid>
        <Divider />
        <Grid item></Grid>
      </Grid>
    </React.Fragment>
  )
}

export default Users
