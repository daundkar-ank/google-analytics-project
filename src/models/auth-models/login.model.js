import { useUserSession } from "@local/hooks/userSession"
import { NetworkManager, API } from "@local/network/core"

export const useLoginModel = () => {
  const userSession = useUserSession()

  const loginByEmail = async (values) => {
    const instance = NetworkManager(API.AUTH.LOGIN)
    const response = await instance.request(values)
    if (response.success) {
      userSession.setSession(response.data)
    }
    return response.success
  }

  return {
    loginByEmail
  }
}
