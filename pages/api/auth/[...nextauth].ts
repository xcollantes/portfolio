/** API path which handles all Next-Auth. */

import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google"
import LinkedInProvider from "next-auth/providers/linkedin"
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
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID as string,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider == "google") {
        const onList: boolean = await isAllowed(profile?.email as string)
        if (onList) {
          return true
        }
      }
      // if (false) {
      //   return true
      // }

      return "/403"
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
        client_id: process.env.GOOGLE_CRED_CLIENT_ID!,
        client_email: process.env.GOOGLE_CRED_CLIENT_EMAIL!,
        private_key: process.env.GOOGLE_CRED_PRIVATE_KEY!,
      },
      scopes: scopes,
    }),

    // auth: await google.auth.getClient({
    //   scopes: scopes,
    // }),
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

export default NextAuth(authOptions)
