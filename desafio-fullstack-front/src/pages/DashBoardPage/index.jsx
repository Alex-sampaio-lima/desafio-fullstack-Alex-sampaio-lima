import { useContext } from "react"
import { ClientContext } from "../../providers/client.provider"
import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import { ContactForm } from "../../components/ContactForm"
import { Contact } from "../../components/Contact"
import { ContactContext } from "../../providers/contact.provider"

export const DashBoardPage = ({ }) => {

    const { contactList } = useContext(ContactContext)


    return (
        <main>
            <Header title="Contatos de Clientes" />
            <ContactForm />
            <Contact contacts={contactList}/>
            <Footer />
        </main>
    )
}