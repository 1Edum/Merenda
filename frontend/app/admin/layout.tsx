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
            { name: "Adicionar Usuário", link: "/" },
            { name: "Adicionar Alimento", link: "/" },
            { name: "Cadastrar Alimento", link: "/" },
            ]}/>
        </header>
          {children}
      </body>
    </html>
  )
}
