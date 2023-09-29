import React, { useEffect } from "react"
import { Divider } from "@mui/material"
import Head from "next/head"
import { trackSettingPage } from "@local/models/google-analytics-events"

function Settings() {
  useEffect(() => {
    trackSettingPage()
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>Settings</title>
      </Head>
      <div>
        <h2>Settings</h2>
        <Divider />
      </div>
    </React.Fragment>
  )
}

export default Settings
