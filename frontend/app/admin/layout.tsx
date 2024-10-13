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
            { name: "Adicionar Usuário", link: "#adicionarusuario" },
            { name: "Adicionar Alimento", link: "/admin/#adicionarcomida" },
            { name: "Tela TV", link: "/admin/telagrande" },
            ]}/>
        </header>
          {children}
      </body>
    </html>
  )
}
