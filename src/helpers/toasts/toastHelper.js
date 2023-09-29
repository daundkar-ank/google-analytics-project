import { toast } from "react-toastify"
import { ToasConfig } from "./toastConfig"

export const Toast = {
  success: (msg) => toast.success(msg, ToasConfig),
  error: (msg) => toast.error(msg, ToasConfig),
  warn: (msg) => toast.warn(msg, ToasConfig),
  info: (msg) => toast.info(msg, ToasConfig)
}
