export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <h1>THIS IS LAYOUT</h1>
        {children}
        <h1>THIS IS LAYOUT BOTTOM</h1>
      </body>
    </html>
  )
}
