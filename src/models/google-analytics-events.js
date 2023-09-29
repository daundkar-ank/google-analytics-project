export function trackEvent(event, params = {}) {
  let eventParams = { event: event, ...params, user_identifier: "anonymous" }
  if (typeof window !== "undefined" && window) {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(eventParams)
  }
}

export function trackLandingPage() {
  trackEvent("landing_page", {
    page_url: window.location.href
  })
}

export function trackDashboardButton() {
  trackEvent("go_to_dashboard", {
    page_url: window.location.href
  })
}

export function trackClickHere() {
  trackEvent("click_here", {
    page_url: window.location.href
  })
}

export function trackNavLink(link, title) {
  trackEvent("nav_link", {
    page_url: window.location.href,
    nav_link: link,
    nav_title: title
  })
}

export function trackLogOut() {
  trackEvent("log_out", {
    page_url: window.location.href,
    date: new Date()
  })
}

export function trackMenu(menu) {
  trackEvent("menu_bar", {
    page_url: window.location.href,
    route: menu
  })
}

export function trackDashboardPage() {
  trackEvent("dashboard_page", {
    page_url: window.location.href
  })
}

export function trackUserPage() {
  trackEvent("user_page", {
    page_url: window.location.href
  })
}

export function trackSubAdminPage() {
  trackEvent("subadmin_page", {
    page_url: window.location.href
  })
}

export function trackSettingPage() {
  trackEvent("setting_page", {
    page_url: window.location.href
  })
}
