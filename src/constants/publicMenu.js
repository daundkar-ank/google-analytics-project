function options(title, link) {
  return {
    title,
    link
  }
}

export const MenuOptions = [
  options("Privacy Policy", "/public/privacy-policy"),
  options("About", "/public/about"),
  options("Custom", "/auth/login")
]
