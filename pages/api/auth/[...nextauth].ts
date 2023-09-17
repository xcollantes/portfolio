/** API path which handles all Next-Auth. */

import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google"
import GitHubProvider, { GithubProfile } from "next-auth/providers/github"
import LinkedInProvider, { LinkedInProfile } from "next-auth/providers/linkedin"
import { google } from "googleapis"

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          name: profile.name,
          firstname: profile.given_name,
          lastname: profile.family_name,
          email: profile.email,
          image: profile.picture,
          role: profile.role ?? "user",
          verified: profile.email_verified,
        }
      },
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      authorization: { params: { prompt: "select_account" } },
    }),
    GitHubProvider({
      profile(profile: GithubProfile) {
        return { ...profile }
      },
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    LinkedInProvider({
      profile(profile: LinkedInProfile) {
        return {
          ...profile,
          id: profile.sub, // Required
        }
      },
      clientId: process.env.LINKEDIN_CLIENT_ID as string,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
      authorization: {
        params: { scope: "openid profile email" },
      },
      issuer: "https://www.linkedin.com",
      jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      logUser({ user, account, profile, email, credentials })
      return true
    },
  },

  pages: { error: "/403" },
}

/** Return true if email is on authorized Google Sheets list. */
async function isAllowed(fullEmail: string): Promise<boolean> {
  const scopes = ["https://www.googleapis.com/auth/spreadsheets.readonly"]

  const sheets = google.sheets({
    version: "v4",
    auth: new google.auth.GoogleAuth({
      credentials: {
        client_id: process.env.GOOGLE_CRED_CLIENT_ID,
        client_email: process.env.GOOGLE_CRED_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_CRED_PRIVATE_KEY,
      },
      scopes: scopes,
    }),
  })

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: "allow!A:A",
  })

  const emailList = res.data.values as Array<Array<string>>

  for (let rowIdx = 0; rowIdx < emailList?.length; rowIdx++) {
    if (
      fullEmail.toLowerCase().trim() ==
      emailList[rowIdx][0].toLowerCase().trim()
    ) {
      return true
    }
  }
  return false
}

/** Find data of successfully authenticated user. */
async function logUser({ user, account, profile, email, credentials }) {
  console.log(account.provider)
  console.log(profile)

  const scopes = ["https://www.googleapis.com/auth/spreadsheets"]

  const sheets = google.sheets({
    version: "v4",
    auth: new google.auth.GoogleAuth({
      credentials: {
        client_id: process.env.GOOGLE_CRED_CLIENT_ID,
        client_email: process.env.GOOGLE_CRED_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_CRED_PRIVATE_KEY,
      },
      scopes: scopes,
    }),
  })

  const now = new Date()
  const res = await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.VISITOR_LOG_SHEET_ID,
    range: "visitor_log!A:A",
    requestBody: {
      values: [
        [
          now.toUTCString(),
          JSON.stringify(account.provider, undefined, 4),
          JSON.stringify(user.name, undefined, 4),
          JSON.stringify(user.email, undefined, 4),
          JSON.stringify(user, undefined, 4),
          JSON.stringify(account, undefined, 4),
          JSON.stringify(profile, undefined, 4),
          JSON.stringify(email, undefined, 4),
          JSON.stringify(credentials, undefined, 4),
        ],
      ],
    },
    insertDataOption: "INSERT_ROWS",
    valueInputOption: "USER_ENTERED",
  })

  console.log(res)
}

export default NextAuth(authOptions)
