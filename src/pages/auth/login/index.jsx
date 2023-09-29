import useLoginController from "@local/controllers/auth-controllers/login.controller"
import { LoginValidator } from "@local/helpers/validators/login"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import { LoadingButton } from "@mui/lab"
import {
  Box,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Typography
} from "@mui/material"
import { Formik } from "formik"
import Head from "next/head"
import { useRouter } from "next/router"
import React from "react"
import { useStyles } from "@local/styles/auth/commonStyles"

const Login = () => {
  const { showPassword, showLoader, togglePasswordVisibility, userLogin, navigateToSignUp } =
    useLoginController()

  const styles = useStyles()

  // eslint-disable-next-line no-unused-vars

  const navigate = useRouter()

  return (
    <React.Fragment>
      <Head>
        <title>{`${process.env.NEXT_PUBLIC_APP_NAME} | Login`}</title>
      </Head>
      <Box sx={styles.container}>
        <Typography align="left" variant="h3">
          Sign In
        </Typography>
        <Typography sx={styles.topLabel} variant="subtitle">
          Enter Your Credentials
        </Typography>
        <Grid sx={styles.form} container spacing={2}>
          <Divider />
          <Formik
            validateOnMount
            initialValues={LoginValidator.initialValues}
            validationSchema={LoginValidator.validationSchema}
            onSubmit={userLogin}>
            {({ isValid, handleSubmit, values, handleChange, handleBlur, touched, errors }) => (
              <React.Fragment>
                <Grid item xs={12}>
                  <InputLabel sx={styles.label} htmlFor="email">
                    Email ID*
                  </InputLabel>
                  <TextField
                    size="small"
                    sx={styles.formField}
                    placeholder="Enter Your Email"
                    name="email"
                    inputProps={{ style: { fontSize: 14, padding: 14 } }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                    value={values.email}
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.email ? errors.email : ""}
                    error={touched.email && Boolean(errors.email)}
                    type="email"
                    fullWidth
                    margin="normal"
                  />
                </Grid>

                <Grid item xs={12}>
                  <InputLabel sx={styles.label} htmlFor="password">
                    Password*
                  </InputLabel>
                  <TextField
                    size="medium"
                    sx={styles.textField1}
                    placeholder="Enter Your Password"
                    name="password"
                    value={values.password}
                    inputProps={{ style: { fontSize: 14, padding: 14 } }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                    variant="outlined"
                    onBlur={handleBlur}
                    helperText={touched.password ? errors.password : ""}
                    error={touched.password && Boolean(errors.password)}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={togglePasswordVisibility}>
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    fullWidth
                    margin="normal"
                  />
                </Grid>

                <Grid sx={styles.buttonContainer} item xs={12}>
                  <LoadingButton
                    type="submit"
                    disabled={!isValid || showLoader}
                    variant="contained"
                    sx={styles.submitBtn}
                    size="large"
                    onClick={handleSubmit}
                    loading={showLoader}
                    loadingPosition="start"
                    startIcon={<LockOpenIcon />}>
                    Sign In
                  </LoadingButton>
                  <Typography
                    onClick={() => navigate.push("/auth/forgot-password")}
                    sx={styles.forgotPassword}
                    variant="c3">
                    Forgot Password?
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography onClick={navigateToSignUp} sx={styles.forgotPassword} variant="c3">
                    Create a new account!
                  </Typography>
                </Grid>
              </React.Fragment>
            )}
          </Formik>
        </Grid>
      </Box>
    </React.Fragment>
  )
}

export default Login

export async function getServerSideProps() {
  return {
    props: {}
  }
}
