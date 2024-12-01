import Header from "../_components/header"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <Header menu={true} links={[
            { name: "Add User", link: "/admin/#adicionarusuario" },
            { name: "Add Food", link: "/admin/#adicionarcomida" },
            { name: "Waste", link:"/admin/#waste" },
            { name: "TV Screen", link: "/admin/tv" },
            ]}/>
        </header>
          {children}
      </body>
    </html>
  )
}
