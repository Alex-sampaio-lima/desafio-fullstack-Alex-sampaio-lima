import { useContext, useState } from "react"
import { ContactContext } from "../../providers/contact.provider"
import style from "./style.module.scss"
import { ContactModal } from "./ContactModal"



export const Contact = ({ contacts }) => {

    const { deleteContact } = useContext(ContactContext)
    const [isOpen, setIsOpen] = useState(false)


    return (
        <div className={`${style.containerList} marginInputBottom`}>
            <ul className={`${style.containerUl}`}>
                {contacts.map((contact) => (
                    <li className={`${style.containerLi}`} key={contact.id}>
                        <div className={`${style.containerContactInfo}`}>
                            <h3 className="headline black">Email:{contact.email}</h3>
                            <h3 className="headline black"> Tel:{contact.tel}</h3>
                        </div>
                        <div className={`${style.containerButtons}`}>
                            <button className="btn-tertiary" title="Remover" onClick={() => deleteContact(contact.id)}>Excluir</button>
                            <button className="btn-tertiary" onClick={() => setIsOpen(true)}>Editar</button>
                            {isOpen ? <ContactModal setIsOpen={setIsOpen} contact={contact} ></ContactModal> : null}
                        </div>
                    </li>
                ))}
            </ul>
        </div>

    )

}





