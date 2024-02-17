import { useContext } from "react"
import { ClientContext } from "../../providers/client.provider"
import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import { ContactForm } from "../../components/ContactForm"
import { Contact } from "../../components/Contact"

export const DashBoardPage = ({ }) => {

    const { client, getClient, clientLogout } = useContext(ClientContext)


    return (
        <main>
            <Header title="Contatos de Clientes" />
            <ContactForm />
            <Contact />
            <Footer />
        </main>
    )
}