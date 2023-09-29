import React, { useEffect } from "react"
import { Divider } from "@mui/material"
import Head from "next/head"
import { trackSubAdminPage } from "@local/models/google-analytics-events"

function SubAdmins() {
  useEffect(() => {
    trackSubAdminPage()
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>Sub Admins</title>
      </Head>
      <div>
        <h2>Sub Admins</h2>
        <Divider />
      </div>
    </React.Fragment>
  )
}

export default SubAdmins
