import { useContext } from "react"
import { ContactContext } from "../../providers/contact.provider"
import { useForm } from "react-hook-form"
import { Input } from "../../components/forms/Input"
// import style from "../../components/ContactForm/style.module.scss"
import style from "./style.module.scss"

export const ContactForm = () => {

    const { contactListCreate } = useContext(ContactContext)
    const { handleSubmit, register } = useForm()

    const submit = (formData) => {
        contactListCreate(formData)
    }

    return (
        <>
            <form className={`${style.formContainer} marginInputBottom`} onSubmit={handleSubmit(submit)}>
                <section className={`${style.container_input} marginInputBottom`}>
                    <div>
                        <Input
                            className="btn-tertiary input"
                            labelClass="headline "
                            label=""
                            type="email"
                            placeholder="Digite seu Email"
                            {...register("email")}
                        />
                    </div>
                    <div>
                        <Input
                            className="btn-tertiary input"
                            labelClass="headline "
                            label=""
                            type="tel"
                            placeholder="Digite seu Telefone"
                            {...register("tel")}
                        />
                    </div>
                </section>
                <div>
                    <button className="btn-tertiary contactCreate" type="submit">Criar Contato</button>
                </div>
            </form>
        </>
    )
}