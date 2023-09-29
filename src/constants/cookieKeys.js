import { Dates } from "@local/helpers/app-dates/dates"

export const CookieKeys = {
  Auth: `${process.env.NEXT_PUBLIC_ENV}:Auth-Token`,
  API_TOKEN: `${process.env.NEXT_PUBLIC_ENV}:api-key`,
  REFRESH_TOKEN: `${process.env.NEXT_PUBLIC_ENV}:Refresh-Token`
}

console.log(process.env.APP_ENV, process.env.APP_ENV)

export const CookieOptions = {
  expires: Dates().addInCurrent(10, "days")._d,
  sameSite: "strict",
  path: "/",
  ...(process.env.APP_ENV !== "dev" &&
    process.env.NEXT_PUBLIC_ENV !== "dev" && {
      secure: true
    })
}
