import React from "react"
import { useRouter } from "next/router"
import { useLogoutModel } from "./privateLayout.model"
import { Loader } from "@local/redux/dispatcher/Loader"
import { Toast } from "@local/helpers/toasts/toastHelper"
import { trackLogOut } from "@local/models/google-analytics-events"

export const usePrivateLayoutController = (props) => {
  const router = useRouter()
  const currentRoute = router.pathname
  const model = useLogoutModel()
  React.useEffect(() => {
    window.scrollTo(0, 0)
    if (props.isLoggedIn) {
      getUserDetails()
    }
  }, [props.isLoggedIn])

  const navigate = (route) => {
    router.replace(route)
  }

  const handleLogout = async () => {
    Loader.show()
    await model.logout()
    Loader.hide()
    router.replace("/") // checkThis
    trackLogOut()
  }

  const activeMenu = (item) => currentRoute.includes(item.route)

  const getUserDetails = async () => {
    Loader.show()
    const status = await model.profile()
    if (!status) {
      Toast.warn("User session is no longer valid, please login again!")
      router.replace("/auth/login")
    }
    Loader.hide()
  }

  return {
    navigate,
    handleLogout,
    activeMenu
  }
}
