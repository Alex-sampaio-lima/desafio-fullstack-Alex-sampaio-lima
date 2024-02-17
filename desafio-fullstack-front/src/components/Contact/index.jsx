import { useContext, useState } from "react"
import { ContactContext } from "../../providers/contact.provider"
import { ClientContext } from "../../providers/client.provider"
import style from "./style.module.scss"
import { ContactModal } from "./ContactModal"


export const Contact = () => {

    const { contactList, deleteContact, editContact } = useContext(ContactContext)
    const { client } = useContext(ClientContext)
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className={`${style.containerList} marginInputBottom`}>
            <ul className={`${style.containerUl}`}>
                {contactList.map(contact => (
                    <li className={`${style.containerLi}`} key={contact.id}>
                        <div className={`${style.containerContactInfo}`}>
                            <h3 className="headline grey">Email:{contact.email}</h3>
                            <h3 className="headline grey"> Tel:{contact.tel}</h3>
                        </div>
                        <div className={`${style.containerButtons}`}>
                            <button className="btn-tertiary" title="Remover" onClick={() => deleteContact(contact.id)}>Excluir</button>
                            <button className="btn-tertiary" title="Editar" onClick={() => editContact(contact.id)}>Editar</button>
                            <button className="btn-tertiary"  onClick={() => setIsOpen(true)}>Editar</button>
                            {isOpen ? <ContactModal setIsOpen={setIsOpen}></ContactModal> : null}
                        </div>
                    </li>
                ))}
            </ul>
        </div>

    )

}





