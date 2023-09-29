import FormField from "@local/components/FormField"
import { useResetPasswordController } from "@local/controllers/auth-controllers/reset-password.controller"
import { RPValidator } from "@local/helpers/validators/forgotPassword"
import LockResetIcon from "@mui/icons-material/LockReset"
import { LoadingButton } from "@mui/lab"
import { Box, Divider, Grid, Typography } from "@mui/material"
import { Formik } from "formik"
import React from "react"
import { useStyles } from "@local/styles/auth/commonStyles"

function ResetPassword() {
  const styles = useStyles()

  const {
    resetPassword,
    showLoader,
    togglePasswordVisiblity,
    navigateToLogin,
    showPassword,
    formikRef,
    showConfirmPassword,
    toggleConfirmPasswordVisiblity
  } = useResetPasswordController()

  return (
    <Box sx={styles.container}>
      <Typography align="left" variant="h3">
        Set Your Password
      </Typography>
      <Grid sx={styles.form} container spacing={2}>
        <Divider />
        <Formik
          innerRef={formikRef}
          validateOnMount
          initialValues={RPValidator.initialValues}
          validationSchema={RPValidator.validationSchema}
          onSubmit={resetPassword}>
          {(formik) => (
            <React.Fragment>
              <Grid item xs={12}>
                <FormField
                  label={"New Password"}
                  placeholder="Enter Your New Password"
                  formik={formik}
                  name={"password"}
                  required
                  type={showPassword ? "text" : "password"}
                  showPassword={showPassword}
                  togglePasswordVisiblity={togglePasswordVisiblity}
                />
              </Grid>
              <Grid item xs={12}>
                <FormField
                  label={"Confirm New Password"}
                  placeholder="Confirm New Password"
                  formik={formik}
                  name={"confirmPassword"}
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  showPassword={showConfirmPassword}
                  togglePasswordVisiblity={toggleConfirmPasswordVisiblity}
                />
              </Grid>
              <Grid sx={styles.buttonContainer} item xs={12}>
                <LoadingButton
                  type="submit"
                  disabled={!formik.isValid || showLoader}
                  variant="contained"
                  sx={styles.submitBtn}
                  size="large"
                  onClick={formik.handleSubmit}
                  loading={showLoader}
                  loadingPosition="start"
                  startIcon={<LockResetIcon />}>
                  Set Password
                </LoadingButton>
                <Typography onClick={navigateToLogin} sx={styles.forgotPassword} variant="c3">
                  Back To Login
                </Typography>
              </Grid>
            </React.Fragment>
          )}
        </Formik>
      </Grid>
    </Box>
  )
}

export default ResetPassword
