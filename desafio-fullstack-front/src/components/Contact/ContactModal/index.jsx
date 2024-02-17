import { useContext } from "react"
import style from "./style.module.scss"
import { Input } from "../../forms/Input"
import { ContactContext } from "../../../providers/contact.provider"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {contactEditSchema} from "../../../pages/DashBoardPage/contactEdit.Schema"

export const ContactModal = ({ children, setIsOpen }) => {

    const { editContact } = useContext(ContactContext)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(contactEditSchema)
    })
    const submit = (formData) => {
        editContact(formData)
    }
    return (
        <div className={`${style.modalOverlay}`} role="dialog">
            <div className={`${style.modalBox}`}>
                <button className={`${style.closeButton} btn-tertiary`} onClick={() => setIsOpen(false)}>Fechar</button>
                {children}
                <form onSubmit={handleSubmit(submit)}>

                    <Input
                        placeholder="Email"
                        type="email"
                        className="btn-tertiary login"
                        error={errors.name}
                        {...register("email")}
                    />
                    <Input
                        placeholder="Telefone"
                        type="tel"
                        className="btn-tertiary login"
                        error={errors.name}
                        {...register("tel")}
                    /> 
                    <button type="submit">Atualizar</button>
                </form>
            </div>
        </div>
    )
}