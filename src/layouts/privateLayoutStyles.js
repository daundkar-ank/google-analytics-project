import { useTheme } from "@mui/system"

const drawerWidth = 270

export const useStyles = () => {
  const theme = useTheme()

  return {
    container: {
      maxWidth: 1920,
      margin: "0 auto",
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap"
    },
    leftColumn: {
      width: "100%",
      minWidth: 261,
      display: "none",
      // flex: 1,
      ["@media (min-width:1080px)"]: {
        display: "block",
        maxWidth: "none",
        width: "auto"
      }
    },
    rightColumn: {
      position: "relative",
      padding: "0px 15px",
      marginTop: "85px",
      width: "400px",
      flex: 1,

      [theme.breakpoints.down("md")]: {
        padding: "0px 10px"
      }
    },

    // Sidebar styles

    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      "& .MuiDrawer-paper": {
        margin: "8px",
        marginBottom: "66px",
        background: theme.palette.background.secondary,
        borderRadius: "5px",
        width: drawerWidth - 16,
        boxSizing: "border-box",
        height: "98vh"
      }
    },
    drawerHeader: {
      color: theme.palette.text.main
    },
    divider: {
      border: `1px solid rgba(255, 255, 255, 0.1)`,
      marginBottom: "21px"
    },
    activeListItem: {
      color: theme.palette.text.white,
      backgroundColor: theme.palette.primary.main,
      width: "90%",
      margin: "auto",
      borderRadius: "5px",
      padding: "16px",
      "&:hover": {
        backgroundColor: theme.palette.secondary.main
      }
    },
    listItem: {
      color: theme.palette.text.main,
      width: "90%",
      margin: "auto",
      borderRadius: "5px",
      padding: "16px"
    },
    listItemText: {
      fontFamily: theme.typography.fontFamily,
      fontSize: "14px",
      fontWeight: "400",
      lineHeight: "16px"
    },
    icon: {
      color: theme.palette.text.main
    },
    iconActive: {
      color: theme.palette.text.white
    },
    logout: {
      position: "absolute",
      bottom: 0,
      color: theme.palette.secondary.main,
      fontSize: "14px",
      fontWeight: "400",
      left: 0,
      right: 0
    }
  }
}
