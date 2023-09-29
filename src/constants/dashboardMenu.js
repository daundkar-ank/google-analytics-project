// Export all routes that should be in the side menu
import React from "react"
import HomeIcon from "@mui/icons-material/Dashboard"
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest"
import GroupIcon from "@mui/icons-material/Group"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"

class MenuPath {
  constructor(title, icon, route, alias = null) {
    this.title = title
    this.icon = icon
    this.route = route
    this.alias = alias || title.replace(" ", "_").toLowerCase()
  }
}

export const DashboardMenus = [
  new MenuPath("Dahboard", <HomeIcon />, "/user/dashboard"),
  new MenuPath("Users", <GroupIcon />, "/user/users"),
  new MenuPath("Sub Admins", <AdminPanelSettingsIcon />, "/user/sub-admins"),
  new MenuPath("Settings", <SettingsSuggestIcon />, "/user/settings")
]
