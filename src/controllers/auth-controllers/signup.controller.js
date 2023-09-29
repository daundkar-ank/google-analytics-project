import { useState } from "react"
import { useSignUpModel } from "../../models/auth-models/signup.model"
import UserImg from "public/images/backgrounds/DefaultImg.png"
import { useRouter } from "next/router"
import { useUserSession } from "@local/hooks/userSession"

export const useSignupController = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setshowConfirmPassword] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const [imgData, setImgData] = useState(null)
  const userSession = useUserSession()

  const router = useRouter()
  const model = useSignUpModel()

  const togglePasswordVisiblity = () => {
    setShowPassword((prev) => !prev)
  }

  const toggleConfirmPasswordVisiblity = () => {
    setshowConfirmPassword((prev) => !prev)
  }

  const handleSignup = async (values) => {
    setShowLoader(true)
    const payload = {
      email: values.email,
      password: values.password,
      first_name: values.firstname,
      last_name: values.lastname,
      phone: values.phone.replace(values.country_code, ""),
      country_code: values.country_code
    }
    const response = await model.signup(payload)
    setShowLoader(false)
    if (response.success) {
      userSession.setSession(response.data)
    }
  }

  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader()
      reader.addEventListener("load", () => {
        setImgData(reader.result)
      })
      reader.readAsDataURL(e.target.files[0])
    } else {
      setImgData(UserImg)
    }
  }

  const navigateToLogin = () => {
    router.push("/auth/login")
  }

  return {
    showPassword,
    showLoader,
    togglePasswordVisiblity,
    handleSignup,
    navigateToLogin,
    toggleConfirmPasswordVisiblity,
    showConfirmPassword,
    onChangePicture,
    imgData
  }
}
