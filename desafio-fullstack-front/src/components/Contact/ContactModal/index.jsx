import { useContext } from "react"
import style from "./style.module.scss"
import { Input } from "../../forms/Input"
import { ContactContext } from "../../../providers/contact.provider"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { contactEditSchema } from "../../../pages/DashBoardPage/contactEdit.Schema"

export const ContactModal = ({ children, setIsOpen, contact }) => {

    const { editContact } = useContext(ContactContext)

    const { register, handleSubmit, getValues, formState: { errors } } = useForm({
        resolver: zodResolver(contactEditSchema)
    })

    return (
        <div className={`${style.modalOverlay}`} role="dialog">
            <div className={`${style.modalBox}`}>
                {children}
                <button className={`${style.closeButton} btn-tertiary close`} onClick={() => setIsOpen(false)}>X</button>
                <form className={`${style.containerFormUpdate}`} >
                    <Input
                        placeholder="Email"
                        labelClass=""
                        type="email"
                        className="btn-tertiary login headline"
                        error={errors.email}
                        {...register("email")}
                    />
                    <Input
                        placeholder="Telefone"
                        type="tel"
                        className="btn-tertiary login headline"
                        error={errors.tel}
                        {...register("tel")}
                    />
                    <button className="btn-tertiary edit" title="Editar" type="button" onClick={() => { setIsOpen(false); editContact(contact.id, getValues(["email", "tel"])) }}>Editar</button>
                </form>
            </div>
        </div>
    )
}