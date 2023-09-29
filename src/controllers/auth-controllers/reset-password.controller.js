import { useRef, useState } from "react"
import { useRouter } from "next/router"
import { useResetPasswordModel } from "@local/models/auth-models/reset-password.model"

export const useResetPasswordController = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setshowConfirmPassword] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const navigate = useRouter()
  const formikRef = useRef()
  const model = useResetPasswordModel()

  const { token } = navigate.query

  const togglePasswordVisiblity = () => {
    setShowPassword((prev) => !prev)
  }

  const toggleConfirmPasswordVisiblity = () => {
    setshowConfirmPassword((prev) => !prev)
  }

  const resetPassword = async (values) => {
    setShowLoader(true)
    const payload = {
      token: token,
      password: values.password,
      confirm_password: values.confirmPassword
    }
    const response = await model.resetPassword(payload)
    setShowLoader(false)
    if (response.success) {
      navigate.push("/auth/login")
    }
  }

  const navigateToLogin = () => {
    navigate.push("/auth/login")
  }

  return {
    resetPassword,
    showLoader,
    togglePasswordVisiblity,
    navigateToLogin,
    showPassword,
    formikRef,
    showConfirmPassword,
    toggleConfirmPasswordVisiblity
  }
}
