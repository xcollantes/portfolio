import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Xavier Collantes",
  description: "",
  referrer: "origin-when-cross-origin",
  keywords: ["Next.js", "React", "JavaScript"],
  authors: [{ name: "Xavier", url: "https://nextjs.org" }],
  colorScheme: "dark",
  creator: "Xavier Collantes",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export default function HeaderMetadata() {
  return <></>
}
