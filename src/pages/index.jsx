// import { useTheme } from "@emotion/react";
import { MenuOptions } from "@local/constants/publicMenu"
import { useIsLoggedIn } from "@local/hooks/state"
import { AppBar, Box, Button, Grid, Toolbar, Typography } from "@mui/material"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { useStyles } from "@local/styles/indexStyles"
import {
  trackDashboardButton,
  trackLandingPage,
  trackNavLink
} from "@local/models/google-analytics-events"
import { Record } from "@local/constants/product"
import Image from "next/image"
// import img from "../images/placeholders/onboardingng.jpg";
import img from "../../public/images/placeholders/onboardingng.jpg"

function Index() {
  const styles = useStyles()
  const router = useRouter()
  const isLoggedIn = useIsLoggedIn()
  // const theme = useTheme();

  const [btnLabel, setBtnLabel] = useState("Login")

  useEffect(() => {
    const label = isLoggedIn ? "Go to Dashboard" : "Login"
    setBtnLabel(label)
    trackLandingPage()
  }, [isLoggedIn])

  const navigate = () => {
    if (isLoggedIn) {
      router.replace("/user/dashboard")
    } else {
      router.push("/auth/login")
    }
  }

  return (
    <React.Fragment>
      <Head>
        <meta property="og:title" content="Product Catalogue"></meta>
        <meta property="og:description" content="Product Catalogue"></meta>
        <meta property="og:image" content={img}></meta>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <AppBar component="nav" color="background">
        <Toolbar style={{ padding: "0 3%" }}>
          <Typography
            variant="h3"
            component="div"
            color="primary"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
            {process.env.NEXT_PUBLIC_APP_NAME}
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {MenuOptions.map((item) => {
              if (item.title !== "Custom") {
                return (
                  <Link
                    key={item.link}
                    href={item.link}
                    style={{ padding: "5px 20px 5px 0px" }}
                    onClick={() => trackNavLink(item.link, item.title)}>
                    {item.title}
                  </Link>
                )
              } else {
                return (
                  <Button
                    key={item.link}
                    variant="outlined"
                    onClick={() => (navigate(), trackDashboardButton())}>
                    {btnLabel}
                  </Button>
                )
              }
            })}
          </Box>
        </Toolbar>
      </AppBar>
      <Grid container sx={styles.main} justifyContent="space-between">
        {Record?.map((data, index) => (
          <Grid
            item
            xs={4}
            key={index}
            className={styles.card}
            sx={{
              justifyContent: "center",
              marginTop: "100px"
            }}>
            <Grid item>
              <Image
                loading="lazy"
                src={data?.image_url}
                width={250}
                height={250}
                alt="img"
                className={styles.image}
                style={{ objectFit: "contain", mixBlendMode: "multiply" }}
              />
            </Grid>
            <Grid item>
              <Grid item>
                <Typography className={styles.heading_3}>{data?.name}</Typography>
              </Grid>
              <Grid item>
                <Typography className={styles.discription_text} style={{ color: "#1C1C1CBF" }}>
                  {data?.description}
                </Typography>
              </Grid>
              <Grid item style={{ marginTop: "0.75rem" }}>
                <Typography variant="desktopParagraph">
                  <span
                    style={{
                      fontFamily: "roboto",
                      fontSize: " 1.125rem",
                      fontWeight: 500,
                      lineHeight: "1.75rem"
                    }}>
                    &#x20B9;
                  </span>{" "}
                  {data?.price}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              style={{
                marginTop: "0.88rem",
                display: "flex",
                alignItems: "flex-end"
              }}></Grid>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  )
}

export default Index
